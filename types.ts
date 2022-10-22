import { Document } from "@contentful/rich-text-types";

export type PostType = {
  mainImage: ContentfulImageData;
  slug: string;
  title: string;
  date: string;

  ingress: {
    ingress: string;
  };

  content: unknown;
};

export type HeadlineType = {
  sys: {
    id: string;
  };

  date: string;
  title: string;
  slug: string;
  ingress: string;
};

export type AssetType = {};

export type BlogPostType = HeadlineType & {
  mainImage: {
    image: ContentfulImageData;
  };
  content: {
    links: {
      assets: {
        block: ContentfulImageData[];
      };
    };
    json: Document;
  };
};

export type ContentfulImageData = {
  sys: {
    id: string;
  };
  title: string;
  url: string;
  width: number;
  height: number;
  description?: string;
};