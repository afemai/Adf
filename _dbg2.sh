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
echo "hex 10142B count: $(grep -c '10142B' _qa_n.html)"
echo "hex F5C518 count: $(grep -c 'F5C518' _qa_n.html)"
echo "navy-900 values:"; grep -o '\-\-color-navy-900: [^;]*' _qa_n.html | sort | uniq -c
echo "brand-primary values:"; grep -o '\-\-brand-primary: [^;]*' _qa_n.html | sort | uniq -c
echo "css vars total:"; grep -c '\-\-color-navy-900' _qa_n.html
rm -f _qa_n.html
node -e "
const fs=require('fs');
const d=JSON.parse(fs.readFileSync('data/site_data.json','utf8'));
d.settings.seasonal.mode='none';
fs.writeFileSync('data/site_data.json',JSON.stringify(d,null,2));
"