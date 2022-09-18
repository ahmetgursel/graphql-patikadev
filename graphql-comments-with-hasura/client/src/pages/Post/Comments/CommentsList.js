import { useState, useEffect } from 'react';
import { Divider, Button, Comment, List } from 'antd';
import { useLazyQuery } from '@apollo/client';
import styles from './styles.module.css';
import NewCommentForm from './NewCommentForm';
// import Loading from 'components/Loading';
import { GET_POST_COMMENTS, COMMENTS_SUBSCRIPTION } from '../queries';

function CommentList({ post_id }) {
  const [btnIsVisible, setBtnIsVisible] = useState(true);

  const [loadComments, { called, loading, error, data, subscribeToMore }] = useLazyQuery(
    GET_POST_COMMENTS,
    {
      variables: {
        id: post_id,
      },
    }
  );

  useEffect(() => {
    if (!loading && called) {
      subscribeToMore({
        document: COMMENTS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newCommentItem = subscriptionData.data.commentCreated;

          return {
            post: {
              ...prev.post,
              comment: [...prev.post.comment, newCommentItem],
            },
          };
        },
      });
    }
  }, [loading, called, subscribeToMore]);

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
        <>
          <List
            className='comment-list'
            itemLayout='horizontal'
            dataSource={data.post.comments}
            renderItem={(item) => (
              <li key={item._id}>
                <Comment
                  author={item.user.fullName}
                  avatar={item.user.profile_photo}
                  content={item.text}
                />
              </li>
            )}
          />

          <Divider>New Comment</Divider>

          <NewCommentForm post_id={post_id} />
        </>
      )}
    </>
  );
}

export default CommentList;
