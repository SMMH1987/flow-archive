// v1 · 2026-11-21 17:10 Berlin. Port of flow-archive tools/plan_case.py (same rules, same results; see tests).
// Dry planner: picks only the case's allowed tasks, orders them by prerequisites, checks owner/gate/budget.
export type CaseTask = { id: string; n: string; agent: string; mode: "auto" | "ask" | "gate"; m: string; est: number; after: string[]; when?: string; external?: string | boolean };
export type CaseDef = { case: string; name: string; owner?: string; budget_cap_usd?: number; questionnaire?: { id: string; q: string; options?: string[]; example?: unknown }[]; tasks: CaseTask[] };
export type Answers = Record<string, string | number | boolean>;
export type PlanStep = { n: number; id: string; task: string; agent: string; mode: string; model: string; gate: boolean; after: string[] };
export type Plan = { case: string; status: "needs_input" | "error" | "needs_input:approve_plan"; answers: Answers; steps: PlanStep[]; skipped: { id: string; why: string }[]; ask: { id: string; why: string }[]; gates: number; est_usd: number; cap_usd: number; errors: string[] };

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

export function planCase(c: CaseDef, ans: Answers, agentIds: Set<string>): Plan {
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
    if ((t.external === "yes" || t.external === true) && t.mode !== "gate") errors.push(`${id}: کار بیرونی بدون gate`);
  }
  const est = Math.round(order.reduce((s, id) => s + tasks.get(id)!.est, 0) * 1000) / 1000;
  const cap = typeof ans.budget_cap_usd === "number" ? ans.budget_cap_usd : (c.budget_cap_usd ?? 1);
  if (est > cap) errors.push(`برآورد ${est}$ از سقف ${cap}$ بیشتر است`);
  const status = ask.length ? "needs_input" : errors.length ? "error" : "needs_input:approve_plan";
  return {
    case: c.case, status, answers: ans,
    steps: order.map((id, k) => { const t = tasks.get(id)!; return { n: k + 1, id, task: t.n, agent: t.agent, mode: t.mode, model: t.m, gate: t.mode === "gate", after: t.after.filter((d) => kept.has(d)) }; }),
    skipped, ask, gates: order.filter((id) => tasks.get(id)!.mode === "gate").length, est_usd: est, cap_usd: cap, errors,
  };
}
