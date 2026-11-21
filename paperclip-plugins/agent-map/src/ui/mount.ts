// v0.5.0 · 2026-11-21 21:40 Berlin. Commercial look (src/ui/skin.ts) replaces the old toolbar; neutral colours that match Paperclip. v0.4.3 · 2026-11-21 21:08 Berlin. Dropdown options (نما etc.) were light text on a white list in dark mode: options now use the card/fg tokens. v0.4.2 · 2026-11-21 21:10 Berlin. Guard: steps from imported .mmd flows name a lane («§…»), not an agent; no longer counted red. v0.4.1 · 2026-11-21 20:50 Berlin. Popups (#in-bk, Ctrl+K) are appended to <body>, outside .amx: give them the colour tokens too (they were transparent). v0.4.0: live case slot for the «اجرای پرونده» view. v0.3.1 · 2026-11-21 20:05 Berlin. +canvas height fits its content (Siax 18:54 UTC: endless empty canvas). v0.3.0: budget alerts (idea 4), CSV export (idea 8). Mounts the agent-map engine (generated from the hub artifact's «موکاپ افزونه» tab) into a host element.
// Pure DOM, no React, so the same code runs in the plugin and in the browser test (tests/engine.e2e.mjs).
import ENGINE from "../generated/engine.json" with { type: "json" };
import { overBudget } from "../shared/scenario.js";
import { applySkin, SKIN_CSS } from "./skin.js";

export type LiveAgent = { id: string; name: string; title: string | null; reportsTo: string | null; status: string; model: string | null; skills: string[]; spentMonthlyCents: number; budgetMonthlyCents: number; cat: string; orgId: string | null };
export type OrgPayload = { org: { cats: unknown; order: string[]; agents: unknown[]; workflows: unknown[] } };

const TOKENS = `.amx,.in-bk,.ck,.amx-page{--bg:#fafafa;--card:#fff;--fg:#18181b;--muted:#71717a;--line:#e4e4e7;--you:#b5446e;--boss:#6d4fe0;--chip:#f4f4f5;--body:"Vazirmatn",Tahoma,sans-serif;font-family:var(--body);color:var(--fg);direction:rtl;line-height:1.7}
@media (prefers-color-scheme:dark){.amx,.in-bk,.ck,.amx-page{--bg:#111113;--card:#18181b;--fg:#f4f4f5;--muted:#a1a1aa;--line:#2a2a2e;--you:#e47aa0;--boss:#9d8cf5;--chip:#232327}}
.amx select,.in-bk select,.ck select{color-scheme:light;background:var(--card);color:var(--fg)}.amx option,.amx optgroup,.in-bk option,.ck option{background:var(--card);color:var(--fg)}
@media (prefers-color-scheme:dark){.amx select,.in-bk select,.ck select{color-scheme:dark}}
.amx .amx-top{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:8px 16px 0}.amx select{font:inherit;padding:3px 8px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--fg)}
.amx .am-view{height:calc(100vh - 220px);min-height:480px;max-height:none;cursor:grab}.amx .am-view{padding-top:64px}
.amx .am-over{box-shadow:0 0 0 2.5px hsl(0 70% 52%)!important}.amx .amx-warn{color:hsl(0 70% 48%);font-weight:700}
.amx .am-stage>.am-bar{position:absolute;top:10px;right:10px;left:10px;z-index:6;pointer-events:none}.amx .am-stage>.am-bar>*{pointer-events:auto}`;
const HOOK = "by={};kids={};A.forEach(function(a){by[a.id]=a});";

/** Live overlay: real status, model, spend and budget from Paperclip on top of the org chart. */
export function overlay(A: any[], live: LiveAgent[], company: string) {
  if (company !== "global") return 0;
  const m = new Map(live.filter((l) => l.orgId).map((l) => [l.orgId as string, l]));
  let n = 0;
  for (const a of A) {
    const l = m.get(a.id); if (!l) { a.status = "paused"; a.spent = 0; continue; }
    n++; a.status = ["running", "idle", "paused", "error"].includes(l.status) ? l.status : "idle";
    a.spent = l.spentMonthlyCents; a.budget = l.budgetMonthlyCents || a.budget; if (l.model) a.model = l.model; a.live = l.id;
  }
  return n;
}

export function mountEngine(host: HTMLElement, data: OrgPayload, live: LiveAgent[], companyName = "Paperclip"): () => void {
  const E = ENGINE as { css: string; js: string; html: string };
  if (!E.js.includes(HOOK)) throw new Error("engine hook not found; regenerate with tools/sync_data.py");
  const ag = { comps: { live: { n: `${companyName} (زنده)`, d: "ایجنت‌های واقعی همین شرکت در Paperclip" } }, agents: live.map((l) => ({ c: "live", id: l.id, n: l.name, t: l.title ?? "", r: l.reportsTo, k: l.cat, m: l.model ?? undefined, s: l.skills })) };
  const json = (id: string, v: unknown) => `<script type="application/json" id="${id}">${JSON.stringify(v).replace(/</g, "\\u003c")}</script>`;
  const matched = live.filter((l) => l.orgId).length;
  host.className = "amx";
  host.innerHTML = `<style>${TOKENS}\n${E.css}\n${SKIN_CSS}</style>${json("ag-data", ag)}${json("mk-global", { cats: data.org.cats, order: data.org.order, agents: data.org.agents })}
<div class="amx-top"><label>نما <select id="mk-co"><option value="global">سازمان ما (چارت + وضعیت زنده)</option><option value="live">فقط ایجنت‌های Paperclip (${live.length})</option></select></label>
<span class="am-muted" id="amx-live">${live.length} ایجنت در Paperclip · ${matched} با چارت جور شد</span><span id="mk-pre" hidden></span></div><div id="p-mock">${E.html}</div>`;
  (window as any).__amLive = (A: any[], st: any) => overlay(A, live, st.c);
  (window as any).__amWF = data.org.workflows;
  // 0.8.0: the hub's «▶ اجرای پرونده» view shows a frozen SMMA-2 copy in an iframe; inside Paperclip the live case list (CaseRuns) is rendered into this slot instead.
  const RUN_IFRAME = /'\+?'?<div class="am-muted"[^']*?<\/div><iframe title="اجرای پرونده"[^']*?<\/iframe>'/;
  let js = E.js.replace(HOOK, "window.__amLive&&window.__amLive(A,st);" + HOOK);
  if (RUN_IFRAME.test(js)) js = js.replace(RUN_IFRAME, `'<div id="amx-run-slot"></div>'`);
  js = js.replace("w.s.forEach(function(x,i){if(!by[x[0]])", "w.s.forEach(function(x,i){if(!by[x[0]]&&String(x[0]).charAt(0)!=='§')");
  new Function(js)();
  // idea 4: budget alert — red ring on every card at >=80% of its monthly budget, count in the top bar
  const over = new Set<string>();
  for (const l of live) if (overBudget(l.spentMonthlyCents, l.budgetMonthlyCents)) { over.add(l.id); if (l.orgId) over.add(l.orgId); }
  const warn = live.filter((l) => overBudget(l.spentMonthlyCents, l.budgetMonthlyCents));
  const top = host.querySelector("#amx-live");
  if (top && warn.length) top.insertAdjacentHTML("afterend", `<span class="amx-warn" id="amx-warn">⚠ ${warn.length} ایجنت بالای ۸۰٪ بودجهٔ ماه: ${warn.map((w) => w.name).join("، ")}</span>`);
  const inn = host.querySelector("#mk-in");
  const mark = () => inn?.querySelectorAll<HTMLElement>("[data-s]").forEach((c) => c.classList.toggle("am-over", over.has(c.dataset.s ?? "")));
  const mo = inn ? new MutationObserver(mark) : null; mo?.observe(inn!, { childList: true, subtree: true }); mark();
  // 0.7.1 (Siax 2026-11-21 18:54 UTC «چرا صفحه انقدر بی پایان … وقتی خالی»): the canvas was a fixed viewport-high box (engine CSS
  // `#p-mock .am-view{height:calc(100vh - 70px)}`), mostly empty when the chart is small or zoomed out. Now it is as tall as its content, capped at the viewport.
  const view = host.querySelector<HTMLElement>("#mk-view");
  const fit = () => { if (!view || !inn) return; const pad = 20 + 64 + 8, max = Math.max(320, window.innerHeight - 120);
    view.style.minHeight = "0"; view.style.boxSizing = "border-box"; view.style.height = Math.round(Math.min(max, Math.max(240, (inn as HTMLElement).getBoundingClientRect().height + pad))) + "px"; };
  const ro = inn && typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null; ro?.observe(inn!);
  const zo = inn ? new MutationObserver(fit) : null; zo?.observe(inn!, { attributes: true, attributeFilter: ["style", "class"], childList: true });
  window.addEventListener("resize", fit); fit();
  // idea 8: the export button really exports (CSV of the chart with live status)
  const ex = host.querySelector<HTMLButtonElement>("#mk-ex");
  const onEx = (e: Event) => { e.stopImmediatePropagation(); e.preventDefault(); const csv = toCsv(data, live); const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv" })); a.download = "agent-map.csv"; a.click(); (window as any).__amLastCsv = csv; };
  if (ex) { ex.textContent = "⤓ خروجی CSV"; ex.addEventListener("click", onEx, true); }
  const unskin = applySkin(host, data, live); fit();
  return () => { unskin(); mo?.disconnect(); ro?.disconnect(); zo?.disconnect(); window.removeEventListener("resize", fit); host.innerHTML = ""; delete (window as any).__amLive; };
}

export function toCsv(data: OrgPayload, live: LiveAgent[]): string {
  const m = new Map(live.filter((l) => l.orgId).map((l) => [l.orgId as string, l]));
  const q = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = [["id", "name", "title", "reportsTo", "department", "model", "mode", "live_status", "spent_usd", "budget_usd"]];
  for (const a of data.org.agents as any[]) { const l = m.get(a.id); rows.push([a.id, a.n, a.t ?? "", a.r ?? "", a.k, l?.model ?? a.m ?? "", a.mode ?? "", l?.status ?? "not in Paperclip", l ? (l.spentMonthlyCents / 100).toFixed(2) : "", l ? (l.budgetMonthlyCents / 100).toFixed(2) : ""]); }
  return rows.map((r) => r.map(q).join(",")).join("\n");
}
