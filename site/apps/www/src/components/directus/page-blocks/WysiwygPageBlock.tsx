import BlocksRenderer from "@/components/directus/BlocksRenderer";
import { WysiwygPageBlock } from "@/services/pages";
import { FC } from "react";

type Props = {
  block: WysiwygPageBlock;
};

const WysiwygPageBlockRenderer: FC<Props> = ({ block }) => {
  return (
    <>
      <BlocksRenderer blocks={block.item.blocks.blocks} />
    </>
  );

  return <div>wysigyG!</div>;
};

export default WysiwygPageBlockRenderer;
