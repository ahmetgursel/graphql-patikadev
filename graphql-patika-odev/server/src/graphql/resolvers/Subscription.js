import { withFilter } from 'graphql-subscriptions';
import pubsub from '../../pubsub';

export const Subscription = {
  //user
  userCreated: {
    subscribe: () => pubsub.asyncIterator('userCreated'),
  },
  userUpdated: {
    subscribe: () => pubsub.asyncIterator('userUpdated'),
  },
  userDeleted: {
    subscribe: () => pubsub.asyncIterator('userDeleted'),
  },

  //event
  eventCreated: {
    subscribe: () => pubsub.asyncIterator('eventCreated'),
  },
  eventUpdated: {
    subscribe: () => pubsub.asyncIterator('eventUpdated'),
  },
  eventDeleted: {
    subscribe: () => pubsub.asyncIterator('eventDeleted'),
  },

  participantCreated: {
    subscribe: withFilter(
      () => pubsub.asyncIterator('participantCreated'),
      (payload, variables) => {
        return variables.event ? payload.participantCreated.event_id === variables.event : true;
      }
    ),
  },
  participantUpdated: {
    subscribe: () => pubsub.asyncIterator('participantUpdated'),
  },
  participantDeleted: {
    subscribe: () => pubsub.asyncIterator('participantDeleted'),
  },
};
