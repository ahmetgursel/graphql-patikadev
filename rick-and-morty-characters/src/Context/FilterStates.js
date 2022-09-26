import { createContext, useState, useContext } from 'react';

export const FilterContext = createContext();

export const FilterProvider = (props) => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(true);
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');

  const values = {
    page,
    setPage,
    name,
    setName,
    search,
    setSearch,
    filtered,
    setFiltered,
    species,
    setSpecies,
    gender,
    setGender,
  };

  return <FilterContext.Provider value={values}>{props.children}</FilterContext.Provider>;
};

export const useFilter = () => useContext(FilterContext);
