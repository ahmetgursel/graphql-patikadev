import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Typography, Image } from 'antd';
import Loading from 'components/Loading';
import Comments from './Comments';
import { GET_POST } from './queries';
import styles from './styles.module.css';

const { Title } = Typography;

function Post() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { post } = data;

  return (
    <div>
      <Title level={2}>{post.title}</Title>
      <Image src={post.cover} />
      <div className={styles.description}>{post.description}</div>
      <Comments post_id={id} />
    </div>
  );
}

export default Post;
