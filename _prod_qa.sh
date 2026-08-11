#!/bin/bash
# Production verification for adf-site-seven.vercel.app (patient timeouts).
set -u
BASE="https://adf-site-seven.vercel.app"
TMPD="_qa_tmp"
mkdir -p "$TMPD"
PASS=0; FAIL=0
ok(){ echo "PASS  $1"; PASS=$((PASS+1)); }
no(){ echo "FAIL  $1 -- $2"; FAIL=$((FAIL+1)); }

for p in "" about coconut leadership contact sitemap.xml robots.txt admin/login; do
  code=$(curl -s -o "$TMPD/page.html" -w "%{http_code}" --max-time 120 "$BASE/$p")
  [ "$code" = "200" ] && ok "/$p -> 200" || no "/$p" "$code"
done

# content checks on the homepage
curl -s --max-time 120 "$BASE/" -o "$TMPD/home.html"
grep -q "Unity is Power" "$TMPD/home.html" && ok "home: motto present" || no "home motto"
grep -q "Coconut Oil" "$TMPD/home.html" && ok "home: marquee products present" || no "marquee"
grep -q "Ambassador of Afemai Land" "$TMPD/home.html" && ok "home: investiture spotlight present" || no "investiture"

# contact page: map + phones
curl -s --max-time 120 "$BASE/contact" -o "$TMPD/contact.html"
grep -q "google.com/maps" "$TMPD/contact.html" && ok "contact: Google Map embed present" || no "map embed"
grep -q "080 360 4406\|803 360 4406" "$TMPD/contact.html" && ok "contact: phone present" || no "phone"

# admin login flow on production
JAR="$TMPD/cookies.txt"
rm -f "$JAR"
code=$(curl -s -c "$JAR" -X POST "$BASE/api/admin/login" -H "Content-Type: application/json" -d '{"password":"Afemai2026!"}' -o "$TMPD/login.json" -w "%{http_code}" --max-time 120)
[ "$code" = "200" ] && ok "admin login -> 200" || no "admin login" "$code $(cat $TMPD/login.json 2>/dev/null)"
code=$(curl -s -b "$JAR" "$BASE/api/admin/session" -o "$TMPD/ses.json" -w "%{http_code}" --max-time 120)
grep -q '"authenticated":true' "$TMPD/ses.json" && ok "session authenticated" || no "session" "$(cat $TMPD/ses.json 2>/dev/null)"

# content API (public read)
code=$(curl -s "$BASE/api/content" -o "$TMPD/content.json" -w "%{http_code}" --max-time 120)
grep -q '"theme"' "$TMPD/content.json" && ok "content API works" || no "content API" "$code"

echo ""
echo "==== PRODUCTION: $PASS pass / $FAIL fail ===="
exit $FAIL