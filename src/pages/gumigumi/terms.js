import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { gumiGumiLinks } from '@config';
import { LegalLayout, Seo } from '@components';

// Text is copied from the GumiGumi repo (docs/legal/); edit it there first, then here.
const GumiGumiTermsPage = ({ data }) => (
  <LegalLayout links={gumiGumiLinks}>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </LegalLayout>
);

GumiGumiTermsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GumiGumiTermsPage;

// eslint-disable-next-line react/prop-types
export const Head = ({ location }) => (
  <Seo
    title="GumiGumi Terms of Use"
    description="The terms for using the GumiGumi travel map app."
    pathname={location.pathname}
  />
);

export const pageQuery = graphql`
  {
    markdownRemark(fileAbsolutePath: { regex: "/content/legal/gumigumi/terms-of-use.md$/" }) {
      html
    }
  }
`;
