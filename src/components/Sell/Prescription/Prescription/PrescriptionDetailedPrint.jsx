import React, { useEffect, useState } from "react";
import moment from "jalali-moment";
import { useAuthUser } from "react-auth-kit";
import useServerIP from "../../../services/ServerIP";
import axios from "axios";

const PrescriptionDetailedPrint = React.forwardRef(
  ({ prescriptionThrough, prescription, barcode }, ref) => {
    const [globalSettings, setGlobalSettings] = useState({});
    const { serverIP } = useServerIP();
    const getGlobalSettings = () => {
      axios.get(`${serverIP}api/global-settings/`).then((res) => {
        setGlobalSettings(res.data);
      });
    };
    useEffect(() => {
      serverIP && getGlobalSettings();
    }, [serverIP]);
    const user = useAuthUser();
    return (
      <div className="detailed-print-container" ref={ref}>
        <div className="title">{globalSettings?.detailed_fields?.title}</div>
        <div className="details">
          {globalSettings?.detailed_fields?.time && <h3>زمان</h3>}
          {globalSettings?.detailed_fields?.time && (
            <h3>{moment().format("hh:mm A")}</h3>
          )}
          {globalSettings?.detailed_fields?.date && <h3>تاریخ</h3>}
          {globalSettings?.detailed_fields?.date && (
            <h3>{moment().format("jYYYY-jMM-jDD")}</h3>
          )}
          {globalSettings?.detailed_fields?.patient_name && <h3>مریض</h3>}
          {globalSettings?.detailed_fields?.patient_name && (
            <h3>{prescription?.patient_name}</h3>
          )}
          {globalSettings?.detailed_fields?.prescription_number && (
            <h3>شماره نسخه</h3>
          )}
          {globalSettings?.detailed_fields?.prescription_number && (
            <h3>{prescription?.prescription_number}</h3>
          )}
          {globalSettings?.detailed_fields?.discount_value && <h3>تخفیف</h3>}
          {globalSettings?.detailed_fields?.discount_value && (
            <h3>{prescription?.discount_value}</h3>
          )}
          {globalSettings?.detailed_fields?.over_value && <h3>اضافه قیمت</h3>}
          {globalSettings?.detailed_fields?.over_value && (
            <h3>{prescription?.over_value}</h3>
          )}
        </div>
        <div className="title">{globalSettings?.detailed_fields?.medicine_title}</div>
        <div className="medicine-details">
          <div className="medicine-details-item">
            {globalSettings?.detailed_fields?.index && <h3>ردیف</h3>}
            {globalSettings?.detailed_fields?.medicine_full && <h3>دارو</h3>}
            {globalSettings?.detailed_fields?.quantity && <h3>تعداد</h3>}
            {globalSettings?.detailed_fields?.each_price && <h3>قیمت فی</h3>}
            {globalSettings?.detailed_fields?.total_price && <h3>قیمت کل</h3>}
          </div>
          {prescriptionThrough?.map((item, num) => (
            <div className="medicine-details-item">
              {globalSettings?.detailed_fields?.index && <h3>{num + 1}</h3>}
              {globalSettings?.detailed_fields?.medicine_full && (
                <h3>{item.medicine_full}</h3>
              )}
              {globalSettings?.detailed_fields?.quantity && (
                <h3>{item.quantity}</h3>
              )}
              {globalSettings?.detailed_fields?.each_price && (
                <h3>{item.each_price}</h3>
              )}
              {globalSettings?.detailed_fields?.total_price && (
                <h3>{item.total_price}</h3>
              )}
            </div>
          ))}
        </div>
        <div className="footer">
          {globalSettings?.detailed_fields?.medicine_length && (
            <h3>تعداد اقلام</h3>
          )}
          {globalSettings?.detailed_fields?.medicine_length && (
            <h3>{prescriptionThrough?.length}</h3>
          )}
          {globalSettings?.detailed_fields?.grand_total && <h3>مجموع قیمت</h3>}
          {globalSettings?.detailed_fields?.grand_total && (
            <h3>{prescription?.grand_total}</h3>
          )}
          {globalSettings?.detailed_fields?.payment_value && (
            <h3>قابل پرداخت</h3>
          )}
          {globalSettings?.detailed_fields?.payment_value && (
            <h3>
              {parseFloat(prescription?.grand_total) -
                parseFloat(prescription?.discount_value) +
                parseFloat(prescription?.over_value)}
            </h3>
          )}
        </div>
        <div className="flex">
          {globalSettings?.detailed_fields?.over_by && (
            <h3 style={{ border: "none" }}>هدایت</h3>
          )}
          {globalSettings?.detailed_fields?.over_by && (
            <h3 style={{ border: "none" }}>
              {user().first_name + " " + user()?.last_name}
            </h3>
          )}
        </div>
        {globalSettings?.detailed_fields?.barcode && (
          <div>
            <h3 style={{ border: "none" }}>بارکد</h3>
            <div>{barcode}</div>
          </div>
        )}
      </div>
    );
  }
);

export default PrescriptionDetailedPrint;
