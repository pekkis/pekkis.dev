import * as React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/Bio";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import BlogContent from "../components/BlogContent";
import { blogPostUrl } from "../services/url";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import BlogHeader from "../components/BlogHeader";
import Padder from "../components/Padder";

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulBlogPost;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  console.log("POST CONTENNT", post.content, next, previous);

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={post.title} description={post.title} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <BlogHeader post={post} />
        <BlogContent post={post} />

        <footer>
          <Padder>
            <Bio />
          </Padder>
        </footer>
      </article>
      <Padder>
        <nav className="blog-post-nav">
          <ul>
            {previous && (
              <li>
                <Link to={blogPostUrl(previous)} rel="prev">
                  ← {previous.title}
                </Link>
              </li>
            )}

            {next && (
              <li>
                <Link to={blogPostUrl(next)} rel="next">
                  {next.title} →
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </Padder>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(id: { eq: $id }) {
      id
      date
      slug
      title
      ingress {
        ingress
      }
      mainImage {
        id
        alternateText
        image {
          gatsbyImageData(
            layout: CONSTRAINED
            formats: [AUTO, WEBP]
            placeholder: BLURRED
            resizingBehavior: FILL
            quality: 80
            width: 1000
            aspectRatio: 2
          )
        }
      }
      content {
        raw
        references {
          __typename
          contentful_id
          ... on ContentfulAsset {
            id
            title
            description
            gatsbyImageData(
              layout: CONSTRAINED
              formats: [AUTO, WEBP]
              placeholder: BLURRED
              resizingBehavior: FILL
              quality: 80
              width: 1000
            )
          }
        }
      }
    }
    previous: contentfulBlogPost(id: { eq: $previousPostId }) {
      id
      date
      slug
      title
    }
    next: contentfulBlogPost(id: { eq: $nextPostId }) {
      id
      date
      slug
      title
    }
  }
`;
