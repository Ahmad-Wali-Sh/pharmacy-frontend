import Modal from "react-modal";
import React from "react";

export default function Entrance(props) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }
  const customStyles = {
    content: {
      backgroundColor: "rgb(60,60,60)",
      border: "none",
      borderRadius: "2rem",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
    },
  };

  return (
    <>
      <div className="purchase-card" onClick={registerModalOpener}>
        <div>
          <h3>{props.title}</h3>
          <h4>{props.number}</h4>
        </div>
        <div>
          <i className={props.icon}></i>
        </div>
      </div>
      <Modal
        style={customStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal">
          <div className="modal-header">
            <h3>ثبت ورودی</h3>
            <div className="modal-close-btn" onClick={registerModalCloser}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
