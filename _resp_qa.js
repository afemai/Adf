// All-device responsive QA: 320/360/390/768/1024/1440 widths x all pages.
// Checks horizontal overflow, console errors, nav visibility, broken images.
// Run: NODE_PATH="C:/Users/LENOVO/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules" node _resp_qa.js
const { chromium } = require("playwright");
const fs = require("fs");
fs.mkdirSync("_qa", { recursive: true });

const VIEWPORTS = [
  { name: "xs-320", width: 320, height: 700 },
  { name: "sm-360", width: 360, height: 800 },
  { name: "md-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
];
const PAGES = ["/", "/about", "/coconut", "/leadership", "/contact"];

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const ctx = await browser.newContext();
  let pass = 0, fail = 0;
  const report = [];
  const ok = (m) => { pass++; report.push(`PASS  ${m}`); };
  const bad = (m) => { fail++; report.push(`FAIL  ${m}`); };

  for (const vp of VIEWPORTS) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 140)); });
    page.on("pageerror", (e) => errors.push(String(e).slice(0, 140)));

    for (const path of PAGES) {
      const label = `${vp.name}${path === "/" ? "" : path}`;
      try {
        await page.goto("http://localhost:3000" + path, { waitUntil: "load", timeout: 45000 });
        await page.waitForTimeout(900);
      } catch (e) { bad(`${label} load: ${e.message.slice(0, 60)}`); continue; }
      const st = await page.evaluate(() => ({
        overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        h1: Boolean(document.querySelector("h1")),
        footer: Boolean(document.querySelector("footer")),
        broken: [...document.querySelectorAll("img")].filter((i) => !i.complete || i.naturalWidth === 0).length,
      }));
      if (st.overflowX <= 0) ok(`${label} no-overflow (${st.overflowX}px)`);
      else bad(`${label} HORIZONTAL OVERFLOW ${st.overflowX}px`);
      if (!st.h1 || !st.footer) bad(`${label} missing h1/footer`);
      if (st.broken > 0) bad(`${label} ${st.broken} broken img`);
    }
    if (errors.length) bad(`${vp.name} console errors: ${errors[0]}`);
    else ok(`${vp.name} console clean`);
    await page.close();
  }

  // mobile screenshots for the user
  const mob = await ctx.newPage();
  await mob.setViewportSize({ width: 375, height: 812 });
  for (const [path, name] of [["/", "mob-home"], ["/coconut", "mob-coconut"], ["/leadership", "mob-leadership"]]) {
    await mob.goto("http://localhost:3000" + path, { waitUntil: "load" });
    await mob.waitForTimeout(800);
    await mob.screenshot({ path: `_qa/${name}.png`, fullPage: false });
  }
  await mob.close();
  await browser.close();

  console.log(report.join("\n"));
  console.log(`\n==== RESPONSIVE: ${pass} pass / ${fail} fail ====`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error("CRASH:", e.message); process.exit(2); });