// موتور LikeC4 در Web Worker: صفحه سبک می‌ماند و این فایل جدا، در پس‌زمینه بار می‌شود
import { fromSource } from '@likec4/language-services/browser'
let L = null, chain = Promise.resolve()
// پیام‌ها یکی‌یکی اجرا می‌شوند تا نمونهٔ قبلی وسط کار بسته نشود
self.onmessage = ({ data }) => { chain = chain.then(() => run(data)) }
async function run({ id, op, text }, quiet) {
  try {
    if (L) await L.dispose().catch(() => {})
    const t0 = performance.now(); L = await fromSource(text)
    const errors = L.getErrors().map(e => ({ line: e.line ?? e.range?.start?.line, message: e.message }))
    const out = { id, errors, ms: 0 }
    if (op === 'parse') out.parsed = await L.parsedModel().then(m => JSON.parse(JSON.stringify(m.$data ?? m))).catch(e => ({ error: String(e.message || e) }))
    const views = await L.diagrams().catch(e => { errors.push({ message: 'چیدمان: ' + e.message }); return [] })
    out.views = views.map(v => ({ id: v.id, type: v._type, nodes: v.nodes.length }))
    out.ms = Math.round(performance.now() - t0)
    if (!quiet) self.postMessage(out)
    return out
  } catch (e) { const out = { id, errors: [{ message: String(e.message || e) }], views: [], ms: 0 }; if (!quiet) self.postMessage(out); return out }
}
self.postMessage({ ready: true, version: '1.60.0' })
