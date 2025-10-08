import Bio from "@/components/Bio";
import Layout from "@/components/Layout";
import Padder from "@/components/Padder";
import { siteMetadata } from "@/services/meta";
import PageRenderer from "@/components/directus/PageRenderer";

export const revalidate = 600;

export const metadata = {
  title: siteMetadata.title,
  description:
    "Pekkiksen kotskaporttaali. Jokaisella pitäisi olla omat kotskasivut, ja minulla on tosi hieno."
};

export default async function IndexPage() {
  return (
    <>
      <Layout>
        <Padder>
          <Bio />
          <PageRenderer slug="frontpage" />
        </Padder>
      </Layout>
    </>
  );
}
