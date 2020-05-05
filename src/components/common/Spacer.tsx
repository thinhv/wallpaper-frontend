import styled from 'styled-components';

interface Props {
  amount?: number;
  dir?: 'x' | 'y';
  noflex?: boolean;
}

const getDim = (props: Props) => {
  const amount = props.amount || 16;
  const prop = props.dir === 'x' ? 'width' : 'height';
  return `${prop}: ${amount}px;`;
};

const Spacer = styled.div<Props>`
  height: 0px;
  flex-shrink: 0;
  ${props => getDim(props)}
  ${props => props.noflex && 'flex: none;'}
`;

export default Spacer;
