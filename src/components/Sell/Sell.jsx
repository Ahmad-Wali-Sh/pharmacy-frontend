import React from "react";
import Modal from "react-modal";
import Doctor from "./Prescription/Doctor";
import Patient from "./Prescription/Patient";
import Prescription from "./Prescription/Prescription";

Modal.setAppElement("#root");

function Sell() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <Prescription title="ثبت نسخه" icon="fa-solid fa-cart-arrow-down"/>
        <Doctor title="ثبت داکتر" button={1} icon="fa-solid fa-user-doctor"/>
        <Patient title="ثبت مریض" button={1} icon="fa-solid fa-bed"/>
      </div>
      <div className="purchase-form"></div>
    </div>
  );
}

export default Sell;