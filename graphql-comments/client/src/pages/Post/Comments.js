import { useState, useEffect } from 'react';
import { Divider, Button, Comment, List } from 'antd';
import { useLazyQuery } from '@apollo/client';
import styles from './styles.module.css';
// import Loading from 'components/Loading';
import { GET_POST_COMMENTS } from './queries';

function Comments({ post_id }) {
  const [btnIsVisible, setBtnIsVisible] = useState(true);

  const [loadComments, { loading, error, data }] = useLazyQuery(
    GET_POST_COMMENTS,
    {
      variables: {
        id: post_id,
      },
    }
  );

  useEffect(() => {
    if (!loading && data) {
      setBtnIsVisible(false);
    }
  }, [loading, data]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Divider>Comments</Divider>
      {btnIsVisible && (
        <div className={styles.showCommentsBtnContainer}>
          <Button loading={loading} onClick={() => loadComments()}>
            Show Comments
          </Button>
        </div>
      )}
      {!loading && data && (
        <List
          className='comment-list'
          itemLayout='horizontal'
          dataSource={data.post.comment}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.user.fullName}
                avatar={item.user.profile_photo}
                content={item.text}
              />
            </li>
          )}
        />
      )}
    </>
  );
}

export default Comments;
