import Bio from "../components/Bio";
import BlogPosts from "../components/BlogPosts";
import Layout from "../components/Layout";
import Padder from "../components/Padder";
import { graphQLClient } from "../services/graphql";
import { HeadlineType, VideoType } from "../types";
import { headlinesQuery } from "../queries/HeadlinesQuery";
import { siteMetadata } from "../services/meta";
import MainHeading from "../components/MainHeading";
import SubHeading from "../components/SubHeading";
import Preachings from "../components/Preachings";
import PageTracker from "./PageTracker";

const preachings: VideoType[] = [
  {
    videoId: "Imjqd9JiG_M",
    title: "Virkamiessaarna 5: fronttidevauksen kristallikallo 2222"
  },
  {
    videoId: "0Kl7NIE0Eb8",
    title: "Vuorisaarna 4.0: tekno-evankeliumi 3019"
  },
  {
    videoId: "QKE8Eusvp0I",
    title: "40-vuotisjuhlavuorisaarna"
  },
  {
    videoId: "OguXQ0zDOko",
    title: "Vuorisaarna II: Toinen tuleminen"
  },
  {
    videoId: "Mk5sAUc0EB8",
    title: "React-vuorisaarna"
  }
];

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

export const metadata = {
  title: siteMetadata.title
};

export default async function IndexPage() {
  const headlines = await graphQLClient.request<{
    blogPostCollection: {
      total: number;
      items: HeadlineType[];
    };
  }>(headlinesQuery, {
    limit: 6
  });

  return (
    <>
      <PageTracker />
      <Layout>
        <Padder>
          <Bio />

          <MainHeading>Helei ja tervetuloa!</MainHeading>

          <p>
            Heipparallaa! Minä olen Pekkis, ohjelmoitsija ammatiltani, ja tämä
            on kotskaporttaalini.
          </p>

          <SubHeading>Pekkis-linkit</SubHeading>

          <ul>
            {linkzors.map((linkzor, i) => {
              return (
                <li key={i}>
                  <a
                    href={linkzor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkzor.title}
                  </a>
                </li>
              );
            })}
          </ul>

          <SubHeading>Pekkis kirjoittaa</SubHeading>

          <BlogPosts
            posts={headlines.blogPostCollection.items.filter(
              (h) => h.visible || process.env.NEXT_PUBLIC_SHOW_INVISIBLE
            )}
          />

          <SubHeading>Pekkis saarnaa</SubHeading>

          <Preachings videos={preachings} />
        </Padder>
      </Layout>
    </>
  );
}
