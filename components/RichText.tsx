import React, { FC } from "react";

import {
  BLOCKS,
  MARKS,
  INLINES,
  HEADINGS,
  AssetLinkBlock,
  Block,
  Inline
} from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  Options
} from "@contentful/rich-text-react-renderer";

import BlogInlinePicture from "./BlogInlinePicture";
import Link from "next/link";
import { BlogPostType } from "../types";
import MainHeading from "./MainHeading";
import SubHeading from "./SubHeading";

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

const createOptions = (post: BlogPostType): Options => {
  const assets = Object.fromEntries(
    post.content.links.assets.block.map((b) => {
      return [b.sys.id, b];
    })
  );

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
      [MARKS.ITALIC]: (text) => <Italic>{text}</Italic>
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (x, children) => {
        return <MainHeading>{children}</MainHeading>;
      },

      [BLOCKS.HEADING_2]: (x, children) => {
        return <SubHeading>{children}</SubHeading>;
      },

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
      [BLOCKS.PARAGRAPH]: (_, children) => <Text>{children}</Text>,
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
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
