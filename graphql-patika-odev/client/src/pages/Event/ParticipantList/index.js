import { useState, useEffect } from 'react';
import { Divider, Button, Avatar, List } from 'antd';
import { useLazyQuery } from '@apollo/client';
import { GET_PARTICIPANTS, PARTICIPANT_SUBSCRIPTION } from '../queries';

import styles from './styles.module.css';

function ParticipantList({ event_id }) {
  const [btnIsVisible, setBtnIsVisible] = useState(true);

  const [loadParticipants, { called, loading, error, data: participantData, subscribeToMore }] =
    useLazyQuery(GET_PARTICIPANTS, { variables: { id: event_id } });

  useEffect(() => {
    if (!loading && called) {
      subscribeToMore({
        document: PARTICIPANT_SUBSCRIPTION,
        variables: { id: event_id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newParticipantItem = subscriptionData.data.participantCreated;

          return {
            event: {
              ...prev.event,
              participants: [...prev.event.participants, newParticipantItem],
            },
          };
        },
      });
    }
  }, [loading, called, subscribeToMore, event_id]);

  useEffect(() => {
    if (!loading && participantData) {
      setBtnIsVisible(false);
    }
  }, [loading, participantData]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
