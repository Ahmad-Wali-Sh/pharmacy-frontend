import React from "react";
import Modal from "react-modal";
import Department from "./Prescription/Department";
import Doctor from "./Prescription/Doctor";
import Patient from "./Prescription/Patient";
import Prescription from "./Prescription/Prescription/Prescription";
import { useQuery } from "react-query";

Modal.setAppElement("#root");

function Sell() {
  const {
    data: departments,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["department/?ordering=id"] });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Server Can't Respone Correctly</div>;
  }

  return (
    <div className="purchase">
      <div className="purchase-box">
        <Prescription button="main" title="ثبت نسخه" icon="fa-solid fa-cart-arrow-down" />
        <Doctor
          title="ثبت داکتر"
          button="main"
          icon="fa-solid fa-user-doctor"
        />
        <Patient title="ثبت مریض" button="main" icon="fa-solid fa-bed" />
        <Department button="main" title="ثبت نوع نسخه" icon="fa-solid fa-bed" />
      </div>
      <div className="sell-form">
        <div className="sell-department-buttons">
          {departments?.map((depart) => (
            <Prescription button={2} department={depart} trigger={0} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sell;
