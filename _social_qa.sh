#!/bin/bash
set -u
BASE="http://localhost:3000"
TMPD="_qa_tmp"
JAR="$TMPD/c.txt"
rm -rf "$TMPD"; mkdir -p "$TMPD"
PASS=0; FAIL=0
ok(){ echo "PASS  $1"; PASS=$((PASS+1)); }
no(){ echo "FAIL  $1 -- $2"; FAIL=$((FAIL+1)); }

curl -s -c "$JAR" -X POST "$BASE/api/admin/login" -H "Content-Type: application/json" -d '{"password":"Afemhai2026!"}' -o /dev/null -w "%{http_code}" > "$TMPD/login.code"
[ "$(cat $TMPD/login.code)" = "200" ] && ok "login" || no "login"

# 1. set junk social
curl -s -b "$JAR" -X POST "$BASE/api/content" -H "Content-Type: application/json" \
  -d '{"general":{"socials":{"facebook":"https://facebook.com/test","instagram":"","twitter":"","youtube":"","whatsapp":""}}}' \
  -o /dev/null -w "%{http_code}" > "$TMPD/set.code"
[ "$(cat $TMPD/set.code)" = "200" ] && ok "POST socials (set)" || no "set socials" "$(cat $TMPD/set.code)"

# 2. verify present
curl -s -b "$JAR" "$BASE/api/content" -o "$TMPD/c1.json"
grep -q "https://facebook.com/test" "$TMPD/c1.json" && ok "social persisted" || no "persist" "$(head -c 120 $TMPD/c1.json)"

# 3. delete (clear) like the user did
curl -s -b "$JAR" -X POST "$BASE/api/content" -H "Content-Type: application/json" \
  -d '{"general":{"socials":{"facebook":"","instagram":"","twitter":"","youtube":"","whatsapp":""}}}' \
  -o /dev/null -w "%{http_code}" > "$TMPD/clr.code"
[ "$(cat $TMPD/clr.code)" = "200" ] && ok "POST socials (clear)" || no "clear socials" "$(cat $TMPD/clr.code)"

# 4. verify gone
curl -s -b "$JAR" "$BASE/api/content" -o "$TMPD/c2.json"
grep -q '"facebook":""' "$TMPD/c2.json" && ok "social cleared after delete" || no "cleared" "$(grep -o '"facebook":"[^"]*"' $TMPD/c2.json)"

echo ""
echo "==== SOCIALS SAVE/CLEAR: $PASS pass / $FAIL fail ===="
exit $FAIL