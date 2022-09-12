import { gql } from '@apollo/client';

export const GET_ALL_LOCATION = gql`
  query getAllLocation {
    locations {
      id
      name
    }
  }
`;

export const GET_ALL_USER = gql`
  query getAllUsers {
    users {
      id
      username
    }
  }
`;

export const NEW_EVENT_MUTATION = gql`
  mutation createEvent($data: CreateEventInput!) {
    createEvent(data: $data) {
      id
      title
      desc
      date
      from
      to
      location_id
      user_id
      location {
        id
      }
      participants {
        id
      }
      user {
        id
      }
    }
  }
`;
