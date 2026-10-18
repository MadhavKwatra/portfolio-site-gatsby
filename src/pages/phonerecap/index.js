import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { phoneRecapLinks } from '@config';
import { PhoneRecapLayout, Seo } from '@components';
import { DM_LINKS, JoinBox, TesterMail, Why, stickerButton } from '@components/phoneRecapJoin';

import buddyIcon from '@images/phonerecap/buddy-icon-128.png';
import storyTotal from '@images/phonerecap/story-total.jpg';
import storyTopApps from '@images/phonerecap/story-topApps.jpg';
import storyPersonality from '@images/phonerecap/story-personality.jpg';
import storySummary from '@images/phonerecap/story-summary.jpg';
import storyUnlocks from '@images/phonerecap/story-unlocks.jpg';
import yourPrivacy from '@images/phonerecap/your-privacy.jpg';
import homeScreen from '@images/phonerecap/home.jpg';

// The PhoneRecap product page: hero, "Private by design", screens, "Join the test"
// (3 steps, Gmail form in step 1) and FAQ. Approved mock: PhoneRecap repo,
// docs/design/prototypes/designs/portfolio-mock/page.html (layout A, join A).
// Tracker-free and works without JavaScript: the form is a plain Netlify POST.

const ONE_LINER =
  'PhoneRecap turns your phone use into a private yearly and monthly story, with cards you can share. Everything stays on your phone.';

const SCREENS = [
  {
    src: storyTotal,
    plain: 'Your phone year, as a story',
    sub: 'A recap of your year, card by card',
    alt: 'PhoneRecap story card showing 1,642 hours on the phone this year, with sample data',
  },
  {
    src: storyTopApps,
    plain: 'See where your time went',
    sub: 'Your most-used apps on a leaderboard',
    alt: 'Leaderboard card ranking the five most-used apps of the year, sample data',
  },
  {
    src: storyPersonality,
    plain: 'Meet your phone personality',
    sub: 'A fun read on your habits, not a judgement',
    alt: 'Personality card naming the sample user The Night Scroller',
  },
  {
    src: storySummary,
    plain: 'Your season on one card',
    sub: 'Share it, or keep it to yourself',
    alt: 'Final season card with a podium of the three most-used apps and the yearly total',
  },
  {
    src: yourPrivacy,
    plain: 'It stays on your phone',
    sub: 'No account, no ads, no cloud',
    alt: 'Privacy screen listing what PhoneRecap reads and that it has no internet access',
  },
  {
    src: homeScreen,
    plain: 'Today at a glance',
    sub: 'Screen time, unlocks, data and alerts',
    alt: 'Home screen with today’s time in apps, unlocks, data use and alerts',
  },
];

const FAQ = [
  [
    'Does PhoneRecap need the internet?',
    'No. The app has no internet permission, so it can’t send anything off your phone.',
  ],
  [
    'What does it read?',
    'Android’s Usage access: which apps were open and for how long, unlocks, notification counts, and data use per app. Never messages, photos, contacts, location or what you type.',
  ],
  [
    'Is it like a year-in-review for my phone?',
    'Yes: a yearly and monthly story with cards you can share.',
  ],
  ['Which phones does it work on?', 'Android 10 or newer. No iPhone version yet.'],
  ['How do I delete my data?', 'Settings › Your data › Delete, in the app. Or uninstall the app.'],
  ['Who made it?', 'Madhav Kwatra, an indie developer in India.'],
];

// Line icons (stroke only)
const icon = paths => {
  const SvgIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {paths}
    </svg>
  );
  return SvgIcon;
};
const IconWifiOff = icon(
  <path d="m2 2 20 20M8.5 16.4a5 5 0 0 1 7 0M5 12.9a10 10 0 0 1 5.2-2.8M19 12.9a10 10 0 0 0-2.3-1.6M2 8.8a15 15 0 0 1 4.2-2.7M22 8.8A15 15 0 0 0 10.7 5M12 20h.01" />,
);
const IconNoUser = icon(
  <>
    <circle cx="9" cy="8" r="4" />
    <path d="M2 21v-1a6 6 0 0 1 10.5-4M16 15l5 5M21 15l-5 5" />
  </>,
);
const IconPhone = icon(
  <>
    <rect x="6" y="2" width="12" height="20" rx="2.5" />
    <path d="M10 6h4M10.5 14.5l1.2 1.2 2.3-2.6" />
  </>,
);
const IconLook = icon(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5M8.5 11l1.8 1.8L14 9.2" />
  </>,
);

const StyledHero = styled.section`
  container-type: inline-size;
  && {
    padding: 24px 0 40px;
  }

  .in {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    gap: 48px;
    align-items: center;
  }

  .eyebrow {
    margin: 0 0 22px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: 15px;
  }

  .lockup {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    margin: 0;

    img {
      width: 64px;
      height: 64px;
      border-radius: 15px;
    }
  }

  .wordmark {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    color: var(--cream2);
    font-family: var(--display);
    font-size: 38px;
    font-style: italic;
    font-weight: 800;
    line-height: 1;

    .mk {
      display: inline-block;
      margin-left: 0.07em;
      padding: 0.06em 0.16em 0.02em 0.08em;
      border: 0.07em solid var(--ink);
      border-radius: 0.12em;
      background-color: var(--tomato);
      color: var(--ink);
      line-height: 0.92;
      box-shadow: 0.08em 0.08em 0 var(--cream2);
      transform: rotate(-3deg);
    }
  }

  h1 {
    margin: 22px 0;
    font-size: clamp(38px, 6.4cqw, 66px);
    letter-spacing: -0.02em;
    line-height: 1.04;

    em {
      font-style: normal;
      color: var(--cream2);
      background: linear-gradient(transparent 62%, rgba(255, 79, 46, 0.55) 62%);
    }
  }

  .one {
    max-width: 540px;
    color: var(--light-slate);
    font-size: 19px;

    @media (max-width: 480px) {
      font-size: 17.5px;
    }
  }

  .acts {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px 22px;
    margin-top: 34px;
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 7px 14px 7px 11px;
    border: 2.5px solid var(--ink);
    border-radius: 999px;
    background-color: var(--sun);
    color: var(--ink);
    font-family: var(--font-mono);
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;

    i {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background-color: var(--ink);
      box-shadow: 0 0 0 3px rgba(11, 12, 15, 0.18);

      @media (prefers-reduced-motion: no-preference) {
        animation: pulse 2s infinite;
      }
    }

    @keyframes pulse {
      50% {
        box-shadow: 0 0 0 6px rgba(11, 12, 15, 0);
      }
    }
  }

  .join-btn {
    ${stickerButton};
    --shadow: var(--cream2);
  }

  .art {
    position: relative;
    width: 100%;
    max-width: 440px;
    margin-left: auto;
    aspect-ratio: 1 / 1.14;
    container-type: inline-size;

    .p {
      position: absolute;
      width: 44%;
    }
    .cut {
      --pw: 44cqw;
      box-shadow: 9px 9px 0 var(--cream2);
    }
    .p1 {
      left: 7%;
      top: 9%;
      transform: rotate(-8deg);
    }
    .p3 {
      right: 7%;
      top: 11%;
      transform: rotate(7deg);
    }
    .p2 {
      left: 28%;
      top: 0;
      z-index: 2;
      transform: rotate(-1deg);
    }
  }

  .badge {
    position: absolute;
    z-index: 3;
    left: 5%;
    bottom: 6%;
    padding: 6px 12px 5px;
    border: 3px solid var(--ink);
    border-radius: 14px;
    background-color: var(--sun);
    color: var(--ink);
    box-shadow: 5px 5px 0 var(--ink);
    transform: rotate(-7deg);

    .num {
      display: block;
      font-family: var(--display);
      font-size: clamp(28px, 10cqw, 44px);
      font-weight: 800;
      line-height: 0.9;
      letter-spacing: -0.01em;

      small {
        font-size: 0.5em;
      }
    }
    .lbl {
      font-family: var(--font-mono);
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  }

  @container (max-width: 620px) {
    .in {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .art {
      max-width: 400px;
      margin: 0 auto;
    }
  }
`;

// Frameless cut-out: the screen itself as a sticker
const StyledCut = styled.div`
  position: relative;
  width: var(--pw, 160px);
  aspect-ratio: 393 / 873;
  overflow: hidden;
  border: 4px solid var(--ink);
  border-radius: calc(var(--pw, 160px) * 0.07);
  background-color: #000;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;

const Cut = ({ src, alt, eager = false }) => (
  <StyledCut className="cut">
    <img src={src} alt={alt} width="540" height="1200" loading={eager ? 'eager' : 'lazy'} />
  </StyledCut>
);

Cut.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  eager: PropTypes.bool,
};

const StyledPrivacy = styled.section`
  .lead {
    max-width: 620px;
    margin: -12px 0 32px;
    color: var(--light-slate);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    display: grid;
    grid-template-columns: 46px minmax(0, 1fr);
    gap: 6px 18px;
    align-items: start;
    padding: 24px 24px 22px;
    border-radius: 6px;
    background-color: var(--light-navy);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);

    @media (max-width: 480px) {
      grid-template-columns: 40px minmax(0, 1fr);
      gap: 6px 14px;
      padding: 20px 18px;
    }
  }

  .ic {
    grid-row: 1 / span 2;
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border: 2.5px solid var(--ink);
    border-radius: 12px;
    background-color: var(--lime);
    color: var(--ink);

    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
    }

    svg {
      width: 24px;
      height: 24px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }

  h3 {
    margin: 2px 0 0;
    font-size: 19px;
  }

  .card p {
    margin: 0;
    font-size: 16px;
  }

  .crumb {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
    margin-top: 10px;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: 13px;

    span {
      padding: 3px 8px;
      border-radius: 4px;
      background-color: var(--lightest-navy);
    }
    b {
      color: var(--green);
      font-weight: 400;
    }
  }
`;

const StyledScreens = styled.section`
  .strip {
    display: flex;
    gap: 26px;
    margin: 0 -4px;
    padding: 6px 14px 26px 4px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    scrollbar-color: var(--dark-slate) transparent;
  }

  figure {
    flex: 0 0 auto;
    width: 160px;
    margin: 0;
    scroll-snap-align: start;

    @media (max-width: 480px) {
      width: 138px;
    }
  }

  .cut {
    --pw: 160px;
    box-shadow: 8px 8px 0 var(--cream2);

    @media (max-width: 480px) {
      --pw: 138px;
    }
  }

  figcaption {
    margin-top: 18px;
    color: var(--lightest-slate);
    font-size: 15px;
    line-height: 1.35;

    small {
      display: block;
      margin-top: 3px;
      color: var(--slate);
      font-size: 13.5px;
    }
  }

  .sample-note {
    margin-top: 4px;
    font-family: var(--font-mono);
    font-size: 12.5px;
  }
`;

const StyledJoin = styled.section`
  && {
    padding: 64px 0;
  }
`;

const StyledFaq = styled.section`
  .list {
    border-top: 1px solid var(--lightest-navy);
  }

  details {
    border-bottom: 1px solid var(--lightest-navy);
  }

  summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
    padding: 20px 2px;
    color: var(--lightest-slate);
    font-size: 18px;
    font-weight: 500;
    list-style: none;
    cursor: pointer;

    &::-webkit-details-marker {
      display: none;
    }
    &:after {
      content: '+';
      color: var(--green);
      font-family: var(--font-mono);
      font-size: 22px;
      line-height: 1;
      transition: transform 0.2s;
    }
    &:hover {
      color: var(--green);
    }
  }

  details[open] summary:after {
    transform: rotate(45deg);
  }

  .a {
    max-width: 680px;
    padding: 0 2px 22px;
    color: var(--light-slate);
    font-size: 17px;
  }

  .legal {
    margin-top: 26px;
    font-size: 16px;
  }
`;

const PrivacyCard = ({ Icon, title, text, children }) => (
  <div className="card">
    <span className="ic">
      <Icon />
    </span>
    <h3>{title}</h3>
    <div>
      <p>{text}</p>
      {children}
    </div>
  </div>
);

PrivacyCard.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const PhoneRecapPage = () => (
  <PhoneRecapLayout links={phoneRecapLinks.filter(({ url }) => url !== '/phonerecap/')}>
    <StyledHero aria-labelledby="h-title">
      <div className="in">
        <div>
          <p className="eyebrow">An Android app by Madhav Kwatra</p>
          <p className="lockup">
            <img
              src={buddyIcon}
              alt="PhoneRecap app icon: the Buddy+ mascot"
              width="64"
              height="64"
            />
            <span className="wordmark">
              Phone<span className="mk">Recap</span>
            </span>
          </p>
          <h1 id="h-title">
            Your phone year, <em>told as a story.</em>
          </h1>
          <p className="one">{ONE_LINER}</p>
          <div className="acts">
            <span className="status">
              <i aria-hidden="true" />
              Android · in testing
            </span>
            <a className="join-btn" href="#join">
              Join the test
            </a>
          </div>
        </div>

        <div className="art">
          <div className="p p1">
            <Cut src={storyPersonality} alt={SCREENS[2].alt} eager />
          </div>
          <div className="p p3">
            <Cut
              src={storyUnlocks}
              alt="Story card: 41,203 phone unlocks in a year, sample data"
              eager
            />
          </div>
          <div className="p p2">
            <Cut src={storyTotal} alt={SCREENS[0].alt} eager />
          </div>
          <div className="badge" aria-hidden="true">
            <span className="num">
              1,642<small> h</small>
            </span>
            <span className="lbl">sample year</span>
          </div>
        </div>
      </div>
    </StyledHero>

    <StyledPrivacy aria-labelledby="h-priv">
      <h2 className="numbered-heading" id="h-priv">
        Private by design
      </h2>
      <p className="lead">
        PhoneRecap reads your phone use to tell the story. All of it stays on your phone.
      </p>
      <div className="grid">
        <PrivacyCard
          Icon={IconWifiOff}
          title="No internet permission"
          text="The app can’t upload anything. It has no way to reach the internet."
        />
        <PrivacyCard
          Icon={IconNoUser}
          title="No account, no ads, no analytics"
          text="Nothing to sign up for. No ad or tracking code inside the app."
        />
        <PrivacyCard
          Icon={IconPhone}
          title="Your data stays on the phone"
          text="Export it or delete it any time, from the app’s settings."
        />
        <PrivacyCard
          Icon={IconLook}
          title="Check it yourself"
          text="Android never lists internet access on the Permissions page, so look at data use instead: it shows 0 B. On Google Play, PhoneRecap has no “full network access”.">
          <p
            className="crumb"
            aria-label="Android Settings, Apps, PhoneRecap, Mobile data and Wi-Fi">
            <span>Settings</span>
            <b>›</b>
            <span>Apps</span>
            <b>›</b>
            <span>PhoneRecap</span>
            <b>›</b>
            <span>Mobile data &amp; Wi-Fi</span>
          </p>
        </PrivacyCard>
      </div>
    </StyledPrivacy>

    <StyledScreens aria-labelledby="h-scr">
      <h2 className="numbered-heading" id="h-scr">
        A look inside
      </h2>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div className="strip" tabIndex="0" role="region" aria-label="App screens, scroll sideways">
        {SCREENS.map(({ src, alt, plain, sub }) => (
          <figure key={plain}>
            <Cut src={src} alt={alt} />
            <figcaption>
              {plain}
              <small>{sub}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="sample-note">Screens show sample data (Aarav’s year), not a real person.</p>
    </StyledScreens>

    <StyledJoin aria-labelledby="h-join">
      <JoinBox id="join">
        <p className="kicker">
          <span className="need">12 testers needed</span>Android 10 or newer
        </p>
        <h2 className="title disp" id="h-join">
          Join the test
        </h2>
        <p className="sub">
          Help PhoneRecap reach Google Play. You get the app early; I get to know what breaks.
        </p>

        <ol className="steps">
          <li>
            <span className="n" aria-hidden="true">
              1
            </span>
            <div>
              <h3>Send me your Gmail</h3>
              {/* Netlify Forms: detected at build from this static HTML. The honeypot
                  field is hidden from people; bots that fill it are dropped. */}
              <form
                name="phonerecap-testers"
                method="POST"
                action="/phonerecap/thanks/"
                data-netlify="true"
                // Netlify's own attribute; React passes it through to the HTML as-is
                // eslint-disable-next-line react/no-unknown-property
                netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="phonerecap-testers" />
                <p hidden>
                  <label>
                    Leave this empty: <input name="bot-field" tabIndex="-1" autoComplete="off" />
                  </label>
                </p>
                <label className="field-label" htmlFor="tester-email">
                  Gmail of the Google account on your phone
                </label>
                <input
                  className="input"
                  id="tester-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  spellCheck="false"
                  placeholder="name@gmail.com"
                  aria-describedby="tester-hint tester-pnote"
                />
                <p className="hint" id="tester-hint">
                  Google Play adds testers by this address, so use the one signed in on your Android
                  phone.
                </p>
                <label className="check">
                  <input type="checkbox" name="consent" value="yes" required />
                  <span>I agree that this email is used only to add me to the PhoneRecap test</span>
                </label>
                <button className="button" type="submit">
                  Send
                </button>
                <p className="pnote" id="tester-pnote">
                  Your email is used only to add you to the PhoneRecap test on Google Play. Only
                  Madhav sees it. It is stored by Netlify (this site’s host, USA) and added to the
                  tester list in Google Play Console. No marketing, no newsletter, and this page has
                  no trackers. It is deleted within 30 days after the public launch, or sooner if
                  you ask: <TesterMail />.
                </p>
              </form>
              <p className="note">
                Prefer to chat? DM me “TEST” on{' '}
                {DM_LINKS.map(({ name, url }, i) => (
                  <React.Fragment key={name}>
                    {i > 0 && ' · '}
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </React.Fragment>
                ))}
                .
              </p>
            </div>
          </li>
          <li>
            <span className="n" aria-hidden="true">
              2
            </span>
            <div>
              <h3>Opt in on Google Play</h3>
              <p>
                I add you to the test and email you the Google Play link. Tap it and choose “Become
                a tester”.
              </p>
            </div>
          </li>
          <li>
            <span className="n" aria-hidden="true">
              3
            </span>
            <div>
              <h3>Install and keep it 14 days</h3>
              <p>Open it every few days. Tell me what breaks.</p>
            </div>
          </li>
        </ol>
        <Why />
      </JoinBox>
    </StyledJoin>

    <StyledFaq aria-labelledby="h-faq">
      <h2 className="numbered-heading" id="h-faq">
        Questions
      </h2>
      <div className="list">
        {FAQ.map(([q, a], i) => (
          <details key={q} open={i === 0}>
            <summary>{q}</summary>
            <div className="a">{a}</div>
          </details>
        ))}
      </div>
      <p className="legal">
        The full details: <a href="/phonerecap/privacy/">Privacy Policy</a> and{' '}
        <a href="/phonerecap/terms/">Terms of Use</a>.
      </p>
    </StyledFaq>
  </PhoneRecapLayout>
);

export default PhoneRecapPage;

// https://schema.org/MobileApplication. No ratings and no install URL until the
// Google Play page is public.
const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'PhoneRecap',
  operatingSystem: 'Android',
  applicationCategory: 'LifestyleApplication',
  description: ONE_LINER,
  url: 'https://madhavkwatra.in/phonerecap/',
  image: 'https://madhavkwatra.in/phonerecap-og.jpg',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  publisher: {
    '@type': 'Person',
    name: 'Madhav Kwatra',
    url: 'https://madhavkwatra.in',
  },
};

// eslint-disable-next-line react/prop-types
export const Head = ({ location }) => (
  <Seo
    title="PhoneRecap — your phone year, told as a story"
    description={ONE_LINER}
    image="/phonerecap-og.jpg"
    pathname={location.pathname}
    schema={appSchema}
  />
);
