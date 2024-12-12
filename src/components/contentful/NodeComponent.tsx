import { type Node } from "@contentful/rich-text-types";
import type { RendererMap } from "./RichTextDocument";
import { FC } from "react";
import { Context } from "@/components/RichText";

type Props = {
  node: Node;
  renderers: RendererMap;
  context: Context;
};

const NodeComponent: FC<Props> = ({ node, renderers, context }) => {
  const Component = renderers.node[node.nodeType] || renderers.fallback;
  return <Component node={node} renderers={renderers} context={context} />;
};

export default NodeComponent;
