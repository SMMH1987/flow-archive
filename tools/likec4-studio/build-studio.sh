#!/usr/bin/env bash
# استودیوی اصلی بدون تغییر ظاهری + موتور رسمی LikeC4 به‌صورت فایل کناری (Web Worker، بعد از باز شدن صفحه)
#  out/likec4-engine.js  ← موتور (حدود ۳ مگابایت؛ کنار صفحه منتشر می‌شود)
#  docs/mockups/org-flow-artifact.html ← بلوک LIKEC4-HOOK (چند کیلوبایت) تازه می‌شود
set -e; cd "$(dirname "$0")"
npx esbuild src/worker.js --bundle --format=esm --platform=browser --minify --outfile=out/likec4-engine.js --log-level=error
python3 - <<'PY'
import pathlib, re
p = pathlib.Path('../../docs/mockups/org-flow-artifact.html')
page = p.read_text(encoding='utf-8')
hook = pathlib.Path('src/hook.js').read_text(encoding='utf-8').strip()
page = re.sub(r'\n<script>\n/\* LIKEC4-HOOK.*?</script>\n?', '\n', page, flags=re.S).rstrip()
page += '\n<script>\n' + hook + '\n</script>\n'
p.write_text(page, encoding='utf-8'); print(p, len(page.encode()))
eng = pathlib.Path('out/likec4-engine.js')
eng.write_text(eng.read_text(encoding='utf-8').replace('�', '\\uFFFD'), encoding='utf-8'); print(eng, eng.stat().st_size)
PY
