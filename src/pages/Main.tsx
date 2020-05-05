import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';

import { PageLoading } from '../components/common';
import Navbar from '../components/navigation/Navbar';
import { useAuthDataContext } from '../providers/authDataProvider';

// Code-split page components for smaller bundles
const Home = React.lazy(
  () => import(/* webpackChunkName: 'home-page' */ './Home') as any
);

const Error = React.lazy(
  () => import(/* webpackChunkName: 'error' */ './Error') as any
);

const PageLayout: React.FC = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const Main = () => {
  const { token } = useAuthDataContext();
  return (
    <Wrapper>
      <React.Suspense fallback={<PageLoading />}>
        <Switch>
          <PrivateRoute isSignedIn={!!token} path="/:profileId?">
            <PageLayout>
              <React.Suspense fallback={<Home />}>
                <Home />
              </React.Suspense>
            </PageLayout>
          </PrivateRoute>

          <Route component={Error} />
        </Switch>
      </React.Suspense>
    </Wrapper>
  );
};

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  isSignedIn: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { isSignedIn, children, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps =>
        isSignedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default Main;
