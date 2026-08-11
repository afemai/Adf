#!/bin/bash
# Local verification: spelling, hero video, seasonal logo + palette.
set -u
BASE="http://localhost:3000"
F="_qa_v.html"
rm -f "$F"

curl -s --max-time 60 "$BASE/" -o "$F"
echo "--- HOME ---"
echo "Afemai Descendants Forum: $(grep -c 'Afemai Descendants Forum' "$F")"
echo "Afemhai (want 0): $(grep -c 'Afemhai' "$F")"
echo "Lucky Ohimai: $(grep -c 'Lucky Ohimai' "$F")"
echo "Luchy (want 0): $(grep -c 'Luchy' "$F")"
echo "hero video tag: $(grep -c 'plantation-drone' "$F")"
echo "jsonld org: $(grep -c 'application/ld+json' "$F")"

rm -f "$F"
echo "--- DONE ---"