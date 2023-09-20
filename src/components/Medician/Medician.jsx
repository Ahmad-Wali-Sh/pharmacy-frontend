import React from "react";
import Modal from "react-modal";
import MedicinesLists from "../PageComponents/Lists/MedicineList/MedicinesLists";


Modal.setAppElement("#root");

function Medician() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <MedicinesLists title='لست ها' activeKey='medicines' button='main' name='ثبت دوا' icon='fa-solid fa-solid fa-tablets'/>
        <MedicinesLists title='لست ها' activeKey='kinds' button='main' name='ثبت نوع' icon='fa-solid fa-prescription-bottle-medical'/>
        <MedicinesLists title='لست ها' activeKey='countries' button='main' name='ثبت کشور' icon='fa-solid fa-earth-asia'/>
        <MedicinesLists title='لست ها' activeKey='pharm-groups' button='main' name='ثبت گروه دوایی' icon='fa-solid fa-earth-asia'/>
      </div>
      <div className="purchase-form">
      </div>
    </div>
  );
}

export default Medician;