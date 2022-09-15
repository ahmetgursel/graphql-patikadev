import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getAllUser {
    users {
      _id
      fullName
    }
  }
`;

export const NEW_POST_MUTATION = gql`
  mutation addNewPost($data: CreatePostInput!) {
    createPost(data: $data) {
      _id
      title
    }
  }
`;
