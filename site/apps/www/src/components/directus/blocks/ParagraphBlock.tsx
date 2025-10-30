import { ParagraphBlock } from "@/services/blogposts";
import { FC } from "react";

type Props = {
  block: ParagraphBlock;
};

const ParagraphBlockRenderer: FC<Props> = ({ block }) => {
  return (
    <p className="my-4" dangerouslySetInnerHTML={{ __html: block.data.text }} />
  );
};

export default ParagraphBlockRenderer;
