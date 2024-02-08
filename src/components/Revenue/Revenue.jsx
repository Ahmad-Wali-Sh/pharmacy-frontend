import Modal from "react-modal";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { toast } from "react-toastify";

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
  const barcodeRef = useRef('')

  const REVENUE_URL = API + '/api/revenue/';
  const REVENUE_THROUGH_URL = API + '/api/revenue-through/';
  const PRESCRIPTION_URL = API + '/api/prescription/';
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
          "?sold=false"
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
          "?sold=false" 
      )
      .then((res) => setPrescription(res.data));
  }, []);

  const handleBarcodePay = (barcode) => {
    axios.get(
      PRESCRIPTION_URL +
        "?sold=false" + "&barcode_str=" + barcode)
      .then((res) => {
        const RevneueForm = new FormData();
        RevneueForm.append("revenue", revenue.id);
        res && res.data && res.data[0] && RevneueForm.append("prescription", res?.data?.[0].id);
        RevneueForm.append("sold", true);
        RevneueForm.append("user", user().id);
    
        barcode && axios
          .post(REVENUE_THROUGH_URL + "?revenue=" + revenue.id, RevneueForm)
          .then((res) => {
            toast.success('پرداخت شد')
            UpdateUI();
            barcodeRef.current.value = ''
          })
          .catch((err) => {
            toast.error('وجود ندارد')
          });
      })

  }

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
              {/* <select className="revenue-select">
                {revenue && revenue.active && (
                  <option value={revenue.id}>{revenue.id}</option>
                )}
              </select> */}
              {revenue?.active &&<h3>Active</h3>}
              <input type="text" id='barcode-input' ref={barcodeRef} className="barcode-input" onKeyDown={(e) => e.key == 'Enter' ? handleBarcodePay(e.target.value) : ''}/>
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
                      <h3>{pres.patient_name}</h3>
                      <h3 className='persian-number'>{pres.refund ? pres.refund.toFixed(2) : pres.grand_total.toFixed(2)}AF</h3>
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
                          <h3>{through.patient_name}</h3>
                          <h3 className='persian-number'>{through.purchased.toFixed(2)}AF</h3>
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
