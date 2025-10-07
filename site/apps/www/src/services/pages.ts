import { readItems } from "@directus/sdk";
import { directus } from "./directus";
import util from "node:util";
import { Block } from "@/services/blogposts";
import { PreachingType } from "@/services/preachings";

export type WysiwygPageBlock = {
  collection: "block_wysiwyg";
  sort: number;
  item: {
    blocks: {
      blocks: Block[];
    };
  };
};

export type PreachingsPageBlock = {
  sort: number;
  collection: "block_preachings";
  item: {
    title: string;
    preachings: {
      Preachings_id: PreachingType;
    }[];
  };
};

export type HeadlinesPageBlock = {
  sort: number;
  collection: "block_headlines";
  item: {
    title: string;
    amount: number;
  };
};

type PageBlock = WysiwygPageBlock | PreachingsPageBlock | HeadlinesPageBlock;

export type PageType = {
  id: string;
  title: string;
  slug: string;
  blocks: PageBlock[];
};

export const getPage = async (slug: string): Promise<PageType> => {
  const pages = await directus.request<PageType[]>(
    readItems("pages", {
      filter: {
        slug: { _eq: slug }
      },
      fields: [
        "*",
        {
          blocks: [
            "*",
            {
              item: {
                block_wysiwyg: ["*"],
                block_preachings: ["title", "preachings.Preachings_id.*"],
                block_headlines: ["*"]
              }
            }
          ]
        }
      ],
      limit: 1
    })
  );

  const page = pages[0];

  if (!page) {
    throw new Error(`Page with slug "${slug}" not found.`);
  }

  return page;
};
