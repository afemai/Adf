#!/bin/bash
# Remove unused imports flagged by eslint (safe, targeted deletions).
set -e
cd /c/Users/LENOVO/Documents/adf-repo

# contact page: 'gi' unused in a replace?  -> find and fix manually below
# coconut page: MessageCircle unused
sed -i 's/import { Play, Volume2, VolumeX, Maximize2 } from "lucide-react";/import { Play, Volume2, VolumeX, Maximize2 } from "lucide-react";/' "src/app/(site)/coconut/page.tsx"
grep -n "MessageCircle" "src/app/(site)/coconut/page.tsx" | head -2
grep -n "Clock" "src/app/(site)/contact/page.tsx" | head -2
grep -n "ShieldCheck" "src/app/admin/login/page.tsx" | head -2
grep -n "LogOut" "src/components/admin/AdminShell.tsx" | head -2
grep -n "cn" "src/components/admin/ThemePresets.tsx" | head -2
grep -n "seasonalMode" "src/components/layout/Footer.tsx" | head -3
grep -n "seasonalMode" "src/components/layout/Navbar.tsx" | head -3
grep -n "err" "src/app/api/upload/route.ts" | head -3
grep -n "'i'" "src/components/home/StatsBand.tsx" | head -3
echo "--- inspection done ---"