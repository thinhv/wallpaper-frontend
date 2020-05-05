import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

import { RegisterUser } from '../components/user/user.types';
import { Spacer } from '../components/common';
import { saveAuthData } from '../services/auth';
// import { useAuthDataContext } from '../providers/authDataProvider';

interface LoginData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [isloggedIn, setIsloggedIn] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const REGISTER = gql`
    mutation RegisterUser(
      $username: String!
      $email: String!
      $password: String!
      $firstName: String!
      $lastName: String!
      $bio: String
    ) {
      registerUser(
        username: $username
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        bio: $bio
      ) {
        token
        id
        username
      }
    }
  `;

  const LOGIN = gql`
    query Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
        id
        username
      }
    }
  `;

  const signupEnabled = username && email && firstName && lastName && password;
  const loginEnabled = username && password;

  const [newUser] = useMutation(REGISTER);
  const addUser = (variables: RegisterUser) => {
    return newUser({
      variables,
    });
  };
  const handleSignup = async () => {
    setIsLoggingIn(true);
    try {
      const { data, errors } = await addUser({
        username,
        password,
        email,
        firstName,
        lastName,
        bio,
      });

      if (errors) {
        toast.error('Cannot sign up!');
      }

      saveAuthData({
        token: data.registerUser.token,
        username: data.registerUser.username,
        id: data.registerUser.id,
      });
      setTimeout(() => {
        setIsloggedIn(true);
        setIsLoggingIn(false);
      }, 200);
    } catch (e) {
      toast.error('Something went wrong!');
      setIsLoggingIn(false);
    }
  };

  const [newLoginUser, { data: loginData }] = useLazyQuery(LOGIN);
  const loginUser = (variables: LoginData) => {
    return newLoginUser({
      variables,
    });
  };

  React.useEffect(() => {
    if (!loginData) return;
    saveAuthData({
      token: loginData.login.token,
      username: loginData.login.username,
      id: loginData.login.id,
    });
    setTimeout(() => {
      setIsloggedIn(true);
    }, 200);
  }, [loginData]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await loginUser({ username, password });
    } catch (e) {
      toast.error('Cannot login');
      console.error(e);
      setIsLoggingIn(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    isSignUp ? handleSignup() : handleLogin();
  };

  if (isloggedIn) return <Redirect to="/" />;

  return (
    <BackgroundWrapper>
      <Wrapper>
        <LoginPanelWrapper>
          <form onSubmit={handleSubmit}>
            <LoginPanel>
              <HeaderArea>
                <h1>Thinhstagram</h1>
              </HeaderArea>
              <InputArea>
                <InputWrapper>
                  <Input
                    type="text"
                    onChange={({ currentTarget }) =>
                      setUsername(currentTarget.value)
                    }
                    placeholder="Username"
                    value={username}
                  />
                </InputWrapper>
                {isSignUp && (
                  <>
                    <InputWrapper>
                      <Input
                        type="email"
                        onChange={({ currentTarget }) =>
                          setEmail(currentTarget.value)
                        }
                        placeholder="Email"
                        value={email}
                      />
                    </InputWrapper>

                    <InputWrapper>
                      <Input
                        type="text"
                        onChange={({ currentTarget }) =>
                          setFirstName(currentTarget.value)
                        }
                        placeholder="First name"
                        value={firstName}
                      />
                    </InputWrapper>

                    <InputWrapper>
                      <Input
                        type="text"
                        onChange={({ currentTarget }) =>
                          setLastName(currentTarget.value)
                        }
                        placeholder="Last name"
                        value={lastName}
                      />
                    </InputWrapper>

                    <InputWrapper>
                      <Input
                        type="text"
                        onChange={({ currentTarget }) =>
                          setBio(currentTarget.value)
                        }
                        placeholder="Short bio info"
                        value={bio}
                      />
                    </InputWrapper>
                  </>
                )}
                <InputWrapper>
                  <Input
                    type="password"
                    placeholder="Password"
                    onChange={({ currentTarget }) =>
                      setPassword(currentTarget.value)
                    }
                    value={password}
                  />
                </InputWrapper>
                <Spacer dir="y" amount={10} />
                <ButtonWrapper>
                  {isSignUp ? (
                    <LoginBtn type="submit" disabled={!signupEnabled}>
                      Sign up
                    </LoginBtn>
                  ) : (
                    <LoginBtn type="submit" disabled={!loginEnabled}>
                      Login
                    </LoginBtn>
                  )}
                </ButtonWrapper>
                <Spacer dir="y" amount={24} />
              </InputArea>
            </LoginPanel>
          </form>
        </LoginPanelWrapper>
        {!isSignUp && (
          <SignupWrapper>
            Don&apos;t have an account?
            <SignupTriggerText
              onClick={() => {
                setIsSignUp(true);
              }}
            >
              Sign up
            </SignupTriggerText>
          </SignupWrapper>
        )}

        {isLoggingIn && <SignupWrapper>Logging in...</SignupWrapper>}
      </Wrapper>
    </BackgroundWrapper>
  );
};

const Div = styled.div`
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  border: 0 solid #000;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  position: relative;
`;

const SignupWrapper = styled(Div)`
  font-size: 14px;
  line-height: 18px;
  color: #262626;
  font-size: 14px;
  margin: 15px;
  text-align: center;
  background: #fff;
  margin-top: 10px;
  max-width: 350px;
  width: 100%;
  padding: 15px;
`;

const LoginPanelWrapper = styled.span`
  color: #262626;
  justify-content: center;
  margin-top: 12px;
  max-width: 350px;
  width: 100%;
  position: relative;
`;

const SignupTriggerText = styled.a`
  color: #0095f6;
  font-weight: 600;
  cursor: pointer;
`;

const HeaderArea = styled(Div)`
  display: flex;
  text-align: center;
  align-item: center;
`;

const InputArea = styled(Div)`
  margin: 24px 0;
  position: relative;
`;

const InputWrapper = styled(Div)`
  margin: 0 40px 6px;
  align-items: center;
  background: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  box-sizing: border-box;
  color: #262626;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  position: relative;
`;

const ButtonWrapper = styled(Div)`
  margin: 0 40px 6px;
  align-items: center;
  background: #fafafa;
  border: 1px solid transparent;
  border-radius: 3px;
  box-sizing: border-box;
  color: #262626;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  position: relative;
`;

const Input = styled.input`
  background: #fafafa;
  background: rgba(var(--b3f, 250, 250, 250), 1);
  border: 0;
  -webkit-box-flex: 1;
  -webkit-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  margin: 0;
  outline: 0;
  overflow: hidden;
  padding: 9px 0 7px 8px;
  text-overflow: ellipsis;
`;

const LoginBtn = styled.button`
  border: 1px solid transparent;
  background-color: #0095f6;
  appearance: none;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  font-weight: 600;
  padding: 7px 9px;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  user-select: none;
  width: auto;
  flex: 1;
  color: #fff;
  outline: 0;
  border-radius: 3px;
  &:disabled {
    background-color: rgba(0, 149, 246, 0.3);
  }
`;

const LoginPanel = styled(Div)`
  background-color: rgba(var(--d87, 255, 255, 255), 1);
  border-radius: 1px;
  margin: 0 0 10px;
  padding: 10px 0;
  box-shadow: 1px 0px 3px rgba(0, 0, 0, 0.15);
`;

const Wrapper = styled(Div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  order: 4;
  margin: 0 auto;
  max-width: 600px;
  position: relative;
  width: 100%;
`;

const BackgroundWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background: linear-gradient(
    124deg,
    #ff2400,
    #e81d1d,
    #e8b71d,
    #e3e81d,
    #1de840,
    #1ddde8,
    #2b1de8,
    #dd00f3,
    #dd00f3
  );
  background-size: 1800% 1800%;
  background-position: 70% 40%;
`;

export default Login;
