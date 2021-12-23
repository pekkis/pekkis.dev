import * as React from "react";
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image";
import { FC } from "react";
import { rootClass, descClass } from "./BlogInlinePicture.css";

type Props = {
  node: {
    data: {
      target: {
        title: string;
        gatsbyImageData?: IGatsbyImageData;
        description?: string;
      };
    };
  };
};

const BlogInlinePicture: FC<Props> = ({ node }) => {
  if (!node.data.target.gatsbyImageData) {
    return null;
  }

  return (
    <div className={rootClass}>
      <GatsbyImage
        alt={node.data.target.title}
        image={node.data.target.gatsbyImageData}
      />
      {node.data.target.description && (
        <p className={descClass}>{node.data.target.description}</p>
      )}
    </div>
  );
};
export default BlogInlinePicture;
