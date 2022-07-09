const { nanoid } = require('nanoid');
const pubsub = require('../../pubsub');

const Mutation = {
  //User
  createUser: (_, { data }, { db }) => {
    const user = { id: nanoid(), ...data };
    db.users.push(user);

    pubsub.publish('userCreated', { userCreated: user });
    return user;
  },
  updateUser: (_, { id, data }, { db }) => {
    const user_index = db.users.findIndex((user) => user.id === id);

    if (user_index === -1) {
      return new Error('User not found!');
    }

    const updatedUser = (db.users[user_index] = {
      ...db.users[user_index],
      ...data,
    });

    pubsub.publish('userUpdated', { userUpdated: updatedUser });

    return updatedUser;
  },
  deleteUser: (_, { id }, { db }) => {
    const user_index = db.users.findIndex((user) => user.id === id);

    if (user_index === -1) {
      return new Error('User not found!');
    }

    const deletedUser = db.users[user_index];
    db.users.splice(user_index, 1);
    pubsub.publish('userDeleted', { userDeleted: deletedUser });

    return deletedUser;
  },
  deleteAllUsers: (_, __, { db }) => {
    const length = db.users.length;
    db.users.splice(0, length);

    return {
      count: length,
    };
  },

  //Post
  createPost: (_, { data }, { db }) => {
    const post = {
      id: nanoid(),
      ...data,
    };

    db.posts.push(post);
    pubsub.publish('postCreated', { postCreated: post });
    pubsub.publish('postCount', { postCount: db.posts.length });
    return post;
  },
  updatePost: (_, { id, data }, { db }) => {
    const post_index = db.posts.findIndex((post) => post.id === id);

    if (post_index === -1) {
      return new Error('Post not found!');
    }

    const updatedPost = (db.posts[post_index] = {
      ...db.posts[post_index],
      ...data,
    });
    pubsub.publish('postUpdated', { postUpdated: updatedPost });
    return updatedPost;
  },
  deletePost: (_, { id }, { db }) => {
    const post_index = db.posts.findIndex((post) => post.id === id);

    if (post_index === -1) {
      return new Error('Post not found!');
    }

    const deletedPost = db.posts[post_index];
    db.posts.splice(post_index, 1);
    pubsub.publish('postDeleted', { postDeleted: deletedPost });
    pubsub.publish('postCount', { postCount: db.posts.length });
    return deletedPost;
  },
  deleteAllPosts: (_, __, { db }) => {
    const length = db.posts.length;
    db.posts.splice(0, length);
    pubsub.publish('postCount', { postCount: db.posts.length });

    return {
      count: length,
    };
  },

  //Comment
  createComment: (_, { data }, { db }) => {
    const comment = {
      id: nanoid(),
      ...data,
    };

    db.comments.push(comment);
    pubsub.publish('commentCount', { commentCount: db.comments.length });
    pubsub.publish('commentCreated', { commentCreated: comment });

    return comment;
  },
  updateComment: (_, { id, data }, { db }) => {
    const comment_index = db.comments.findIndex((comment) => comment.id === id);

    if (comment_index === -1) {
      return new Error('Comment not found!');
    }

    const updatedComment = (db.comments[comment_index] = {
      ...db.comments[comment_index],
      ...data,
    });
    pubsub.publish('commentUpdated', { commentUpdated: updatedComment });
    return updatedComment;
  },
  deleteComment: (_, { id }, { db }) => {
    const comment_index = db.comments.findIndex((comment) => comment.id === id);

    if (comment_index === -1) {
      return new Error('Comment not found!');
    }

    const deletedComment = db.comments[comment_index];
    db.comments.splice(comment_index, 1);
    pubsub.publish('commentCount', { commentCount: db.comments.length });
    pubsub.publish('commentDeleted', { commentDeleted: deletedComment });
    return deletedComment;
  },
  deleteAllComments: (_, __, { db }) => {
    const length = db.comments.length;
    db.comments.splice(0, length);
    pubsub.publish('commentCount', { commentCount: db.comments.length });
    return {
      count: length,
    };
  },
};

module.exports = Mutation;
