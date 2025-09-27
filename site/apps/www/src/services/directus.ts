import { createDirectus, rest, readFile, DirectusFile } from "@directus/sdk";

export const getDirectusClient = () => {
  return createDirectus(process.env.DIRECTUS_ENDPOINT as string).with(rest());
};

export const directus = createDirectus(
  process.env.DIRECTUS_ENDPOINT as string
).with(rest());

export const getFile = async (id: string) => {
  const file = await directus.request<DirectusFile>(readFile(id));

  return file;
};
