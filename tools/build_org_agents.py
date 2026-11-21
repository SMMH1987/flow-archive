"""ساخت دادهٔ «سازمان جهانی + ایجنت‌ها» از دو منبع: c4-org/org-global.c4 + c4-org/org-agents.yaml
نسخه 2 — 2026-11-21 12:40 UTC (همهٔ مدیران در دپارتمان «مدیریت ارشد»). خروجی فقط‌خواندنی؛ دستی ویرایش نشود.
  python tools/build_org_agents.py            → c4-org/generated/org-agents.json (قالب mk-global + units + workflows)
  python tools/build_org_agents.py --check    → فقط بررسی: id تکراری، واحد ناشناخته، قدم ورک‌فلوی ناشناخته
"""
import json, re, sys, pathlib, yaml
ROOT = pathlib.Path(__file__).resolve().parent.parent
C4, AG = ROOT/'c4-org/org-global.c4', ROOT/'c4-org/org-agents.yaml'
OUT = ROOT/'c4-org/generated/org-agents.json'
MODEL = {'board': 'Opus', 'ceo': 'Opus'}
# استاندارد جهانی: همهٔ مدیران ارشد (هیئت‌مدیره، مدیرعامل، C-suite) در یک دپارتمان «مدیریت ارشد» (Executive Office)
CSUITE = {'strategy': 'CSO مدیر ارشد راهبرد', 'rnd': 'CPO مدیر ارشد محصول', 'marketing': 'CMO مدیر ارشد بازاریابی',
  'sales': 'CRO مدیر ارشد درآمد/فروش', 'ops': 'COO مدیر ارشد عملیات', 'service': 'CCO مدیر ارشد مشتری',
  'hr': 'CHRO مدیر ارشد منابع انسانی', 'tech': 'CTO/CIO مدیر ارشد فناوری', 'finance': 'CFO مدیر ارشد مالی',
  'assets': 'CAO مدیر ارشد اداری', 'risk': 'CRiskO/CISO مدیر ارشد ریسک و امنیت', 'legal': 'CLO مدیر ارشد حقوقی',
  'capability': 'CTrO مدیر ارشد تحول'}
EXEC_UNITS = {'board', 'ceo'}

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
        out.append(dict(id='h_'+d, n=CSUITE[d], t='سرپرست بخش '+name, r='ceo', k='exec', mode='ask', m='Sonnet', lvl='division'))
    for u, x in units.items():
        r = None if u == 'board' else 'board' if u == 'ceo' else 'h_'+x['k']
        out.append(dict(id=u, n=x['n'], r=r, k='exec' if u in EXEC_UNITS else x['k'], mode=x['mode'], m=MODEL.get(u, 'Sonnet'), lvl='dept', ir=x['ir']))
    for u, lst in src['agents'].items():
        if u not in units: err.append(f'واحد ناشناخته: {u}'); continue
        for a in lst:
            aid, n, ref = a[0], a[1], a[2]
            if aid in seen or aid in units: err.append(f'id تکراری: {aid}')
            seen.add(aid)
            out.append(dict(id=aid, n=n, r=u, k='exec' if u in EXEC_UNITS else units[u]['k'], mode=a[4] if len(a) > 4 else units[u]['mode'],
                            m=a[3] if len(a) > 3 else 'Haiku', lvl='agent', ref=None if ref == '—' else ref, ir=units[u]['ir']))
    ids = {a['id'] for a in out}
    for w in src['workflows']:
        err += [f"ورک‌فلو {w['id']}: قدم ناشناخته {s}" for s in w['steps'] if s not in ids]
    return dict(cats={'exec': ['۰. مدیریت ارشد (هیئت‌مدیره + مدیرعامل + C-suite)', 0], **{d: [n, 0] for d, n in depts.items()}}, order=['exec']+list(depts), agents=out, workflows=src['workflows']), err

if __name__ == '__main__':
    data, err = build()
    for e in err: print('خطا:', e)
    if err: sys.exit(1)
    c = {l: sum(a['lvl'] == l for a in data['agents']) for l in ('division', 'dept', 'agent')}
    print(f"بخش {len(data['order'])} · سرپرست بخش {c['division']} · دپارتمان {c['dept']} · ایجنت {c['agent']} · ورک‌فلو {len(data['workflows'])}")
    if '--check' not in sys.argv:
        OUT.parent.mkdir(exist_ok=True)
        OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding='utf-8'); print('→', OUT.relative_to(ROOT))
