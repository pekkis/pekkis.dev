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

const UnorderedListComponent: FC<Props> = ({ node, renderers, context }) => {
  return (
    <ul>
      <NodeList nodes={node.content} renderers={renderers} context={context} />
    </ul>
  );
};

export default UnorderedListComponent;
