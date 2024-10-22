import axios from "axios";
import React, { useEffect, useState } from "react";
import useServerIP from "../../../services/ServerIP";

const PrescriptionPrint = React.forwardRef((props, ref) => {
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
  return (
    <div
      class="parent"
      ref={ref}
    >
      <div class="div1">{globalSettings?.ticket_fields?.title}</div>
      {globalSettings?.ticket_fields?.time && (
        <div class="div2">{props?.prescription?.timestamp?.slice(11, 16)}</div>
      )}
      {globalSettings?.ticket_fields?.prescription_number && (
        <div class="div3">{props?.prescription?.prescription_number}</div>
      )}
      {globalSettings?.ticket_fields?.department && (
        <div class="div4">{props?.prescription?.department_name}</div>
      )}
      {globalSettings?.ticket_fields?.barcode && (
        <div class="div5">
          <div className="barcode-generated">{props?.barcode}</div>
        </div>
      )}
      {globalSettings?.ticket_fields?.payment && (
        <div class="div6">
          {parseFloat(props.prescription.refund) >= 0 ? "پرداخت: " : "برگشتی: "}
          {props?.prescription?.refund} افغانی
        </div>
      )}
    </div>
  );
});

export default PrescriptionPrint;
