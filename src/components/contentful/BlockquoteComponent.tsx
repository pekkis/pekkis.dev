import type { Block } from "@contentful/rich-text-types";
import type { RendererMap } from "./RichTextDocument";
import { FC } from "react";
import { Context } from "@/components/RichText";

type Props = {
  node: Block;
  renderers: RendererMap;
  context: Context;
};

const BlockQuoteComponent: FC<Props> = ({ node, renderers, context }) => {
  return (
    <blockquote>
      {node.content.map((content, i) => {
        const Component =
          renderers.node[content.nodeType] || renderers.fallback;
        return (
          <Component
            key={i}
            node={content}
            renderers={renderers}
            context={context}
          />
        );
      })}
    </blockquote>
  );
};

export default BlockQuoteComponent;
