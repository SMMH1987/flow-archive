"""ساخت دادهٔ «سازمان جهانی + ایجنت‌ها» از دو منبع: c4-org/org-global.c4 + c4-org/org-agents.yaml
نسخه 1 — 2026-11-21 12:55 UTC. خروجی فقط‌خواندنی؛ دستی ویرایش نشود.
  python tools/build_org_agents.py            → c4-org/generated/org-agents.json (قالب mk-global + units + workflows)
  python tools/build_org_agents.py --check    → فقط بررسی: id تکراری، واحد ناشناخته، قدم ورک‌فلوی ناشناخته
"""
import json, re, sys, pathlib, yaml
ROOT = pathlib.Path(__file__).resolve().parent.parent
C4, AG = ROOT/'c4-org/org-global.c4', ROOT/'c4-org/org-agents.yaml'
OUT = ROOT/'c4-org/generated/org-agents.json'
MODEL = {'board': 'Opus', 'ceo': 'Opus'}

def parse_c4():
    depts, units, cur = {}, {}, None
    for l in C4.read_text(encoding='utf-8').splitlines():
        m = re.match(r"\s*(\w+) = dept '(.+?)'", l)
        if m: cur = m.group(1); depts[cur] = re.sub(r'^[۰-۹]+\.\s*', '', m.group(2)); continue
        m = re.match(r"\s*extend org\.(\w+)", l)
        if m: cur = m.group(1); continue
        m = re.match(r"\s*(\w+) = (ask|auto|gate)Step '(.+?)'", l)
        if m and cur: units[m.group(1)] = dict(n=m.group(3), mode=m.group(2), k=cur, ir=m.group(1).startswith('ir_'))
    return depts, units

def build():
    depts, units = parse_c4()
    src = yaml.safe_load(AG.read_text(encoding='utf-8'))
    err, out, seen = [], [], set()
    for d, name in depts.items():
        if d != 'strategy':
            out.append(dict(id='h_'+d, n='سرپرست '+name, r='ceo', k=d, mode='ask', m='Sonnet', lvl='division'))
    for u, x in units.items():
        r = None if u == 'board' else 'board' if u == 'ceo' else 'ceo' if x['k'] == 'strategy' else 'h_'+x['k']
        out.append(dict(id=u, n=x['n'], r=r, k=x['k'], mode=x['mode'], m=MODEL.get(u, 'Sonnet'), lvl='dept', ir=x['ir']))
    for u, lst in src['agents'].items():
        if u not in units: err.append(f'واحد ناشناخته: {u}'); continue
        for a in lst:
            aid, n, ref = a[0], a[1], a[2]
            if aid in seen or aid in units: err.append(f'id تکراری: {aid}')
            seen.add(aid)
            out.append(dict(id=aid, n=n, r=u, k=units[u]['k'], mode=a[4] if len(a) > 4 else units[u]['mode'],
                            m=a[3] if len(a) > 3 else 'Haiku', lvl='agent', ref=None if ref == '—' else ref, ir=units[u]['ir']))
    ids = {a['id'] for a in out}
    for w in src['workflows']:
        err += [f"ورک‌فلو {w['id']}: قدم ناشناخته {s}" for s in w['steps'] if s not in ids]
    return dict(cats={d: [n, 0] for d, n in depts.items()}, order=list(depts), agents=out, workflows=src['workflows']), err

if __name__ == '__main__':
    data, err = build()
    for e in err: print('خطا:', e)
    if err: sys.exit(1)
    c = {l: sum(a['lvl'] == l for a in data['agents']) for l in ('division', 'dept', 'agent')}
    print(f"بخش {len(data['order'])} · سرپرست بخش {c['division']} · دپارتمان {c['dept']} · ایجنت {c['agent']} · ورک‌فلو {len(data['workflows'])}")
    if '--check' not in sys.argv:
        OUT.parent.mkdir(exist_ok=True)
        OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding='utf-8'); print('→', OUT.relative_to(ROOT))
