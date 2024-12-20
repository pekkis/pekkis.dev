import type { Heading3 } from "@contentful/rich-text-types";
import NodeList from "./NodeList";
import type { RendererMap } from "./RichTextDocument";
import { FC } from "react";
import { Context } from "@/components/RichText";

type Props = {
  node: Heading3;
  renderers: RendererMap;
  context: Context;
};

const H3Component: FC<Props> = ({ node, renderers, context }) => {
  return (
    <h3>
      <NodeList nodes={node.content} renderers={renderers} context={context} />
    </h3>
  );
};

export default H3Component;
