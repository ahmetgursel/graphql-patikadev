import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getAllUser {
    users {
      _id
      fullName
    }
  }
`;

export const NEW_COMMENT_MUTATION = gql`
  mutation addNewComment($data: CreateCommentInput!) {
    createComment(data: $data) {
      _id
    }
  }
`;
