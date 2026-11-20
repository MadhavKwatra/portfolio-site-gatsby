import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Seo } from '@components';

// One blog post (content/posts/<folder>/index.md). Pages are made in gatsby-node.js.

// The global <main> keeps its side padding; the article sits in one centred column (~68 characters).
const StyledPostContainer = styled.main`
  .post {
    max-width: 720px;
    margin: 0 auto;
  }
`;

const StyledPostHeader = styled.header`
  margin-bottom: 40px;

  h1 {
    margin: 0;
    font-size: clamp(30px, 5.2vw, 46px);
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--lightest-slate);
    overflow-wrap: break-word;
    text-wrap: balance;
  }

  .subtitle {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 20px;
    margin: 18px 0 0;
  }

  .tags {
    color: var(--slate);
  }

  .cover {
    margin-top: 36px;
    border-radius: var(--border-radius);
    width: 100%;
    height: auto;
    display: block;
  }
`;

const StyledPostContent = styled.div`
  margin-bottom: 60px;
  font-size: var(--fz-lg);

  @media (max-width: 480px) {
    font-size: 17px;
  }

  h2,
  h3,
  h4 {
    margin: 2.2em 0 0.7em;
    color: var(--lightest-slate);
    line-height: 1.25;
  }

  h2 {
    font-size: clamp(22px, 3.4vw, 28px);
  }

  p,
  li {
    line-height: 1.7;
    color: var(--light-slate);
  }

  strong {
    color: var(--lightest-slate);
    font-weight: 600;
  }

  p {
    margin: 1em 0;
  }

  ul,
  ol {
    padding-left: 1.4em;
  }

  li {
    margin-bottom: 0.4em;
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
    overflow-wrap: anywhere;
  }

  blockquote {
    margin: 1.5em 0;
    padding: 0.2em 1.2em;
    border-left: 3px solid var(--green);
    color: var(--slate);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
    font-size: var(--fz-md);
    display: block;
    overflow-x: auto;

    th,
    td {
      text-align: left;
      padding: 10px 12px;
      border-bottom: 1px solid var(--lightest-navy);
    }

    th {
      color: var(--lightest-slate);
    }
  }

  .gatsby-resp-image-wrapper {
    margin: 2em 0;
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  code {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
  }

  pre,
  pre[class*='language-'] {
    padding: 1.1em 1.25em;
  }

  pre {
    margin: 1.5em 0;
    border-radius: var(--border-radius);
    overflow-x: auto;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }
`;

const StyledFooter = styled.footer`
  margin-bottom: 100px;
  padding-top: 30px;
  border-top: 1px solid var(--lightest-navy);
  color: var(--slate);
  font-size: var(--fz-md);

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }
`;

const formatDate = date =>
  new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

const PostTemplate = ({ data, location }) => {
  const { frontmatter, html, timeToRead } = data.markdownRemark;
  const { title, date, tags, cover, coverAlt } = frontmatter;

  return (
    <Layout location={location}>
      <StyledPostContainer>
        <article className="post">
          <span className="breadcrumb">
            <span className="arrow">&larr;</span>
            <Link to="/blog/">All posts</Link>
          </span>

          <StyledPostHeader>
            <h1>{title}</h1>
            <p className="subtitle">
              <time dateTime={date}>{formatDate(date)}</time>
              <span>{timeToRead} min read</span>
              {tags && tags.length > 0 && (
                <span className="tags">{tags.map(t => `#${t}`).join(' ')}</span>
              )}
            </p>
            {cover && cover.publicURL && (
              <img
                className="cover"
                src={cover.publicURL}
                alt={coverAlt || title}
                width="1600"
                height="672"
              />
            )}
          </StyledPostHeader>

          <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />

          <StyledFooter>
            Thanks for reading. Questions or ideas? Write to me on{' '}
            <a href="https://www.linkedin.com/in/madhav-kwatra/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>{' '}
            or <a href="/#contact">say hello</a>. More posts on the <Link to="/blog/">blog</Link>.
          </StyledFooter>
        </article>
      </StyledPostContainer>
    </Layout>
  );
};

export default PostTemplate;

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

// eslint-disable-next-line react/prop-types
export const Head = ({ data, location }) => {
  const { frontmatter, excerpt } = data.markdownRemark;
  const { title, description, date, tags, cover } = frontmatter;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const image = cover && cover.publicURL ? cover.publicURL : null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description || excerpt,
    datePublished: date,
    author: { '@type': 'Person', name: 'Madhav Kwatra', url: siteUrl },
    url: `${siteUrl}${location.pathname}`,
    ...(image ? { image: `${siteUrl}${image}` } : {}),
    ...(tags && tags.length ? { keywords: tags.join(', ') } : {}),
  };
  return (
    <Seo
      title={title}
      description={description || excerpt}
      image={image}
      pathname={location.pathname}
      schema={schema}
      type="article">
      <meta property="article:published_time" content={date} />
      <link rel="alternate" type="application/rss+xml" title="Madhav Kwatra blog" href="/rss.xml" />
    </Seo>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 160)
      timeToRead
      frontmatter {
        title
        description
        date
        tags
        coverAlt
        cover {
          publicURL
        }
      }
    }
  }
`;
