import Modal from "../../components/Modals/Modal";

import React from "react";

const PollTypeModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p>Poll type modal</p>
    </Modal>
  );
};

export default PollTypeModal;
