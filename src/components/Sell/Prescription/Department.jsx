import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {useAuthUser} from 'react-auth-kit'

function Department({ title, icon, button, Update }) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  const user = useAuthUser()

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

  const DEPARTMENT_URL = import.meta.env.VITE_DEPARTMENT;

  const SubmitForm = (data) => {
    const StoreForm = new FormData();
    StoreForm.append("name", data.name);
    StoreForm.append("over_price_money", data.over_price_money);
    StoreForm.append("over_price_percent", data.over_price_percent);
    StoreForm.append("discount_money", data.discount_money);
    StoreForm.append("discount_percent", data.discount_percent);
    StoreForm.append("celling_start", data.celling_start);
    StoreForm.append("user", user().id);

    axios
      .post(DEPARTMENT_URL, StoreForm)
      .then((e) => {
        Update();
        if (button == 2) {
          registerModalCloser();
          Update();
        }
        toast.success("Data Updated Successfuly.");
        console.log(e.data);
      })

      .catch((err) => {
        console.log(err);
        toast.error("Check Your Input And Try Again!");
      });
  };
  const [storeLength, setStoreLength] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(DEPARTMENT_URL)
      .then((res) => setStoreLength(res.data.length))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {button == 1 && (
        <div className="purchase-card" onClick={registerModalOpener}>
          <div>
            <h3>{title}</h3>
            <div>{storeLength}</div>
          </div>
          <div>
            <i className={icon}></i>
          </div>
        </div>
      )}
      {button == 2 && (
        <div className="plus-box" onClick={registerModalOpener}>
          <div className="plus">
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>
      )}
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>ثبت شرکت</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <form className="store">
          <div className="store">
            <div className="store-form">
              <label>نام:</label>
              <input type="text" defaultValue="" {...register("name")} />
              <label>حداکثرقیمت:</label>
              <input
                type="text"
                defaultValue=""
                {...register("over_price_money")}
              />
              <label>حداکثرقیمت%:</label>
              <input
                type="text"
                defaultValue=""
                {...register("over_price_percent")}
              />
              <label>تخفیف:</label>
              <input
                type="text"
                defaultValue=""
                {...register("discount_money")}
              />
              <label>تخفیف%:</label>
              <input
                type="text"
                defaultValue=""
                {...register("discount_percent")}
              />
              <label>شروع‌روند:</label>
              <input
                type="text"
                defaultValue=""
                {...register("celling_start")}
              />
            </div>
            <div className="store-submit">
              <input
                onClick={handleSubmit(SubmitForm)}
                type="submit"
                value="ثبت نوع"
              />
              <input type="reset" value="ریسیت" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Department;
