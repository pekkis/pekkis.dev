import * as React from "react";
import { graphql } from "gatsby";
import Bio from "../components/Bio";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Padder from "../components/Padder";
import BlogPosts from "../components/BlogPosts";

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allContentfulBlogPost.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Padder>
        <Bio />

        <h2>Heippa!</h2>

        <BlogPosts posts={posts} />
      </Padder>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(
      filter: { node_locale: { eq: "fi" } }
      sort: { order: DESC, fields: [date] }
    ) {
      nodes {
        id
        date
        slug
        title
        ingress {
          ingress
        }
        node_locale
      }
    }
  }
`;
