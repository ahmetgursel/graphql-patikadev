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
      location_id
      user_id
      location {
        id
        name
        desc
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
