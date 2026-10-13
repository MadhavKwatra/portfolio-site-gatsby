import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { phoneRecapLinks } from '@config';
import { LegalLayout, Seo } from '@components';

// Text is copied as-is from the PhoneRecap repo (docs/legal/terms-of-use.md)
const PhoneRecapTermsPage = ({ data }) => (
  <LegalLayout links={phoneRecapLinks}>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </LegalLayout>
);

PhoneRecapTermsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PhoneRecapTermsPage;

// eslint-disable-next-line react/prop-types
export const Head = ({ location }) => (
  <Seo
    title="PhoneRecap Terms of Use"
    description="The terms for using the PhoneRecap Android app."
    pathname={location.pathname}
  />
);

export const pageQuery = graphql`
  {
    markdownRemark(fileAbsolutePath: { regex: "/content/legal/phonerecap/terms-of-use.md$/" }) {
      html
    }
  }
`;
