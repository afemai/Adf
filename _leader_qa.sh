#!/bin/bash
# Prove leadership photos + role names are admin-editable end to end.
set -u
BASE="http://localhost:3000"
TMPD="_qa_tmp"
JAR="$TMPD/c.txt"
rm -rf "$TMPD"; mkdir -p "$TMPD"
PASS=0; FAIL=0
ok(){ echo "PASS  $1"; PASS=$((PASS+1)); }
no(){ echo "FAIL  $1 -- $2"; FAIL=$((FAIL+1)); }

curl -s -c "$JAR" -X POST "$BASE/api/admin/login" -H "Content-Type: application/json" -d '{"password":"Afemai2026!"}' -o /dev/null -w "%{http_code}" > "$TMPD/lc"
[ "$(cat $TMPD/lc)" = "200" ] && ok "login" || no "login" "$(cat $TMPD/lc)"

# current leader l1
curl -s -b "$JAR" "$BASE/api/content" -o "$TMPD/before.json"
NAME=$(node -e "const d=require('./_qa_tmp/before.json');const l=d.leadership.leaders.find(x=>x.id==='l1');console.log(l.name)")
ok "l1 currently: $NAME" 

# change title + photo for l1 via the admin content API
curl -s -b "$JAR" -X POST "$BASE/api/content" -H "Content-Type: application/json" \
  -d '{"leadership":{"leaders":[{"id":"l1","name":"Cmrd. John Aidenomo Idogho","title":"QA CHANGED TITLE","email":"idoghojohn93@gmail.com","phone":"+234 803 360 4406","bio":"QA test bio","image":"/images/leader-3.jpg","honorRoll":false,"order":1}]}}' \
  -o /dev/null -w "%{http_code}" > "$TMPD/sc"
[ "$(cat $TMPD/sc)" = "200" ] && ok "POST title+photo change" || no "POST" "$(cat $TMPD/sc)"

# does the public leadership page show the new title?
curl -s "$BASE/leadership" -o "$TMPD/pub.html"
grep -q "QA CHANGED TITLE" "$TMPD/pub.html" && ok "public page shows new role title" || no "public page title" "not found"
grep -q "leader-3.jpg" "$TMPD/pub.html" && ok "public page shows new photo (leader-3.jpg)" || no "public page photo" "not found"

# restore the original title/photo
curl -s -b "$JAR" -X POST "$BASE/api/content" -H "Content-Type: application/json" \
  -d '{"leadership":{"leaders":[{"id":"l1","name":"Cmrd. John Aidenomo Idogho","title":"President-General & Chairman, Board of Trustees","email":"idoghojohn93@gmail.com","phone":"+234 803 360 4406","bio":"Chairman of the Board of Trustees and President-General of the Forum, leading the drive for Afemai unity, education and economic development.","image":"","honorRoll":false,"order":1}]}}' \
  -o /dev/null -w "%{http_code}" > "$TMPD/rc"
[ "$(cat $TMPD/rc)" = "200" ] && ok "restored original" || no "restore" "$(cat $TMPD/rc)"
curl -s "$BASE/leadership" -o "$TMPD/pub2.html"
grep -q "QA CHANGED TITLE" "$TMPD/pub2.html" && no "restore verified" "still shows test title" || ok "test title reverted"

echo ""
echo "==== LEADERSHIP EDITABILITY: $PASS pass / $FAIL fail ===="
exit $FAIL