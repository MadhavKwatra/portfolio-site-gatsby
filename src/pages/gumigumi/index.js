import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gumiGumiLinks } from '@config';
import { PhoneRecapLayout, Seo } from '@components';

import appIcon from '@images/gumigumi/icon-128.png';
import playBadge from '@images/gumigumi/google-play-badge.png';
import mapIndia from '@images/gumigumi/map-india.jpg';
import mapDesert from '@images/gumigumi/map-desert.jpg';
import places from '@images/gumigumi/places.jpg';
import addPlace from '@images/gumigumi/add-place.jpg';
import chat from '@images/gumigumi/chat.jpg';
import statsCard from '@images/gumigumi/stats-card.jpg';
import shareCard from '@images/gumigumi/share-card.jpg';

// The GumiGumi product page: hero, features, screens, share card, "Your data", "Get the app", FAQ.
// Same layout as /phonerecap/ (tracker-free, works without JavaScript).
// Text describes app version 1.0.8 (what is on Google Play). Screens are real app screenshots
// (Dev app, 2026-11-05): status bar cut off, the owner's photo in the tab bar covered, and
// from the profile only the stats card (no face, name or email).
// The Google Play badge is Google's official artwork: never change, recolor or crop it
// (https://partnermarketinghub.withgoogle.com/brands/google-play/).

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.madhavKwatra.gumiGumiApp';

const ONE_LINER =
  'GumiGumi puts the places you have been on your own map: every country, and all 36 Indian states and union territories. Add photos and notes, see your travel stats, and share them.';

const SCREENS = [
  {
    src: mapIndia,
    plain: 'Your India, on a map',
    sub: 'Every place you add, with its photo',
    alt: 'GumiGumi map of India in a dark style, with photo pins in Mumbai and the north',
  },
  {
    src: places,
    plain: 'All your places',
    sub: 'Countries, states and cities, with dates',
    alt: 'Your Places list with Korea, Kuwait, Rajasthan, Afghanistan and Brazil',
  },
  {
    src: mapDesert,
    plain: 'Pick a map style',
    sub: 'Satellite, terrain and game-inspired styles',
    alt: 'The same India map in a sandy desert style',
  },
  {
    src: addPlace,
    plain: 'Add a place in seconds',
    sub: 'Search, tap, done',
    alt: 'Add a City in India sheet with a place search box over the map',
  },
  {
    src: chat,
    plain: 'Ask Gumi',
    sub: 'An AI travel helper, powered by Google Gemini',
    alt: 'Gumi chat screen with suggested questions about flights, trains and long weekends',
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

// GumiGumi brand colors (from the app)
const StyledBrand = styled.div`
  --gumi: #10b981;
  --gumi-soft: #6ee7b7;
  --polaroid: #fdf3d6;
  --soft-shadow: 0 28px 50px -18px rgba(0, 0, 0, 0.75);
`;

// Official badge. The PNG already has the clear space Google asks for around the badge.
const StyledBadge = styled.a`
  display: inline-block;
  line-height: 0;
  border-radius: 10px;

  img {
    display: block;
    width: auto;
    height: 72px;

    @media (max-width: 480px) {
      height: 64px;
    }
  }

  &:hover,
  &:focus-visible {
    transform: none;
  }
`;

const PlayBadge = () => (
  <StyledBadge href={PLAY_URL} target="_blank" rel="noopener noreferrer">
    <img src={playBadge} alt="Get it on Google Play" width="186" height="72" />
  </StyledBadge>
);

// The screen in a plain phone frame. Screenshots are 600 x 1240 (status bar cut off).
const StyledPhone = styled.div`
  width: var(--pw, 180px);
  aspect-ratio: 600 / 1240;
  overflow: hidden;
  border: calc(var(--pw, 180px) * 0.035) solid #05070a;
  border-radius: calc(var(--pw, 180px) * 0.13);
  background-color: #05070a;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.12),
    var(--soft-shadow);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    border-radius: calc(var(--pw, 180px) * 0.1);
  }
`;

const Phone = ({ src, alt, eager = false }) => (
  <StyledPhone className="phone">
    <img src={src} alt={alt} width="600" height="1240" loading={eager ? 'eager' : 'lazy'} />
  </StyledPhone>
);

Phone.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  eager: PropTypes.bool,
};

const StyledHero = styled.section`
  container-type: inline-size;
  && {
    padding: 24px 0 40px;
  }

  .in {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
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
      color: var(--gumi);
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
    gap: 6px 18px;
    margin: 28px 0 0 -10px;
  }

  .facts {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: 13px;
  }

  /* Art: the map phone in front, the Polaroid share card behind it,
     and the stats card from the profile on top. */
  .art {
    position: relative;
    width: 100%;
    max-width: 460px;
    margin-left: auto;
    aspect-ratio: 1 / 1.15;
    container-type: inline-size;

    &:before {
      content: '';
      position: absolute;
      inset: 12% 8% 6% 14%;
      border-radius: 50%;
      background: radial-gradient(closest-side, rgba(16, 185, 129, 0.35), transparent);
      filter: blur(10px);
    }
  }

  .art .phone {
    --pw: 50cqw;
    position: absolute;
    z-index: 2;
    left: 26%;
    top: 2%;
  }

  .polaroid {
    position: absolute;
    z-index: 1;
    right: -2%;
    top: 14%;
    width: 38cqw;
    height: auto;
    border-radius: 10px;
    box-shadow: var(--soft-shadow);
    transform: rotate(7deg);
  }

  .stats {
    position: absolute;
    z-index: 3;
    left: 0;
    bottom: 0;
    width: 46cqw;
    height: auto;
    border-radius: 14px;
    box-shadow: var(--soft-shadow);
    transform: rotate(-4deg);
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
    border-radius: 12px;
    background-color: rgba(16, 185, 129, 0.15);
    color: var(--gumi-soft);

    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
    }

    svg {
      width: 24px;
      height: 24px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
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
    gap: 32px;
    margin: 0 -4px;
    padding: 6px 16px 34px 4px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    scrollbar-color: var(--dark-slate) transparent;
  }

  figure {
    flex: 0 0 auto;
    width: 190px;
    margin: 0;
    scroll-snap-align: start;

    @media (max-width: 480px) {
      width: 160px;
    }
  }

  .phone {
    --pw: 190px;

    @media (max-width: 480px) {
      --pw: 160px;
    }
  }

  figcaption {
    margin-top: 20px;
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
    border-radius: 12px;
    box-shadow: var(--soft-shadow);
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
    padding: 40px 28px 32px;
    border-radius: 18px;
    background-color: var(--light-navy);
    background-image: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.22), transparent 70%);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);

    @media (max-width: 480px) {
      padding: 32px 18px 26px;
    }
  }

  .box-icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 18px;
    border-radius: 13px;
    background-color: #fff;
  }

  h2 {
    margin: 0 0 12px;
    color: var(--lightest-slate);
    font-size: clamp(30px, 6vw, 42px);
  }

  p {
    margin: 0 auto 18px;
    max-width: 460px;
    color: var(--light-slate);
  }

  .small {
    margin: 14px auto 0;
    font-size: 15px;
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

  .tm {
    margin-top: 10px;
    color: var(--slate);
    font-size: 13px;
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
              <PlayBadge />
              <span className="facts">Android · No ads · No location tracking</span>
            </div>
          </div>

          <div className="art">
            <img
              className="polaroid"
              src={shareCard}
              alt="Polaroid share card with a map of India and travel stats"
              width="420"
              height="629"
            />
            <Phone src={mapIndia} alt={SCREENS[0].alt} eager />
            <img
              className="stats"
              src={statsCard}
              alt="Your Travel Stats card: 4.10% of the world explored, 13.89% of India, 8 countries, 5 states and UTs"
              width="480"
              height="471"
            />
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
              <Phone src={src} alt={alt} />
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
          <img className="box-icon" src={appIcon} alt="GumiGumi app icon" width="56" height="56" />
          <h2 id="h-get">Start your map</h2>
          <p>
            GumiGumi is on Google Play for Android. Sign in with Google and add your first place.
          </p>
          <PlayBadge />
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
        <p className="tm">Google Play and the Google Play logo are trademarks of Google LLC.</p>
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
  image: 'https://madhavkwatra.in/gumigumi-og.jpg',
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
    image="/gumigumi-og.jpg"
    pathname={location.pathname}
    schema={appSchema}
  />
);
