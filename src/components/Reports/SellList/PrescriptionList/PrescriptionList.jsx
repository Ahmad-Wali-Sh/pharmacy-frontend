import React from "react";
import Modal from "react-modal";
import DoctorList from "../DoctorList/DoctorList";
import PatientList from "../PatientList/PatientList";

function PrescriptionList({ Closer }) {
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
        <h3>فهرست نسخه ها</h3>
      </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>فهرست نسخه ها</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="list-items">
          <div></div>
          <DoctorList Closer={registerModalCloser} />
          <PatientList Closer={registerModalCloser} />
        </div>
        <div className="prescription-list-box">
          <div className="prescription-list-filter">
            <label>ش.نسخه:</label>
            <input type="text" />
            <label>نوع نسخه:</label>
            <input type="text" />
            <div className="prescription-list-filter-dates">
              <label>از:</label>
              <input type="date" />
              <label>تا:</label>
              <input type="date" />
            </div>
            <label>مریض:</label>
            <input type="text" />
            <label>داکتر:</label>
            <input type="text" />
            <div className="prescription-list-filter-buttons">
              <input type="button" value="جستوجو" />
              <input type="button" value="ریسیت" />
              <input type="button" value="اکسل" />
            </div>
          </div>
          <div className="prescription-list-header"></div>
          <div className="prescription-list-map-box"></div>
        </div>
      </Modal>
    </>
  );
}

export default PrescriptionList;
