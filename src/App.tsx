import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PageLoading } from './components/common';
import AuthDataProvider from './providers/authDataProvider';

// Code-split page components for smaller bundles
const Main = React.lazy(() =>
  import(/* webpackChunkName: 'main-page' */ './pages/Main')
);

const Login = React.lazy(
  () => import(/* webpackChunkName: 'login' */ './pages/Login') as any
);

function App() {
  return (
    <Router>
      <AuthDataProvider>
        <AppWrapper>
          <React.Suspense fallback={<PageLoading />}>
            <Switch>
              <Route
                exact
                path="/login"
                render={(props: any) => <Login {...props} />}
              />
              <Route render={(props: any) => <Main {...props} />} />
            </Switch>
          </React.Suspense>
          <ToastContainer />
        </AppWrapper>
      </AuthDataProvider>
    </Router>
  );
}

const AppWrapper = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${p => p.theme.colors.grey.light3};
`;

export default hot(App);
