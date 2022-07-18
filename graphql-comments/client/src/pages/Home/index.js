import React from 'react';
import { Avatar, List, Skeleton } from 'antd';

const data = [
  {
    gender: 'female',
    name: {
      title: 'Miss',
      first: 'Latife',
      last: 'Ağaoğlu',
    },
    email: 'latife.agaoglu@example.com',
    picture: {
      large: 'https://randomuser.me/api/portraits/women/25.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/25.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/25.jpg',
    },
    nat: 'TR',
  },

  {
    gender: 'male',
    name: {
      title: 'Mr',
      first: 'Krasun',
      last: 'Porovskiy',
    },
    email: 'krasun.porovskiy@example.com',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/41.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/41.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/41.jpg',
    },
    nat: 'UA',
  },
];

function Home() {
  return (
    <div>
      <List
        className='demo-loadmore-list'
        loading={false}
        itemLayout='horizontal'
        // loadMore={loadMore}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href='https://ant.design'>{item.name?.last}</a>}
                description='Ant Design, a design language for background applications, is refined by Ant UED Team'
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
