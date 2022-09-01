import React from 'react';
import { useQuery } from '@apollo/client';
import { List } from 'antd';
import { Link } from 'react-router-dom';

import { GET_EVENTS } from './queries';
import styles from './styles.module.css';
import Loading from 'components/Loading';

function Home() {
  const { loading, error, data: eventsData } = useQuery(GET_EVENTS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(eventsData);

  return (
    <div>
      <List
        className='event-list'
        loading={false}
        itemLayout='horizontal'
        dataSource={eventsData.events}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link to={`event/${item.id}`} className={styles.listTitle}>
                  {item.title.length < 50
                    ? item.title
                    : `${item.title.substring(0, 50)}...`}{' '}
                  <span className={styles.date}>{item.date}</span>
                </Link>
              }
              description={
                <Link to={`event/${item.id}`} className={styles.listItem}>
                  {item.desc.length < 160
                    ? item.desc
                    : `${item.desc.substring(0, 160)}...`}
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
