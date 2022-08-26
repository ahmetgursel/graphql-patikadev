import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getAllUser {
    users {
      id
      fullName
    }
  }
`;

export const NEW_COMMENT_MUTATION = gql`
  mutation addNewComment($data: CreateCommentInput!) {
    createComment(data: $data) {
      id
    }
  }
`;
