import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuthData } from '../services/auth';

const initialAuthData = {
  id: '',
  username: '',
  token: '',
};

interface AuthData {
  id: string;
  username: string;
  token: string;
}

interface AuthDataContextType {
  id: string;
  username: string;
  token: string;
}

export const AuthDataContext = createContext<Partial<AuthDataContextType>>({});

const AuthDataProvider = (props: any) => {
  const [authData, setAuthData] = useState(initialAuthData);

  /* The first time the component is rendered, it tries to
   * fetch the auth data from a source, like a cookie or
   * the localStorage.
   */
  useEffect(() => {
    const currentAuthData = getAuthData();
    if (currentAuthData) {
      setAuthData(currentAuthData);
    }
  }, [authData]);

  const onLogout = () => setAuthData(initialAuthData);

  const onLogin = (newAuthData: AuthData) => setAuthData(newAuthData);

  const authDataValue = { ...authData, onLogin, onLogout };

  return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

export const useAuthDataContext = () =>
  useContext<Partial<AuthDataContextType>>(AuthDataContext);

export default AuthDataProvider;
