#!/bin/bash
# Verify every seasonal mode: palette color + logo + ribbon present, no crash.
set -u
cd /c/Users/LENOVO/Documents/adf-repo
P="data/site_data.json"
F="_qa_s.html"
PASS=0; FAIL=0

check() {
  node -e "
  const fs=require('fs');
  const d=JSON.parse(fs.readFileSync('$P','utf8'));
  d.settings.seasonal.mode='$1';
  fs.writeFileSync('$P',JSON.stringify(d,null,2));
  "
  sleep 1
  curl -s --max-time 60 http://localhost:3000/ -o "$F"
  local h=$(grep -c "$2" "$F")
  local l=$(grep -c "$3" "$F")
  local r=$(grep -c "$4" "$F")
  if [ "$h" -gt 0 ] && [ "$l" -gt 0 ] && [ "$r" -gt 0 ]; then
    echo "PASS  $1 (palette+logo+ribbon)"
    PASS=$((PASS+1))
  else
    echo "FAIL  $1 (palette=$h logo=$l ribbon=$r)"
    FAIL=$((FAIL+1))
  fi
}

check christmas   "6E1423" "logo-christmas" "Merry Christmas"
check newyear     "10142B" "logo-newyear"   "Happy New Year"
check easter      "4A2C6D" "logo-easter"    "Happy Easter"
check independence "0B3D2E" "logo-independence" "Independence Day"

node -e "
const fs=require('fs');
const d=JSON.parse(fs.readFileSync('$P','utf8'));
d.settings.seasonal.mode='none';
fs.writeFileSync('$P',JSON.stringify(d,null,2));
"
rm -f "$F"
echo "==== SEASONAL: $PASS pass / $FAIL fail ===="
exit $FAIL