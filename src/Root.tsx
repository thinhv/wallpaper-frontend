import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

import theme from './constants/theme';
import configureStore from './services/store';
import App from './App';
import config from './config';

const history = createBrowserHistory();
const store = configureStore(history);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const createApolloClient = new ApolloClient({
  ssrMode: typeof window !== 'undefined',
  cache: new InMemoryCache(),
  link: authLink.concat(createUploadLink({ uri: config.GRAPHQL_ENDPOINT })),
});

const Root = () => (
  <ApolloProvider client={createApolloClient}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>
);

export default Root;
