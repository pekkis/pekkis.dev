import { directus } from "@/services/directus";
import { readItems } from "@directus/sdk";

export type PeksuLinkType = {
  title: string;
  url: string;
};

export const getLinkzors = async (): Promise<PeksuLinkType[]> => {
  const links = await directus.request<PeksuLinkType[]>(
    readItems("PeksuLinks", {
      sort: ["sort"],
      fields: ["id", "title", "url"],
      limit: 100
    })
  );

  return links;
};
