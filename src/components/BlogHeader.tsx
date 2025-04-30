import { DateTime } from "luxon";
import { FC } from "react";

import {
  dateClass,
  headerClass,
  headerContentClass,
  rootClass
} from "./BlogHeader.css";

import { BlogPostType } from "@/services/blogposts";
import ImgproxyImage from "@/components/ImgproxyImage";

type Props = {
  post: BlogPostType;
};

const BlogHeader: FC<Props> = ({ post }) => {
  const date = DateTime.fromISO(post.date)
    .setLocale("fi")
    .setZone("Europe/Helsinki");

  return (
    <header className={rootClass}>
      {post.mainImage && (
        <ImgproxyImage
          alt={post.mainImage.title}
          config={{
            width: 1024,
            aspectRatio: 16 / 9,
            fit: "fill-down"
          }}
          data={{
            title: post.mainImage.title,
            url: `/assets/${post.mainImage.id}`
          }}
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
