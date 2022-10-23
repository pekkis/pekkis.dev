import { gql } from "graphql-request";

export const headlinesQuery = gql`
  query Headlines($limit: Int! = 10) {
    blogPostCollection(order: [date_DESC], limit: $limit) {
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
