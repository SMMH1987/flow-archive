# ارتباط پروژه‌ها با هم — دستورالعمل v1 (راستی‌آزمایی‌شده با مستند رسمی)

تاریخ: ۲۰۲۶-۱۱-۰۷ · جایگزین v0 (که از دانش مدل نوشته شده بود). منابع در بخش آخر؛ هر ادعای مهم برچسب دارد:
**[تأییدشده]** = در صفحهٔ رسمی دیده شد · **[تأییدنشده]** = دیده نشد، قبل از اتکا چک کن.

## ۱. پاسخ کوتاه: شدنی است؟
**بله، ولی نه با «گفت‌وگوی مستقیم دو پروژهٔ Claude».** آنچه امروز واقعاً کار می‌کند:
1. هر پروژه/ایجنت یک **API یا سرور MCP** از راه HTTPS عمومی ارائه می‌دهد؛ پروژهٔ دیگر یا هر بات (Claude، Grok، …) آن را «ابزار» صدا می‌زند.
2. برای ایجنت‌های گفت‌وگومحور و کارهای طولانی: **A2A** (ایجنت با ایجنت).
3. هماهنگی داخل یک کار: زیرایجنت‌ها (subagents) و تیم‌های ایجنت در Claude Code.

**آنچه تأیید نشد:** اینکه یک «Project» در claude.ai مستقیم پروژهٔ دیگر را صدا بزند. در مستندات خوانده‌شده چنین قابلیتی نیامده؛ کانکتورها به‌ازای هر گفت‌وگو روشن می‌شوند. پس «پروژه ← پروژه» را از طریق یک سرویس واسط (API/MCP) بساز، نه انتظار قابلیت داخلی.

## ۲. وضعیت پروتکل‌ها (امروز)
| پروتکل | کار | وضعیت | نکتهٔ کلیدی |
|---|---|---|---|
| **MCP** | ایجنت ← ابزار/داده | آخرین نسخه `2026-07-28` [تأییدشده] | انتقال استاندارد: stdio و **Streamable HTTP**؛ HTTP+SSE منسوخ است |
| **A2A** | ایجنت ← ایجنت | نسخهٔ `1.0.0` [تأییدشده]؛ تحت Linux Foundation (و AAIF) | سه اتصال: JSON-RPC، gRPC، HTTP+JSON؛ کارت ایجنت؛ وظیفهٔ طولانی |
| **OpenAPI + webhook** | سرویس ← سرویس | استاندارد پایدار | ساده‌ترین؛ همین حالا برای آوانگار کافی است |

### MCP — جزئیات تأییدشده
- احراز هویت اختیاری است؛ برای HTTP بر پایهٔ **OAuth 2.1** + Protected Resource Metadata (RFC 9728) + Resource Indicators (RFC 8707)؛ ثبت پویای کلاینت (DCR) منسوخ شده و Client ID Metadata Documents جایگزین است.
- **ممنوعیت token passthrough:** سرور MCP نباید توکن دریافتی از کلاینت را به API پایین‌دست پاس بدهد و فقط توکنی را می‌پذیرد که برای خودش صادر شده.
- سرور باید `Origin` را اعتبارسنجی کند (ضد DNS rebinding)؛ محلی فقط روی `127.0.0.1`.
- در این نسخه پروتکل بدون session شده (`initialize` و `Mcp-Session-Id` حذف)؛ کارهای ناهم‌زمان (tasks) افزونهٔ رسمی جدا هستند.
- ⚠ این نسخهٔ جدید است؛ SDKها ممکن است هنوز عقب باشند. هنگام ساخت، نسخهٔ SDK را با نسخهٔ spec تطبیق بده.

### A2A — جزئیات
- [تأییدشده] وضعیت‌های وظیفه: SUBMITTED, WORKING, COMPLETED, FAILED, CANCELED, REJECTED، و وقفه‌ها INPUT_REQUIRED و AUTH_REQUIRED.
- [تأییدشده] استریم (SSE) و push notification با webhook؛ طرح‌های احراز هویت: API key، HTTP، OAuth2، OpenID Connect، mTLS.
- [تأییدشده] A2A و MCP مکمل‌اند: MCP = ابزار؛ A2A = ایجنت با ایجنت.
- ⚠ نسخهٔ 1.0 نام متدها و قالب کارت را از 0.3 تغییر داد (مثلاً `message/send` ← `SendMessage`؛ `supportedInterfaces[]` به‌جای `url`). مثال‌های قدیمی اینترنت اغلب کار نمی‌کنند.
- [تأییدنشده] مسیر دقیق کارت ایجنت در 1.0 (در 0.3: `/.well-known/agent-card.json`) و تاریخ انتشار 1.0.

## ۳. هر ابزار/بات چه می‌تواند؟ (تأییدشده)
| مصرف‌کننده | چطور سرور تو را صدا می‌زند | محدودیت |
|---|---|---|
| **Claude Code** | `claude mcp add --transport http <نام> <url>`؛ دامنه‌ها local/project(`.mcp.json`)/user؛ OAuth با `/mcp` | سرور پروژه‌ای باید تأیید دستی شود؛ `claude -p` نمی‌تواند OAuth را کامل کند، قبلاً تعاملی وارد شو |
| **claude.ai (کانکتور سفارشی)** | Customize ← Connectors ← Add custom connector | اتصال از ابر Anthropic است؛ سرور باید از اینترنت و IPهای Anthropic قابل دسترس باشد (سرور فقط-VPN/لوکال نمی‌شود)؛ هر گفت‌وگو جدا روشن می‌شود |
| **Claude API** | `mcp_servers` + `mcp_toolset` با هدر beta | بتا؛ سرور باید HTTPS عمومی باشد؛ فقط tool-call؛ OAuth را خودت مدیریت می‌کنی |
| **Grok (xAI)** | ابزار `{"type":"mcp","server_url":…,"server_label":…}` در Responses API | فقط Streamable HTTP/SSE؛ HTTPS؛ `allowed_tools` را حتماً بگذار (وگرنه همهٔ ابزارها وارد context می‌شوند) |
| **زیرایجنت Claude Code** | فایل md در `.claude/agents/` | داخل یک مخزن/سشن؛ عمق تودرتو پیش‌فرض ۳ |
| **تیم ایجنت** | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | آزمایشی، پیش‌فرض خاموش، هزینهٔ توکن بیشتر، در `-p`/SDK نیست |

نتیجه برای «گروک‌بات»: Grok می‌تواند **ابزارهای تو** را از راه MCP صدا بزند و Claude هم همان سرور را؛ یعنی یک سرور MCP مشترک نقطهٔ تلاقی دو فروشنده است. ارتباط مستقیم «Grok ↔ Claude» فقط از راه A2A/API ممکن است، نه قابلیت داخلی.

## ۴. معماری پیشنهادی (اصلاح‌شدهٔ v0)
لایه‌ها همان ۴تا ماند، با این اصلاح‌ها:
| لایه | چه | وضعیت |
|---|---|---|
| ۱ دفتر ظرفیت `capabilities.yaml` | کار ← پروژه ← آدرس ← احراز هویت | خودساخته؛ **همین حالا** |
| ۲ قرارداد OpenAPI + webhook امضادار | هر پروژه یک `openapi.yaml` | **همین حالا** |
| ۳ پوستهٔ MCP (Streamable HTTP، **نه SSE**) | OpenAPI را ابزار می‌کند | وقتی Claude/Grok باید مستقیم صدا بزند |
| ۴ A2A 1.0 | فقط ایجنت گفت‌وگومحور (مثل حق‌پرس) | اگر یک endpoint ساده کافی است لازم نیست |

اصلاح‌های v0 (غلط یا کهنه بود):
- «MCP (Streamable HTTP)» درست بود، ولی بدون ذکر منسوخ‌شدن SSE و تغییر بی‌حالتی (stateless) نسخهٔ جدید. اضافه شد.
- A2A فقط «Google» نبود؛ حالا تحت Linux Foundation است و نسخهٔ 1.0 دارد. نام متدها عوض شده.
- سرور محلی/VPN برای claude.ai و Claude API کار نمی‌کند؛ آدرس عمومی HTTPS لازم است. در v0 نیامده بود.
- نمونهٔ `whsec_`/HMAC برای webhook همچنان درست و پیشنهادی است (A2A هم push با webhook دارد).

## ۴.۱ حالت «پروژهٔ claude.ai» (مثل حق‌پرس) را چطور صدا‌زدنی کنیم
**هدف:** پروژه‌های دیگر و بات‌ها بتوانند از حق‌پرس سؤال حقوقی بپرسند.
- یک Project در claude.ai خودش آدرس/API ندارد و از بیرون صدا زده نمی‌شود [مستندات خوانده‌شده چنین قابلیتی نگفتند؛ وجود API برای Projects تأییدنشده].
- راه عملی: «مغز» حق‌پرس را در یک **سرویس** بنشان: دستورالعمل پروژه ← system prompt، فایل‌های دانش ← جست‌وجوی اسناد (RAG)، اجرا با Claude API یا Agent SDK. سپس همین سرویس را با ابزار MCP مثل `ask_legal(question, context)` یا کارت A2A عرضه کن.
- هر پروژه/بات دیگر (Claude، Grok، …) فقط همین ابزار را صدا می‌زند و جواب + منبع/ارجاع می‌گیرد.
- جواب حقوقی «مشاوره‌ای/پیش‌نویس» است؛ هر چیز با اثر قراردادی gate انسانی دارد.
- `capabilities.yaml` ثبت می‌کند چه پروژه‌ای چه کاری را ارائه می‌دهد تا دیگران پیدایش کنند.

## ۴.۲ استاندارد حداقلی هر پروژه برای ارتباط (پیشنهاد؛ سطح‌ها تجمعی‌اند)
پایه‌اش مستندات رسمی MCP/A2A و الگوی `/v1` که حق‌پرس خودش دارد؛ خودِ شماره‌گذاری سطح‌ها پیشنهاد من است.

**سطح ۰ — هویت:** یک ردیف در `capabilities.yaml` (کار، صاحب، آدرس، نوع، احراز هویت، gate انسانی).
**سطح ۱ — قرارداد HTTP (همهٔ پروژه‌ها):**
- نسخه‌دار (`/v1`)، `GET /v1/health`، خطای یکدست `{code, message}`، شناسهٔ درخواست (`request_id`).
- احراز هویت Bearer با مقایسهٔ زمان‌ثابت؛ کلید جدا برای هر مصرف‌کننده؛ سقف روزانه/نرخ.
- کار طولانی: `202 processing` و polling (یا webhook امضادار)؛ عملیات تکراری idempotent.
- `openapi.yaml` صادرشده و در مخزن (حتی اگر `/openapi.json` زنده خاموش است).
- ساختار داخلی (نام مدل، امتیازها، stack trace) بیرون نرود.
**سطح ۲ — پوستهٔ MCP:** Streamable HTTP؛ هر endpoint یک ابزار با نام و schema روشن؛ ابزار فقط‌خواندنی از نوشتنی جدا؛ `Origin` چک شود؛ OAuth برای کاربرمحور؛ token passthrough ممنوع؛ خروجی کوتاه و سقف‌دار.
**سطح ۳ — اختیاری:** کارت A2A 1.0 فقط برای ایجنت گفت‌وگومحور.
**دسترس‌پذیری:** برای مصرف‌کنندهٔ ابری (claude.ai، API، Grok) آدرس HTTPS عمومی؛ برای لوکال فقط Claude Code.

**مدل‌های دیگر و OpenRouter [تأییدشده در docs.openrouter.ai]:** OpenRouter تعریف ابزار را بین مدل‌ها استاندارد می‌کند (قالب OpenAI)، اما ابزار را خودِ برنامهٔ مصرف‌کننده اجرا می‌کند و OpenRouter به سرور MCP وصل نمی‌شود. راه رسمی: برنامه ابزارهای MCP را به قالب OpenAI تبدیل کند (یا از بستهٔ `@openrouter/mcp` سمت کلاینت استفاده کند). پس برای «هر مدلی از راه OpenRouter»، سطح ۱ (REST + OpenAPI) کلید است و سطح ۲ برای Claude/Grok/Claude Code.

## ۵. امنیت (الزامی قبل از باز کردن هر endpoint)
1. هر پروژه کلید جدا و محدود به یک کار؛ کلیدها فقط در `.env`/secret store، در YAML فقط نام متغیر.
2. OAuth برای دسترسی کاربرمحور؛ توکن را هرگز به سرویس بعدی پاس نده (token passthrough ممنوع).
3. `Origin` را چک کن؛ HTTPS اجباری؛ فقط ابزارهای لازم را `allowed_tools` کن (حداقل دسترسی).
4. **تزریق پرامپت:** خروجی هر سرور/ایجنت بیرونی داده است نه دستور. مستند Claude Code هم هشدار می‌دهد فقط به سرورهای مورد اعتماد وصل شو.
5. هر عمل با اثر حقوقی/مالی (امضا، پرداخت، ورود به قرارداد، انتشار) فقط پشت **gate انسانی** (در فلو `gateStep`)؛ `needs_human_gate: true`.
6. `request_id` واحد برای ردیابی بین پروژه‌ها؛ لاگ هر فراخوانی.
7. هزینه و حلقهٔ بی‌پایان: سقف تعداد فراخوانی و عمق (ایجنت A ← B ← A) تعیین کن.

## ۶. نمونهٔ capabilities.yaml
```yaml
- task: speech_to_text
  project: avanegar-hamdabir
  base_url: https://api.hamdabir.co-ir.com:8440
  auth: {type: api_key, env: AVANEGAR_API_KEY}    # نام متغیر، نه مقدار
  protocol: rest            # rest | mcp | a2a
  async: {callback: webhook, signature: HMAC whsec_}
  contract: docs/API-GUIDE.md
- task: legal_qa_and_contract_drafting
  project: hagh-pors-lawyer-agent
  base_url: UNKNOWN         # ask: آدرس؟ HTTP ساده یا ایجنت گفت‌وگومحور؟
  protocol: UNKNOWN
  auth: UNKNOWN
  needs_human_gate: true
```

## ۷. دستورالعمل اجرا (هر قدم نتیجهٔ دیدنی دارد)
1. `capabilities.yaml` را با ۲ پروژه بساز؛ مسیریاب فلو از آن می‌خواند.
2. برای حق‌پرس ثبت کن: آدرس، نوع (REST/ایجنت)، احراز هویت ← UNKNOWNها پر شود.
3. REST است ← `openapi.yaml`؛ گفت‌وگومحور است ← کارت A2A 1.0.
4. سرویس را روی HTTPS عمومی بگذار، سپس پوستهٔ MCP (Streamable HTTP) روی آن بنویس.
5. **آزمون اتصال:** (الف) `claude mcp add --transport http …` در Claude Code؛ (ب) کانکتور سفارشی در claude.ai؛ (ج) ابزار `mcp` در Grok با `allowed_tools`. هر سه باید یک ابزار فقط‌خواندنی (مثل `ping`/`list_capabilities`) را صدا بزنند.
6. بعد از آزمون خواندنی، ابزار نوشتنی/پرهزینه را با gate انسانی اضافه کن.

## ۸. ⚠ تله‌ها
- پروتکل را زود قفل نکن؛ لایهٔ ۱ و ۲ بدون پروتکل جدید کار می‌کند.
- مثال‌های A2A قبل از 1.0 و MCP قبل از 2026-07-28 را کپی نکن؛ SDK و نسخه را چک کن.
- «پروژهٔ Claude» ≠ «ایجنت مستقل با آدرس»؛ برای صدا زدن باید یک سرویس همیشه‌روشن با URL باشد.
- tasks در MCP و agent teams در Claude Code هنوز آزمایشی/افزونه‌اند.

## منابع (رسمی؛ خوانده‌شده ۲۰۲۶-۱۱-۰۷)
- MCP: https://modelcontextprotocol.io/specification/latest/changelog · /basic/transports · /basic/authorization
- A2A: https://a2a-protocol.org/latest/specification/ · https://a2a-protocol.org/latest/whats-new-v1/
- Claude Code: https://code.claude.com/docs/en/mcp · /sub-agents · /agent-teams
- Claude API MCP connector: https://platform.claude.com/docs/en/agents-and-tools/mcp-connector
- کانکتور سفارشی claude.ai: https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp
- xAI Grok: https://docs.x.ai/developers/tools/remote-mcp
