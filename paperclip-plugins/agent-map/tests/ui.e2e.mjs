// v0.5.0 · 2026-11-21 18:00 Berlin. +step 0 intent brief; idea 2 trace. Full page test: the real React UI (src/ui/index.tsx) + the real worker (test harness) in Chromium.
// Run: npm run test:ui   — prints PASS/FAIL per check, exit 1 on failure. Build output goes to tests/.tmp (git-ignored).
import esbuild from "esbuild"; import fs from "node:fs"; import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)(process.env.PW || "playwright");
const { createTestHarness } = await import("@paperclipai/plugin-sdk/testing");
const tmp = new URL("./.tmp/", import.meta.url); fs.mkdirSync(tmp, { recursive: true });
await esbuild.build({ entryPoints: ["src/worker.ts", "src/manifest.ts"], bundle: true, platform: "node", format: "esm", outdir: tmp.pathname, packages: "external", logLevel: "error" });
const manifest = (await import(new URL("manifest.js", tmp))).default, plugin = (await import(new URL("worker.js", tmp))).default;
const H = createTestHarness({ manifest, capabilities: [...manifest.capabilities, "issues.read", "issue.comments.create", "issues.update"] });
const base = { companyId: "c1", urlKey: "", icon: null, capabilities: null, adapterType: "claude_local", runtimeConfig: {}, pauseReason: null, pausedAt: null, permissions: {}, lastHeartbeatAt: null, metadata: null, createdAt: new Date(), updatedAt: new Date() };
H.seed({ agents: [
  { ...base, id: "L1", name: "مدیرعامل", role: "ceo", title: "Chief Executive Officer", reportsTo: null, status: "running", adapterConfig: { model: "claude-opus-5-5" }, budgetMonthlyCents: 5000, spentMonthlyCents: 4200 },
  { ...base, id: "L2", name: "مدیر منابع انسانی", role: "manager", title: "", reportsTo: "L1", status: "idle", adapterConfig: {}, budgetMonthlyCents: 1000, spentMonthlyCents: 100 },
  { ...base, id: "L3", name: "کارشناس جذب", role: "general", title: "", reportsTo: "L2", status: "error", adapterConfig: { model: "claude-haiku-5-5" }, budgetMonthlyCents: 500, spentMonthlyCents: 12 },
] });
await plugin.definition.setup(H.ctx);
// sample rows standing in for heartbeat_runs / cost_events (the harness DB returns nothing by itself)
H.ctx.db.query = async (sql) => sql.includes("heartbeat_runs")
  ? [{ agent_id: "L1", status: "succeeded", started_at: "2026-11-21T09:00:00Z", error: null }, { agent_id: "L3", status: "failed", started_at: "2026-11-21T10:00:00Z", error: "rate limit" }]
  : [{ agent_id: "L1", input_tokens: 120000, cached_input_tokens: 80000, output_tokens: 9000, cost_cents: 81, model: "claude-opus-5-5" }, { agent_id: "L3", input_tokens: 900, cached_input_tokens: 0, output_tokens: 100, cost_cents: 1, model: "claude-haiku-5-5" }];
const ui = await esbuild.build({ entryPoints: ["tests/ui-entry.tsx"], bundle: true, write: false, format: "iife", jsx: "automatic", alias: { "@paperclipai/plugin-sdk/ui": "./tests/sdk-ui-stub.js" }, define: { "process.env.NODE_ENV": '"production"' }, logLevel: "error" });
const br = await chromium.launch(); const p = await br.newPage({ viewport: { width: 1400, height: 1000 }, acceptDownloads: true });
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.exposeFunction("__getData", async (k, prm) => JSON.stringify(await H.getData(k, prm)));
await p.exposeFunction("__action", async (k, prm) => { try { return JSON.stringify(await H.performAction(k, prm)); } catch (e) { return JSON.stringify({ __error: e.message }); } });
await p.setContent(`<!doctype html><meta charset=utf8><body><div id=root></div><script>${ui.outputFiles[0].text}</script>`); await p.waitForTimeout(1500);
let fail = 0; const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
ok((await p.textContent("#amx-live")).includes("3 ایجنت در Paperclip · 3 با چارت جور شد"), "page mounted, 3 live agents matched");
ok(((await p.textContent("#amx-warn").catch(() => "")) || "").includes("مدیرعامل"), "idea 4: budget alert for CEO at 84%");
ok(await p.$eval('#mk-in [data-s="ceo"]', (c) => c.classList.contains("am-over")).catch(() => false), "idea 4: red ring on the CEO card");
const dl = p.waitForEvent("download"); await p.click("#mk-ex"); const d = await dl; const csv = fs.readFileSync(await d.path(), "utf8");
ok(csv.split("\n").length === 119 && csv.includes('"hr_recruiter","کارشناس جذب"') && csv.includes('"error"'), "idea 8: CSV export, 118 rows with live status");
const fill = async (lab, v) => { const l = p.locator(".amx-q label", { hasText: lab }); const sel = l.locator("select"); if (await sel.count()) await sel.selectOption(v); else await l.locator("input").fill(v); };
ok(((await p.textContent(".amx-pl")) || "").includes("برنامه بعد از تأیید خلاصهٔ نیت ساخته می‌شود"), "step 0: planner hidden until the intent brief is approved");
ok(await p.isDisabled(".amx-brief-ok"), "step 0: brief tick disabled while 5 questions have no answer");
ok((await p.$$(".amx-in label[data-q]")).length === 4, "step 0: asks at most 4 questions per turn (bank of 17, only missing ones)");
ok(((await p.textContent(".amx-card")) || "").includes("تمام‌شده یعنی"), "step 0: 4-line intent card shown");
ok(((await p.textContent(".amx-in")) || "").includes("منبع: SHRM"), "step 0: each question shows a suggested answer with its source");
await p.check(".amx-in label.am-muted input"); await p.waitForTimeout(200);
await p.click('.amx-pre button[data-preset="ceo_assistant"]'); await p.waitForTimeout(500);
ok(((await p.textContent(".amx-brief")) || "").includes("گزارش هفتگی فروش"), "step 0: CEO-assistant preset fills the brief");
await p.fill('.amx-in label[data-q="work_mode"] input', "?"); await p.waitForTimeout(400);
ok(((await p.textContent(".amx-in")) || "").includes("سؤال تکمیلی") && await p.isDisabled(".amx-brief-ok"), "step 0: vague answer flagged, tick blocked");
await p.fill('.amx-in label[data-q="work_mode"] input', "تهران، ترکیبی"); await p.waitForTimeout(400);
await p.check(".amx-brief-ok"); await p.waitForTimeout(400);
await fill("کشور", "IR"); await fill("سطح", "mid"); await fill("بودجهٔ آگهی", "0"); await fill("نظام‌وظیفه", "yes"); await p.waitForTimeout(600);
ok((await p.textContent(".amx-pl")).includes("15 قدم · 4 تأیید انسانی · برآورد 0.45$"), "planner shows 15 steps / 4 gates / $0.45");
const btn = p.locator(".amx-pl button", { hasText: "ساخت تسک‌ها" });
ok(await btn.isDisabled(), "create button disabled until approval tick");
await p.check(".amx-plan-ok"); await btn.click(); await p.waitForTimeout(800);
ok((await p.textContent(".amx-pl")).includes("15 تسک ساخته شد"), "approve → 15 tasks created");
const iss = await H.ctx.issues.list({ companyId: "c1", limit: 100, offset: 0 });
ok(iss.length === 16 && iss.every((i) => i.status === "backlog"), "16 issues in Paperclip, all backlog (nothing auto-starts)");
ok(iss.find((i) => i.title.includes("نوشتن شرح شغل")).assigneeAgentId === "L3", "job description assigned to the live recruiter");
ok((await p.$$(".amx-tpl button")).length === 1, "idea 5: the approved plan appears as a reusable template");
await fill("کشور", "other"); await p.waitForTimeout(400); await p.click(".amx-tpl button"); await p.waitForTimeout(600);
ok((await p.textContent(".amx-pl")).includes("15 قدم"), "idea 5: clicking the template restores its answers");
const sum0 = await p.textContent(".amx-sc-sum");
ok(sum0.startsWith("اکنون: 118 ایجنت"), "idea 1: scenario starts from 118 agents");
await p.uncheck('.amx-sc tr[data-dept="hr"] input[type=checkbox]'); await p.fill('.amx-sc tr[data-dept="marketing"] input[type=number]', "3"); await p.waitForTimeout(300);
const sum1 = await p.textContent(".amx-sc-sum");
ok(/سناریو: 11[0-9] ایجنت/.test(sum1) && sum1 !== sum0, "idea 1: HR off + 3 Haiku in marketing changes totals: " + sum1);
const tr = await p.textContent(".amx-tr").catch(() => "");
ok(tr.includes("در دسترس نیست"), "idea 2 (0.4.1): trace panel says unavailable without DB permission, page still works");
const jd = (await H.ctx.issues.list({ companyId: "c1", limit: 100, offset: 0 })).find((i) => i.title.includes("نوشتن شرح شغل"));
await H.ctx.issues.createComment(jd.id, "شرح شغل: دستیار مدیرعامل، ترکیبی تهران. " + "کارهای اصلی: هماهنگی جلسات، پیگیری تیم‌ها، گزارش هفتگی فروش. ".repeat(3), "c1"); await H.ctx.issues.createComment(jd.id, "سؤال: عنوان دقیق؟", "c1"); await H.ctx.issues.update(jd.id, { status: "done" }, "c1");
await p.click(".amx-runs-rf"); await p.waitForTimeout(800);
const runs = (await p.textContent(".amx-runs").catch(() => "")) || "";
ok(runs.includes("شرح شغل: دستیار مدیرعامل") && runs.includes("انجام شد") && runs.includes("1 از 15") && runs.includes("1 پیام کوتاه دیگر پنهان است"), "0.7: each step shows its status and the agent's answer beside it");
await p.screenshot({ path: "tests/ui-e2e.png", fullPage: true });
ok(errs.length === 0, "no page errors " + errs.join(" | "));
await br.close(); console.log(fail ? `${fail} FAILED` : "ALL PASS"); process.exit(fail ? 1 : 0);
