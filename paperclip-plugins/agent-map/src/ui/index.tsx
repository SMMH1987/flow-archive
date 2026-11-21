// v0.5.0 · 2026-11-21 17:55 Berlin. +step 0 intent brief (intake) before the planner; v0.4 run trace; v0.3 templates + scenario. Agent Map page: full engine (chart, mind map, list, workflows, instructions, guard, Ctrl+K)
// + dynamic case planner. Tasks are created only after the human ticks "approve" (action approvePlan).
import { useEffect, useMemo, useRef, useState } from "react";
import { useHostContext, usePluginAction, usePluginData, type PluginPageProps, type PluginSidebarProps } from "@paperclipai/plugin-sdk/ui";
import { mountEngine, type LiveAgent, type OrgPayload } from "./mount.js";
import type { Plan, CaseDef } from "../shared/planner.js";
import { scenario, MODEL_DEFAULT_USD } from "../shared/scenario.js";
import type { Template } from "../worker.js";
import type { Brief } from "../shared/intake.js";

function Planner({ companyId, cases }: { companyId: string; cases: Record<string, CaseDef> }) {
  const ids = Object.keys(cases);
  const [cid, setCid] = useState(ids[0] ?? "");
  const [ans, setAns] = useState<Record<string, string | number>>({});
  const [ok, setOk] = useState(false);
  const [opusOk, setOpusOk] = useState<string[]>([]);
  const [intake, setIntake] = useState<Record<string, string>>({});
  const [briefOk, setBriefOk] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const { data: brief } = usePluginData<Brief | null>("brief", { caseId: cid, intake, companyId });
  const [res, setRes] = useState<string>("");
  const c = cases[cid];
  const { data: plan } = usePluginData<Plan>("plan", { caseId: cid, answers: ans, opusOk });
  const approve = usePluginAction("approvePlan");
  const tpl = usePluginData<Template[]>("templates", { companyId });
  if (!c) return null;
  const hasIntake = !!c.intake?.questions?.length;
  const setI = (k: string, v: string) => { setBriefOk(false); setOk(false); setIntake((a) => ({ ...a, [k]: v })); };
  const set = (k: string, v: string) => { setOk(false); setAns((a) => ({ ...a, [k]: v === "" ? "" : isNaN(Number(v)) ? v : Number(v) })); };
  return (
    <section className="amx-pl" dir="rtl" style={{ padding: 16, display: "grid", gap: 10 }}>
      <h3 style={{ margin: 0 }}>برنامه‌ریز پرونده</h3>
      {(tpl.data ?? []).filter((t) => t.caseId === cid).length > 0 && <div className="amx-tpl" style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}><span className="am-muted">الگوهای موفق قبلی:</span>
        {(tpl.data ?? []).filter((t) => t.caseId === cid).slice(0, 5).map((t) => <button type="button" key={t.at} onClick={() => { setAns(t.answers as any); setOk(false); }}>{new Date(t.at).toLocaleDateString("fa-IR")} · {t.steps} قدم · {t.est_usd}$</button>)}</div>}
      <label>پرونده <select value={cid} onChange={(e) => { setCid(e.target.value); setAns({}); setIntake({}); setBriefOk(false); }}>{ids.map((i) => <option key={i} value={i}>{cases[i].name}</option>)}</select></label>
      {c.presets && <div className="amx-pre" style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}><span className="am-muted">پیش‌تنظیم:</span>
        {Object.entries(c.presets).map(([k, pr]) => <button type="button" key={k} data-preset={k} onClick={() => { setIntake({ ...(pr.intake ?? {}) }); setAns({ ...(pr.answers ?? {}) } as any); setBriefOk(false); setOk(false); }}>{pr.name}</button>)}</div>}
      {hasIntake && <div className="amx-in" style={{ display: "grid", gap: 6, border: "1px solid hsl(220 15% 85%)", borderRadius: 8, padding: 10 }}>
        <b>قدم ۰: روشن کردن نیت (ایجنت روشن‌کنندهٔ نیت)</b>
        <div className="am-muted">جواب خالی یا «پیش‌فرض» = پیش‌فرض و در خلاصه «فرض» علامت می‌خورد. جواب مبهم یک سؤال تکمیلی می‌گیرد (حداکثر {c.intake?.max_rounds ?? 3} دور).</div>
        {brief && <div className="amx-card" style={{ display: "grid", gap: 2, fontWeight: 600 }}>{brief.card.map((x) => <div key={x}>{x}</div>)}</div>}
        {brief && brief.nextAsk.length > 0 && <div className="amx-next" style={{ color: "#e8590c" }}>این نوبت فقط {brief.nextAsk.length} سؤال لازم است (حداکثر ۴)؛ بقیه با پیش‌فرض.</div>}
        <label className="am-muted"><input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> نمایش همهٔ {c.intake!.questions.length} سؤال بانک</label>
        {c.intake!.questions.filter((q) => showAll || !brief || brief.nextAsk.includes(q.id)).map((q) => { const l = brief?.lines.find((x) => x.id === q.id); return (
          <label key={q.id} data-q={q.id} style={{ display: "grid", fontSize: 13 }}>{q.q} <span className="am-muted">چرا: {q.why}{q.default ? ` · پیش‌فرض: ${q.default}` : " · پیش‌فرض ندارد"}</span>
            <span className="amx-sug" style={{ fontSize: 12 }}>پیشنهاد: {q.default || q.suggest || "—"} <span className="am-muted">· منبع: {q.src ?? "بدون منبع"}</span>{q.suggest && !q.default ? <button type="button" style={{ marginInlineStart: 6 }} onClick={() => setI(q.id, q.suggest!)}>قبول پیشنهاد</button> : null}</span>
            <input value={intake[q.id] ?? ""} placeholder={q.default ?? q.suggest ?? ""} onChange={(e) => setI(q.id, e.target.value)} />
            {l?.cite && <span className="amx-cite" style={{ color: "#2f9e44" }}>{l.a} · {l.cite}</span>}
            {l?.unclear && <span style={{ color: "#e8590c" }}>{l.unclear}</span>}{l?.source === "missing" && <span style={{ color: "#c92a2a" }}>بی‌جواب و بدون پیش‌فرض</span>}</label>); })}
        {brief && <pre className="amx-brief" style={{ whiteSpace: "pre-wrap", background: "hsl(220 20% 97%)", padding: 8, borderRadius: 6, margin: 0 }}>{brief.text}</pre>}
        <label><input type="checkbox" className="amx-brief-ok" checked={briefOk} disabled={!brief?.ready} onChange={(e) => setBriefOk(e.target.checked)} /> خلاصهٔ نیت را تأیید می‌کنم {brief && !brief.ready ? `(اول ${brief.missing.length} بی‌جواب و ${brief.unclear.length} مبهم را روشن کنید)` : ""}</label>
      </div>}
      {hasIntake && !briefOk ? <div className="am-muted amx-wait">برنامه بعد از تأیید خلاصهٔ نیت ساخته می‌شود.</div> : <>
      <div className="amx-q" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
        {(c.questionnaire ?? []).map((q) => (
          <label key={q.id} style={{ display: "grid", fontSize: 13 }}>{q.q}
            {q.options ? <select value={String(ans[q.id] ?? "")} onChange={(e) => set(q.id, e.target.value)}><option value="">—</option>{q.options.map((o) => <option key={o}>{o}</option>)}</select>
              : <input value={String(ans[q.id] ?? "")} placeholder={String(q.example ?? "")} onChange={(e) => set(q.id, e.target.value)} />}
          </label>))}
      </div>
      {plan && <div>
        <b>{plan.steps.length} قدم · {plan.gates} تأیید انسانی · برآورد {plan.est_usd}$ از سقف {plan.cap_usd}$</b>
        <ol style={{ margin: "6px 0" }}>{plan.steps.map((s) => <li key={s.id}>{s.gate ? "🔒 " : ""}{s.task} <span className="am-muted">← {s.agent} ({s.model}، مدل خود ایجنت) · سختی کار: {({ simple: "ساده", medium: "متوسط", hard: "سخت" } as any)[s.difficulty] ?? "نامعلوم"}</span></li>)}</ol>
        {plan.opus.length > 0 && <div className="amx-opus" style={{ border: "1px solid #e8590c", borderRadius: 6, padding: 8, display: "grid", gap: 4 }}>
          <b>درخواست Opus (جدا از برنامه؛ بدون تأیید شما این کارها با Sonnet اجرا می‌شوند)</b>
          {plan.opus.map((o) => <label key={o.id} data-opus={o.id}><input type="checkbox" checked={o.approved} onChange={(e) => { setOk(false); setOpusOk((x) => e.target.checked ? [...x, o.id] : x.filter((y) => y !== o.id)); }} /> {o.task} · دلیل: {o.why || "ثبت نشده"} · Sonnet {o.est_sonnet}$ ← Opus حدود {o.est_opus}$ (برآورد)</label>)}
        </div>}
        {plan.ask.map((a) => <div key={a.id} className="am-muted">? {a.id}: {a.why}</div>)}
        {plan.errors.map((e) => <div key={e} style={{ color: "hsl(0 65% 50%)" }}>خطا: {e}</div>)}
      </div>}
      <label><input type="checkbox" className="amx-plan-ok" checked={ok} onChange={(e) => setOk(e.target.checked)} disabled={plan?.status !== "needs_input:approve_plan"} /> این برنامه را تأیید می‌کنم؛ تسک‌ها در backlog ساخته شوند (هیچ ایجنتی خودکار شروع نمی‌کند)</label>
      <button type="button" disabled={!ok} onClick={async () => { try { const r: any = await approve({ companyId, caseId: cid, answers: ans, approved: true, intake, briefApproved: briefOk, opusOk }); tpl.refresh(); setRes(`${r.created.length} تسک ساخته شد و برنامه به‌عنوان الگو ذخیره شد${r.unmapped.length ? ` · بدون مسئول: ${r.unmapped.join("، ")}` : ""}`); setOk(false); } catch (e) { setRes(String((e as Error).message ?? e)); } }}>ساخت تسک‌ها</button>
      </>}
      {res && <div>{res}</div>}
    </section>
  );
}

function Scenario({ org, live }: { org: any; live: LiveAgent[] }) {
  const [off, setOff] = useState<Set<string>>(new Set());
  const [extra, setExtra] = useState<Record<string, { n: number; m: string }>>({});
  const lb = useMemo(() => Object.fromEntries(live.filter((l) => l.orgId).map((l) => [l.orgId as string, l.budgetMonthlyCents])), [live]);
  const r = scenario(org.org.agents, off, extra, lb);
  const now = scenario(org.org.agents, new Set(), {}, lb);
  return (
    <section className="amx-sc" dir="rtl" style={{ padding: 16, display: "grid", gap: 8 }}>
      <h3 style={{ margin: 0 }}>سناریو (پیش‌نویس سازمان)</h3>
      <div className="am-muted">دپارتمانی را خاموش کنید یا ایجنت فرضی اضافه کنید تا هزینهٔ ماهانه را قبل از تغییر واقعی ببینید. چیزی در Paperclip عوض نمی‌شود. هزینه: بودجهٔ واقعی Paperclip، وگرنه پیش‌فرض Opus {MODEL_DEFAULT_USD.opus}$، Sonnet {MODEL_DEFAULT_USD.sonnet}$، Haiku {MODEL_DEFAULT_USD.haiku}$ در ماه (فرض).</div>
      <table style={{ borderCollapse: "collapse", fontSize: 13 }}><thead><tr><th>دپارتمان</th><th>روشن</th><th>ایجنت فرضی (Haiku)</th><th>ایجنت</th><th>$/ماه</th></tr></thead><tbody>
        {org.org.order.map((k: string) => { const d = r.byDept[k]; return (<tr key={k} data-dept={k}><td>{org.org.cats[k][0]}</td>
          <td><input type="checkbox" checked={!off.has(k)} onChange={(e) => setOff((o) => { const n = new Set(o); e.target.checked ? n.delete(k) : n.add(k); return n; })} /></td>
          <td><input type="number" min={0} style={{ width: 56 }} value={extra[k]?.n ?? 0} onChange={(e) => setExtra((x) => ({ ...x, [k]: { n: Math.max(0, Number(e.target.value) || 0), m: "Haiku" } }))} /></td>
          <td>{d?.agents ?? 0}</td><td>{d?.usd ?? 0}</td></tr>); })}
      </tbody></table>
      <b className="amx-sc-sum">اکنون: {now.agents} ایجنت · {now.usd}$ در ماه ← سناریو: {r.agents} ایجنت · {r.usd}$ ({r.delta.usd >= 0 ? "+" : ""}{r.delta.usd}$)</b>
    </section>
  );
}

type Tr = { agentId: string; runs: number; failed: number; last: { status: string; at: string | null; error: string | null }[]; inTok: number; cachedTok: number; outTok: number; usd: number; models: string[]; lastError: string | null };
function Trace({ companyId, live, org }: { companyId: string; live: LiveAgent[]; org: any }) {
  const t = usePluginData<{ ok: boolean; reason?: string; traces: Record<string, Tr> }>("traces", { companyId });
  if (t.loading) return null;
  const nm = (id: string) => { const l = live.find((x) => x.id === id); const o = l?.orgId ? org.org.agents.find((a: any) => a.id === l.orgId) : null; return o?.n ?? l?.name ?? id; };
  const rows = Object.values(t.data?.traces ?? {}).sort((a, b) => b.usd - a.usd);
  const k = (x: number) => (x >= 1000 ? (x / 1000).toFixed(1) + "k" : String(x));
  return (
    <section className="amx-tr" dir="rtl" style={{ padding: 16, display: "grid", gap: 8 }}>
      <h3 style={{ margin: 0 }}>ردیابی اجرا (۳۰ روز اخیر)</h3>
      <div className="am-muted">فقط خواندنی: اجراها و هزینهٔ واقعی هر ایجنت از Paperclip. چیزی تغییر نمی‌کند.</div>
      {!t.data?.ok ? <div className="amx-tr-off">ردیابی در دسترس نیست: {t.data?.reason ?? t.error?.message}</div>
        : !rows.length ? <div>هنوز اجرایی ثبت نشده.</div>
        : <table style={{ borderCollapse: "collapse", fontSize: 13 }}><thead><tr><th>ایجنت</th><th>اجرا</th><th>خطا</th><th>توکن ورودی/کش/خروجی</th><th>$</th><th>مدل</th><th>آخرین اجراها</th><th>آخرین خطا</th></tr></thead><tbody>
          {rows.map((r) => <tr key={r.agentId} data-agent={r.agentId}><td>{nm(r.agentId)}</td><td>{r.runs}</td><td style={{ color: r.failed ? "#c92a2a" : undefined }}>{r.failed}</td><td>{k(r.inTok)} / {k(r.cachedTok)} / {k(r.outTok)}</td><td>{r.usd.toFixed(2)}</td><td>{r.models.join("، ")}</td>
            <td>{r.last.map((x, i) => <span key={i} title={(x.at ?? "") + " " + x.status} style={{ display: "inline-block", width: 10, height: 10, borderRadius: 5, margin: 1, background: /fail|error|timed_out|cancel/i.test(x.status) ? "#e03131" : /succe|done|complete/i.test(x.status) ? "#2f9e44" : "#adb5bd" }} />)}</td><td style={{ maxWidth: 260 }}>{r.lastError ?? "—"}</td></tr>)}
        </tbody></table>}
    </section>);
}

type RunStep = { id: string; identifier: string | null; title: string; status: string; agent: string | null; answer: { body: string; by: string; at: string; count: number } | null; older: { body: string; at: string }[]; hidden: number };
const ST: Record<string, [string, string]> = { backlog: ["در صف", "#868e96"], todo: ["آماده", "#1c7ed6"], in_progress: ["در حال کار", "#f08c00"], in_review: ["بازبینی", "#7048e8"], blocked: ["گیر کرده", "#e03131"], done: ["انجام شد", "#2f9e44"], cancelled: ["لغو", "#868e96"] };
function CaseRuns({ companyId }: { companyId: string }) {
  const r = usePluginData<{ cases: { id: string; identifier: string | null; title: string; status: string; steps: RunStep[] }[] }>("caseRuns", { companyId });
  const [open, setOpen] = useState<Record<string, boolean>>({});
  if (r.loading) return null;
  if (r.error) return <section className="amx-runs" dir="rtl" style={{ padding: 16 }}>پاسخ مراحل در دسترس نیست: {r.error.message}</section>;
  const cs = r.data?.cases ?? [];
  return (
    <section className="amx-runs" dir="rtl" style={{ padding: 16, display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}><h3 style={{ margin: 0 }}>پرونده‌ها: هر مرحله با پاسخش</h3><button type="button" className="amx-runs-rf" onClick={() => r.refresh()}>تازه‌سازی</button></div>
      <div className="am-muted">فقط خواندنی. آخرین خروجی هر مرحله باز است و نسخه‌های قبلی بسته. پیام‌های کوتاه (سؤال یا «گیر کردم») پنهان‌اند و فقط تعدادشان دیده می‌شود.</div>
      {!cs.length && <div className="am-muted">هنوز پرونده‌ای ساخته نشده.</div>}
      {cs.map((c) => (
        <div key={c.id} data-case={c.id} style={{ border: "1px solid hsl(220 15% 85%)", borderRadius: 8, padding: 8 }}>
          <b>{c.identifier ? c.identifier + " · " : ""}{c.title}</b> <span className="am-muted">· {c.steps.filter((s) => s.status === "done").length} از {c.steps.length} انجام شد</span>
          <div style={{ display: "grid", gap: 6, marginTop: 6 }}>
            {c.steps.map((s) => { const st = ST[s.status] ?? [s.status, "#868e96"]; const long = (s.answer?.body.length ?? 0) > 400; return (
              <div key={s.id} data-step={s.id} style={{ display: "grid", gridTemplateColumns: "minmax(180px, 1fr) 2fr", gap: 10, alignItems: "start", borderTop: "1px dashed hsl(220 15% 88%)", paddingTop: 6 }}>
                <div><div>{s.title}</div><span style={{ background: st[1], color: "#fff", borderRadius: 10, padding: "0 8px", fontSize: 12 }}>{st[0]}</span> <span className="am-muted" style={{ fontSize: 12 }}>{s.agent ?? "بدون مسئول"}{s.identifier ? " · " + s.identifier : ""}</span></div>
                <div className="amx-ans" style={{ fontSize: 13, whiteSpace: "pre-wrap" }}>{s.answer ? <>
                  <span className="am-muted" style={{ fontSize: 12 }}>{s.answer.by} · {s.answer.at ? new Date(s.answer.at).toLocaleString("fa-IR") : ""}{s.answer.count > 1 ? ` · ${s.answer.count} خروجی، آخری نشان داده شده` : ""}</span>{"\n"}
                  {long && !open[s.id] ? s.answer.body.slice(0, 400) + "…" : s.answer.body}
                  {long && <button type="button" onClick={() => setOpen((o) => ({ ...o, [s.id]: !o[s.id] }))} style={{ marginInlineStart: 6 }}>{open[s.id] ? "کمتر" : "بیشتر"}</button>}
                  {s.older.map((o, i) => <details key={i}><summary className="am-muted">نسخهٔ قبلی · {o.at ? new Date(o.at).toLocaleString("fa-IR") : ""}</summary>{o.body}</details>)}
                </> : <span className="am-muted">{s.status === "backlog" ? "هنوز اجرا نشده" : "خروجی متنی ثبت نشده"}</span>}
                {s.hidden > 0 && <div className="am-muted" style={{ fontSize: 12 }}>{s.hidden} پیام کوتاه دیگر پنهان است</div>}</div>
              </div>); })}
          </div>
        </div>))}
    </section>);
}

export function AgentMapPage(_props: PluginPageProps) {
  const host = useHostContext();
  const org = usePluginData<OrgPayload & { cases: Record<string, CaseDef> }>("org", {});
  const live = usePluginData<{ agents: LiveAgent[] }>("agents", { companyId: host.companyId ?? "" });
  const ref = useRef<HTMLDivElement>(null);
  const agents = useMemo(() => live.data?.agents ?? [], [live.data]);
  useEffect(() => {
    if (!ref.current || !org.data) return;
    return mountEngine(ref.current, org.data, agents, host.companyPrefix ?? "Paperclip");
  }, [org.data, agents, host.companyPrefix]);
  if (org.error) return <div dir="rtl">خطا: {org.error.message}</div>;
  return <div><div ref={ref}>{org.loading ? "در حال بارگذاری…" : null}</div>{host.companyId ? <CaseRuns companyId={host.companyId} /> : null}{org.data && host.companyId ? <Planner companyId={host.companyId} cases={org.data.cases} /> : null}{org.data ? <Scenario org={org.data} live={agents} /> : null}{org.data && host.companyId ? <Trace companyId={host.companyId} live={agents} org={org.data} /> : null}</div>;
}

export function AgentMapSidebarLink(_props: PluginSidebarProps) {
  const host = useHostContext();
  // Real server check 2026-11-21: the link did not show. Likely cause: companyPrefix is empty in the sidebar context, so we returned null.
  // Fall back to the first path segment of the current URL (e.g. /SMMA/...), and always render.
  const prefix = host.companyPrefix || (typeof window !== "undefined" ? window.location.pathname.split("/").filter(Boolean)[0] : "") || "";
  return <a href={prefix ? `/${prefix}/agent-map` : "agent-map"} className="amx-side" dir="rtl" style={{ display: "block", padding: "4px 8px", color: "inherit", textDecoration: "none" }}>🗺️ نقشهٔ ایجنت‌ها</a>;
}
