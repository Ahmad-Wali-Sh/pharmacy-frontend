import React from "react";
import Modal from "react-modal";
import axios from "axios";
import OutranceList from "../OutranceList/OutranceList";
import EntranceList from "../EntranceList/EntranceList";
import StoreList from "../StoreList/StoreList";
import Company from "../../../Purchase/Company/Company";
import PurchaseListQuery from "../PurcahseList/PurchaseListQuery";

function CompanyList({ Closer }) {
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

  const COMPANY_URL = import.meta.env.VITE_PHARM_COMPANIES;

  const [companyList, setComapnyList] = React.useState([]);

  const SearchHandle = (data) => {
    axios
      .get(COMPANY_URL)
      .then((res) => {
        setComapnyList(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="list-card" onClick={registerModalOpener}>
        <h3>فهرست شرکت ها</h3>
      </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>فهرست شرکت ها</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="list-items">
          <EntranceList Closer={registerModalCloser} />
          <OutranceList Closer={registerModalCloser} />
          <StoreList Closer={registerModalCloser} />
          <div></div>
          <PurchaseListQuery Closer={registerModalCloser}/>
        </div>
        <div className="company-list-filtering-box">
          <div className="company-list-filtering">
            <label>نام:</label>
            <input type="text" className="text-input-standard" />
            <div className="company-list-buttons">
              <input
                type="button"
                value={"جستجو"}
                className="filterlists-button-standard"
                onClick={SearchHandle}
              />
              <input
                type="button"
                value={"ریسیت"}
                className="filterlists-button-standard"
              />
              <input
                type="button"
                value={"اکسل"}
                className="filterlists-button-standard"
              />
            </div>
          </div>
          <div className="company-list-header">
            <h4>No</h4>
            <h4>نام</h4>
            <h4>رئیس</h4>
            <h4>شماره رئیس</h4>
            <h4>مدیر</h4>
            <h4>شماره مدیر</h4>
            <h4>آدرس</h4>
            <h4>آنلاین</h4>
            <h4>بیشتر</h4>
          </div>
          <div className="company-list">
            {companyList.map((company, num) => (
              <div className="company-list-map">
                <h4>{num + 1}</h4>
                <h4>{company.name}</h4>
                <h4>{company.ceo}</h4>
                <h4>{company.ceo_phone}</h4>
                <h4>{company.manager}</h4>
                <h4>{company.manager_phone}</h4>
                <h4>{company.address}</h4>
                <h4>{company.company_online}</h4>
                <Company button={3} />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CompanyList;
