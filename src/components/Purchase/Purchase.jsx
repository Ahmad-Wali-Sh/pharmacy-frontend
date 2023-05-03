import React from "react";
import Modal from "react-modal";
import MedicianEntrance from "../Medician/MedicianEntrance/MedicianEntrance";
import Company from "./Company/Company";
import Entrance from "./Entrance/Entrance";
import Store from "./Store/Store";

Modal.setAppElement("#root");

function Purchase() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <Entrance title="ثبت ورودی" icon="fa-solid fa-cart-arrow-down" />
        <Company title="ثبت شرکت" icon="fa-solid fa-building" button={1} />
        <Store title="ثبت انبار" icon="fa-solid fa-store" button={1} />
        <MedicianEntrance title="ثبت دوا" icon="fa-solid fa-tablets" />
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
