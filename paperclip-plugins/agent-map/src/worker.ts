// v0.4.1 · 2026-11-21 17:35 Berlin. Agent Map worker. +0.3 plan templates; +0.4 run trace (read-only).
// Reads live agents (agents.read). Serves our org chart, workflows and cases (bundled from flow-archive, see tools/sync_data.py).
// Creates tasks ONLY after a human approves a plan (issues.create), and only in "backlog" so no agent wakes up by itself.
import manifest from "./manifest.js";
import { definePlugin, runWorker } from "@paperclipai/plugin-sdk";
import { categorize, type CatKey } from "./shared/categories.js";
import { planCase, type Answers, type CaseDef, type Plan } from "./shared/planner.js";
import { aggregateTrace, RUNS_SQL, COSTS_SQL, type RunRow, type CostRow } from "./shared/trace.js";
import { buildInstructions, type OrgAgent } from "./shared/instructions.js";
import ORGDATA from "./generated/org.json" with { type: "json" };

export type MapAgent = {
  id: string; name: string; title: string | null; role: string; reportsTo: string | null;
  status: string; adapterType: string; model: string | null; skills: string[];
  spentMonthlyCents: number; budgetMonthlyCents: number; cat: CatKey; orgId: string | null;
};
export type Template = { caseId: string; name: string; answers: Answers; steps: number; gates: number; est_usd: number; parentId: string; at: string };
export type AgentMapData = { companyId: string; agents: MapAgent[]; loadedAt: string };
export type OrgData = { org: { cats: Record<string, [string, number]>; order: string[]; agents: OrgAgent[]; workflows: { n: string; s: string[][] }[] }; cases: Record<string, CaseDef> };

export const DATA = ORGDATA as unknown as OrgData;
const ORG_BY = new Map(DATA.org.agents.map((a) => [a.id, a]));
const ORG_IDS = new Set(DATA.org.agents.map((a) => a.id));

function modelOf(cfg: Record<string, unknown> | null | undefined): string | null {
  const m = cfg && (cfg["model"] ?? cfg["modelId"]);
  return typeof m === "string" && m ? m : null;
}
function skillsOf(cfg: Record<string, unknown> | null | undefined): string[] {
  const sync = cfg && (cfg["paperclipSkillSync"] as { desiredSkills?: unknown } | undefined);
  const list = sync && Array.isArray(sync.desiredSkills) ? sync.desiredSkills : [];
  return list.filter((x): x is string => typeof x === "string");
}
const norm = (s: unknown) => String(s ?? "").trim().toLowerCase();
/** Which org-chart agent a live Paperclip agent is: metadata.orgId first, then exact id / Persian name / English title. */
export function orgIdOf(a: { name: string; title: string | null; metadata?: Record<string, unknown> | null }): string | null {
  const m = a.metadata && a.metadata["orgId"];
  if (typeof m === "string" && ORG_IDS.has(m)) return m;
  const n = norm(a.name), t = norm(a.title);
  for (const o of DATA.org.agents) {
    if (n === norm(o.id) || n === norm(o.n) || (t && t === norm(o.t))) return o.id;
  }
  return null;
}
async function liveAgents(ctx: any, companyId: string) {
  const all: any[] = [];
  for (let offset = 0; offset < 5000; offset += 200) {
    const page = await ctx.agents.list({ companyId, limit: 200, offset });
    all.push(...page);
    if (page.length < 200) break;
  }
  return all.filter((a) => a.status !== "terminated");
}

const plugin = definePlugin({
  async setup(ctx) {
    ctx.data.register("agents", async (params) => {
      const companyId = typeof params?.companyId === "string" ? params.companyId : "";
      if (!companyId) return { companyId: "", agents: [], loadedAt: new Date().toISOString() } satisfies AgentMapData;
      const agents: MapAgent[] = (await liveAgents(ctx, companyId)).map((a) => ({
        id: a.id, name: a.name, title: a.title, role: String(a.role), reportsTo: a.reportsTo,
        status: String(a.status), adapterType: String(a.adapterType),
        model: modelOf(a.adapterConfig), skills: skillsOf(a.adapterConfig),
        spentMonthlyCents: a.spentMonthlyCents ?? 0, budgetMonthlyCents: a.budgetMonthlyCents ?? 0,
        cat: categorize({ name: a.name, title: a.title, role: String(a.role), reportsTo: a.reportsTo }),
        orgId: orgIdOf(a),
      }));
      return { companyId, agents, loadedAt: new Date().toISOString() } satisfies AgentMapData;
    });
    ctx.data.register("org", async () => DATA);
    // Idea 2 (Siax approved 2026-11-21 16:11 UTC): read-only run trace from heartbeat_runs + cost_events, last 30 days
    ctx.data.register("traces", async (params) => {
      const companyId = String((params as any)?.companyId ?? "");
      if (!companyId) return { ok: false, reason: "no company", traces: {} };
      if (!(manifest.capabilities as string[]).includes("database.namespace.read")) return { ok: false, reason: "نیاز به اجازهٔ خواندن پایگاه‌داده (database.namespace.read + migrate) که هنوز تأیید نشده", traces: {} };
      try {
        const [runs, costs] = await Promise.all([ctx.db.query<RunRow>(RUNS_SQL, [companyId]), ctx.db.query<CostRow>(COSTS_SQL, [companyId])]);
        return { ok: true, traces: aggregateTrace(runs, costs) };
      } catch (e) { return { ok: false, reason: (e as Error).message, traces: {} }; }
    });
    // idea 5: approved plans are saved per company and can be reused without planning again
    ctx.data.register("templates", async (params) => {
      const companyId = String(params?.companyId ?? "");
      if (!companyId) return [];
      return ((await ctx.state.get({ scopeKind: "company", scopeId: companyId, stateKey: "templates" })) as Template[] | null) ?? [];
    });
    ctx.data.register("instructions", async (params) => {
      const a = ORG_BY.get(String(params?.agentId ?? ""));
      return a ? { agentId: a.id, text: buildInstructions(a, ORG_BY) } : { agentId: null, text: "" };
    });
    ctx.data.register("plan", async (params) => {
      const c = DATA.cases[String(params?.caseId ?? "")];
      if (!c) return { error: "پرونده پیدا نشد" };
      return planCase(c, (params?.answers ?? {}) as Answers, ORG_IDS);
    });
    // Human-approved plan -> tasks. Never runs without approved:true; refuses plans with errors or open questions.
    ctx.actions.register("approvePlan", async (params) => {
      const companyId = String(params?.companyId ?? "");
      const c = DATA.cases[String(params?.caseId ?? "")];
      if (!companyId || !c) throw new Error("companyId و caseId لازم است");
      if (params?.approved !== true) throw new Error("بدون تأیید انسان تسکی ساخته نمی‌شود");
      const plan: Plan = planCase(c, (params?.answers ?? {}) as Answers, ORG_IDS);
      if (plan.status !== "needs_input:approve_plan") throw new Error("برنامه آماده نیست: " + [...plan.errors, ...plan.ask.map((x) => x.why)].join("؛ "));
      const live = await liveAgents(ctx, companyId);
      const map = new Map<string, string>();
      for (const a of live) { const o = orgIdOf(a); if (o && !map.has(o)) map.set(o, a.id); }
      const parent = await ctx.issues.create({
        companyId, status: "backlog", title: `پرونده: ${c.name}`,
        description: `برنامهٔ تأییدشده (${plan.steps.length} قدم، ${plan.gates} تأیید انسانی، برآورد ${plan.est_usd}$ از سقف ${plan.cap_usd}$).\nپاسخ‌ها: ${JSON.stringify(plan.answers)}\nهمهٔ تسک‌ها در backlog ساخته شدند؛ هیچ ایجنتی خودکار شروع نمی‌کند.`,
      });
      const ids = new Map<string, string>(), created: { step: string; issueId: string; assigned: boolean }[] = [], unmapped: string[] = [];
      for (const s of plan.steps) {
        const agentId = map.get(s.agent);
        if (!agentId) unmapped.push(s.agent);
        const issue = await ctx.issues.create({
          companyId, parentId: parent.id, status: "backlog",
          title: `${s.n}. ${s.gate ? "🔒 " : ""}${s.task}`,
          description: `مسئول: ${ORG_BY.get(s.agent)?.n ?? s.agent} · مدل: ${s.model} · حالت: ${s.mode}${s.gate ? "\nقبل از هر قدم بیرونی تأیید انسان لازم است." : ""}${agentId ? "" : "\nایجنت این نقش در Paperclip پیدا نشد؛ تسک بدون مسئول ماند."}`,
          ...(agentId ? { assigneeAgentId: agentId } : {}),
          blockedByIssueIds: s.after.map((d) => ids.get(d)).filter((x): x is string => !!x),
        });
        ids.set(s.id, issue.id); created.push({ step: s.id, issueId: issue.id, assigned: !!agentId });
      }
      const key = { scopeKind: "company" as const, scopeId: companyId, stateKey: "templates" };
      const old = ((await ctx.state.get(key)) as Template[] | null) ?? [];
      const t: Template = { caseId: c.case, name: c.name, answers: plan.answers, steps: plan.steps.length, gates: plan.gates, est_usd: plan.est_usd, parentId: parent.id, at: new Date().toISOString() };
      await ctx.state.set(key, [t, ...old].slice(0, 20));
      return { parentId: parent.id, created, unmapped: [...new Set(unmapped)], plan, template: t };
    });
  },
  async onHealth() {
    return { status: "ok", message: `Agent Map worker: ${DATA.org.agents.length} org agents, ${Object.keys(DATA.cases).length} cases` };
  },
});

export default plugin;
runWorker(plugin, import.meta.url);
