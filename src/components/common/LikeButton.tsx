import React from 'react';
import styled from 'styled-components';

interface Props {
  isLiked?: boolean;
  onClick?: any;
}

function LikeButton({ isLiked = false, ...rest }: Props) {
  return (
    <Wrapper {...rest}>
      <Button>
        {isLiked ? (
          <svg fill="#ed4956" height="24" viewBox="0 0 48 48" width="24">
            <path
              clipRule="evenodd"
              d="M35.3 35.6c-9.2 8.2-9.8 8.9-11.3 8.9s-2.1-.7-11.3-8.9C6.5 30.1.5 25.6.5 17.8.5 9.9 6.4 3.5 13.7 3.5 20.8 3.5 24 8.8 24 8.8s3.2-5.3 10.3-5.3c7.3 0 13.2 6.4 13.2 14.3 0 7.8-6.1 12.3-12.2 17.8z"
              fillRule="evenodd"
            />
          </svg>
        ) : (
          <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
            <path
              clipRule="evenodd"
              d="M34.3 3.5C27.2 3.5 24 8.8 24 8.8s-3.2-5.3-10.3-5.3C6.4 3.5.5 9.9.5 17.8s6.1 12.4 12.2 17.8c9.2 8.2 9.8 8.9 11.3 8.9s2.1-.7 11.3-8.9c6.2-5.5 12.2-10 12.2-17.8 0-7.9-5.9-14.3-13.2-14.3zm-1 29.8c-5.4 4.8-8.3 7.5-9.3 8.1-1-.7-4.6-3.9-9.3-8.1-5.5-4.9-11.2-9-11.2-15.6 0-6.2 4.6-11.3 10.2-11.3 4.1 0 6.3 2 7.9 4.2 3.6 5.1 1.2 5.1 4.8 0 1.6-2.2 3.8-4.2 7.9-4.2 5.6 0 10.2 5.1 10.2 11.3 0 6.7-5.7 10.8-11.2 15.6z"
              fillRule="evenodd"
            />
          </svg>
        )}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: inline-block;
  margin-left: -8px;
`;

const Button = styled.button`
  align-items: center;
  background: 0 0;
  border: 0;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  padding: 8px;
  outline: none;
`;

export default LikeButton;
