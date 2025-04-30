import "dotenv/config";

import {
  createDirectus,
  rest,
  readFile,
  DirectusFile,
  authentication,
  staticToken,
  readItems,
  updateItem,
  createItem,
  uploadFiles,
  importFile
} from "@directus/sdk";
import util from "node:util";
import path from "node:path";
import fsp from "node:fs/promises";
import fs from "fs";

import { createClient } from "contentful";
import {
  BlogPostType,
  HeaderBlock,
  ImageBlock,
  ParagraphBlock
} from "@/services/blogposts";

import { DateTime } from "luxon";
import { finished } from "node:stream/promises";
import { Readable } from "node:stream";
import {
  AssetLinkBlock,
  Block,
  Heading2,
  Hyperlink,
  Inline,
  Mark,
  Paragraph,
  Text
} from "@contentful/rich-text-types";
import { randomUUID } from "node:crypto";

const cclient = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  space: process.env.CONTENTFUL_SPACE_ID as string
});

const dclient = createDirectus(process.env.DIRECTUS_ENDPOINT as string)
  .with(rest())
  .with(staticToken(process.env.DIRECTUS_TOKEN as string));

type Broot = BlogPostType & {
  id: string;
};

const downloadFile = async (url: string, destination: string) => {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(destination, { flags: "wx" });
  await finished(Readable.fromWeb(res.body).pipe(fileStream));
};

const getDirectusPost = async (slug: string): Promise<Broot> => {
  const posts = await dclient.request<Broot[]>(
    readItems("BlogPosts", {
      filter: {
        status: { _eq: "published" },

        slug: { _eq: slug }
      },
      fields: ["*"],
      limit: 1
    })
  );

  if (posts.length === 0) {
    return {} as Broot;
  }

  const post = posts[0];

  // console.log("post", util.inspect(post, false, 666));

  return post;
};

type Proot = {
  contentTypeId: "blogPost";
  fields: {
    slug: string;
    title: string;
    date: string;
    ingress: string;
  };
};

const handleMainImage = async (cPost: Proot, dPost: Broot) => {
  const image = cPost.fields.mainImage.fields.image;

  console.log("handleMainImage", util.inspect(image, false, 666));

  const data = {
    title: image.fields.title,
    description: image.fields.description
  };

  const theFile = await dclient.request<DirectusFile>(
    importFile("https:" + image.fields.file.url, data)
  );

  return theFile;

  console.log("theFile", util.inspect(theFile, false, 666));

  process.exit();

  return;

  process.exit();

  console.log(
    util.inspect(
      cPost.fields.mainImage.fields.image.fields.file.url,
      false,
      666
    )
  );

  const url = new URL(
    "https:" + cPost.fields.mainImage.fields.image.fields.file.url
  );

  console.log("URL", url);

  const dirname = path.dirname(url.pathname).substring(1);

  console.log("URL", {
    url,
    dirname,
    myDir: import.meta.dirname
  });

  await fsp.mkdir(path.resolve(import.meta.dirname, ".", dirname), {
    recursive: true
  });

  await downloadFile(
    url.toString(),
    path.join(import.meta.dirname, ".", url.pathname)
  );

  console.log();
};

const convertText = (block: Text) => {
  const preContent = block.marks.map((mark: Mark) => {
    if (mark.type === "bold") {
      return `<b>`;
    }

    if (mark.type === "italic") {
      return `<i>`;
    }

    console.log("mark", mark);
    process.exit();
    return "";
  });

  const postContent = block.marks.map((mark: Mark) => {
    if (mark.type === "bold") {
      return `</b>`;
    }

    if (mark.type === "italic") {
      return `</i>`;
    }

    console.log("mark", mark);
    return "";
  });

  return preContent + block.value + postContent;
};

const convertInlineOrText = (content: Inline | Text): string => {
  if (content.nodeType === "text") {
    return convertText(content);
  }

  if (content.nodeType === "hyperlink") {
    const hyperlink = content as Hyperlink;
    console.log("hyperlink", util.inspect(hyperlink, false, 666));

    return [
      `<a href="${hyperlink.data.uri}">`,
      hyperlink.content.reduce((prev, x) => prev + convertText(x), ""),
      "</a>"
    ].join("");
  }

  return "";
};

const convertHeading2 = (block: Heading2): HeaderBlock => {
  return {
    id: randomUUID(),
    type: "header",
    data: {
      level: 2,
      text: block.content.reduce((prev, content) => {
        return prev + convertInlineOrText(content);
      }, "")
    }
  };
};

const convertParagraph = (block: Paragraph): ParagraphBlock => {
  console.log("convertParagraph", util.inspect(block, false, 666));
  // process.exit();

  const data = block.content.reduce((prev, content) => {
    return prev + convertInlineOrText(content);
  }, "");

  return {
    id: randomUUID(),
    type: "paragraph",
    data: {
      text: data
    }
  };
};

const convertAssetBlock = async (
  block: AssetLinkBlock
): Promise<ImageBlock> => {
  console.log("convertAssetBlock", util.inspect(block, false, 666));

  const data = {
    title: block.data.target.fields.title,
    description: block.data.target.fields.description
  };

  const theImage = await dclient.request<DirectusFile>(
    importFile("https:" + block.data.target.fields.file.url, data)
  );

  return {
    id: randomUUID(),
    type: "image",
    data: {
      caption: data.description,
      file: {
        width: theImage.width as number,
        height: theImage.height as number,
        size: theImage.filesize,
        name: theImage.filename_disk,
        title: data.title,
        fileId: theImage.id,
        fileURL: `/files/${theImage.id}`,
        url: `/assets/${theImage.id}`
      }
    }
  };
};

const handleBlocks = async (cPost: Proot, dPost: Broot, blogs: any) => {
  console.log("content", util.inspect(cPost.fields.content, false, 666));

  const blocks = cPost.fields.content.content.map(async (block: any) => {
    switch (block.nodeType) {
      case "paragraph":
        return convertParagraph(block);

      case "heading-2":
        return convertHeading2(block);

      case "embedded-asset-block":
        return await convertAssetBlock(block);

      default:
        console.log("block", util.inspect(block, false, 666));
        process.exit();

        return {
          type: "unknown"
        };
    }
  });

  return Promise.all(blocks);
};

const blogs = await cclient.getEntries<Proot>({
  content_type: "blogPost"
});

// console.log(blogs);

for (const cPost of blogs.items) {
  const dPost = await getDirectusPost(cPost.fields.slug);

  if (dPost.id) {
    console.log("update");

    if (!dPost.mainImage) {
      const image = await handleMainImage(cPost, dPost);

      dPost.mainImage = image.id;
    }

    const blox = await handleBlocks(cPost, dPost, blogs);

    console.log("blox", util.inspect(blox, false, 666));

    dPost.content = {
      blocks: blox
    };

    await dclient.request(updateItem("BlogPosts", dPost.id, dPost));
  } else {
    console.log("CREATE");
    console.log(cPost.fields);

    const data = {
      title: cPost.fields.title,
      slug: cPost.fields.slug,
      date: DateTime.fromISO(cPost.fields.date).toISODate(),
      status: "published",
      content: {},
      ingress: cPost.fields.ingress
    };

    console.log("data", data);
    await dclient.request<BlogPostType>(createItem("BlogPosts", data));
  }

  // console.log("dPost", dPost);
}
