import React from "react";
import Modal from "react-modal";
import Exchanges from "./Exchanges/Exchanges";
import MedicineBaseLists from "./MedicineLists/MedicineBaseLists";
import SellBaseList from "./SellList/SellBaseList";

Modal.setAppElement("#root");

function Reports() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <MedicineBaseLists title="داروخانه" icon="fa-solid fa-clipboard-list" />
        <SellBaseList title="فروشات" icon="fa-solid fa-clipboard-list" />
        <Exchanges title="تبادلات" icon="fa-solid fa-clipboard-list"/>
      </div>
      <div className="purchase-form"></div>
    </div>
  );
}

export default Reports;
