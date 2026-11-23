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
