import { NestedListContent } from "@/services/blogposts";
import { FC } from "react";

import parse, { DOMNode, domToReact } from "html-react-parser";

type Props = {
  content: NestedListContent;
};

const NestedlistContent: FC<Props> = ({ content }) => {
  const parsedContent = parse(content.content, {
    replace(domNode) {
      if (domNode.type === "tag") {
        if (domNode.name === "a") {
          return (
            <a
              href={domNode.attribs.href}
              className="underline underline-offset-2"
            >
              {domToReact(domNode.children as DOMNode[])}
            </a>
          );
        }
      }

      return;
    }
  });
  return (
    <li>
      {parsedContent}
      {content.items.map((item, i) => {
        return <NestedlistContent key={i} content={item} />;
      })}
    </li>
  );
};

export default NestedlistContent;
