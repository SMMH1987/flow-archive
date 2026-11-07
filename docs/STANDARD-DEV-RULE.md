# قانون توسعه: «آمادهٔ اتصال» (v1) — برای افزودن به AGENTS.md هر پروژه

هدف: هر پروژه با این قانون، خودش (Claude Code یا Codex) ساختار اتصال را کامل کند، بدون اینکه هر بار توضیح بدهی.
ترکیبی از: `STANDARD-MCP.md`، `STANDARD-HIDE-INTERNALS.md`، `CHECKLIST-CHOOSE-PROTOCOL.md`.
وضعیت: **پیشنهاد؛ کدهای نمونه اجرا نشده‌اند** و فقط الگو هستند. نام پوشه‌ها پیشنهاد من است.

## ۱. ساختار استاندارد (در ریشهٔ هر پروژه)
```
interop/
  tools.py            ← تنها منبع حقیقت: فهرست ابزارها (نام، توضیح، schema ورودی/خروجی، نوع read|write، risky)
  service.py          ← مغز سرویس (توابع خالص؛ نه HTTP، نه MCP)
  rest.py             ← REST /v1 از روی tools.py (+ /v1/health)
  mcp_server.py       ← سرور MCP (Streamable HTTP) از روی tools.py
  openai_tools.json   ← خروجی تولیدشده: قالب OpenAI از روی tools.py (دستی ویرایش نشود)
  openapi.yaml        ← خروجی تولیدشده (دستی ویرایش نشود)
  gates.yaml          ← کدام ابزار پشت تأیید انسانی است
  config.example.env  ← HOST, PORT, PUBLIC_BASE_URL, AUTH_REQUIRED, API_KEYS (نام‌ها، نه مقدار)
  tests/
    test_no_leak.py        ← نشت ساختار داخلی
    test_tools_parity.py   ← REST، MCP و openai_tools.json از یک schema‌اند
    test_gates.py          ← ابزار risky بدون تأیید اجرا نمی‌شود
    test_read_only.py      ← کلید فقط‌خواندنی ابزار نوشتنی را نمی‌خواند
  README.md           ← چطور وصل شویم (Claude Code و OpenAI-قالب) + تنها صفحهٔ مرجع بیرونی
capabilities.entry.yaml ← یک ردیف برای capabilities.yaml مرکزی
```
قاعده: `interop/` کد جدیدی دربارهٔ منطق کار نمی‌نویسد؛ فقط `service.py` را صدا می‌زند.

## ۲. الگوی منبع حقیقت (طرح، اجرا نشده)
```python
# interop/tools.py
TOOLS = [
  {"name": "vakil_case_start", "kind": "write", "risky": False,
   "description": "شروع پرونده. case_id برای ۷۲ ساعت معتبر است. بعد از آن vakil_case_answer را صدا بزن.",
   "input": {"type": "object", "additionalProperties": False,
             "properties": {"description": {"type": "string", "minLength": 10, "maxLength": 6000},
                            "area": {"type": "string"}},
             "required": ["description"]},
   "output": {...},                 # JSON Schema خروجی عمومی
   "handler": "service.case_start"},
  ...
]
# از همین فهرست: ۱) inputSchema/outputSchema برای MCP ۲) parameters برای openai_tools.json
# ۳) openapi.yaml ۴) مسیرهای REST. فقط یک جا ویرایش می‌شود.
```
نمونهٔ قالب OpenAI از همان ورودی: `{"type":"function","function":{"name":…,"description":…,"parameters":<input>}}`.

## ۳. بلوک آمادهٔ چسباندن در AGENTS.md
```
## قانون توسعه: آمادهٔ اتصال (مرجع: flow-archive/docs/STANDARD-DEV-RULE.md)
هر قابلیتی که از بیرون صدا زده می‌شود (بات، پروژهٔ دیگر، Claude، مدل OpenAI-قالب/OpenRouter):
1. ابزارش را فقط در interop/tools.py تعریف کن؛ REST، MCP، openai_tools.json و openapi.yaml را از آن تولید کن، دستی ویرایش نکن.
2. منطق در interop/service.py بماند؛ لایه‌های HTTP/MCP فقط صدا بزنند.
3. پیش‌فرض: همیشه دو مصرف‌کننده (Claude/MCP و OpenAI-قالب/REST) و دو حالت اجرا (لوکال 127.0.0.1 و عمومی HTTPS با کلید)؛ نپرس.
4. فقط دو چیز را بپرس: شکل کار (ساده/چندمرحله‌ای/طولانی) و پرخطر بودن. پرخطر ⇒ در gates.yaml ثبت و تأیید انسانی خارج از مدل.
5. خروجی از مدل خروجی صریح؛ بدون score/via/نام مدل/شناسهٔ سند/stack trace؛ خطا {code, message_fa, request_id}.
6. خواندنی و نوشتنی جدا؛ سقف نرخ؛ لاگ با request_id؛ خروجی سقف‌دار و صفحه‌بندی‌شده.
7. «تمام شد» یعنی: چهار تست interop/tests سبز + چک‌لیست پذیرش STANDARD-MCP §۴ + یک کار واقعی از Claude Code با ابزارها تا آخر + capabilities.entry.yaml پر.
8. هر تغییر ابزار: اول tools.py، بعد بازتولید خروجی‌ها، بعد تست‌ها؛ تغییر نام/معنا = نسخهٔ تازه /v2.
9. اگر مورد بالا معلوم نیست، در HISTORY.md «باز» ثبت کن و حدس نزن.
```

## ۴. روال خودتکمیلی (ایجنت پروژه این را اجرا می‌کند)
1. فهرست قابلیت‌های بیرونی فعلی را از کد استخراج کن (مثلاً endpointهای `/v1`).
2. برای هر کدام یک ابزار در `tools.py` بنویس؛ شکل کار و پرخطر بودن را از کد حدس بزن و **در `interop/README.md` به‌عنوان «حدس، تأیید شود» بنویس**.
3. خروجی‌های تولیدشده و سرور MCP را بساز؛ سه تست اول را اجرا کن.
4. ردیف `capabilities.entry.yaml` را پر کن (`protocol: rest+mcp`).
5. نتیجه را در HISTORY.md «تحویل» با فهرست باقی‌مانده ثبت کن.

## ۵. اجرا برای حق‌پرس (vakil_agent)
- موجود و قابل‌استفاده: `vakil/public_api.py` (`/v1`، Bearer، 202 و صف، خطای یکدست) ← بخشی از `service.py`/`rest.py` می‌شود، بازنویسی لازم نیست.
- باقی: `tools.py` با سه ابزار (`vakil_case_start`, `vakil_case_answer`, `vakil_case_result`)، `mcp_server.py`، `openapi.yaml`، `request_id`، چهار تست، کلید جدا برای هر مصرف‌کننده، `gates.yaml` (ورود به قرارداد/ارسال دادخواست = پشت تأیید).
- `/ask` داخلی می‌ماند و در `tools.py` نمی‌آید.

## ۶. ملاحظات
- هنگام افزودن به AGENTS.md پروژه‌ها، بلوک §۳ را در بخش «قواعد کار» بگذار؛ خودِ این سند فقط یک بار در flow-archive نگه‌داری شود.
- AGENTS.md وکیل خودش بزرگ است (حدود ۱۰ کیلوبایت)؛ بلوک بالا کوتاه نوشته شد که جا شود.
