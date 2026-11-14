"""Command Center MVP: read-only map of all projects + git rollback/lock.

Each project folder under PROJECTS_ROOT that has a `cc.json` is shown.
Only the Python standard library is used. Run: python server.py
"""
import json, os, subprocess, mimetypes
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, unquote

ROOT = os.environ.get("PROJECTS_ROOT", os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..")))
HERE = os.path.dirname(os.path.abspath(__file__))
LOCKS = ".cc-locks"
HOOK = "#!/bin/sh\n# cc-lock: refuse commits that touch locked files\n[ -f .cc-locks ] || exit 0\nfor f in $(git diff --cached --name-only); do\n  if grep -qxF \"$f\" .cc-locks; then echo \"LOCKED: $f (unlock in command center)\"; exit 1; fi\ndone\n"


def git(path, *args, stdout_only=False):
    r = subprocess.run(["git", "-C", path, *args], capture_output=True, text=True)
    return r.returncode, (r.stdout if stdout_only else r.stdout + r.stderr).strip()


def projects():
    out = []
    for name in sorted(os.listdir(ROOT)):
        p = os.path.join(ROOT, name)
        cat = os.path.join(p, "cc.json")
        if not os.path.isfile(cat):
            continue
        try:
            c = json.load(open(cat, encoding="utf-8"))
        except ValueError as e:
            out.append({"id": name, "name": name, "error": f"cc.json خراب است: {e}"})
            continue
        c["id"] = name
        code, log = git(p, "log", "-8", "--format=%h|%ad|%an|%s", "--date=short", stdout_only=True)
        c["versions"] = [dict(zip(["hash", "date", "author", "msg"], l.split("|", 3))) for l in log.splitlines()] if code == 0 else []
        code, st = git(p, "status", "--porcelain", stdout_only=True)
        c["dirty"] = len(st.splitlines()) if code == 0 else None
        lk = os.path.join(p, LOCKS)
        c["locks"] = open(lk, encoding="utf-8").read().split() if os.path.isfile(lk) else []
        shot = c.get("shot")
        c["shot_url"] = f"/shot/{name}/{shot}" if shot and os.path.isfile(os.path.join(p, shot)) else None
        out.append(c)
    return out


def safe_project(pid):
    p = os.path.realpath(os.path.join(ROOT, pid))
    if os.path.dirname(p) != os.path.realpath(ROOT) or not os.path.isfile(os.path.join(p, "cc.json")):
        raise ValueError("پروژه پیدا نشد")
    return p


class H(BaseHTTPRequestHandler):
    def send(self, code, body, ctype="application/json; charset=utf-8"):
        data = body if isinstance(body, bytes) else json.dumps(body, ensure_ascii=False).encode()
        self.send_response(code); self.send_header("Content-Type", ctype); self.end_headers(); self.wfile.write(data)

    def do_GET(self):
        u = unquote(urlparse(self.path).path)
        if u in ("/", "/index.html"):
            return self.send(200, open(os.path.join(HERE, "index.html"), "rb").read(), "text/html; charset=utf-8")
        if u == "/api/projects":
            return self.send(200, projects())
        if u.startswith("/shot/"):
            _, _, pid, rel = u.split("/", 3)
            try:
                p = safe_project(pid)
            except ValueError as e:
                return self.send(404, {"error": str(e)})
            f = os.path.realpath(os.path.join(p, rel))
            if not f.startswith(p + os.sep) or not os.path.isfile(f):
                return self.send(404, {"error": "عکس پیدا نشد"})
            return self.send(200, open(f, "rb").read(), mimetypes.guess_type(f)[0] or "application/octet-stream")
        self.send(404, {"error": "not found"})

    def do_POST(self):
        u = urlparse(self.path).path
        try:
            body = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
            p = safe_project(body.get("project", ""))
        except ValueError as e:
            return self.send(400, {"status": "error", "message_fa": str(e)})
        if u == "/api/rollback":
            h = body.get("hash", "")
            if not h.isalnum():
                return self.send(400, {"status": "error", "message_fa": "شناسهٔ نسخه نامعتبر است"})
            code, out = git(p, "revert", "--no-edit", h)
            if code:
                git(p, "revert", "--abort")
            return self.send(200 if code == 0 else 409, {"status": "done" if code == 0 else "error", "message_fa": "برگشت خورد (یک کامیت تازه ساخته شد، تاریخچه پاک نشد)" if code == 0 else "برگشت ممکن نشد", "detail": out})
        if u == "/api/lock":
            rel = body.get("path", "").strip()
            if not rel or ".." in rel or not os.path.exists(os.path.join(p, rel)):
                return self.send(400, {"status": "error", "message_fa": "فایل پیدا نشد"})
            lk = os.path.join(p, LOCKS)
            cur = open(lk, encoding="utf-8").read().split() if os.path.isfile(lk) else []
            cur = [x for x in cur if x != rel] if body.get("unlock") else sorted(set(cur + [rel]))
            open(lk, "w", encoding="utf-8").write("\n".join(cur) + ("\n" if cur else ""))
            hook = os.path.join(p, ".git", "hooks", "pre-commit")
            if os.path.isdir(os.path.dirname(hook)) and not (os.path.isfile(hook) and "cc-lock" not in open(hook).read()):
                open(hook, "w").write(HOOK); os.chmod(hook, 0o755)
            return self.send(200, {"status": "done", "locks": cur})
        self.send(404, {"error": "not found"})

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8090"))
    print(f"Command center: http://127.0.0.1:{port}  (projects root: {ROOT})")
    ThreadingHTTPServer(("0.0.0.0", port), H).serve_forever()
