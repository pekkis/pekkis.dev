import * as React from "react";
import { Link } from "gatsby";
import { FC } from "react";
import { PostType } from "../types";
import { blogPostUrl } from "../services/url";
import {
  baseClass,
  listClass,
  postClass,
  headerClass,
  dateClass
} from "./BlogPosts.css";
import { DateTime } from "luxon";

type Props = {
  posts: PostType[];
};

const BlogPosts: FC<Props> = ({ posts }) => {
  return (
    <ol className={listClass}>
      {posts.map((post) => {
        const date = DateTime.fromISO(post.date)
          .setLocale("fi")
          .setZone("Europe/Helsinki");

        return (
          <li key={post.slug}>
            <article
              className={postClass}
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <h2 className={headerClass}>
                  <Link to={blogPostUrl(post)} itemProp="url">
                    <span itemProp="headline">{post.title}</span>
                  </Link>
                </h2>
                <time
                  className={dateClass}
                  dateTime={date.toFormat("yyyy-LL-dd")}
                >
                  {date.toLocaleString()}
                </time>
              </header>
              <section>
                <p>{post.ingress.ingress}</p>
              </section>
            </article>
          </li>
        );
      })}
    </ol>
  );
};

export default BlogPosts;
