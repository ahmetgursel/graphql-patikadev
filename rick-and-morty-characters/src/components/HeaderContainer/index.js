import React from 'react';
import styles from './style.module.css';
import SearchBar from '../SearchBar';

function HeaderContainer() {
  return (
    <div className={styles.headerContainer}>
      <p className={styles.title}>Wubba Lubba Dub Dubb</p>
      <SearchBar />
    </div>
  );
}

export default HeaderContainer;
