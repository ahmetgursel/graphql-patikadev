import mongoose from 'mongoose';
import pubsub from '../../pubsub';

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
    await user.save();

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
  createComment: async (_, { data }, { _db }) => {
    const newComment = new _db.Comment({ ...data });
    const commentCreated = await newComment.save();

    const post = await _db.Post.findById(mongoose.Types.ObjectId(data.post));
    const user = await _db.User.findById(mongoose.Types.ObjectId(data.user));

    user.comments.push(commentCreated.id);
    post.comments.push(commentCreated.id);

    await user.save();
    await post.save();

    const commentCount = await _db.Comment.countDocuments();

    pubsub.publish('commentCount', { commentCount });
    pubsub.publish('commentCreated', { commentCreated });
    return commentCreated;
  },
  updateComment: async (_, { id, data }, { _db }) => {
    const isCommentExist = await _db.Comment.findById(id);
    if (!isCommentExist) {
      return new Error('Comment not found!');
    }

    const commentUpdated = await _db.Comment.findByIdAndUpdate(id, data, {
      new: true,
    });

    pubsub.publish('commentUpdated', { commentUpdated });
    return commentUpdated;
  },
  deleteComment: async (_, { id }, { _db }) => {
    const isCommentExist = await _db.Comment.findById(id);
    if (!isCommentExist) {
      return new Error('Comment not found!');
    }

    const commentDeleted = await _db.Comment.findByIdAndDelete(id);
    const commentCount = await _db.Comment.countDocuments();

    pubsub.publish('commentCount', { commentCount });
    pubsub.publish('commentDeleted', { commentDeleted });
    return commentDeleted;
  },
  deleteAllComments: async (_, __, { _db }) => {
    const deleteComments = await _db.Comment.deleteMany({});
    const commentCount = await _db.Comment.countDocuments();

    pubsub.publish('commentCount', { commentCount });
    return {
      count: deleteComments.deletedCount,
    };
  },
};
