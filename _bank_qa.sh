#!/bin/bash
# Verify bank accounts render on the right pages.
set -u
cd /c/Users/LENOVO/Documents/adf-repo
curl -s --max-time 60 http://localhost:3000/ -o _qa_b.html
echo "home Moniepoint: $(grep -c '3000221559' _qa_b.html) (want 1)"
echo "home UBA: $(grep -c '1027528160' _qa_b.html) (want 0)"
echo "home Support section: $(grep -c 'Support the Forum' _qa_b.html) (want 1)"
curl -s --max-time 60 http://localhost:3000/contact -o _qa_c.html
echo "contact UBA: $(grep -c '1027528160' _qa_c.html) (want 1)"
echo "contact Moniepoint: $(grep -c '3000221559' _qa_c.html) (want 0)"
rm -f _qa_b.html _qa_c.html