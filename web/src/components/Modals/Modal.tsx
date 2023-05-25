import React from "react";

import { XLg } from "react-bootstrap-icons";
import styled from "styled-components";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContent>
        <ModalHeader>
          <h3>Model Header</h3>
          <CloseCross onClick={onClose} />
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  width: 300px;
  height: 400px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;

  border-radius: 4px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CloseCross = styled(XLg)`
  &:hover,
  :active,
  :focus {
    cursor: pointer;
  }
`;

export default Modal;
