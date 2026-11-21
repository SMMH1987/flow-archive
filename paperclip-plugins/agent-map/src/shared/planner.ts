// v1 · 2026-11-21 17:10 Berlin. Port of flow-archive tools/plan_case.py (same rules, same results; see tests).
// Dry planner: picks only the case's allowed tasks, orders them by prerequisites, checks owner/gate/budget.
export type CaseTask = { id: string; n: string; agent: string; mode: "auto" | "ask" | "gate"; m?: string; difficulty?: "simple" | "medium" | "hard"; why_hard?: string; est: number; after: string[]; when?: string; external?: string | boolean };
export type CaseDef = { intake?: import("./intake.js").IntakeDef; presets?: Record<string, { name: string; intake?: Record<string, string>; answers?: Record<string, string | number> }>; case: string; name: string; owner?: string; budget_cap_usd?: number; questionnaire?: { id: string; q: string; options?: string[]; example?: unknown }[]; tasks: CaseTask[] };
export type Answers = Record<string, string | number | boolean>;
// v0.6.0 · 2026-11-21 18:50 Berlin: model per task from its difficulty (Siax rule 17:43 Berlin, DECISIONS v1.9), not from the agent role; unknown → Sonnet, said in the plan.
export const MODEL_BY_DIFF: Record<string, string> = { simple: "Haiku", medium: "Sonnet", hard: "Opus" };
export type PlanStep = { n: number; id: string; task: string; agent: string; mode: string; difficulty: string; model: string; gate: boolean; after: string[] };
// Opus very rarely (Siax 2026-11-21 17:44 Berlin, DECISIONS v2.0): a "hard" task runs on Sonnet unless the human approves Opus for that task separately.
export const OPUS_COST_FACTOR = 5 / 3; // assumed Opus/Sonnet price ratio for the estimate shown to the human (unverified)
export type OpusRequest = { id: string; task: string; why: string; est_sonnet: number; est_opus: number; approved: boolean };
export type Plan = { opus: OpusRequest[]; case: string; status: "needs_input" | "error" | "needs_input:approve_plan"; answers: Answers; steps: PlanStep[]; skipped: { id: string; why: string }[]; ask: { id: string; why: string }[]; gates: number; est_usd: number; cap_usd: number; errors: string[] };

class Need extends Error { constructor(public key: string) { super(key); } }
/** Safe evaluator for the small condition language used in cases/*.yaml: a == 'x', !=, <, >, <=, >=, and, or, not. No eval. */
export function evalWhen(expr: string, ans: Answers): boolean {
  const toks = expr.match(/'[^']*'|"[^"]*"|==|!=|<=|>=|<|>|\(|\)|[A-Za-z_][A-Za-z0-9_]*|-?\d+(?:\.\d+)?/g) ?? [];
  let i = 0;
  const peek = () => toks[i], next = () => toks[i++];
  const val = (): unknown => {
    const t = next();
    if (t === undefined) throw new Error("bad expr");
    if (t === "(") { const v = or(); next(); return v; }
    if (t === "not") return !truthy(cmp());
    if (/^['"]/.test(t)) return t.slice(1, -1);
    if (/^-?\d/.test(t)) return Number(t);
    if (t === "True" || t === "true") return true;
    if (t === "False" || t === "false") return false;
    if (!Object.prototype.hasOwnProperty.call(ans, t)) throw new Need(t);
    return ans[t];
  };
  const truthy = (v: unknown) => !!v;
  const cmp = (): unknown => {
    const a = val(); const op = peek();
    if (op && ["==", "!=", "<", ">", "<=", ">="].includes(op)) {
      next(); const b = val();
      const x = typeof a === "number" || typeof b === "number" ? [Number(a), Number(b)] : [a, b];
      switch (op) { case "==": return x[0] === x[1]; case "!=": return x[0] !== x[1]; case "<": return (x[0] as number) < (x[1] as number); case ">": return (x[0] as number) > (x[1] as number); case "<=": return (x[0] as number) <= (x[1] as number); default: return (x[0] as number) >= (x[1] as number); }
    }
    return a;
  };
  const and = (): unknown => { let v = truthy(cmp()); while (peek() === "and") { next(); const r = truthy(cmp()); v = v && r; } return v; };
  const or = (): unknown => { let v = truthy(and()); while (peek() === "or") { next(); const r = truthy(and()); v = v || r; } return v; };
  return truthy(or());
}

// Correction (Siax 2026-11-21 17:45 Berlin): NO per-task model switching. The model stays on the agent, chosen by the difficulty of that agent's usual work;
// task difficulty is shown for information. An agent on Opus still needs separate approval per task, else Sonnet. Per-task model = IDEA-BANK idea 5.
export function planCase(c: CaseDef, ans: Answers, agentIds: Set<string>, opusOk: string[] = [], agentModel: Record<string, string> = {}): Plan {
  const am = (t: CaseTask) => agentModel[t.agent] ?? MODEL_BY_DIFF[t.difficulty ?? ""] ?? "Sonnet";
  const isOpus = (t: CaseTask) => /opus/i.test(am(t));
  const tasks = new Map(c.tasks.map((t) => [t.id, t]));
  const keep: string[] = [], skipped: Plan["skipped"] = [], ask: Plan["ask"] = [], errors: string[] = [];
  for (const t of c.tasks) {
    if (!t.when) { keep.push(t.id); continue; }
    try { if (evalWhen(t.when, ans)) keep.push(t.id); else skipped.push({ id: t.id, why: "شرط برقرار نیست: " + t.when }); }
    catch (e) { if (e instanceof Need) ask.push({ id: t.id, why: "پاسخ لازم است: " + e.key }); else errors.push(`${t.id}: شرط نامعتبر`); }
  }
  const kept = new Set(keep), order: string[] = [], done = new Set<string>();
  while (order.length < kept.size) {
    let prog = false;
    for (const id of keep) {
      if (done.has(id)) continue;
      if (tasks.get(id)!.after.filter((d) => kept.has(d)).every((d) => done.has(d))) { order.push(id); done.add(id); prog = true; }
    }
    if (!prog) { errors.push("چرخه در پیش‌نیازها"); break; }
  }
  for (const id of order) {
    const t = tasks.get(id)!;
    if (!agentIds.has(t.agent)) errors.push(`${id}: ایجنت ناشناخته ${t.agent}`);
    if (isOpus(t) && !t.why_hard) errors.push(`${id}: Opus بدون دلیل ثبت‌شده (why_hard)`);
    if ((t.external === "yes" || t.external === true) && t.mode !== "gate") errors.push(`${id}: کار بیرونی بدون gate`);
  }
  const est = Math.round(order.reduce((s, id) => s + tasks.get(id)!.est, 0) * 1000) / 1000;
  const cap = typeof ans.budget_cap_usd === "number" ? ans.budget_cap_usd : (c.budget_cap_usd ?? 1);
  if (est > cap) errors.push(`برآورد ${est}$ از سقف ${cap}$ بیشتر است`);
  const status = ask.length ? "needs_input" : errors.length ? "error" : "needs_input:approve_plan";
  return {
    case: c.case, status, answers: ans,
    steps: order.map((id, k) => { const t = tasks.get(id)!; return { n: k + 1, id, task: t.n, agent: t.agent, mode: t.mode, difficulty: t.difficulty ?? "unknown", model: isOpus(t) && !opusOk.includes(id) ? "Sonnet" : am(t), gate: t.mode === "gate", after: t.after.filter((d) => kept.has(d)) }; }),
    opus: order.filter((id) => isOpus(tasks.get(id)!)).map((id) => { const t = tasks.get(id)!; return { id, task: t.n, why: t.why_hard ?? "", est_sonnet: t.est, est_opus: Math.round(t.est * OPUS_COST_FACTOR * 100) / 100, approved: opusOk.includes(id) }; }),
    skipped, ask, gates: order.filter((id) => tasks.get(id)!.mode === "gate").length, est_usd: Math.round((est + order.filter((id) => isOpus(tasks.get(id)!) && opusOk.includes(id)).reduce((x, id) => x + tasks.get(id)!.est * (OPUS_COST_FACTOR - 1), 0)) * 100) / 100, cap_usd: cap, errors,
  };
}
