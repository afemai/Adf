#!/bin/bash
# Seasonal mode via the REAL admin save path (busts the cache like a user would).
set -u
cd /c/Users/LENOVO/Documents/adf-repo
TMPD="_qa_tmp"
JAR="$TMPD/c.txt"
rm -rf "$TMPD"; mkdir -p "$TMPD"
F="$TMPD/p.html"

curl -s -c "$JAR" -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" -d '{"password":"Afemai2026!"}' -o /dev/null -w "login: %{http_code}\n"

set_mode() {
  curl -s -b "$JAR" -X POST http://localhost:3000/api/content \
    -H "Content-Type: application/json" \
    -d "{\"settings\":{\"seasonal\":{\"mode\":\"$1\"}}}" -o "$TMPD/save.json" -w "save($1): %{http_code} "
  sleep 1
  curl -s --max-time 60 http://localhost:3000/ -o "$F"
  echo "| $2 -> $(grep -c "$2" "$F") | $3 -> $(grep -c "$3" "$F") | $4 -> $(grep -c "$4" "$F")"
}

echo "--- christmas ---"
set_mode christmas "6E1423" "logo-christmas" "Merry Christmas"
echo "--- newyear ---"
set_mode newyear "10142B" "logo-newyear" "Happy New Year"
echo "--- easter ---"
set_mode easter "4A2C6D" "logo-easter" "Happy Easter"
echo "--- independence ---"
set_mode independence "0B3D2E" "logo-independence" "Independence Day"

curl -s -b "$JAR" -X POST http://localhost:3000/api/content \
  -H "Content-Type: application/json" -d '{"settings":{"seasonal":{"mode":"none"}}}' -o /dev/null -w "reset: %{http_code}\n"
rm -rf "$TMPD"