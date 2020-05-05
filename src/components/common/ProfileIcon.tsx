import React from 'react';
import styled from 'styled-components';

// @ts-ignore
import unknownImage from '../../images/unknown_user.png';

interface Props {
  imageUrl?: string;
}

const ProfileIcon: React.FC<Props> = ({ imageUrl = unknownImage }) => {
  return (
    <Wrapper>
      <ProfileLink>
        <img src={imageUrl || unknownImage} />
      </ProfileLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  align-self: center;
  display: block;
  flex: none;
  justify-content: center;
`;

const ProfileLink = styled.div`
  width: 32px;
  height: 32px;
  background-color: rgba(var(--b3f, 250, 250, 250), 1);
  border-radius: 50%;
  box-sizing: border-box;
  display: block;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative;
`;

export default ProfileIcon;
