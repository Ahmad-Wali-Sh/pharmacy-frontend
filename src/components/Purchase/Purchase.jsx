import React from "react";
import Modal from "react-modal";
import Company from "./Company/Company";
import Entrance from "./Entrance/Entrance";

Modal.setAppElement("#root");

function Purchase() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <Entrance title="ثبت ورودی" icon="fa-solid fa-cart-arrow-down" />
        <Company title="ثبت شرکت" icon="fa-solid fa-store" button={1} />
        {/* <Entrance
          title="ثبت انبار"
          number="12"
          icon="fa-solid fa-store"
        />
        
        <Entrance
          title="ثبت شرکت"
          number="12"
          icon="fa-solid fa-building"
        />
        <Entrance
          title="ثبت متفرقه"
          number="12"
          icon="fa-solid fa-feather"
        /> */}
      </div>
      <div className="purchase-form"></div>
    </div>
  );
}

export default Purchase;
