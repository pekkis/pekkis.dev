import { Anchor } from "@/components/Anchor";
import Bio from "@/components/Bio";
import BlogPosts from "@/components/BlogPosts";
import Layout from "@/components/Layout";
import MainHeading from "@/components/MainHeading";
import Padder from "@/components/Padder";
import { Paragraph } from "@/components/Paragraph";
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

        <Paragraph>
          Tässäpä kaikki blogautukseni vuosien varrelta. Kuten lukija helposti
          huomaa, kirjoitustahtini on hidas mutta epävarma.
        </Paragraph>

        <Paragraph>
          Osa kirjoituksista on alunperin julkaistu entisen pajani{" "}
          <Anchor
            href="https://www.fraktio.fi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fraktion
          </Anchor>{" "}
          blogissa. Näihin oman brändini alla julkaisemiini versioihin kannattaa
          vastedes suhtautua kaanonina, ikään kuin remasteroituina ohjaajan
          versioina.
        </Paragraph>

        <BlogPosts posts={headlines} />
      </Padder>
    </Layout>
  );
}
