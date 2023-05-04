import React from "react";
import Modal from "react-modal";
import Prescription from "./Prescription/Prescription";

Modal.setAppElement("#root");

function Sell() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <Prescription title="ثبت نسخه" icon="fa-solid fa-cart-arrow-down"/>
      </div>
      <div className="purchase-form"></div>
    </div>
  );
}

export default Sell;