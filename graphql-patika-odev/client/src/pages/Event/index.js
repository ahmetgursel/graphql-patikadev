import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
  ReadOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Typography, Image } from 'antd';

import Loading from 'components/Loading';
import styles from './styles.module.css';
import { GET_EVENT } from './queries';
import ParticipantList from './ParticipantList';

const { Title } = Typography;

function Event() {
  const { id } = useParams();
  const {
    loading,
    error,
    data: eventData,
  } = useQuery(GET_EVENT, {
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

  return (
    <div>
      <Title level={2}>{eventData.event.title}</Title>
      <Image
        width={400}
        src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      />
      <div className={styles.description}>
        <ReadOutlined /> {eventData.event.desc}
      </div>
      <div className={styles.user}>
        <UserOutlined /> {eventData.event.user.username}
      </div>
      <div className={styles.date}>
        <CalendarOutlined /> {eventData.event.date}
      </div>
      <div className={styles.time}>
        <ClockCircleOutlined /> {eventData.event.from} - {eventData.event.to}
      </div>
      <div className={styles.location}>
        <HomeOutlined />{' '}
        {`${eventData.event.location.name}-(Lat:${eventData.event.location.lat} - Long: ${eventData.event.location.lng})`}
      </div>
      <ParticipantList event_id={id} />
    </div>
  );
}

export default Event;
