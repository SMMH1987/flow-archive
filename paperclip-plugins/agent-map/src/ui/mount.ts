// v0.2.0 · 2026-11-21 17:20 Berlin. Mounts the agent-map engine (generated from the hub artifact's «موکاپ افزونه» tab) into a host element.
// Pure DOM, no React, so the same code runs in the plugin and in the browser test (tests/engine.e2e.mjs).
import ENGINE from "../generated/engine.json" with { type: "json" };

export type LiveAgent = { id: string; name: string; title: string | null; reportsTo: string | null; status: string; model: string | null; skills: string[]; spentMonthlyCents: number; budgetMonthlyCents: number; cat: string; orgId: string | null };
export type OrgPayload = { org: { cats: unknown; order: string[]; agents: unknown[]; workflows: unknown[] } };

const TOKENS = `.amx{--bg:#f7f5f2;--card:#fff;--fg:#1d2230;--muted:#606a7a;--line:#e0ddd6;--you:#b5446e;--boss:#5b3fd0;--chip:#f0ede7;--body:"Vazirmatn",Tahoma,sans-serif;font-family:var(--body);color:var(--fg);direction:rtl;line-height:1.7}
@media (prefers-color-scheme:dark){.amx{--bg:#13161c;--card:#1b2029;--fg:#e8eaf0;--muted:#9ba4b4;--line:#2d3440;--you:#e47aa0;--boss:#a08bff;--chip:#242a34}}
.amx .amx-top{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:8px 16px 0}.amx select{font:inherit;padding:3px 8px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--fg)}
.amx .am-view{height:calc(100vh - 220px);min-height:480px;max-height:none;cursor:grab}.amx .am-view{padding-top:64px}
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
  host.innerHTML = `<style>${TOKENS}\n${E.css}</style>${json("ag-data", ag)}${json("mk-global", { cats: data.org.cats, order: data.org.order, agents: data.org.agents })}
<div class="amx-top"><label>نما <select id="mk-co"><option value="global">سازمان ما (چارت + وضعیت زنده)</option><option value="live">فقط ایجنت‌های Paperclip (${live.length})</option></select></label>
<span class="am-muted" id="amx-live">${live.length} ایجنت در Paperclip · ${matched} با چارت جور شد</span><span id="mk-pre" hidden></span></div><div id="p-mock">${E.html}</div>`;
  (window as any).__amLive = (A: any[], st: any) => overlay(A, live, st.c);
  (window as any).__amWF = data.org.workflows;
  const js = E.js.replace(HOOK, "window.__amLive&&window.__amLive(A,st);" + HOOK);
  new Function(js)();
  return () => { host.innerHTML = ""; delete (window as any).__amLive; };
}
