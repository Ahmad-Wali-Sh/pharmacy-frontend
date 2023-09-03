import Modal from "react-modal";
import React from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

export default function Revenue(props) {
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

  const REVENUE_URL = import.meta.env.VITE_REVENUE;
  const REVENUE_THROUGH_URL = import.meta.env.VITE_REVENUE_THROUGH;
  const PRESCRIPTION_URL = import.meta.env.VITE_PRESCRIPTION;
  const user = useAuthUser();
  let today = new Date().toISOString().slice(0, 10);

  const [revenue, setRevenue] = React.useState([]);
  const [prescription, setPrescription] = React.useState([]);
  const [revenueTrough, setRevenueThrough] = React.useState([]);
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    UpdateUI();
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const PayCheck = (prescription) => {
    const RevneueForm = new FormData();
    RevneueForm.append("revenue", revenue.id);
    RevneueForm.append("prescription", prescription.id);
    RevneueForm.append("sold", true);
    RevneueForm.append("user", user().id);

    axios
      .post(REVENUE_THROUGH_URL + "?revenue=" + revenue.id, RevneueForm)
      .then((res) => {
        UpdateUI();
      })
      .catch((err) => console.log(err));
  };

  const ClearPay = (revenue) => {
    axios.delete(REVENUE_THROUGH_URL + revenue.id).then(() => UpdateUI());
  };

  const UpdateUI = () => {
    axios
      .get(
        REVENUE_URL +
          "?employee=" +
          user().id +
          "&active=" +
          true +
          "&ordering=-id"
      )
      .then((res) => {
        setRevenue(res.data && res.data[0]);
        res.data &&
          res.data[0] &&
          axios
            .get(REVENUE_THROUGH_URL + "?revenue=" + res.data[0].id)
            .then((resthroug) => {
              setRevenueThrough(resthroug.data);
            });
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

  React.useEffect(() => {
    axios
      .get(
        REVENUE_URL +
          "?employee=" +
          user().id +
          "&active=" +
          true +
          "&ordering=-id"
      )
      .then((res) => {
        setRevenue(res.data && res.data[0]);
        res.data &&
          res.data[0] &&
          axios
            .get(REVENUE_THROUGH_URL + "?revenue=" + res.data[0].id)
            .then((resthroug) => {
              setRevenueThrough(resthroug.data);
            });
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
      {props.button == 1 && (
        <div className="purchase-card" onClick={registerModalOpener}>
          <div>
            <h3>{props.title}</h3>
          </div>
          <div>
            <i className={props.icon}></i>
          </div>
        </div>
      )}

      {props.button == 2 && (
        <button
          type="button"
          className="revenue-manager-buttons"
          onClick={registerModalOpener}
        >
          <i class="fa-solid fa-cash-register"></i>
        </button>
      )}
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal">
          <div className="modal-header">
            <h3>صندوق</h3>
            <div className="modal-close-btn" onClick={registerModalCloser}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className="revenue-box">
            <div className="revenue-header">
              <div
                className="revenue-button"
                onClick={() => {
                  UpdateUI();
                }}
              >
                <i className="fa-solid fa-arrows-rotate"></i>
              </div>
              <select className="revenue-select">
                {revenue && revenue.active && (
                  <option value={revenue.id}>{revenue.id}</option>
                )}
              </select>
            </div>
            <div className="revenue-content">
              <div className="revneue-content-open">
                <div className="mini-content-headers">نسخه های قابل پرداخت</div>
                {revenue &&
                  prescription.map((pres, key) => (
                    <div className="revenue-map-content">
                      <h3>{key + 1}</h3>
                      <h3>{pres.prescription_number}</h3>
                      <h3>{pres.department_name}</h3>
                      <h3>{pres.username}</h3>
                      <h3>{pres.refund ? pres.refund.toFixed(2) : pres.grand_total.toFixed(2)}AF</h3>
                      <div
                        className="revenue-button"
                        onClick={() => {
                          PayCheck(pres);
                        }}
                      >
                        <i class="fa-solid fa-angles-left"></i>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="revneue-content-close">
                <div className="mini-content-headers">نسخه های پرداخت شده</div>
                {revenue &&
                  revenueTrough.map(
                    (through, key) =>
                      through.sold && (
                        <div className="revenue-map-content">
                          <h3>{key + 1}</h3>
                          <h3>{through.prescription_number}</h3>
                          <h3>{through.department}</h3>
                          <h3>{through.username}</h3>
                          <h3>{through.purchased.toFixed(2)}AF</h3>
                          <div
                            className="revenue-button"
                            onClick={() => {
                              ClearPay(through);
                            }}
                          >
                            <i class="fa-solid fa-angles-right"></i>
                          </div>
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
