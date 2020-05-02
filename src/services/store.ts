import { History } from 'history';
import { configureStore as _configureStore } from 'redux-starter-kit';
import { connectRouter, routerMiddleware } from 'connected-react-router';

export default function configureStore(history: History) {
  const middlewares = [routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger'); // eslint-disable-line
    middlewares.push(logger);
  }

  const store = _configureStore({
    middleware: middlewares,
    reducer: {
      router: connectRouter(history) as any,
    },
  });

  return store;
}
