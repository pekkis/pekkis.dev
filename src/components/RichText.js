import React from "react";

import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Bold = ({ children }) => <span className="bold">{children}</span>;
const Text = ({ children }) => <p className="align-center">{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: (node, two, three) => {
      console.log(node, two, three, "NOUD");

      if (node.data.target.gatsbyImageData) {
        return (
          <>
            <GatsbyImage
              alt={node.data.target.title}
              image={getImage(node.data.target)}
            />
            {node.data.target.description}
          </>
        );
      }

      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      );
    }
  }
};

const RichText = (props) => {
  console.log("PROPPO", props);

  console.log(JSON.parse(props.richText.raw), "hihi");

  const tussi = renderRichText(props.richText, options);

  console.log(tussi);

  return <div>{tussi}</div>;
};

export default RichText;
