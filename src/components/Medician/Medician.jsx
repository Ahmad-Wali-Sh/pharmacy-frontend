import React from "react";
import Modal from "react-modal";
import MedicinesLists from "../PageComponents/Lists/MedicineList/MedicinesLists";
import Country from "./Country";
import Kind from "./Kind";
import MedicianEntrance from "./MedicianEntrance/MedicianEntrance";
import PharmGroup from "./PharmGroup";

Modal.setAppElement("#root");

function Medician() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <MedicianEntrance title="ثبت دوا" icon="fa-solid fa-tablets" button={1} medician={[]}  />
        <MedicinesLists title='لست ها' activeKey='medicines' button='main' name='ثبت دوا' icon='fa-solid fa-solid fa-tablets'/>
        <Kind button={1} title="ثبت نوع" icon="fa-solid fa-prescription-bottle-medical" />
        <Country button={1} title="ثبت کشور" icon="fa-solid fa-earth-asia" />
      </div>
      <div className="purchase-form">
      </div>
    </div>
  );
}

export default Medician;