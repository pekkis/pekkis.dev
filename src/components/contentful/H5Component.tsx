import type { Heading5 } from "@contentful/rich-text-types";
import NodeList from "./NodeList";
import type { RendererMap } from "./RichTextDocument";
import { FC } from "react";
import { Context } from "@/components/RichText";

type Props = {
  node: Heading5;
  renderers: RendererMap;
  context: Context;
};

const H5Component: FC<Props> = ({ node, renderers, context }) => {
  return (
    <h5>
      <NodeList nodes={node.content} renderers={renderers} context={context} />
    </h5>
  );
};

export default H5Component;
