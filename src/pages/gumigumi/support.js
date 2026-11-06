import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { gumiGumiLinks } from '@config';
import { LegalLayout, Seo } from '@components';

// Text is copied from the GumiGumi repo (docs/legal/); edit it there first, then here.
const GumiGumiSupportPage = ({ data }) => (
  <LegalLayout links={gumiGumiLinks}>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </LegalLayout>
);

GumiGumiSupportPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GumiGumiSupportPage;

// eslint-disable-next-line react/prop-types
export const Head = ({ location }) => (
  <Seo
    title="GumiGumi Help and Support"
    description="Contact, answers to common questions, and help for the GumiGumi app."
    pathname={location.pathname}
  />
);

export const pageQuery = graphql`
  {
    markdownRemark(fileAbsolutePath: { regex: "/content/legal/gumigumi/support.md$/" }) {
      html
    }
  }
`;
