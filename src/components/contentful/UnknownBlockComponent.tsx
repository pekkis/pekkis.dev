"use client";

import type { Node } from "@contentful/rich-text-types";
import { RendererMap } from "./RichTextDocument";
import { FC } from "react";
import Opener from "./Opener";
import { Context } from "@/components/RichText";

type Props = {
  node: Node;
  renderers: RendererMap;
  context: Context;
};

const UnknownBlockComponent: FC<Props> = ({ node }) => {
  return (
    <div
      style={{
        border: "2px solid rgb(0 0 0)",
        padding: "1em",
        cursor: "pointer"
      }}
    >
      node type: &quot;{node.nodeType}&quot;
      <Opener>
        <div>
          <pre>{JSON.stringify(node, null, 2)}</pre>
        </div>
      </Opener>
    </div>
  );
};

export default UnknownBlockComponent;
