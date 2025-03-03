import type { TableHeaderCell } from "@contentful/rich-text-types";
import NodeList from "./NodeList";
import type { RendererMap } from "./RichTextDocument";
import { FC } from "react";
import { Context } from "@/components/RichText";

type Props = {
  node: TableHeaderCell;
  renderers: RendererMap;
  context: Context;
};

const TableHeaderCellComponent: FC<Props> = ({ node, renderers, context }) => {
  return (
    <th>
      <NodeList nodes={node.content} renderers={renderers} context={context} />
    </th>
  );
};

export default TableHeaderCellComponent;
