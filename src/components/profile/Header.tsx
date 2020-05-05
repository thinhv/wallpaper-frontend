import React from 'react';
import styled from 'styled-components';

// @ts-ignore
import unknownImage from '../../images/unknown_user.png';
import { User } from '../user/user.types';

interface Props {
  user: User;
}

const Header: React.FC<Props> = ({ user }) => {
  return (
    <Wrapper>
      <Container>
        <ProfileImageWrapper>
          <img src={user.profileImageUrl || unknownImage} alt="profile image" />
        </ProfileImageWrapper>

        <BioWrapper>
          <UserSetting>
            <Username>{user.username}</Username>
            <BtnWrapper>
              <UsernameEditBtn>Edit Profile</UsernameEditBtn>
            </BtnWrapper>
          </UserSetting>

          <BioNameWrapper>
            <RealNameWrapper>
              {user.firstName} {user.lastName}
            </RealNameWrapper>
            <Bio>
              {user.bio ||
                `Travel is never a matter of money but of courage 📷✈️🏕️`}
            </Bio>
          </BioNameWrapper>
        </BioWrapper>
      </Container>
    </Wrapper>
  );
};

const BioNameWrapper = styled.div``;

const RealNameWrapper = styled.p`
  font-weight: 600;
`;
const Bio = styled.p`
  font-weight: 400;
`;

const Container = styled.div`
  padding: 20px 0;
  max-width 960px;
  display: flex;
`;

const BioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProfileImageWrapper = styled.div`
  width: calc(33.333% - 1rem);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;

  img {
    border-radius: 50%;
  }
`;

const Username = styled.h1`
  font-size: 20px;
  font-weight; 700;
`;

const UsernameEditBtn = styled.button`
  font-size: 12px;
  line-height: 1.8;
  border: 1px solid #dbdbdb;
  border-radius: 2px;
  padding: 0 15px;
  margin-left: 15px;
`;

const BtnWrapper = styled.div`
  align-items: center;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  position: relative;
`;

const UserSetting = styled.div`
  display: flex;
  width: calc(66.666% - 2rem);
`;

const Wrapper = styled.header`
  display: flex;
  margin: 70px auto;
  max-width: 100%;
  position: relative;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export default Header;
