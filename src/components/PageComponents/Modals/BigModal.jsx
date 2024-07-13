import React, { memo, useEffect } from 'react'
import { forwardRef, useImperativeHandle } from "react";
import Modal from "react-modal";
import { ModalBigStyles } from "../../../styles";
import { useMedicineClosed } from '../../States/States';

const BigModal = memo(forwardRef((props, ref) => {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  const { medicineClosed, setMedicineClosed} = useMedicineClosed()

  useImperativeHandle(ref, () => ({
    Opener() {
      setRegisterModalOpen(true);
    },
    Closer() {
      setRegisterModalOpen(false);
      props?.medicineModal && setMedicineClosed(new Date())
    },
  }));

  const onClose = () => {
    setRegisterModalOpen(false);
    props?.medicineModal && setMedicineClosed(new Date())
  };

  useEffect(() => {
    registerModalOpen === false && props?.medicineModal && setMedicineClosed(new Date())
  }, [registerModalOpen])

  return (
    <Modal
      style={ModalBigStyles}
      isOpen={registerModalOpen}
      onRequestClose={() => props.EscOff ? props.EscOff() : onClose()}
    >
      <div className="modal-header">
        <h3>{props.title}</h3>
        <div className="modal-close-btn" onClick={() => props.closeFunc ? props.closeFunc() : onClose()}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className='modal-box'>
        {props.children}
      </div>
    </Modal>
  );
}));
export default BigModal;
