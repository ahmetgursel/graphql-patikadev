import { gql } from '@apollo/client';

export const POSTS_SUBSCRIPTION = gql`
  subscription posts {
    posts(order_by: { id: desc }) {
      id
      title
      short_description
      user {
        profile_photo
      }
    }
  }
`;
