import React from "react";
import Modal from "react-modal";
import MedicianEntrance from "../Medician/MedicianEntrance/MedicianEntrance";
import PurchasingLists from "../PageComponents/Lists/PurchaseLists/PurchasingLists";
import Company from "./Company/Company";
import Entrance from "./Entrance/Entrance";
import Outrance from "./Outrance/Outrance";
import Store from "./Store/Store";

Modal.setAppElement("#root");

function Purchase() {
  const [entTrigger, setEntTrigger] = React.useState(0);

  const handleKeys = (event) => {
    event.keyCode === 113 && setEntTrigger((prev) => prev + 1);
  };

  return (
    <div className="purchase" tabIndex={0} onKeyDown={handleKeys}>
      <div className="purchase-box">
        <Entrance
          title="ثبت ورودی"
          icon="fa-solid fa-cart-arrow-down"
          trigger={entTrigger}
        />
        <Entrance
          title="انبارگردانی"
          StoreCycle={true}
          icon="fa-solid fa-cart-arrow-down"
          trigger={entTrigger}
        />
        <PurchasingLists button='main' icon='fa-solid fa-cart-arrow-down' name='ثبت شرکت' activeKey='companies'/>
        <PurchasingLists button='main' icon='fa-solid fa-store' name='ثبت انبار' activeKey='stores'/>
        <PurchasingLists button='main' icon='fa-solid fa-money-bill-transfer' name='واحدات پولی' activeKey='currencies'/>
      </div>
      <div className="purchase-form"></div>
    </div>
  );
}

export default Purchase;
