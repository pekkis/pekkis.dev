"use server";

import { readItems } from "@directus/sdk";
import { directus } from "./directus";
import util from "node:util";

export type DirectusImage = {
  id: string;
  width: number;
  height: number;
  title: string;

  description: string;
};

export type HeaderBlock = {
  id: string;
  type: "header";
  data: {
    text: string;
    level: 1 | 2;
  };
};

export type ImageBlock = {
  id: string;
  type: "image";
  data: {
    caption: string;
    file: {
      url: string;
      width: number;
      height: number;
      fileId: string;
      title: string;
      description: string;
    };
  };
};

export type ParagraphBlock = {
  id: string;
  type: "paragraph";
  data: {
    text: string;
  };
};

export type Block = ParagraphBlock | HeaderBlock | ImageBlock;

export type HeadlineType = {
  id: string;
  slug: string;
  tags: string[];
  title: string;
  ingress: string;
  date: string;
};

export type BlogPostType = {
  id: string;
  slug: string;
  tags: string[];
  title: string;
  ingress: string;
  date: string;
  mainImage: DirectusImage;
  content: {
    blocks: Block[];
  };
};

const fields = [
  "id",
  "title",
  "date",
  "slug",
  "tags",
  "ingress",
  "mainImage.id",
  "mainImage.width",
  "mainImage.height",
  "mainImage.title",
  "mainImage.description",
  "content"
];

export const getHeadlines = async (
  limit: number = 100
): Promise<BlogPostType[]> => {
  const posts = await directus.request<HeadlineType[]>(
    readItems("BlogPosts", {
      fields: ["id", "title", "date", "slug", "tags", "ingress"],
      filter: {
        status: { _eq: "published" }
      },
      sort: ["-date"],
      limit
    })
  );

  return posts;
};

export const getPosts = async (
  limit: number = 100
): Promise<BlogPostType[]> => {
  const posts = await directus.request<BlogPostType[]>(
    readItems("BlogPosts", {
      fields,
      filter: { status: { _eq: "published" } },
      sort: ["-date"],
      limit
    })
  );

  return posts;
};

export const getPost = async (
  year: string,
  month: string,
  day: string,
  slug: string
): Promise<BlogPostType> => {
  console.log("FINDING POST", slug);

  const date = `${year}-${month}-${day}`;

  const posts = await directus.request<BlogPostType[]>(
    readItems("BlogPosts", {
      filter: {
        status: { _eq: "published" },
        date: { _eq: date },
        slug: { _eq: slug }
      },
      fields,
      limit: 1
    })
  );

  if (posts.length === 0) {
    throw new Error("Post not found");
  }

  const post = posts[0];

  console.log("post", util.inspect(post, false, 666));

  return post;
};
