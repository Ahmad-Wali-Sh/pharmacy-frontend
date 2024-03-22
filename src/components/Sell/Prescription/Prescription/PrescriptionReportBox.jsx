import React, { useEffect, useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import PrescriptionPrint from "./PrescriptionPrint";
import axios from "axios";
import useServerIP from "../../../services/ServerIP";
import { useAuthUser } from "react-auth-kit";
import { toast } from "react-toastify";

function PrescriptionReportBox({ report, prescription, BackFunc, FrontFunc }) {
  let PrescriptiontoPrintRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => PrescriptiontoPrintRef.current,
  });
  const {serverIP}= useServerIP()
  const user = useAuthUser()

  const OrderSubmit = () => {
    const Form = new FormData()
    Form.append('order_user', user().id)
    axios.patch(`${serverIP}api/prescription/${prescription.id}/`, Form).then(() => {
      toast.info('هدایت موفقانه ثبت شد')
    })
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, ctrlKey, shiftKey, altKey } = event;

      if (event.key === "F4") {
        event.preventDefault();
        setTimeout(() => {
          handlePrint();
          OrderSubmit()
        }, 200);
      }
    };

    // Add event listener for keyboard events
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [serverIP, user]);

  return (
    <div className="entrance-report">
      <div className="entrance-report-header">راپور</div>
      <div className="entrance-report-body">
        <div className="prescription-report-map-box">
          <label>{report.number}</label>
          <label>:تعداد اقلام</label>
        </div>
        <div className="prescription-report-map-box">
          <label>{report.total}</label>
          <label>:مجموع فروش</label>
        </div>
        <div className="prescription-report-map-box-grey">
          <label>{report?.disount_value ? report.disount_value : 0} </label>
          <label>:تخفیف</label>
        </div>
        <div className="prescription-report-map-box-grey">
          <label>{prescription?.khairat ? prescription.khairat : 0}</label>
          <label>:خیرات</label>
        </div>
        <div className="prescription-report-map-box-grey">
          <label>{prescription?.zakat ? prescription.zakat : 0}</label>
          <label>:زکات</label>
        </div>
        <div className="prescription-report-map-box-grey">
          <label>{prescription?.rounded_number}</label>
          <label>:مقدار روند شده </label>
        </div>
        <div className="prescription-report-map-box">
          <label>{prescription?.grand_total || 0}</label>
          <label>:قیمت نهایی</label>
        </div>
        {prescription?.refund == 0 ? (
          <div className="prescription-report-map-box">
            <label>
              {prescription?.grand_total == prescription?.purchased_value
                ? 0
                : prescription?.grand_total || 0}
            </label>
            <label>:قابل پرداخت</label>
          </div>
        ) : (
          <div className="prescription-report-map-box">
            <label>{prescription?.refund * -1}</label>
            <label>{parseFloat((prescription?.refund * -1)) >= 0 ? ':اخذ' : ':برگشتی'}</label>
          </div>
        )}
        {prescription?.purchased_value != 0 && (
          <div
            className="prescription-report-map-box"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            <label>{prescription?.purchased_value}</label>
            <label>:پرداخت شده</label>
          </div>
        )}
        <div className="entrance-report-footer" style={{ margin: "1rem" }}>
          <button
            className="entrance-report-button"
            onClick={() => FrontFunc()}
          >
            <i class="fa-solid fa-right-long"></i>
          </button>
          <button
            onClick={() => {
              handlePrint();
              OrderSubmit()
            }}
            className="entrance-report-button"
          >
            <i class="fa-solid fa-comments-dollar"></i>
          </button>
          <div style={{ display: "none" }}>
            <PrescriptionPrint
              ref={PrescriptiontoPrintRef}
              prescription={prescription}
              report={report}
            />
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
