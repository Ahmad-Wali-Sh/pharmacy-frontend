import Modal from "react-modal";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

export default function RevenueInfo({revenue}) {
  const ModalStyles = {
    content: {
      backgroundColor: "rgb(60,60,60)",
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

  const user = useAuthUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
      setRegisterModalOpen(true);
      RevenueSearch()
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const REVENUE_URL = import.meta.env.VITE_REVENUE;
  const USERS_URL = import.meta.env.VITE_USERS;
  const REVENUE_THROUGH_URL = import.meta.env.VITE_REVENUE_THROUGH;
  const PRESCRIPTION_URL = import.meta.env.VITE_PRESCRIPTION;

  const [users, setUsers] = React.useState([]);
  const [prescription, setPrescription] = React.useState([]);
  const [revenueTrough, setRevenueThrough] = React.useState([]);

  console.log(revenue.id)

  const RevenueSearch = () => {
    axios
        .get(REVENUE_THROUGH_URL + "?revenue=" + revenue.id)
        .then((res) => setRevenueThrough(res.data))
  }

  console.log(revenueTrough)

  return (
    <>
      <button type="button" className="revenue-manager-buttons-map" onClick={()=> {
          registerModalOpener()
      }}>
        <i class="fa-solid fa-circle-info"></i>
      </button>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal">
          <div className="modal-header">
            <h3>نسخه های پرداخت شده در صندوق</h3>
            <div className="modal-close-btn" onClick={registerModalCloser}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className="revenue-manager-box">
            <div className="revenue-info-content-header">
              <h4></h4>
              <h4>No.</h4>
              <h4>نسخه</h4>
              <h4>کارمند</h4>
              <h4>نوعیت</h4>
              <h4>تاریخ</h4>
              <h4>ساعت</h4>
              <h4>مجموع</h4>
              <h4>صندوقدار</h4>
              <h4>تخفیفات</h4>
              <h4>خیرات</h4>
              <h4>ذکات</h4>
              <h4>مقدار روند</h4>
            </div>
            <div className="revenue-info-content">
              {revenueTrough.map((revenuethrough, key) => (
                <div className="revenue-info-map">
                  <h4></h4>
                  <h4>{key + 1}</h4>
                  <h4>{revenuethrough.prescription_number}</h4>
                  <h4>{revenuethrough.prescription_user}</h4>
                  <h4>{revenuethrough.department}</h4>
                  <h4>{revenuethrough.created.slice(0,10)}</h4>
                  <h4>{revenuethrough.created.slice(11,16)}</h4>
                  <h4>{revenuethrough.grand_total}AF</h4>
                  <h4>{revenue.username}</h4>
                  <h4>{revenuethrough.discount}</h4>
                  <h4>{revenuethrough.khairat}</h4>
                  <h4>{revenuethrough.zakat}</h4>
                  <h4>{revenuethrough.rounded}</h4>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
