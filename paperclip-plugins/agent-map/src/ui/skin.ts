// v1.0 · 2026-11-21 21:35 Berlin. Commercial look (approved by Siax 20:18 UTC «خیلی عالی شده … حتما اپدیت کن به این ظاهر افزونه», then «ظاهر قبلی پاک کن»).
// Re-arranges the engine's REAL controls (same ids, same handlers) into: one calm top bar (search, «نما» popover, workflow, filter, colour, more),
// 4 summary numbers, warnings only on cards with a problem, zoom floating in the corner. Ideas: Linear (top bar, Display menu), ChartHop/Functionly
// (colour by), Pingboard/Lucid (collapsed groups), dashboard-design + calm-panels skills (needs-you strip, warm colour only for problems).
import type { LiveAgent, OrgPayload } from "./mount.js";
import { overBudget } from "../shared/scenario.js";

export const SKIN_CSS = `
.amx.amx-pro{--a:#7c5cff;--warn:#c2410c;--warnbg:color-mix(in srgb,#f97316 12%,var(--card))}
@media (prefers-color-scheme:dark){.amx.amx-pro{--a:#9d8cf5;--warn:#fb923c}}
.amx-pro .amx-top,.amx-pro #p-mock .am-hd,.amx-pro #mk-kpi,.amx-pro .am-wfbar{display:none!important}
.amx-pro #p-mock .am{padding:0 0 12px;gap:10px}
.amx-tb{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:10px 14px;border:1px solid var(--line);border-radius:12px 12px 0 0;background:var(--card);position:relative;z-index:8}
.amx-tb h3{margin:0;font-size:15px;font-weight:700}.amx-tb .ro{font-size:11px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:0 8px}
.amx-tb .sp{flex:1}
.amx-tb .am-srch{flex:0 1 260px;min-width:150px;display:flex;align-items:center;gap:6px;position:relative}
.amx-tb .am-srch input{font:inherit;font-size:13px;width:100%;padding:5px 10px 5px 52px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--fg)}
.amx-tb .am-srch .k{position:absolute;left:6px;font:11px ui-monospace,monospace;color:var(--muted);border:1px solid var(--line);border-radius:4px;padding:0 4px;direction:ltr;cursor:pointer;background:var(--card)}
.amx-tb #mk-n{position:absolute;left:52px;font-size:11px}
.amx-b{font:inherit;font-size:13px;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:8px;padding:4px 10px;cursor:pointer;white-space:nowrap}
.amx-b:hover,.amx-b[aria-expanded=true]{border-color:var(--muted)}.amx-b .n{font-size:11px;background:var(--chip);border-radius:999px;padding:0 6px;font-variant-numeric:tabular-nums}
.amx-tb .wfs{display:inline-flex;align-items:center;gap:4px;font-size:13px;color:var(--muted);max-width:260px}
.amx-tb .wfs select{font:inherit;font-size:13px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--fg);padding:3px 6px;max-width:210px}
.amx-sr{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;white-space:nowrap!important;opacity:0}
.amx-pw{position:relative;display:inline-flex}
.amx-pop{position:absolute;top:calc(100% + 6px);right:0;z-index:40;min-width:240px;max-width:min(340px,90vw);max-height:70vh;overflow:auto;background:var(--card);color:var(--fg);border:1px solid var(--line);border-radius:12px;box-shadow:0 16px 40px -12px rgba(0,0,0,.45);padding:6px;display:grid;gap:1px}
.amx-pop[hidden]{display:none}.amx-pop.l{right:auto;left:0}
.amx-pop .amx-gh{font-size:11px;font-weight:700;color:var(--muted);padding:4px 8px 0}
.amx-pop>button,.amx-pop .it{font:inherit;font-size:13px;text-align:start;border:0;background:none;color:var(--fg);border-radius:8px;padding:6px 8px;cursor:pointer;display:grid;grid-template-columns:22px 1fr;gap:0 8px;align-items:center}
.amx-pop>button:hover,.amx-pop>button[aria-current=true]{background:var(--chip)}
.amx-pop>button i{font-style:normal;grid-row:span 2;text-align:center;color:var(--muted)}.amx-pop>button small{color:var(--muted);font-size:11.5px}
.amx-pop hr{border:0;border-top:1px solid var(--line);margin:4px 0;width:100%}
.amx-pop h5{margin:4px 8px;font-size:11px;color:var(--muted);font-weight:600}
.amx-pop .am-btn{border:0;background:none;text-align:start;padding:6px 8px;border-radius:8px;width:100%}.amx-pop .am-btn:hover{background:var(--chip)}
.amx-pop.flt{width:340px;gap:8px;padding:10px}.amx-pop.flt .am-chips{display:flex;flex-wrap:wrap;gap:6px}
.amx-pop.flt label{display:grid;gap:2px;font-size:12px;color:var(--muted)}.amx-pop.flt select{font:inherit;font-size:13px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--fg);padding:3px 6px}
.amx-pop.flt #amx-live{font-size:12px}.amx-pop.flt #amx-warn{font-size:12px;color:var(--warn)}
.amx-kp{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);border-top:0;border-radius:0 0 12px 12px;overflow:hidden;margin-top:-10px}
.amx-kp>*{background:var(--card);padding:8px 14px;display:grid;text-align:start;font:inherit;color:var(--fg);border:0}
.amx-kp b{font-size:20px;font-weight:600;font-variant-numeric:tabular-nums;line-height:1.3}.amx-kp small{color:var(--muted);font-size:12px}
.amx-kp>.amx-pw{padding:0}.amx-kp .need{cursor:pointer;width:100%;height:100%;display:grid;align-content:start;text-align:start;font:inherit;color:var(--fg);background:var(--card);border:0;padding:8px 14px}.amx-kp .need.on b{color:var(--warn)}.amx-kp .need:hover{background:var(--chip)}
.amx-kp .bar{height:4px;border-radius:9px;background:var(--chip);overflow:hidden;margin-top:4px}.amx-kp .bar i{display:block;height:100%;background:var(--muted)}.amx-kp .bar i.w{background:var(--warn)}
@media (max-width:640px){.amx-kp{grid-template-columns:repeat(2,minmax(0,1fr))}}
.amx-pro #p-mock .am-stage>.am-bar{position:absolute;inset:auto auto 12px 204px;top:auto;right:auto;left:204px;z-index:7;display:block;padding:0;background:none}
@media (max-width:700px){.amx-pro #p-mock .am-stage>.am-bar{left:12px}}
.amx-pro .am-stage>.am-bar .am-zoom{background:var(--card);border:1px solid var(--line);border-radius:9px;box-shadow:0 4px 14px -6px rgba(0,0,0,.3);flex-wrap:nowrap}
.amx-pro .am-zoom button[data-z=all],.amx-pro .am-zoom button[data-z=none],.amx-pro .am-zoom button[data-z=fit]{font-size:0;padding:3px 9px}
.amx-pro .am-zoom button[data-z=fit]::after{content:"⤢";font-size:14px}.amx-pro .am-zoom button[data-z=all]::after{content:"⊞";font-size:14px}.amx-pro .am-zoom button[data-z=none]::after{content:"⊟";font-size:14px}
.amx-pro #p-mock .am-view,.amx-pro .am-view{padding-top:20px;border-radius:12px;background-image:radial-gradient(color-mix(in srgb,var(--muted) 30%,transparent) 1px,transparent 1px);background-size:20px 20px;padding-bottom:64px}
.amx-pro .am-cd{width:216px;border-radius:10px;padding:10px;gap:1px 10px;box-shadow:0 1px 2px rgba(0,0,0,.06);transform:none!important}
.amx-pro .am-cd::before{display:none}
.amx-pro .am-cd:hover{border-color:var(--muted);box-shadow:0 1px 2px rgba(0,0,0,.06)}
.amx-pro .am-cd .am-av{border-radius:9px;width:34px;height:34px}.amx-pro .am-cd .am-av i{bottom:-3px;left:-3px}
.amx-pro .am-cd b{font-size:13.5px;font-weight:600}.amx-pro .am-cd small{font-size:12px}
.amx-pro .am-cd .ft{margin-top:6px}.amx-pro .am-cd:not(.am-over) .ft .bar{display:none}
.amx-pro .am-cd .am-md{background:none;border:1px solid var(--line);color:var(--muted)}
.amx-pro .am-sel{box-shadow:0 0 0 1px color-mix(in srgb,var(--a) 60%,transparent)!important;background:color-mix(in srgb,var(--a) 9%,var(--card))}
.amx-pro .am-over,.amx-pro .amx-prob{box-shadow:none!important;border-color:var(--warn)!important;background:var(--warnbg)!important}
.amx-flag{grid-column:1/-1;display:flex;justify-content:space-between;gap:6px;font-size:12px;color:var(--warn);margin-top:6px}
.amx-flag u{text-decoration:underline}
.amx-pro .am-drw{border-radius:12px}
.amx-page{display:grid;gap:14px;padding:12px;background:var(--bg)}
.amx-page>section{border:1px solid var(--line);border-radius:12px;background:var(--card);padding:14px!important}
.amx-page>section h3{margin:0;font-size:15px}
.amx-page>section input:not([type=checkbox]),.amx-page>section select,.amx-page>section textarea{font:inherit;font-size:13px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--fg);padding:4px 8px}
.amx-page>section button:not(.amx-b){font:inherit;font-size:13px;border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:8px;padding:4px 10px;cursor:pointer}
.amx-page>section button:not(.amx-b):hover{border-color:var(--muted)}.amx-page>section button:disabled{opacity:.5;cursor:default}
.amx-page pre{background:var(--chip)!important;color:var(--fg)}
.amx-sh{display:flex;flex-wrap:wrap;gap:8px;align-items:baseline}.amx-sh .sp{flex:1}
.amx-runs{display:grid;gap:10px}
.amx-dec{display:grid;gap:10px}.amx-dec-f{display:flex;flex-wrap:wrap;gap:6px}.amx-dec-f .amx-b.on{background:var(--fg);color:var(--bg);border-color:var(--fg)}
.amx-dec-q{min-width:180px}.amx-trial{font-size:11.5px;border:1px dashed var(--warn,#f08c00);color:var(--warn,#f08c00);border-radius:999px;padding:0 8px}
.amx-d-replaced .tt{text-decoration:line-through;color:var(--muted)}
.amx-case{border:1px solid var(--line);border-radius:10px;overflow:hidden}
.amx-ch{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;padding:8px 12px;background:var(--chip)}.amx-ch .bar{flex:1 1 120px;height:5px;border-radius:9px;background:var(--line);overflow:hidden;min-width:80px}.amx-ch .bar i{display:block;height:100%;background:#2f9e44}
.amx-step{border-top:1px solid var(--line)}
.amx-step>summary{list-style:none;cursor:pointer;display:grid;grid-template-columns:20px minmax(0,1fr) auto auto;gap:8px;align-items:center;padding:7px 12px;font-size:13px}
.amx-step>summary::-webkit-details-marker{display:none}.amx-step>summary:hover{background:var(--chip)}
.amx-step .ic{font-weight:700;text-align:center}.amx-step .tt{font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.amx-step .who{color:var(--muted);font-size:12px;white-space:nowrap}
.amx-step .chip{font-size:11.5px;border:1px solid;border-radius:999px;padding:0 8px;white-space:nowrap}
.amx-step .amx-ans{white-space:pre-wrap;font-size:13px;padding:4px 40px 12px 12px;line-height:1.8}
@media (max-width:560px){.amx-step>summary{grid-template-columns:20px minmax(0,1fr) auto}.amx-step .who{display:none}.amx-step .amx-ans{padding-inline-start:12px}}

`;

const VDESC: Record<string, string> = { org: "چه کسی زیر دست کیست", mm: "دپارتمان‌ها و نقش‌ها، شاخه‌ای", ls: "جدول قابل مرتب‌کردن، با هزینه", wf: "مسیر کار با درگاه‌های تأیید", wv: "فلوچارت قدم‌به‌قدم", bl: "چه کسی در هر قدم چه می‌کند", tl: "میلهٔ هر قدم و اسلایدر پخش دوباره", kb: "ستون‌ها بر اساس وضعیت قدم", hm: "هزینه نسبت به بودجه، رنگی", px: "وضعیت ایجنت‌ها به شکل دفتر", run: "پرونده‌های زنده، هر قدم با جواب ایجنت" };
const VNAME: Record<string, string> = { wf: "ورک‌فلو BPMN", wv: "ورک‌فلو عمودی", bl: "جدول نقش × قدم", px: "دفتر پیکسلی", tl: "تایم‌لاین", kb: "کانبان", hm: "نقشهٔ حرارتی هزینه", run: "اجرای پرونده" };
const GROUP_START = new Set(["wf", "run"]);
const GH: Record<string, string> = { org: "سازمان", wf: "ورک‌فلو", run: "پرونده و هزینه" }; // 0.11.0: three labelled groups in «نما»
const COLORS: Record<string, [string, string]> = { dept: ["دپارتمان", "رنگ هر دپارتمان"], status: ["وضعیت", "در حال کار، آماده، متوقف، خطا"], model: ["مدل", "Opus، Sonnet، Haiku"], cost: ["هزینه", "سهم مصرف از بودجهٔ ماه"] };
const STC: Record<string, string> = { running: "hsl(150 55% 40%)", idle: "hsl(215 70% 55%)", error: "hsl(0 70% 52%)", paused: "hsl(220 8% 58%)" };

const fa = (n: number) => String(n);
const usd = (c: number) => "$" + (c / 100).toFixed(2);

export function applySkin(host: HTMLElement, data: OrgPayload, live: LiveAgent[]): () => void {
  host.classList.add("amx-pro");
  const q = <T extends Element = HTMLElement>(s: string) => host.querySelector(s) as T | null;
  const am = q("#p-mock .am"); if (!am) return () => {};
  const byOrg = new Map(live.filter((l) => l.orgId).map((l) => [l.orgId as string, l]));
  const byId = new Map(live.map((l) => [l.id, l]));
  const orgA = new Map((data.org.agents as any[]).map((a) => [a.id, a]));
  const liveOf = (s: string) => byId.get(s) ?? byOrg.get(s);

  const tb = document.createElement("div"); tb.className = "amx-tb";
  tb.innerHTML = `<h3>نقشهٔ ایجنت‌ها</h3><span class="ro">فقط خواندنی</span><span class="sp"></span>
<span class="amx-slot-s"></span>
<span class="amx-pw"><button type="button" class="amx-b amx-vb" aria-expanded="false" aria-haspopup="true">نما ▾</button><div class="amx-pop amx-vp" hidden role="menu"></div></span>
<span class="wfs">ورک‌فلو <span class="amx-slot-w"></span></span>
<span class="amx-pw"><button type="button" class="amx-b amx-fb" aria-expanded="false">فیلتر <span class="n">۰</span></button><div class="amx-pop l flt" hidden></div></span>
<span class="amx-pw"><button type="button" class="amx-b amx-cb" aria-expanded="false">رنگ: دپارتمان ▾</button><div class="amx-pop l amx-cp" hidden role="menu"></div></span>
<span class="amx-pw"><button type="button" class="amx-b amx-more-b" aria-expanded="false" aria-label="بیشتر">⋯</button><div class="amx-pop l amx-mp" hidden role="menu"></div></span>`;
  am.prepend(tb);
  const kp = document.createElement("div"); kp.className = "amx-kp"; tb.after(kp);

  // real controls moved, not copied: the engine keeps its handlers and ids
  const srch = q(".am-stage>.am-bar .am-srch"); if (srch) { tb.querySelector(".amx-slot-s")!.replaceWith(srch); srch.insertAdjacentHTML("beforeend", `<span class="k" title="جست‌وجوی سریع">Ctrl K</span>`); }
  const ck = Array.from(host.querySelectorAll<HTMLButtonElement>(".am-acts .am-btn")).find((b) => b.textContent?.includes("⌘K"));
  srch?.querySelector(".k")?.addEventListener("click", () => ck?.click());
  const wfs = q<HTMLSelectElement>("#mk-wfs"); if (wfs) tb.querySelector(".amx-slot-w")!.replaceWith(wfs);
  const vsel = q<HTMLSelectElement>("#mk-v"); const vlab = vsel?.closest("label"); if (vlab) { vlab.classList.add("amx-sr"); tb.querySelector(".amx-vb")!.after(vlab); }
  const flt = tb.querySelector<HTMLElement>(".flt")!;
  flt.innerHTML = `<h5>دپارتمان‌ها</h5>`; const leg = q("#mk-leg"); if (leg) flt.append(leg);
  const irw = q("#mk-irw"); if (irw) { flt.insertAdjacentHTML("beforeend", `<h5>لایه</h5>`); flt.append(irw); }
  const co = q<HTMLSelectElement>("#mk-co"); if (co) { const l = document.createElement("label"); l.textContent = "منبع ایجنت‌ها"; l.append(co); flt.append(l); }
  const liveTxt = q("#amx-live"); if (liveTxt) flt.append(liveTxt); const warnTxt = q("#amx-warn"); if (warnTxt) flt.append(warnTxt);
  const mp = tb.querySelector<HTMLElement>(".amx-mp")!;
  host.querySelectorAll<HTMLButtonElement>(".am-acts .am-btn").forEach((b) => mp.append(b));

  // «نما» popover drives the real select
  const vp = tb.querySelector<HTMLElement>(".amx-vp")!, vb = tb.querySelector<HTMLButtonElement>(".amx-vb")!;
  const opts = vsel ? Array.from(vsel.options) : [];
  vp.innerHTML = opts.map((o, i) => { const t = o.text.trim(), ic = t.split(" ")[0], nm = VNAME[o.value] ?? t.slice(ic.length).replace(/\s*\(.*\)$/, "").trim();
    return `${i && GROUP_START.has(o.value) ? "<hr>" : ""}${(i === 0 || GROUP_START.has(o.value)) ? `<small class="amx-gh">${GH[i === 0 ? "org" : o.value] ?? ""}</small>` : ""}<button type="button" role="menuitem" data-v="${o.value}"><i>${ic}</i>${nm}<small>${VDESC[o.value] ?? ""}</small></button>`; }).join("");
  const vName = () => { const b = vp.querySelector<HTMLElement>(`[data-v="${vsel?.value}"]`); vp.querySelectorAll("[data-v]").forEach((x) => x.toggleAttribute("aria-current", x === b)); vb.textContent = "نما: " + (b ? b.childNodes[1].textContent!.trim() : "") + " ▾"; };
  vp.addEventListener("click", (e) => { const b = (e.target as HTMLElement).closest<HTMLElement>("[data-v]"); if (!b || !vsel) return; vsel.value = b.dataset.v!; vsel.dispatchEvent(new Event("change", { bubbles: true })); close(); vName(); });
  vsel?.addEventListener("change", vName); vName();

  // colour by
  let mode = "dept";
  const cp = tb.querySelector<HTMLElement>(".amx-cp")!, cb = tb.querySelector<HTMLButtonElement>(".amx-cb")!;
  cp.innerHTML = Object.entries(COLORS).map(([k, [n, d]]) => `<button type="button" role="menuitemradio" data-c="${k}"${k === mode ? ' aria-current="true"' : ""}><i>●</i>${n}<small>${d}</small></button>`).join("");
  const rerender = () => { const i = q<HTMLInputElement>("#mk-q"); i?.dispatchEvent(new Event("input", { bubbles: true })); };
  cp.addEventListener("click", (e) => { const b = (e.target as HTMLElement).closest<HTMLElement>("[data-c]"); if (!b) return; mode = b.dataset.c!; cp.querySelectorAll("[data-c]").forEach((x) => x.toggleAttribute("aria-current", x === b)); cb.textContent = "رنگ: " + COLORS[mode][0] + " ▾"; close(); rerender(); paint(); });
  const colourOf = (s: string): string | null => {
    const l = liveOf(s), a = orgA.get(s);
    if (mode === "status") return STC[l ? (STC[l.status] ? l.status : "idle") : "paused"];
    if (mode === "model") { const m = (l?.model ?? a?.m ?? "").toLowerCase(); return m.includes("opus") ? "hsl(265 60% 58%)" : m.includes("sonnet") ? "hsl(215 70% 52%)" : m.includes("haiku") ? "hsl(170 55% 38%)" : "hsl(220 8% 58%)"; }
    if (mode === "cost") { if (!l || !l.budgetMonthlyCents) return "hsl(220 8% 62%)"; const r = l.spentMonthlyCents / l.budgetMonthlyCents; return r >= 0.8 ? "hsl(22 90% 50%)" : r >= 0.5 ? "hsl(38 85% 55%)" : "hsl(220 8% 62%)"; }
    return null;
  };

  // problems: over budget or error — warm colour only there, with its action beside it
  const probs = live.filter((l) => l.status === "error" || overBudget(l.spentMonthlyCents, l.budgetMonthlyCents));
  const probOf = (s: string) => { const l = liveOf(s); if (!l) return null; if (l.status === "error") return "خطا در آخرین اجرا"; if (overBudget(l.spentMonthlyCents, l.budgetMonthlyCents)) return "بودجه " + fa(Math.round((100 * l.spentMonthlyCents) / l.budgetMonthlyCents)) + "٪"; return null; };
  const paint = () => {
    host.querySelectorAll<HTMLElement>("#mk-in [data-s]").forEach((c) => {
      const s = c.dataset.s ?? "", col = colourOf(s);
      if (col) { c.style.setProperty("--cc", col); c.querySelector<HTMLElement>(".am-av")?.style.setProperty("--cc", col); }
      if (!c.classList.contains("am-cd")) return;
      const p = probOf(s); c.classList.toggle("amx-prob", !!p);
      const f = c.querySelector(".amx-flag"); if (p && !f) c.insertAdjacentHTML("beforeend", `<span class="amx-flag"><span>${p}</span><u>بررسی</u></span>`); else if (!p && f) f.remove();
    });
    const n = host.querySelectorAll('#mk-leg button:not(.all)[aria-pressed="true"]').length, all = host.querySelectorAll("#mk-leg button:not(.all)").length;
    const nb = tb.querySelector(".amx-fb .n"); if (nb) nb.textContent = n === all ? "همه" : fa(n);
  };
  const inn = q("#mk-in"); const po = inn ? new MutationObserver(() => { po!.disconnect(); paint(); po!.observe(inn, { childList: true, subtree: true }); }) : null;
  po?.observe(inn!, { childList: true, subtree: true }); const lo = leg ? new MutationObserver(paint) : null; lo?.observe(leg!, { childList: true, subtree: true, attributes: true }); paint();

  // four numbers: needs you · working · paused · month cost
  const run = live.filter((l) => l.status === "running").length, paused = live.filter((l) => l.status === "paused").length;
  const spent = live.reduce((s, l) => s + l.spentMonthlyCents, 0), bud = live.reduce((s, l) => s + l.budgetMonthlyCents, 0), pct = bud ? Math.min(100, Math.round((100 * spent) / bud)) : 0;
  kp.innerHTML = `<span class="amx-pw" style="display:grid"><button type="button" class="need${probs.length ? " on" : ""}" aria-expanded="false"><b>${fa(probs.length)}</b><small>نیاز به تو</small></button><div class="amx-pop amx-np" hidden></div></span>
<div><b>${fa(run)}</b><small>در حال کار</small></div><div><b>${fa(paused)}</b><small>متوقف</small></div>
<div><b>${live.length ? usd(spent) : "—"}</b><small>هزینهٔ ماه${bud ? " از " + usd(bud) : ""}</small><span class="bar"><i class="${pct >= 80 ? "w" : ""}" style="width:${pct}%"></i></span></div>`;
  const np = kp.querySelector<HTMLElement>(".amx-np")!;
  np.innerHTML = probs.length ? probs.map((l) => `<button type="button" data-go="${l.orgId ?? l.id}"><i>⚠</i>${l.name}<small>${l.status === "error" ? "خطا در آخرین اجرا" : "بالای ۸۰٪ بودجهٔ ماه"}</small></button>`).join("") : `<span class="it">همه چیز آرام است.</span>`;
  np.addEventListener("click", (e) => { const b = (e.target as HTMLElement).closest<HTMLElement>("[data-go]"); if (!b) return; close(); const c = host.querySelector<HTMLElement>(`#mk-in [data-s="${b.dataset.go}"]`) ?? host.querySelector<HTMLElement>(`#mk-in [data-s="${(live.find((l) => l.orgId === b.dataset.go || l.id === b.dataset.go) ?? {}).id}"]`); if (c) { c.scrollIntoView({ block: "center", inline: "center" }); c.click(); } });

  // popovers: one open at a time, Esc and outside click close
  const pairs = Array.from(host.querySelectorAll<HTMLElement>(".amx-pw")).map((w) => [w.querySelector<HTMLElement>("button")!, w.querySelector<HTMLElement>(".amx-pop")!] as const);
  function close() { pairs.forEach(([b, p]) => { p.hidden = true; b.setAttribute("aria-expanded", "false"); }); }
  const place = (p: HTMLElement) => { p.style.right = ""; p.style.left = ""; const r = p.getBoundingClientRect(), w = document.documentElement.clientWidth;
    if (r.left < 4) { p.style.right = "auto"; p.style.left = "0"; } else if (r.right > w - 4) { p.style.left = "auto"; p.style.right = "0"; }
    const r2 = p.getBoundingClientRect(); if (r2.left < 4 || r2.right > w - 4) { p.style.position = "fixed"; p.style.left = "8px"; p.style.right = "8px"; p.style.top = Math.round(r2.top) + "px"; } else p.style.position = ""; };
  pairs.forEach(([b, p]) => b.addEventListener("click", (e) => { e.stopPropagation(); const o = p.hidden; close(); p.hidden = !o; b.setAttribute("aria-expanded", String(o)); if (o) place(p); }));
  const onDoc = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest?.(".amx-pw")) close(); };
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
  mp.addEventListener("click", (e) => { if ((e.target as HTMLElement).closest("button")) setTimeout(close, 0); });
  document.addEventListener("click", onDoc); document.addEventListener("keydown", onKey);
  // start readable (about 80%), centred on the board and CEO; ⤢ still fits the whole chart
  const zv = q("#mk-zv"), plus = q<HTMLButtonElement>('#mk-zm [data-z="+"]'), view = q<HTMLElement>("#mk-view");
  // the engine fits the whole chart 50 ms after start, so this runs after it
  const zt = setTimeout(() => {
    for (let i = 0; i < 12 && zv && plus && parseInt(zv.textContent || "100", 10) < 80; i++) plus.click();
    const top = q<HTMLElement>('#mk-in [data-s="board"]') ?? q<HTMLElement>("#mk-in [data-s]");
    if (view && top) { const v = view.getBoundingClientRect(), t = top.getBoundingClientRect(); view.scrollLeft += t.left + t.width / 2 - (v.left + v.width / 2); view.scrollTop = 0; }
  }, 150);
  return () => { clearTimeout(zt); po?.disconnect(); lo?.disconnect(); document.removeEventListener("click", onDoc); document.removeEventListener("keydown", onKey); };
}
