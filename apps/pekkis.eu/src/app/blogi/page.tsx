import Bio from "../../components/Bio";
import BlogPosts from "../../components/BlogPosts";
import Layout from "../../components/Layout";
import MainHeading from "../../components/MainHeading";
import Padder from "../../components/Padder";
import { headlinesQuery } from "../../queries/HeadlinesQuery";
import { graphQLClient } from "../../services/graphql";
import { siteMetadata } from "../../services/meta";
import { HeadlineType } from "../../types";

export const metadata = {
  title: `Blogi - ${siteMetadata.title}`
};

export const revalidate = 60 * 10;

export default async function BlogPage() {
  const ret = await graphQLClient.request<{
    blogPostCollection: {
      total: number;
      items: HeadlineType[];
    };
  }>(headlinesQuery, {
    limit: 50
  });

  return (
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
          blogissa. Näihin oman brändini alla julkaisemiini versioihin kannattaa
          vastedes suhtautua kaanonina, ikään kuin remasteroituina ohjaajan
          versioina.
        </p>

        <BlogPosts
          posts={ret.blogPostCollection.items.filter((h) => h.visible)}
        />
      </Padder>
    </Layout>
  );
}