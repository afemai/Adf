#!/bin/bash
# Test admin image upload on production (needs the blob token wired).
set -u
BASE="https://adf-site-seven.vercel.app"
TMPD="_qa_tmp"
JAR="$TMPD/c.txt"
rm -rf "$TMPD"; mkdir -p "$TMPD"

# 1. login
curl -s -c "$JAR" -X POST "$BASE/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"password":"Afemai2026!"}' -o "$TMPD/login.json" -w "login: %{http_code}\n" --max-time 120

# 2. tiny test image
printf '\x89PNG\r\n\x1a\n' > "$TMPD/test.png"
head -c 500 /dev/urandom >> "$TMPD/test.png"

# 3. upload via the admin-authenticated route
curl -s -b "$JAR" -X POST "$BASE/api/upload" \
  -F "file=@$TMPD/test.png;type=image/png" \
  -o "$TMPD/upload.json" -w "upload: %{http_code}\n" --max-time 180
head -c 300 "$TMPD/upload.json"; echo