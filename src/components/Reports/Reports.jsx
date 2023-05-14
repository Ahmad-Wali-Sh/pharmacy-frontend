import React from "react";
import Modal from "react-modal";
import MedicineBaseLists from "./MedicineLists/MedicineBaseLists";

Modal.setAppElement("#root");

function Reports() {
  return (
    <div className="purchase">
      <div className="purchase-box">
          <MedicineBaseLists title="موارد اولیه" icon="fa-solid fa-clipboard-list"/>
      </div>
      <div className="purchase-form">
      </div>
    </div>
  );
}

export default Reports;