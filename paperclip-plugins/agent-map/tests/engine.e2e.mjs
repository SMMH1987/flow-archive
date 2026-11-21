// v0.2.0 · 2026-11-21 17:35 Berlin. Real-browser test of the UI engine that the plugin mounts (src/ui/mount.ts).
// Run: node tests/engine.e2e.mjs   (needs playwright's chromium; prints PASS/FAIL per check, exit 1 on any failure)
import esbuild from "esbuild"; import { createRequire } from "node:module"; const { chromium } = createRequire(import.meta.url)(process.env.PW || "playwright"); import fs from "node:fs";
const org = JSON.parse(fs.readFileSync(new URL("../src/generated/org.json", import.meta.url)));
const live = [
  { id: "L1", name: "مدیرعامل", title: "Chief Executive Officer", reportsTo: null, status: "running", model: "claude-opus-5-5", skills: [], spentMonthlyCents: 4200, budgetMonthlyCents: 5000, cat: "lead", orgId: "ceo" },
  { id: "L2", name: "کارشناس جذب", title: "", reportsTo: "L1", status: "error", model: "claude-haiku-5-5", skills: ["screening"], spentMonthlyCents: 12, budgetMonthlyCents: 500, cat: "other", orgId: "hr_recruiter" },
  { id: "L3", name: "random bot", title: "", reportsTo: "L1", status: "idle", model: null, skills: [], spentMonthlyCents: 0, budgetMonthlyCents: 0, cat: "other", orgId: null },
];
const b = await esbuild.build({ entryPoints: [new URL("../src/ui/mount.ts", import.meta.url).pathname], bundle: true, write: false, format: "iife", globalName: "AM" });
const html = `<!doctype html><meta charset=utf8><body><div id=host></div><script>${b.outputFiles[0].text}</script><script>AM.mountEngine(document.getElementById('host'),${JSON.stringify(org)},${JSON.stringify(live)},'SMMH')</script>`;
const br = await chromium.launch(); const p = await br.newPage({ viewport: { width: 1400, height: 950 } });
const errs = []; p.on("pageerror", (e) => errs.push(e.message));
await p.setContent(html); await p.waitForTimeout(600);
let fail = 0; const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fail++; };
ok((await p.textContent("#amx-live")).includes("3 ایجنت در Paperclip · 2 با چارت جور شد"), "live agents matched to chart (2 of 3)");
await p.click('[data-z="all"]'); await p.waitForTimeout(400);
ok((await p.$$eval("#mk-in .am-cd[data-s]", (x) => x.length)) === 116, "org chart shows all 116 agents after «باز کردن همه»");
await p.click('#mk-in [data-s="hr_recruiter"]'); await p.waitForTimeout(300);
const det = await p.textContent("#mk-det");
ok(det.includes("خطا") && det.includes("claude-haiku-5-5"), "live overlay: recruiter shows real status (error) and real model");
ok((await p.$$eval(".dt-bar button", (x) => x.map((y) => y.textContent).join(","))) === "خلاصه,ارتباط,کار,منبع", "side panel has 4 tabs");
await p.click("[data-ins]"); await p.waitForTimeout(200);
ok((await p.$$eval(".in-sp .in-col", (x) => x.length)) === 3, "instruction card: SIPOC 3 columns");
await p.click("[data-intab=f]"); await p.waitForTimeout(200);
ok((await p.$$eval(".fsv path.fa.no", (x) => x.length)) >= 4, "flowchart: ≥4 orange return/no arrows");
await p.click("[data-intab=t]"); ok((await p.textContent(".in-md")).startsWith("# کارشناس جذب"), "AGENTS.md text tab");
await p.click("[data-inx]");
await p.click("[data-va]"); await p.waitForTimeout(300);
ok((await p.$$eval("#mk-in [data-s]:not(.va-off)", (x) => x.length)) === 6, "view as recruiter: 6 cards lit");
await p.click("[data-vax]"); await p.waitForTimeout(200);
ok((await p.$$eval(".va-off", (x) => x.length)) === 0, "exit view-as");
const opts = await p.$$eval("#mk-wfs option", (x) => x.map((y) => [y.value, y.textContent]));
ok(opts.length >= 24, `workflow menu has ${opts.length} entries`);
const rv = opts.find((o) => o[1].includes("تحقیق داخلی"))[0]; await p.selectOption("#mk-wfs", rv); await p.waitForTimeout(300);
await p.click('[data-stp="1"]'); await p.click('[data-stp="1"]'); await p.waitForTimeout(400);
ok((await p.textContent(".st-bar span")).startsWith("قدم 2 از 7") && (await p.$$eval(".am-cur", (x) => x.length)) === 1, "step-through: step 2 of 7 highlighted");
await p.keyboard.press("Control+k"); await p.fill("#ck-q", "راستی"); await p.keyboard.press("Enter"); await p.waitForTimeout(300);
ok((await p.textContent("#mk-det .top")).includes("راستی‌آزمای منبع"), "Ctrl+K jumps to Source Verifier");
await p.selectOption("#mk-wfs", "-1").catch(() => {}); await p.waitForTimeout(200);
ok((await p.textContent("#grd-b")).includes("سالم"), "guard: healthy");
ok(await p.$eval("#mm-cv", (c) => !c.hidden && c.width > 0), "minimap drawn");
await p.selectOption("#mk-co", "live"); await p.waitForTimeout(400);
await p.click('[data-z="all"]').catch(() => {}); await p.waitForTimeout(200);
ok((await p.$$eval("#mk-in [data-s]", (x) => x.map((y) => y.dataset.s).sort().join(","))) === "L1,L2,L3", "live-only view shows the 3 real Paperclip agents");
await p.screenshot({ path: "tests/engine-e2e.png" });
ok(errs.length === 0, "no page errors " + (errs.join(" | ") || ""));
await br.close(); console.log(fail ? `${fail} FAILED` : "ALL PASS"); process.exit(fail ? 1 : 0);
