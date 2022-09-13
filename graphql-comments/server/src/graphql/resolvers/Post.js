export const Post = {
  user: async (parent, __, { _db }) => {
    const user = await _db.User.findById(parent.user);
    return user;
  },
  comments: async (parent, __, { _db }) => {
    const comments = await _db.Comment.find({ post: parent.id });
    return comments;
  },
};
