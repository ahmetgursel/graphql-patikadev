const users = [
  {
    id: '1',
    fullName: 'Mehmet Seven',
    age: 29,
    profile_photo: 'https://randomuser.me/api/portraits/men/81.jpg',
  },
  {
    id: '2',
    fullName: 'Ahmet Gursel',
    age: 32,
    profile_photo: 'https://randomuser.me/api/portraits/men/31.jpg',
  },
];

const posts = [
  {
    id: '1',
    title: "Mehmet'in gonderisi",
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, illo!',
    user_id: '1',
  },
  {
    id: '2',
    title: "Mehmet'in diger gonderisi",
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    user_id: '1',
  },
  {
    id: '3',
    title: "Ahmet'in gonderisi",
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam!',
    user_id: '2',
  },
];

const comments = [
  {
    id: '1',
    text: "Bu Ahmet'in yorumudur.",
    post_id: '1',
    user_id: '2',
  },
  {
    id: '2',
    text: "Bu Mehmet'in yorumudur.",
    post_id: '1',
    user_id: '1',
  },
  {
    id: '3',
    text: "Bu Ahmet'in yorumudur.",
    post_id: '2',
    user_id: '2',
  },
  {
    id: '4',
    text: "Bu Mehmet'in yorumudur.",
    post_id: '3',
    user_id: '1',
  },
];

export default {
  users,
  posts,
  comments,
};
