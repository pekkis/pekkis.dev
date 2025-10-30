import NestedlistContent from "@/components/directus/blocks/nestedlist/NestedlistContent";
import { NestedlistBlock } from "@/services/blogposts";
import { FC } from "react";

type Props = {
  block: NestedlistBlock;
};

const NestedlistBlockRenderer: FC<Props> = ({ block }) => {
  const Component = block.data.style === "unordered" ? "ul" : "ol";

  return (
    <Component className="list-inside list-disc">
      {block.data.items.map((item, i) => {
        return <NestedlistContent key={i} content={item} />;
      })}
    </Component>
  );
};

export default NestedlistBlockRenderer;
