import { IGatsbyImageData } from "gatsby-plugin-image";

export type PostType = {
  mainImage: {
    image: IGatsbyImageData;
  };
  slug: string;
  title: string;
  date: string;

  ingress: {
    ingress: string;
  };

  content: unknown;
};
