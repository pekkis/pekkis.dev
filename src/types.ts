import { IGatsbyImageData } from "gatsby-plugin-image";

export type PostType = {
  mainImage: {
    image: IGatsbyImageData;
  };
  title: string;
  date: string;

  content: unknown;
};
