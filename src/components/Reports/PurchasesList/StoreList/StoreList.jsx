import React from "react";
import Modal from "react-modal";
import axios from "axios";
import OutranceList from "../OutranceList/OutranceList";
import EntranceList from "../EntranceList/EntranceList";
import CompanyList from "../CompanyList/CompanyList";
import { useForm } from "react-hook-form";
import StoreListMap from "./StoreListMap";
import PurchaseListQuery from "../PurcahseList/PurchaseListQuery";

function StoreList({ Closer }) {
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
    control,
    formState: { errors },
  } = useForm();

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

  const STORE_URL = import.meta.env.VITE_STORE;

  const [store, setStore] = React.useState([]);

  const SearchHandle = (data) => {
    setStore([]);
    axios
      .get(
        STORE_URL +
          `?name=${data.name}&phone=${data.phone}&address=${data.address}/`
      )
      .then((res) => setStore(res.data))
      .catch((err) => console.log(err));
  };
  console.log(store);

  return (
    <>
      <div className="list-card" onClick={registerModalOpener}>
        <h3>فهرست انبار ها</h3>
      </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>فهرست انبار ها</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="list-items">
          <EntranceList Closer={registerModalCloser} />
          <OutranceList Closer={registerModalCloser} />
          <div></div>
          <CompanyList Closer={registerModalCloser} />
          <PurchaseListQuery Closer={registerModalCloser}/>
        </div>
        <div className="store-list-filtering-box">
          <div className="store-filters">
            <label>نام:</label>
            <input
              type="text"
              className="text-input-standard"
              {...register("name")}
            />
            <label>شماره:</label>
            <input
              type="text"
              className="text-input-standard"
              {...register("phone")}
            />
            <label>آدرس:</label>
            <input
              type="text"
              className="text-input-standard"
              {...register("address")}
            />
            <div className="store-filters-buttons">
              <input
                type="button"
                value={"جستجو"}
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
          <div className="store-filters-header">
            <h4>No</h4>
            <h4>نام</h4>
            <h4>شماره</h4>
            <h4>آدرس</h4>
            <h4>مسئول</h4>
            <h4>توضیحات</h4>
            <h4>عکس</h4>
            <h4></h4>
            <h4>بیشتر</h4>
          </div>
          <div className="store-filters-list">
            {store.map((store, num) => (
              <StoreListMap kind={store} num={num} Update={SearchHandle} />
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default StoreList;
