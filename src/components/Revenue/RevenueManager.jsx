import Modal from "react-modal";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

export default function RevenueManager(props) {
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

  const PayCheck = (prescription) => {
    const RevneueForm = new FormData();
    RevneueForm.append("revenue", revenue[0].id);
    RevneueForm.append("prescription", prescription.id);
    RevneueForm.append("sold", true);
    RevneueForm.append("user", user().id);

    axios
      .post(REVENUE_THROUGH_URL + "?revenue=" + revenue[0].id, RevneueForm)
      .then((res) => {
        UpdateUI();
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const ClearPay = (revenue) => {
    axios.delete(REVENUE_THROUGH_URL + revenue.id).then(() => UpdateUI());
  };

  const UpdateUI = () => {
    axios.get(REVENUE_URL).then((res) => {
      setRevenue(res.data);
      axios
        .get(REVENUE_THROUGH_URL + "?revenue=" + res.data[0].id)
        .then((res) => setRevenueThrough(res.data));
    });

    axios
      .get(
        PRESCRIPTION_URL +
          "?sold=false" +
          "&created_after=" +
          today +
          "&created_before=" +
          today
      )
      .then((res) => setPrescription(res.data));
  };

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const REVENUE_URL = import.meta.env.VITE_REVENUE;
  const REVENUE_THROUGH_URL = import.meta.env.VITE_REVENUE_THROUGH;
  const PRESCRIPTION_URL = import.meta.env.VITE_PRESCRIPTION;

  const [revenue, setRevenue] = React.useState([]);
  const [prescription, setPrescription] = React.useState([]);
  const [revenueTrough, setRevenueThrough] = React.useState([]);

  let today = new Date().toISOString().slice(0, 10);

  React.useEffect(() => {
    axios.get(REVENUE_URL).then((res) => {
      setRevenue(res.data);
      axios
        .get(REVENUE_THROUGH_URL + "?revenue=" + res.data[0].id)
        .then((res) => setRevenueThrough(res.data));
    });

    axios
      .get(
        PRESCRIPTION_URL +
          "?sold=false" +
          "&created_after=" +
          today +
          "&created_before=" +
          today
      )
      .then((res) => setPrescription(res.data));
  }, []);

  return (
    <>
      <div className="purchase-card" onClick={registerModalOpener}>
        <div>
          <h3>{props.title}</h3>
        </div>
        <div>
          <i className={props.icon}></i>
        </div>
      </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal">
          <div className="modal-header">
            <h3>مدیریت صندوق ها</h3>
            <div className="modal-close-btn" onClick={registerModalCloser}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className="revenue-manager-box">
            <div className="revenue-manager-filters">
              <label>حالت‌صندوق:</label>
              <select className="revenue-manager-inputs">
                <option value=""></option>
                <option value="true">باز</option>
                <option value="false">بسته</option>
              </select>
              <label>کاربر:</label>
              <select className="revenue-manager-inputs">
                <option value=""></option>
                <option value="true">قدیر</option>
                <option value="false">عزیز</option>
              </select>
              <label>تاریخ:</label>
              <input type="date" className="revenue-manager-inputs"></input>
              <label>نسخه:</label>
              <input className="revenue-manager-inputs"></input>
            </div>
            <div className="revenue-manager-content-header"></div>
            <div className="revenue-manager-content"></div>
          </div>
        </div>
      </Modal>
    </>
  );
}
