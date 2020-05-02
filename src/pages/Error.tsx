import React from 'react';
import styled from 'styled-components';

const Error: React.FC = () => {
  return (
    <Wrapper>
      <h2>Ouch!</h2>
      <p>Something went wrong!</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

export default Error;
