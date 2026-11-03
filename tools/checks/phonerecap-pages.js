// Usage: node tools/checks/phonerecap-pages.js [baseUrl] [shotDir]
// Checks /phonerecap/ and /phonerecap/thanks/: no outside requests, no cookies, no
// console errors, no sideways scroll, images load, form markup, readable without JS.
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
    url: '/phonerecap/',
    name: 'landing',
    mustSee: ['Join the test', 'Private by design', 'Questions'],
  },
  { url: '/phonerecap/thanks/', name: 'thanks', mustSee: ['You’re on the list'] },
];

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
    for (const js of [true, false]) {
      for (const [w, h] of [
        [360, 780],
        [768, 1024],
        [1440, 900],
      ]) {
        const ctx = await browser.newContext({
          viewport: { width: w, height: h },
          javaScriptEnabled: js,
        });
        const page = await ctx.newPage();
        const external = [];
        const errors = [];
        const failedReq = [];
        page.on('request', r => !r.url().startsWith(base) && external.push(r.url()));
        page.on('requestfailed', r => failedReq.push(r.url()));
        page.on('response', r => r.status() >= 400 && failedReq.push(`${r.status()} ${r.url()}`));
        page.on('console', m => ['error', 'warning'].includes(m.type()) && errors.push(m.text()));
        page.on('pageerror', e => errors.push(e.message));

        const res = await page.goto(base + p.url, { waitUntil: 'load' });
        // Scroll to the end so lazy images load. Mouse wheel, not a page timer:
        // timers never fire when JavaScript is off.
        const height = await page.evaluate(() => document.body.scrollHeight);
        for (let y = 0; y < height; y += 600) {
          await page.mouse.wheel(0, 600);
          await page.waitForTimeout(60);
        }
        await page.waitForTimeout(2500);
        const tag = `${p.name} js=${js ? 'on' : 'off'} ${w}px`;

        check(res.status() === 200, `${tag}: status ${res.status()}`);
        const text = await page.locator('body').innerText();
        for (const s of p.mustSee) {
          check(text.toLowerCase().includes(s.toLowerCase()), `${tag}: shows "${s}"`);
        }
        check(external.length === 0, `${tag}: no outside requests ${external.join(' ')}`);
        check(failedReq.length === 0, `${tag}: no failed requests ${failedReq.join(' ')}`);
        check((await ctx.cookies()).length === 0, `${tag}: no cookies`);
        check(errors.length === 0, `${tag}: no console errors/warnings ${errors.join(' | ')}`);
        const overflow = await page.evaluate(() => {
          const d = document.documentElement;
          const wide = [...document.querySelectorAll('body *')]
            .filter(el => {
              const r = el.getBoundingClientRect();
              return r.right > d.clientWidth + 1 && !el.closest('.strip');
            })
            .map(el => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 60));
          return { scroll: d.scrollWidth > d.clientWidth, wide: wide.slice(0, 5) };
        });
        check(!overflow.scroll, `${tag}: no sideways scroll ${overflow.wide.join(', ')}`);
        const broken = await page.evaluate(() =>
          [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src),
        );
        check(broken.length === 0, `${tag}: all images loaded ${broken.join(' ')}`);
        const noAlt = await page.evaluate(
          () => [...document.images].filter(i => !i.hasAttribute('alt')).length,
        );
        check(noAlt === 0, `${tag}: every image has alt`);

        if (p.name === 'landing') {
          const form = await page.evaluate(() => {
            const f = document.querySelector('form[name="phonerecap-testers"]');
            if (!f) {
              return null;
            }
            return {
              method: f.method,
              action: f.getAttribute('action'),
              netlify: f.getAttribute('data-netlify'),
              formName: f.querySelector('input[name="form-name"]')?.value,
              emailRequired: f.querySelector('input[name="email"]')?.required,
              consentRequired: f.querySelector('input[name="consent"]')?.required,
              honeypotHidden: f.querySelector('input[name="bot-field"]')?.offsetParent === null,
            };
          });
          check(
            form &&
              form.method === 'post' &&
              form.action === '/phonerecap/thanks/' &&
              form.netlify === 'true' &&
              form.formName === 'phonerecap-testers' &&
              form.emailRequired &&
              form.consentRequired &&
              form.honeypotHidden,
            `${tag}: form markup ${JSON.stringify(form)}`,
          );
        }

        await page.screenshot({
          path: path.join(shotDir, `phonerecap-${p.name}-${w}-js${js ? 'on' : 'off'}.png`),
          fullPage: true,
        });
        await ctx.close();
      }
    }
  }

  // Home page card: links to /phonerecap/ with a plain link (full page load)
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/`, { waitUntil: 'load' });
  await page.waitForTimeout(6000);
  const card = await page.evaluate(() =>
    [...document.querySelectorAll('#projects a, section a')]
      .filter(a => a.getAttribute('href') === '/phonerecap/')
      .map(a => ({ text: a.textContent.trim(), target: a.target })),
  );
  check(card.length > 0, `home: links to /phonerecap/ ${JSON.stringify(card)}`);
  const firstFeatured = await page.evaluate(
    () => document.querySelector('#projects h3, [id] li h3')?.textContent,
  );
  console.log(`      home: first featured title = ${firstFeatured}`);
  await ctx.close();

  await browser.close();
  console.log(failed ? '\nSOME CHECKS FAILED' : '\nALL CHECKS PASSED');
  process.exit(failed ? 1 : 0);
})();
