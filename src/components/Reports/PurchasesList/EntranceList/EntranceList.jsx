import React from "react";
import Modal from "react-modal";
import axios from "axios";
import OutranceList from "../OutranceList/OutranceList";
import StoreList from "../StoreList/StoreList";
import CompanyList from "../CompanyList/CompanyList";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useForm } from "react-hook-form";
import Entrance from "../../../Purchase/Entrance/Entrance";

function EntranceList({ Closer }) {
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

  const AutoCompleteStyle = {
    height: "1.5rem",
    borderRadius: "1rem",
    fontSize: "14px",
    backgroundColor: "rgb(34, 34, 34)",
    color: "white",
    border: "none",
    hoverBackgroundColor: "grey",
    zIndex: "2",
    overflow: "scroll",
  };

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const STORE_URL = import.meta.env.VITE_STORE;
  const COMPANY_URL = import.meta.env.VITE_PHARM_COMPANIES;
  const PAYMENT_URL = import.meta.env.VITE_PAYMENT_METHOD;
  const FINAL_REGISTER = import.meta.env.VITE_FINAL_REGISTER;
  const ENTRANCE_URL = import.meta.env.VITE_ENTRANCE;

  const [store, setStore] = React.useState([]);
  const [compnay, setCompany] = React.useState([]);
  const [paymentMethod, setPaymentMethod] = React.useState([]);
  const [finalRegister, setFinalRegister] = React.useState([]);
  const [companySelect, setCompanySelect] = React.useState([]);
  const [entranceList, setEntranceList] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(STORE_URL)
      .then((res) => setStore(res.data))
      .catch((err) => console.log(err));

    axios
      .get(COMPANY_URL)
      .then((res) => setCompany(res.data))
      .catch((err) => console.log(err));

    axios
      .get(PAYMENT_URL)
      .then((res) => setPaymentMethod(res.data))
      .catch((err) => console.log(err));
    axios
      .get(FINAL_REGISTER)
      .then((res) => setFinalRegister(res.data))
      .catch((err) => console.log(err));
  }, []);

  const SearchHandle = (data) => {
    axios
      .get(
        ENTRANCE_URL +
          `?factor_number=${data.factor_number}&factor_date=${data.factor_date}&total_interest=${data.total_interest}&company=${companySelect}&payment_method=${data.payment_method}&final_register=${data.final_register}&store=${data.store}`
      )
      .then((res) => setEntranceList(res.data))
      .catch((err) => console.log(err));
  };

  console.log(entranceList);

  return (
    <>
      <div className="list-card" onClick={registerModalOpener}>
        <h3>فهرست ورودی ها</h3>
      </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>فهرست ورودی ها</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="list-items">
          <div></div>
          <OutranceList Closer={registerModalCloser} />
          <StoreList Closer={registerModalCloser} />
          <CompanyList Closer={registerModalCloser} />
        </div>
        <div className="entrance-filter-list-box">
          <div className="entrance-filters">
            <label>ن.فاکتور:</label>
            <input
              type="text"
              className="text-input-standard"
              {...register("factor_number")}
            />
            <label>تاریخ:</label>
            <input
              type="date"
              className="text-input-standard"
              {...register("factor_date")}
            />
            <label>فایده:</label>
            <input
              type="text"
              className="text-input-standard"
              {...register("total_interest")}
            />
            <label>روش‌پرداخت:</label>
            <select
              className="text-input-standard"
              {...register("payment_method")}
            >
              <option></option>
              {paymentMethod.map((payment) => (
                <option value={payment.id}>{payment.name}</option>
              ))}
            </select>
            <label>شرکت:</label>
            <div>
              <ReactSearchAutocomplete
                fuseOptions={{ keys: ["name"] }}
                items={compnay}
                showClear={false}
                styling={AutoCompleteStyle}
                inputDebounce="10"
                showIcon={false}
                resultStringKeyName="name"
                onSelect={(res) => {
                  setCompanySelect(res.id);
                }}
              />
            </div>
            <label>انبار:</label>
            <select className="text-input-standard" {...register("store")}>
              <option></option>
              {store.map((store) => (
                <option value={store.id}>{store.name}</option>
              ))}
            </select>
            <label>ثبت‌نهایی:</label>
            <select
              className="text-input-standard"
              {...register("final_register")}
            >
              <option></option>
              {finalRegister.map((final) => (
                <option value={final.id}>{final.name}</option>
              ))}
            </select>
            <div className="entrance-filters-buttons">
              <input
                type="button"
                value={"جستوجو"}
                className="filterlists-button-standard"
                onClick={handleSubmit(SearchHandle)}
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
          <div className="entrance-filters-header">
            <h3>No</h3>
            <h3>نمبر فاکتور</h3>
            <h3>شماره ثبت</h3>
            <h3>شرکت</h3>
            <h3>روش‌پرداخت</h3>
            <h3>ثبت‌نهایی</h3>
            <h3>انبار</h3>
            <h3>بیشتر</h3>
          </div>
          <div className="entrance-filters-list">
            {entranceList.map((entrance, num) => (
              <div className="entrance-filters-list-map">
                <h4>{num + 1}</h4>
                <h4>{entrance.factor_number}</h4>
                <h4>{entrance.id}</h4>
                <h4>
                  {compnay.map(
                    (company) => entrance.company == company.id && company.name
                  )}
                </h4>
                <h4>
                  {paymentMethod.map(
                    (payment) =>
                      entrance.payment_method == payment.id && payment.name
                  )}
                </h4>
                <h4>
                  {finalRegister.map(
                    (final) => entrance.final_register == final.id && final.name
                  )}
                </h4>
                <h4>
                  {store.map(
                    (store) => entrance.store == store.id && store.name
                  )}
                </h4>
                <Entrance button="1" entrance={entrance} />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EntranceList;
