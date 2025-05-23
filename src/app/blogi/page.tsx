import Bio from "@/components/Bio";
import BlogPosts from "@/components/BlogPosts";
import Layout from "@/components/Layout";
import MainHeading from "@/components/MainHeading";
import Padder from "@/components/Padder";
import { getHeadlines } from "@/services/blogposts";
import { siteMetadata } from "@/services/meta";

export const metadata = {
  title: `Blogi - ${siteMetadata.title}`
};

export const revalidate = 600;

export default async function BlogPage() {
  const headlines = await getHeadlines(50);

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

        <BlogPosts posts={headlines} />
      </Padder>
    </Layout>
  );
}
