import db from '../../data';

export const Query = {
  // user
  users: (_, __, ___) => db.users,
  user: (_, args, ___) => {
    const user = db.users.find((user) => user.id === args.id);
    if (!user) {
      return new Error('User not found!');
    } else {
      return user;
    }
  },

  // post
  posts: (_, __, ___) => db.posts,
  post: (_, args, ___) => {
    const post = db.posts.find((post) => post.id === args.id);
    if (!post) {
      return new Error('Post not found!');
    } else {
      return post;
    }
  },

  // comments
  comments: (_, __, ___) => db.comments,
  comment: (_, args, ___) => {
    const comment = db.comments.find((comment) => comment.id === args.id);
    if (!comment) {
      return new Error('Comment not found!');
    } else {
      return comment;
    }
  },
};
