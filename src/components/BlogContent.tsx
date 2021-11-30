import * as React from "react";
import { FC } from "react";
import { PostType } from "../types";
import { rootClass, ingressClass } from "./BlogContent.css";
import RichText from "./RichText";

type Props = {
  post: PostType;
};

const BlogContent: FC<Props> = ({ post, children }) => {
  return (
    <div className={rootClass}>
      <p className={ingressClass}>{post.ingress.ingress}</p>

      <RichText richText={post.content} />
    </div>
  );
};

export default BlogContent;
