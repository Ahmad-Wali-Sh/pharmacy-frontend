import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useServerIP from "../services/ServerIP";

export default function RevenueInfo({ revenue }) {
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

  const { serverIP } = useServerIP();

  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [prescriptioner, setRevenueThrough] = React.useState([]);
  const [next, setNext] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [count, setCount] = React.useState()
  const [previous, setPrevious] = React.useState([])

  function registerModalOpener() {
    setRegisterModalOpen(true);
    RevenueSearch();
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const RevenueSearch = () => {
    axios
      .get(`${serverIP}api/revenue-record/` + "?revenue=" + revenue?.id + "&page=1")
      .then((res) => {
        setRevenueThrough(res?.data?.results)
        setNext(res?.data?.next)
        setPrevious(res?.data?.previous)
        setCount(res?.data?.count)
      });
  };

  const RevenuePageSearch = (url) => {
    axios
    .get(url)
    .then((res) => {
      setRevenueThrough(res?.data?.results)
      setNext(res?.data?.next)
      setPrevious(res?.data?.previous)
      setPage(res?.data)
    });
  }

  return (
    <>
      <button
        type="button"
        className="revenue-manager-buttons-map"
        onClick={() => {
          registerModalOpener();
        }}
      >
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
              <h4>مریض</h4>
              <h4>نوعیت</h4>
              <h4>تاریخ</h4>
              <h4>ساعت</h4>
              <h4>مجموع</h4>
              <h4>صندوقدار</h4>
              <h4>تخفیفات</h4>
              <h4>%تخفیفات</h4>
              <h4>خیرات</h4>
              <h4>زکات</h4>
              <h4>مقدار روند</h4>
            </div>
            <div className="revenue-info-content">
              {prescriptioner?.map((pres, key) => (
                <div className="revenue-info-map">
                  <h4></h4>
                  <h4>{key + 1}</h4>
                  <h4>{pres.prescription_number}</h4>
                  <h4>{pres.username}</h4>
                  <h4>{pres.patient_name}</h4>
                  <h4>{pres.department_name}</h4>
                  <h4>{pres.timestamp?.slice(0, 10)}</h4>
                  <h4>{pres.timestamp?.slice(11, 16)}</h4>
                  <h4 style={{ direction: "ltr", textAlign: "right" }}>
                    {pres.amount?.toFixed()}
                  </h4>
                  <h4>{revenue.username}</h4>
                  <h4>{pres.discount_money}</h4>
                  <h4>{pres.discount_percent}</h4>
                  <h4>{pres.khairat}</h4>
                  <h4>{pres.zakat}</h4>
                  <h4>{pres.rounded_number}</h4>
                </div>
              ))}
            </div>
            <div className="flex">
              <div style={{margin:'0.2rem'}}>
                <label className="text">صفحات: {page?.total_pages}</label>{" | "}
                <label className="text">مجموع پرداختی ها: {count}</label>
              </div>
              <div className="revenue-manager-pagination">
                {next && <div onClick={() => RevenuePageSearch(next)}>{"بعدی"}</div>}
                <div>{page?.current_page}</div>
                {previous && <div onClick={() => RevenuePageSearch(previous)}>{"قبلی"}</div>}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
