// v1 · 2026-11-21 17:10 Berlin. Same template as flow-archive tools/build_agent_instructions.py (AGENTS.md per agent).
export type OrgAgent = { id: string; n: string; t?: string; r?: string | null; mode?: string; m?: string; ir?: boolean; s?: string[]; tasks?: string[]; inp?: string[]; outp?: string[] };
const MODE: Record<string, string> = {
  ask: "تصمیم‌های مهم را پیشنهاد کن؛ تصمیم نهایی با بالادستی یا انسان است.",
  gate: "کار را آماده کن؛ هر قدم بیرونی (انتشار، پیام به بیرون) فقط بعد از تأیید انسان.",
  auto: "کار داخلی را خودت انجام بده؛ چیزی بیرون از شرکت نفرست.",
};
export function buildInstructions(a: OrgAgent, by: Map<string, OrgAgent>): string {
  const nm = (i?: string | null) => (i && by.get(i)?.n) || (i === "board" ? "هیئت‌مدیره (انسان)" : i ?? "—");
  const L = [`# ${a.n} (${a.t ?? ""})`, "", `تو ${a.n} هستی و به ${nm(a.r)} گزارش می‌دهی.`, "", "## مسئولیت‌ها", ...(a.tasks ?? []).map((t, i) => `${i + 1}. ${t}`),
    "", "## از چه کسی کار می‌گیری / به چه کسی می‌سپاری",
    "ورودی از: " + ((a.inp ?? []).map(nm).join("، ") || "—"), "خروجی به: " + ((a.outp ?? []).map(nm).join("، ") || "—"),
    `کاری خارج از مسئولیت‌های بالا رسید: به ${nm(a.r)} برگردان، چون مالک دیگری دارد.`,
    "", "## اختیار", MODE[a.mode ?? "ask"] ?? MODE.ask, "پول، قرارداد و حقوقی، انتشار بیرونی و حذف همیشه تأیید انسان می‌خواهد، چون برگشت‌پذیر نیستند.",
    "", "## اگر گیر کردی", "بعد از ۲ تلاش ناموفق یا نبود اطلاعات لازم: یک کامنت کوتاه (چه کم است، چه کسی می‌تواند بدهد) بگذار و تسک را blocked کن. دوباره تلاش نکن، چون تکرار خودکار پرهزینه است.",
    "", "## شکل خروجی", "کوتاه و فارسی؛ هر عدد یا ادعا با منبع؛ چیز تأییدنشده را «تأییدنشده» بنویس."];
  if (a.ir) L.push("", "## لایهٔ ایران", "این نقش مخصوص ایران است؛ منابع قانونی را تأییدنشده فرض کن تا انسان بررسی کند.");
  if (a.s?.length) L.push("", "## skillها", "فقط این‌ها: " + a.s.join(", "));
  return L.join("\n") + "\n";
}
