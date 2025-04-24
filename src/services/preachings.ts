import { readItems } from "@directus/sdk";
import { directus } from "./directus";

export type PreachingType = {
  title: string;
  videoId: string;
  preachedAt: string;
  timestamp?: string;
};

export const getPreachings = async (): Promise<PreachingType[]> => {
  const preachings = await directus.request<PreachingType[]>(
    readItems("Preachings", {
      filter: { status: { _eq: "published" } },
      sort: ["-preachedAt"],
      fields: ["id", "title", "preachedAt", "videoId", "timestamp"],
      limit: 100
    })
  );

  return preachings;
};
