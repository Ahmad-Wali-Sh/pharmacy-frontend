import React from "react";
import Modal from "react-modal";
import Country from "./Country";
import Kind from "./Kind";
import MedicianEntrance from "./MedicianEntrance/MedicianEntrance";
import PharmGroup from "./PharmGroup";

Modal.setAppElement("#root");

function Medician() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <MedicianEntrance title="ثبت دوا" icon="fa-solid fa-tablets" button={1}/>
        <PharmGroup button={1} title="ثبت گروپ دوایی" icon="fa-solid fa-cannabis" />
        <Kind button={1} title="ثبت نوع" icon="fa-solid fa-prescription-bottle-medical" />
        <Country button={1} title="ثبت کشور" icon="fa-solid fa-earth-asia" />
      </div>
      <div className="purchase-form">
      </div>
    </div>
  );
}

export default Medician;