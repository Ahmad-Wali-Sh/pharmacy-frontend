import React from "react";
import { forwardRef, useImperativeHandle } from "react";
import Modal from "react-modal";
import { AlertModalStyle } from "../../../styles";

const AlertModal = forwardRef(
  ({ errorText, errorTitle, OkFunc, NoFunc }, ref) => {
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
        style={AlertModalStyle}
        isOpen={registerModalOpen}
        onRequestClose={onClose}
      >
        <>
          <div className="modal-header">
            <h3>!خطا</h3>
            <div className="modal-close-btn" onClick={() => onClose()}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className="alert-box">
            <div className="alert-text-box">
              <h3>{errorTitle}</h3>
              <h4>{errorText}</h4>
            </div>
            <div className="alert-button-box">
              <button
                onClick={() => {
                  OkFunc();
                  onClose();
                }}
              >
                بله
              </button>
              <button
                onClick={() => {
                  NoFunc();
                  onClose();
                }}
              >
                نخیر
              </button>
            </div>
          </div>
        </>
      </Modal>
    );
  }
);
export default AlertModal;