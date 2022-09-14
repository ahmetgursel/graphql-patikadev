import { withFilter } from 'graphql-subscriptions';
import pubsub from '../../pubsub';

export const Subscription = {
  // user
  userCreated: {
    subscribe: (_, __, ___) => pubsub.asyncIterator('userCreated'),
  },
  userUpdated: {
    subscribe: (_, __, ___) => pubsub.asyncIterator('userUpdated'),
  },
  userDeleted: {
    subscribe: (_, __, ___) => pubsub.asyncIterator('userDeleted'),
  },

  // post
  postCreated: {
    subscribe: withFilter(
      (_, __, ___) => pubsub.asyncIterator('postCreated'),
      (payload, variables) => {
        return variables.user_id ? payload.postCreated.user === variables.user_id : true;
      }
    ),
  },
  postUpdated: {
    subscribe: (_, __, ___) => pubsub.asyncIterator('postUpdated'),
  },
  postDeleted: {
    subscribe: (_, __, ___) => pubsub.asyncIterator('postDeleted'),
  },
  postCount: {
    subscribe: (_, __, ___) => pubsub.asyncIterator('postCount'),
  },

  // comment
  commentCreated: {
    subscribe: (_, __, ___) => pubsub.asyncIterator('commentCreated'),
  },

  commentUpdated: {
    subscribe: (_, __, ___) => pubsub.asyncIterator('commentUpdated'),
  },
  commentDeleted: {
    subscribe: (_, __, ___) => pubsub.asyncIterator('commentDeleted'),
  },
  commentCount: {
    subscribe: (_, __, ___) => pubsub.asyncIterator('commentCount'),
  },
};
