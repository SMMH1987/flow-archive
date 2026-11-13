# flow-archive — نقشهٔ فایل‌ها (۲۰۲۶-۱۰-۲۹)

این پوشه کپی کار سشن «ابزارهای متن‌به‌نمودار شبیه Eraser» است (مبدأ: پوشهٔ scratch همان سشن). نیت: [INTENT.md](INTENT.md)

| چه | کجا |
|---|---|
| مخزن آنلاین | https://github.com/SMMH1987/flow-archive |
| سایت آرشیو (Pages) | https://smmh1987.github.io/flow-archive/ |
| Map جمع‌وبازشو (Markmap) | https://smmh1987.github.io/flow-archive/map.html?md=flows%2Fhire-commission-sales.markmap.md |
| سایت LikeC4 (بعد از Commit فایل workflow) | https://smmh1987.github.io/flow-archive/c4/ |
| فلوها (`.ofk` / `.mmd` / `.markmap.md` / `.c4`) | `flows/` |
| مدل‌های معماری | `models/` و `docs/models-src/` |
| سایت ایستای LikeC4 ساخته‌شدهٔ محلی | `likec4/` (همان که روی `localhost:8766` سرو می‌شد) |
| موکاپ‌ها (۳ تب BPM / Mermaid / PlantUML / BPMN) | `docs/mockups/` |
| استودیوی سازمان (موکاپ تعاملی؛ ویرایش ← خروجی کامل `recruitment.c4`) | `docs/mockups/org-studio.html` |
| لینک‌های آنلاین ساخته‌شده | `docs/links/` |
| اجراکنندهٔ فلو (skill) | `C:\Users\mmhse\.claude\skills\mental-rules\skills\cc-flow-run\` — `SKILL.md`، `check_parity.py`، `to_markmap.py`، `build_archive.py`، `likec4/hiring.c4`، `site/` |

## ⚠️ وضعیت git (هنگام کپی)
- کامیت محلی `56a6c62` (LikeC4 + ورک‌فلوی مرحله‌ای، از سشن دیگر) هنوز **push نشده**.
- روی GitHub کامیت `f06f106` (`likec4/hiring.c4`، منبع LikeC4) هست که این‌جا نیست ← دو شاخه از هم جدا شده‌اند.
- در مخزن GitHub، `likec4/` = **منبع** (`.c4`)؛ در این کپی محلی، `likec4/` = **سایت ساخته‌شده**. قبل از push یکی را جابه‌جا کنید (پیشنهاد: سایت ← `c4/`).
- ۲۷ فایل تغییر داده‌شده/کامیت‌نشده در `likec4/` (بازسازی سایت).

- [STANDARD-PROCESS-BUILD.md](STANDARD-PROCESS-BUILD.md) — دستورالعمل ساخت هر فرایند/ایجنت (مدل Camunda)
