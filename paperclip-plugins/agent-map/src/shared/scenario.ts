// v1 · 2026-11-21 18:10 Berlin. What-if scenario for the org chart (idea 1, from ChartHop/Lucid scenario planning)
// and budget alerts (idea 4). Monthly cost per agent: real Paperclip budget if known, else a default by model (assumption, labelled in UI).
export const MODEL_DEFAULT_USD: Record<string, number> = { opus: 20, sonnet: 6, haiku: 1 };
export type ScenarioAgent = { id: string; k: string; m?: string };
export function monthlyUsd(a: ScenarioAgent, liveBudgetCents?: number): number {
  if (liveBudgetCents && liveBudgetCents > 0) return liveBudgetCents / 100;
  const m = (a.m ?? "").toLowerCase();
  return m.includes("opus") ? MODEL_DEFAULT_USD.opus : m.includes("haiku") ? MODEL_DEFAULT_USD.haiku : MODEL_DEFAULT_USD.sonnet;
}
export type ScenarioResult = { agents: number; usd: number; byDept: Record<string, { agents: number; usd: number }>; delta: { agents: number; usd: number } };
/** off = departments switched off; extra = hypothetical new agents per department. */
export function scenario(all: ScenarioAgent[], off: Set<string>, extra: Record<string, { n: number; m: string }> = {}, live: Record<string, number> = {}): ScenarioResult {
  const base = all.reduce((s, a) => s + monthlyUsd(a, live[a.id]), 0);
  const byDept: ScenarioResult["byDept"] = {};
  let agents = 0, usd = 0;
  for (const a of all) {
    if (off.has(a.k)) continue;
    const c = monthlyUsd(a, live[a.id]); agents++; usd += c;
    const d = (byDept[a.k] ??= { agents: 0, usd: 0 }); d.agents++; d.usd += c;
  }
  for (const [k, e] of Object.entries(extra)) {
    if (off.has(k) || !e.n) continue;
    const c = e.n * monthlyUsd({ id: "", k, m: e.m }); agents += e.n; usd += c;
    const d = (byDept[k] ??= { agents: 0, usd: 0 }); d.agents += e.n; d.usd += c;
  }
  const r2 = (x: number) => Math.round(x * 100) / 100;
  for (const d of Object.values(byDept)) d.usd = r2(d.usd);
  return { agents, usd: r2(usd), byDept, delta: { agents: agents - all.length, usd: r2(usd - base) } };
}
export function overBudget(spentCents: number, budgetCents: number, limit = 0.8): boolean {
  return budgetCents > 0 && spentCents / budgetCents >= limit;
}
