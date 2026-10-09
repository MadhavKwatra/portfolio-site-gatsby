import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Seo, Hero, About, Jobs, Featured, Projects, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
      <Featured />
      <Projects />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;

// Gatsby strips the `Head` export from the page bundle, so any statement that
// references Head (like Head.propTypes) would throw there.
// eslint-disable-next-line react/prop-types
export const Head = ({ location }) => <Seo pathname={location.pathname} />;
