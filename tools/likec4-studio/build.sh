#!/usr/bin/env bash
# نمونهٔ «استودیو روی موتور LikeC4»: یک فایل HTML بدون نیاز به اینترنت می‌سازد.
# نقشه‌ها از c4-org/ خوانده می‌شوند (منبع واحد)؛ مسیر تاج گل با JOURNEY=<path> اضافه می‌شود.
#   npm install && bash build.sh   → out/index.html
set -e; cd "$(dirname "$0")"
npx esbuild src/app.js --bundle --format=esm --platform=browser --minify --outfile=out/app.js --log-level=error
python3 - <<'PY'
import json, os, pathlib
R = pathlib.Path('../../c4-org')
src = {f: (R / f).read_text(encoding='utf-8') for f in ['startup-studio.c4', 'recruitment.c4', 'startup-talent.c4', 'org-global.c4'] if (R / f).exists()}
if os.environ.get('JOURNEY'): src['journey.c4'] = pathlib.Path(os.environ['JOURNEY']).read_text(encoding='utf-8')
js = pathlib.Path('out/app.js').read_text(encoding='utf-8').replace('</script', '<\\/script').replace('�', '\\uFFFD')
html = pathlib.Path('tpl.html').read_text(encoding='utf-8').replace('__SOURCES__', json.dumps(src, ensure_ascii=False).replace('</', '<\\/')).replace('__APP__', js)
pathlib.Path('out/index.html').write_text(html, encoding='utf-8'); print('out/index.html', len(html))
PY
