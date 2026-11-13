"""Dry-run planner: org + profile + rules.yaml -> ordered steps, with skipped steps and why. No side effects.
usage: python plan.py orgs/<org>.yaml profiles/<profile>.yaml"""
import sys, yaml, pathlib
H = pathlib.Path(__file__).parent
FLOW = ["نوشتن آگهی", "table:ad_channel", "غربال رزومه", "table:pre_interview", "مصاحبه", "table:post_interview", "ارسال پیشنهاد [gate]"]
VISA = ["جمع‌آوری مدارک", "درخواست ویزا [gate]", "برنامهٔ انتقال"]
def get(ctx, k): return ctx["org"][k[4:]] if k.startswith("org.") else ctx[k]
def match(cond, v, ctx):
    op, val = cond.split(" ", 1)
    if val.startswith("org."): val = get(ctx, val)
    elif isinstance(v, (int, float)): val = float(val)
    return {"==": str(v) == str(val) if not isinstance(v,(int,float)) else v == val, "!=": str(v) != str(val), ">": v > val, "<": v < val}[op]
def plan(org, p):
    ctx = {**p, "org": org}
    T = yaml.safe_load((H / "rules.yaml").read_text(encoding="utf-8"))["tables"]
    run, skipped = [], []
    for s in FLOW:
        if not s.startswith("table:"): run.append(s); continue
        t = T[s[6:]]; hit = 0
        for r in t["rules"]:
            ok = all(match(c, get(ctx, k), ctx) for k, c in r["when"].items())
            if ok and not (t["hit_policy"] == "FIRST" and hit):
                hit += 1; h = r["then"]
                if h["step"].startswith("subflow:"): run += ["  ↳ " + x for x in VISA]
                else: run.append(h["step"] + (" [gate]" if "gate" in h else ""))
            elif not ok: skipped.append(f'{r["then"]["step"]}  ({", ".join(f"{k} {c}" for k, c in r["when"].items())})')
    ran = {x.replace(" [gate]","") for x in run}
    out, seen = [], set()
    for x in skipped:
        k = x.split("  (")[0]
        if k not in ran and k not in seen: seen.add(k); out.append(x)
    return run, out
if __name__ == "__main__":
    org = yaml.safe_load(open(sys.argv[1], encoding="utf-8")); p = yaml.safe_load(open(sys.argv[2], encoding="utf-8"))
    run, sk = plan(org, p)
    print(f"# {org['org']} / {p['profile']}"); [print(f"{i+1}. {s}") for i, s in enumerate(run)]
    print("رد شد:", *sk, sep="\n  - ")
