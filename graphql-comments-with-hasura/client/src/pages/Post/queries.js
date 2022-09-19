import { gql } from '@apollo/client';

export const GET_POST = gql`
  query getPost($id: Int!) {
    posts_by_pk(id: $id) {
      id
      title
      description
      cover
    }
  }
`;
