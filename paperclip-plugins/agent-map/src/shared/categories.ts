// Semantic categories for agents, guessed from name/title/role. Same rules as the Paperclip hub page.
export type CatKey = "lead"|"eng"|"sec"|"qa"|"design"|"prod"|"mkt"|"sales"|"data"|"sci"|"fin"|"ops"|"game"|"other";
export const CATS: Record<CatKey, { fa: string; hue: number }> = {
  lead: { fa: "رهبری و مدیریت", hue: 265 }, eng: { fa: "مهندسی نرم‌افزار", hue: 210 },
  sec: { fa: "امنیت", hue: 0 }, qa: { fa: "تست و کیفیت", hue: 30 },
  design: { fa: "طراحی و تجربهٔ کاربر", hue: 320 }, prod: { fa: "محصول و استراتژی", hue: 180 },
  mkt: { fa: "بازاریابی و محتوا", hue: 340 }, sales: { fa: "فروش و مشتری", hue: 20 },
  data: { fa: "داده و هوش مصنوعی", hue: 190 }, sci: { fa: "علم و پژوهش", hue: 140 },
  fin: { fa: "مالی، حقوقی و سرمایه", hue: 50 }, ops: { fa: "عملیات و هماهنگی", hue: 100 },
  game: { fa: "بازی و سه‌بعدی", hue: 290 }, other: { fa: "سایر", hue: 230 },
};
export const CAT_ORDER: CatKey[] = ["lead","eng","sec","qa","design","prod","mkt","sales","data","sci","fin","ops","game","other"];
const RULES: [CatKey, RegExp][] = [
  ["sec", /secur|vulnerab|fuzz|pentest|threat|exploit|\bcrypto|audit|malware|forensic|semgrep|codeql|\battack|on-chain|zk/],
  ["sci", /scien|\bbio|chem|physic|genom|protein|clinical|\blab\b|academic|histor|anthropolog|geograph|psycholog|\bmath|astro|neuro|drug|molec|research|literature/],
  ["game", /\bgame|level design|narrative design|spatial|\bxr\b|visionos|unity|unreal|godot|roblox|gameplay|\baudio|sound|shader|blender|technical artist/],
  ["qa", /\bqa\b|test|quality|review|verif|accessib|benchmark|evaluator/],
  ["data", /\bdata|database|analytic|\bml\b|machine learning|\bai\b|llm|statistic|report/],
  ["eng", /engineer|develop|architect|programm|scripter|coder|backend|frontend|mobile app|prototyp|firmware|\bcode\b/],
  ["fin", /financ|invest|\btrad|legal|complian|accounts? payable|capital|portfolio|\brisk|\btax|fund|quant|valuation/],
  ["sales", /sales|\bdeal|customer|support|success|pipeline|proposal|outbound|presales/],
  ["mkt", /market|content|\bseo|social|growth|\bcopy|tiktok|instagram|reddit|twitter|linkedin|writer|community|brand|\bmedia\b|influenc|video|podcast|newsletter|\bads\b|campaign|localiz/],
  ["design", /design|\bux\b|\bui\b|visual|artist|\bart\b|animat|illustr|image|creative|figma/],
  ["prod", /product|\bpm\b|roadmap|\bprd|strateg|feedback|trend|sprint|okr|persona|pricing|business/],
  ["ops", /\bops|devops|operation|release|deploy|infra|\bsre\b|platform|cloud|project|scrum|coordinat|orchestrat|producer|workflow|automation|agent|steward|tracker|incident|governance|analyst/],
];
export function categorize(a: { name: string; title: string | null; role?: string | null; reportsTo: string | null }): CatKey {
  const t = (a.title ?? "").toLowerCase();
  if (!a.reportsTo || /\b(ceo|cto|cfo|coo|cmo|cpo|ciso|chief|vp|vice president|director|head of|president|founder|manager)\b/.test(t) || a.role === "ceo") return "lead";
  const s = `${a.name} | ${a.title ?? ""} | ${a.role ?? ""}`.toLowerCase();
  if (/devops|\bsre\b|site reliab|infrastructure/.test(s)) return "ops";
  for (const [k, rx] of RULES) if (rx.test(s)) return k;
  return "other";
}
