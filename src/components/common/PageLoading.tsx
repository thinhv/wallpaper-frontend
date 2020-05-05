import React from 'react';
import styled from 'styled-components';

function PageLoading() {
  return <Wrapper>Loading...</Wrapper>;
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PageLoading;
