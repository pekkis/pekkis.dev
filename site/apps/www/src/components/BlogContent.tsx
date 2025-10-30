import { FC } from "react";
import { BlogPostType } from "@/services/blogposts";
import BlocksRenderer from "@/components/directus/BlocksRenderer";

type Props = {
  post: BlogPostType;
};

const BlogContent: FC<Props> = ({ post }) => {
  return (
    <div className="p-4">
      <p className="text-xl m-0 mb-6">{post.ingress}</p>
      <BlocksRenderer blocks={post.content?.blocks || []} />
    </div>
  );
};

export default BlogContent;
