import React from "react";
import Modal from "react-modal";
import BaseLists from "./BaseLists";

Modal.setAppElement("#root");

function Reports() {
  return (
    <div className="purchase">
      <div className="purchase-box">
          <BaseLists title="موارد اولیه" icon="fa-solid fa-clipboard-list"/>
      </div>
      <div className="purchase-form">
      </div>
    </div>
  );
}

export default Reports;