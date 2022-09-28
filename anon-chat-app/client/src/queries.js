import { gql } from '@apollo/client';

export const GET_ALL_MESSAGES = gql`
  query getAllMessage {
    messages {
      id
      message
      user
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    messageCreated {
      id
      message
      user
    }
  }
`;

export const MESSAGE_MUTATION = gql`
  mutation createMessage($data: createMessage!) {
    createMessage(data: $data) {
      id
      message
      user
    }
  }
`;
