import React from "react";
import Modal from "react-modal";
import CountryList from "./CountryList/CountryList";
import KindList from "./KindList/KindList";
import MedicianList from "./MedicianList/MedicianList";
import SellList from "./PharmGroupList/PharmGroupList";

function MedicineBaseLists({ title, icon }) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
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
      <div className="purchase-card" onClick={registerModalOpener}>
        <div>
          <h3>{title}</h3>
        </div>
        <div>
          <i className={icon}></i>
        </div>
      </div>

      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>لست موارد اولیه</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="list-items">
          <KindList Closer={registerModalCloser} />
          <MedicianList Closer={registerModalCloser} />
          <SellList Closer={registerModalCloser} />
          <CountryList Closer={registerModalCloser}/>
        </div>
      </Modal>
    </>
  );
}

export default MedicineBaseLists;
