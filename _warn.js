const s = require("fs").readFileSync(0, "utf8");
const res = JSON.parse(s);
for (const f of res) {
  for (const m of f.messages) {
    if (m.severity === 1) {
      const rel = f.filePath.split("src")[1] || f.filePath;
      console.log(`${rel} :: ${m.line}:${m.column} :: ${m.message.split("\n")[0].slice(0, 90)}`);
    }
  }
}
