import React from "react";
import Modal from "react-modal";
import SelectMedician from "../../../Purchase/Entrance/SelectMedician";
import axios from "axios";
import 'jb-date-input'
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function Traz({ Closer }) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
    Closer();
  }

  const [autoCompleteData, setAutoCompleteData] = React.useState({
    company: "",
    store: "",
    medician: [],
  });

  function AutoCompleteHandle(data) {
    setAutoCompleteData({
      ...autoCompleteData,
      medician: data,
    });
  }

  const ModalStyles = {
    content: {
      backgroundColor: "rgb(30,30,30)",
      border: "none",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "0px",
      margin: "0px",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
    },
  };

  const COUNTRY_URL = import.meta.env.VITE_COUNTRY;
  const KIND_URL = import.meta.env.VITE_KIND;
  const PHARM_GROUB_URL = import.meta.env.VITE_PHARM_GROUB;
  const TRAZ_URL = import.meta.env.VITE_TRAZ

  const [country, setCountry] = React.useState([]);
  const [kind, setKind] = React.useState([]);
  const [pharmGroub, setPharmGroub] = React.useState([]);
  const [trazList, setTrazList] = React.useState([])

  React.useEffect(()=> {
    axios
    .get(COUNTRY_URL)
    .then((result) => setCountry(result.data))
    .catch((e) => console.log(e));
  axios
    .get(KIND_URL)
    .then((result) => setKind(result.data))
    .catch((e) => console.log(e));
  axios
    .get(PHARM_GROUB_URL)
    .then((result) => setPharmGroub(result.data))
    .catch((e) => console.log(e));
  },[])

  const SearchHandle = () => {
    axios
        .get(TRAZ_URL + "?medician=" + (autoCompleteData.medician.id || ""))
        .then((res) => {
            setTrazList(res.data.sort((a, b)=> {
                return new Date(a.timestamp) - new Date(b.timestamp)
            }))
        })
        .catch((err) => console.log(err))
  }


  console.log(trazList)

  return (
    <>
      <div className="list-card" onClick={registerModalOpener}>
        <h3>تراز ورود/خروج</h3>
      </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>تراز ورود/خروج</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="list-items"></div>
        <div className="traz-box">
          <div className="traz-filters">
              <div className="traz-medician-select">
            <SelectMedician
              kind={kind}
              country={country}
              pharmGroub={pharmGroub}
              selectAutoCompleteData={AutoCompleteHandle}
              trigger=""
            />
              </div>
              <div className="traz-date-filters">
              <label>از:</label>
              <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    className="datapicker-class"
                    style={{
                      backgroundColor: "rgb(34, 34, 34)",
                      color: "white",
                      width: "100%",
                      border: "none",
                      borderRadius: "1rem",
                    }}
                    format={"YYYY/MM/DD"}
                    />
              <label>تا:</label>
              <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    className="datapicker-class"
                    style={{
                      backgroundColor: "rgb(34, 34, 34)",
                      color: "white",
                      width: "100%",
                      border: "none",
                      borderRadius: "1rem",
                    }}
                    format={"YYYY/MM/DD"}
                    />
                <input type="button" value="جستوجو" onClick={SearchHandle}/>
              </div>

          </div>
          <div className="traz-header">
              <h3>No</h3>
              <h3>نوع</h3>
              <h3>ش.حواله</h3>
              <h3>تعداد</h3>
              <h3>قیمت</h3>
              <h3>انقضا</h3>
              <h3>شرکت</h3>
              <h3>کاربر</h3>
              <h3>تاریخ</h3>
              <h3>ساعت</h3>
              <h3>نوع</h3>
              <h3>ش.حواله</h3>
              <h3>تعداد</h3>
              <h3>قیمت</h3>
              <h3>منفی</h3>
              <h3>وضعیت</h3>
              <h3>ش.ثبت</h3>
          </div>
          <div className="traz-list">
              {trazList.map((traz, key)=> (
                <div className="traz-map">
                    <h4>{key + 1}</h4>
                    <h4>{traz.type == "EntranceThrough" ? "ورودی" : ""}</h4>
                    <h4>{traz.type == "EntranceThrough" ? traz.id : ""}</h4>
                    <h4>{traz.type == "EntranceThrough" ? traz.register_quantity : ""}</h4>
                    <h4>{traz.type == "EntranceThrough" ? traz.each_price : ""}</h4>
                    <h4>{traz.type == "EntranceThrough" ? traz.expire_date :""}</h4>
                    <h4>{traz.type == "EntranceThrough" ? traz.company : ""}</h4>
                    <h4>{traz.type == "EntranceThrough" ? traz.user : ""}</h4>
                    <h4>{traz.timestamp.substring(0,10)}</h4>
                    <h4>{traz.timestamp.substring(11, 16)}</h4>
                    <h4>{traz.type == "OutranceThrough" ? "خروجی" : traz.type == "PrescriptionThrough" ? "خروجی" : ""}</h4>
                    <h4>{traz.type == "OutranceThrough" ? traz.id : ""}</h4>
                    <h4>{traz.type == "OutranceThrough" ? traz.register_quantity : traz.type == "PrescriptionThrough" ? traz.quantity : "" }</h4>
                    <h4>{traz.type == "OutranceThrough" ? traz.each_price : traz.type == "PrescriptionThrough" ? traz.each_price : ""}</h4>
                    <h4></h4>
                    <h4></h4>
                    <h4></h4>
                </div>
              ))}
          </div>
          <div className="traz-totals"></div>
        </div>
      </Modal>
    </>
  );
}

export default Traz;