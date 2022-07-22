import React from 'react';
import { Avatar, List } from 'antd';
import { useQuery } from '@apollo/client';
import Loading from 'components/Loading';
import { GET_POSTS } from './queries';
import { Link } from 'react-router-dom';

function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <List
        className='demo-loadmore-list'
        loading={false}
        itemLayout='horizontal'
        // loadMore={loadMore}
        dataSource={data.posts}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.user.profile_photo} />}
              title={<Link to={`post/${item.id}`}>{item.title}</Link>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
