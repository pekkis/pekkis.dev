import { GraphQLClient } from "graphql-request";

export const createClient = (spaceId: string, accessToken: string) => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  return graphQLClient;
};
