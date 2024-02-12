import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { queryClient } from "../services/API";
import useServerIP from "../services/ServerIP";


function NewRevenue({ users }) {

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

  const [API, setAUTH_URL] = useState('');
  useEffect(() => {
    loadEnvVariables('API')
      .then(apiValue => {
        setAUTH_URL(apiValue);
      })
      .catch(error => {
        console.error('Error loading VITE_API:', error);
      });
  }, []);
  const user = useAuthUser();

  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { serverIP} = useServerIP()

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const RevenueSubmit = (data) => {
    const RevenueForm = new FormData();
    RevenueForm.append("user", user().id);
    RevenueForm.append("employee", data.employee);
    RevenueForm.append("active", true);

    axios.post(`${serverIP}api/revenue/`, RevenueForm).then((res) => {
      toast.success("Data Submited Succesfully");
      registerModalCloser();
      queryClient.invalidateQueries()
    }).catch((res)=> {
      toast.error('صندوق باز شده برای این کاربر را بسته نموده و دوباره امتحان کنید')
    })
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
                {/* {users.map((users) => (
                 user.id == users.id && <option value={users.id}>{users.username}</option>
                ))} */}
                <option selected value={user().id}>{user().username}</option>
              </select>
            </div>
            <div className="store-submit">
              <input
                onClick={handleSubmit(RevenueSubmit)}
                type="submit"
                value="ثبت صندوق"
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default NewRevenue;
