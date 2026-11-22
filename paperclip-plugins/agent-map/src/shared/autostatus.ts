// v1.0 · 2026-11-22 07:05 Berlin. Siax approved 06:47 («تایید»): the plugin marks a case step done when its agent posted the answer.
// Why: the HR agents run with «--tools Read» (no Bash), and Paperclip changes status only through Bash/curl, so they cannot do it themselves.
// Pure function, tested in tests/plugin.spec.ts. Never touches 🔒 (human gate) steps, never reopens or overrides a human choice.
export const ANSWER_MIN = 120; // same threshold as the case list: shorter comments are questions or notes
const OPEN = new Set(["backlog", "todo", "in_progress", "in_review"]);
export type StepIssue = { id: string; title: string; status: string; parentId?: string | null; assigneeAgentId?: string | null };
export type StepComment = { body?: string | null; authorAgentId?: string | null; authorType?: string | null; createdAt?: string };
/** Returns "done" when the step should be closed, otherwise null with the reason (for the log and tests). */
export function autoStatus(issue: StepIssue, parentTitle: string | null, comments: StepComment[]): { status: "done" | null; why: string } {
  if (!parentTitle || !parentTitle.startsWith("پرونده:")) return { status: null, why: "not a case step" };
  if (issue.title.includes("🔒")) return { status: null, why: "human gate" };
  if (!OPEN.has(issue.status)) return { status: null, why: "status " + issue.status };
  const agentAnswers = comments.filter((c) => (c.authorAgentId || c.authorType === "agent") && String(c.body ?? "").trim().length >= ANSWER_MIN);
  if (!agentAnswers.length) return { status: null, why: "no agent answer yet" };
  const last = [...agentAnswers].sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")))[0];
  if (issue.assigneeAgentId && last.authorAgentId && last.authorAgentId !== issue.assigneeAgentId) return { status: null, why: "answer from another agent" };
  const tail = String(last.body).trim().split(/\n/).slice(-3).join(" ");
  if (/[?؟]\s*$/.test(tail) || /(منتظر (تأیید|پاسخ|جواب)|نیاز به تأیید|blocked|گیر کرده)/i.test(tail)) return { status: null, why: "answer ends with a question or a wait" };
  return { status: "done", why: "agent answer posted" };
}
