import { withFilter } from 'graphql-subscriptions';
import pubsub from '../../pubsub';
import db from '../../data';

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
        return variables.user_id
          ? payload.postCreated.user_id === variables.user_id
          : true;
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
    subscribe: (_, __, ___) => {
      setTimeout(() => {
        pubsub.publish('postCount', { postCount: db.posts.length });
      }, 100);

      return pubsub.asyncIterator('postCount');
    },
  },

  // comment
  commentCreated: {
    subscribe: withFilter(
      (_, __, ___) => pubsub.asyncIterator('commentCreated'),
      (payload, variables) => {
        return variables.post_id
          ? payload.commentCreated.post_id === variables.post_id
          : true;
      }
    ),
  },
  commentUpdated: {
    subscribe: (_, __, ___) => pubsub.asyncIterator('commentUpdated'),
  },
  commentDeleted: {
    subscribe: (_, __, ___) => pubsub.asyncIterator('commentDeleted'),
  },
  commentCount: {
    subscribe: (_, __, ___) => {
      setTimeout(() =>
        pubsub.publish('commentCount', { commentCount: comments.length })
      );

      return pubsub.asyncIterator('commentCount');
    },
  },
};
