#!/bin/bash
# Verify seasonal mode swaps logo + palette.
set -u
cd /c/Users/LENOVO/Documents/adf-repo
F="_qa_s.html"
P="data/site_data.json"

node -e "
const fs=require('fs');
const d=JSON.parse(fs.readFileSync('$P','utf8'));
d.settings.seasonal.mode='christmas';
fs.writeFileSync('$P',JSON.stringify(d,null,2));
console.log('mode -> christmas');
"
sleep 1
curl -s --max-time 60 http://localhost:3000/ -o "$F"
echo "santa logo used: $(grep -c 'logo-christmas' "$F")"
echo "crimson palette: $(grep -c '6E1423' "$F")"
echo "christmas ribbon: $(grep -c 'Merry Christmas' "$F")"

node -e "
const fs=require('fs');
const d=JSON.parse(fs.readFileSync('$P','utf8'));
d.settings.seasonal.mode='none';
fs.writeFileSync('$P',JSON.stringify(d,null,2));
console.log('mode -> none (reset)');
"
rm -f "$F"