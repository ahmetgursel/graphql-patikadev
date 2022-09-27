import { Pagination } from 'antd';
import { FilterContext, useFilter } from '../../Context/FilterStates';

function PaginationBox({ count }) {
  const { page, setPage } = useFilter(FilterContext);

  const paginationHandler = (page) => {
    setPage(page);
  };

  return (
    <div>
      <Pagination
        current={page}
        onChange={paginationHandler}
        total={count}
        pageSize={20}
        showSizeChanger={false}
      />
    </div>
  );
}

export default PaginationBox;
