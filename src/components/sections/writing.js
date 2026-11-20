import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

// Home page "Latest writing": the newest 3 published blog posts + a link to /blog/.
// Drafts (`draft: true`) stay out, same filter as src/pages/blog.js. No posts = no section.

const StyledWritingSection = styled.section`
  max-width: 900px;

  .posts {
    ${({ theme }) => theme.mixins.resetList};
    border-top: 1px solid var(--lightest-navy);
  }

  li {
    border-bottom: 1px solid var(--lightest-navy);
  }

  .post {
    display: grid;
    grid-template-columns: 110px minmax(0, 1fr);
    gap: 24px;
    padding: 24px 0;
    color: inherit;
    text-decoration: none;

    @media (max-width: 600px) {
      grid-template-columns: minmax(0, 1fr);
      gap: 6px;
      padding: 20px 0;
    }

    &:hover h3,
    &:focus-visible h3 {
      color: var(--green);
    }

    &:focus-visible {
      outline: 2px dashed var(--green);
      outline-offset: 6px;
    }
  }

  time {
    padding-top: 4px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--green);
    white-space: nowrap;

    @media (max-width: 600px) {
      padding-top: 0;
    }
  }

  h3 {
    margin: 0 0 8px;
    font-size: var(--fz-xxl);
    line-height: 1.3;
    color: var(--lightest-slate);
    transition: color 0.2s ease;

    @media (max-width: 600px) {
      font-size: var(--fz-xl);
    }
  }

  p {
    margin: 0;
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.5;
  }

  .all-posts {
    ${({ theme }) => theme.mixins.inlineLink};
    display: inline-block;
    margin-top: 30px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  @media (prefers-reduced-motion: reduce) {
    h3 {
      transition: none;
    }
  }
`;

const formatDate = date =>
  new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });

const Writing = () => {
  const data = useStaticQuery(graphql`
    {
      posts: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/posts/" }
          frontmatter: { draft: { ne: true } }
        }
        sort: { frontmatter: { date: DESC } }
        limit: 3
      ) {
        nodes {
          id
          frontmatter {
            title
            description
            date
            slug
          }
        }
      }
    }
  `);

  const posts = data.posts.nodes;
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !revealContainer.current) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  if (posts.length === 0) {
    return null;
  }

  return (
    <StyledWritingSection id="writing" ref={revealContainer}>
      <h2 className="numbered-heading">Latest writing</h2>

      <ul className="posts">
        {posts.map(({ id, frontmatter }) => (
          <li key={id}>
            <Link className="post" to={frontmatter.slug}>
              <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
              <div>
                <h3>{frontmatter.title}</h3>
                <p>{frontmatter.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Link className="all-posts" to="/blog/">
        All posts →
      </Link>
    </StyledWritingSection>
  );
};

export default Writing;
