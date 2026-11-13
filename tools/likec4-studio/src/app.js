// استودیو روی موتور خود LikeC4: متن .c4 تنها منبع است.
// LikeC4 (language-services در مرورگر) متن را می‌خواند، اعتبارسنجی می‌کند و چیدمان می‌دهد؛
// بوم n8n-مانند همان چیدمان را می‌کشد؛ هر ویرایش متن .c4 را عوض می‌کند و دوباره به LikeC4 داده می‌شود.
import { fromSource } from '@likec4/language-services/browser'
import { parseC4, emitC4, walk, q } from './c4.mjs'

const $ = s => document.querySelector(s)
const h = (t, a = {}, ...k) => { const e = document.createElement(t); for (const [x, v] of Object.entries(a)) { if (x.startsWith('on')) e[x] = v; else if (v != null && v !== false) e.setAttribute(x, v) } e.append(...k.flat().filter(c => c != null)); return e }
const S = (t, a = {}) => { const e = document.createElementNS('http://www.w3.org/2000/svg', t); for (const [x, v] of Object.entries(a)) e.setAttribute(x, v); return e }
const fa = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])

const SRC = JSON.parse($('#sources').textContent)
const ST = { lr: true, file: Object.keys(SRC)[0], text: '', views: [], view: 'index', sel: null, run: null, errs: [], hist: [], busy: false, k: 1, x: 0, y: 0 }
const KIND = {
  askStep: ['پرسش از انسان', '#f59e0b', '💬'], autoStep: ['خودکار', '#16a34a', '🤖'], gateStep: ['تأیید انسان', '#dc2626', '⏳'],
  routeStep: ['شاخه', '#6366f1', '🔀'], triggerStep: ['شروع', '#ea580c', '⚡'], subflowStep: ['زیرفلو', '#0ea5e9', '⧉'],
  orgBox: ['فاز', '#475569', '📦'], stage: ['مرحله', '#64748b', '📦'], dept: ['بخش', '#64748b', '🏢'],
  node: ['ماژول', '#16a34a', '🧩'], ext: ['سرویس بیرونی', '#6b7280', '🌐'], core: ['هسته', '#dc2626', '❤️'], trigger: ['ورود', '#6366f1', '⚡'], actor: ['آدم', '#0891b2', '👤']
}
const kindOf = n => KIND[n.kind] || ['عنصر', '#94a3b8', '▫️']

let L = null // LikeC4 instance
// فقط برای نمایش: هر نما چپ‌به‌راست چیده شود (مثل n8n)؛ متن ذخیره‌شده دست نمی‌خورد
const lr = t => { const i = t.search(/^views\s*\{/m); if (i < 0) return t; let v = t.slice(i).replace(/^\s*autoLayout\s+\w+.*$/gm, ''), out = '', re = /(?:dynamic\s+)?view\s+[\w.]+(?:\s+of\s+[\w.]+)?\s*\{/g, m, last = 0
  while ((m = re.exec(v))) { let k = m.index + m[0].length, d = 1; for (; k < v.length && d; k++) { if (v[k] === '{') d++; else if (v[k] === '}') d-- } out += v.slice(last, k - 1) + '  autoLayout LeftRight\n  }'; last = k; re.lastIndex = k }
  return t.slice(0, i) + out + v.slice(last) }
async function compile(text, keepView = true) {
  ST.busy = true; status('LikeC4 در حال خواندن و چیدن…')
  const t0 = performance.now()
  try {
    if (L) await L.dispose().catch(() => {})
    L = await fromSource(ST.lr ? lr(text) : text)
    ST.errs = L.getErrors()
    ST.views = await L.diagrams()
    ST.text = text
    if (!keepView || !ST.views.some(v => v.id === ST.view)) ST.view = ST.views[0]?.id
    status(`LikeC4 ${fa(ST.views.length)} نما را در ${fa(Math.round(performance.now() - t0))} میلی‌ثانیه ساخت · خطا: ${fa(ST.errs.length)}`)
  } catch (e) { ST.errs = [{ message: String(e.message || e) }]; status('خطای LikeC4: ' + e.message) }
  ST.busy = false; render()
}
function status(t) { $('#status').textContent = t }
const view = () => ST.views.find(v => v.id === ST.view)

// ——— ویرایش: متن .c4 → مدل ویرایش → متن تازه → LikeC4 ———
function edit(fn) {
  const M = parseC4(ST.text); const IDX = new Map(); walk(M.nodes, '', (n, p) => IDX.set(p, n))
  if (fn(M, IDX) === false) return
  ST.hist.push(ST.text); compile(emitC4(M))
}
const parentOf = p => p.includes('.') ? p.slice(0, p.lastIndexOf('.')) : ''
function uniq(list, base) { let i = 1; while (list.some(c => c.id === base + i)) i++; return base + i }

// ——— بوم n8n-مانند روی چیدمان LikeC4 ———
function render() {
  renderTop(); renderCanvas(); renderSide(); renderBottom()
}
function renderTop() {
  $('#files').replaceChildren(...Object.keys(SRC).map(f => h('button', { class: f === ST.file ? 'on' : '', onclick: () => { clearInterval(TIMER); ST.file = f; ST.view = 'index'; ST.sel = null; ST.run = null; ST.hist = []; compile(SRC[f], false) } }, f)))
  const v = view()
  $('#views').replaceChildren(...[h('select', { onchange: e => { ST.view = e.target.value; ST.sel = null; ST.fit = true; render() } },
    ...ST.views.map(x => { const o = h('option', { value: x.id }, (x._type === 'dynamic' ? '▶ ' : '') + (x.title || x.id)); if (x.id === ST.view) o.selected = true; return o })),
    h('button', { class: ST.lr ? 'on' : '', title: 'فقط چیدمان نمایش؛ متن .c4 عوض نمی‌شود', onclick: () => { ST.lr = !ST.lr; ST.fit = true; compile(ST.text) } }, ST.lr ? '⇄ چپ‌به‌راست (مثل n8n)' : '⇅ بالا‌به‌پایین (مثل فایل)'),
    v && v.id !== 'index' ? h('button', { onclick: () => { ST.view = 'index'; ST.fit = true; render() } }, '↑ نمای کلی') : null].filter(Boolean))
}
function nodeBox(n) { return { x: n.x, y: n.y, w: n.width, h: n.height } }
function renderCanvas() {
  const v = view(), svg = $('#svg'); svg.replaceChildren(); if (!v) return
  const defs = S('defs'); const mk = (id, col) => { const m = S('marker', { id, viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto' }); m.append(S('path', { d: 'M0 1L9 5L0 9z', fill: col })); defs.append(m) }
  mk('ar', '#94a3b8'); mk('arg', '#16a34a'); mk('ars', '#ea4b71'); svg.append(defs)
  const g = S('g', { id: 'world', transform: `translate(${ST.x},${ST.y}) scale(${ST.k})` }); svg.append(g)
  const run = ST.run
  // گروه‌ها (عنصر دارای فرزند در همین نما)
  v.nodes.filter(n => n.children.length).forEach(n => {
    g.append(S('rect', { x: n.x, y: n.y, width: n.width, height: n.height, rx: 14, fill: 'var(--grp)', stroke: 'var(--line)', 'stroke-dasharray': '6 5' }))
    const t = S('text', { x: n.x + n.width - 14, y: n.y + 24, 'text-anchor': 'start', class: 'gt' }); t.textContent = n.title; g.append(t)
  })
  // یال‌ها: نقاط بزیهٔ خود LikeC4
  v.edges.forEach((e, i) => {
    const pts = e.points || []; if (pts.length < 2) return
    let d = `M${pts[0][0]} ${pts[0][1]}`; for (let k = 1; k + 2 < pts.length; k += 3) d += ` C${pts[k][0]} ${pts[k][1]} ${pts[k + 1][0]} ${pts[k + 1][1]} ${pts[k + 2][0]} ${pts[k + 2][1]}`
    if ((pts.length - 1) % 3) d += ' L' + pts.slice(1 + 3 * Math.floor((pts.length - 1) / 3)).map(p => p.join(' ')).join(' L')
    const hit = run && run.edges[e.source + '>' + e.target], step = run && run.cur === i
    const back = (e.tags || []).includes('loop') || /برگشت/.test(e.label || '')
    g.append(S('path', { d, fill: 'none', stroke: step ? '#ea4b71' : hit ? '#16a34a' : back ? '#ea580c' : '#94a3b8', 'stroke-width': hit || step ? 3 : 2, 'stroke-dasharray': back ? '7 5' : 'none', 'marker-end': `url(#${step ? 'ars' : hit ? 'arg' : 'ar'})` }))
    const lbl = e.label || (v._type === 'dynamic' ? fa(i + 1) : '')
    if (lbl && e.labelBBox) { const b = e.labelBBox, w = Math.min(160, lbl.length * 7 + 14); g.append(S('rect', { x: b.x + b.width / 2 - w / 2, y: b.y, width: w, height: 20, rx: 10, fill: 'var(--card)', stroke: 'var(--line)' })); const t = S('text', { x: b.x + b.width / 2, y: b.y + 14, 'text-anchor': 'middle', class: 'el' }); t.textContent = lbl.length > 22 ? lbl.slice(0, 21) + '…' : lbl; g.append(t) }
  })
  // گره‌ها: کارت n8n (آیکون مربع + عنوان زیر آن)، در قاب چیدمان LikeC4
  v.nodes.filter(n => !n.children.length).forEach(n => {
    const [lab, col, ic] = kindOf(n), b = nodeBox(n), s = Math.max(92, Math.min(130, b.h - 46)), cx = b.x + b.w / 2, top = b.y + (b.h - s - 44) / 2
    const r = run && run.nodes[n.id], sel = ST.sel === n.id
    const gg = S('g', { class: 'nd', 'data-id': n.id }); g.append(gg)
    gg.append(S('rect', { x: cx - s / 2, y: top, width: s, height: s, rx: 10, fill: 'var(--card)', stroke: sel ? '#ea4b71' : r ? ({ ok: '#16a34a', wait: '#ea580c', skip: '#94a3b8' })[r] : col, 'stroke-width': sel ? 3.5 : 2.2, opacity: r === 'skip' ? .5 : 1 }))
    gg.append(S('rect', { x: cx - s / 2, y: top, width: s, height: 5, rx: 2, fill: col }))
    const ti = S('text', { x: cx, y: top + s / 2 + s * .14, 'text-anchor': 'middle', 'font-size': Math.round(s * .4) }); ti.textContent = ic; gg.append(ti)
    if (r) { const t = S('text', { x: cx + s / 2 - 6, y: top + s - 8, 'text-anchor': 'end', 'font-size': 16, fill: r === 'ok' ? '#16a34a' : '#ea580c' }); t.textContent = r === 'ok' ? '✓' : r === 'wait' ? '⏸' : '–'; gg.append(t) }
    if (n.navigateTo) { const t = S('text', { x: cx - s / 2 + 8, y: top + 20, 'font-size': 13, fill: '#64748b' }); t.textContent = '⤢'; gg.append(t) }
    const t1 = S('text', { x: cx, y: top + s + 22, 'text-anchor': 'middle', class: 'nt' }); t1.textContent = n.title.length > 30 ? n.title.slice(0, 29) + '…' : n.title; gg.append(t1)
    const t2 = S('text', { x: cx, y: top + s + 37, 'text-anchor': 'middle', class: 'ns' }); t2.textContent = lab + (n.technology && !/—/.test(n.technology) ? ' · ' + n.technology.replace(/^skill:\s*/, '') : ''); gg.append(t2)
    gg.addEventListener('click', ev => { ev.stopPropagation(); if (CONNECT) { const from = CONNECT; CONNECT = null; addRel(from, n.id); return } ST.sel = n.id; render() })
    gg.addEventListener('dblclick', ev => { ev.stopPropagation(); if (n.navigateTo) { ST.view = n.navigateTo; ST.sel = null; ST.fit = true; render() } })
  })
  if (ST.fit !== false) { fit(v); ST.fit = false }
}
function fit(v) { const c = $('#cv'), b = v.bounds || { x: 0, y: 0, width: 1000, height: 600 }; ST.k = Math.max(.5, Math.min(1.1, (c.clientWidth - 40) / b.width, (c.clientHeight - 40) / b.height)); ST.x = b.width * ST.k < c.clientWidth ? (c.clientWidth - b.width * ST.k) / 2 - b.x * ST.k : 20 - b.x * ST.k; ST.y = (c.clientHeight - b.height * ST.k) / 2 - b.y * ST.k; $('#world') && $('#world').setAttribute('transform', `translate(${ST.x},${ST.y}) scale(${ST.k})`) }

// ——— پنل کناری: ویرایش گره ———
let CONNECT = null
function addRel(from, to) { edit((M, IDX) => { if (from === to) return false; const pp = parentOf(from) === parentOf(to) ? parentOf(from) : ''; M.rels.push({ from, to, label: 'بعد', c: pp ? pp.split('.') : [] }) }) }
function renderSide() {
  const el = $('#side'), v = view()
  if (!ST.sel) { el.replaceChildren(h('h3', {}, 'پنل'), h('p', { class: 'mute' }, 'روی یک گره کلیک کن تا ویرایش شود. دوبار کلیک روی گره‌ای که ⤢ دارد، نمای داخلش را باز می‌کند.'),
    h('h3', {}, 'اعتبارسنجی خود LikeC4'), ST.errs.length ? h('ul', { class: 'errs' }, ...ST.errs.map(e => h('li', {}, (e.line ? 'خط ' + fa(e.line) + ': ' : '') + e.message))) : h('p', { class: 'ok' }, '✓ بدون خطا')); return }
  const M = parseC4(ST.text), IDX = new Map(); walk(M.nodes, '', (n, p) => IDX.set(p, n)); const n = IDX.get(ST.sel)
  if (!n) { ST.sel = null; return renderSide() }
  const field = (lab, val, on, ta) => h('label', {}, lab, ta ? h('textarea', { rows: 3, onchange: e => on(e.target.value) }, val || '') : h('input', { value: val || '', onchange: e => on(e.target.value) }))
  const outs = M.rels.filter(r => r.from === ST.sel)
  el.replaceChildren(
    h('h3', {}, kindOf(n)[2] + ' ' + n.title), h('small', { class: 'ltr' }, ST.sel),
    field('عنوان', n.title, x => edit((M, I) => { I.get(ST.sel).title = x })),
    field('خروجی / توضیح', (n.desc || '').replace(/^out:\s*/, ''), x => edit((M, I) => { I.get(ST.sel).desc = 'out: ' + x }), 1),
    h('label', {}, 'نوع', h('select', { onchange: e => edit((M, I) => { I.get(ST.sel).kind = e.target.value }) }, ...['askStep', 'autoStep', 'gateStep', 'routeStep', 'triggerStep', 'subflowStep'].concat(KIND[n.kind] && !/Step$/.test(n.kind) ? [n.kind] : []).map(k => { const o = h('option', { value: k }, (KIND[k] || [k])[0]); if (k === n.kind) o.selected = true; return o }))),
    field('skill / فناوری', n.tech, x => edit((M, I) => { I.get(ST.sel).tech = x })),
    h('div', { class: 'row' },
      h('button', { onclick: () => edit((M, I) => { const p = parentOf(ST.sel), list = p ? I.get(p).children : M.nodes, i = list.indexOf(I.get(ST.sel)); const id = uniq(list, 'n'); list.splice(i + 1, 0, { id, kind: 'autoStep', title: 'قدم تازه', tags: [], children: [], tech: 'skill: —', desc: 'out: —', meta: [] }); const full = (p ? p + '.' : '') + id; M.rels.forEach(r => { if (r.from === ST.sel) r.from = full }); M.rels.push({ from: ST.sel, to: full, label: 'بعد', c: p ? p.split('.') : [] }); ST.sel = full }) }, '＋ قدم بعدی'),
      h('button', { onclick: () => { CONNECT = ST.sel; status('برای وصل کردن، روی گره مقصد کلیک کن') } }, '🔗 وصل به…'),
      h('button', { class: 'danger', onclick: () => edit((M, I) => { const p = parentOf(ST.sel), list = p ? I.get(p).children : M.nodes; list.splice(list.indexOf(I.get(ST.sel)), 1); M.rels = M.rels.filter(r => !r.from.startsWith(ST.sel) && !r.to.startsWith(ST.sel)); ST.sel = null }) }, '🗑 حذف')),
    outs.length ? h('div', {}, h('h4', {}, 'فلش‌های خروجی'), ...outs.map(r => h('div', { class: 'row' }, h('span', {}, '→ ' + (IDX.get(r.to)?.title || r.to)), h('input', { value: r.label || '', style: 'width:90px', onchange: e => edit(M2 => { const x = M2.rels.find(z => z.from === r.from && z.to === r.to); x.label = e.target.value }) }), h('button', { onclick: () => edit(M2 => { M2.rels = M2.rels.filter(z => !(z.from === r.from && z.to === r.to)) }) }, '✕')))) : null,
    h('button', { onclick: () => { ST.sel = null; render() } }, 'بستن'))
}

// ——— پایین: اجراها، متن .c4، خروجی‌ها ———
let TIMER = null
function simulate() {
  const v = view(); if (!v) return; clearInterval(TIMER)
  const seq = v._type === 'dynamic' ? v.edges.map(e => e) : (() => { // ترتیب از روی یال‌ها؛ gate می‌ایستد
    const ind = new Map(v.nodes.map(n => [n.id, 0])); v.edges.forEach(e => ind.set(e.target, (ind.get(e.target) || 0) + 1))
    const out = [], seen = new Set(), qq = v.nodes.filter(n => !n.children.length && !ind.get(n.id)).map(n => n.id)
    while (qq.length) { const id = qq.shift(); if (seen.has(id)) continue; seen.add(id); const n = v.nodes.find(x => x.id === id); if (n && n.kind === 'gateStep') { out.push({ node: id, wait: 1 }); continue } v.edges.filter(e => e.source === id).forEach((e, k) => { if (n && n.kind === 'routeStep' && k) return; out.push(e); qq.push(e.target) }) }
    return out })()
  ST.run = { nodes: {}, edges: {}, cur: -1, log: [] }; let i = 0
  TIMER = setInterval(() => {
    if (!ST.run) { clearInterval(TIMER); return }
    if (i >= seq.length) { clearInterval(TIMER); v.nodes.forEach(n => { if (!n.children.length && !ST.run.nodes[n.id]) ST.run.nodes[n.id] = 'skip' }); ST.run.cur = -1; render(); return }
    const s = seq[i++]
    if (s.wait) { ST.run.nodes[s.node] = 'wait'; ST.run.log.push('⏸ منتظر تأیید انسان: ' + s.node) }
    else { ST.run.nodes[s.source] = ST.run.nodes[s.source] || 'ok'; ST.run.nodes[s.target] = (v.nodes.find(n => n.id === s.target)?.kind === 'gateStep') ? 'wait' : 'ok'; ST.run.edges[s.source + '>' + s.target] = (ST.run.edges[s.source + '>' + s.target] || 0) + 1; ST.run.cur = v.edges.indexOf(s); ST.run.log.push('✓ ' + s.source + ' → ' + s.target + (s.label ? ' (' + s.label + ')' : '')) }
    render()
  }, 450)
}
function download(name, text, type = 'text/plain') { const a = h('a', { href: URL.createObjectURL(new Blob([text], { type })), download: name }); document.body.append(a); a.click(); a.remove() }
function toN8n() {
  const v = view(), ty = { triggerStep: 'n8n-nodes-base.manualTrigger', gateStep: 'n8n-nodes-base.wait', askStep: 'n8n-nodes-base.form', routeStep: 'n8n-nodes-base.switch' }
  const nodes = v.nodes.filter(n => !n.children.length).map(n => ({ id: n.id, name: n.title + ' (' + n.id + ')', type: ty[n.kind] || 'n8n-nodes-base.noOp', typeVersion: 1, position: [Math.round(n.x), Math.round(n.y)], parameters: {} }))
  const nm = id => nodes.find(x => x.id === id)?.name, connections = {}
  v.edges.forEach(e => { if (nm(e.source) && nm(e.target)) (connections[nm(e.source)] = connections[nm(e.source)] || { main: [[]] }).main[0].push({ node: nm(e.target), type: 'main', index: 0 }) })
  return JSON.stringify({ name: ST.file + ' / ' + v.id, nodes, connections, settings: {} }, null, 2)
}
function toFreeplane() {
  const M = parseC4(ST.text), x = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const nd = n => `<node TEXT="${x(n.title)}">${n.children.map(nd).join('')}</node>`
  return `<map version="freeplane 1.9.0"><node TEXT="${x(ST.file)}">${M.nodes.map(nd).join('')}</node></map>`
}
function renderBottom() {
  const r = ST.run
  $('#bottom').replaceChildren(
    h('div', { class: 'row' },
      h('button', { class: 'pri', onclick: simulate }, view()?._type === 'dynamic' ? '▶ پخش همین نمای dynamic' : '▶ اجرای آزمایشی همین نما'),
      h('button', { onclick: () => { ST.run = null; clearInterval(TIMER); render() } }, 'پاک کردن اجرا'),
      h('button', { disabled: !ST.hist.length, onclick: () => { compile(ST.hist.pop()) } }, '↶ برگرداندن'),
      h('button', { onclick: () => download(ST.file, ST.text) }, '⬇ ذخیرهٔ .c4'),
      h('button', { onclick: () => download(ST.file.replace(/\.c4$/, '') + '.n8n.json', toN8n(), 'application/json') }, '⇢ خروجی n8n'),
      h('button', { onclick: () => download(ST.file.replace(/\.c4$/, '') + '.mm', toFreeplane(), 'application/xml') }, '⬇ ذهن‌نقشه Freeplane'),
      h('button', { onclick: () => { const d = $('#src'); d.open = !d.open } }, '{ } متن .c4')),
    ...(r ? [h('div', { class: 'log' }, r.log.slice(-6).join('\n'))] : []))
  const ta = $('#srcta'); if (document.activeElement !== ta) ta.value = ST.text
}

// پن و زوم
{ const c = $('#cv'); let drag = null
  c.addEventListener('wheel', e => { e.preventDefault(); const r = c.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top, k2 = Math.max(.15, Math.min(2.5, ST.k * (e.deltaY < 0 ? 1.1 : 1 / 1.1))); ST.x = mx - (mx - ST.x) * k2 / ST.k; ST.y = my - (my - ST.y) * k2 / ST.k; ST.k = k2; $('#world').setAttribute('transform', `translate(${ST.x},${ST.y}) scale(${ST.k})`) }, { passive: false })
  c.addEventListener('mousedown', e => { if (e.target.closest('.nd')) return; drag = [e.clientX - ST.x, e.clientY - ST.y] })
  addEventListener('mousemove', e => { if (!drag) return; ST.x = e.clientX - drag[0]; ST.y = e.clientY - drag[1]; $('#world').setAttribute('transform', `translate(${ST.x},${ST.y}) scale(${ST.k})`) })
  addEventListener('mouseup', () => drag = null)
  c.addEventListener('click', () => { if (ST.sel) { ST.sel = null; render() } }) }
$('#srcta').addEventListener('change', e => { ST.hist.push(ST.text); compile(e.target.value) })
$('#fitb').onclick = () => { fit(view()) }
window.__ST = ST
compile(SRC[ST.file], false)
