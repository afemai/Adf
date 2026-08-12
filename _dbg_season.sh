#!/bin/bash
set -u
cd /c/Users/LENOVO/Documents/adf-repo
node -e "
const fs=require('fs');
const d=JSON.parse(fs.readFileSync('data/site_data.json','utf8'));
d.settings.seasonal.mode='newyear';
fs.writeFileSync('data/site_data.json',JSON.stringify(d,null,2));
"
sleep 1
curl -s --max-time 60 http://localhost:3000/ -o _qa_n.html
echo "--- style tag (theme injector) ---"
grep -o 'style[^>]*>.*</style>' _qa_n.html | head -c 400
echo ""
echo "--- seasonal logo refs ---"
grep -o 'logo-[a-z]*' _qa_n.html | sort | uniq -c
echo "--- ribbon text present? ---"
grep -o 'Happy New Year\|Merry Christmas\|seasonal\|New Year' _qa_n.html | sort | uniq -c | head -5
echo "--- season select value in SSR ---"
grep -o 'seasonalMode[^,]*' _qa_n.html | head -2
rm -f _qa_n.html
node -e "
const fs=require('fs');
const d=JSON.parse(fs.readFileSync('data/site_data.json','utf8'));
d.settings.seasonal.mode='none';
fs.writeFileSync('data/site_data.json',JSON.stringify(d,null,2));
"