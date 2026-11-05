import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gumiGumiLinks } from '@config';
import { PhoneRecapLayout, Seo } from '@components';
import { stickerButton } from '@components/phoneRecapJoin';

import appIcon from '@images/gumigumi/icon-128.png';
import mapIndia from '@images/gumigumi/map-india.jpg';
import mapWorld from '@images/gumigumi/map-world.jpg';
import mapStyles from '@images/gumigumi/map-styles.jpg';
import addPlace from '@images/gumigumi/add-place.jpg';
import chat from '@images/gumigumi/chat.jpg';
import welcome from '@images/gumigumi/welcome.jpg';
import shareCard from '@images/gumigumi/share-card.jpg';

// The GumiGumi product page: hero, features, screens, "Your data", "Get the app", FAQ.
// Built like /phonerecap/ (same layout, tracker-free, no JavaScript needed).
// Text describes app version 1.0.8 (what is on Google Play). Screens are real app
// screenshots (Dev app, 2026-11-05); the owner's photo in the tab bar is covered.

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.madhavKwatra.gumiGumiApp';

const ONE_LINER =
  'GumiGumi puts the places you have been on your own map: every country, and all 36 Indian states and union territories. Add photos and notes, see your travel stats, and share them.';

const SCREENS = [
  {
    src: mapIndia,
    plain: 'Your India, on a map',
    sub: 'Every place you add, with its photo',
    alt: 'GumiGumi India map with place markers and photo pins in Mumbai, Delhi and the north',
  },
  {
    src: mapWorld,
    plain: 'The whole world',
    sub: 'Switch between World and India',
    alt: 'World map in satellite style with the World and India switch at the top',
  },
  {
    src: mapStyles,
    plain: 'Pick a map style',
    sub: 'Satellite, light, terrain and game-inspired styles',
    alt: 'Map style sheet with satellite, standard, terrain and custom map styles',
  },
  {
    src: addPlace,
    plain: 'Add a place in seconds',
    sub: 'Search, tap, done',
    alt: 'Add a City in India sheet with a place search box',
  },
  {
    src: chat,
    plain: 'Ask Gumi',
    sub: 'An AI travel helper, powered by Google Gemini',
    alt: 'Gumi chat screen with suggested questions like cheap flights and train travel tips',
  },
  {
    src: welcome,
    plain: 'Sign in with Google',
    sub: 'Your places are saved to your account',
    alt: 'Welcome screen: Welcome to GumiGumi, your personal travel companion',
  },
];

const FAQ = [
  ['Does GumiGumi cost anything?', 'No. There are no ads and no in-app purchases.'],
  [
    'Does it track my location?',
    'No. GumiGumi has no background location tracking. A place is saved only when you add it.',
  ],
  [
    'Who can see my places and photos?',
    'Only you. Each account can read only its own places, and photos are in a private folder. Your data is stored in Mumbai, India (Supabase).',
  ],
  [
    'Does the app use analytics?',
    'Version 1.0.x uses Vexo for anonymous usage analytics (which screens are opened, not what you type) and Sentry for crash reports. Neither gets your name or email, and session recording is off. The privacy policy has the full list.',
  ],
  [
    'Which phones does it work on?',
    'Android phones, from Google Play. There is no iPhone version right now.',
  ],
  [
    'How do I delete my account?',
    'Use the delete-account page (link below). It removes your account, places, photos and profile. Deleting inside the app comes in version 2.0.',
  ],
  [
    'Who made it?',
    'Madhav Kwatra, an indie developer in India. I built the first version solo in April 2025 for notJust Hack 2025, where it made the final showcase.',
  ],
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
const IconGlobe = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </>,
);
const IconPhoto = icon(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <circle cx="9" cy="10" r="2" />
    <path d="m21 16-5-5-9 9" />
  </>,
);
const IconChart = icon(<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />);
const IconChat = icon(
  <path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.6A8 8 0 1 1 21 12zM8.5 12h.01M12 12h.01M15.5 12h.01" />,
);
const IconPin = icon(
  <>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <path d="m9.5 9.5 1.7 1.7 3.3-3.4" />
  </>,
);
const IconLock = icon(
  <>
    <rect x="4" y="10" width="16" height="11" rx="2.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14.5v2.5" />
  </>,
);
const IconNoAds = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m5.6 5.6 12.8 12.8" />
  </>,
);
const IconTrash = icon(<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />);

// GumiGumi brand colors (from the app) on top of the shared product-page tokens
const StyledBrand = styled.div`
  --tomato: #10b981;
  --lime: #6ee7b7;
  --sun: #fdf3d6;
  --cream2: #d1fae5;
`;

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
      background-color: #fff;
    }
  }

  .wordmark {
    color: var(--lightest-slate);
    font-family: var(--font-sans);
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1;

    span {
      color: var(--tomato);
    }
  }

  h1 {
    margin: 22px 0;
    font-size: clamp(38px, 6.4cqw, 66px);
    letter-spacing: -0.02em;
    line-height: 1.04;

    em {
      font-style: normal;
      color: var(--lightest-slate);
      background: linear-gradient(transparent 62%, rgba(16, 185, 129, 0.5) 62%);
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
    background-color: var(--lime);
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
    }
  }

  .play-btn {
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

// Frameless cut-out: the screen itself as a sticker. Screenshots are 720 x 1544.
const StyledCut = styled.div`
  position: relative;
  width: var(--pw, 160px);
  aspect-ratio: ${({ $ratio }) => $ratio};
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

const Cut = ({ src, alt, eager = false, width = 540, height = 1158 }) => (
  <StyledCut className="cut" $ratio={`${width} / ${height}`}>
    <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} />
  </StyledCut>
);

Cut.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  eager: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

const StyledCards = styled.section`
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
`;

const StyledShare = styled.section`
  .in {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 300px);
    gap: 48px;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  p {
    max-width: 520px;
    color: var(--light-slate);
  }

  .card-img {
    width: 100%;
    max-width: 300px;
    height: auto;
    border: 4px solid var(--ink);
    border-radius: 14px;
    box-shadow: 9px 9px 0 var(--cream2);
    transform: rotate(3deg);

    @media (max-width: 768px) {
      max-width: 260px;
      margin: 0 auto;
    }
  }
`;

const StyledGet = styled.section`
  text-align: center;

  && {
    padding: 64px 0;
  }

  .box {
    max-width: 640px;
    margin: 0 auto;
    padding: 40px 28px;
    border: 3px solid var(--ink);
    border-radius: 18px;
    background-color: var(--sun);
    color: var(--ink);
    box-shadow: 8px 8px 0 var(--cream2);

    @media (max-width: 480px) {
      padding: 32px 18px;
    }
  }

  h2 {
    margin: 0 0 12px;
    color: var(--ink);
    font-size: clamp(40px, 8vw, 60px);
  }

  p {
    margin: 0 auto 26px;
    max-width: 460px;
    color: #3d3a33;
  }

  .play-btn {
    ${stickerButton};
  }

  .small {
    margin: 22px auto 0;
    font-size: 15px;

    a {
      color: var(--ink);
      text-decoration: underline;
    }
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

const Card = ({ Icon, title, text }) => (
  <div className="card">
    <span className="ic">
      <Icon />
    </span>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

Card.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const PlayLink = ({ children }) => (
  <a className="play-btn" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
    {children}
    <span className="sr-only"> (opens Google Play in a new tab)</span>
  </a>
);

PlayLink.propTypes = {
  children: PropTypes.node.isRequired,
};

const GumiGumiPage = () => (
  <PhoneRecapLayout
    links={gumiGumiLinks.filter(({ url }) => url !== '/gumigumi/')}
    joinHref="#get"
    joinLabel="Get the app">
    <StyledBrand>
      <StyledHero aria-labelledby="h-title">
        <div className="in">
          <div>
            <p className="eyebrow">An Android app by Madhav Kwatra</p>
            <p className="lockup">
              <img src={appIcon} alt="GumiGumi app icon: a green map pin" width="64" height="64" />
              <span className="wordmark">
                Gumi<span>Gumi</span>
              </span>
            </p>
            <h1 id="h-title">
              Every place you’ve been, <em>on your own map.</em>
            </h1>
            <p className="one">{ONE_LINER}</p>
            <div className="acts">
              <span className="status">
                <i aria-hidden="true" />
                Android · on Google Play
              </span>
              <PlayLink>Get it on Google Play</PlayLink>
            </div>
          </div>

          <div className="art">
            <div className="p p1">
              <Cut src={mapWorld} alt={SCREENS[1].alt} eager />
            </div>
            <div className="p p3">
              <Cut src={chat} alt={SCREENS[4].alt} eager />
            </div>
            <div className="p p2">
              <Cut src={mapIndia} alt={SCREENS[0].alt} eager />
            </div>
            <div className="badge" aria-hidden="true">
              <span className="num">36</span>
              <span className="lbl">states &amp; UTs to fill</span>
            </div>
          </div>
        </div>
      </StyledHero>

      <StyledCards aria-labelledby="h-feat">
        <h2 className="numbered-heading" id="h-feat">
          What it does
        </h2>
        <p className="lead">A travel diary that looks like a map, not a list.</p>
        <div className="grid">
          <Card
            Icon={IconGlobe}
            title="A 3D globe and 2D maps"
            text="See your places on a spinning globe or a flat map. Switch between the world and India, and pick a map style you like."
          />
          <Card
            Icon={IconPhoto}
            title="Photos and notes"
            text="Add a place with its date, a note and a photo. The photo shows up as the pin on your map."
          />
          <Card
            Icon={IconChart}
            title="Your travel stats"
            text="How much of the world you have seen, how many countries, and how many of India’s 28 states and 8 union territories."
          />
          <Card
            Icon={IconChat}
            title="Gumi, your AI travel helper"
            text="Ask for trip ideas, train tips or an itinerary. Gumi answers with Google Gemini."
          />
        </div>
      </StyledCards>

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
      </StyledScreens>

      <StyledShare aria-labelledby="h-share">
        <div className="in">
          <div>
            <h2 className="numbered-heading" id="h-share">
              Share your travels
            </h2>
            <p>
              Turn your map into a Polaroid-style card with your stats, and send it to friends or
              post it to your story.
            </p>
          </div>
          <img
            className="card-img"
            src={shareCard}
            alt="Polaroid share card: a map of India with place pins, World Travelled 4%, India Travelled 14%, 8 countries, 5 states and UTs"
            width="420"
            height="629"
            loading="lazy"
          />
        </div>
      </StyledShare>

      <StyledCards aria-labelledby="h-data">
        <h2 className="numbered-heading" id="h-data">
          Your data
        </h2>
        <p className="lead">Your places are yours. Here is what that means.</p>
        <div className="grid">
          <Card
            Icon={IconPin}
            title="No background location"
            text="GumiGumi never follows you around. A place is saved only when you add it."
          />
          <Card
            Icon={IconLock}
            title="Only you see your places"
            text="Places and photos are saved to your account, in a private space that only you can open."
          />
          <Card
            Icon={IconNoAds}
            title="No ads, no selling of data"
            text="There is no ad code in the app, and your data is never sold or rented."
          />
          <Card
            Icon={IconTrash}
            title="Delete it any time"
            text="Remove your account, places and photos from the delete-account page."
          />
        </div>
      </StyledCards>

      <StyledGet aria-labelledby="h-get" id="get">
        <div className="box">
          <h2 className="disp" id="h-get">
            Start your map
          </h2>
          <p>
            GumiGumi is on Google Play for Android. Sign in with Google and add your first place.
          </p>
          <PlayLink>Get it on Google Play</PlayLink>
          <p className="small">
            Questions or ideas? See <a href="/gumigumi/support/">Help and Support</a>.
          </p>
        </div>
      </StyledGet>

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
          The full details: <a href="/gumigumi/privacy/">Privacy Policy</a>,{' '}
          <a href="/gumigumi/terms/">Terms of Use</a> and{' '}
          <a href="/gumigumi/delete-account/">Delete your account</a>.
        </p>
      </StyledFaq>
    </StyledBrand>
  </PhoneRecapLayout>
);

export default GumiGumiPage;

// https://schema.org/MobileApplication. No ratings: none are shown on this page.
const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'GumiGumi',
  operatingSystem: 'Android',
  applicationCategory: 'TravelApplication',
  description: ONE_LINER,
  url: 'https://madhavkwatra.in/gumigumi/',
  installUrl: PLAY_URL,
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
    title="GumiGumi — every place you’ve been, on your own map"
    description={ONE_LINER}
    pathname={location.pathname}
    schema={appSchema}
  />
);
