import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import './index.css';
import App from './components/App';
import client from './apollo';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);
