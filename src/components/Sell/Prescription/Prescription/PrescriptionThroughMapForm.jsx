import React from "react";
import PrescriptionThroughEntry from "./PrescriptionThroughEntry";
import { useQuery } from "react-query";

function PrescriptionThroughMapForm({ prescription, updatePrescription }) {
  const { data: prescriptionThrough, isLoading } = useQuery({
    queryKey: [`prescription-through/?prescription=${prescription.id}`],
    enabled: prescription.id != null,
  });

  if (isLoading) return "Is Loading...";

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
        {prescriptionThrough?.map((presThrough, key) => (
          <PrescriptionThroughEntry
            updatePrescription={updatePrescription}
            prescription={prescription}
            through={presThrough}
            num={key}
            prescriptionThroughs={prescriptionThrough}
          />
        ))}
      </div>
    </form>
  );
}

export default PrescriptionThroughMapForm;
