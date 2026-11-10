// Usage: node tools/checks/phonerecap-pages.js [baseUrl] [shotDir]
// Checks /phonerecap/ and /phonerecap/thanks/: no outside requests, no cookies, no
// console errors, no sideways scroll, images load, Google Play badge link (no tester form since
// 2026-11-07), readable without JS.
// Needs Microsoft Edge and `npm install` in tools/checks. Screenshots go to the
// git-ignored scratch/screenshots/ unless shotDir is given.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const repo = path.resolve(__dirname, '../..');
const [base = 'http://localhost:9000', shotDir = path.join(repo, 'scratch/screenshots')] =
  process.argv.slice(2);
fs.mkdirSync(shotDir, { recursive: true });
const PLAY_LEGAL_TEXT = 'Google Play and the Google Play logo are trademarks of Google LLC.';
const PLAY_ID = 'play.google.com/store/apps/details?id=com.madhavkwatra.phonerecap';
const PAGES = [
  {
    url: '/phonerecap/',
    name: 'landing',
    mustSee: ['Get PhoneRecap', 'Private by design', 'Questions', PLAY_LEGAL_TEXT],
  },
  { url: '/phonerecap/thanks/', name: 'thanks', mustSee: ['The test is done', PLAY_LEGAL_TEXT] },
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

        const play = await page.evaluate(id => {
          const links = [...document.querySelectorAll('a.play-badge')];
          return {
            n: links.length,
            ok: links.every(
              a => a.href.includes(id) && a.querySelector('img[alt="Get it on Google Play"]'),
            ),
            forms: document.querySelectorAll('form').length,
          };
        }, PLAY_ID);
        check(play.n > 0 && play.ok, `${tag}: Google Play badge links ${JSON.stringify(play)}`);
        check(play.forms === 0, `${tag}: no forms (tester form removed)`);

        // Link preview + tab title: the launch image (v2, "Now on Google Play"), no tester-era words.
        const meta = await page.evaluate(() => ({
          title: document.title,
          og: document.querySelector('meta[property="og:image"]')?.content || '',
          tw: document.querySelector('meta[name="twitter:image"]')?.content || '',
          desc: document.querySelector('meta[name="description"]')?.content || '',
        }));
        check(
          meta.og.endsWith('/phonerecap-og-v2.jpg') && meta.tw === meta.og,
          `${tag}: og/twitter image = phonerecap-og-v2.jpg (${meta.og})`,
        );
        check(
          !/joining the|tester list|join the (android )?test/i.test(`${meta.title} ${meta.desc}`),
          `${tag}: title/description not tester-era (${meta.title})`,
        );

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
