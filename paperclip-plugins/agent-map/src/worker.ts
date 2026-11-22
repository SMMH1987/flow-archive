// v0.6.0 · 2026-11-22 07:10 Berlin. +auto status: a case step becomes done when its agent posted the answer (issues.update + events.subscribe, Siax «تایید» 06:47). v0.5.0 · 2026-11-21 17:55 Berlin. Agent Map worker. +0.5 step 0 intent brief (intake) before any plan; +0.4 run trace (off until DB permission); +0.3 plan templates.
// Reads live agents (agents.read). Serves our org chart, workflows and cases (bundled from flow-archive, see tools/sync_data.py).
// Creates tasks ONLY after a human approves a plan (issues.create), and only in "backlog" so no agent wakes up by itself.
import manifest from "./manifest.js";
import { definePlugin, runWorker } from "@paperclipai/plugin-sdk";
import { categorize, type CatKey } from "./shared/categories.js";
import { planCase, type Answers, type CaseDef, type Plan } from "./shared/planner.js";
import { aggregateTrace, RUNS_SQL, COSTS_SQL, type RunRow, type CostRow } from "./shared/trace.js";
import { buildBrief } from "./shared/intake.js";
import { autoStatus } from "./shared/autostatus.js";
import { buildInstructions, type OrgAgent } from "./shared/instructions.js";
import ORGDATA from "./generated/org.json" with { type: "json" };

export type MapAgent = {
  id: string; name: string; title: string | null; role: string; reportsTo: string | null;
  status: string; adapterType: string; model: string | null; skills: string[];
  spentMonthlyCents: number; budgetMonthlyCents: number; cat: CatKey; orgId: string | null;
};
export type Template = { caseId: string; name: string; answers: Answers; intake?: Record<string, unknown>; steps: number; gates: number; est_usd: number; parentId: string; at: string };
export type AgentMapData = { companyId: string; agents: MapAgent[]; loadedAt: string };
export type OrgData = { org: { cats: Record<string, [string, number]>; order: string[]; agents: OrgAgent[]; workflows: { n: string; s: string[][] }[] }; cases: Record<string, CaseDef> };

export const DATA = ORGDATA as unknown as OrgData;
const ORG_BY = new Map(DATA.org.agents.map((a) => [a.id, a]));
const ORG_IDS = new Set(DATA.org.agents.map((a) => a.id));
const ORG_MODEL: Record<string, string> = Object.fromEntries(DATA.org.agents.map((a: any) => [a.id, a.m ?? "Sonnet"]));

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

// The user's own past cases of this kind (plugin state only; reading Paperclip issues would need issues.read, not approved yet)
// Real test 2026-11-21: a saved template came back with broken encoding (mojibake). Hide such entries instead of showing them.
export const brokenText = (v: unknown) => { const t = JSON.stringify(v ?? ""); return /\uFFFD|Ã.|Ø[\u0080-\u00FF]|Ù[\u0080-\u00FF]|\?{3,}/.test(t) || /[\u00C0-\u00FF]{3,}/.test(t) || (t.match(/[\u0637\u0638\u06CC][\u00A0-\u00FF\u0152\u0153\u0192\u02C6\u06BE\u2013-\u2030\u2039\u203A\u20AC\u2122]/g) ?? []).length >= 3; }; // 0.10.2: UTF-8 read as cp1256, e.g. «ظˆظ‚طھ»
export const cleanTemplates = (t: Template[]) => t.filter((x) => x && typeof x.caseId === "string" && !brokenText(x));
async function pastCases(ctx: any, companyId: string, caseId: string) {
  if (!companyId) return [];
  const t = cleanTemplates(((await ctx.state.get({ scopeKind: "company", scopeId: companyId, stateKey: "templates" })) as Template[] | null) ?? []);
  return t.filter((x) => x.caseId === caseId && x.intake).slice(0, 3).map((x) => ({ at: x.at, intake: x.intake! }));
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
    // 0.7 (Siax 2026-11-21 18:37 UTC «تمام پاسخ های مراحل - کنار مراحل تولید بشه»): each case step with its status and the agent's latest answer beside it.
    // Read-only: issues.read + issue.comments.read.
    const SHORT_NOTE = 120; // shorter comments are questions or "blocked" notes: hidden, only counted
    ctx.data.register("caseRuns", async (params) => {
      const companyId = String((params as any)?.companyId ?? "");
      if (!companyId) return { cases: [] };
      const all = await ctx.issues.list({ companyId, limit: 500, offset: 0 });
      const parents = all.filter((i: any) => !i.parentId && String(i.title).startsWith("پرونده:"))
        .sort((a: any, b: any) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0, Number((params as any)?.limit ?? 5));
      const names = new Map((await liveAgents(ctx, companyId)).map((a) => [a.id, a.name]));
      const num = (t: string) => Number((/^(\d+)\./.exec(t) ?? [])[1] ?? 999);
      const cases = [];
      for (const p of parents as any[]) {
        const kids = all.filter((i: any) => i.parentId === p.id).sort((a: any, b: any) => num(a.title) - num(b.title));
        const steps = [];
        for (const k of kids as any[]) {
          const cs = (await ctx.issues.listComments(k.id, companyId)).filter((c: any) => c.body).reverse() // newest first; stable sort keeps this order for equal times
            .sort((a: any, b: any) => String(b.createdAt).localeCompare(String(a.createdAt)));
          const docs = cs.filter((c: any) => String(c.body).length >= SHORT_NOTE);
          const last: any = docs[0];
          steps.push({ id: k.id, identifier: k.identifier ?? null, title: k.title, status: k.status, agent: k.assigneeAgentId ? names.get(k.assigneeAgentId) ?? k.assigneeAgentId : null,
            answer: last ? { body: String(last.body).slice(0, 4000), by: last.authorAgentId ? names.get(last.authorAgentId) ?? "ایجنت" : "انسان", at: last.createdAt, count: docs.length } : null,
            older: docs.slice(1, 4).map((c: any) => ({ body: String(c.body).slice(0, 4000), at: c.createdAt })), hidden: cs.length - docs.length });
        }
        cases.push({ id: p.id, identifier: p.identifier ?? null, title: p.title, status: p.status, createdAt: p.createdAt, steps });
      }
      return { cases };
    });
    // 0.10 auto status (Siax «تایید» 2026-11-22 06:47 Berlin). The agents cannot set status (no Bash), so the plugin does it.
    // Only case steps, never 🔒 gates, only open → done. Each change is logged in plugin state (last 50) so it can be checked.
    const closeIfAnswered = async (issueId: string, companyId: string) => {
      const issue: any = await ctx.issues.get(issueId, companyId);
      if (!issue?.parentId) return null;
      const parent: any = await ctx.issues.get(issue.parentId, companyId);
      const d = autoStatus(issue, parent?.title ?? null, (await ctx.issues.listComments(issueId, companyId)) as any);
      if (d.status !== "done") return { issueId, changed: false, why: d.why };
      await ctx.issues.update(issueId, { status: "done" } as any, companyId);
      // 0.10.1: agents only have Read, so copy this answer into each step that waits on it
      try {
        const answer = String(d.answer ?? "").slice(0, 6000);
        const sibs: any[] = answer ? await ctx.issues.list({ companyId, limit: 500, offset: 0 }) : [];
        for (const k of sibs.filter((x) => x.parentId === issue.parentId && (x.blockedByIssueIds ?? x.blockedBy ?? []).map((y: any) => (typeof y === "string" ? y : y?.id)).includes(issueId))) {
          const tag = `\n\n--- خروجی تسک ${issue.identifier ?? issueId} ---\n`;
          if (!String(k.description ?? "").includes(tag)) await ctx.issues.update(k.id, { description: String(k.description ?? "") + tag + answer } as any, companyId);
        }
      } catch (err) { ctx.logger?.warn?.("answer copy failed", { issueId, err: (err as Error).message }); }
      const key = { scopeKind: "company" as const, scopeId: companyId, stateKey: "autoStatusLog" };
      const log = ((await ctx.state.get(key)) as any[] | null) ?? [];
      await ctx.state.set(key, [{ issueId, identifier: issue.identifier ?? null, from: issue.status, to: "done", at: new Date().toISOString() }, ...log].slice(0, 50));
      return { issueId, changed: true, why: d.why };
    };
    ctx.events.on("issue.comment.created", async (e) => {
      const p: any = e.payload ?? {};
      const issueId = String(p.issueId ?? p.comment?.issueId ?? (e.entityType === "issue" ? e.entityId : "") ?? "");
      if (!issueId || (e.actorType && e.actorType !== "agent")) return;
      try { await closeIfAnswered(issueId, e.companyId); } catch (err) { ctx.logger?.warn?.("auto status failed", { issueId, err: (err as Error).message }); }
    });
    // one button for steps that were answered before this version (e.g. SMMA-19..33)
    ctx.actions.register("syncStatus", async (params) => {
      const companyId = String(params?.companyId ?? "");
      if (!companyId) throw new Error("companyId لازم است");
      const all = await ctx.issues.list({ companyId, limit: 500, offset: 0 });
      const cases = new Set(all.filter((i: any) => !i.parentId && String(i.title).startsWith("پرونده:")).map((i: any) => i.id));
      const out = [];
      for (const k of all.filter((i: any) => cases.has(i.parentId))) out.push(await closeIfAnswered(k.id, companyId));
      return { checked: out.length, changed: out.filter((x) => x?.changed).length };
    });
    ctx.data.register("autoStatusLog", async (params) => ((await ctx.state.get({ scopeKind: "company", scopeId: String(params?.companyId ?? ""), stateKey: "autoStatusLog" })) as any[] | null) ?? []);
    // Step 0 (Siax rule 2026-11-21): intent brief from the case's fixed intake questions
    ctx.data.register("brief", async (params) => {
      const c = DATA.cases[String((params as any)?.caseId ?? "")];
      if (!c) return null;
      return buildBrief(c.intake, ((params as any)?.intake ?? {}) as Record<string, unknown>, c.name, await pastCases(ctx, String((params as any)?.companyId ?? ""), c.case));
    });
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
      return cleanTemplates(((await ctx.state.get({ scopeKind: "company", scopeId: companyId, stateKey: "templates" })) as Template[] | null) ?? []);
    });
    ctx.data.register("instructions", async (params) => {
      const a = ORG_BY.get(String(params?.agentId ?? ""));
      return a ? { agentId: a.id, text: buildInstructions(a, ORG_BY) } : { agentId: null, text: "" };
    });
    ctx.data.register("plan", async (params) => {
      const c = DATA.cases[String(params?.caseId ?? "")];
      if (!c) return { error: "پرونده پیدا نشد" };
      return planCase(c, (params?.answers ?? {}) as Answers, ORG_IDS, ((params as any)?.opusOk ?? []) as string[], ORG_MODEL);
    });
    // Human-approved plan -> tasks. Never runs without approved:true; refuses plans with errors or open questions.
    ctx.actions.register("approvePlan", async (params) => {
      const companyId = String(params?.companyId ?? "");
      const c = DATA.cases[String(params?.caseId ?? "")];
      if (!companyId || !c) throw new Error("companyId و caseId لازم است");
      if (params?.approved !== true) throw new Error("بدون تأیید انسان تسکی ساخته نمی‌شود");
      const brief = buildBrief(c.intake, (params?.intake ?? {}) as Record<string, unknown>, c.name, await pastCases(ctx, companyId, c.case));
      if (c.intake && params?.briefApproved !== true) throw new Error("اول خلاصهٔ نیت باید تأیید شود (قدم صفر)");
      if (c.intake && !brief.ready) throw new Error("خلاصهٔ نیت کامل نیست: " + [...brief.missing.map((m) => m + " بی‌جواب"), ...brief.unclear.map((u) => u + " مبهم")].join("، "));
      const plan: Plan = planCase(c, (params?.answers ?? {}) as Answers, ORG_IDS, (params?.opusOk ?? []) as string[], ORG_MODEL);
      if (plan.status !== "needs_input:approve_plan") throw new Error("برنامه آماده نیست: " + [...plan.errors, ...plan.ask.map((x) => x.why)].join("؛ "));
      const live = await liveAgents(ctx, companyId);
      const map = new Map<string, string>();
      for (const a of live) { const o = orgIdOf(a); if (o && !map.has(o)) map.set(o, a.id); }
      const parent = await ctx.issues.create({
        companyId, status: "backlog", title: `پرونده: ${c.name}`,
        description: `${c.intake ? brief.text + "\n\n(خلاصهٔ نیت با تیک انسان تأیید شد)\n\n" : ""}برنامهٔ تأییدشده (${plan.steps.length} قدم، ${plan.gates} تأیید انسانی، برآورد ${plan.est_usd}$ از سقف ${plan.cap_usd}$).\nپاسخ‌ها: ${JSON.stringify(plan.answers)}\nهمهٔ تسک‌ها در backlog ساخته شدند؛ هیچ ایجنتی خودکار شروع نمی‌کند.`,
      });
      const ids = new Map<string, string>(), created: { step: string; issueId: string; assigned: boolean }[] = [], unmapped: string[] = [];
      for (const s of plan.steps) {
        const agentId = map.get(s.agent);
        if (!agentId) unmapped.push(s.agent);
        const issue = await ctx.issues.create({
          companyId, parentId: parent.id, status: "backlog",
          title: `${s.n}. ${s.gate ? "🔒 " : ""}${s.task}`,
          description: `${s.after.length ? "ورودی‌های این کار (اول این‌ها را بخوان؛ خروجی هر کدام در توضیح/کامنت آخر همان تسک است):\n" + s.after.map((d) => { const p = plan.steps.find((x) => x.id === d); return `- تسک ${p?.n ?? "?"}. ${p?.task ?? d} (شناسه ${ids.get(d) ?? "?"})`; }).join("\n") + "\nخروجی خودت را در کامنت آخر همین تسک بنویس تا تسک بعدی آن را بخواند.\n\n" : "خروجی خودت را در کامنت آخر همین تسک بنویس تا تسک بعدی آن را بخواند.\n\n"}${c.intake ? "خلاصهٔ نیت پرونده:\n" + brief.text + "\n\n" : "خلاصهٔ نیت پرونده در تسک اصلی (والد) است.\n"}مسئول: ${ORG_BY.get(s.agent)?.n ?? s.agent} · مدل ایجنت: ${s.model} · سختی کار: ${s.difficulty} · حالت: ${s.mode}${s.gate ? "\nقبل از هر قدم بیرونی تأیید انسان لازم است." : ""}${agentId ? "" : "\nایجنت این نقش در Paperclip پیدا نشد؛ تسک بدون مسئول ماند."}`,
          ...(agentId ? { assigneeAgentId: agentId } : {}),
          blockedByIssueIds: s.after.map((d) => ids.get(d)).filter((x): x is string => !!x),
        });
        ids.set(s.id, issue.id); created.push({ step: s.id, issueId: issue.id, assigned: !!agentId });
      }
      const key = { scopeKind: "company" as const, scopeId: companyId, stateKey: "templates" };
      const old = cleanTemplates(((await ctx.state.get(key)) as Template[] | null) ?? []); // saving also drops broken entries
      const t: Template = { caseId: c.case, name: c.name, answers: plan.answers, intake: Object.fromEntries(brief.lines.filter((l) => l.a).map((l) => [l.id, l.a])), steps: plan.steps.length, gates: plan.gates, est_usd: plan.est_usd, parentId: parent.id, at: new Date().toISOString() };
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
