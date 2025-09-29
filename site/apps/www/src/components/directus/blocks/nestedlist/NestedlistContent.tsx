import { NestedListContent } from "@/services/blogposts";
import { FC } from "react";

import parse from "html-react-parser";

type Props = {
  content: NestedListContent;
};

const NestedlistContent: FC<Props> = ({ content }) => {
  const parsedContent = parse(content.content);
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
