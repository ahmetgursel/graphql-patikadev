import { useState, useEffect } from 'react';
import { Divider, Button, Avatar, List } from 'antd';
import { useLazyQuery } from '@apollo/client';
import { GET_PARTICIPANTS } from '../queries';

import styles from './styles.module.css';

function ParticipantList({ event_id }) {
  const [btnIsVisible, setBtnIsVisible] = useState(true);

  const [loadParticipants, { loading, error, data: participantData }] =
    useLazyQuery(GET_PARTICIPANTS, { variables: { id: event_id } });

  useEffect(() => {
    if (!loading && participantData) {
      setBtnIsVisible(false);
    }
  }, [loading, participantData]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(participantData);

  return (
    <>
      <Divider>Participants</Divider>
      {btnIsVisible && (
        <div className={styles.showParticipantsBtnContainer}>
          <Button loading={loading} onClick={() => loadParticipants()}>
            Show Participants
          </Button>
        </div>
      )}
      {!loading && participantData && (
        <>
          <List
            itemLayout='horizontal'
            dataSource={participantData.event.participants}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                  title={item.user.username}
                  description={item.user.email}
                />
              </List.Item>
            )}
          />
        </>
      )}
    </>
  );
}

export default ParticipantList;
