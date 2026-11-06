import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { gumiGumiLinks } from '@config';
import { LegalLayout, Seo } from '@components';

// Text is copied from the GumiGumi repo (docs/legal/); edit it there first, then here.
const GumiGumiPrivacyPage = ({ data }) => (
  <LegalLayout links={gumiGumiLinks}>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </LegalLayout>
);

GumiGumiPrivacyPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GumiGumiPrivacyPage;

// eslint-disable-next-line react/prop-types
export const Head = ({ location }) => (
  <Seo
    title="GumiGumi Privacy Policy"
    description="What the GumiGumi travel map app collects, where it is kept, and your choices."
    pathname={location.pathname}
  />
);

export const pageQuery = graphql`
  {
    markdownRemark(fileAbsolutePath: { regex: "/content/legal/gumigumi/privacy-policy.md$/" }) {
      html
    }
  }
`;
