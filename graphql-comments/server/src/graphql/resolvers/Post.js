import db from '../../data';

export const Post = {
  user: (parent, __, ___) =>
    db.users.find((user) => user.id === parent.user_id),
  comment: (parent, __, ___) =>
    db.comments.filter((comment) => comment.post_id === parent.id),
};
