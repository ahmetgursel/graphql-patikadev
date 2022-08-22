import db from '../../data';

export const Comment = {
  user: (parent, __, ___) =>
    db.users.find((user) => user.id === parent.user_id),
  post: (parent, __, ___) =>
    db.posts.find((post) => post.id === parent.post_id),
};
