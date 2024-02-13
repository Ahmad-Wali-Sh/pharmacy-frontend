import React from "react";
import Modal from "react-modal";
import KindList from "../KindList/KindList";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import MedicianListMap from "./MedicianListMap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FixedSizeList as List } from "react-window";
import fileDownload from "js-file-download";
import PharmGroupList from "../PharmGroupList/PharmGroupList";
import CountryList from "../CountryList/CountryList";

function MedicianList({ Closer }) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
    Closer();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const [autoCompleteData, setAutoCompleteData] = React.useState({
    country: "",
    pharm_group: "",
    kind: "",
  });

  const COUNTRY_URL = import.meta.env.VITE_COUNTRY;
  const PHARM_GROUB_URL = import.meta.env.VITE_PHARM_GROUB;
  const KIND_URL = import.meta.env.VITE_KIND;
  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;
  const MEDICIAN_URL_EXCEL = import.meta.env.VITE_MEDICIAN_EXCEL;

  const [kind, setKind] = React.useState([]);
  const [pharmGroup, setPharmGroup] = React.useState([]);
  const [country, setCountry] = React.useState([]);
  const [medicianList, setMedicianList] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(KIND_URL)
      .then((res) => setKind(res.data))
      .catch((err) => console.log(err));

    axios
      .get(PHARM_GROUB_URL)
      .then((res) => setPharmGroup(res.data))
      .catch((err) => console.log(err));

    axios
      .get(COUNTRY_URL)
      .then((res) => setCountry(res.data))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    kind.map(
      (kind) => kind.id == medician.kind && setKindName(kind.name_english)
    );
  }, []);

  const SearchHandle = (data) => {
    setMedicianList([]);

    axios
      .get(
        MEDICIAN_URL +
          "?brand_name=" +
          data.brand_name +
          "&generic_name=" +
          data.generic_name +
          "&no_pocket=" +
          data.no_pocket +
          "&ml=" +
          data.ml +
          "&location=" +
          data.location +
          "&barcode=" +
          data.barcode +
          "&company=" +
          data.company +
          "&price=" +
          data.price +
          "&existence=" +
          data.existence +
          "&pharm_group=" +
          autoCompleteData.pharm_group +
          "&kind=" +
          autoCompleteData.kind +
          "&country=" +
          autoCompleteData.country +
          "&ordering=id"
      )
      .then((res) => setMedicianList(res.data.results));
  };

  const ResetForm = () => {
    setMedicianList([]);
    setAutoCompleteData({
      country: "",
      pharm_group: "",
      kind: "",
    });
  };
  const MedicianListRow = ({ data, index, style }) => (
    <div style={style}>
      <MedicianListMap
        num={index}
        country={country}
        kind={kind}
        pharmGroup={pharmGroup}
        medician={medicianList}
        AutoReSearch={handleSubmit(SearchHandle)}
      />
    </div>
  );

  const ExcelExport = (data) => {
    axios({
      url:
        MEDICIAN_URL_EXCEL +
        "?format=xml&" +
        "brand_name=" +
        data.brand_name +
        "&generic_name=" +
        data.generic_name +
        "&no_pocket=" +
        data.no_pocket +
        "&ml=" +
        data.ml +
        "&location=" +
        data.location +
        "&barcode=" +
        data.barcode +
        "&company=" +
        data.company +
        "&price=" +
        data.price +
        "&existence=" +
        data.existence +
        "&pharm_group=" +
        autoCompleteData.pharm_group +
        "&kind=" +
        autoCompleteData.kind +
        "&country=" +
        autoCompleteData.country +
        "&ordering=id",
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      console.log(response);
      fileDownload(response.data, "medicine_report.xml");
    });
  };

  return (
    <>
      <div className="list-card" onClick={registerModalOpener}>
        <h3>لست دوا ها</h3>
      </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>لست دوا ها</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="list-items">
          <KindList Closer={registerModalCloser} />
          <div></div>
          <PharmGroupList Closer={registerModalCloser} />
          <CountryList Closer={registerModalCloser} />
        </div>
        <div className="medician-list-box">
          <div className="medician-list-filter-box">
            <label>نام برند:</label>
            <input type="text" {...register("brand_name")} />
            <label>ترکیب:</label>
            <input type="text" {...register("generic_name")} />
            <label>محلول:</label>
            <input type="text" {...register("ml")} />
            <label>شرکت:</label>
            <input type="text" {...register("company")} />
            <label>نوع:</label>
            <ReactSearchAutocomplete
              fuseOptions={{ keys: ["name_english"] }}
              items={kind}
              styling={AutoCompleteStyle}
              showClear={false}
              inputDebounce="10"
              showIcon={false}
              resultStringKeyName="name_english"
              onSelect={(data) => {
                setAutoCompleteData({
                  ...autoCompleteData,
                  kind: data.id,
                });
              }}
            />
            <label>گروپ دوا:</label>
            <ReactSearchAutocomplete
              fuseOptions={{ keys: ["name_english"] }}
              items={pharmGroup}
              styling={AutoCompleteStyle}
              showClear={false}
              inputDebounce="10"
              showIcon={false}
              resultStringKeyName="name_english"
              onSelect={(data) => {
                setAutoCompleteData({
                  ...autoCompleteData,
                  pharm_group: data.id,
                });
              }}
            />
            <label>کشور:</label>
            <ReactSearchAutocomplete
              fuseOptions={{ keys: ["name"] }}
              items={country}
              styling={AutoCompleteStyle}
              showClear={false}
              inputDebounce="10"
              showIcon={false}
              resultStringKeyName="name"
              onSelect={(data) => {
                setAutoCompleteData({
                  ...autoCompleteData,
                  country: data.id,
                });
              }}
            />
            <label>قیمت:</label>
            <input type="text" {...register("price")} />
            <label>مکان:</label>
            <input type="text" {...register("location")} />
            <label>ت.د.پاکت:</label>
            <input type="text" {...register("no_pocket")} />
            <label>بارکد:</label>
            <input type="text" {...register("barcode")} />
            <label>موجودیت:</label>
            <input type="text" {...register("existence")} />
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <input
              type="button"
              value="اکسل"
              className="kind-list-search-btn"
              onClick={handleSubmit(ExcelExport)}
            />
            <div className="medician-filter-buttons">
              <input
                type="button"
                value="جستجو"
                className="kind-list-search-btn"
                onClick={handleSubmit(SearchHandle)}
              />
              <input
                type="button"
                value="ریسیت"
                className="kind-list-search-btn"
                onClick={ResetForm}
              />
            </div>
          </div>
          <div className="medician-list-header">
            <h3>No</h3>
            <h3>نام برند</h3>
            <h3>محلول</h3>
            <h3>مکان</h3>
            <h3>موجودیت</h3>
            <h3>ت.در.پاکت</h3>
            <h3>عکس</h3>
            <h3></h3>
            <h3>بیشتر</h3>
          </div>
          <div className="medician-list-map-box">
            <List height={260} itemCount={medicianList.length} itemSize={100}>
              {MedicianListRow}
            </List>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MedicianList;
