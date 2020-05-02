import React from 'react';
import styled from 'styled-components';
import ModalImage from 'react-modal-image';

// @ts-ignore
import unknownImage from '../../images/unknown_user.png';

interface Props {
  imageUrl?: string;
  caption?: string;
}

const PostImage: React.FC<Props> = ({
  imageUrl = unknownImage,
  caption = '',
}) => {
  return (
    <Wrapper className="section">
      <Image small={imageUrl} large={imageUrl} alt={caption} />
    </Wrapper>
  );
};

const Wrapper = styled.article`
  padding-bottom: 100%;
`;

const Image = styled(ModalImage)`
  object-fit: cover;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  user-select: none;
  width: 100%;
`;

export default PostImage;
