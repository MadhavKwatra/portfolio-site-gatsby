/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// App legal pages (e.g. the PhoneRecap privacy policy) promise no trackers, so they
// ship without the Simple Analytics loader that gatsby-plugin-simple-analytics
// adds to every page. Keep `ignorePages` in gatsby-config.js in sync.
const TRACKER_FREE_PATHS = ['/phonerecap/'];

exports.onPreRenderHTML = ({ pathname, getHeadComponents, replaceHeadComponents }) => {
  if (!TRACKER_FREE_PATHS.some(path => pathname.startsWith(path))) {
    return;
  }
  replaceHeadComponents(
    getHeadComponents().filter(component => component.key !== 'plugin-simpleanalytics'),
  );
};
