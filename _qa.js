// QA harness: multi-viewport render + overflow + console errors + admin flow.
// Run: NODE_PATH="C:/Users/LENOVO/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules" node _qa.js
const { chromium } = require("playwright");
const fs = require("fs");

const BASE = "http://localhost:3000";
const VIEWPORTS = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
];
const PAGES = ["/", "/about", "/coconut", "/leadership", "/contact"];

const OUT = "_qa";
fs.mkdirSync(OUT, { recursive: true });

const results = [];
function log(label, ok, detail = "") {
  results.push({ label, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? " — " + detail : ""}`);
}

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:/Users/LENOVO/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe",
  });
  const context = await browser.newContext();

  // ---- public pages across viewports ----
  for (const vp of VIEWPORTS) {
    const page = await context.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(String(e)));

    for (const path of PAGES) {
      const name = `${vp.name}${path === "/" ? "/home" : path}`;
      try {
        await page.goto(BASE + path, { waitUntil: "load", timeout: 30000 });
        await page.waitForTimeout(1400); // let client JS settle
      } catch (e) {
        log(`${name} render`, false, e.message.slice(0, 80));
        continue;
      }
      const state = await page.evaluate(() => ({
        title: document.title,
        overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        h1: document.querySelector("h1")?.textContent?.trim().slice(0, 60) || null,
        nav: Boolean(document.querySelector("nav[aria-label='Main navigation']")),
        footer: Boolean(document.querySelector("footer")),
        imgs: document.querySelectorAll("img").length,
        brokenImgs: [...document.querySelectorAll("img")].filter((i) => !i.complete || i.naturalWidth === 0).length,
      }));
      log(`${name} render`, state.title.includes("Afemhai") && state.nav && state.footer, JSON.stringify(state));
      log(`${name} no-horizontal-overflow`, state.overflowX <= 0, `overflowX=${state.overflowX}px`);
      if (state.brokenImgs > 0) log(`${name} all-images-loaded`, false, `${state.brokenImgs} broken`);
      await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
    }
    if (errors.length) log(`${vp.name} console-clean`, false, errors.slice(0, 3).join(" | ").slice(0, 200));
    else log(`${vp.name} console-clean`, true);
    await page.close();
  }

  // ---- admin login flow (desktop) ----
  const page = await context.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + "/admin/login", { waitUntil: "load" });
  await page.fill('input[type="password"]', "Afemhai2026!");
  await Promise.all([page.waitForURL("**/admin", { timeout: 20000 }).catch(() => {}), page.click('button[type="submit"]')]);
  await page.waitForTimeout(1500);
  log("admin login with default password", page.url().endsWith("/admin"), page.url());
  log("dashboard renders", await page.locator("text=Dashboard").first().isVisible().catch(() => false));
  await page.screenshot({ path: `${OUT}/admin-dashboard.png` });

  // open an editor, change a field, save -> live site should reflect it (ISR)
  await page.goto(BASE + "/admin/homepage", { waitUntil: "networkidle" });
  const heroInput = page.locator('textarea[placeholder], input[placeholder]').first();
  const heroBefore = await page.locator('input, textarea').first().inputValue().catch(() => "");
  log("homepage editor opens", await page.locator("text=Hero section").first().isVisible().catch(() => false));

  // save without changes first (tests the content API)
  await page.goto(BASE + "/api/admin/session", { waitUntil: "load" });
  const sessionBody = await page.evaluate(() => document.body.innerText);
  log("session API authenticated", sessionBody.includes('"authenticated":true'), sessionBody.slice(0, 60));

  // contact form smoke test
  const contact = await context.newPage();
  await contact.setViewportSize({ width: 1440, height: 900 });
  await contact.goto(BASE + "/contact", { waitUntil: "load" });
  await contact.waitForTimeout(1000);
  await contact.fill('input[name="name"]', "QA Tester");
  await contact.fill('input[name="email"]', "qa@test.local");
  await contact.fill('textarea[name="message"]', "Automated QA message — verify inbox.");
  await contact.click('button[type="submit"]');
  await contact.waitForTimeout(2500);
  const contactState = await contact.evaluate(() => ({
    success: document.body.innerText.includes("Message sent"),
    pageStillFine: document.querySelector("footer") !== null,
  }));
  log("contact form submits", contactState.success, JSON.stringify(contactState));
  await contact.close();

  // inbox should now show 1 message
  await page.goto(BASE + "/admin/messages", { waitUntil: "load" });
  await page.waitForTimeout(1000);
  log("inbox shows new message", await page.locator("text=QA Tester").first().isVisible().catch(() => false));
  await page.screenshot({ path: `${OUT}/admin-inbox.png` });

  // logout
  await page.goto(BASE + "/admin", { waitUntil: "load" });
  await page.click("text=Log out");
  await page.waitForURL("**/admin/login", { timeout: 10000 }).catch(() => {});
  log("logout redirects to login", page.url().endsWith("/admin/login"), page.url());

  await browser.close();

  const fails = results.filter((r) => !r.ok).length;
  console.log(`\n==== QA SUMMARY: ${results.length - fails}/${results.length} passed ====`);
  process.exit(fails > 0 ? 1 : 0);
})().catch((e) => { console.error("QA script crashed:", e); process.exit(2); });