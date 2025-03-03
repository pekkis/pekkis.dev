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

const OrderedListComponent: FC<Props> = ({ node, renderers, context }) => {
  return (
    <ol>
      <NodeList nodes={node.content} renderers={renderers} context={context} />
    </ol>
  );
};

export default OrderedListComponent;
