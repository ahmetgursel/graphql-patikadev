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
};
