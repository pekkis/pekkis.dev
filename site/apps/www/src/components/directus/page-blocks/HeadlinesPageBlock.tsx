import BlogPosts from "@/components/BlogPosts";
import SubHeading from "@/components/SubHeading";
import { getHeadlines } from "@/services/blogposts";
import { HeadlinesPageBlock } from "@/services/pages";
import { FC } from "react";

type Props = {
  block: HeadlinesPageBlock;
};

const HeadlinesPageBlockRenderer: FC<Props> = async ({ block }) => {
  console.log("BLOCK", block);

  const headlines = await getHeadlines(block.item.amount);

  return (
    <>
      <SubHeading>{block.item.title}</SubHeading>

      <BlogPosts posts={headlines} />
    </>
  );
};

export default HeadlinesPageBlockRenderer;
