import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CustomModal from '../upload/Upload';
import Icon from '../common/icon';
import { Spacer } from '../common';
import { useAuthDataContext } from '../../providers/authDataProvider';
import { signOut } from '../../services/auth';

// import { Switch, Route } from 'react-router';
// import { Link } from 'react-router-dom';

const Navbar = () => {
  const { username } = useAuthDataContext();

  return (
    <Wrapper>
      <LogoWrapper className="section">
        <Link to="/">
          <h1>Thinhstagram</h1>
        </Link>
      </LogoWrapper>
      <UploadWrapper>
        <CustomModal />

        <Spacer dir="x" amount={70} />

        <Link to={`/${username}`}>
          <Icon size={25} name="person" color="#000" />
        </Link>

        <Spacer dir="x" amount={10} />

        <IconWrapper>
          <Icon
            onClick={() => {
              signOut();
              console.log('clicked signout');
            }}
            size={25}
            name="logout"
            color="#000"
          />
        </IconWrapper>
      </UploadWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 54px;
  padding: 0 20px;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  height: 77px;
  position: fixed;
  top: 0;
  transition: height 0.2s ease-in-out;
  width: 100%;
  z-index: 3;
  display: flex;
`;

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const LogoWrapper = styled.div`
  flex: 1 9999 0%;
  min-width: 40px;
  text-align: left;
`;

export default Navbar;
