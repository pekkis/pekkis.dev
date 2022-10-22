import { GetStaticProps } from "next";
import { FC } from "react";
import Bio from "../components/Bio";
import BlogPosts from "../components/BlogPosts";
import Layout from "../components/Layout";
import Padder from "../components/Padder";
import { graphQLClient } from "../services/graphql";
import { HeadlineType } from "../types";
import { gql } from "graphql-request";
import { headlinesQuery } from "../queries/HeadlinesQuery";

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

type Props = {
  headlines: HeadlineType[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  // const articulados = await parsedArticles;

  const ret = await graphQLClient.request<{
    blogPostCollection: {
      total: number;
      items: HeadlineType[];
    };
  }>(headlinesQuery);

  return {
    props: {
      headlines: ret.blogPostCollection.items
    }
  };

  /*
  return {
    props: {
      latest: take(50, articulados).map((a) => {
        return {
          id: a.id,
          dateLastModified: a.dateContentModified,
          datePublished: a.datePublished,
          headline: {
            full: a.headline.full,
            image: {
              id: a.headline.image?.id || null,
              alt: a.headline.image?.alt || null
            }
          }
        };
      })
    }
  };
  */
};

const IndexPage: FC<Props> = ({ headlines }) => {
  // const siteTitle = data.site.siteMetadata?.title || `Title`;
  // const posts = data.allContentfulBlogPost.nodes;

  const siteTitle = "Pekkis.eu";

  return (
    <Layout>
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
          {linkzors.map((linkzor, i) => {
            return (
              <li key={i}>
                <a href={linkzor.url} target="_blank" rel="noopener noreferrer">
                  {linkzor.title}
                </a>
              </li>
            );
          })}
        </ul>

        <h2>Blogautukset</h2>

        <BlogPosts posts={headlines} />
      </Padder>
    </Layout>
  );
};

export default IndexPage;

/*
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
*/
