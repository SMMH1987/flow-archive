# تست MCP برای OpenBot — موقت

v0.1 · 2026-11-23 17:45 (برلین). دو سرور MCP آزمایشی روی VM 103 ساخته شد. هر دو با stdio کار می‌کنند و هیچ پورت شبکه‌ای باز نمی‌کنند.

| | B: خواندن `openbot status/logs` | A: وب‌اپ openbot.run با Playwright |
|-|-|-|
| مسیر | `/opt/openbot-mcp/b` (فقط کتابخانهٔ استاندارد پایتون) | `/opt/openbot-mcp/a` (183MB، به‌اضافهٔ 700MB Chromium) |
| ابزارها | status، logs(tail)، health | list_agents، set_agent_model، create_agent، send_message |
| کار کرد؟ | ✓ status، 20 خط لاگ و health همه جواب دادند | ✗ هنوز نه: لاگین نشده و صفحه جواب نداد (timeout) |
| کار لازم از Siax | هیچ | یک بار لاگین با ایمیل و کد: `ssh -t ubuntu@192.168.88.254 /opt/openbot-mcp/a/venv/bin/python /opt/openbot-mcp/a/login.py` |
| خطر خرابی | کم (فقط به خروجی CLI بسته است) | زیاد (به متن و چیدمان صفحه بسته است؛ هر آپدیت ممکن است خرابش کند) |
| هزینهٔ توکن هر فراخوان | ≈ 200 تا 1.5K توکن ورودی (حدود 1K؛ بیشترش متن لاگ) | ≈ 1K تا 3K توکن ورودی (متن صفحه)، به‌اضافهٔ اجرای خود ایجنت داخل OpenBot |
| ایجنت می‌سازد؟ | نه | بله، از راه پیام دادن به Research Desk (تست‌نشده) |

یافته در لاگ: یک خطای `ETIMEDOUT` شبکه در 16:34؛ health آن را گرفت.

بات تلگرام اختصاصی: در 0.76.1 گزینه‌اش نیست. تلگرام فقط با `centralAuth.createTelegramLink` به @meetOpenBot وصل می‌شود (تأییدنشده با مستند رسمی).

## حذف
`sudo rm -rf /opt/openbot-mcp ~/.cache/ms-playwright`
