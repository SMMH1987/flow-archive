"""ساخت c4-org/org-global.c4 از c4-org/org-structure.yaml — نسخه 1 — 2026-11-21 13:10 UTC
منبع = yaml (تأیید Siax 2026-11-21 13:03 UTC). خروجی c4 فقط‌خواندنی است، برای استودیو و LikeC4؛ دستی ویرایش نشود.
  python tools/build_org_c4.py          → بازنویسی org-global.c4
  python tools/build_org_c4.py --check  → خطا اگر org-global.c4 با yaml هم‌خوان نباشد
"""
import sys, pathlib, yaml
ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, OUT = ROOT/'c4-org/org-structure.yaml', ROOT/'c4-org/org-global.c4'
HEAD = """// ⚠ فایل ساخته‌شده — دستی ویرایش نکنید. منبع: c4-org/org-structure.yaml · ساخت: python tools/build_org_c4.py
// چارت سازمانی جهانی + لایهٔ مکانی ایران — یک مدل واحد (SSOT) — 2026-11-13
// منابع (از حافظه، نیاز به بررسی): APQC PCF Cross-Industry v7.x (۱۳ دسته)، Porter Value Chain 1985، COSO ERM 2017، ISO 37000/31000/27001/9001، ITIL 4، SCOR
// لایهٔ ایران = همان مدل + عناصر با تگ #loc_ir؛ هیچ بخشی کپی نشده. انتخاب لایه: org-global.rules.yaml
// رنگ: ask نارنجی · auto سبز · gate قرمز. هر قدم external: yes|no|? صریح دارد. محتوای حقوقی ایران: تأییدنشده → پروژهٔ حق‌پرس

specification {
  element orgBox { style { color slate } }
  element dept { style { color muted } }
  element askStep { notation "after: ask" style { color amber } }
  element autoStep { notation "after: auto" style { color green } }
  element gateStep { notation "after: gate — پول/حقوقی/انتشار/غیرقابل‌برگشت" style { color red } }
  tag loc_global
  tag loc_ir
  tag unverified
  tag primary
  tag support
}
"""
VIEWID = {'tech': 'it'}

def unit(u, ind):
    tags = '#loc_ir #unverified' if u['ir'] else '#loc_global'
    return (f"{ind}{u['id']} = {u['mode']}Step '{u['n']}' {{ {tags}\n{ind}  description '{u['desc']}'\n"
            f"{ind}  metadata {{ external '{u['external']}' }}\n{ind}}}\n")

def build():
    s = yaml.safe_load(SRC.read_text(encoding='utf-8'))
    o = [HEAD, "model {\n  org = orgBox 'سازمان (نسخهٔ جهانی)' {\n    description 'سلسله‌مراتب: بخش → واحد. اولیه = زنجیرهٔ ارزش اصلی، پشتیبان = بقیه'\n"]
    for d in s['departments']:
        o.append(f"    {d['id']} = dept '{d['n']}' {{\n      #loc_global #{d['group']}\n      technology '{d['std']}'\n")
        o += [unit(u, '      ') for u in d['units'] if not u['ir']]
        o.append("    }\n")
    o.append("  }\n\n  // ===== لایهٔ ایران (overlay): همان بخش‌ها گسترش می‌یابند =====\n")
    for d in s['departments']:
        for u in d['units']:
            if u['ir']: o.append(f"  extend org.{d['id']} {{\n" + unit(u, '    ') + "  }\n")
    o.append("\n  // جریان کار اصلی (زنجیرهٔ ارزش پورتر)\n")
    o += [f"  org.{a} -> org.{b} '{t}'\n" for a, b, t in s['flows']]
    o.append("}\n\nviews {\n  view world of org {\n    title 'چارت جهانی (بدون ماژول‌های ایران)'\n    include *\n    exclude element.tag = #loc_ir\n    autoLayout TopBottom\n  }\n"
             "  view iran_layer of org {\n    title 'چارت ایران = جهانی + ماژول‌های ایران'\n    include *\n    autoLayout TopBottom\n  }\n")
    o += [f"  view {VIEWID.get(d['id'], d['id'])}_detail of org.{d['id']} {{ title '{d['n']}' include * autoLayout TopBottom }}\n" for d in s['departments']]
    o.append("}\n")
    return ''.join(o)

if __name__ == '__main__':
    txt = build()
    if '--check' in sys.argv:
        ok = OUT.read_text(encoding='utf-8') == txt
        print('هم‌خوان ✓' if ok else 'ناهم‌خوان ✗ — python tools/build_org_c4.py را اجرا کنید'); sys.exit(0 if ok else 1)
    OUT.write_text(txt, encoding='utf-8'); print('→', OUT.relative_to(ROOT))
