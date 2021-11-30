import { getImage } from "gatsby-plugin-image";
import { GatsbyImage } from "gatsby-plugin-image";
import { DateTime } from "luxon";
import * as React from "react";
import { FC } from "react";
import { PostType } from "../types";
import {
  rootClass,
  headerContentClass,
  headerClass,
  mainImageClass,
  dateClass
} from "./BlogHeader.css";

type Props = {
  post: PostType;
};

const BlogHeader: FC<Props> = ({ post }) => {
  const date = DateTime.fromISO(post.date)
    .setLocale("fi")
    .setZone("Europe/Helsinki");

  return (
    <header className={rootClass}>
      {post.mainImage && (
        <GatsbyImage
          className={mainImageClass}
          image={getImage(post.mainImage.image)}
          alt={post.mainImage.alternateText}
        />
      )}

      <div className={headerContentClass}>
        <h1 className={headerClass} itemProp="headline">
          {post.title}
        </h1>
        <time className={dateClass} dateTime={date.toFormat("yyyy-LL-dd")}>
          {date.toLocaleString()}
        </time>
      </div>
    </header>
  );
};

export default BlogHeader;
