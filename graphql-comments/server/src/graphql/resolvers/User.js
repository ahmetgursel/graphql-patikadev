import db from '../../data';

export const User = {
  posts: (parent, __, ___) =>
    db.posts.filter((post) => post.user_id === parent.id),
  comment: (parent, __, ___) =>
    db.comments.filter((comment) => comment.user_id === parent.id),
};
