import { GetStaticProps } from "next";
import { FC } from "react";
import Bio from "../components/Bio";
import BlogPosts from "../components/BlogPosts";
import Layout from "../components/Layout";
import Padder from "../components/Padder";
import { graphQLClient } from "../services/graphql";
import { HeadlineType } from "../types";
import { headlinesQuery } from "../queries/HeadlinesQuery";
import Head from "next/head";
import { siteMetadata } from "../services/meta";
import MainHeading from "../components/MainHeading";
import SubHeading from "../components/SubHeading";

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
  }>(headlinesQuery, {
    limit: 50
  });

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
  return (
    <>
      <Head>
        <title>{`Blogi - ${siteMetadata.title}`}</title>
      </Head>
      <Layout>
        <Padder>
          <Bio />

          <MainHeading>Blogi</MainHeading>

          <p>
            Tässäpä kaikki blogautukseni vuosien varrelta. Kuten lukija helposti
            huomaa, kirjoitustahtini on hidas mutta epävarma.
          </p>

          <p>
            Osa kirjoituksista on alunperin julkaistu entisen pajani{" "}
            <a
              href="https://www.fraktio.fi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fraktion
            </a>{" "}
            blogissa. Näihin oman brändini alla julkaisemiini versioihin
            kannattaa vastedes suhtautua kaanonina, ikään kuin remasteroituina
            ohjaajan versioina.
          </p>

          <BlogPosts posts={headlines} />
        </Padder>
      </Layout>
    </>
  );
};

export default IndexPage;
