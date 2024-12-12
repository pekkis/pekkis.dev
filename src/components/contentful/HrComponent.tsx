import type { Hr } from "@contentful/rich-text-types";
import type { RendererMap } from "./RichTextDocument";
import { FC } from "react";

type Props = {
  node: Hr;
  renderers: RendererMap;
  context: unknown;
};

const HrComponent: FC<Props> = () => {
  return <hr />;
};

export default HrComponent;
