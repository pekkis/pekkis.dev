import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { cache } from "react";
import { graphQLClient } from "../../../../../../services/graphql";
import { BlogPostType, HeadlineType } from "../../../../../../types";
import { headlinesQuery } from "../../../../../../queries/HeadlinesQuery";
import { gql } from "graphql-request";
import { DateTime } from "luxon";
import Layout from "../../../../../../components/Layout";
import BlogHeader from "../../../../../../components/BlogHeader";
import BlogContent from "../../../../../../components/BlogContent";
import Padder from "../../../../../../components/Padder";
import Bio from "../../../../../../components/Bio";
import { blogPostUrl } from "../../../../../../services/url";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
    year: string;
    month: string;
    day: string;
  };
};

export const revalidate = 60 * 10;

export const getPost = cache(async (slug: string) => {
  const headlines = await graphQLClient.request<{
    blogPostCollection: {
      items: HeadlineType[];
    };
  }>(headlinesQuery);

  const query = gql`
    query BlogPostArticle($slug: String!) {
      blogPostCollection(limit: 1, where: { slug: $slug }) {
        items {
          sys {
            id
          }
          title
          ingress
          date
          content {
            links {
              assets {
                __typename
                block {
                  sys {
                    id
                  }
                  __typename
                  width
                  height
                  url
                  title
                  description
                  sys {
                    id
                  }
                }
              }
            }

            json
          }
          mainImage {
            sys {
              id
            }
            image {
              title
              url
              width
              height
            }
          }
        }
      }
    }
  `;

  const ret = await graphQLClient.request<{
    blogPostCollection: {
      items: BlogPostType[];
    };
  }>(query, {
    slug
  });

  if (ret.blogPostCollection.items.length !== 1) {
    notFound();
  }

  const post = ret.blogPostCollection.items[0];

  const currentIndex = headlines.blogPostCollection.items.findIndex(
    (h) => h.slug === slug
  );

  const previous = headlines.blogPostCollection.items[currentIndex - 1] || null;
  const next = headlines.blogPostCollection.items[currentIndex + 1] || null;

  return {
    post,
    next,
    previous
  };
});

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const data = await getPost(params.slug);

  return {
    title: data.post.title,
    openGraph: {
      images: [`${data.post.mainImage.image.url}?w=1024`]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { post, next, previous } = await getPost(params.slug);

  const date = DateTime.fromISO(post.date)
    .setLocale("fi")
    .setZone("Europe/Helsinki");

  const year = date.toFormat("yyyy");
  const month = date.toFormat("LL");
  const day = date.toFormat("dd");

  if (year !== params.year || month !== params.month || day !== params.day) {
    notFound();
  }

  return (
    <Layout>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <BlogHeader post={post} />
        <BlogContent post={post} />

        <footer>
          <Padder>
            <Bio />
          </Padder>
        </footer>
      </article>
      <Padder>
        <nav className="blog-post-nav">
          <ul>
            {previous && (
              <li>
                <Link legacyBehavior href={blogPostUrl(previous)} rel="prev">
                  <a>← {previous.title}</a>
                </Link>
              </li>
            )}

            {next && (
              <li>
                <Link legacyBehavior href={blogPostUrl(next)} rel="next">
                  <a>{next.title} →</a>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </Padder>
    </Layout>
  );
}
