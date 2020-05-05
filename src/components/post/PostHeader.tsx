import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ProfileIcon } from '../common';

import { User } from '../../user/user.type';

interface Props {
  user: User;
}

const PostHeader: React.FC<Props> = ({ user }) => {
  return (
    <Header>
      <ProfileIconWrapper>
        <Link to={`/${user.username}`}>
          <ProfileIcon imageUrl={user.profileImageUrl} />
        </Link>
      </ProfileIconWrapper>

      <HeaderInfo className="section">
        <UserNameWrapper className="section">
          <Username className="section">
            <Link to={`/${user.username}`}>
              <UsernameLink>{user.username}</UsernameLink>
            </Link>
          </Username>
        </UserNameWrapper>
        <LocationWrapper className="section">
          <Location className="section">
            <LocationLink href="#">Vans de Road</LocationLink>
          </Location>
        </LocationWrapper>
      </HeaderInfo>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 60px;
  padding: 16px;
`;

const ProfileIconWrapper = styled.div``;

const HeaderInfo = styled.div`
  margin-left: 16px;
  align-items: flex-start;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  margin-left: 12px;
  overflow: hidden;
`;

const UserNameWrapper = styled.div`
  max-width: 220px;
`;

const Username = styled.div`
  border: 0;
  color: #0095f6;
  display: inline;
  padding: 0;
  position: relative;
`;

const UsernameLink = styled.div`
  color: rgba(var(--f75, 38, 38, 38), 1);
  display: inline;
  padding: 0;
  position: relative;
  border: 0;
  background: 0 0;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  user-select: none;
  width: auto;
`;

const LocationWrapper = styled.div`
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Location = styled.div`
  border: 0;
  color: #0095f6;
  display: inline;
  padding: 0;
  position: relative;
`;

const LocationLink = styled.a`
  text-decoration: none;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  max-width: 100%;
  line-height: 15px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default PostHeader;
