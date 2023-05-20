import React from "react";
import Modal from "react-modal";
import DoctorList from "../DoctorList/DoctorList";
import PrescriptionList from "../PrescriptionList/PrescriptionList";

function PatientList({ Closer }) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
    Closer();
  }

  const ModalStyles = {
    content: {
      backgroundColor: "rgb(30,30,30)",
      border: "none",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "0px",
      margin: "0px",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
    },
  };

  return (
    <>
      <div className="list-card" onClick={registerModalOpener}>
        <h3>فهرست مریض ها</h3>
      </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>فهرست مریض ها</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="list-items">
          <PrescriptionList Closer={registerModalCloser} />
          <DoctorList Closer={registerModalCloser} />
          <div></div>
        </div>
      </Modal>
    </>
  );
}

export default PatientList;
