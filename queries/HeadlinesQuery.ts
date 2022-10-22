import { gql } from "graphql-request";

export const headlinesQuery = gql`
  query Headlines {
    blogPostCollection(order: [date_DESC]) {
      total
      items {
        sys {
          id
        }
        date
        title
        slug
        ingress
      }
    }
  }
`;
