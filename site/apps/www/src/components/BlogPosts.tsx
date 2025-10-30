import { DateTime } from "luxon";
import { FC } from "react";
import { blogPostUrl } from "@/services/url";
import { HeadlineType } from "@/services/blogposts";
import { Paragraph } from "@/components/Paragraph";
import { Link } from "@/components/Link";

type Props = {
  posts: HeadlineType[];
};

const BlogPosts: FC<Props> = ({ posts }) => {
  return (
    <ol>
      {posts.map((post) => {
        const date = DateTime.fromISO(post.date)
          .setLocale("fi")
          .setZone("Europe/Helsinki");

        return (
          <li key={post.slug}>
            <article
              className="mt-4 mb-6"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <h3 className="m-0 text-lg font-semibold">
                  <Link href={blogPostUrl(post)} itemProp="url">
                    <span itemProp="headline">{post.title}</span>
                  </Link>
                </h3>
                <time
                  className="text-base m-0"
                  dateTime={date.toFormat("yyyy-LL-dd")}
                >
                  {date.toLocaleString()}
                </time>
              </header>
              <section>
                <Paragraph>{post.ingress}</Paragraph>
              </section>
            </article>
          </li>
        );
      })}
    </ol>
  );
};

export default BlogPosts;
