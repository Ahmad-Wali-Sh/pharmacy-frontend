import React from "react";
import Modal from "react-modal";
import Revenue from "./Revenue";
import RevenueManager from "./RevenueManager";

Modal.setAppElement("#root");

function RevenueDashboard() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <RevenueManager title="مدیریت صندوق ها" icon="fa-solid fa-landmark" />
        <Revenue title="صندوق" icon="fa-solid fa-money-bill-transfer" />
      </div>
      <div className="purchase-form"></div>
    </div>
  );
}

export default RevenueDashboard;
