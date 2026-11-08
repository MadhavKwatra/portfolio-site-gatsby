# CLAUDE.md — madhavkwatra.in

Personal site of Madhav Kwatra. Gatsby 5 + React 18 + styled-components, hosted on Netlify.
Netlify deploys `main` to https://madhavkwatra.in and builds a deploy preview for each PR.
This repo is **public** (a fork of bchiang7/v4). Never commit private notes, prices, plans or personal data.

@private/CLAUDE.md

## Start here

- If `private/` exists (git-ignored, the owner's private notes repo): read `private/STATUS.md` and `private/TASKS.md` first.
- Update `private/STATUS.md` at the end of every round. Keep chat replies short; long analysis goes in `private/research/`.

## Commands

- Node 22.13.0 (`.nvmrc`), npm only.
- `npm run develop`: dev server at http://localhost:8000.
- `npm run build && npm run serve`: production build at http://localhost:9000. Use this for the owner's local review.
- `npm run format`: Prettier. Husky pre-commit runs lint-staged (Prettier + ESLint) on staged files.
- Husky pre-push runs `node tools/checks/legal-sync.js`, then `npm run build` unless only docs/tools changed. Skip once: `SKIP_PREPUSH=1 git push`.

## Layout

- Content: `content/featured/` (home page Work), `content/projects/` (archive), `content/jobs/` (Experience), `content/legal/phonerecap/`.
- Home sections: `src/components/sections/`. Pages: `src/pages/`. Site settings, socials, nav, analytics IDs: `src/config.js`.
- `resume/resume.html` → `static/resume.pdf` (headless Edge, see README). `static/llms.txt` describes PhoneRecap for AI tools.
- Temporary screenshots and helper scripts: `scratch/` (git-ignored). Never commit them.

## PhoneRecap pages (hard rules)

- Google Play and the app link to `/phonerecap/privacy/` and `/phonerecap/terms/`. These URLs (with the trailing slash) must never change. `/phonerecap/` and `/phonerecap/thanks/` stay too.
- `content/legal/phonerecap/*.md` is an exact copy of `docs/legal/*.md` in the PhoneRecap app repo (`../phone-wrapped-app`). Never edit it here; recopy, then run `node tools/checks/legal-sync.js`.
- All `/phonerecap/*` pages stay tracker-free: own layouts with no cookie banner, Simple Analytics removed in `gatsby-ssr.js` (`TRACKER_FREE_PATHS`) and `ignorePages` in `gatsby-config.js`. Keep both lists in sync.
- Links into and out of these pages are plain `<a>`, never Gatsby `Link`.
- PhoneRecap is live on Google Play (2026-11-07): `/phonerecap/` shows Google's official badge (`src/images/phonerecap/google-play-badge-en.png`, unchanged) linking to Play with a `referrer` tag, plus Google's legal line. The tester form (Netlify Forms) was removed then; its stored sign-ups must be deleted in Netlify by 2026-12-07 (promise on the page). Deploy previews add a Netlify review toolbar; it is not a site tracker.
- After any change there, run the browser checks on the local build (and on the live site after deploy):
  `npm install --prefix tools/checks` once, then `node tools/checks/legal-pages.js` and `node tools/checks/phonerecap-pages.js` (optional args: base URL, screenshot folder).

## Content rules

- Featured and Projects hold personal projects only. Employer and client work goes in Experience (`content/jobs/`) only.
- Every claim must be checkable against a link, a store listing or a repo. If facts conflict, ask the owner.

## Git

- Work on a feature branch. Never push until the owner has reviewed the site locally and says so (a push to `main` deploys the live site).
- One meaningful change per commit. Fold fix-ups into their commit before pushing (`git commit --fixup <sha>`, then `GIT_SEQUENCE_EDITOR=: git rebase -i --autosquash <base>`). Never rewrite pushed history without asking.
- Conventional prefixes: `feat:`, `fix:`, `content:`, `docs:`, `chore:`, `design:`.

## Cloud

- Ask the owner before publishing anything to Artifacts, Claude Docs or other cloud tools.
