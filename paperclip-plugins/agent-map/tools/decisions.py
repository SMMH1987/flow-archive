#!/usr/bin/env python3
"""v1.1 · 2026-11-22 06:58 Berlin (struck-out bullets = removed). v1 · 2026-11-22 06:55 Berlin. Reads DECISIONS.md (Siax's approvals) into a list for the plugin's «تصمیم‌ها» section.
Never hand-edit the output; DECISIONS.md is the only home of these decisions."""
import re
LINK = re.compile(r'\[([^\]]+)\]\([^)]+\)')
def clean(t):
    t = LINK.sub(r'\1', t).replace('**', '').replace('`', '')
    return t.strip()
def parse(md):
    out, cur, date = [], None, None
    def push():
        if cur: cur['body'] = '\n'.join(l for l in cur['body'] if l).strip(); out.append(cur)
    for raw in md.splitlines():
        line = raw.rstrip()
        if line.startswith('## '):
            push(); h = line[3:].strip()
            m = re.match(r'(\d{4}-\d{2}-\d{2})\s*·\s*(.*)', h)
            if not m:  # «تصمیم‌های قبلی امروز»: each bullet below becomes its own item
                cur = None; continue
            date, rest = m.group(1), m.group(2)
            who = None; pm = re.search(r'\(([^()]*)\)\s*$', rest)
            if pm and ('Siax' in pm.group(1) or 'تأیید' in pm.group(1)): who, rest = pm.group(1), rest[:pm.start()].strip()
            replaced = '~~' in rest
            note = re.sub(r'~~.*?~~', '', rest).strip(' ()') if replaced else ''
            title = clean(re.sub(r'~~(.*?)~~', r'\1', rest)); title = re.sub(r'\s*\(جایگزین.*?\)\s*', '', title).strip()
            cur = {'date': date, 'title': title, 'who': clean(who) if who else None, 'status': 'replaced' if replaced else 'active',
                   'note': clean(note), 'kind': 'rule' if 'قانون' in h else 'decision', 'body': []}
            continue
        if cur is None:
            if line.startswith('- ') and date:
                t = clean(line[2:]); pm = re.search(r'\(([^()]*Siax[^()]*)\)\.?\s*$', t)
                who = pm.group(1) if pm else None
                if pm: t = t[:pm.start()].rstrip(' .')
                if '~~' in t:  # struck out = removed later; the parenthesis says by whom and when
                    out.append({'date': date, 'title': re.sub(r'~~(.*?)~~', r'\1', t).strip(' .'), 'who': None, 'status': 'replaced',
                                'note': who or 'حذف شد', 'kind': 'rule', 'body': ''}); continue
                out.append({'date': date, 'title': t, 'who': who, 'status': 'active' if who else 'unconfirmed',
                            'note': '' if who else 'زمان و جملهٔ تأیید ثبت نشده', 'kind': 'rule', 'body': ''})
            continue
        if line.startswith('هر تصمیم با تاریخ'): continue
        if line.startswith('|'):
            cells = [c.strip() for c in line.strip('|').split('|')]
            if set(''.join(cells)) <= set('-: ') or cells[0] == '#': continue
            line = ' · '.join(clean(c) for c in cells if c)
        cur['body'].append(clean(line.lstrip('- ')) if line.startswith('- ') else clean(line))
    push()
    return out
if __name__ == '__main__':
    import sys, json; print(json.dumps(parse(open(sys.argv[1], encoding='utf-8').read()), ensure_ascii=False, indent=1))
