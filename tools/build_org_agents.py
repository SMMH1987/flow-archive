"""ساخت دادهٔ «سازمان جهانی + ایجنت‌ها» از c4-org/org-global.c4 + c4-org/org-agents.yaml
نسخه 4 — 2026-11-21 12:45 UTC (رنگ ثابت هر دپارتمان). خروجی فقط‌خواندنی؛ دستی ویرایش نشود.
  python tools/build_org_agents.py          → c4-org/generated/org-agents.json
  python tools/build_org_agents.py --check  → فقط بررسی (واحد/رئیس/ورک‌فلو/ارتباط ناشناخته)
قاعده: هیئت‌مدیره، مدیرعامل و همهٔ سرپرست‌های h_* در دپارتمان «۰. مدیریت ارشد» (Executive Office / C-suite).
"""
import json, re, sys, pathlib, yaml
ROOT = pathlib.Path(__file__).resolve().parent.parent
C4, AG, OUT = ROOT/'c4-org/org-global.c4', ROOT/'c4-org/org-agents.yaml', ROOT/'c4-org/generated/org-agents.json'
# رنگ (hue) هر دپارتمان؛ سرپرست و همهٔ زیرمجموعه‌اش یک رنگ. استاندارد رسمی جهانی برای رنگ دپارتمان وجود ندارد؛
# این قرارداد رایج است: مالی سبز، فناوری آبی، بازاریابی نارنجی، فروش قرمز، منابع انسانی بنفش، حقوقی بنفش‌تیره، ریسک قرمز تیره، مدیریت طلایی.
HUE = {'exec': 45, 'strategy': 45, 'finance': 130, 'capability': 155, 'service': 180, 'tech': 205, 'rnd': 230, 'legal': 255,
       'hr': 285, 'sales': 330, 'risk': 355, 'marketing': 20, 'ops': 70, 'assets': 100}
CSUITE = {'rnd': 'CPO', 'marketing': 'CMO', 'sales': 'CRO', 'ops': 'COO', 'service': 'CCO', 'hr': 'CHRO', 'tech': 'CTO/CIO',
          'finance': 'CFO', 'assets': 'CAO', 'risk': 'CRO/CISO', 'legal': 'CLO', 'capability': 'CTrO'}

def parse_c4():
    depts, units, cur = {}, {}, None
    for l in C4.read_text(encoding='utf-8').splitlines():
        m = re.match(r"\s*(\w+) = dept '(.+?)'", l)
        if m: cur = m.group(1); depts[cur] = re.sub(r'^[۰-۹]+\.\s*', '', m.group(2)); continue
        m = re.match(r"\s*extend org\.(\w+)", l)
        if m: cur = m.group(1); continue
        m = re.match(r"\s*(\w+) = (ask|auto|gate)Step '(.+?)'", l)
        if m and cur: units[m.group(1)] = dict(n=m.group(3), mode=m.group(2), k=cur)
    return depts, units

def build():
    depts, units = parse_c4()
    src = yaml.safe_load(AG.read_text(encoding='utf-8'))
    err, out = [], [dict(id='board', n='هیئت‌مدیره', t='تصویب راهبرد، بودجه و تصمیم‌های بزرگ (انسان)', r=None, k='exec', mode='gate', m='—', lvl='board')]
    for a in src['agents']:
        head = a['id'] == 'ceo' or a['id'].startswith('h_')
        if not head and a['unit'] not in units: err.append(f"{a['id']}: واحد ناشناخته {a['unit']}")
        t = (CSUITE.get(a['div'], '') + ' · ' if a['id'].startswith('h_') else '') + (a.get('en') or '')
        out.append(dict(id=a['id'], n=a['n'], t=t, tm=None if head else units.get(a['unit'], {}).get('n'), r=a['r'],
                        k='exec' if head else a['div'], mode=a['mode'], m=a['m'], ir=a.get('ir', False), s=a.get('skills', []),
                        tasks=a.get('tasks', []), inp=a.get('inputs', []), outp=a.get('outputs', []), src=a.get('sources', []),
                        lvl='head' if head else 'agent', cc=a['div'] if a['id'].startswith('h_') else None))
    ids = {a['id'] for a in out}
    byunit = {}
    for a in out: byunit.setdefault(a.get('tm') and next((u for u in units if units[u]['n'] == a['tm']), None), a['id'])
    for a in out:
        if a['r'] and a['r'] not in ids: err.append(f"{a['id']}: رئیس ناشناخته {a['r']}")
        a['inp'] = [x for x in a.get('inp', []) if x in ids]; a['outp'] = [x for x in a.get('outp', []) if x in ids]
    wfs = []
    for w in src['workflows']:
        steps = []
        for s in w['steps']:
            aid = s[0] if s[0] in ids else byunit.get(s[0])
            if not aid: err.append(f"ورک‌فلو «{w['name']}»: قدم ناشناخته {s[0]}"); continue
            steps.append([aid, s[1]])
        wfs.append(dict(n=w['name'], s=steps))
    cats = {'exec': 'مدیریت ارشد (هیئت‌مدیره + مدیرعامل + C-suite)', **depts}
    return dict(cats={k: [v, HUE[k]] for k, v in cats.items()}, order=list(cats), agents=out, workflows=wfs, unverified=src.get('unverified', [])), err

if __name__ == '__main__':
    data, err = build()
    for e in err: print('خطا:', e)
    n = len(data['agents']); rel = sum(len(a.get('outp', [])) for a in data['agents'])
    print(f"دپارتمان {len(data['order'])} · ایجنت {n} · ارتباط {rel} · ورک‌فلو {len(data['workflows'])}")
    if err: sys.exit(1)
    if '--check' not in sys.argv:
        OUT.parent.mkdir(exist_ok=True)
        OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding='utf-8'); print('→', OUT.relative_to(ROOT))
