// v0.2.0 · 2026-11-21 17:20 Berlin. Agent Map page: full engine (chart, mind map, list, workflows, instructions, guard, Ctrl+K)
// + dynamic case planner. Tasks are created only after the human ticks "approve" (action approvePlan).
import { useEffect, useMemo, useRef, useState } from "react";
import { useHostContext, usePluginAction, usePluginData, type PluginPageProps, type PluginSidebarProps } from "@paperclipai/plugin-sdk/ui";
import { mountEngine, type LiveAgent, type OrgPayload } from "./mount.js";
import type { Plan, CaseDef } from "../shared/planner.js";

function Planner({ companyId, cases }: { companyId: string; cases: Record<string, CaseDef> }) {
  const ids = Object.keys(cases);
  const [cid, setCid] = useState(ids[0] ?? "");
  const [ans, setAns] = useState<Record<string, string | number>>({});
  const [ok, setOk] = useState(false);
  const [res, setRes] = useState<string>("");
  const c = cases[cid];
  const { data: plan } = usePluginData<Plan>("plan", { caseId: cid, answers: ans });
  const approve = usePluginAction("approvePlan");
  if (!c) return null;
  const set = (k: string, v: string) => { setOk(false); setAns((a) => ({ ...a, [k]: v === "" ? "" : isNaN(Number(v)) ? v : Number(v) })); };
  return (
    <section className="amx-pl" dir="rtl" style={{ padding: 16, display: "grid", gap: 10 }}>
      <h3 style={{ margin: 0 }}>برنامه‌ریز پرونده</h3>
      <label>پرونده <select value={cid} onChange={(e) => { setCid(e.target.value); setAns({}); }}>{ids.map((i) => <option key={i} value={i}>{cases[i].name}</option>)}</select></label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 8 }}>
        {(c.questionnaire ?? []).map((q) => (
          <label key={q.id} style={{ display: "grid", fontSize: 13 }}>{q.q}
            {q.options ? <select value={String(ans[q.id] ?? "")} onChange={(e) => set(q.id, e.target.value)}><option value="">—</option>{q.options.map((o) => <option key={o}>{o}</option>)}</select>
              : <input value={String(ans[q.id] ?? "")} placeholder={String(q.example ?? "")} onChange={(e) => set(q.id, e.target.value)} />}
          </label>))}
      </div>
      {plan && <div>
        <b>{plan.steps.length} قدم · {plan.gates} تأیید انسانی · برآورد {plan.est_usd}$ از سقف {plan.cap_usd}$</b>
        <ol style={{ margin: "6px 0" }}>{plan.steps.map((s) => <li key={s.id}>{s.gate ? "🔒 " : ""}{s.task} <span className="am-muted">← {s.agent} · {s.model}</span></li>)}</ol>
        {plan.ask.map((a) => <div key={a.id} className="am-muted">? {a.id}: {a.why}</div>)}
        {plan.errors.map((e) => <div key={e} style={{ color: "hsl(0 65% 50%)" }}>خطا: {e}</div>)}
      </div>}
      <label><input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} disabled={plan?.status !== "needs_input:approve_plan"} /> این برنامه را تأیید می‌کنم؛ تسک‌ها در backlog ساخته شوند (هیچ ایجنتی خودکار شروع نمی‌کند)</label>
      <button type="button" disabled={!ok} onClick={async () => { try { const r: any = await approve({ companyId, caseId: cid, answers: ans, approved: true }); setRes(`${r.created.length} تسک ساخته شد${r.unmapped.length ? ` · بدون مسئول: ${r.unmapped.join("، ")}` : ""}`); setOk(false); } catch (e) { setRes(String((e as Error).message ?? e)); } }}>ساخت تسک‌ها</button>
      {res && <div>{res}</div>}
    </section>
  );
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
  return <div><div ref={ref}>{org.loading ? "در حال بارگذاری…" : null}</div>{org.data && host.companyId ? <Planner companyId={host.companyId} cases={org.data.cases} /> : null}</div>;
}

export function AgentMapSidebarLink(_props: PluginSidebarProps) {
  const host = useHostContext();
  if (!host.companyPrefix) return null;
  return <a href={`/${host.companyPrefix}/agent-map`} dir="rtl" style={{ display: "block", padding: "4px 8px", color: "inherit", textDecoration: "none" }}>🗺️ نقشهٔ ایجنت‌ها</a>;
}
