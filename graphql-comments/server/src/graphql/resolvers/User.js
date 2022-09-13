export const User = {
  posts: async (parent, __, { _db }) => {
    const posts = await _db.Post.find({ user: parent.id });
    return posts;
  },
  comments: async (parent, __, { _db }) => {
    const comments = await _db.Comment.find({ user: parent.id });
    return comments;
  },
};
