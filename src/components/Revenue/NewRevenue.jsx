import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";

function NewRevenue({ users }) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  const user = useAuthUser();

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

  const REVENUE_URL = import.meta.env.VITE_REVENUE;

  const RevenueSubmit = (data) => {
    const RevenueForm = new FormData();
    RevenueForm.append("user", user().id);
    RevenueForm.append("employee", data.employee);
    RevenueForm.append("active", true);

    axios.post(REVENUE_URL, RevenueForm).then((res) => console.log(res.data));
  };

  return (
    <>
      <button
        type="button"
        className="revenue-manager-buttons"
        onClick={() => {
          registerModalOpener();
        }}
      >
        <i class="fa-solid fa-plus"></i>
      </button>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>ساخت صندوق</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <form className="store">
          <div className="store">
            <div className="store-form">
              <label>کاربر:</label>
              <select
                className="revenue-manager-inputs"
                {...register("employee")}
              >
                <option value=""></option>
                {users.map((user) => (
                  <option value={user.id}>{user.username}</option>
                ))}
              </select>
            </div>
            <div className="store-submit">
              <input
                onClick={handleSubmit(RevenueSubmit)}
                type="submit"
                value="ثبت صندوق"
              />
              <input type="reset" value="ریسیت" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default NewRevenue;
