import * as React from "react";
import { graphql } from "gatsby";
import Bio from "../components/Bio";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Padder from "../components/Padder";
import BlogPosts from "../components/BlogPosts";

const linkzors = [
  {
    title: "Pekkis LinkedInissä",
    url: "https://www.linkedin.com/in/pekkis/"
  },
  {
    title: "Pekkis Githubissa",
    url: "https://github.com/pekkis/"
  },
  {
    title: "Pekkis Twitterissä",
    url: "https://twitter.com/pekkisx"
  },
  {
    title: "Pekkiksen ankara React-valmennus",
    url: "https://pekkis.github.io/hardcore-react-training/"
  },
  {
    title: "Diktaattoripörssi",
    url: "https://www.diktaattoriporssi.com/"
  },
  {
    title: "MHM Online",
    url: "https://www.mhm-online.org/"
  },
  {
    title: "Dr. Kobros Foundation",
    url: "https://www.dr-kobros.com/"
  }
];

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allContentfulBlogPost.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Padder>
        <Bio />

        <h2>Helei ja tervetuloa!</h2>

        <p>
          Heipparallaa! Minä olen Pekkis, ohjelmoitsija ammatiltani, ja tämä on
          kotskaporttaalini.
        </p>

        <p>
          Ensi hätään kasasin tänne alunperin entisen yritykseni{" "}
          <a
            href="https://www.fraktio.fi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fraktion
          </a>{" "}
          blogissa julkaistut postaukset. Näihin oman brändini alla
          julkaisemiini versioihin kannattaa suhtautua kaanonina, ikään kuin
          remasteroituina ohjaajan versiona.
        </p>

        <h2>Pekkis-linkkejä</h2>

        <ul>
          {linkzors.map((linkzor) => {
            return (
              <li>
                <a href={linkzor.url} target="_blank" rel="noopener noreferrer">
                  {linkzor.title}
                </a>
              </li>
            );
          })}
        </ul>

        <h2>Blogautukset</h2>

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
