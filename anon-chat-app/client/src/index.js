import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import client from './apollo';
import { ApolloProvider } from '@apollo/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ApolloProvider>
);
