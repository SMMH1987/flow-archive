#!/usr/bin/env python3
"""v1 · 2026-11-21 14:25 Berlin. Builds Paperclip AGENTS.md per agent from c4-org/generated/org-agents.json
(itself built from org-agents.yaml + org-structure.yaml). Never hand-edit the output.
Usage: python tools/build_agent_instructions.py [agent_id ...]  -> c4-org/generated/instructions/<id>/AGENTS.md"""
import json, sys, pathlib
R = pathlib.Path(__file__).resolve().parent.parent
D = json.load(open(R/'c4-org/generated/org-agents.json', encoding='utf-8'))
A = {a['id']: a for a in D['agents']}
nm = lambda i: A[i]['n'] if i in A else ('هیئت‌مدیره (انسان)' if i == 'board' else i)
MODE = {'ask': 'تصمیم‌های مهم را پیشنهاد کن؛ تصمیم نهایی با بالادستی یا انسان است.',
        'gate': 'کار را آماده کن؛ هر قدم بیرونی (انتشار، پیام به بیرون) فقط بعد از تأیید انسان.',
        'auto': 'کار داخلی را خودت انجام بده؛ چیزی بیرون از شرکت نفرست.'}
def build(a):
    L = [f"# {a['n']} ({a.get('t') or ''})", '',
         f"تو {a['n']} هستی و به {nm(a['r'])} گزارش می‌دهی.", '',
         '## مسئولیت‌ها'] + [f"{i}. {t}" for i, t in enumerate(a.get('tasks', []), 1)]
    L += ['', '## از چه کسی کار می‌گیری / به چه کسی می‌سپاری',
          'ورودی از: ' + ('، '.join(nm(x) for x in a.get('inp', [])) or '—'),
          'خروجی به: ' + ('، '.join(nm(x) for x in a.get('outp', [])) or '—'),
          'کاری خارج از مسئولیت‌های بالا رسید: به ' + nm(a['r']) + ' برگردان، چون مالک دیگری دارد.',
          '', '## اختیار', MODE.get(a['mode'], MODE['ask']),
          'پول، قرارداد و حقوقی، انتشار بیرونی و حذف همیشه تأیید انسان می‌خواهد، چون برگشت‌پذیر نیستند.',
          '', '## اگر گیر کردی',
          'بعد از ۲ تلاش ناموفق یا نبود اطلاعات لازم: یک کامنت کوتاه (چه کم است، چه کسی می‌تواند بدهد) بگذار و تسک را blocked کن. دوباره تلاش نکن، چون تکرار خودکار پرهزینه است.',
          '', '## شکل خروجی', 'کوتاه و فارسی؛ هر عدد یا ادعا با منبع؛ چیز تأییدنشده را «تأییدنشده» بنویس.']
    if a.get('ir'): L += ['', '## لایهٔ ایران', 'این نقش مخصوص ایران است؛ منابع قانونی را تأییدنشده فرض کن تا انسان بررسی کند.']
    if a.get('s'): L += ['', '## skillها', 'فقط این‌ها: ' + ', '.join(a['s'])]
    return '\n'.join(L) + '\n'
ids = sys.argv[1:] or list(A)
for i in ids:
    p = R/'c4-org/generated/instructions'/i; p.mkdir(parents=True, exist_ok=True)
    (p/'AGENTS.md').write_text(build(A[i]), encoding='utf-8')
    print(i, len(build(A[i]).splitlines()), 'lines')
