import React from 'react';
import { Badge, Avatar } from 'antd';
import styles from './styles.module.css';
import { useSubscription } from '@apollo/client';
import { POST_COUNT_SUBSCRIPTION } from './queries';

function PostCounter() {
  const { loading, data } = useSubscription(POST_COUNT_SUBSCRIPTION);

  const postCount = data?.posts_aggregate?.aggregate?.count;

  if (!loading)
    return (
      <div className={styles.container}>
        <Badge count={loading ? '?' : postCount} size='small'>
          <Avatar shape='square' size='medium'>
            <span className={styles.counterTitle}>Posts</span>
          </Avatar>
        </Badge>
      </div>
    );
}

export default PostCounter;
