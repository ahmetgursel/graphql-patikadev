import { Divider, Col, Row, Card, Spin } from 'antd';
import { useQuery } from '@apollo/client';
import { FilterContext, useFilter } from '../../Context/FilterStates';
import { CHARACTERS_QUERY } from './queries';
import styles from './style.module.css';
import PaginationBox from '../PaginationBox';

function CardsContainer() {
  const { page, gender, species, name } = useFilter(FilterContext);

  const { loading, data } = useQuery(CHARACTERS_QUERY, {
    variables: {
      page,
      gender,
      species,
      name,
    },
  });

  if (loading || !data) {
    return <Spin delay={400} tip='Loading...' size='large' />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <Divider />
      <div>
        <Row>
          {data.characters.results.map((character) => (
            <Col className={styles.col} sm={24} md={12} xl={8} xxl={6} key={character.id}>
              <Card
                className={styles.card}
                size='small'
                bordered={false}
                cover={<img alt='example' className={styles.cardImage} src={character.image} />}
              >
                <p className={styles.species}>{character.species}</p>
                <h1 className={styles.name}>{character.name}</h1>
                <p className={styles.location}>{character.location.name}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className={styles.paginationBox}>
        <PaginationBox count={data.characters.info.count} />
      </div>
    </div>
  );
}

export default CardsContainer;
