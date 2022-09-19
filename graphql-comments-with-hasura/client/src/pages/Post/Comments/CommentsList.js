import { Divider, Comment, List } from 'antd';
import { useSubscription } from '@apollo/client';
import Loading from 'components/Loading';
// import styles from './styles.module.css';
import NewCommentForm from './NewCommentForm';
// import Loading from 'components/Loading';
import { COMMENTS_SUBSCRIPTION } from './queries';

function CommentList({ post_id }) {
  // const [btnIsVisible, setBtnIsVisible] = useState(true);

  const { loading, error, data } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: { post_id },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Divider>Comments</Divider>
      {!loading && data && (
        <>
          <List
            className='comment-list'
            itemLayout='horizontal'
            dataSource={data.comments}
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
