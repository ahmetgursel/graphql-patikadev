import { gql } from '@apollo/client';

export const GET_EVENT = gql`
  query getOneEvent($id: ID!) {
    event(id: $id) {
      id
      title
      desc
      date
      from
      to
      user {
        username
      }
      location {
        name
        lat
        lng
      }
      participants {
        id
        user {
          id
          username
          email
        }
      }
    }
  }
`;

export const GET_PARTICIPANTS = gql`
  query getEventParticipants($id: ID!) {
    event(id: $id) {
      id
      participants {
        id
        user {
          id
          username
          email
        }
      }
    }
  }
`;
