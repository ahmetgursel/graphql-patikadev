import { nanoid } from 'nanoid';
import pubsub from '../../pubsub';
import db from '../../data';

export const Mutation = {
  //User
  createUser: async (_, { data }, { _db }) => {
    const newUser = new _db.User({ ...data });
    const user = await newUser.save();
    pubsub.publish('userCreated', { userCreated: user });
    return user;
  },
  updateUser: async (_, { id, data }, { _db }) => {
    const isUserExist = await _db.User.findById(id);

    if (!isUserExist) {
      return new Error('User not found!');
    }

    const updatedUser = await _db.User.findByIdAndUpdate(id, data, {
      new: true,
    });

    pubsub.publish('userUpdated', { userUpdated: updatedUser });

    return updatedUser;
  },
  deleteUser: async (_, { id }, { _db }) => {
    const isUserExist = await _db.User.findById(id);

    if (!isUserExist) {
      return new Error('User not found!');
    }

    const deletedUser = await _db.User.findByIdAndDelete(id);
    pubsub.publish('userDeleted', { userDeleted: deletedUser });
    return deletedUser;
  },
  deleteAllUsers: async (_, __, { _db }) => {
    const deleteUsers = await _db.User.deleteMany({});

    return {
      count: deleteUsers.deletedCount,
    };
  },

  //Post
  createPost: (_, { data }, ___) => {
    const post = {
      id: nanoid(),
      ...data,
    };

    db.posts.unshift(post);
    pubsub.publish('postCreated', { postCreated: post });
    pubsub.publish('postCount', { postCount: db.posts.length });
    return post;
  },
  updatePost: (_, { id, data }, ___) => {
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
  deletePost: (_, { id }, ___) => {
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
  deleteAllPosts: (_, __, ___) => {
    const length = db.posts.length;
    db.posts.splice(0, length);
    pubsub.publish('postCount', { postCount: db.posts.length });

    return {
      count: length,
    };
  },

  //Comment
  createComment: (_, { data }, ___) => {
    const comment = {
      id: nanoid(),
      ...data,
    };

    db.comments.push(comment);
    pubsub.publish('commentCount', { commentCount: db.comments.length });
    pubsub.publish('commentCreated', { commentCreated: comment });

    return comment;
  },
  updateComment: (_, { id, data }, ___) => {
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
  deleteComment: (_, { id }, ___) => {
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
  deleteAllComments: (_, __, ___) => {
    const length = db.comments.length;
    db.comments.splice(0, length);
    pubsub.publish('commentCount', { commentCount: db.comments.length });
    return {
      count: length,
    };
  },
};
