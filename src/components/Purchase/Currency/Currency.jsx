import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function Currency({ Update }) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    setRegisterModalOpen(true);
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

  const SubmitForm = (data) => {
    const CurrencyForm = new FormData();
    CurrencyForm.append("name", data.name);
    CurrencyForm.append("rate", data.rate);
    CurrencyForm.append("description", data.description);

    axios
      .post(CURRENCY_URL, CurrencyForm)
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
          <h3>ثبت واحد پولی</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <form className="store">
          <div className="store">
            <div className="store-form">
              <label>واحد:</label>
              <input type="text" defaultValue="" {...register("name")} />
              <label>نرخ:</label>
              <input type="text" defaultValue="" {...register("rate")} />
              <label>توضیحات:</label>
              <textarea
                type="text"
                defaultValue=""
                {...register("description")}
              />
            </div>
            <div className="store-submit">
              <input
                onClick={handleSubmit(SubmitForm)}
                type="submit"
                value="ثبت"
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Currency;
