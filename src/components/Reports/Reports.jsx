import React from "react";
import Modal from "react-modal";
import ShopingLists from "./ShopingLists/ShopingLists";
import RevenueLists from "./RevenueLists/RevenueLists";

Modal.setAppElement("#root");

function Reports() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <ShopingLists title='لست های خرید' button='main' icon='fa-solid fa-clipboard-list' activeKey='manual-shoping' name='لست های خرید'/>
        <RevenueLists title='گزارشات صندوق' button='main' icon='fa-solid fa-clipboard-list' activeKey='manual-shoping' name='گزاشات صندوق'/>
      </div>
      <div className="purchase-form"></div>
    </div>
  );
}

export default Reports;
