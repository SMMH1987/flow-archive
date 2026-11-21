// v0.4.0 · 2026-11-21 19:30 Berlin. Idea 2: run trace per agent (last runs, tokens, dollars, last error). Pure function, unit-tested.
export type RunRow = { agent_id: string; status: string; started_at: string | null; finished_at: string | null; error: string | null; issue_id: string | null };
export type CostRow = { agent_id: string; input_tokens: number | string; cached_input_tokens: number | string; output_tokens: number | string; cost_cents: number | string; model: string };
export type AgentTrace = { agentId: string; runs: number; failed: number; last: { status: string; at: string | null; error: string | null; issueId: string | null }[]; inTok: number; cachedTok: number; outTok: number; usd: number; models: string[]; lastError: string | null };
const n = (v: unknown) => Number(v) || 0;
export function aggregateTrace(runs: RunRow[], costs: CostRow[], keep = 5): Record<string, AgentTrace> {
  const out: Record<string, AgentTrace> = {};
  const get = (id: string) => (out[id] ??= { agentId: id, runs: 0, failed: 0, last: [], inTok: 0, cachedTok: 0, outTok: 0, usd: 0, models: [], lastError: null });
  const sorted = [...runs].sort((a, b) => String(b.started_at ?? "").localeCompare(String(a.started_at ?? "")));
  for (const r of sorted) {
    const t = get(r.agent_id); t.runs++;
    const bad = /fail|error|timed_out|cancel/i.test(r.status); if (bad) { t.failed++; t.lastError ??= r.error || r.status; }
    if (t.last.length < keep) t.last.push({ status: r.status, at: r.started_at, error: r.error, issueId: r.issue_id });
  }
  for (const c of costs) {
    const t = get(c.agent_id); t.inTok += n(c.input_tokens); t.cachedTok += n(c.cached_input_tokens); t.outTok += n(c.output_tokens); t.usd += n(c.cost_cents) / 100;
    if (c.model && !t.models.includes(c.model)) t.models.push(c.model);
  }
  for (const t of Object.values(out)) t.usd = Math.round(t.usd * 100) / 100;
  return out;
}
// Columns checked against the @paperclipai/db schema (sdk 2026.1117.0) by the Paperclip thread 2026-11-21 17:13 Berlin: cost uses reported_cost_cents; there is no cached_input_tokens column.
export const RUNS_SQL = "SELECT agent_id, status, started_at, finished_at, error, issue_id FROM heartbeat_runs WHERE company_id = $1 AND started_at > now() - interval '30 days' ORDER BY started_at DESC NULLS LAST LIMIT 2000";
export const COSTS_SQL = "SELECT agent_id, input_tokens, 0 AS cached_input_tokens, output_tokens, reported_cost_cents AS cost_cents, model FROM cost_events WHERE company_id = $1 AND agent_id IS NOT NULL AND occurred_at > now() - interval '30 days' LIMIT 20000";
