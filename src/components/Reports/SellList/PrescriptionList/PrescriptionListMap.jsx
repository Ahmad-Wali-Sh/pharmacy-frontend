import React from "react";
import Prescription from "../../../Sell/Prescription/Prescription/Prescription";

function PrescriptionListMap({ data, num, department }) {
  return (
    <>
      <div className="prescription-list-map">
        <h4>{num + 1}</h4>
        <h4>{data.prescription_number}</h4>
        <h4>
          {department.map(
            (depart) => depart.id == data.department && depart.name
          )}
        </h4>
        <h4>{data.grand_total}</h4>
        <h4>{data.name}</h4>
        <h4>{data.doctor}</h4>
        <h4>{data.medician.join(", ")}</h4>
        <h4>{<Prescription button={1} prescription={data} />}</h4>
      </div>
    </>
  );
}

export default PrescriptionListMap;
