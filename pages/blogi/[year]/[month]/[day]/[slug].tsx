import { gql } from "graphql-request";
import { DateTime } from "luxon";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";
import Bio from "../../../../../components/Bio";
import BlogContent from "../../../../../components/BlogContent";
import BlogHeader from "../../../../../components/BlogHeader";
import Layout from "../../../../../components/Layout";
import Padder from "../../../../../components/Padder";
import { headlinesQuery } from "../../../../../queries/HeadlinesQuery";
import { graphQLClient } from "../../../../../services/graphql";
import { siteMetadata } from "../../../../../services/meta";
import { blogPostUrl } from "../../../../../services/url";
import { BlogPostType, HeadlineType } from "../../../../../types";

type Props = {
  post: BlogPostType;
  previous?: HeadlineType;
  next?: HeadlineType;
};

type Params = {
  year: string;
  month: string;
  day: string;
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
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
    slug: ctx.params?.slug!
  });

  if (ret.blogPostCollection.items.length !== 1) {
    return {
      notFound: true
    };
  }

  const post = ret.blogPostCollection.items[0];

  const date = DateTime.fromISO(post.date)
    .setLocale("fi")
    .setZone("Europe/Helsinki");

  const year = date.toFormat("yyyy");
  const month = date.toFormat("LL");
  const day = date.toFormat("dd");

  if (
    year !== ctx.params?.year! ||
    month !== ctx.params?.month! ||
    day !== ctx.params?.day!
  ) {
    return {
      notFound: true
    };
  }

  const currentIndex = headlines.blogPostCollection.items.findIndex(
    (h) => h.slug === ctx.params?.slug!
  );

  const previous = headlines.blogPostCollection.items[currentIndex - 1] || null;
  const next = headlines.blogPostCollection.items[currentIndex + 1] || null;

  return {
    props: {
      post,
      next,
      previous
    }
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const query = gql`
    query GenerateSlugs {
      blogPostCollection(order: [date_DESC]) {
        items {
          date
          slug
        }
      }
    }
  `;

  const ret = await graphQLClient.request<{
    blogPostCollection: {
      total: number;
      items: { date: string; slug: string }[];
    };
  }>(query);

  return {
    paths: ret.blogPostCollection.items.map((i) => {
      return blogPostUrl(i);
    }),
    fallback: "blocking"
  };
};

const BlogPostPage: FC<Props> = ({ post, previous, next }) => {
  return (
    <>
      <Head>
        <title>{`${post.title} - ${siteMetadata.title}`}</title>
      </Head>

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
    </>
  );
};

export default BlogPostPage;
