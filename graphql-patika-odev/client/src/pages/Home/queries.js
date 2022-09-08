import { gql } from '@apollo/client';

const eventFragment = gql`
  fragment EventFragment on Event {
    id
    title
    desc
    date
  }
`;

export const GET_EVENTS = gql`
  query getAllEvent {
    events {
      ...EventFragment
    }
  }
  ${eventFragment}
`;

export const EVENT_SUBSCRIPTION = gql`
  subscription {
    eventCreated {
      ...EventFragment
    }
  }
  ${eventFragment}
`;
