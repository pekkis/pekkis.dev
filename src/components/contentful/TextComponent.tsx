import type { MARKS } from "@contentful/rich-text-types";
import { type Text } from "@contentful/rich-text-types";
import type { RendererMap } from "./RichTextDocument";
import { FC, ReactNode } from "react";
import { Context } from "@/components/RichText";

type Props = {
  node: Text;
  renderers: RendererMap;
  context: Context;
};

const TextComponent: FC<Props> = ({ node, renderers }) => {
  return (
    <>
      {node.marks.reduce((a: ReactNode | string, m, i) => {
        const Component = renderers.mark[m.type as MARKS];
        return <Component key={i}>{a}</Component>;
      }, node.value)}
    </>
  );
};

export default TextComponent;
