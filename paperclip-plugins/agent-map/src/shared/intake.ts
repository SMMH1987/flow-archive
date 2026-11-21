// v0.5.0 · 2026-11-21 17:55 Berlin. Step 0 of every case (Siax rule «تو همه درخواست اول شفاف و کامل بشه نیت و درخواست»):
// fixed intake questions with default + why → intent brief → human tick → only then the planner builds tasks.
// Ideas: LinkedIn/Greenhouse hiring intake, NVIDIA AI-Q Clarifier (follow-up only when ambiguous, max 3 rounds), IntentRL.
// Merged with laptop research (INTENT-CLARIFIER-RESEARCH.md): the questions are a BANK, ask at most 4 per turn and only what is missing/unclear;
// a 4-line intent card + approval gate before step 1; after the round cap, continue with stated defaults; ambiguity detection is weak in models → fixed test set.
export type IntakeQ = { id: string; q: string; why: string; default?: string; suggest?: string; src?: string };
export type IntakeDef = { max_rounds?: number; questions: IntakeQ[] };
// Suggestion source order (Siax 2026-11-21 16:36 UTC, DECISIONS v1.7): 1) the user's own past cases, 2) world standard (suggest+src), 3) unsourced default.
// Past answers are not asked again, only cited ("از پروندهٔ ..."); two past cases that disagree trigger a question.
export type PastCase = { at: string; intake: Record<string, unknown> };
export type BriefLine = { id: string; q: string; a: string; source: "answer" | "past" | "default" | "missing"; unclear?: string; cite?: string };
export type Brief = { lines: BriefLine[]; assumptions: string[]; unclear: string[]; missing: string[]; ready: boolean; text: string; card: string[]; nextAsk: string[] };
export const MAX_PER_TURN = 4;

const VAGUE = /^(\?|؟|نمی\s?دونم|نمی‌دانم|نمیدونم|هرچی|هر چی|فرقی نداره|بعدا|بعداً|idk|tbd|-|—)$/i;
/** Deterministic ambiguity check. The agent asks the follow-up; the plugin only flags what still needs one. */
export function unclearWhy(a: string): string | null {
  const t = a.trim();
  if (!t) return null;
  if (VAGUE.test(t)) return "جواب روشن نیست؛ یک جواب مشخص یا «پیش‌فرض» بنویسید";
  if (/[?؟]\s*$/.test(t)) return "جواب به شکل سؤال است؛ ایجنت روشن‌کننده یک سؤال تکمیلی می‌پرسد";
  return null;
}

export function buildBrief(def: IntakeDef | undefined, answers: Record<string, unknown>, title: string, past: PastCase[] = []): Brief {
  const lines: BriefLine[] = [], assumptions: string[] = [], unclear: string[] = [], missing: string[] = [];
  for (const q of def?.questions ?? []) {
    const raw = String(answers[q.id] ?? "").trim();
    const useDefault = !raw || raw === "پیش‌فرض" || raw === "پیش فرض";
    if (useDefault) {
      const vals = past.map((p) => ({ at: p.at, v: String(p.intake?.[q.id] ?? "").trim() })).filter((x) => x.v);
      const distinct = [...new Set(vals.map((x) => x.v))];
      if (distinct.length > 1) { const u = `پرونده‌های قبلی با هم فرق دارند (${distinct.slice(0, 2).join(" / ")})؛ کدام؟`; lines.push({ id: q.id, q: q.q, a: "", source: "missing", unclear: u }); unclear.push(q.id); continue; }
      if (distinct.length === 1) { const cite = `از پروندهٔ ${vals[0].at.slice(0, 10)}`; lines.push({ id: q.id, q: q.q, a: distinct[0], source: "past", cite }); assumptions.push(`${q.q} → ${distinct[0]} (${cite})`); continue; }
    }
    if (useDefault && !q.default) { lines.push({ id: q.id, q: q.q, a: "", source: "missing" }); missing.push(q.id); continue; }
    if (useDefault) { lines.push({ id: q.id, q: q.q, a: String(q.default), source: "default" }); assumptions.push(`${q.q} → ${q.default} (فرض)`); continue; }
    const u = unclearWhy(raw);
    lines.push({ id: q.id, q: q.q, a: raw, source: "answer", ...(u ? { unclear: u } : {}) });
    if (u) unclear.push(q.id);
  }
  const ready = missing.length === 0 && unclear.length === 0;
  const val = (id: string) => lines.find((l) => l.id === id)?.a || "—";
  // 4-line intent card: why · done means · not · for whom/where (laptop research, step 0 output 2)
  const card = [`نیت: ${val("why_now")}`, `تمام‌شده یعنی: ${val("success_check")}`, `چه چیزی نه: ${val("red_flags")}؛ محرمانه: ${val("confidential")}`, `برای چه کسی/کجا: ${val("work_mode")} · مصاحبه: ${val("interviewers")}`];
  // ask only what is missing or unclear, at most 4 per turn (defaults are not asked again)
  const nextAsk = [...unclear, ...missing].slice(0, MAX_PER_TURN);
  const text = [`# خلاصهٔ نیت: ${title}`, "", ...card.map((c) => `**${c}**`), "", ...lines.map((l) => `- ${l.q} ${l.source === "missing" ? "**(بی‌جواب)**" : l.a}${l.source === "default" ? " _(فرض)_" : ""}${l.cite ? ` _(${l.cite})_` : ""}${l.unclear ? " **(مبهم)**" : ""}`),
    ...(assumptions.length ? ["", `فرض‌ها: ${assumptions.length}`] : [])].join("\n");
  return { lines, assumptions, unclear, missing, ready, text, card, nextAsk };
}
