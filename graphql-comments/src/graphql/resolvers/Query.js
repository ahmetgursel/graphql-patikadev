const Query = {
  // user
  users: (_, __, { db }) => db.users,
  user: (_, args, { db }) => {
    const user = db.users.find((user) => user.id === args.id);
    if (!user) {
      return new Error('User not found!');
    } else {
      return user;
    }
  },

  // post
  posts: (_, __, { db }) => db.posts,
  post: (_, args, { db }) => {
    const post = db.posts.find((post) => post.id === args.id);
    if (!post) {
      return new Error('Post not found!');
    } else {
      return post;
    }
  },

  // comments
  comments: (_, __, { db }) => db.comments,
  comment: (_, args, { db }) => {
    const comment = db.comments.find((comment) => comment.id === args.id);
    if (!comment) {
      return new Error('Comment not found!');
    } else {
      return comment;
    }
  },
};

module.exports = Query;
