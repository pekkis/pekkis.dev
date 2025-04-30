import { Metadata } from "next";
import { notFound } from "next/navigation";

import { DateTime } from "luxon";
import Link from "next/link";
import { cache } from "react";
import Bio from "@/components/Bio";
import BlogContent from "@/components/BlogContent";
import BlogHeader from "@/components/BlogHeader";
import Layout from "@/components/Layout";
import Padder from "@/components/Padder";
import * as blogService from "@/services/blogposts";
import { blogPostUrl } from "@/services/url";
import DidNotAgeWellWarning from "@/components/DidNotAgeWellWarning";
import imgproxy from "@/services/imgproxy";

type Props = {
  params: Promise<{
    slug: string;
    year: string;
    month: string;
    day: string;
  }>;
};

export const revalidate = 600;

const getPost = cache(
  async (year: string, month: string, day: string, slug: string) => {
    try {
      const headlines = await blogService.getPosts(100);
      const post = await blogService.getPost(year, month, day, slug);

      const currentIndex = headlines.findIndex((h) => h.slug === slug);

      const previous = headlines[currentIndex - 1] || null;
      const next = headlines[currentIndex + 1] || null;

      return {
        post,
        next,
        previous
      };
    } catch (e) {
      console.log(e);
      notFound();
    }
  }
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month, day, slug } = await params;

  const data = await getPost(year, month, day, slug);

  const url = imgproxy
    .builder()
    .generateUrl(`https://cms.pekkis.eu/assets/${data.post.mainImage.id}`);

  return {
    title: data.post.title,
    openGraph: {
      images: [url]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, year, month, day } = await params;
  const { post, next, previous } = await getPost(year, month, day, slug);

  const date = DateTime.fromISO(post.date)
    .setLocale("fi")
    .setZone("Europe/Helsinki");

  const yearX = date.toFormat("yyyy");
  const monthX = date.toFormat("LL");
  const dayX = date.toFormat("dd");

  if (year !== yearX || month !== monthX || day !== dayX) {
    notFound();
  }

  return (
    <Layout>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        {post.tags?.includes("did-not-age-well") && <DidNotAgeWellWarning />}

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
                <Link href={blogPostUrl(previous)} rel="prev">
                  ← {previous.title}
                </Link>
              </li>
            )}

            {next && (
              <li>
                <Link href={blogPostUrl(next)} rel="next">
                  {next.title} →
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </Padder>
    </Layout>
  );
}
