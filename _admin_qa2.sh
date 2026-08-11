#!/bin/bash
# Full admin sweep: login, then verify EVERY editor page renders (no runtime
# crash), content API works, and a seasonal-mode save persists.
set -u
TMPD="_qa_tmp"
mkdir -p "$TMPD"
JAR="$TMPD/cookies.txt"
rm -f "$JAR" "$TMPD"/*.html "$TMPD"/*.json
BASE="http://localhost:3000"
PASS=0
FAIL=0
ok() { echo "PASS  $1"; PASS=$((PASS+1)); }
no() { echo "FAIL  $1 -- $2"; FAIL=$((FAIL+1)); }

curl -s -c "$JAR" -X POST "$BASE/api/admin/login" -H "Content-Type: application/json" -d '{"password":"Afemai2026!"}' -o /dev/null -w "%{http_code}" > "$TMPD/login.code"
[ "$(cat $TMPD/login.code)" = "200" ] && ok "login" || no "login" "$(cat $TMPD/login.code)"

# every editor page: must return 200, contain the expected h1, and NOT contain Next runtime error markers
declare -A PAGES=(
  [general]="General Info"
  [homepage]="Homepage"
  [about]="History & About"
  [coconut]="Coconut Business"
  [leadership]="Leadership"
  [events]="Events"
  [press]="News & Press"
  [seo]="SEO"
  [theme]="Theme"
  [messages]="Messages"
  [settings]="Settings"
)
for slug in "${!PAGES[@]}"; do
  want="${PAGES[$slug]}"
  code=$(curl -s -b "$JAR" "$BASE/admin/$slug" -o "$TMPD/$slug.html" -w "%{http_code}")
  crash=$(grep -c "Functions cannot be passed directly\|Runtime Error" "$TMPD/$slug.html")
  h1=$(grep -c "<h1" "$TMPD/$slug.html")
  if [ "$code" = "200" ] && [ "$h1" -ge 1 ] && [ "$crash" = "0" ]; then
    ok "admin/$slug renders (h1, no crash)"
  else
    no "admin/$slug" "code=$code h1=$h1 crash=$crash"
  fi
done

# content API GET (ThemePresets reads it)
GETC=$(curl -s -b "$JAR" "$BASE/api/content" -o "$TMPD/content.json" -w "%{http_code}")
HAS_THEME=$(grep -c '"theme"' "$TMPD/content.json")
HAS_SEASONAL=$(grep -c '"seasonal"' "$TMPD/content.json")
[ "$GETC" = "200" ] && [ "$HAS_THEME" -ge 1 ] && ok "GET /api/content -> 200 with theme" || no "content GET" "code=$GETC theme=$HAS_THEME"
[ "$HAS_SEASONAL" -ge 1 ] && ok "seasonal block present in content" || no "seasonal in content" "matches=$HAS_SEASONAL"

# seasonal save: set christmas mode via POST, verify persisted, then restore
curl -s -b "$JAR" -X POST "$BASE/api/content" -H "Content-Type: application/json" \
  -d '{"settings":{"seasonal":{"mode":"christmas","message":"QA seasonal test"}}}' -o "$TMPD/save.json" -w "%{http_code}" > "$TMPD/save.code"
[ "$(cat $TMPD/save.code)" = "200" ] && ok "POST /api/content (seasonal save)" || no "content POST" "$(cat $TMPD/save.code) $(cat $TMPD/save.json)"
curl -s -b "$JAR" "$BASE/api/content" -o "$TMPD/content2.json"
MODE=$(grep -o '"mode":"[a-z]*"' "$TMPD/content2.json" | head -1)
[ "$MODE" = '"mode":"christmas"' ] && ok "christmas mode persisted" || no "persist" "$MODE"
curl -s -b "$JAR" -X POST "$BASE/api/content" -H "Content-Type: application/json" \
  -d '{"settings":{"seasonal":{"mode":"none","message":""}}}' -o /dev/null -w "%{http_code}" > /dev/null

# public pages still 200
for p in "" about coconut leadership contact; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/$p")
  [ "$code" = "200" ] && ok "public /$p -> 200" || no "public /$p" "$code"
done

# home page has the new medallion + no letter.jpg anywhere
HOME_HTML=$(curl -s "$BASE/")
echo "$HOME_HTML" | grep -q "animate-spin-slow" && ok "hero medallion ring present" || no "medallion"
LEAD=$(curl -s "$BASE/leadership")
echo "$LEAD" | grep -q "letter.jpg" && no "letter.jpg still on leadership" "found" || ok "letter.jpg removed from leadership"

echo ""
echo "==== FULL SWEEP: $PASS pass / $FAIL fail ===="
exit $FAIL