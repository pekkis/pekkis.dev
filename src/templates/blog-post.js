import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import RichText from "../components/RichText"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulBlogPost
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={post.title} description={post.title} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.date}</p>
        </header>
        <hr />

        <RichText richText={post.content} />

        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

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
      content {
        raw
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
`
