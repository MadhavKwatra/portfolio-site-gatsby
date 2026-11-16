import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Seo } from '@components';

// /blog/: every published post (content/posts/*/index.md without `draft: true`), newest first.

const StyledMain = styled.main`
  max-width: 900px;
  margin: 0 auto;

  header {
    margin-bottom: 50px;
  }
`;

const StyledList = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  gap: 24px;
  margin-bottom: 100px;
`;

const StyledPost = styled.li`
  a.card {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 24px;
    padding: 20px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    text-decoration: none;
    color: inherit;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      transform: translateY(-4px);
      h2 {
        color: var(--green);
      }
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  img {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius);
    display: block;
  }

  h2 {
    margin: 0 0 8px;
    font-size: var(--fz-xxl);
    color: var(--lightest-slate);
    transition: var(--transition);
  }

  .meta {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--green);
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.5;
  }
`;

const formatDate = date =>
  new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });

const BlogPage = ({ location, data }) => {
  const posts = data.posts.nodes;

  return (
    <Layout location={location}>
      <StyledMain>
        <header>
          <h1 className="big-heading">Blog</h1>
          <p className="subtitle">What I learn while building my apps and side projects</p>
        </header>

        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <StyledList>
            {posts.map(({ id, timeToRead, frontmatter }) => (
              <StyledPost key={id}>
                <Link className="card" to={frontmatter.slug}>
                  {frontmatter.cover && frontmatter.cover.publicURL ? (
                    <img
                      src={frontmatter.cover.publicURL}
                      alt=""
                      width="1600"
                      height="672"
                      loading="lazy"
                    />
                  ) : (
                    <span />
                  )}
                  <div>
                    <h2>{frontmatter.title}</h2>
                    <div className="meta">
                      {formatDate(frontmatter.date)} · {timeToRead} min read
                    </div>
                    <p>{frontmatter.description}</p>
                  </div>
                </Link>
              </StyledPost>
            ))}
          </StyledList>
        )}
      </StyledMain>
    </Layout>
  );
};

BlogPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default BlogPage;

// eslint-disable-next-line react/prop-types
export const Head = ({ location }) => (
  <Seo
    title="Blog"
    description="Madhav Kwatra writes about what he learns building Android apps, React Native and side projects."
    pathname={location.pathname}>
    <link rel="alternate" type="application/rss+xml" title="Madhav Kwatra blog" href="/rss.xml" />
  </Seo>
);

export const pageQuery = graphql`
  {
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/posts/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        timeToRead
        frontmatter {
          title
          description
          date
          slug
          cover {
            publicURL
          }
        }
      }
    }
  }
`;
