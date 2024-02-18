import React, { useEffect, useState } from "react";
import PrescriptionThroughEntry from "./PrescriptionThroughEntry";
import { useQuery } from "react-query";

function PrescriptionThroughMapForm({ prescription, updatePrescription, updatePrescriptionThrough }) {
  const { data: prescriptionThrough, isLoading } = useQuery({
    queryKey: [`prescription-through/?prescription=${prescription?.id}`],
    enabled: prescription?.id != null,
  });


  const [selectedIdx, setSelectedIdx] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp' && selectedIdx > 0) {
        setSelectedIdx((prevIdx) => prevIdx - 1);
        event.preventDefault();
      } else if (event.key === 'ArrowDown' && selectedIdx < prescriptionThrough?.length - 1) {
        setSelectedIdx((prevIdx) => prevIdx + 1);
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [prescriptionThrough, selectedIdx]);

  useEffect(() => {
    const selectedElement = document.getElementById(`item-${selectedIdx}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedIdx]);

  useEffect(() => {
    setSelectedIdx('')
  }, [prescription && prescription])

  return (
    <form className="prescription-medician-map">
      <div className="prescription-medician-header">
        <label></label>
        <label>No</label>
        <label>قلم</label>
        <label>طرز.استفاده</label>
        <label>هشدار</label>
        <label>ت.د.پاکت</label>
        <label>ت.د.قطی</label>
        <label>قیمت فی</label>
        <label>تعداد</label>
        <label>قیمت کل</label>
        <label>بیشتر</label>
      </div>
      <div className="prescription-medicine">
        {prescriptionThrough?.map((presThrough, key) => (
          <PrescriptionThroughEntry
            id={`item-${key}`}
            onClick={() => setSelectedIdx(key)}
            highlighted={selectedIdx === key ? true : false}
            updatePrescription={updatePrescription}
            prescription={prescription}
            through={presThrough}
            num={key}
            prescriptionThroughs={prescriptionThrough}
            updatePrescriptionThrough={updatePrescriptionThrough}
          />
        ))}
      </div>
    </form>
  );
}

export default PrescriptionThroughMapForm;
