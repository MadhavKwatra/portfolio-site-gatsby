import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { email } from '@config';
import { Layout, Seo } from '@components';
import {
  CONSENT_GRANTED,
  isAnalyticsAllowed,
  isAnalyticsConfigured,
  loadAnalytics,
  onConsentChange,
  revokeAnalytics,
  setConsent,
} from '@utils/analytics';

const StyledPrivacy = styled.main`
  max-width: 1000px;

  header {
    margin-bottom: 50px;
  }

  h2 {
    margin: 50px 0 15px;
    font-size: var(--fz-xxl);
  }

  p {
    margin: 0 0 15px;
  }

  p > a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  .consent {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px 25px;
    margin-top: 20px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);

    strong {
      color: var(--green);
      font-weight: 400;
    }
  }

  .consent-button {
    ${({ theme }) => theme.mixins.smallButton};
    cursor: pointer;
  }
`;

const PrivacyPage = ({ location }) => {
  const usesCookieAnalytics = isAnalyticsConfigured();
  // Read on the client only: it depends on this visitor's stored choice and time zone
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (!usesCookieAnalytics) {
      return;
    }
    setIsOn(isAnalyticsAllowed());
    return onConsentChange(() => setIsOn(isAnalyticsAllowed()));
  }, []);

  const toggleAnalytics = () => {
    if (isOn) {
      revokeAnalytics();
    } else {
      setConsent(CONSENT_GRANTED);
      loadAnalytics({ consented: true });
    }
  };

  return (
    <Layout location={location}>
      <StyledPrivacy>
        <header>
          <h1 className="big-heading">Privacy</h1>
          <p className="subtitle">What this site measures, and your choice</p>
        </header>

        <h2>Always on: Simple Analytics</h2>
        <p>
          Simple Analytics counts page views without cookies and without collecting personal data,
          so it needs no consent. It shows things like which pages were visited, the site you came
          from, the type of device and the country.
        </p>

        {usesCookieAnalytics && (
          <>
            <h2>Google Analytics and Microsoft Clarity</h2>
            <p>
              In the EU/EEA, the UK and Switzerland, these load only after you click Accept.
              Elsewhere they load by default, and you can turn them off below. Your region is
              guessed from your device&apos;s time zone, and Google and Microsoft also block these
              cookies themselves in those regions until you accept.
            </p>
            <p>
              They set cookies and collect the pages you view, the site you came from, your device
              and browser, your approximate location and your clicks. Clarity also makes heatmaps
              and replays of how the page was used. This site has no forms, and Clarity masks typed
              text by default.
            </p>
            <p>
              Google Analytics keeps detailed data for up to 14 months. Clarity keeps replays for 30
              days and heatmaps for 13 months. See{' '}
              <a href="https://policies.google.com/privacy">Google&apos;s privacy policy</a> and{' '}
              <a href="https://privacy.microsoft.com/privacystatement">
                Microsoft&apos;s privacy statement
              </a>
              .
            </p>
          </>
        )}

        <h2>No ads, no selling data</h2>
        <p>Advertising features are turned off, and no data is sold or shared for advertising.</p>

        {usesCookieAnalytics && (
          <>
            <h2>Your choice</h2>
            <p>You can change your choice at any time.</p>
            <div className="consent">
              <span>
                Analytics cookies: <strong>{isOn ? 'on' : 'off'}</strong>
              </span>
              <button className="consent-button" onClick={toggleAnalytics}>
                {isOn ? 'Turn off analytics' : 'Allow analytics cookies'}
              </button>
            </div>
          </>
        )}

        <h2>Questions</h2>
        <p>
          Email me at <a href={`mailto:${email}`}>{email}</a>.
        </p>
      </StyledPrivacy>
    </Layout>
  );
};

PrivacyPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PrivacyPage;

// Gatsby strips the `Head` export from the page bundle, so any statement that
// references Head (like Head.propTypes) would throw there.
// eslint-disable-next-line react/prop-types
export const Head = ({ location }) => <Seo title="Privacy" pathname={location.pathname} />;
