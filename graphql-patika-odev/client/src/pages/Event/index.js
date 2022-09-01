import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_EVENT } from './queries';
import Loading from 'components/Loading';

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

  console.log(eventData);

  return <div>{id}</div>;
}

export default Event;
