interface AuthData {
  id: string;
  username: string;
  token: string;
}

export const setCredentials = async (
  url: RequestInfo,
  options: { [index: string]: any }
) => {
  console.log(url);
  const credentials = {
    authorization: `Bearer ${localStorage.getItem('user-token')}`,
  };

  options.headers = credentials;
  return options;
};

export const signOut = () => {
  localStorage.removeItem('user-token');
  localStorage.removeItem('token');
  localStorage.removeItem('id');
};

export const isAuthenticated = true;

export const init = async () => {};

export const authenticate = () => {};

export const getAuthData = () => {
  const id = localStorage.getItem('id') || '';
  const username = localStorage.getItem('username') || '';
  const token = localStorage.getItem('token') || '';

  return {
    id,
    username,
    token,
  };
};

export const saveAuthData = ({ id, username, token }: AuthData): void => {
  localStorage.setItem('id', id);
  localStorage.setItem('username', username);
  localStorage.setItem('token', token);
};
