import type { Heading1 } from "@contentful/rich-text-types";
import NodeList from "./NodeList";
import type { RendererMap } from "./RichTextDocument";
import { FC } from "react";
import { Context } from "@/components/RichText";

type Props = {
  node: Heading1;
  renderers: RendererMap;
  context: Context;
};

const H1Component: FC<Props> = ({ node, renderers, context }) => {
  return (
    <h1>
      <NodeList nodes={node.content} renderers={renderers} context={context} />
    </h1>
  );
};

export default H1Component;
