import React, { useEffect, useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import PrescriptionPrint from "./PrescriptionPrint";

function PrescriptionReportBox({
  report,
  prescription,
  BackFunc,
  FrontFunc,
}) {

  let PrescriptiontoPrintRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => PrescriptiontoPrintRef.current,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, ctrlKey, shiftKey, altKey } = event;


        if (event.key === 'F4') {
          event.preventDefault()
            setTimeout(() => {
              handlePrint() 
            }, 200)
        }
    };

    // Add event listener for keyboard events
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 


  return (
    <div className="entrance-report">
      <div className="entrance-report-header">راپور</div>
      <div className="entrance-report-body">
        <div className="entrance-report-map-box">
          <label>{report.number}</label>
          <label>:تعداد اقلام</label>
        </div>
        <div className="entrance-report-map-box">
          <label>
            {report?.total ? report.total : 0}
          </label>
          <label>:مجموع فروش</label>
        </div>
        <div className="entrance-report-map-box">
          <label>
            {report?.disount_value ? report.disount_value : 0}{" "}
          </label>
          <label>:تخفیف</label>
        </div>
        <div className="entrance-report-map-box">
          <label>
            {prescription?.khairat ? prescription.khairat : 0}
          </label>
          <label>:خیرات</label>
        </div>
        <div className="entrance-report-map-box">
          <label>
            {prescription?.zakat ? prescription.zakat : 0}
          </label>
          <label>:زکات</label>
        </div>
        <div className="entrance-report-map-box">
          <label>
            {report.total_to_sale ? report.total_to_sale : 0}
          </label>
          <label>:قابل پرداخت</label>
        </div>
        <div className="entrance-report-map-box" style={{ marginBottom: '1rem'}}>
          <label>
            {prescription?.rounded_number}
          </label>
          <label>:مقدار روند شده </label>
        </div>
      <div className="entrance-report-footer"style={{margin: '1rems'}}>
        <button className="entrance-report-button" onClick={() => FrontFunc()}>
          <i class="fa-solid fa-right-long"></i>
        </button>
        <button onClick={() => {
          handlePrint()
        }} className="entrance-report-button"><i class="fa-solid fa-comments-dollar"></i></button>
        <div style={{display: 'none'}}>
        <PrescriptionPrint ref={PrescriptiontoPrintRef} prescription={prescription} report={report}/>
        </div>
        <button className="entrance-report-button" onClick={() => BackFunc()}>
          <i class="fa-solid fa-left-long"></i>
        </button>
      </div>
      </div>
    </div>
  );
}

export default PrescriptionReportBox;
