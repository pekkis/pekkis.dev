import HeaderBlock from "@/components/directus/blocks/HeaderBlock";
import ImageBlock from "@/components/directus/blocks/ImageBlock";
import ParagraphBlock from "@/components/directus/blocks/ParagraphBlock";
import UnknownBlock from "@/components/directus/blocks/UnknownBlock";
import { BlogPostType } from "@/services/blogposts";
import { FC } from "react";

type Props = {
  post: BlogPostType;
};

const BlogPostRenderer: FC<Props> = ({ post }) => {
  return (
    <>
      {post.content.blocks.map((item) => {
        switch (item.type) {
          case "header":
            return <HeaderBlock key={item.id} block={item} />;
          case "paragraph":
            return <ParagraphBlock key={item.id} block={item} />;

          case "image":
            return <ImageBlock key={item.id} block={item} />;

          default:
            // @ts-expect-error this will still stay here.
            return <UnknownBlock key={item.id} block={item} />;
        }
      })}
    </>
  );
};

export default BlogPostRenderer;
