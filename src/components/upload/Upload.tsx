import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Modal from './Modal';

interface ModalPortalProps {
  isOpen: boolean;
  close: () => any;
}

const getPortalRoot = () => {
  const el = document.body;
  return el;
};

const ModalPortal = ({ isOpen, close }: ModalPortalProps) => {
  return isOpen
    ? ReactDOM.createPortal(<Modal close={close} />, getPortalRoot())
    : null;
};

const CustomModal = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <div>
      <UploadBtn onClick={open}>New Post</UploadBtn>
      <ModalPortal isOpen={isModalOpen} close={close} />
    </div>
  );
};

const UploadBtn = styled.button`
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
`;

export default CustomModal;
