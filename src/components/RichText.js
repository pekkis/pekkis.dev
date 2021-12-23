import React from "react";

import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import BlogInlinePicture from "./BlogInlinePicture";

const website_url = "https://www.pekkis.dev";

const isExternalUrl = (url) => !url.startsWith("https://www.pekkis.dev");

const Bold = ({ children }) => <strong>{children}</strong>;
const Italic = ({ children }) => <em>{children}</em>;
const Text = ({ children }) => <p>{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    [MARKS.ITALIC]: (text) => <Italic>{text}</Italic>
  },
  renderNode: {
    [INLINES.HYPERLINK]: ({ data }, children) => {
      const isExternal = isExternalUrl(data.uri);

      return (
        <a
          href={data.uri}
          target={`${!isExternal ? "_self" : "_blank"}`}
          rel={isExternal && "noopener noreferrer"}
        >
          {children}
        </a>
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      if (node.data.target.gatsbyImageData) {
        return <BlogInlinePicture node={node} />;
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
