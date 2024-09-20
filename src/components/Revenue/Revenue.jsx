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
  const [openPrescriptionsReturns, setOpenPrescriptionsReturns] = React.useState([]);
  const [trigger, setTrigger] = useState("");
  const [revenueRecords, setrevenueRecords] = React.useState([]);
  const [refundPrescription, setRefundPrescription] = React.useState([]);
  const [lock, setLock] = useState(false);
  const [closePage, setClosePage] = useState(1);
  const [openPage, setOpenPage] = useState(1);
  const [openReturnPage, setOpenReturnPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchValue, setValueSearch] = useState("");

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

    serverIP &&
      axios
        .get(
          `${serverIP}api/prescription-pg/` +
            `?ordering=-id&refund_not_equal=0&${
              search ? "prescription_number=" + search : ""
            }&refund=${searchValue}&page=${openPage}`
        )
        .then((res) => {
          setSelectedIdx("");
          setOpenPrescriptions(res.data);
        })
        .catch(() => {
          setOpenReturnPage(1);
          setTrigger(new Date());
        });

    serverIP &&
      axios
        .get(
          `${serverIP}api/prescription-return-pg/` +
            `?ordering=-id&refund_not_equal=0&${
              search ? "prescription_number=" + search : ""
            }&refund=${searchValue}&page=${openReturnPage}`
        )
        .then((res) => {
          setSelectedIdx("");
          setOpenPrescriptionsReturns(res.data);
        })
        .catch(() => {
          setOpenPage(1);
          setTrigger(new Date());
        });
  }, [trigger, search, searchValue]);

  useEffect(() => {
    revenue?.id &&
      axios
        .get(
          `${serverIP}api/revenue-record/?revenue=${revenue?.id}${
            search ? "&prescription__prescription_number=" + search : ""
          }&amount=${searchValue}&page=${closePage}`
        )
        .then((res) => {
          setrevenueRecords(res.data);
        })
        .catch(() => {
          setClosePage(1);
          setTrigger(new Date());
        });
  }, [revenue?.id, trigger, search]);

  const handleBarcodePay = (barcode) => {
    axios
      .get(`${serverIP}api/prescription/` + "?barcode_str=" + barcode)
      .then((res) => {
        if (res?.data?.[0]?.id && res?.data?.[0]?.refund != 0) {
          handleClosePrescription(res?.data?.[0]);
        }
        if (res?.data?.[0]?.refund == 0) {
          toast.info(
            <div>
              <div>نسخه مورد نظر پرداخت شده است </div>
              <div>{res?.data?.[0]?.prescription_number}</div>
            </div>,
            { position: "bottom-right", autoClose: 2000 }
          );
          hanedlePrescriptionReturnPay(barcode)
        } else if (!res?.data?.[0]?.id) {
          hanedlePrescriptionReturnPay(barcode)
        }
        barcodeRef.current.value = "";
      });
  };

  const hanedlePrescriptionReturnPay = (barcode) => {
    axios
    .get(`${serverIP}api/prescription-return/` + "?barcode_str=" + barcode)
    .then((re_res) => {
      if (re_res?.data?.[0]?.id && re_res?.data?.[0]?.refund != 0) {
        handleClosePrescriptionReturn(re_res?.data?.[0]);
      }
      if (re_res?.data?.[0]?.refund == 0) {
        toast.info(
          <div>
            <div>برگشتی مورد نظر پرداخت شده است </div>
            <div>{re_res?.data?.[0]?.prescription_number}</div>
          </div>,
          { position: "bottom-right", autoClose: 2000 }
        );
      } else if (!re_res?.data?.[0]?.id) {
        toast.error("برگشتی مورد نظر یافت نشد ", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
      barcodeRef.current.value = "";
    });
  }

  

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClosePrescription = (prescription) => {
    setIsButtonDisabled(true);
    const RevenueRecordForm = new FormData();
    RevenueRecordForm.append("revenue", revenue?.id);
    RevenueRecordForm.append("prescription", prescription?.id);
    RevenueRecordForm.append("record_type", "new");
    RevenueRecordForm.append("amount", prescription?.refund);
    RevenueRecordForm.append("user", user().id);

    prescription?.refund != 0 &&
      axios
        .post(`${serverIP}api/revenue-record/`, RevenueRecordForm)
        .then(() => {
          setTrigger(new Date());
        });

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1500);
  };

  const handleClosePrescriptionReturn = (prescription) => {
    setIsButtonDisabled(true);
    const RevenueRecordForm = new FormData();
    RevenueRecordForm.append("revenue", revenue?.id);
    RevenueRecordForm.append("prescription_return", prescription?.id);
    RevenueRecordForm.append("record_type", "new");
    RevenueRecordForm.append("amount", prescription?.refund);
    RevenueRecordForm.append("user", user().id);

    prescription?.refund != 0 &&
      axios
        .post(`${serverIP}api/revenue-record/`, RevenueRecordForm)
        .then(() => {
          setTrigger(new Date());
        });

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1500);
  };

  const handleOpenPrescription = (revenueRecord) => {
    axios
      .delete(`${serverIP}api/revenue-record/${revenueRecord.id}/`)
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
        selectedIdx < openPrescriptions?.results?.length - 1
      ) {
        setSelectedIdx((prevIdx) => prevIdx + 1);
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openPrescriptions?.results, selectedIdx]);

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

              <div className="barcode-lock-room">
                <input
                  type="text"
                  className="barcode-input"
                  placeholder="جستجو بر اساس قیمت"
                  onChange={(e) => {
                    setValueSearch(e.target.value);
                    setTrigger(new Date());
                  }}
                  style={{
                    marginLeft: "1rem",
                    direction: "rtl",
                    padding: "0.5rem",
                  }}
                />
                <input
                  type="text"
                  className="barcode-input"
                  placeholder="جستجو بر اساس شماره نسخه"
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setTrigger(new Date());
                  }}
                  style={{
                    marginLeft: "1rem",
                    direction: "rtl",
                    padding: "0.5rem",
                  }}
                />
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
                  placeholder="Barcode"
                  style={{ padding: "0.5rem" }}
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>نسخه های قابل پرداخت</div>
                      <div
                        style={{
                          display: "flex",
                          gap: "2rem",
                          fontSize: "0.9rem",
                          paddingLeft: "0.4rem",
                        }}
                      >
                        <div>تعداد: {openPrescriptions?.count}</div>
                        <div>
                          صفحات: {Math.ceil(openPrescriptions?.count / 100)}
                        </div>
                      </div>
                    </div>
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
                    }}
                  >
                    {revenue &&
                      openPrescriptions?.results?.map((pres, key) => (
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
                            {pres.refund.toFixed(2)}
                            AF
                          </h3>
                          <button
                            className="revenue-button"
                            disabled={isButtonDisabled}
                            onClick={() => {
                              handleClosePrescription(pres);
                            }}
                          >
                            <i class="fa-solid fa-angles-left"></i>
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="revenue-pagination-conatiner">
                    {openPrescriptions?.previous && (
                      <div
                        className="paginator-button"
                        onClick={() => {
                          if (openPrescriptions?.previous) {
                            setOpenPage((prev) => prev - 1);
                            setTrigger(new Date());
                          }
                        }}
                      >
                        {"قبلی"}
                      </div>
                    )}
                    <div className="paginator-button-page">{openPage}</div>
                    {openPrescriptions?.next && (
                      <div
                        className="paginator-button"
                        onClick={() => {
                          if (openPrescriptions?.next) {
                            setOpenPage((prev) => prev + 1);
                            setTrigger(new Date());
                          }
                        }}
                      >
                        {"بعدی"}
                      </div>
                    )}
                  </div>
                </div>
                <div className="revneue-content-open">
                  <div className="mini-content-headers">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>برگشتی ها</div>
                      <div
                        style={{
                          display: "flex",
                          gap: "2rem",
                          fontSize: "0.9rem",
                          paddingLeft: "0.4rem",
                        }}
                      >
                        <div>تعداد: {openPrescriptionsReturns?.count}</div>
                        <div>
                          صفحات: {Math.ceil(openPrescriptionsReturns?.count / 100)}
                        </div>
                      </div>
                    </div>
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
                    }}
                  >
                    {revenue &&
                      openPrescriptionsReturns?.results?.map((pres, key) => (
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
                            {pres.refund.toFixed(2)}
                            AF
                          </h3>
                          <button
                            className="revenue-button"
                            disabled={isButtonDisabled}
                            onClick={() => {
                              handleClosePrescriptionReturn(pres);
                            }}
                          >
                            <i class="fa-solid fa-angles-left"></i>
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="revenue-pagination-conatiner">
                    {openPrescriptionsReturns?.previous && (
                      <div
                        className="paginator-button"
                        onClick={() => {
                          if (openPrescriptionsReturns?.previous) {
                            setOpenReturnPage((prev) => prev - 1);
                            setTrigger(new Date());
                          }
                        }}
                      >
                        {"قبلی"}
                      </div>
                    )}
                    <div className="paginator-button-page">{openReturnPage}</div>
                    {openPrescriptionsReturns?.next && (
                      <div
                        className="paginator-button"
                        onClick={() => {
                          if (openPrescriptionsReturns?.next) {
                            setOpenReturnPage((prev) => prev + 1);
                            setTrigger(new Date());
                          }
                        }}
                      >
                        {"بعدی"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="revneue-content-close">
                <div className="mini-content-headers">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>نسخه های پرداخت شده</div>
                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                        fontSize: "0.9rem",
                        paddingLeft: "0.4rem",
                      }}
                    >
                      <div>تعداد: {revenueRecords?.count}</div>
                      <div>صفحات: {Math.ceil(revenueRecords?.count / 100)}</div>
                    </div>
                  </div>
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
                    revenueRecords?.results?.map((through, key) => (
                      <div className={`revenue-map-content`}>
                        <h3>{key + 1}</h3>
                        <h3>{through.prescription_number}</h3>
                        <h3>{through.department_name}</h3>
                        <h3>{through.patient_name}</h3>
                        <h3 className="persian-number">
                          {through?.amount?.toFixed(2)}
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
                <div className="revenue-pagination-conatiner">
                  {revenueRecords?.previous && (
                    <div
                      className="paginator-button"
                      onClick={() => {
                        if (revenueRecords?.previous) {
                          setClosePage((prev) => prev - 1);
                          setTrigger(new Date());
                        }
                      }}
                    >
                      {"قبلی"}
                    </div>
                  )}
                  <div className="paginator-button-page">{closePage}</div>
                  {revenueRecords?.next && (
                    <div
                      className="paginator-button"
                      onClick={() => {
                        if (revenueRecords?.next) {
                          setClosePage((prev) => prev + 1);
                          setTrigger(new Date());
                        }
                      }}
                    >
                      {"بعدی"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
}
