// موتور LikeC4 برای استودیو: هر متن .c4 را با خود LikeC4 می‌خواند، اعتبارسنجی می‌کند و نماها را می‌چیند
import { fromSource } from '@likec4/language-services/browser'
let L = null, busy = Promise.resolve()
async function run(text) {
  if (L) await L.dispose().catch(() => {})
  const t0 = performance.now(); L = await fromSource(text)
  const errors = L.getErrors().map(e => ({ line: e.line ?? e.range?.start?.line, message: e.message }))
  let views = []; try { views = await L.diagrams() } catch (e) { errors.push({ message: 'چیدمان: ' + e.message }) }
  return { errors, views, ms: Math.round(performance.now() - t0) }
}
window.LikeC4Engine = { version: '1.60.0', check: text => (busy = busy.then(() => run(text), () => run(text))) }
window.dispatchEvent(new Event('likec4-ready'))
