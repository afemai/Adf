// Leadership gallery image check: scroll the full page, wait for lazy images, count broken.
// Run: NODE_PATH="C:/Users/LENOVO/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules" node _img_qa.js
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/leadership", { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(800);

  // scroll through the page in steps so lazy images trigger
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2500);

  const result = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")];
    const broken = imgs.filter((i) => !i.complete || i.naturalWidth === 0);
    return {
      total: imgs.length,
      broken: broken.length,
      brokenSrcs: broken.map((i) => i.getAttribute("src") || i.src).slice(0, 10),
      loaded: imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
    };
  });
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})().catch((e) => { console.error("CRASH:", e.message); process.exit(2); });