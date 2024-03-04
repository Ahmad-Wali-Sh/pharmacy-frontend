import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { toast } from "react-toastify";
import useServerIP from "../services/ServerIP";
import BigModal from "../PageComponents/Modals/BigModal";

export default function Revenue(props) {
  const barcodeRef = useRef("");
  const { serverIP } = useServerIP();

  const user = useAuthUser();
  const [selectedIdx, setSelectedIdx] = useState("");
  const [revenue, setRevenue] = React.useState([]);
  const [openPrescriptions, setOpenPrescriptions] = React.useState([]);
  const [trigger, setTrigger] = useState("");
  const [closedPrescriptions, setClosedPrescriptions] = React.useState([]);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    serverIP &&
      axios
        .get(
          `${serverIP}api/revenue/` +
            "?employee=" +
            user().id +
            "&active=" +
            true +
            "&ordering=-id/"
        )
        .then((res) => {
          setRevenue(res.data && res.data[0]);
        });

    // toast.warning("در حال بارگذاری...", {
    //   position: "bottom-right",
    //   autoClose: 3000,
    // });

    serverIP &&
      axios
        .get(`${serverIP}api/prescription/` + "?sold=false&ordering=-created")
        .then((res) => {
          toast.info("بارگذاری موفقانه بود", { position: "bottom-right" });
          setSelectedIdx("");
          setOpenPrescriptions(res.data);
        });
  }, [trigger]);

  useEffect(() => {
    revenue?.id &&
      axios
        .get(
          `${serverIP}api/prescription/?sold=true&ordering=-created&revenue=${revenue?.id}`
        )
        .then((res) => {
          setClosedPrescriptions(res.data);
        });
  }, [revenue?.id, trigger]);

  const handleBarcodePay = (barcode) => {
    axios
      .get(`${serverIP}api/prescription/` + "?barcode_str=" + barcode)
      .then((res) => {
        if (res?.data?.[0]?.id && !res?.data?.[0]?.sold) {
          let prescriptionId = res?.data?.[0].id;
          const Form = new FormData();
          Form.append("revenue", revenue.id);
          Form.append("sold", true);
          axios
            .patch(`${serverIP}api/prescription/${prescriptionId}/`, Form)
            .then(() => {
              setTrigger(new Date());
            });
        } else if (res?.data?.[0]?.sold) {
          toast.info(
            <div>
              <div>نسخه مورد نظر پرداخت شده است </div>
              <div>{res?.data?.[0]?.prescription_number}</div>
            </div>,
            { position: "bottom-right", autoClose: 2000 }
          );
        } else {
          toast.error("نسخه مورد نظر یافت نشد ", {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
        barcodeRef.current.value = "";
      });
  };

  const handleClosePrescription = (prescription) => {
    const Form = new FormData();
    Form.append("revenue", revenue.id);
    Form.append("sold", true);
    axios
      .patch(`${serverIP}api/prescription/${prescription.id}/`, Form)
      .then(() => {
        setTrigger(new Date());
      });
  };

  const handleOpenPrescription = (prescription) => {
    const Form = new FormData();
    Form.append("revenue", "");
    Form.append("sold", false);
    axios
      .patch(`${serverIP}api/prescription/${prescription.id}/`, Form)
      .then(() => {
        setTrigger(new Date());
      });
  };

  useEffect(() => {
    if (lock) {
      if (document.getElementsByClassName("revenue-content")[0]) {
        document.getElementsByClassName(
          "revenue-content"
        )[0].style.pointerEvents = "none";
        barcodeRef.current.focus();
      }
    }

    if (!lock) {
      if (document.getElementsByClassName("revenue-content")[0]) {
        document.getElementsByClassName(
          "revenue-content"
        )[0].style.pointerEvents = "auto";
      }
    }
  }, [lock]);

  useEffect(() => {
    setSelectedIdx("");
    const handleClick = () => {
      if (lock && barcodeRef.current) {
        barcodeRef.current.focus();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [lock]);

  const revenueRef = useRef();



  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" && selectedIdx > 0) {
        setSelectedIdx((prevIdx) => prevIdx - 1);
        event.preventDefault();
      } else if (
        event.key === "ArrowDown" &&
        selectedIdx < openPrescriptions?.length - 1
      ) {
        setSelectedIdx((prevIdx) => prevIdx + 1);
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openPrescriptions, selectedIdx]);

  useEffect(() => {
    const selectedElement = document.getElementById(`item-${selectedIdx}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedIdx]);

  useEffect(() => {
    setSelectedIdx("");
  }, [revenue?.id]);


  return (
    <>
      {props.button == 1 && (
        <div
          className="purchase-card"
          onClick={() => {
            setTrigger(new Date());
            revenueRef.current.Opener();
          }}
        >
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
          onClick={() => {
            setTrigger(new Date());
            revenueRef.current.Opener();
          }}
        >
          <i class="fa-solid fa-cash-register"></i>
        </button>
      )}
      <BigModal ref={revenueRef} title="صندوق">
        <div className="modal">
          <div className="revenue-box">
            <div className="revenue-header">
              <div
                className="revenue-button"
                onClick={() => {
                  setTrigger(new Date());
                }}
              >
                <i className="fa-solid fa-arrows-rotate"></i>
              </div>
              {revenue?.active && <h3>فعال</h3>}
              <div className="barcode-lock-room">
                <button className="lock-button" onClick={() => setLock(!lock)}>
                  {lock ? (
                    <i className="fa-solid fa-lock"></i>
                  ) : (
                    <i className="fa-solid fa-unlock"></i>
                  )}
                </button>
                <input
                  type="text"
                  id="barcode-input"
                  ref={barcodeRef}
                  className="barcode-input"
                  onKeyDown={(e) =>
                    e.key == "Enter" && e.target.value != ""
                      ? handleBarcodePay(e.target.value)
                      : ""
                  }
                />
              </div>
            </div>
            <div className="revenue-content">
              <div className="revneue-content-open">
                <div className="mini-content-headers">
                  <div>نسخه های قابل پرداخت</div>
                  <div className="revenue-map-content">
                    <h4>NO</h4>
                    <h4>شماره نسخه</h4>
                    <h4>نوعیت نسخه</h4>
                    <h4>نام مریض</h4>
                    <h4>قیمت کل</h4>
                  </div>
                </div>
                <div className="yScroll">
                  {revenue &&
                    openPrescriptions?.map((pres, key) => (
                      <div
                        className={`revenue-map-content ${
                          selectedIdx === key ? "highlight-item" : ""
                        }`}
                        id={`item-${key}`}
                        onClick={() => setSelectedIdx(key)}
                      >
                        <h3>{key + 1}</h3>
                        <h3>{pres.prescription_number}</h3>
                        <h3>{pres.department_name}</h3>
                        <h3>{pres.patient_name}</h3>
                        <h3 className="persian-number">
                          {pres.refund
                            ? pres.refund.toFixed(2)
                            : pres.grand_total.toFixed(2)}
                          AF
                        </h3>
                        <div
                          className="revenue-button"
                          onClick={() => {
                            handleClosePrescription(pres);
                          }}
                        >
                          <i class="fa-solid fa-angles-left"></i>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="revneue-content-close">
                <div className="mini-content-headers">
                  <div>نسخه های پرداخت شده</div>
                  <div className="revenue-map-content">
                    <h4>NO</h4>
                    <h4>شماره نسخه</h4>
                    <h4>نوعیت نسخه</h4>
                    <h4>نام مریض</h4>
                    <h4>قیمت کل</h4>
                  </div>
                </div>
                <div className="yScroll">
                  {revenue &&
                    closedPrescriptions?.map((through, key) => (
                      <div
                        className={`revenue-map-content`}
                      >
                        <h3>{key + 1}</h3>
                        <h3>{through.prescription_number}</h3>
                        <h3>{through.department_name}</h3>
                        <h3>{through.patient_name}</h3>
                        <h3 className="persian-number">
                          {through.refund
                            ? through.refund.toFixed(2)
                            : through.grand_total.toFixed(2)}
                          AF
                        </h3>
                        <div
                          className="revenue-button"
                          onClick={() => {
                            handleOpenPrescription(through);
                          }}
                        >
                          <i class="fa-solid fa-angles-right"></i>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
}
