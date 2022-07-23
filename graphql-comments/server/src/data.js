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
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quisquam amet quae odio voluptatem necessitatibus dolor, est ducimus sed officiis, numquam pariatur modi cum ipsa, exercitationem possimus perspiciatis dicta soluta? Nobis perferendis illum, sit fuga natus quasi soluta totam dolorem debitis eius quos placeat amet laboriosam libero ad, conseatum!',
    short_description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quisquam amet quae odio...',
    user_id: '1',
    cover:
      'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },

  {
    id: '2',
    title: "Mehmet'in diger gonderisi",
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum autem cumque velit aliquid, odio quae magnam facere ullam alias reprehenderit aut perferendis pariatur voluptatibus eveniet. Ad temporibus facilis commodi quam unde odit, nihil doloribus libero laboriosam pariatur illo eaque sed maxime vero dolor facere rerum. Eaque, fugiat.',
    short_description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum autem cumque velit...',
    user_id: '1',
    cover:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: "Ahmet'in gonderisi",
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed a ipsum accusantium laboriosam, nostrum harum, rem numquam, maxime corrupti unde nobis! Odit ad cumque facere nesciunt perferendis quidem aliquid eaque similique voluptas?',
    short_description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed a ipsum accusantium...',
    user_id: '2',
    cover:
      'https://images.unsplash.com/photo-1523867574998-1a336b6ded04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
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
