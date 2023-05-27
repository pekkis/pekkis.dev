/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { createClient } from "@pekkis-dev/graphql-service";

export const graphQLClient = createClient(
  process.env.CONTENTFUL_SPACE_ID!,
  process.env.CONTENTFUL_ACCESS_TOKEN!
);
