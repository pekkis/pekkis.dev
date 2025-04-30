import { Block } from "@/services/blogposts";
import { FC } from "react";

type Props = {
  block: Block;
};

const UnknownBlockRenderer: FC<Props> = ({ block }) => {
  return (
    <div>
      {block.id}; {block.type}
    </div>
  );
};

export default UnknownBlockRenderer;
