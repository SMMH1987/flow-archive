# تست MCP برای OpenBot — موقت

v0.2 · 2026-11-23 17:55 (برلین). هر دو MCP روی VM 103 ساخته شده‌اند. هر دو با stdio کار می‌کنند و هیچ پورتی باز نمی‌کنند.

## یافتهٔ اصلی
OpenBot یک API رسمی لوکال برای خودکارسازی دارد: `/v1/agents`. همان چیزی است که `openbot-cli.mjs` از آن استفاده می‌کند.
- آدرس و کلید آن در `~openbot/.config/OpenBot/automation/{url,token}` است. این پوشه فقط وقتی ساخته می‌شود که برای یک ایجنت «Local scripts» روشن شود.
- endpointها:
  - `GET /v1/agents`
  - `POST /v1/agents/{id}/messages`
  - `GET …/deliveries/{id}`
  - `GET …/pending`
  - `POST …/settings` (با `model`، `provider` و `reasoningEffort`)
  - `POST …/context/clear`
- برای ساختن ایجنت یا ورک‌فلو endpoint مستقیم پیدا نشد. پس B پیام می‌فرستد به یک ایجنت سازنده (Research Desk) تا با ابزارهای داخلی خودش (`create_agent` و `edit_workflow`) بسازد.

| | B v0.2 (API رسمی `/v1`) | A (وب‌اپ با Playwright) |
|-|-|-|
| ابزارها | status، logs، health، list_agents، set_agent_model، send_message، new_chat، create_agent، edit_workflow | list_agents، set_agent_model، create_agent، send_message |
| کار کرد؟ | status، logs و health ✓. بقیهٔ ابزارها منتظر روشن شدن «Local scripts» هستند. | ✗ منتظر لاگین است |
| کار لازم از Siax | در تنظیمات ایجنت، «Local scripts» را برای Research Desk و Telegram Orchestrator روشن کند | یک بار لاگین با ایمیل و کد |
| خطر خرابی | کم (API رسمی و نسخه‌دار است) | زیاد (به متن صفحه بسته است) |
| توکن هر فراخوان | ≈ 0.2K تا 1.5K. ساختن ایجنت به‌اضافهٔ هزینهٔ اجرای خود ایجنت سازنده است. | ≈ 1K تا 3K |
| کلید | موقع اجرا از فایل خوانده می‌شود. چاپ نمی‌شود، جایی نوشته نمی‌شود و از VM بیرون نمی‌رود. | ندارد (کوکی‌های لاگین) |
| سقف | محدودیت تعداد اجرا در ساعت برای هر ایجنت (`automationLimit`) | — |

⚠ تأییدنشده: پیام خطای «Local scripts can only be allowed on the computer that runs the agent» نشان می‌دهد شاید این تنظیم فقط از روی خود سرور روشن شود، نه از وب‌اپ openbot.run.

پیشنهاد: B را نگه دار و A را حذف کن.

## حذف
`sudo rm -rf /opt/openbot-mcp ~/.cache/ms-playwright`

---

## نتیجهٔ نهایی — v0.3 · 2026-11-23 17:58 (برلین)

پیش‌شرط: Siax «Local scripts» را در Agent settings → Permissions برای Telegram Orchestrator و Research Desk روشن کرد.

| تست | A (وب/Playwright) | B (API رسمی محلی /v1) |
|-|-|-|
| کار می‌کند؟ | ✗ ورود دو بار شکست خورد (timeout در Playwright) ← تست نشد | ✓ |
| ۱. Orchestrator ← claude-haiku-5-5 | — | ✓ `set_agent_model` در کمتر از ۱ ثانیه |
| ۲. ساخت «کارشناس جذب» (Haiku) | — | ✓ از راه Research Desk ساخته شد (Siax در اپ دید). در `list_agents` نمی‌آید، چون API فقط ایجنت‌هایی را نشان می‌دهد که Local scripts دارند |
| ۳. ارسال cv405 و خواندن جواب | — | نیمه ✓ ارسال انجام شد و وضعیت `completed` آمد؛ اما API متن جواب را برنمی‌گرداند (`answer: null`) ← جواب را باید در اپ یا تلگرام دید |
| کار لازم از Siax | ورود با ایمیل و کد (شکننده) | یک بار روشن کردن Local scripts برای هر ایجنت |
| ریسک شکستن | بالا: selectorها حدسی‌اند و UI عوض می‌شود | کم: همان API که CLI رسمی هم استفاده می‌کند |
| توکن در هر فراخوان | ≈ ۰ (توکن مدل فقط وقتی ایجنت کار می‌کند) | ≈ ۰ (همین‌طور) |

باگ‌هایی که در B رفع شد: وضعیت `starting` در حلقهٔ انتظار نبود؛ و `wait=true` به ۱ ثانیه تبدیل می‌شد (باید عدد ثانیه باشد).

**توصیه:** B بماند. A حذف شود (فقط بعد از «بله»ی Siax):
`sudo rm -rf /opt/openbot-mcp/a /var/lib/openbot/.cache/ms-playwright ~/.cache/ms-playwright`

## v0.4 · 2026-11-23 17:56 (برلین)
- با «تأیید» Siax (16:53 UTC)، A پاک شد: `/opt/openbot-mcp/a` و کش Playwright. فقط B روی VM 103 مانده است (`/opt/openbot-mcp/b`).
- سند رسمی: `docs/automation.md` («Local scripts API») در مخزن OpenBot. مسیرهای B را تأیید می‌کند. ساختن ایجنت یا روتین در API نیست (خطای 400). برای همین `create_agent` و `edit_workflow` در B پیام را با `send_message` به Research Desk می‌فرستند و آن ایجنت با ابزارهای داخلی `openbot.*` می‌سازد.
