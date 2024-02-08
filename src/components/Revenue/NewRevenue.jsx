import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { queryClient } from "../services/API";

async function loadEnvVariables(key) {
  try {
      const response = await fetch('/env.json');
      const data = await response.json();
      return data[key] || null; // Return the value corresponding to the provided key, or null if not found
  } catch (error) {
      console.error('Error loading environment variables:', error);
      return null; // Return null if there's an error
  }
}


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
  const REVENUE_URL = API + '/api/revenue/';

  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

    axios.post(REVENUE_URL, RevenueForm).then((res) => {
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
