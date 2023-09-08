import React from 'react'
import { forwardRef, useImperativeHandle } from "react";
import Modal from "react-modal";
import { ModalBigStyles } from "../../../styles";

const BigModal = forwardRef((props, ref) => {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  useImperativeHandle(ref, () => ({
    Opener() {
      setRegisterModalOpen(true);
    },
    Closer() {
      setRegisterModalOpen(false);
    },
  }));

  const onClose = () => {
    setRegisterModalOpen(false);
  };

  return (
    <Modal
      style={ModalBigStyles}
      isOpen={registerModalOpen}
      onRequestClose={onClose}
    >
      <div className="modal-header">
        <h3>{props.title}</h3>
        <div className="modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className='modal-box'>
        {props.children}
      </div>
    </Modal>
  );
});
export default BigModal;
