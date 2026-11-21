"""نقشه (.c4) ← پیش‌نویس شرکت Paperclip. فقط می‌نویسد، هیچ چیز به Paperclip نمی‌فرستد.
نسخه 1.0 · به‌روزرسانی: 2026-11-21 13:30 به وقت برلین
قالب خروجی از export واقعی Paperclip (schemaVersion 7) برداشته شده.
اجرا: python tools/c4_to_paperclip.py c4-org/recruitment.c4
"""
import json, re, sys, pathlib

VERSION = "1.0"
UPDATED = "2026-11-21 13:30 Europe/Berlin"

def parse(text):
    roles, cur = [], None
    for line in text.splitlines():
        m = re.match(r"\s*(r\d+)\s*=\s*role\s+'([^']+)'", line)
        if m:
            cur = {"id": m.group(1), "title": m.group(2), "skills": []}
            roles.append(cur); continue
        m = re.search(r"technology\s+'skill:\s*([^']+)'", line)
        if m and cur:
            for s in re.split(r"\s*\+\s*", re.sub(r"\(.*?\)", "", m.group(1)).strip()):
                if s and s != "—" and s not in cur["skills"]:
                    cur["skills"].append(s)
    return roles

def build(src):
    text = src.read_text(encoding="utf-8")
    roles = parse(text)
    name = src.stem
    files = {"COMPANY.md": f"# {name}\nساخته‌شده از {src.as_posix()} — ویرایش نکن؛ نقشه را عوض کن.\n"}
    agents = []
    for r in roles:
        slug = r["id"]
        title = re.sub(r"^[🔒🔓]\s*\d+\s*·\s*", "", r["title"])
        path = f"agents/{slug}/AGENTS.md"
        files[path] = f"# {title}\nskillها: {', '.join(r['skills']) or '—'}\n"
        agents.append({
            "slug": slug, "name": title, "path": path, "role": "worker",
            "reportsToSlug": None,  # بدون ایجنت مدیر در نسخهٔ اول (هزینه)
            "adapterType": "claude_local",
            "adapterConfig": {"model": "claude-haiku-5-5", "maxTurnsPerRun": 12},
            "budgetMonthlyCents": 0,
            "sourceSkills": r["skills"],  # نام skillهای نقشه؛ نگاشت به کتابخانهٔ Paperclip هنوز انجام نشده
        })
    return {
        "_generated": {"by": "tools/c4_to_paperclip.py", "version": VERSION, "updated": UPDATED,
                        "source": src.as_posix(), "status": "draft — not imported"},
        "rootPath": name,
        "manifest": {"schemaVersion": 7,
                     "includes": {"company": True, "agents": True, "projects": False, "issues": False, "skills": False},
                     "company": {"path": "COMPANY.md", "name": name, "requireBoardApprovalForNewAgents": True},
                     "agents": agents},
        "files": files,
    }

if __name__ == "__main__":
    src = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "c4-org/recruitment.c4")
    out = pathlib.Path("drafts/paperclip") / f"{src.stem}.draft.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    data = build(src)
    out.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{out}: {len(data['manifest']['agents'])} ایجنت")
