import type { TableRow } from "@contentful/rich-text-types";
import NodeList from "./NodeList";
import type { RendererMap } from "./RichTextDocument";
import { FC } from "react";
import { Context } from "@/components/RichText";

type Props = {
  node: TableRow;
  renderers: RendererMap;
  context: Context;
};

const TableRowComponent: FC<Props> = ({ node, renderers, context }) => {
  return (
    <tr>
      <NodeList nodes={node.content} renderers={renderers} context={context} />
    </tr>
  );
};

export default TableRowComponent;
