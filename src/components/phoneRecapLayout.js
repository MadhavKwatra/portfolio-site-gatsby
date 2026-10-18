import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { GlobalStyle, theme } from '@styles';

// Barlow Condensed (https://github.com/jpt/barlow) is licensed under the SIL Open
// Font License 1.1, see src/fonts/BarlowCondensed/OFL.txt. Only loaded on PhoneRecap pages.
import BarlowExtraBoldItalic from '@fonts/BarlowCondensed/BarlowCondensed_800ExtraBold_Italic.ttf';
import BarlowExtraBold from '@fonts/BarlowCondensed/BarlowCondensed_800ExtraBold.ttf';

// The frame for the PhoneRecap product pages (/phonerecap/ and /phonerecap/thanks/).
// Like LegalLayout it leaves out the main Layout on purpose: that one renders the
// cookie banner, which loads Google Analytics and Clarity. Simple Analytics is
// removed from every /phonerecap/ page in gatsby-ssr.js. These pages are tracker-free.

const PhoneRecapFonts = createGlobalStyle`
  @font-face {
    font-family: 'Barlow Condensed';
    src: url(${BarlowExtraBoldItalic}) format('truetype');
    font-weight: 800;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Barlow Condensed';
    src: url(${BarlowExtraBold}) format('truetype');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }
`;

// PhoneRecap brand tokens (copied from the app's theme) on top of the site's colors
const StyledPage = styled.div`
  --ink: #0b0c0f;
  --lime: #b6ff3b;
  --tomato: #ff4f2e;
  --sun: #ffd23f;
  --sky: #4d9de0;
  --paper: #fffdf6;
  --cream2: #fff2df;
  --display: 'Barlow Condensed', 'Arial Narrow', sans-serif;

  font-size: 18px;
  line-height: 1.55;

  @media (max-width: 480px) {
    font-size: 17px;
  }

  .disp {
    font-family: var(--display);
    font-style: italic;
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.005em;
    text-transform: uppercase;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
      animation: none !important;
    }
  }
`;

const StyledNav = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  height: 72px;
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px -10px var(--navy-shadow);

  @media (max-width: 768px) {
    height: 64px;
    padding: 0 22px;
  }
  @media (max-width: 480px) {
    padding: 0 16px;
  }

  .logo {
    display: block;
    width: 42px;
    height: 42px;
    color: var(--green);

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .links {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--lightest-slate);
  }

  .home {
    padding: 10px;

    @media (max-width: 480px) {
      padding: 10px 6px;
    }

    span {
      margin-right: 5px;
      color: var(--green);
      font-size: var(--fz-xxs);
    }
  }

  .join {
    ${({ theme }) => theme.mixins.smallButton};
    display: inline-flex;
    align-items: center;
    min-height: 40px;
    padding: 0 16px;

    @media (max-width: 480px) {
      padding: 0 12px;
    }
  }
`;

const StyledMain = styled.main`
  max-width: 1120px;
  min-height: auto;
  padding: 56px 50px 40px;
  counter-reset: section;

  @media (max-width: 768px) {
    padding: 32px 24px 24px;
  }
  @media (max-width: 480px) {
    padding: 24px 20px 16px;
  }

  section {
    max-width: none;
    padding: 72px 0;

    @media (max-width: 768px) {
      padding: 56px 0;
    }
  }
`;

const StyledFooter = styled.footer`
  padding: 20px 25px 40px;
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: center;

  a {
    padding: 10px;
  }
`;

// The site's hex logo, drawn with an empty hexagon (the global svg rule fills shapes)
const Logo = () => (
  <svg viewBox="0 0 84 96" aria-hidden="true" focusable="false">
    <g transform="translate(3 3)">
      <polygon
        points="39 0 0 22 0 67 39 90 78 68 78 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <g transform="matrix(.891364 0 0 .891364 45.7615 5.69929)">
        <path
          fill="currentColor"
          d="M-7.533,52.165C-6.769,49.421 -5.823,46.478 -4.694,43.335L1.322,26.665L10.283,26.665L10.283,61.516L3.901,61.516L3.901,43.856C3.901,41.269 4.005,38.265 4.214,34.844L3.979,34.844C3.684,35.834 3.337,36.945 2.937,38.178C2.538,39.411 2.121,40.626 1.687,41.824L-5.528,61.516L-9.643,61.516L-16.858,41.824C-17.292,40.626 -17.709,39.411 -18.108,38.178C-18.508,36.945 -18.855,35.834 -19.15,34.844L-19.385,34.844C-19.176,38.056 -19.072,41.052 -19.072,43.83L-19.072,61.516L-25.454,61.516L-25.454,26.665L-16.546,26.665L-10.529,43.257C-9.522,46.018 -8.575,48.987 -7.69,52.165L-7.533,52.165Z"
        />
      </g>
    </g>
  </svg>
);

const PhoneRecapLayout = ({ children, links, joinHref = '#join' }) => (
  <div id="root">
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PhoneRecapFonts />

      <StyledPage>
        <a className="skip-to-content" href="#content">
          Skip to Content
        </a>

        {/* Plain <a> tags, not Gatsby Link: leaving this page is a full page load,
            so the analytics on the rest of the site never run on these pages */}
        <StyledNav>
          <a className="logo" href="/" aria-label="Home: madhavkwatra.in">
            <Logo />
          </a>
          <nav className="links" aria-label="Main">
            <a className="home" href="/">
              <span>~/</span>Home
            </a>
            <a className="join" href={joinHref}>
              Join the test
            </a>
          </nav>
        </StyledNav>

        <StyledMain id="content">{children}</StyledMain>

        <StyledFooter>
          {links.map(({ name, url }) => (
            <a key={url} href={url}>
              {name}
            </a>
          ))}
          <a href="/">madhavkwatra.in</a>
        </StyledFooter>
      </StyledPage>
    </ThemeProvider>
  </div>
);

PhoneRecapLayout.propTypes = {
  children: PropTypes.node.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  joinHref: PropTypes.string,
};

export default PhoneRecapLayout;
