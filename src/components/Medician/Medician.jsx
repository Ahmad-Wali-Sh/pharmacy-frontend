import React from "react";
import Modal from "react-modal";
import MedicianEntrance from "./MedicianEntrance/MedicianEntrance";

Modal.setAppElement("#root");

function Medician() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <MedicianEntrance title="ثبت دوا" icon="fa-solid fa-tablets"/>
      </div>
      <div className="purchase-form"></div>
    </div>
  );
}

export default Medician;