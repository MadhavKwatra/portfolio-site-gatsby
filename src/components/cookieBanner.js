import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import {
  CONSENT_ACKNOWLEDGED,
  CONSENT_DENIED,
  CONSENT_GRANTED,
  getConsent,
  isAnalyticsConfigured,
  loadAnalytics,
  needsConsent,
  onConsentChange,
  revokeAnalytics,
  setConsent,
} from '@utils/analytics';

const StyledBanner = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  position: fixed;
  bottom: 20px;
  left: 50%;
  z-index: 10;
  width: calc(100% - 40px);
  max-width: 600px;
  padding: 20px 25px;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  color: var(--light-slate);
  font-size: var(--fz-md);
  transform: translateX(-50%);

  @media (max-width: 480px) {
    bottom: 10px;
    width: calc(100% - 20px);
    padding: 15px 20px;
    font-size: var(--fz-sm);
  }

  p {
    margin: 0 0 15px;
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 25px;
  }

  .accept {
    ${({ theme }) => theme.mixins.smallButton};
    cursor: pointer;
  }

  .decline {
    padding: 0.75rem 0;
    border: 0;
    background-color: transparent;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    cursor: pointer;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
    }
  }
`;

// Two modes (see utils/analytics.js):
// - 'consent': EEA, UK, Switzerland. Analytics waits for Accept.
// - 'notice':  everywhere else. Analytics runs; the visitor can opt out.
const CookieBanner = () => {
  const [mode, setMode] = useState(null);

  useEffect(() => {
    // Nothing to ask about until an analytics ID is set in config.js
    if (!isAnalyticsConfigured()) {
      return;
    }

    const consent = getConsent();
    if (consent === CONSENT_GRANTED) {
      loadAnalytics({ consented: true });
    } else if (consent !== CONSENT_DENIED) {
      if (needsConsent()) {
        setMode('consent');
      } else {
        loadAnalytics();
        if (consent !== CONSENT_ACKNOWLEDGED) {
          setMode('notice');
        }
      }
    }

    // A choice made on the privacy page also answers the banner
    return onConsentChange(() => setMode(null));
  }, []);

  const accept = () => {
    setConsent(CONSENT_GRANTED);
    loadAnalytics({ consented: true });
  };

  if (!mode) {
    return null;
  }

  const message = (
    <p>
      I use cookies (Google Analytics and Microsoft Clarity) to see how visitors use this site. No
      ads, no selling data. <Link to="/privacy">Privacy</Link>
    </p>
  );

  if (mode === 'notice') {
    return (
      <StyledBanner role="region" aria-label="Analytics notice">
        {message}

        <div className="actions">
          <button className="accept" onClick={() => setConsent(CONSENT_ACKNOWLEDGED)}>
            Got it
          </button>
          {/* Analytics is already running here, so opting out clears it and reloads */}
          <button className="decline" onClick={revokeAnalytics}>
            Opt out
          </button>
        </div>
      </StyledBanner>
    );
  }

  return (
    <StyledBanner role="region" aria-label="Cookie consent">
      {message}

      <div className="actions">
        <button className="accept" onClick={accept}>
          Accept
        </button>
        <button className="decline" onClick={() => setConsent(CONSENT_DENIED)}>
          Decline
        </button>
      </div>
    </StyledBanner>
  );
};

export default CookieBanner;
