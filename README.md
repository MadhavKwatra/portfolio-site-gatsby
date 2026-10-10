<div align="center">
  <img alt="Logo" src="https://github.com/MadhavKwatra/portfolio-site-gatsby/blob/main/src/images/logo.png?raw=true" width="100" />
</div>
<h1 align="center">
  Portfolio Site
</h1>
<p align="center">
  My personal website at <a href="https://madhavkwatra.in" target="_blank">madhavkwatra.in</a> built with <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a> and hosted with <a href="https://www.netlify.com/" target="_blank">Netlify</a>
</p>
<p align="center">
  <a href="https://app.netlify.com/sites/madhavkwatra/deploys" target="_blank">
    <img src="https://api.netlify.com/api/v1/badges/5dbe7cfa-ac77-4326-af9f-b36bead3e61f/deploy-status" alt="Netlify Status" />
  </a>
</p>

![demo](https://github.com/MadhavKwatra/portfolio-site-gatsby/blob/main/src/images/demo.png?raw=true)

## 🚨 Forking this repo (please read!)

Yes, you can fork this repo. Please give proper credit to the original author by linking back to [brittanychiang.com](https://brittanychiang.com). Better would be fork this directly from their Repo. Or just use mine. As you wish.

Thanks!

## 🛠 Installation & Set Up

1. Install the Gatsby CLI

   ```sh
   npm install -g gatsby-cli
   ```

2. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm)

   ```sh
   nvm install
   ```

3. Install dependencies

   ```sh
   npm install
   ```

4. Start the development server

   ```sh
   npm start
   ```

## 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
   npm run build
   ```

1. Preview the site as it will appear once deployed

   ```sh
   npm run serve
   ```

## 📈 Analytics

- **Simple Analytics** (`gatsby-plugin-simple-analytics`) is cookieless and always on.
- **Google Analytics 4** and **Microsoft Clarity** set cookies. Logic in `src/utils/analytics.js`, UI in `src/components/cookieBanner.js`, settings in `src/config.js` → `analytics`:
  - **EEA, UK and Switzerland** need opt-in consent. There, an _Accept / Decline_ banner shows, and both tools load only after _Accept_.
  - **Everywhere else**, a notice with an opt-out is enough. Both tools load at once, with a _Got it / Opt out_ notice.
  - The region is guessed from the device time zone (a static site has no IP lookup). As a safety net by IP, Google denies analytics cookies for `consentRegions` until consent, and Clarity does the same by itself for EEA/UK/CH.
  - Visitors can change their choice on `/privacy`.
- To turn a tool off, empty its ID in `src/config.js`. With both IDs empty, no banner shows.

One-time settings in the tools themselves:

- **GA4**: Admin → Data collection and modification → **Data retention** → set event data retention to **14 months**. The default is 2 months, and the change is not retroactive. Leave **Enhanced measurement** on: it tracks page changes, outbound clicks, file downloads (resume) and scrolling.
- **Clarity**: no extra setup is needed. Recordings are kept for 30 days and heatmaps for 13 months.

> Revisit around **May 2027**, when the main duties of India's DPDP Rules start. Analytics cookies may then need consent in India too; add `'IN'` to `consentRegions` and Indian time zones to the consent check if so.

## 📄 Resume

`static/resume.pdf` is generated from [`resume/resume.html`](resume/resume.html) (the `resume/` folder is not published). Edit the HTML, then print it with headless Microsoft Edge from the repo root:

```sh
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu --no-pdf-header-footer   --print-to-pdf="$(cygpath -w "$PWD/static/resume.pdf")"   "file:///$(cygpath -m "$PWD/resume/resume.html" | sed 's/ /%20/g')"
```

Check that it is still one page, `grep -a -o '/Count [0-9]*' static/resume.pdf` must print `/Count 1`, and that it reads in order: `pdftotext -layout static/resume.pdf -`.

## 🎨 Color Reference

| Color          | Hex       |
| -------------- | --------- |
| Navy           | `#0a192f` |
| Light Navy     | `#112240` |
| Lightest Navy  | `#233554` |
| Slate          | `#8892b0` |
| Light Slate    | `#a8b2d1` |
| Lightest Slate | `#ccd6f6` |
| White          | `#e6f1ff` |
| Green          | `#64ffda` |
