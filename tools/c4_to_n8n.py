"""Bridge: one phase of a .c4 flow -> n8n workflow JSON (shape only).

Rule (SSOT): the .c4 file owns the SHAPE (which steps, order, branches, gates).
n8n owns the RUN SETTINGS (real node type, parameters, credentials).
So when a workflow already exists in n8n, pass it as `existing`: every node whose
c4 id matches keeps its type, parameters and credentials; only names, positions and
connections are rewritten from .c4. Steps removed from .c4 are removed from n8n.

  python tools/c4_to_n8n.py c4-org/startup-studio.c4 p0            # print JSON
  python tools/c4_to_n8n.py c4-org/startup-studio.c4 p0 --existing old.json

Mapping (placeholders, no credentials):
  first step  <- Webhook trigger (path = <block>)
  askStep     -> Wait (resume on webhook)      : ask the human, continue on answer
  gateStep    -> Wait (resume on webhook)      : stop until a human approves
  autoStep    -> No Operation (placeholder)    : replace in n8n with the real node
  routeStep   -> Switch on $json.route         : one output per branch label
Every node carries `notes = "c4:<block>.<step>"`; that key is how settings survive.
"""
from __future__ import annotations

import hashlib, json, re, sys, uuid

STEP = re.compile(r"^\s*(\w+)\s*=\s*(askStep|gateStep|autoStep|routeStep)\s+'([^']*)'", re.M)
EDGE = re.compile(r"^\s*(\w+)\s*->\s*(\w+)(?:\s+'([^']*)')?", re.M)
BRANCHES = re.compile(r"branches\s+'([^']*)'")
DESC = re.compile(r"description\s+'([^']*)'")
SKILL = re.compile(r"technology\s+'([^']*)'")


def block(text: str, bid: str) -> tuple[str, str]:
    m = re.search(rf"^\s*{re.escape(bid)}\s*=\s*\w+\s+'([^']*)'\s*\{{", text, re.M)
    if not m:
        raise SystemExit(f"block {bid} not found")
    i, depth = m.end(), 1
    while depth:
        depth += {"{": 1, "}": -1}.get(text[i], 0)
        i += 1
    return m.group(1), text[m.end():i - 1]


def body_of(src: str, start: int) -> str:
    i = src.find("{", start)
    nl = src.find("\n", start)
    if i < 0 or i > nl:  # step without body
        return ""
    j, depth = i + 1, 1
    while depth:
        depth += {"{": 1, "}": -1}.get(src[j], 0)
        j += 1
    return src[i:j]


def parse(text: str, bid: str):
    title, src = block(text, bid)
    steps = []
    for m in STEP.finditer(src):
        b = body_of(src, m.end())
        g = lambda rx: (rx.search(b).group(1) if rx.search(b) else "")
        steps.append({"id": m.group(1), "kind": m.group(2), "title": m.group(3),
                      "desc": g(DESC), "skill": g(SKILL),
                      "branches": [x for x in g(BRANCHES).split("|") if x]})
    ids = {s["id"] for s in steps}
    edges = [(a, b, lbl or "") for a, b, lbl in EDGE.findall(src) if a in ids and b in ids]
    return title, steps, edges


def nid(key: str) -> str:
    return str(uuid.uuid5(uuid.NAMESPACE_URL, "c4:" + key))


def placeholder(s: dict) -> tuple[str, int, dict]:
    if s["kind"] in ("askStep", "gateStep"):
        return "n8n-nodes-base.wait", 1.1, {"resume": "webhook"}
    if s["kind"] == "routeStep":
        rules = [{"conditions": {"options": {"caseSensitive": True, "typeValidation": "loose"},
                                 "conditions": [{"leftValue": "={{ $json.route }}", "rightValue": b,
                                                 "operator": {"type": "string", "operation": "equals"}}],
                                 "combinator": "and"},
                  "renameOutput": True, "outputKey": b} for b in s["branches"]]
        return "n8n-nodes-base.switch", 3.2, {"rules": {"values": rules}}
    return "n8n-nodes-base.noOp", 1, {}


ICON = {"askStep": "💬", "gateStep": "✋", "autoStep": "⚙️", "routeStep": "🔀"}


def build(text: str, bid: str, existing: dict | None = None) -> dict:
    title, steps, edges = parse(text, bid)
    old = {}
    for n in (existing or {}).get("nodes", []):
        k = (n.get("notes") or "").split("\n")[0]
        if k.startswith("c4:"):
            old[k] = n
    # layout: depth from first step, rows by branch order
    order = {s["id"]: i for i, s in enumerate(steps)}
    depth, row = {steps[0]["id"]: 1}, {steps[0]["id"]: 0}
    for _ in steps:
        for a, b, lbl in edges:
            if a in depth and b not in depth:
                depth[b] = depth[a] + 1
                sib = [e for e in edges if e[0] == a]
                row[b] = row[a] + sib.index((a, b, lbl)) - (len(sib) - 1) / 2
    nodes, names = [], {}
    trig_key = f"c4:{bid}.trigger"
    t = old.get(trig_key) or {"type": "n8n-nodes-base.webhook", "typeVersion": 2,
                              "parameters": {"httpMethod": "POST", "path": bid, "responseMode": "onReceived"}}
    nodes.append({**t, "id": nid(trig_key), "name": "▶ شروع", "position": [0, 0],
                  "notes": trig_key, "webhookId": t.get("webhookId") or nid(trig_key + ":hook")})
    for s in steps:
        key = f"c4:{bid}.{s['id']}"
        name = f"{ICON[s['kind']]} {s['title']}"[:60]
        names[s["id"]] = name
        typ, ver, params = placeholder(s)
        prev = old.get(key)
        n = {"id": nid(key), "name": name, "type": typ, "typeVersion": ver, "parameters": params}
        if prev and not (s["kind"] == "routeStep"):  # n8n owns settings; route outputs follow .c4
            for f in ("type", "typeVersion", "parameters", "credentials", "webhookId"):
                if f in prev:
                    n[f] = prev[f]
        n["position"] = [depth.get(s["id"], order[s["id"]] + 1) * 260, int(row.get(s["id"], 0) * 180)]
        n["notes"] = "\n".join(x for x in (key, s["skill"], s["desc"]) if x)
        nodes.append(n)
    conns: dict = {"▶ شروع": {"main": [[{"node": names[steps[0]["id"]], "type": "main", "index": 0}]]}}
    for s in steps:
        out = [(b, lbl) for a, b, lbl in edges if a == s["id"]]
        if not out:
            continue
        if s["kind"] == "routeStep":
            slots = [[] for _ in s["branches"]]
            for b, lbl in out:
                i = s["branches"].index(lbl) if lbl in s["branches"] else 0
                slots[i].append({"node": names[b], "type": "main", "index": 0})
        else:
            slots = [[{"node": names[b], "type": "main", "index": 0} for b, _ in out]]
        conns[names[s["id"]]] = {"main": slots}
    wf = {"name": f"{bid} · {title}", "nodes": nodes, "connections": conns,
          "settings": {"executionOrder": "v1"},
          "meta": {"c4_source_hash": hashlib.sha1(text.encode()).hexdigest()[:12], "c4_block": bid}}
    return wf


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__); return 2
    existing = None
    if "--existing" in argv:
        existing = json.load(open(argv[argv.index("--existing") + 1], encoding="utf-8"))
    text = open(argv[0], encoding="utf-8").read()
    print(json.dumps(build(text, argv[1], existing), ensure_ascii=False, indent=1))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
