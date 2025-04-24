import { createDirectus, rest } from "@directus/sdk";

export const directus = createDirectus(
  process.env.DIRECTUS_ENDPOINT as string
).with(rest());
