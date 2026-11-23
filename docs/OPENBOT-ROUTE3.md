# OpenBot — راه‌های ساخت · راه ۱ اصلی (مصوب Siax ۲۰۲۶-۱۱-۲۳، جای تصمیم قبلی «راه ۳ اصلی»)

> برای انسان: بخش ۱ و ۲ کافی است. برای هوش مصنوعی: همه‌چیز، مخصوصاً بخش ۴ و ۵.

## ۱. خلاصه
- **چه:** یک پچ کوچک روی OpenBot (VM 103، `ubuntu@192.168.88.254`، نسخهٔ 0.76.1) که به API محلی «Local scripts» راه ساخت مستقیم اضافه می‌کند: ایجنت، روتین، ورک‌فلوی کانواس و هر متد AgentService.
- **ترتیب (تصمیم Siax ۲۰۲۶-۱۱-۲۳):** راه ۱ = اصلی (ساخت با چت از طریق Research Desk). راه ۲ (مرورگر/Playwright) و راه ۳ (این پچ) = پشتیبان.
- **هزینهٔ این انتخاب (از بنچ):** راه ۱ برای هر کار ۹ تا ۲۴ ثانیه طول می‌کشد، توکن مدل مصرف می‌کند و حذف از راه چت همیشه تأیید انسان می‌خواهد. راه ۳ همان کارها را زیر ۱ ثانیه و بی‌توکن انجام می‌دهد.

### بنچ ۲۰۲۶-۱۱-۲۳ (ثانیه)
| کار | راه ۳ | راه ۱ (اجرای ۱) | راه ۱ (اجرای ۲) |
|-|-|-|-|
| ساخت ایجنت | زیر ۱ | 15.1 | 24.1 |
| ویرایش دستورالعمل | زیر ۱ | 12.1 | 18.1 |
| ساخت ورک‌فلو | زیر ۱ | 18.1 | 15.1 |
| تغییر نام | زیر ۱ | 9.1 | 21.1 |
| حذف | زیر ۱ | تأیید انسان | تأیید انسان |
- راه ۲ (مرورگر) عمداً در بنچ نیست.
- نوبت گیرکرده (پیام 409 «Wait for the active turn») ← `call_method interrupt [agentId, turnId]` بعد `new_chat`.
- **ضعف:** هر آپدیت OpenBot فایل `app.asar` را عوض می‌کند و پچ پاک می‌شود. ← بعد از آپدیت، دستور بخش ۳ را اجرا کن.
- **امنیت:** فقط روی `127.0.0.1`؛ کلید در زمان اجرا از `~/.config/OpenBot/automation/token` خوانده می‌شود و هرگز چاپ یا کپی نمی‌شود. متدهای ورود، اعتبارنامه، کلید و توکن در پچ مسدودند (404).

## ۲. روزمره (انسان)
| کار | چطور |
|-|-|
| آیا پچ نصب است؟ | ابزار MCP به نام `list_methods`؛ اگر خطای 404 داد ← پچ نیست |
| بعد از آپدیت OpenBot | دستور بخش ۳ |
| برگرداندن همه‌چیز | `sudo bash /opt/openbot-backup-20261123-170823/revert.sh` |
| دیدن خطاها | ابزار MCP به نام `errors` (لاگ برنامه + journal + `openbot logs`، با حذف رازها) |

## ۳. نصب دوبارهٔ پچ بعد از آپدیت
```bash
ssh ubuntu@192.168.88.254
B=/opt/openbot-backup-20261123-170823
sudo cp /opt/OpenBot/app/resources/app.asar $B/app.asar.pre-$(date +%Y%m%d)   # پشتیبان نسخهٔ جدید
sudo python3 $B/patch_asar_v4.py /opt/OpenBot/app/resources/app.asar /tmp/app.asar.new
sudo cp /tmp/app.asar.new /opt/OpenBot/app/resources/app.asar && sudo systemctl restart openbot
```
- اگر اسکریپت با `AssertionError` متوقف شد ← کد OpenBot عوض شده است. فایل را دست نزن؛ هوش مصنوعی باید جای درج را دوباره پیدا کند (بخش ۵).

## ۴. آنچه پچ v4 اضافه می‌کند (برای هوش مصنوعی)
| مسیر | کار |
|-|-|
| `POST /v1/agents` | ساخت ایجنت (`initialMessage` = دستورالعمل) |
| `PATCH/DELETE /v1/agents/{id}` | ویرایش (name، description = دستورالعمل، model، reasoningEffort) / حذف (ایجنت باید بیکار باشد) |
| `GET/POST /v1/agents/{id}/routines`، `DELETE …/routines/{rid}` | روتین‌ها |
| `GET /v1/call` · `POST /v1/call/{method}` `{args:[]}` | هر متد AgentService به‌جز DENY = `/sign\|credential\|apikey\|login\|connectprovider\|secret\|token/i` |
| `POST /v1/workflow/{tool}` | ابزارهای خود OpenBot: `list_workflows, read_workflow, edit_workflow, delete_workflow, run_workflow, read_workflow_runs` |

### فیلدهای نودهای ورک‌فلو (از کد runtime خوانده شده)
| نوع | فیلدها |
|-|-|
| trigger | `trigger: manual` |
| llm | `prompt`, `system`, `provider`, `model`, `effort` |
| condition | `rule` (مدل قضاوت می‌کند) یا `check`؛ لبهٔ خروجی `branch: yes\|no` |
| approval | `question` |
| agent | `agentId` (متن جداگانه ذخیره نمی‌شود؛ دستورالعمل خود ایجنت اجرا می‌شود) |
| output | `target: notify\|channel\|chat-channel\|github` |

- MCP: `/opt/openbot-mcp/b/server.py`، ابزارها: `workflow_tool`, `call_method`, `list_methods`, `*_direct`, `errors`, `db_agents`.
- پیش‌فرض مدل: `claude-haiku-5-5` با effort `medium` (حتی برای تست).

## ۵. قواعد برای هوش مصنوعی
- دیتابیس OpenBot فقط خواندنی است (`sqlite3` با `mode=ro`)؛ هرگز با دست در آن ننویس.
- هیچ‌وقت `openbot login`، `claude login` یا `tailscale up` را اجرا نکن. VMهای 100، 101 و 102 را دست نزن. پورت را عمومی نکن.
- پیدا کردن جای درج پس از تغییر کد: بخش options در `new AutomationServer({` (انتهای `clearAgentContext`) و خط `if (path === "/v1/agents") {`. استخراج `index.js` با `/tmp/asx/ext.py`.
- آیتم آزمایشی = پسوند «موقت».
