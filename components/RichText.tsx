import React, { FC } from "react";

import {
  BLOCKS,
  MARKS,
  INLINES,
  AssetLinkBlock
} from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import BlogInlinePicture from "./BlogInlinePicture";
import Link from "next/link";
import { BlogPostType } from "../types";

const website_url = "https://www.pekkis.eu";

const isExternalUrl = (url) => {
  if (!url.startsWith("http")) {
    return false;
  }

  return !url.startsWith("https://www.pekkis.eu");
};

const Bold = ({ children }) => <strong>{children}</strong>;
const Italic = ({ children }) => <em>{children}</em>;
const Text = ({ children }) => <p>{children}</p>;

const createOptions = (post: BlogPostType) => {
  const assets = Object.fromEntries(
    post.content.links.assets.block.map((b) => {
      return [b.sys.id, b];
    })
  );

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
      [MARKS.ITALIC]: (text) => <Italic>{text}</Italic>
    },
    renderNode: {
      [INLINES.HYPERLINK]: ({ data }, children) => {
        const isExternal = isExternalUrl(data.uri);

        if (!isExternal) {
          return (
            <Link href={data.uri}>
              <a>{children}</a>
            </Link>
          );
        }

        return (
          <a href={data.uri} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      },
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.EMBEDDED_ASSET]: (node: AssetLinkBlock) => {
        console.log("NODE", node.data.target.sys.id);

        const assetore = assets[node.data.target.sys.id];

        if (assetore) {
          return <BlogInlinePicture asset={assetore} />;
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
  return options;
};

type Props = {
  post: BlogPostType;
};

const RichText: FC<Props> = (props) => {
  const options = createOptions(props.post);

  const reactified = documentToReactComponents(
    props.post.content.json,
    options
  );

  return <div>{reactified}</div>;
};

export default RichText;
