import React from "react";
import Modal from "react-modal";
import Entrance from "./Entrance";

Modal.setAppElement("#root");

function Purchase() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <Entrance
          title="ثبت ورودی"
          number="12"
          icon="fa-solid fa-cart-arrow-down"
        />
        <Entrance
          title="ثبت ورودی"
          number="12"
          icon="fa-solid fa-cart-arrow-down"
        />
        <Entrance
          title="ثبت ورودی"
          number="12"
          icon="fa-solid fa-cart-arrow-down"
        />
        <Entrance
          title="ثبت ورودی"
          number="12"
          icon="fa-solid fa-cart-arrow-down"
        />
      </div>
      <div className="purchase-form">
          Hi
      </div>
    </div>
  );
}

export default Purchase;
