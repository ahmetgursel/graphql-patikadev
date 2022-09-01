import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.css';

const items = [
  { label: <Link to='/'>Events</Link>, key: '/' }, // remember to pass the key prop
  { label: <Link to='/new'>New Events</Link>, key: '/new' }, // which is required
];

function HeaderMenu() {
  const location = useLocation();
  return (
    <div>
      <Menu
        mode='horizontal'
        items={items}
        className={styles.headerMenu}
        selectedKeys={location.pathname}
      />
    </div>
  );
}

export default HeaderMenu;
