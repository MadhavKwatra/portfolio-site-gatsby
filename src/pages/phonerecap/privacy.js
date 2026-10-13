import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { phoneRecapLinks } from '@config';
import { LegalLayout, Seo } from '@components';

// Text is copied as-is from the PhoneRecap repo (docs/legal/privacy-policy.md)
const PhoneRecapPrivacyPage = ({ data }) => (
  <LegalLayout links={phoneRecapLinks}>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </LegalLayout>
);

PhoneRecapPrivacyPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PhoneRecapPrivacyPage;

// eslint-disable-next-line react/prop-types
export const Head = ({ location }) => (
  <Seo
    title="PhoneRecap Privacy Policy"
    description="What the PhoneRecap Android app reads, where that data stays, and your choices."
    pathname={location.pathname}
  />
);

export const pageQuery = graphql`
  {
    markdownRemark(fileAbsolutePath: { regex: "/content/legal/phonerecap/privacy-policy.md$/" }) {
      html
    }
  }
`;
