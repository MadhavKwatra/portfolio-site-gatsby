// Usage: node tools/checks/legal-pages.js [baseUrl] [shotDir]
// Checks the PhoneRecap legal pages: same words as the markdown, no tracker
// requests, no cookies, no console errors, readable without JS, no sideways scroll.
// Needs Microsoft Edge and `npm install` in tools/checks. Screenshots go to the
// git-ignored scratch/screenshots/ unless shotDir is given.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const repo = path.resolve(__dirname, '../..');
const [base = 'http://localhost:9000', shotDir = path.join(repo, 'scratch/screenshots')] =
  process.argv.slice(2);
fs.mkdirSync(shotDir, { recursive: true });
const PAGES = [
  {
    url: '/phonerecap/privacy/',
    md: 'content/legal/phonerecap/privacy-policy.md',
    name: 'privacy',
  },
  { url: '/phonerecap/terms/', md: 'content/legal/phonerecap/terms-of-use.md', name: 'terms' },
];
const TRACKERS = /google|gtag|clarity\.ms|simpleanalytics|api\.github\.com|doubleclick/i;

const words = s => s.replace(/\s+/g, ' ').trim();
const mdText = file =>
  words(
    fs
      .readFileSync(path.join(repo, file), 'utf8')
      .replace(/^#+ /gm, '')
      .replace(/^- /gm, '')
      .replace(/^\d+\. /gm, '')
      .replace(/\*\*/g, '')
      .replace(/(^|\s)_|_(\s|$)/gm, '$1$2'),
  );

let failed = false;
const check = (ok, label) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok) {
    failed = true;
  }
};

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  for (const p of PAGES) {
    const expected = mdText(p.md);

    for (const js of [true, false]) {
      for (const [w, h] of [
        [375, 812],
        [1440, 900],
      ]) {
        const ctx = await browser.newContext({
          viewport: { width: w, height: h },
          javaScriptEnabled: js,
        });
        const page = await ctx.newPage();
        const external = [];
        const errors = [];
        page.on('request', r => {
          if (!r.url().startsWith(base)) {
            external.push(r.url());
          }
        });
        page.on('console', m => m.type() === 'error' && errors.push(m.text()));
        page.on('pageerror', e => errors.push(e.message));

        const res = await page.goto(base + p.url, { waitUntil: 'load' });
        await page.waitForTimeout(4000);
        const tag = `${p.name} js=${js ? 'on' : 'off'} ${w}px`;

        const text = words(await page.locator('#content').innerText());
        check(res.status() === 200, `${tag}: status ${res.status()}`);
        check(text === expected, `${tag}: text matches markdown`);
        if (text !== expected) {
          const i = [...text].findIndex((c, k) => c !== expected[k]);
          console.log(`   page: ...${text.slice(i - 40, i + 40)}`);
          console.log(`   md:   ...${expected.slice(i - 40, i + 40)}`);
        }
        check(external.length === 0, `${tag}: no outside requests ${external.join(' ')}`);
        check(!external.some(u => TRACKERS.test(u)), `${tag}: no tracker requests`);
        check((await ctx.cookies()).length === 0, `${tag}: no cookies`);
        check(errors.length === 0, `${tag}: no console errors ${errors.join(' | ')}`);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
        );
        check(!overflow, `${tag}: no sideways scroll`);
        check(
          !(await page.getByText('Accept', { exact: true }).count()),
          `${tag}: no cookie banner`,
        );

        await page.screenshot({
          path: path.join(shotDir, `phonerecap-${p.name}-${w}-js${js ? 'on' : 'off'}.png`),
          fullPage: true,
        });
        await ctx.close();
      }
    }
  }

  await browser.close();
  console.log(failed ? '\nSOME CHECKS FAILED' : '\nALL CHECKS PASSED');
  process.exit(failed ? 1 : 0);
})();
