import { FilterContext, useFilter } from '../../Context/FilterStates';
import { Divider, Radio, Space, Button } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import styles from './style.module.css';

function SidebarContainer() {
  const {
    setPage,
    gender,
    setGender,
    species,
    setSpecies,
    filtered,
    setFiltered,
    setName,
    setSearch,
  } = useFilter(FilterContext);

  const onChangeGender = (e) => {
    setGender(e.target.value);
    setFiltered(false);
  };
  const onChangeSpecies = (e) => {
    setSpecies(e.target.value);
    setFiltered(false);
  };

  const clearFilter = () => {
    setPage(1);
    setGender('');
    setSpecies('');
    setName('');
    setSearch('');
    setFiltered(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <Button
          className={styles.btn}
          size='small'
          shape='circle'
          icon={<UndoOutlined />}
          onClick={clearFilter}
          disabled={filtered}
        />
        <span className={styles.buttonText}>Clear Filter</span>
      </div>
      <Divider />
      <div>
        <div className={styles.genderTitle}>Gender</div>
        <div>
          <Radio.Group onChange={onChangeGender} value={gender}>
            <Space direction='vertical'>
              <Radio value={'Male'}>Male</Radio>
              <Radio value={'Female'}>Female</Radio>
              <Radio value={'Genderless'}>Genderless</Radio>
              <Radio value={'unknown'}>unknown</Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
      <Divider />
      <div>
        <div className={styles.speciesTitle}>Species</div>
        <div>
          <Radio.Group onChange={onChangeSpecies} value={species}>
            <Space direction='vertical'>
              <Radio value={'Human'}>Human</Radio>
              <Radio value={'Alien'}>Alien</Radio>
              <Radio value={'Humanoid'}>Humanoid</Radio>
              <Radio value={'Animal'}>Animal</Radio>
              <Radio value={'Robot'}>Robot</Radio>
              <Radio value={'Cronenberg'}>Cronenberg</Radio>
              <Radio value={'Mytholog'}>Mytholog</Radio>
              <Radio value={'Disease'}>Disease</Radio>
              <Radio value={'Poppybutthole'}>Poppybutthole</Radio>
              <Radio value={'Unknown'}>unknown</Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default SidebarContainer;
