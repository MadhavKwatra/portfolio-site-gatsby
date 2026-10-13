import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@styles';

// A plain frame for app legal pages (e.g. PhoneRecap's privacy policy).
// It leaves out the main Layout on purpose: that one renders the cookie banner,
// which loads Google Analytics and Clarity, and a footer that calls the GitHub API.
// Simple Analytics is removed from these pages in gatsby-ssr.js.

const StyledMain = styled.main`
  max-width: 760px;
  min-height: auto;
  padding: 100px 25px 60px;

  @media (max-width: 768px) {
    padding: 70px 25px 50px;
  }
  @media (max-width: 480px) {
    padding: 50px 20px 40px;
  }

  h1 {
    margin-bottom: 15px;
    font-size: clamp(32px, 7vw, 50px);
  }

  h2 {
    margin: 45px 0 15px;
    font-size: var(--fz-xxl);
  }

  p,
  li {
    line-height: 1.5;
  }

  // Top margin too: GlobalStyle drops the bottom margin of the last <p>
  ul,
  ol {
    margin: 15px 0;
    padding-left: 25px;
  }

  li {
    margin-bottom: 10px;
  }

  strong {
    color: var(--lightest-slate);
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
    // Long email addresses must wrap on small phones
    max-width: 100%;
    overflow-wrap: anywhere;
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

const LegalLayout = ({ children, links }) => (
  <div id="root">
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <a className="skip-to-content" href="#content">
        Skip to Content
      </a>

      <StyledMain id="content">{children}</StyledMain>

      {/* Plain <a> tags, not Gatsby Link: leaving this page is a full page load,
          so the analytics on the rest of the site never run on these pages */}
      <StyledFooter>
        {links.map(({ name, url }) => (
          <a key={url} href={url}>
            {name}
          </a>
        ))}
        <a href="/">madhavkwatra.in</a>
      </StyledFooter>
    </ThemeProvider>
  </div>
);

LegalLayout.propTypes = {
  children: PropTypes.node.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default LegalLayout;
