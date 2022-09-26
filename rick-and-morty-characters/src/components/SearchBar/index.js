import { Form, Input } from 'antd';
import { FilterContext, useFilter } from '../../Context/FilterStates';
import styles from './style.module.css';

const { Search } = Input;

function SearchBar() {
  const { setName, setFiltered, search, setSearch } = useFilter(FilterContext);

  const searchHandler = (value) => {
    setName(value);
    setSearch('');
    setFiltered(false);
  };

  return (
    <div>
      <Form>
        <Search
          className={styles.searchBox}
          size='large'
          placeholder='Search character name...'
          enterButton={true}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={searchHandler}
        />
      </Form>
    </div>
  );
}

export default SearchBar;
