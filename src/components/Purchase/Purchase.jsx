import React from "react";
import Modal from "react-modal";
import MedicianEntrance from "../Medician/MedicianEntrance/MedicianEntrance";
import Company from "./Company/Company";
import Entrance from "./Entrance/Entrance";
import Outrance from "./Outrance/Outrance";
import Store from "./Store/Store";

Modal.setAppElement("#root");

function Purchase() {
  const [entTrigger, setEntTrigger] = React.useState(0);

  const handleKeys = (event) => {
    console.log(event.key);
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
        <Outrance
          title="ثبت خروجی"
          icon="fa-solid fa-arrow-right-from-bracket"
          button={1}
        />
        <Company title="ثبت شرکت" icon="fa-solid fa-building" button={1} />
        <Store title="ثبت انبار" icon="fa-solid fa-store" button={1} />
      </div>
      <div className="purchase-form"></div>
    </div>
  );
}

export default Purchase;
