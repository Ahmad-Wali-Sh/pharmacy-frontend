import React from "react";
import Modal from "react-modal";
import MedicianList from "../MedicianList/MedicianList";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import KindListmap from "./KindListmap";

function KindList({ Closer }) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
    Closer();
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

  const AutoCompleteStyle = {
    height: "1.7rem",
    borderRadius: "1rem",
    fontSize: "14px",
    backgroundColor: "rgb(34, 34, 34)",
    color: "white",
    border: "none",
    hoverBackgroundColor: "grey",
    overflow: "scroll",
    zIndex: "2",
  };

  const AutoCompleteStyle2 = {
    ...AutoCompleteStyle,
    zIndex: "1",
  };

  const KIND_URL = import.meta.env.VITE_KIND;

  const [kindAll, setKindAll] = React.useState([]);
  const [kindList, setKindList] = React.useState([]);
  console.log(kindList);

  React.useEffect(() => {
    axios
      .get(KIND_URL)
      .then((res) => setKindAll(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [autoCompleteData, setAutoCompleteData] = React.useState({
    english_name: "",
    persian_name: "",
  });

  console.log(autoCompleteData);

  const SearchHandle = () => {
    ResetForm();
    axios
      .get(
        KIND_URL +
          "?name_english=" +
          autoCompleteData.english_name +
          "&" +
          "name_persian=" +
          autoCompleteData.persian_name
      )
      .then((res) => {
        setKindList(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const ResetForm = () => {
    setAutoCompleteData({
      english_name: "",
      persian_name: "",
    });
    setKindList([]);
  };

  return (
    <>
      <div className="list-card" onClick={registerModalOpener}>
        <h3>انواع دوا</h3>
      </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>انواع دوا</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="list-items">
          <div></div>
          <MedicianList Closer={registerModalCloser} />
        </div>
        <div className="kind-list-filter-box">
          <div className="kind-list-filters">
            <label>نام انگلیسی</label>
            <ReactSearchAutocomplete
              fuseOptions={{ keys: ["name_english"] }}
              items={kindAll}
              styling={AutoCompleteStyle}
              showClear={false}
              inputDebounce="10"
              showIcon={false}
              resultStringKeyName="name_english"
              onSelect={(data) => {
                setAutoCompleteData({
                  ...autoCompleteData,
                  english_name: data.name_english,
                });
              }}
            />
            <label>نام فارسی</label>
            <ReactSearchAutocomplete
              fuseOptions={{ keys: ["name_persian"] }}
              items={kindAll}
              styling={AutoCompleteStyle}
              showClear={false}
              inputDebounce="10"
              showIcon={false}
              resultStringKeyName="name_persian"
              onSelect={(data) => {
                setAutoCompleteData({
                  ...autoCompleteData,
                  persian_name: data.name_persian,
                });
              }}
              onClear={() => {
                setAutoCompleteData({
                  english_name: "",
                  persian_name: "",
                });
              }}
            />
            <div></div>
            <input
              type="button"
              value="ریسیت"
              className="kind-list-search-btn"
              onClick={ResetForm}
            />
            <input
              type="button"
              value="جستوجو"
              className="kind-list-search-btn"
              onClick={SearchHandle}
            />
          </div>
          <div className="kind-list-map-box">
            <h3>No</h3>
            <h3>نام انگلیسی</h3>
            <h3>نام فارسی</h3>
            <h3>توضیحات</h3>
            <h3>عکس</h3>
            <h3></h3>
            <h3>حذف</h3>
          </div>
          <div className="kind-list-map-container">
            {kindList.map((kind, key) => (
              <>
                <KindListmap kind={kind} num={key} Update={SearchHandle} />
              </>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default KindList;
