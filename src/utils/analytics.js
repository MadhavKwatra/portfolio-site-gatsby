/**
 * Cookie-based analytics: Google Analytics 4 and Microsoft Clarity.
 *
 * Both set cookies, so neither is added at build time; they are loaded at runtime
 * by the cookie banner (components/cookieBanner.js) or the privacy page:
 * - EEA, UK and Switzerland need opt-in consent, so there they load only after "Accept".
 * - Elsewhere a notice with an opt-out is enough, so they load right away.
 *
 * The visitor's region is guessed from the device time zone (a static site has no
 * IP lookup). As a safety net by IP, Google is told to deny analytics cookies in
 * `consentRegions` until consent, and Clarity does the same by itself for EEA/UK/CH.
 *
 * Simple Analytics is cookieless and is loaded for every visitor by
 * gatsby-plugin-simple-analytics.
 */
import { analytics } from '@config';

const CONSENT_KEY = 'analytics-consent';
const CONSENT_CHANGE_EVENT = 'analytics-consent-change';

export const CONSENT_GRANTED = 'granted'; // clicked Accept
export const CONSENT_DENIED = 'denied'; // declined or opted out
export const CONSENT_ACKNOWLEDGED = 'acknowledged'; // dismissed the notice (not consent)

const isBrowser = typeof window !== 'undefined';

export const isAnalyticsConfigured = () =>
  Boolean(analytics.ga4MeasurementId || analytics.clarityProjectId);

// Time zones in the EEA, UK and Switzerland that do not start with "Europe/"
const CONSENT_TIME_ZONES = [
  'Arctic/Longyearbyen',
  'Atlantic/Azores',
  'Atlantic/Canary',
  'Atlantic/Faroe',
  'Atlantic/Madeira',
  'Atlantic/Reykjavik',
  'Asia/Famagusta',
  'Asia/Nicosia',
  'America/Cayenne',
  'America/Guadeloupe',
  'America/Martinique',
  'Indian/Mayotte',
  'Indian/Reunion',
  // Legacy aliases some browsers still report
  'CET',
  'EET',
  'Eire',
  'GB',
  'Iceland',
  'MET',
  'Poland',
  'Portugal',
  'WET',
];

// Best guess at whether this visitor is in a region that needs opt-in consent.
// When the time zone can't be read, assume consent is needed (the safe side).
export const needsConsent = () => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!timeZone) {
      return true;
    }
    return timeZone.startsWith('Europe/') || CONSENT_TIME_ZONES.includes(timeZone);
  } catch (e) {
    return true;
  }
};

export const getConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch (e) {
    // Storage can be blocked (e.g. some private modes); treat it as "not chosen yet"
    return null;
  }
};

export const setConsent = value => {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch (e) {
    // Storage can be blocked; the choice then only lasts for this page view
  }
  // Let the banner and the privacy page stay in sync with each other
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
};

// Whether GA4 and Clarity should be running for this visitor right now
export const isAnalyticsAllowed = () => {
  const consent = getConsent();
  if (consent === CONSENT_GRANTED) {
    return true;
  }
  return !needsConsent() && consent !== CONSENT_DENIED;
};

export const onConsentChange = callback => {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
};

const addScript = src => {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

// https://developers.google.com/tag-platform/gtagjs/install
const loadGa4 = (id, consented) => {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the arguments object itself, not an array
    window.dataLayer.push(arguments);
  };

  // Analytics only: every advertising feature stays off
  const adsDenied = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
  window.gtag('consent', 'default', { analytics_storage: 'granted', ...adsDenied });
  // Safety net by IP: in opt-in regions Google keeps analytics cookies off until
  // consent, even if the time-zone guess said the visitor was elsewhere
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ...adsDenied,
    region: analytics.consentRegions,
  });
  // Must come before 'config' so the first page view already counts as consented
  if (consented) {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  }
  window.gtag('js', new Date());
  // Later client-side route changes are picked up by GA4's enhanced measurement
  // ("page changes based on browser history events"), so no onRouteUpdate is needed
  window.gtag('config', id, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
};

// https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2
const sendClarityConsent = () =>
  window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });

// https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup
const loadClarity = (id, consented) => {
  // Queue stub from Clarity's snippet: calls made before the script loads are replayed
  window.clarity =
    window.clarity ||
    function clarity() {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

  addScript(`https://www.clarity.ms/tag/${encodeURIComponent(id)}`);

  // Without a consent signal Clarity keeps EEA, UK and Swiss visitors cookieless
  if (consented) {
    sendClarityConsent();
  }
};

// `consented` is true only after an explicit Accept, never for a dismissed notice
export const loadAnalytics = ({ consented = false } = {}) => {
  if (!isBrowser) {
    return;
  }

  if (window.__analyticsLoaded) {
    // Already running (e.g. Accept on the privacy page): just send the consent signals
    if (consented) {
      if (window.gtag) {
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
      }
      if (window.clarity) {
        sendClarityConsent();
      }
    }
    return;
  }
  window.__analyticsLoaded = true;

  if (analytics.ga4MeasurementId) {
    loadGa4(analytics.ga4MeasurementId, consented);
  }
  if (analytics.clarityProjectId) {
    loadClarity(analytics.clarityProjectId, consented);
  }
};

const ANALYTICS_COOKIE = /^(_ga|_ga_.+|_clck|_clsk)$/;

const deleteCookie = name => {
  const expired = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  document.cookie = expired;

  // GA sets its cookies on the top-level domain, so also clear every parent domain
  const parts = window.location.hostname.split('.');
  for (let i = 0; i < parts.length - 1; i++) {
    document.cookie = `${expired}; domain=.${parts.slice(i).join('.')}`;
  }
};

export const revokeAnalytics = () => {
  setConsent(CONSENT_DENIED);

  // Stop GA first: it is still running until the reload below and would
  // otherwise write its cookies again (e.g. when the page unloads)
  // https://developers.google.com/analytics/devguides/collection/ga4/disable-analytics
  if (window.gtag && analytics.ga4MeasurementId) {
    window[`ga-disable-${analytics.ga4MeasurementId}`] = true;
    window.gtag('consent', 'update', { analytics_storage: 'denied' });
  }
  if (window.clarity) {
    window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
  }

  document.cookie
    .split(';')
    .map(cookie => cookie.split('=')[0].trim())
    .filter(name => ANALYTICS_COOKIE.test(name))
    .forEach(deleteCookie);

  // The scripts are already running; a reload is the only way to unload them
  window.location.reload();
};
