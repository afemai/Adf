// Screenshots: new home hero (video backdrop) + christmas mode + new logo.
// Run: NODE_PATH="C:/Users/LENOVO/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules" node _final_shots.js
const { chromium } = require("playwright");
const fs = require("fs");

const P = "data/site_data.json";
function setMode(mode) {
  const d = JSON.parse(fs.readFileSync(P, "utf8"));
  d.settings.seasonal.mode = mode;
  fs.writeFileSync(P, JSON.stringify(d, null, 2));
}

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:/Users/LENOVO/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  setMode("none");
  await page.goto("http://localhost:3000/", { waitUntil: "load" });
  await page.waitForTimeout(3500); // let the hero video fade in
  await page.screenshot({ path: "_qa/final-home-hero.png" });
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: "_qa/final-home.png", fullPage: true });

  setMode("christmas");
  await page.goto("http://localhost:3000/", { waitUntil: "load" });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: "_qa/final-christmas.png", fullPage: true });

  setMode("independence");
  await page.goto("http://localhost:3000/", { waitUntil: "load" });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: "_qa/final-independence.png", fullPage: true });

  setMode("none");
  await browser.close();
  console.log("shots done");
})().catch((e) => {
  console.error("CRASH:", e.message);
  process.exit(2);
});
