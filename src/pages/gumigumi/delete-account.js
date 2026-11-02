import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { gumiGumiLinks } from '@config';
import { LegalLayout, Seo } from '@components';

// Text is copied from the GumiGumi repo (docs/legal/); edit it there first, then here.
const GumiGumiDeleteAccountPage = ({ data }) => (
  <LegalLayout links={gumiGumiLinks}>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </LegalLayout>
);

GumiGumiDeleteAccountPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GumiGumiDeleteAccountPage;

// eslint-disable-next-line react/prop-types
export const Head = ({ location }) => (
  <Seo
    title="Delete your GumiGumi account"
    description="How to delete your GumiGumi account and all its data."
    pathname={location.pathname}
  />
);

export const pageQuery = graphql`
  {
    markdownRemark(fileAbsolutePath: { regex: "/content/legal/gumigumi/delete-account.md$/" }) {
      html
    }
  }
`;
