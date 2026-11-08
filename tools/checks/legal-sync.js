// Usage: node tools/checks/legal-sync.js
// The PhoneRecap legal pages must be an exact copy of the app repo's text, because
// Google Play links to them. This compares content/legal/phonerecap/*.md with the
// committed docs/legal/*.md in the app repo (line endings ignored).
// App repo: $PHONERECAP_APP_REPO, else the sibling folder ../phone-wrapped-app.
// Exit 0 = same (or app repo not found: SKIPPED), 1 = different.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const repo = path.resolve(__dirname, '../..');
const appRepo = process.env.PHONERECAP_APP_REPO || path.resolve(repo, '../phone-wrapped-app');
const FILES = ['privacy-policy.md', 'terms-of-use.md'];

const lf = s => s.replace(/\r\n/g, '\n');

if (!fs.existsSync(path.join(appRepo, '.git'))) {
  console.log(`legal-sync: SKIPPED, app repo not found at ${appRepo}`);
  process.exit(0);
}

let failed = false;
for (const file of FILES) {
  const ours = lf(fs.readFileSync(path.join(repo, 'content/legal/phonerecap', file), 'utf8'));
  let theirs;
  try {
    theirs = lf(
      execFileSync('git', ['-C', appRepo, 'show', `HEAD:docs/legal/${file}`], { encoding: 'utf8' }),
    );
  } catch (e) {
    console.log(`FAIL  ${file}: cannot read HEAD:docs/legal/${file} in ${appRepo}`);
    failed = true;
    continue;
  }
  if (ours === theirs) {
    console.log(`PASS  ${file} matches the app repo`);
  } else {
    const i = [...ours].findIndex((c, k) => c !== theirs[k]);
    const line = ours.slice(0, i).split('\n').length;
    console.log(`FAIL  ${file} differs from the app repo (first change near line ${line})`);
    console.log(`   site: ...${JSON.stringify(ours.slice(Math.max(0, i - 30), i + 30))}`);
    console.log(`   app:  ...${JSON.stringify(theirs.slice(Math.max(0, i - 30), i + 30))}`);
    failed = true;
  }
}

if (failed) {
  const branch = execFileSync('git', ['-C', appRepo, 'branch', '--show-current'], {
    encoding: 'utf8',
  }).trim();
  console.log(
    `\nApp repo is on branch "${branch}". Copy its docs/legal/ files, or check that branch.`,
  );
}
process.exit(failed ? 1 : 0);
