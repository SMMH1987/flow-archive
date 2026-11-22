# flow-archive

## چه چیزی کجاست
- status: active · kind: code  (حدس استاندارد v1، 2026-10-29؛ اگر غلط است همین خط را عوض کن)
- زیرساخت: runs-on: — · domains: — · jobs: —

## قواعد کار
- 🔒 هر `docker exec` روی `paperclip-lab_app` (سرور ۱۰) فقط با `-u node` (Siax 2026-11-22). با root، فایل‌های لاگین Claude مال root می‌شوند و لاگین خراب می‌شود. رفع: `chown -R node:node /paperclip`.
