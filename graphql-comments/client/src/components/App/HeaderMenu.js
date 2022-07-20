import React from 'react';
import { Menu } from 'antd';
import styles from './styles.module.css';
import { Link, useLocation } from 'react-router-dom';

const items = [
  { label: <Link to='/'>Home</Link>, key: '/' },
  { label: <Link to='/new'>New Post</Link>, key: '/new' },
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
