import { DateTime } from "luxon";
import { FC } from "react";

import {
  dateClass,
  headerClass,
  headerContentClass,
  rootClass
} from "./BlogHeader.css";

import { BlogPostType } from "@/services/blogposts";
import AdvancedImage from "@/components/AdvancedImage";

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
        <AdvancedImage
          loading="eager"
          fetchPriority="high"
          alt={post.mainImage.title}
          config={{
            width: [350, 640, 1024, 2048],
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
