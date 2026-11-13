// آزمون طلایی فرق ۲: برای هر نقشهٔ داخل استودیو
//   LikeC4 می‌خواند ← مدل استودیو ← emitC4 ← LikeC4 دوباره می‌خواند؛ دو مدل LikeC4 باید یکی باشند (roundtrip)
//   و خوانش LikeC4 با مبدل قدیمی استودیو مقایسه می‌شود (sameAsOld).
// اجرا: bash tools/likec4-studio/build-studio.sh && node tools/likec4-studio/test/golden.cjs   (به playwright نیاز دارد)
const http = require('http'), fs = require('fs'), path = require('path')
const { chromium } = require('playwright')
const root = path.resolve(__dirname, '../../..')
const files = { '/index.html': path.join(root, 'docs/mockups/org-flow-artifact.html'), '/likec4-engine.js': path.join(root, 'tools/likec4-studio/out/likec4-engine.js') }
const srv = http.createServer((q, s) => { const f = files[q.url]; if (!f) { s.writeHead(404); return s.end() }
  s.writeHead(200, { 'content-type': (f.endsWith('.js') ? 'text/javascript' : 'text/html') + '; charset=utf-8' }); fs.createReadStream(f).pipe(s) })
srv.listen(0, '127.0.0.1', async () => {
  const b = await chromium.launch(); const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message))
  await p.goto(`http://127.0.0.1:${srv.address().port}/index.html`, { waitUntil: 'load' })
  await p.waitForFunction(() => window.LikeC4Engine && LikeC4Engine.state === 'ready', null, { timeout: 60000 })
  const r = await p.evaluate(async () => { const out = {}; for (const id of ['studio-c4', 'base-c4', 'talent-c4', 'journey-c4', 'orgglobal-c4']) out[id] = await LikeC4Reader.golden(document.getElementById(id).textContent); return out })
  let fail = errs.length > 0
  for (const [id, x] of Object.entries(r)) { if (!x.ok) fail = true
    console.log(`${x.ok ? 'PASS' : 'FAIL'} ${id}: roundtrip=${x.ok} nodes=${x.nodes} rels=${x.rels} sameAsOld=${x.sameAsOld}${x.nDiffs ? ' (' + x.nDiffs + ' فرق با مبدل قدیمی)' : ''}`) }
  if (errs.length) console.log('page errors:', errs)
  await b.close(); srv.close(); process.exit(fail ? 1 : 0)
})
