#!/bin/bash
# Deterministic admin-auth lifecycle test. No browser, no visuals.
# NOTE: use RELATIVE paths only — MSYS curl errors (exit 23) writing to /c/... absolutes.
set -u
TMPD="_qa_tmp"
mkdir -p "$TMPD"
JAR="$TMPD/cookies.txt"
rm -f "$JAR" "$TMPD"/*.json "$TMPD"/*.html
BASE="http://localhost:3000"
PASS=0
FAIL=0
ok() { echo "PASS  $1"; PASS=$((PASS+1)); }
no() { echo "FAIL  $1 -- $2"; FAIL=$((FAIL+1)); }

echo "=== 1. login ==="
LOGIN_CODE=$(curl -s -c "$JAR" -X POST "$BASE/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"password":"Afemai2026!"}' -o $TMPD/login.json -w "%{http_code}")
[ "$LOGIN_CODE" = "200" ] && ok "POST /api/admin/login -> 200" || no "POST /api/admin/login" "code=$LOGIN_CODE body=$(cat $TMPD/login.json)"

echo "=== 2. session check (authed) ==="
SES_CODE=$(curl -s -b "$JAR" "$BASE/api/admin/session" -o $TMPD/ses.json -w "%{http_code}")
SES_BODY=$(cat $TMPD/ses.json)
[ "$SES_CODE" = "200" ] && [[ "$SES_BODY" == *"authenticated\":true"* ]] \
  && ok "GET /api/admin/session -> authenticated" \
  || no "GET /api/admin/session" "code=$SES_CODE body=$SES_BODY"

echo "=== 3. dashboard (authed) ==="
DASH_CODE=$(curl -s -b "$JAR" "$BASE/admin" -o $TMPD/dash.html -w "%{http_code}")
HAS_H1=$(grep -c "<h1[^>]*>Dashboard" $TMPD/dash.html)
HAS_COCONUT=$(grep -c "Coconut products" $TMPD/dash.html)
HAS_LGA=$(grep -c "Local Government Areas" $TMPD/dash.html)
[ "$DASH_CODE" = "200" ] && [ "$HAS_H1" -ge 1 ] && ok "GET /admin -> 200 + Dashboard h1"
[ "$HAS_COCONUT" -ge 1 ] && ok "dashboard shows Coconut-products stat" || no "dashboard stat" "matches=$HAS_COCONUT"
[ "$HAS_LGA" -ge 1 ] && ok "dashboard shows LGA stat" || no "LGA stat" "matches=$HAS_LGA"

echo "=== 4. homepage editor ==="
HOME_CODE=$(curl -s -b "$JAR" "$BASE/admin/homepage" -o $TMPD/home.html -w "%{http_code}")
HAS_HERO=$(grep -c "Hero section" $TMPD/home.html)
HAS_PILLARS=$(grep -c "Pillars" $TMPD/home.html)
HAS_TEASER=$(grep -c "Coconut teaser" $TMPD/home.html)
[ "$HOME_CODE" = "200" ] && [ "$HAS_HERO" -ge 1 ] && ok "GET /admin/homepage -> 200 + Hero section editor"
[ "$HAS_PILLARS" -ge 1 ] && ok "homepage editor has Pillars section" || no "Pillars section" "matches=$HAS_PILLARS"
[ "$HAS_TEASER" -ge 1 ] && ok "homepage editor has Coconut teaser section" || no "Coconut teaser" "matches=$HAS_TEASER"

echo "=== 5. messages inbox ==="
INBOX_CODE=$(curl -s -b "$JAR" "$BASE/admin/messages" -o $TMPD/inbox.html -w "%{http_code}")
HAS_QA=$(grep -c "QA Tester" $TMPD/inbox.html)
[ "$INBOX_CODE" = "200" ] && ok "GET /admin/messages -> 200"
[ "$HAS_QA" -ge 1 ] && ok "inbox shows the QA Tester contact message" || no "inbox QA message" "matches=$HAS_QA"

echo "=== 6. logout ==="
LO_CODE=$(curl -s -b "$JAR" -c "$JAR" -X POST "$BASE/api/admin/logout" -o $TMPD/lo.json -w "%{http_code}")
[ "$LO_CODE" = "200" ] && ok "POST /api/admin/logout -> 200" || no "logout" "code=$LO_CODE"

echo "=== 7. session after logout (must not be authenticated) ==="
SES2_CODE=$(curl -s -b "$JAR" "$BASE/api/admin/session" -o $TMPD/ses2.json -w "%{http_code}")
SES2_BODY=$(cat $TMPD/ses2.json)
if [ "$SES2_CODE" = "401" ] || [[ "$SES2_BODY" == *"authenticated\":false"* ]]; then
  ok "session cleared after logout (401 or authenticated:false)"
else
  no "post-logout session" "code=$SES2_CODE body=$SES2_BODY"
fi

echo ""
echo "==== ADMIN AUTH LIFECYCLE: $PASS pass / $FAIL fail ===="
exit $FAIL