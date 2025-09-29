import { FC } from "react";
import { ingressClass, rootClass } from "./BlogContent.css";
import { BlogPostType } from "@/services/blogposts";
import BlocksRenderer from "@/components/directus/BlocksRenderer";

type Props = {
  post: BlogPostType;
};

const BlogContent: FC<Props> = ({ post }) => {
  return (
    <div className={rootClass}>
      <p className={ingressClass}>{post.ingress}</p>

      <BlocksRenderer blocks={post.content.blocks} />
    </div>
  );
};

export default BlogContent;
