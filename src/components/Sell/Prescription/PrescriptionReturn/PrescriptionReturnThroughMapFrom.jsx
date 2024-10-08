import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import PrescriptionReturnThroughEntry from "./PrescriptionReturnThroughEntry";

function PrescriptionReturnThroughMapFrom({ prescription, updatePrescription, updatePrescriptionThrough }) {
  const { data: prescriptionThrough, isLoading } = useQuery({
    queryKey: [`prescription-return-through/?prescription=${prescription?.id}`],
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
    const container = document.getElementsByClassName('prescription-medicine'); // Replace 'specific-box' with the ID of your container
    if (selectedElement && container) {
      selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', container });
    }
  }, [selectedIdx]); 

  useEffect(() => {
    setSelectedIdx('')
  }, [prescription && prescription])

  return (
    <form className="prescription-medician-map">
      <div className="prescription-medician-header">
        <label style={{width: '1%'}}></label>
        <label style={{width: '2%'}}>No</label>
        <label style={{width: '67%', textAlign:'left'}}>قلم</label>
        <label style={{width: '4%'}}>تعداد</label>
        <label style={{width: '3%'}}>ت.پ</label>
        <label style={{width: '3%'}}>ت.ق</label>
        <label style={{width: '5%'}}>موجودی</label>
        <label style={{width: '4%'}}>فی</label>
        <label style={{width: '4%'}}>کل</label>
        <label style={{width: '6%'}}>بیشتر</label>
      </div>
      <div className="prescription-medicine">
        {prescriptionThrough?.map((presThrough, key) => (
          <PrescriptionReturnThroughEntry
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

export default PrescriptionReturnThroughMapFrom;
