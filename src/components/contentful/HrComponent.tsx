import type { Hr } from "@contentful/rich-text-types";
import type { RendererMap } from "./RichTextDocument";
import { FC } from "react";
import { Context } from "@/components/RichText";

type Props = {
  node: Hr;
  renderers: RendererMap;
  context: Context;
};

const HrComponent: FC<Props> = () => {
  return <hr />;
};

export default HrComponent;
