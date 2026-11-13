// موتور LikeC4 در Web Worker: صفحه سبک می‌ماند و این فایل جدا، در پس‌زمینه بار می‌شود
import { fromSource } from '@likec4/language-services/browser'
import { applyManualLayout, calcDriftsFromSnapshot } from '@likec4/core'
import JSON5 from 'json5'
import { snapshotFromStudio } from './snap.js'
let L = null, chain = Promise.resolve()
// پیام‌ها یکی‌یکی اجرا می‌شوند تا نمونهٔ قبلی وسط کار بسته نشود
self.onmessage = ({ data }) => { chain = chain.then(() => run(data)) }
async function run({ id, op, text, ...rest }, quiet) {
  try {
    if (L) await L.dispose().catch(() => {})
    const t0 = performance.now(); L = await fromSource(text)
    const errors = L.getErrors().map(e => ({ line: e.line ?? e.range?.start?.line, message: e.message }))
    const out = { id, errors, ms: 0 }
    if (op === 'parse') out.parsed = await L.parsedModel().then(m => JSON.parse(JSON.stringify(m.$data ?? m))).catch(e => ({ error: String(e.message || e) }))
    if (op === 'snap') return await snapOp(id, L, rest, quiet)
    if (op === 'drift') { const snap = JSON5.parse(rest.snap), auto = (await L.diagrams()).find(v => v.id === snap.id)
      const out = { id, viewId: snap.id, drifts: auto ? (calcDriftsFromSnapshot(auto, snap).drifts || []) : ['view-removed'], errors }; if (!quiet) self.postMessage(out); return out }
    const views = await L.diagrams().catch(e => { errors.push({ message: 'چیدمان: ' + e.message }); return [] })
    out.views = views.map(v => ({ id: v.id, type: v._type, nodes: v.nodes.length }))
    out.ms = Math.round(performance.now() - t0)
    if (!quiet) self.postMessage(out)
    return out
  } catch (e) { const out = { id, errors: [{ message: String(e.message || e) }], views: [], ms: 0 }; if (!quiet) self.postMessage(out); return out }
}
self.postMessage({ ready: true, version: '1.60.0' })

// فرق ۱: چیدمان استودیو ← فایل چیدمان دستی LikeC4 (.likec4/<view>.likec4.snap، JSON5 از LayoutedView)
async function snapOp(id, L, { viewId, pos }, quiet) {
  const views = await L.diagrams()
  if (!viewId) { // نمایی که گره‌هایش بیشترین هم‌پوشانی را با بوم استودیو دارد
    let best = -1; for (const v of views) { const ids = v.nodes.filter(n => !n.children?.length).map(n => n.id)
      const hit = ids.filter(i => pos[i]).length, score = hit * 2 - (ids.length - hit) - (Object.keys(pos).length - hit)
      if (hit && score > best) { best = score; viewId = v.id } } }
  const auto = views.find(v => v.id === viewId)
  if (!auto) { const out = { id, error: 'نما پیدا نشد: ' + viewId }; if (!quiet) self.postMessage(out); return out }
  const { snap, placed, missing } = snapshotFromStudio(auto, pos)
  const shown = applyManualLayout(auto, snap)          // همان چیزی که LikeC4 (start / VS Code) با این فایل نشان می‌دهد
  const check = calcDriftsFromSnapshot(auto, snap)      // همان بررسی layout drift در likec4 validate
  const same = snap.nodes.every(n => { const m = shown.nodes.find(x => x.id === n.id); return m && m.x === n.x && m.y === n.y })
  const out = { id, viewId, file: '.likec4/' + viewId + '.likec4.snap', text: JSON5.stringify(snap, { space: 2, quote: "'" }) + '\n',
    placed, missing, drifts: check.drifts || [], appliedDrifts: shown.drifts || [], same, errors: [] }
  if (!quiet) self.postMessage(out); return out
}
