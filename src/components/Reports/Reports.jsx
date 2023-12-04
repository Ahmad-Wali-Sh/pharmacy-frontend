import React from "react";
import Modal from "react-modal";
import Exchanges from "./Exchanges/Exchanges";
import MedicineBaseLists from "./MedicineLists/MedicineBaseLists";
import PurchaseList from "./PurchasesList/PurchaseList";
import SellBaseList from "./SellList/SellBaseList";
import ShopingLists from "./ShopingLists/ShopingLists";

Modal.setAppElement("#root");

function Reports() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        {/* <MedicineBaseLists title="داروخانه" icon="fa-solid fa-clipboard-list" /> */}
        <ShopingLists title='لست های خرید' button='main' icon='fa-solid fa-clipboard-list' activeKey='manual-shoping' name='لست های خرید'/>
        <SellBaseList title="فروشات" icon="fa-solid fa-clipboard-list" />
        <Exchanges title="تبادلات" icon="fa-solid fa-clipboard-list" />
        <PurchaseList title={"خریداری"} icon="fa-solid fa-clipboard-list" />
      </div>
      <div className="purchase-form"></div>
    </div>
  );
}

export default Reports;
