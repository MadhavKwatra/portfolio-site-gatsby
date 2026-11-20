import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Seo } from '@components';

// /blog/: every published post (content/posts/*/index.md without `draft: true`), newest first.

// The global <main> keeps its side padding; the list sits in a centred 1000px column.
const StyledMain = styled.main`
  .wrap {
    max-width: 1000px;
    margin: 0 auto;
  }

  header {
    margin-bottom: 60px;

    @media (max-width: 768px) {
      margin-bottom: 40px;
    }
  }

  .empty {
    color: var(--light-slate);
    font-size: var(--fz-lg);
  }
`;

// An index, not cards: date on the left (like Experience), title + summary, the cover as a wide strip.
const StyledList = styled.ol`
  ${({ theme }) => theme.mixins.resetList};
  border-top: 1px solid var(--lightest-navy);
  margin-bottom: 100px;
`;

const StyledRow = styled.li`
  border-bottom: 1px solid var(--lightest-navy);

  a {
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr) minmax(0, 300px);
    grid-template-areas: 'date text cover';
    gap: 32px;
    align-items: start;
    padding: 36px 0;
    color: inherit;
    text-decoration: none;

    @media (max-width: 900px) {
      grid-template-columns: minmax(0, 1fr) minmax(0, 260px);
      grid-template-areas:
        'date date'
        'text cover';
      gap: 12px 28px;
    }

    @media (max-width: 600px) {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas:
        'cover'
        'date'
        'text';
      gap: 14px;
      padding: 28px 0;
    }

    &:hover h2,
    &:focus-visible h2 {
      color: var(--green);
    }

    &:focus-visible {
      outline: 2px dashed var(--green);
      outline-offset: 6px;
    }
  }

  time {
    grid-area: date;
    padding-top: 6px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--green);
    white-space: nowrap;

    @media (max-width: 900px) {
      padding-top: 0;
    }
  }

  .text {
    grid-area: text;
    min-width: 0;
  }

  h2 {
    margin: 0 0 12px;
    font-size: clamp(22px, 3vw, 28px);
    line-height: 1.25;
    color: var(--lightest-slate);
    transition: color 0.2s ease;
  }

  p {
    margin: 0;
    max-width: 60ch;
    color: var(--light-slate);
    font-size: var(--fz-lg);
    line-height: 1.55;

    @media (max-width: 600px) {
      font-size: var(--fz-md);
    }
  }

  .read {
    display: block;
    margin-top: 12px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--slate);
  }

  .cover {
    grid-area: cover;
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1600 / 672;
    object-fit: cover;
    border-radius: var(--border-radius);
  }

  @media (prefers-reduced-motion: reduce) {
    h2 {
      transition: none;
    }
  }
`;

const formatDate = date =>
  new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });

const BlogPage = ({ location, data }) => {
  const posts = data.posts.nodes;

  return (
    <Layout location={location}>
      <StyledMain>
        <div className="wrap">
          <header>
            <h1 className="big-heading">Blog</h1>
            <p className="subtitle">Notes from building my apps: what broke, and what I learned.</p>
          </header>

          {posts.length === 0 ? (
            <p className="empty">The first post is on its way.</p>
          ) : (
            <StyledList>
              {posts.map(({ id, timeToRead, frontmatter }) => (
                <StyledRow key={id}>
                  <Link to={frontmatter.slug}>
                    <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
                    <div className="text">
                      <h2>{frontmatter.title}</h2>
                      <p>{frontmatter.description}</p>
                      <span className="read">{timeToRead} min read</span>
                    </div>
                    {frontmatter.cover && frontmatter.cover.publicURL && (
                      <img
                        className="cover"
                        src={frontmatter.cover.publicURL}
                        alt={frontmatter.coverAlt || frontmatter.title}
                        width="1600"
                        height="672"
                        loading="lazy"
                      />
                    )}
                  </Link>
                </StyledRow>
              ))}
            </StyledList>
          )}
        </div>
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
          coverAlt
          cover {
            publicURL
          }
        }
      }
    }
  }
`;
