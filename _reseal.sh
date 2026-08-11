#!/bin/bash
# Re-seed local store and verify the admin password hash.
set -u
cd /c/Users/LENOVO/Documents/adf-repo
rm -f data/site_data.json
curl -s -o /dev/null --max-time 60 http://localhost:3000/
node -e "
const bcrypt = require('bcryptjs');
const d = require('./data/site_data.json');
console.log('hash ok:', bcrypt.compareSync('Afemai2026!', String(d.settings.adminPasswordHash)));
console.log('orgName:', d.general.orgName);
"