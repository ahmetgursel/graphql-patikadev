export const Comment = {
  user: async (parent, __, { _db }) => {
    const user = await _db.User.findById(parent.user);
    return user;
  },
  post: async (parent, __, { _db }) => {
    const post = await _db.Post.findById(parent.post);
    return post;
  },
};
