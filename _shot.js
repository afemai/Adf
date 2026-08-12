// Screenshots of the revamped pages for user review.
// Run: NODE_PATH="C:/Users/LENOVO/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules" node _shot.js
const { chromium } = require("playwright");
const fs = require("fs");
fs.mkdirSync("_qa", { recursive: true });

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  // login as admin (cookie persists in ctx)
  await page.goto("http://localhost:3000/admin/login", { waitUntil: "load" });
  await page.screenshot({ path: "_qa/v2-admin-login.png" });
  await page.fill('input[type="password"]', "Afemhai2026!");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2500);
  await page.screenshot({ path: "_qa/v2-admin-dashboard.png" });

  await page.goto("http://localhost:3000/admin/theme", { waitUntil: "load" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "_qa/v2-admin-theme.png" });

  // public pages (scroll full height for lazy content)
  for (const [path, name] of [["/", "v2-home"], ["/coconut", "v2-coconut"], ["/leadership", "v2-leadership"]]) {
    await page.goto("http://localhost:3000" + path, { waitUntil: "load" });
    await page.waitForTimeout(1000);
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `_qa/${name}.png`, fullPage: true });
  }

  await browser.close();
  console.log("done");
})().catch((e) => { console.error("CRASH:", e.message); process.exit(2); });