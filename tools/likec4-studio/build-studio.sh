#!/usr/bin/env bash
# استودیوی اصلی (بدون هیچ تغییر ظاهری) + موتور رسمی LikeC4 داخل همان صفحه → out/studio-likec4.html
set -e; cd "$(dirname "$0")"
npx esbuild src/engine.js --bundle --format=esm --platform=browser --minify --outfile=out/engine.js --log-level=error
python3 - <<'PY'
import pathlib
page = pathlib.Path('../../docs/mockups/org-flow-artifact.html').read_text(encoding='utf-8')
eng = pathlib.Path('out/engine.js').read_text(encoding='utf-8').replace('</script', '<\\/script').replace('�', '\\uFFFD')
hook = pathlib.Path('src/hook.js').read_text(encoding='utf-8')
i = page.rindex('</body>') if '</body>' in page else len(page)
out = page[:i] + '<script type="module">' + eng + '</script>\n<script>' + hook + '</script>\n' + page[i:]
pathlib.Path('out/studio-likec4.html').write_text(out, encoding='utf-8'); print('out/studio-likec4.html', len(out))
PY
