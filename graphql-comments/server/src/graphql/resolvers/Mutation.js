import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
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
  createPost: async (_, { data }, { _db }) => {
    const newPost = new _db.Post({ ...data });
    const post = await newPost.save();
    const user = await _db.User.findById(mongoose.Types.ObjectId(data.user));
    user.posts.push(post.id);
    user.save();

    const postCount = await _db.Post.countDocuments();

    pubsub.publish('postCreated', { postCreated: post });
    pubsub.publish('postCount', { postCount });
    return post;
  },
  updatePost: async (_, { id, data }, { _db }) => {
    const isPostExist = await _db.Post.findById(id);

    if (!isPostExist) {
      return new Error('Post not found!');
    }

    const updatedPost = await _db.Post.findByIdAndUpdate(id, data, {
      new: true,
    });

    pubsub.publish('postUpdated', { postUpdated: updatedPost });
    return updatedPost;
  },
  deletePost: async (_, { id }, { _db }) => {
    const isPostExist = await _db.Post.findById(id);

    if (!isPostExist) {
      return new Error('Post not found!');
    }

    const postDeleted = await _db.Post.findByIdAndDelete(id);
    const postCount = await _db.Post.countDocuments();

    pubsub.publish('postDeleted', { postDeleted });
    pubsub.publish('postCount', { postCount });
    return postDeleted;
  },
  deleteAllPosts: async (_, __, { _db }) => {
    const deletePosts = await _db.Post.deleteMany({});
    const postCount = await _db.Post.countDocuments();

    pubsub.publish('postCount', { postCount });
    return {
      count: deletePosts.deletedCount,
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
