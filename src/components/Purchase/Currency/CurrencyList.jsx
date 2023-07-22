import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import Currency from "./Currency";

function CurrencyList({ Update }) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  const user = useAuthUser();

  function registerModalOpener() {
    axios
      .get(CURRENCY_URL + "?ordering=id")
      .then((res) => {
        setCurrencyList(res.data);
        setRegisterModalOpen(true);
      })
      .catch((err) => console.log(err));
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const ModalStyles = {
    content: {
      backgroundColor: "rgb(30,30,30)",
      border: "none",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "0px",
      width: "35%",
      left: "30%",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
      textAlign: "center",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const CURRENCY_URL = import.meta.env.VITE_CURRENCY;
  const [currencyList, setCurrencyList] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(CURRENCY_URL)
      .then((res) => setCurrencyList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const SubmitForm = (data) => {
    const CurrencyForm = new FormData();
    CurrencyForm.append("rate", data.rate);
    CurrencyForm.append("user", user().id);

    axios
      .patch(CURRENCY_URL + data.id, CurrencyForm)
      .then((e) => {
        registerModalCloser();
        Update();
        toast.success("Data Updated Successfuly.");
        console.log(e.data);
      })

      .catch((err) => {
        console.log(err);
        toast.error("Check Your Input And Try Again!");
      });
  };

  const CurrencyUpdate = () => {
    axios
      .get(CURRENCY_URL + "?ordering=id")
      .then((res) => {
        setCurrencyList(res.data);
        Update();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="plus-box-currency" onClick={registerModalOpener}>
        <div className="plus">
          <i class="fa-solid fa-plus"></i>
        </div>
      </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>نرخ اسعار</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <form className="store">
          <div className="currency-list">
            <div className="currency-list-map-header">
              <h4>No</h4>
              <h4>نام ارز</h4>
              <h4>نرخ</h4>
              <h4>حذف</h4>
            </div>
            {currencyList.map((currency, key) => (
              <div className="currency-list-map">
                <h4>{key + 1}</h4>
                <h4>{currency.name}</h4>
                <input
                  defaultValue={currency.rate}
                  className="currency-rate-input"
                  onBlurCapture={(e) => {
                    const CurrencyForm = new FormData();
                    CurrencyForm.append("rate", e.target.value);
                    CurrencyForm.append("user", user().id);
                    axios
                      .patch(CURRENCY_URL + currency.id + "/", CurrencyForm)
                      .then((res) => {
                        console.log(res);
                        Update();
                      });
                  }}
                ></input>
                <div className="medician-map-buttons-1" onClick={() => {
                    axios
                        .delete(CURRENCY_URL + currency.id)
                        .then((res) => {
                            Update()
                            CurrencyUpdate()
                        })
                }}>
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>
            ))}
          </div>
          <div className="store-submit">
            <input onClick={registerModalCloser} type="submit" value="تایید" />
            <Currency Update={CurrencyUpdate} />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default CurrencyList;
