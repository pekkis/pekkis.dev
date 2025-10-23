import EmbedBlockRenderer from "@/components/directus/blocks/EmbedBlock";
import HeaderBlock from "@/components/directus/blocks/HeaderBlock";
import ImageBlock from "@/components/directus/blocks/ImageBlock";
import NestedlistBlockRenderer from "@/components/directus/blocks/nestedlist/NestedlistBlock";
import ParagraphBlock from "@/components/directus/blocks/ParagraphBlock";
import UnknownBlock from "@/components/directus/blocks/UnknownBlock";
import { Block } from "@/services/blogposts";
import { FC } from "react";

type Props = {
  blocks: Block[];
};

const BlocksRenderer: FC<Props> = ({ blocks }) => {
  return (
    <>
      {blocks.map((item) => {
        switch (item.type) {
          case "embed":
            return <EmbedBlockRenderer key={item.id} block={item} />;

          case "header":
            return <HeaderBlock key={item.id} block={item} />;
          case "paragraph":
            return <ParagraphBlock key={item.id} block={item} />;

          case "image":
            return <ImageBlock key={item.id} block={item} />;

          case "nestedlist":
            return <NestedlistBlockRenderer key={item.id} block={item} />;

          default:
            // @ts-expect-error this will still stay here.
            return <UnknownBlock key={item.id} block={item} />;
        }
      })}
    </>
  );
};

export default BlocksRenderer;
