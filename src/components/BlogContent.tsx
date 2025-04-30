import { FC } from "react";
import { ingressClass, rootClass } from "./BlogContent.css";
import { BlogPostType } from "@/services/blogposts";
import BlogPostRenderer from "@/components/directus/BlogPostRenderer";

type Props = {
  post: BlogPostType;
};

const BlogContent: FC<Props> = ({ post }) => {
  return (
    <div className={rootClass}>
      <p className={ingressClass}>{post.ingress}</p>

      <BlogPostRenderer post={post} />
    </div>
  );
};

export default BlogContent;
