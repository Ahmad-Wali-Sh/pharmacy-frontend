import React from "react";
import PrescriptionThroughEntry from "./PrescriptionThroughEntry";

function PrescriptionThroughMapForm({ prescriptionThrough }) {

    let medicineConflict = []
  return (
    <form className="prescription-medician-map">
      <div className="prescription-medician-header">
        <label></label>
        <label>No</label>
        <label>قلم</label>
        <label>طرز.استفاده</label>
        <label>هشدار</label>
        <label></label>
        <label>قیمت فی</label>
        <label>تعداد</label>
        <label>قیمت کل</label>
        <label>حذف</label>
      </div>
      <div className="prescription-medicine">
        {prescriptionThrough.map((through, key) => (
          <PrescriptionThroughEntry
            through={through}
            keyValue={through.id}
            num={key}
            prescriptionThroughs={prescriptionThrough}
            conflicts={medicineConflict}
          />
        ))}
      </div>
    </form>
  );
}

export default PrescriptionThroughMapForm;
