// v0.3.0 · 2026-11-21 18:25 Berlin
import { describe, expect, it } from "vitest";
import { createTestHarness } from "@paperclipai/plugin-sdk/testing";
import manifest from "../src/manifest.js";
import plugin, { DATA, orgIdOf } from "../src/worker.js";
import { categorize } from "../src/shared/categories.js";
import { evalWhen, planCase } from "../src/shared/planner.js";
import { buildInstructions } from "../src/shared/instructions.js";
import { buildBrief, unclearWhy } from "../src/shared/intake.js";
import { aggregateTrace, RUNS_SQL, COSTS_SQL } from "../src/shared/trace.js";
import { scenario, overBudget, monthlyUsd } from "../src/shared/scenario.js";

const IDS = new Set(DATA.org.agents.map((a) => a.id));
const hire = DATA.cases.hire;
const OKI = { intake: (hire as any).presets.ceo_assistant.intake, briefApproved: true };
const base = { companyId: "c1", urlKey: "", icon: null, status: "idle", capabilities: null, adapterType: "claude_local", runtimeConfig: {}, budgetMonthlyCents: 1000, spentMonthlyCents: 81, pauseReason: null, pausedAt: null, permissions: {}, lastHeartbeatAt: null, metadata: null, createdAt: new Date(), updatedAt: new Date() } as any;
async function boot(agents: any[] = [], extra: string[] = []) {
  // extra caps only let the TEST read back what was created; the plugin itself never gets them
  const harness = createTestHarness({ manifest, capabilities: [...manifest.capabilities, ...extra] as any });
  harness.seed({ agents } as any);
  await plugin.definition.setup(harness.ctx);
  return harness;
}

describe("manifest", () => {
  it("asks only for read + create-task + page/sidebar", () => {
    expect(manifest.capabilities).toEqual(["agents.read", "issues.create", "plugin.state.read", "plugin.state.write", "issues.read", "issue.comments.read", "ui.page.register", "ui.sidebar.register"]);
    expect(manifest.version).toBe("0.8.0");
  });
});

describe("org data (bundled from flow-archive)", () => {
  it("has 118 agents, 25 workflows, hire case", () => {
    expect(DATA.org.agents).toHaveLength(118);
    expect(DATA.org.workflows).toHaveLength(25);
    expect(hire.tasks).toHaveLength(17);
  });
  it("every workflow step and case task points to an existing agent", () => {
    for (const w of DATA.org.workflows) for (const s of w.s) expect(IDS.has(s[0]), `${w.n}: ${s[0]}`).toBe(true);
    for (const t of hire.tasks) expect(IDS.has(t.agent), t.id).toBe(true);
  });
  it("model rule (v1.9–v2.1): model from the agent (or task difficulty when no agent model); Opus only with reason + separate approval, else Sonnet", () => {
    const tasks = (DATA.cases.hire as any).tasks;
    expect(tasks.every((t: any) => ["simple", "medium", "hard"].includes(t.difficulty))).toBe(true);
    expect(tasks.some((t: any) => "m" in t)).toBe(false);
    const p = planCase({ ...(DATA.cases.hire as any), tasks: tasks.map((t: any) => t.id === "offer" ? { ...t, difficulty: "hard" } : t) }, { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes" }, IDS);
    expect(p.errors.join()).toMatch(/Opus بدون دلیل/);
    const q = planCase({ ...(DATA.cases.hire as any), tasks: tasks.map((t: any) => t.id === "offer" ? { ...t, difficulty: "hard", why_hard: "پیشنهاد مالی برگشت‌ناپذیر" } : t.id === "job_desc" ? { ...t, difficulty: undefined } : t) }, { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes" }, IDS);
    expect(q.steps.find((s) => s.id === "offer")!.model).toBe("Sonnet"); // hard without separate approval → Sonnet (DECISIONS v2.0)
    expect(q.opus).toMatchObject([{ id: "offer", why: "پیشنهاد مالی برگشت‌ناپذیر", approved: false }]);
    const tasks2 = tasks.map((t: any) => t.id === "offer" ? { ...t, difficulty: "hard", why_hard: "x" } : t);
    const r = planCase({ ...(DATA.cases.hire as any), tasks: tasks2 }, { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes" }, IDS, ["offer"]);
    expect(r.steps.find((s) => s.id === "offer")!.model).toBe("Opus");
    expect(r.est_usd).toBeGreaterThan(q.est_usd);
    expect(q.steps.find((s) => s.id === "job_desc")).toMatchObject({ difficulty: "unknown", model: "Sonnet" });
    expect(q.steps.find((s) => s.id === "cv_screen")!.model).toBe("Haiku");
  });
});

describe("planner = tools/plan_case.py", () => {
  it("Iran, mid, no paid ads: 15 steps, 4 gates, $0.45", () => {
    const p = planCase(hire, { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes" }, IDS);
    expect(p.status).toBe("needs_input:approve_plan");
    expect(p.steps.map((s) => s.id)).toEqual(["need_brief", "job_desc", "salary_check", "ir_labor_terms", "ad_text", "channel_scout", "ad_free_publish", "cv_screen", "tech_test", "interview", "military_check", "offer", "contract", "tamin_register", "onboarding"]);
    expect([p.gates, p.est_usd]).toEqual([4, 0.45]);
  });
  it("other country, senior, paid ads: 14 steps, 5 gates, $0.44", () => {
    const p = planCase(hire, { country: "other", seniority: "senior", ad_budget_toman: 5000000, gender_any: "no" }, IDS);
    expect(p.steps.map((s) => s.id)).toEqual(["need_brief", "job_desc", "salary_check", "ad_text", "channel_scout", "ad_free_publish", "ad_paid_publish", "referral", "cv_screen", "tech_test", "interview", "offer", "contract", "onboarding"]);
    expect([p.gates, p.est_usd]).toEqual([5, 0.44]);
  });
  it("missing answers -> needs_input with the same 4 questions", () => {
    const p = planCase(hire, { country: "IR" }, IDS);
    expect(p.status).toBe("needs_input");
    expect(p.ask.map((a) => a.id)).toEqual(["ad_paid_publish", "referral", "tech_test", "military_check"]);
  });
  it("budget cap breach and unknown agent are errors", () => {
    expect(planCase(hire, { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes", budget_cap_usd: 0.1 }, IDS).status).toBe("error");
    expect(planCase(hire, { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes" }, new Set(["h_hr"])).errors.length).toBeGreaterThan(0);
  });
  it("external task without gate is an error", () => {
    const bad = { ...hire, tasks: hire.tasks.map((t) => (t.id === "offer" ? { ...t, mode: "ask" as const } : t)) };
    expect(planCase(bad, { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes" }, IDS).errors).toContain("offer: کار بیرونی بدون gate");
  });
  it("condition language: and/or/not/compare, no eval", () => {
    expect(evalWhen("country == 'IR' and gender_any == 'yes'", { country: "IR", gender_any: "yes" })).toBe(true);
    expect(evalWhen("ad_budget_toman > 0 or seniority == 'senior'", { ad_budget_toman: 0, seniority: "mid" })).toBe(false);
    expect(evalWhen("not (x == 1)", { x: 2 })).toBe(true);
    expect(() => evalWhen("constructor.constructor('x')()", {})).toThrow();
  });
});

describe("instructions = tools/build_agent_instructions.py", () => {
  it("recruiter AGENTS.md matches the python output", async () => {
    const by = new Map(DATA.org.agents.map((a) => [a.id, a]));
    const fs = await import("node:fs");
    const py = fs.readFileSync(new URL("./fixtures/hr_recruiter-AGENTS.md", import.meta.url), "utf8");
    expect(buildInstructions(by.get("hr_recruiter")!, by)).toBe(py);
  });
});

describe("live agents", () => {
  it("categorize still works", () => {
    expect(categorize({ name: "CEO", title: "Chief Executive Officer", reportsTo: null })).toBe("lead");
    expect(categorize({ name: "x", title: "Security Engineer", reportsTo: "ceo" })).toBe("sec");
  });
  it("matches live agents to the org chart by metadata, id or Persian name", () => {
    expect(orgIdOf({ name: "x", title: null, metadata: { orgId: "hr_recruiter" } })).toBe("hr_recruiter");
    expect(orgIdOf({ name: "کارشناس جذب", title: null })).toBe("hr_recruiter");
    expect(orgIdOf({ name: "ceo", title: null })).toBe("ceo");
    expect(orgIdOf({ name: "random bot", title: "x" })).toBeNull();
  });
  it("returns live agents with orgId", async () => {
    const h = await boot([{ ...base, id: "a1", name: "مدیرعامل", role: "ceo", title: "Chief Executive Officer", reportsTo: null, adapterConfig: { model: "claude-opus-5-5" } }]);
    const d = await h.getData<any>("agents", { companyId: "c1" });
    expect(d.agents[0]).toMatchObject({ orgId: "ceo", model: "claude-opus-5-5", cat: "lead" });
    expect((await h.getData<any>("agents", {})).agents).toEqual([]);
  });
});

describe("approvePlan (creates tasks only after approval)", () => {
  const ans = { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes" };
  const live = [
    { ...base, id: "L1", name: "مدیر منابع انسانی", role: "manager", title: "", reportsTo: null, adapterConfig: {} },
    { ...base, id: "L2", name: "کارشناس جذب", role: "general", title: "", reportsTo: "L1", adapterConfig: {} },
  ];
  it("refuses without approved:true", async () => {
    const h = await boot(live);
    await expect(h.performAction("approvePlan", { companyId: "c1", caseId: "hire", answers: ans })).rejects.toThrow(/تأیید/);
  });
  it("refuses a plan with open questions", async () => {
    const h = await boot(live);
    await expect(h.performAction("approvePlan", { companyId: "c1", caseId: "hire", answers: { country: "IR" }, approved: true, ...OKI })).rejects.toThrow(/آماده نیست/);
  });
  it("creates 1 parent + 15 backlog tasks, links prerequisites, assigns matched agents", async () => {
    const h = await boot(live, ["issues.read", "issue.relations.read"]);
    const r = await h.performAction<any>("approvePlan", { companyId: "c1", caseId: "hire", answers: ans, approved: true, ...OKI });
    expect(r.created).toHaveLength(15);
    const issues = await h.ctx.issues.list({ companyId: "c1", limit: 100, offset: 0 } as any);
    expect(issues).toHaveLength(16);
    expect(issues.every((i: any) => i.status === "backlog")).toBe(true);
    const byTitle = (t: string) => issues.find((i: any) => i.title.includes(t))!;
    expect(byTitle("نوشتن شرح شغل").assigneeAgentId).toBe("L2");
    expect(byTitle("خلاصهٔ نیاز").assigneeAgentId).toBe("L1");
    expect(byTitle("🔒 قرارداد کار").title.startsWith("13.")).toBe(true);
    const job = r.created.find((c: any) => c.step === "job_desc"), ad = r.created.find((c: any) => c.step === "ad_text");
    expect(job.assigned).toBe(true);
    expect(r.unmapped).toContain("hr_ir_labor_docs");
    const adIssue: any = issues.find((i: any) => i.id === ad.issueId);
    expect(adIssue.parentId).toBe(r.parentId);
    const rel: any = await h.ctx.issues.relations.get(ad.issueId, "c1");
    const want = ["job_desc", "salary_check"].map((k) => r.created.find((c: any) => c.step === k).issueId).sort();
    expect(JSON.stringify(rel)).toContain(want[0]);
    expect(JSON.stringify(rel)).toContain(want[1]);
  });
});

describe("idea 5: saved plan templates", () => {
  it("approved plan is saved per company and listed, newest first", async () => {
    const live = [{ ...base, id: "L1", name: "مدیر منابع انسانی", role: "manager", title: "", reportsTo: null, adapterConfig: {} }];
    const h = await boot(live);
    expect(await h.getData<any[]>("templates", { companyId: "c1" })).toEqual([]);
    const a1 = { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes" }, a2 = { country: "other", seniority: "senior", ad_budget_toman: 5000000, gender_any: "no" };
    await h.performAction("approvePlan", { companyId: "c1", caseId: "hire", answers: a1, approved: true, ...OKI });
    await h.performAction("approvePlan", { companyId: "c1", caseId: "hire", answers: a2, approved: true, ...OKI });
    const t = await h.getData<any[]>("templates", { companyId: "c1" });
    expect(t.map((x) => [x.steps, x.gates, x.est_usd])).toEqual([[14, 5, 0.44], [15, 4, 0.45]]);
    expect(t[1].answers).toEqual(a1);
    expect(await h.getData<any[]>("templates", { companyId: "other" })).toEqual([]);
  });
});

describe("idea 1 + 4: scenario and budget alert", () => {
  const all = DATA.org.agents.map((a: any) => ({ id: a.id, k: a.k, m: a.m }));
  it("current org: 118 agents, cost from model defaults", () => {
    const r = scenario(all, new Set());
    expect(r.agents).toBe(118);
    expect(r.delta).toEqual({ agents: 0, usd: 0 });
    expect(monthlyUsd({ id: "x", k: "x", m: "Opus" })).toBe(20);
    expect(monthlyUsd({ id: "x", k: "x", m: "Haiku" }, 250)).toBe(2.5);
  });
  it("switching a department off and adding 3 Haiku agents changes count and cost exactly", () => {
    const hr = all.filter((a) => a.k === "hr"), hrUsd = hr.reduce((s, a) => s + monthlyUsd(a), 0);
    const r = scenario(all, new Set(["hr"]), { marketing: { n: 3, m: "Haiku" } });
    expect(r.agents).toBe(118 - hr.length + 3);
    expect(r.delta.usd).toBeCloseTo(-hrUsd + 3, 2);
    expect(r.byDept.hr).toBeUndefined();
  });
  it("live budget overrides the model default", () => {
    expect(scenario([{ id: "ceo", k: "exec", m: "Opus" }], new Set(), {}, { ceo: 500 }).usd).toBe(5);
  });
  it("budget alert at 80%", () => {
    expect(overBudget(400, 500)).toBe(true);
    expect(overBudget(399, 500)).toBe(false);
    expect(overBudget(10, 0)).toBe(false);
  });
});

describe("idea 2: run trace (read-only)", () => {
  it("aggregates runs and costs per agent, newest first, keeps last 5", () => {
    const runs = [1, 2, 3, 4, 5, 6].map((i) => ({ agent_id: "A", status: i === 6 ? "failed" : "succeeded", started_at: `2026-11-2${i}T10:00:00Z`, finished_at: null, error: i === 6 ? "timeout" : null, issue_id: null }));
    const costs = [{ agent_id: "A", input_tokens: "1000", cached_input_tokens: 500, output_tokens: 200, cost_cents: 81, model: "claude-opus-5-5" }, { agent_id: "B", input_tokens: 10, cached_input_tokens: 0, output_tokens: 5, cost_cents: "0.5", model: "claude-haiku-5-5" }];
    const t = aggregateTrace(runs, costs);
    expect(t.A).toMatchObject({ runs: 6, failed: 1, inTok: 1000, cachedTok: 500, outTok: 200, usd: 0.81, lastError: "timeout" });
    expect(t.A.last.length).toBe(5); expect(t.A.last[0].status).toBe("failed");
    expect(t.B.usd).toBe(0.01); expect(t.B.runs).toBe(0);
  });
  it("queries only read-only SELECTs on the two whitelisted tables", async () => {
    for (const q of [RUNS_SQL, COSTS_SQL]) { expect(q.startsWith("SELECT")).toBe(true); expect(/insert|update|delete|drop/i.test(q)).toBe(false); }
    expect((manifest as any).database).toBeUndefined();
    const h = await boot();
    const r: any = await h.getData("traces", { companyId: "c1" });
    expect(r.ok).toBe(false); expect(h.dbQueries.length).toBe(0);
  });
  it("reports unavailable instead of crashing when the database read fails", async () => {
    const h = await boot();
    const r: any = await h.getData("traces", { companyId: "c1" });
    expect(r.reason).toContain("database.namespace.read");
  });
});

describe("step 0: intent brief before any plan (Siax rule 2026-11-21)", () => {
  const live = [{ ...base, id: "L1", name: "مدیر منابع انسانی", role: "manager", title: "", reportsTo: null, adapterConfig: {} }];
  const ans = { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes" };
  it("hire case has 17 intake questions, each with a why", () => {
    const q = (hire as any).intake.questions;
    expect(q).toHaveLength(17);
    expect(q.every((x: any) => x.why && x.src)).toBe(true);
    expect(q.every((x: any) => x.default || x.suggest)).toBe(true);
  });
  it("empty answers use the default and are marked as assumptions; no default = missing", () => {
    const b = buildBrief((hire as any).intake, {}, "x");
    expect(b.ready).toBe(false);
    expect(b.missing).toEqual(["why_now", "success_check", "daily_tasks", "must_skills", "pay_range"]);
    expect(b.assumptions.length).toBe(12);
  });
  it("vague answers are flagged for a follow-up question", () => {
    expect(unclearWhy("نمی‌دانم")).toBeTruthy(); expect(unclearWhy("شاید تهران؟")).toBeTruthy(); expect(unclearWhy("تهران")).toBeNull();
    const b = buildBrief((hire as any).intake, { ...OKI.intake, work_mode: "?" }, "x");
    expect(b.unclear).toEqual(["work_mode"]); expect(b.ready).toBe(false);
  });
  it("CEO-assistant preset gives a complete brief", async () => {
    const h = await boot();
    const b: any = await h.getData("brief", { caseId: "hire", intake: OKI.intake });
    expect(b.ready).toBe(true); expect(b.text).toContain("وقت مدیرعامل");
  });
  it("planner refuses without an approved brief, and with an incomplete one", async () => {
    const h = await boot(live);
    await expect(h.performAction("approvePlan", { companyId: "c1", caseId: "hire", answers: ans, approved: true, intake: OKI.intake })).rejects.toThrow(/خلاصهٔ نیت/);
    await expect(h.performAction("approvePlan", { companyId: "c1", caseId: "hire", answers: ans, approved: true, intake: {}, briefApproved: true })).rejects.toThrow(/کامل نیست/);
  });
  it("approved brief is written into the case's parent task", async () => {
    const h = await boot(live, ["issues.read"]);
    await h.performAction("approvePlan", { companyId: "c1", caseId: "hire", answers: ans, approved: true, ...OKI });
    const iss = await h.ctx.issues.list({ companyId: "c1", limit: 100, offset: 0 } as any);
    const parent = iss.find((i: any) => i.title.startsWith("پرونده"))!;
    expect(parent.description).toContain("خلاصهٔ نیت"); expect(parent.description).toContain("گزارش هفتگی فروش");
  });
});

import CASES from "./fixtures/intake-cases.json" with { type: "json" };
describe("step 0: ambiguity test set (fixtures/intake-cases.json)", () => {
  for (const tc of (CASES as any).cases) it(tc.name, () => {
    const base = tc.base === "preset" ? (hire as any).presets.ceo_assistant.intake : {};
    const b = buildBrief((hire as any).intake, { ...base, ...tc.patch }, "x");
    expect(b.missing).toEqual(tc.missing); expect(b.unclear).toEqual(tc.unclear); expect(b.ready).toBe(tc.ready);
    if (tc.nextAskLen) expect(b.nextAsk).toHaveLength(tc.nextAskLen);
    expect(b.card).toHaveLength(4);
  });
});

describe("step 0: suggestions from the user's own past cases first", () => {
  const q = (hire as any).intake;
  it("past answer is used and cited instead of asking; two disagreeing past cases trigger a question", () => {
    const b = buildBrief(q, {}, "x", [{ at: "2026-11-20T10:00:00Z", intake: { why_now: "کمبود وقت مدیرعامل" } }]);
    const l = b.lines.find((x) => x.id === "why_now")!;
    expect(l).toMatchObject({ source: "past", a: "کمبود وقت مدیرعامل", cite: "از پروندهٔ 2026-11-20" });
    expect(b.missing).not.toContain("why_now");
    const c = buildBrief(q, {}, "x", [{ at: "2026-11-20", intake: { work_mode: "تهران" } }, { at: "2026-11-19", intake: { work_mode: "دورکار" } }]);
    expect(c.unclear).toContain("work_mode");
  });
  it("an approved case stores its intake and the next brief reuses it", async () => {
    const live = [{ ...base, id: "L1", name: "مدیر منابع انسانی", role: "manager", title: "", reportsTo: null, adapterConfig: {} }];
    const h = await boot(live);
    await h.performAction("approvePlan", { companyId: "c1", caseId: "hire", answers: { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes" }, approved: true, ...OKI });
    const b: any = await h.getData("brief", { caseId: "hire", intake: {}, companyId: "c1" });
    expect(b.ready).toBe(true);
    expect(b.lines.find((x: any) => x.id === "why_now").cite).toMatch(/^از پروندهٔ /);
  });
});

describe("data hygiene", () => {
  it("every agent responsibility, rule, input, output, skill and source is plain text (no [object Object])", () => {
    const bad: string[] = [];
    for (const a of DATA.org.agents as any[]) for (const f of ["tasks", "rules", "inputs", "outputs", "skills", "sources"]) (a[f] ?? []).forEach((v: unknown, i: number) => { if (typeof v !== "string") bad.push(`${a.id}.${f}[${i}]`); });
    expect(bad).toEqual([]);
    expect(buildInstructions((DATA.org.agents as any[]).find((a) => a.id === "intake_clarifier"), new Map((DATA.org.agents as any[]).map((a) => [a.id, a])))).not.toContain("[object Object]");
  });
});

describe("real hire test fixes (2026-11-21)", () => {
  const live = [{ ...base, id: "L1", name: "مدیر منابع انسانی", role: "manager", title: "", reportsTo: null, adapterConfig: {} }];
  const ans = { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes" };
  it("each subtask names its prerequisite tasks and asks for output in the last comment", async () => {
    const h = await boot(live, ["issues.read"]);
    await h.performAction("approvePlan", { companyId: "c1", caseId: "hire", answers: ans, approved: true, ...OKI });
    const iss = await h.ctx.issues.list({ companyId: "c1", limit: 100, offset: 0 } as any);
    const ad = iss.find((i: any) => i.title.includes("متن آگهی"))!;
    expect(ad.description).toContain("نوشتن شرح شغل"); expect(ad.description).toContain("کامنت آخر");
    const jd = iss.find((i: any) => i.title.includes("نوشتن شرح شغل"))!;
    expect(ad.description).toContain(jd.id);
  });
  it("templates with broken encoding are hidden", async () => {
    const h = await boot();
    await h.ctx.state.set({ scopeKind: "company", scopeId: "c1", stateKey: "templates" }, [{ caseId: "hire", name: "Ø§Ø³ØªØ®Ø¯Ø§Ù…", answers: {}, steps: 15, gates: 4, est_usd: 0.45, parentId: "p", at: "2026-11-21" }, { caseId: "hire", name: "استخدام یک نفر", answers: {}, steps: 15, gates: 4, est_usd: 0.45, parentId: "q", at: "2026-11-21" }]);
    const t: any = await h.getData("templates", { companyId: "c1" });
    expect(t.map((x: any) => x.parentId)).toEqual(["q"]);
  });
  it("the intent card never cites a broken past case (also ??? text)", async () => {
    const h = await boot();
    await h.ctx.state.set({ scopeKind: "company", scopeId: "c1", stateKey: "templates" }, [{ caseId: "hire", name: "x", intake: { why_now: "Ø¯Ø³ØªÛŒØ§Ø±" }, answers: {}, steps: 1, gates: 0, est_usd: 0, parentId: "a", at: "2026-11-21" }, { caseId: "hire", name: "y", intake: { work_mode: "?????" }, answers: {}, steps: 1, gates: 0, est_usd: 0, parentId: "b", at: "2026-11-21" }]);
    const b: any = await h.getData("brief", { caseId: "hire", intake: {}, companyId: "c1" });
    expect(b.lines.some((l: any) => l.source === "past")).toBe(false);
  });
});

describe("0.7: case steps with their answers (read-only)", () => {
  const live = [{ ...base, id: "L1", name: "مدیر منابع انسانی", role: "manager", title: "", reportsTo: null, adapterConfig: {} }, { ...base, id: "L2", name: "کارشناس جذب", role: "general", title: "", reportsTo: "L1", adapterConfig: {} }];
  it("lists each step in order with status and the latest comment beside it", async () => {
    const h = await boot(live, ["issue.comments.create", "issues.update"]);
    await h.performAction("approvePlan", { companyId: "c1", caseId: "hire", answers: { country: "IR", seniority: "mid", ad_budget_toman: 0, gender_any: "yes" }, approved: true, ...OKI });
    const iss = await h.ctx.issues.list({ companyId: "c1", limit: 100, offset: 0 } as any);
    const jd = iss.find((i: any) => i.title.includes("نوشتن شرح شغل"))!;
    const long = (t: string) => t + " " + "متن کامل خروجی ایجنت. ".repeat(8);
    await h.ctx.issues.createComment(jd.id, long("پیش‌نویس اول"), "c1");
    await h.ctx.issues.createComment(jd.id, "سؤال کوتاه: عنوان دقیق؟", "c1");
    await h.ctx.issues.createComment(jd.id, long("شرح شغل نهایی: دستیار مدیرعامل…"), "c1");
    await h.ctx.issues.update(jd.id, { status: "done" } as any, "c1");
    const r: any = await h.getData("caseRuns", { companyId: "c1" });
    expect(r.cases).toHaveLength(1);
    const steps = r.cases[0].steps;
    expect(steps).toHaveLength(15);
    expect(steps.map((s: any) => parseInt(s.title))).toEqual([...Array(15)].map((_, i) => i + 1));
    const s2 = steps.find((s: any) => s.id === jd.id);
    expect(s2).toMatchObject({ status: "done", agent: "کارشناس جذب" });
    expect(s2.answer.body.startsWith("شرح شغل نهایی")).toBe(true);
    expect(s2.answer.count).toBe(2); expect(s2.older[0].body.startsWith("پیش‌نویس اول")).toBe(true); expect(s2.hidden).toBe(1);
    expect(steps.filter((s: any) => s.answer).length).toBe(1);
  });
  it("only reads (no create/update capability added for this)", () => {
    expect(manifest.capabilities.filter((c) => /update|write|comments.create/.test(c))).toEqual(["plugin.state.write"]);
  });
});
