// ساخت snapshot چیدمان دستی LikeC4 از جای گره‌ها در بوم استودیو.
// pos: { fqn: {x, y, w, h} } مختصات مرکز گره‌ها در بوم استودیو.
// اندازهٔ گره‌ها همان اندازهٔ LikeC4 می‌ماند (متن جا شود)؛ فقط جای مرکزها از استودیو می‌آید و با یک ضریب یکنواخت باز می‌شود تا گره‌ها روی هم نیفتند.
export function snapshotFromStudio(auto, pos) {
  const snap = structuredClone(auto)
  const leaves = snap.nodes.filter(n => !n.children?.length && pos[n.id])
  const placed = leaves.length, missing = snap.nodes.filter(n => !n.children?.length && !pos[n.id]).map(n => n.id)
  if (!placed) return { snap, placed, missing }
  const cs = leaves.map(n => pos[n.id]), maxW = Math.max(...leaves.map(n => n.width)), maxH = Math.max(...leaves.map(n => n.height))
  let s = 1
  for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) {
    const dx = Math.abs(cs[i].x - cs[j].x), dy = Math.abs(cs[i].y - cs[j].y)
    const need = Math.min(dx > 0 ? (maxW + 60) / dx : Infinity, dy > 0 ? (maxH + 60) / dy : Infinity)
    if (need !== Infinity) s = Math.max(s, need)
  }
  const ox = Math.min(...cs.map(c => c.x)), oy = Math.min(...cs.map(c => c.y))
  const byId = new Map(snap.nodes.map(n => [n.id, n]))
  for (const n of leaves) { const c = pos[n.id]; n.x = Math.round((c.x - ox) * s + 100 - n.width / 2); n.y = Math.round((c.y - oy) * s + 100 - n.height / 2) }
  // گره‌های مرکب: قاب دور فرزندان (از ژرف‌ترین به بالا)
  const depth = n => { let d = 0, p = n.parent; while (p) { d++; p = byId.get(p)?.parent } return d }
  for (const n of [...snap.nodes].filter(n => n.children?.length).sort((a, b) => depth(b) - depth(a))) {
    const ch = n.children.map(id => byId.get(id)).filter(Boolean); if (!ch.length) continue
    const x1 = Math.min(...ch.map(c => c.x)) - 32, y1 = Math.min(...ch.map(c => c.y)) - 56
    const x2 = Math.max(...ch.map(c => c.x + c.width)) + 32, y2 = Math.max(...ch.map(c => c.y + c.height)) + 32
    Object.assign(n, { x: x1, y: y1, width: x2 - x1, height: y2 - y1 })
  }
  for (const n of snap.nodes) if (n.labelBBox) n.labelBBox = { ...n.labelBBox, x: n.x + (n.children?.length ? 16 : Math.round((n.width - n.labelBBox.width) / 2)), y: n.y + (n.children?.length ? 12 : Math.round((n.height - n.labelBBox.height) / 2)) }
  // فلش‌ها: خط راست بین لبه‌های دو گره (منحنی bezier با ۴ نقطه)
  const edgePt = (a, b) => { const cx = a.x + a.width / 2, cy = a.y + a.height / 2, dx = b.x + b.width / 2 - cx, dy = b.y + b.height / 2 - cy
    const t = Math.min(dx ? (a.width / 2) / Math.abs(dx) : Infinity, dy ? (a.height / 2) / Math.abs(dy) : Infinity); return [Math.round(cx + dx * t), Math.round(cy + dy * t)] }
  for (const e of snap.edges) { const a = byId.get(e.source), b = byId.get(e.target); if (!a || !b) continue
    const p1 = edgePt(a, b), p2 = edgePt(b, a), m1 = [Math.round(p1[0] + (p2[0] - p1[0]) / 3), Math.round(p1[1] + (p2[1] - p1[1]) / 3)], m2 = [Math.round(p1[0] + 2 * (p2[0] - p1[0]) / 3), Math.round(p1[1] + 2 * (p2[1] - p1[1]) / 3)]
    e.points = [p1, m1, m2, p2]; delete e.controlPoints; delete e.headArrowPoint; delete e.tailArrowPoint
    if (e.labelBBox) e.labelBBox = { ...e.labelBBox, x: Math.round((p1[0] + p2[0]) / 2 - e.labelBBox.width / 2), y: Math.round((p1[1] + p2[1]) / 2 - e.labelBBox.height - 4) } }
  const xs = snap.nodes.map(n => n.x), ys = snap.nodes.map(n => n.y)
  const x1 = Math.min(...xs), y1 = Math.min(...ys), x2 = Math.max(...snap.nodes.map(n => n.x + n.width)), y2 = Math.max(...snap.nodes.map(n => n.y + n.height))
  snap.bounds = { x: x1 - 40, y: y1 - 40, width: x2 - x1 + 80, height: y2 - y1 + 80 }
  delete snap._layout; delete snap.drifts
  return { snap, placed, missing }
}
