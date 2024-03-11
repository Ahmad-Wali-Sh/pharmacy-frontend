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
  const [refundPrescription, setRefundPrescription] = React.useState([]);
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
        .get(`${serverIP}api/prescription/` + "?sold=false&ordering=-id")
        .then((res) => {
          setSelectedIdx("");
          setOpenPrescriptions(res.data);
        });

    serverIP &&
      axios
        .get(
          `${serverIP}api/prescription/` +
            "?sold=true&ordering=-id&refund_not_equal=0"
        )
        .then((res) => {
          setSelectedIdx("");
          setRefundPrescription(res.data);
        });
  }, [trigger]);

  useEffect(() => {
    revenue?.id &&
      axios
        .get(
          `${serverIP}api/prescription/?sold=true&ordering=-purchase_payment_date&revenue=${revenue?.id}`
        )
        .then((res) => {
          setClosedPrescriptions(res.data);
        });
  }, [revenue?.id, trigger]);

  const handleBarcodePay = (barcode) => {
    axios
      .get(`${serverIP}api/prescription/` + "?barcode_str=" + barcode)
      .then((res) => {
        if (res?.data?.[0]?.id) {
          let prescriptionId = res?.data?.[0].id;
          const Form = new FormData();
          Form.append("revenue", revenue.id);
          Form.append("sold", true);
          Form.append("refund", 0);
          Form.append("purchased_value", res?.data?.[0].grand_total);
          axios
            .patch(`${serverIP}api/prescription/${prescriptionId}/`, Form)
            .then(() => {
              setTrigger(new Date());
              !res?.data?.[0]?.sold &&
                toast.success("موفقانه بود", {
                  position: "bottom-right",
                  autoClose: 2000,
                });
            });
        }
        if (res?.data?.[0]?.sold) {
          toast.info(
            <div>
              <div>نسخه مورد نظر پرداخت شده است </div>
              <div>{res?.data?.[0]?.prescription_number}</div>
            </div>,
            { position: "bottom-right", autoClose: 2000 }
          );
        } else if (!res?.data?.[0]?.id) {
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
  const handleRefundPrescription = (prescription) => {
    const Form = new FormData();
    Form.append("revenue", revenue.id);
    Form.append("sold", true);
    Form.append("refund", 0);
    Form.append("purchased_value", prescription.grand_total);
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
    Form.append('purchased_value', 0)
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
              <div className="revenue-with-refund">
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
                  <div
                    style={{
                      overflowY: "scroll",
                      height: refundPrescription?.[0] ? "40dvh" : "72dvh",
                    }}
                  >
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
                {refundPrescription?.[0] && (
                  <div className="revneue-content-open">
                    <div className="mini-content-headers">
                      <div>نسخه های برگشتی</div>
                      <div className="revenue-map-content">
                        <h4>NO</h4>
                        <h4>شماره نسخه</h4>
                        <h4>نوعیت نسخه</h4>
                        <h4>نام مریض</h4>
                        <h4>قیمت کل</h4>
                      </div>
                    </div>
                    <div
                      style={{
                        overflowY: "scroll",
                        height: refundPrescription?.[0] ? "23dvh" : "72dvh",
                      }}
                    >
                      {revenue &&
                        refundPrescription?.map((pres, key) => (
                          <div
                            className={`revenue-map-content ${
                              selectedIdx === key ? "" : ""
                            }`}
                            id={`item-${key}`}
                            onClick={() => setSelectedIdx(key)}
                          >
                            <h3>{key + 1}</h3>
                            <h3>{pres.prescription_number}</h3>
                            <h3>{pres.department_name}</h3>
                            <h3>{pres.patient_name}</h3>
                            <h3 className="persian-number">
                              {pres.refund &&
                                (pres.refund > 0 ? "-" : "") +
                                  (pres.refund > 0
                                    ? pres.refund.toFixed(2)
                                    : pres.refund.toFixed(2).slice(1))}
                              AF
                            </h3>
                            <div
                              className="revenue-button"
                              onClick={() => {
                                handleClosePrescription(pres);
                                handleRefundPrescription(pres);
                              }}
                            >
                              <i class="fa-solid fa-angles-left"></i>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
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
                      <div className={`revenue-map-content`}>
                        <h3>{key + 1}</h3>
                        <h3>{through.prescription_number}</h3>
                        <h3>{through.department_name}</h3>
                        <h3>{through.patient_name}</h3>
                        <h3 className="persian-number">
                          {through.purchased_value.toFixed(2)}
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
