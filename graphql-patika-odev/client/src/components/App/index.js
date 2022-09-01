import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Col, Row } from 'antd';
import styles from './styles.module.css';

import Home from 'pages/Home';
import Event from 'pages/Event';
import HeaderMenu from 'components/HeaderMenu';

function App() {
  return (
    <div className={styles.container}>
      <Row justify='center'>
        <Col span={14} className={styles.col}>
          <Row>
            <Col span={18}>
              <HeaderMenu />
            </Col>
            <Col span={6}>Counter</Col>
          </Row>
          <div className={styles.content}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/event/:id' element={<Event />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
