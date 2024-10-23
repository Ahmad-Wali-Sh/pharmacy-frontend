import React, { useEffect, useState } from "react";
import { DepartButton } from "../PageComponents/Buttons/Buttons";
import { toast } from "react-toastify";
import axios from "axios";
import useServerIP from "../services/ServerIP";

function PrintingSettings() {
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
    <>
      <div className="listing-hight-print">
        <h4 style={{ padding: "0.5rem" }}>برگه مربوطه صندوق:</h4>
        <div className="ent-settings-container">
          <label>عرض_کاغذ:</label>
          <input
            type="text"
            disabled
            className="text-input-standard"
            value={globalSettings?.ticket_paper_width}
            onChange={(e) => {
              setGlobalSettings({
                ...globalSettings,
                ticket_paper_width: e.target.value,
              });
            }}
          />
          <label>پرنتر:</label>
          <input
            type="text"
            disabled
            className="text-input-standard"
            value={globalSettings?.ticket_printer}
            onChange={(e) => {
              setGlobalSettings({
                ...globalSettings,
                ticket_printer: e.target.value,
              });
            }}
          />
          <label>عنوان: </label>
          <input
            type="text"
            disabled
            className="text-input-standard"
            value={globalSettings?.ticket_fields?.title}
            onChange={(e) => {
              setGlobalSettings({
                ...globalSettings,
                ticket_fields: {
                  ...globalSettings?.ticket_fields,
                  title: e.target.value,
                },
              });
            }}
          />
          <label></label>
          <label></label>
          <div className="printer-settings-fields-container">
            <label>زمان: </label>
            <input
              disabled
              type="checkbox"
              checked={globalSettings?.ticket_fields?.time}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  ticket_fields: {
                    ...globalSettings?.ticket_fields,
                    time: e.target.checked,
                  },
                });
              }}
            />
            <label>شماره_نسخه: </label>
            <input
              type="checkbox"
              disabled
              checked={globalSettings?.ticket_fields?.prescription_number}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  ticket_fields: {
                    ...globalSettings?.ticket_fields,
                    prescription_number: e.target.checked,
                  },
                });
              }}
            />
            <label>نوع: </label>
            <input
              type="checkbox"
              disabled
              checked={globalSettings?.ticket_fields?.department}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  ticket_fields: {
                    ...globalSettings?.ticket_fields,
                    department: e.target.checked,
                  },
                });
              }}
            />
            <label>بارکد: </label>
            <input
              type="checkbox"
              disabled
              checked={globalSettings?.ticket_fields?.barcode}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  ticket_fields: {
                    ...globalSettings?.ticket_fields,
                    barcode: e.target.checked,
                  },
                });
              }}
            />
            <label>قیمت: </label>
            <input
              type="checkbox"
              disabled
              checked={globalSettings?.ticket_fields?.payment}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  ticket_fields: {
                    ...globalSettings?.ticket_fields,
                    payment: e.target.checked,
                  },
                });
              }}
            />
          </div>
        </div>
        <h4 style={{ padding: "0.5rem" }}>برگه اطلاعات اقلام :</h4>
        <div className="ent-settings-container">
          <label>عرض_کاغذ:</label>
          <input
            type="text"
            className="text-input-standard"
            value={globalSettings?.detailed_paper_width}
            onChange={(e) => {
              setGlobalSettings({
                ...globalSettings,
                detailed_paper_width: e.target.value,
              });
            }}
          />
          <label>پرنتر:</label>
          <input
            type="text"
            className="text-input-standard"
            value={globalSettings?.detailed_printer}
            onChange={(e) => {
              setGlobalSettings({
                ...globalSettings,
                detailed_printer: e.target.value,
              });
            }}
          />
          <label>عنوان: </label>
          <input
            type="text"
            className="text-input-standard"
            value={globalSettings?.detailed_fields?.title}
            onChange={(e) => {
              setGlobalSettings({
                ...globalSettings,
                detailed_fields: {
                  ...globalSettings?.detailed_fields,
                  title: e.target.value,
                },
              });
            }}
          />
          <label>اندازه_فونت: </label>
          <input
            type="text"
            className="text-input-standard"
            value={globalSettings?.detailed_text_font}
            onChange={(e) => {
              setGlobalSettings({
                ...globalSettings,
                detailed_text_font: e.target.value,
              });
            }}
          />
          <div className="printer-settings-fields-container">
            <label>زمان: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.time}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    time: e.target.checked,
                  },
                });
              }}
            />
            <label>تاریخ: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.date}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    date: e.target.checked,
                  },
                });
              }}
            />
            <label>مریض: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.patient_name}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    patient_name: e.target.checked,
                  },
                });
              }}
            />
            <label>تخفیف: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.discount_value}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    discount_value: e.target.checked,
                  },
                });
              }}
            />
            <label>اضافه_قیمت: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.over_value}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    over_value: e.target.checked,
                  },
                });
              }}
            />
            <label>ردیف: </label>
            <input
              type="checkbox"
              disabled
              checked={globalSettings?.detailed_fields?.index}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    index: e.target.checked,
                  },
                });
              }}
            />
            <label>نام_دارو: </label>
            <input
              type="checkbox"
              disabled
              checked={globalSettings?.detailed_fields?.medicine_full}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    medicine_full: e.target.checked,
                  },
                });
              }}
            />
            <label>تعداد: </label>
            <input
              disabled
              type="checkbox"
              checked={globalSettings?.detailed_fields?.quantity}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    quantity: e.target.checked,
                  },
                });
              }}
            />
            <label>قیمت_فی: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.each_price}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    each_price: e.target.checked,
                  },
                });
              }}
            />
            <label>قیمت_کل: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.total_price}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    total_price: e.target.checked,
                  },
                });
              }}
            />
            <label>تعداد_اقلام: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.medicine_length}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    medicine_length: e.target.checked,
                  },
                });
              }}
            />
            <label>مجموع_قیمت: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.grand_total}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    grand_total: e.target.checked,
                  },
                });
              }}
            />
            <label>هدایت: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.order_by}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    order_by: e.target.checked,
                  },
                });
              }}
            />
            <label>شماره_نسخه: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.prescription_number}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    prescription_number: e.target.checked,
                  },
                });
              }}
            />
            <label>بارکد: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.barcode}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    barcode: e.target.checked,
                  },
                });
              }}
            />
            <label>قیمت_پرداخت: </label>
            <input
              type="checkbox"
              checked={globalSettings?.detailed_fields?.payment_value}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  detailed_fields: {
                    ...globalSettings?.detailed_fields,
                    payment_value: e.target.checked,
                  },
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="list-footer">
        <div>
          <DepartButton
            name="تایید"
            Func={() => {
              axios
                .patch(`${serverIP}api/global-settings/`, globalSettings)
                .then((res) => {
                  setGlobalSettings(res.data);
                  toast.success("تنظیمات موفقانه ذخیره شد");
                });
            }}
          />
        </div>
      </div>
    </>
  );
}

export default PrintingSettings;
