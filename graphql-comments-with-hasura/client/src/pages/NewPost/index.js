import React from 'react';

import NewPostForm from './NewPostForm';
import { Typography } from 'antd';
const { Title } = Typography;

function NewPost() {
  return (
    <div>
      <Title level={2}>New Post</Title>
      <NewPostForm />
    </div>
  );
}

export default NewPost;
