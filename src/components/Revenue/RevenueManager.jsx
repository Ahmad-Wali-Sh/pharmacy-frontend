import Modal from "react-modal";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import NewRevenue from "./NewRevenue";
import RevenueInfo from "./RevenueInfo";
import Revenue from "./Revenue";
import { useQuery } from "react-query";
import AlertModal from "../PageComponents/Modals/AlertModal";
import useServerIP from "../services/ServerIP";

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
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      created: "",
      employee: "",
      revenue_through: "",
      active: true,
    },
  });

  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const { serverIP} = useServerIP()

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
   serverIP && axios.get(`${serverIP}auth/users/`).then((res) => setUsers(res.data));
  }, []);

  const QueryRevenue = `revenue/?created_after=${watch(
    "created"
  )}&created_before=${watch("created")}&active=${watch(
    "active"
  )}&employee=${watch("employee")}&revenue_through__prescription_number=${watch(
    "revenue_through"
  )}`;
  const { data: revenue, refetch: revenueGet } = useQuery([QueryRevenue]);


    const [editRevenue,setEditRevenue] = React.useState('')
  const AlertingRef = useRef(null);

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
        <AlertModal
          ref={AlertingRef}
          errorText="در صورت تایید، تغییر مجدد امکان پذیر نیست"
          errorTitle="با بستن صندوق اطمینان دارید؟"
          OkFunc={() => {
            const RevenueForm = new FormData();
            RevenueForm.append("active", false);
            axios
              .patch(`${serverIP}api/revenue/` + editRevenue.id + "/", RevenueForm)
              .then(() => {
                revenueGet();
              });
          }}
          NoFunc={() => AlertingRef.current.Closer()}
        ></AlertModal>
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
              <select
                className="revenue-manager-inputs"
                {...register("active")}
              >
                <option value=""></option>
                <option value="true">باز</option>
                <option value="false">بسته</option>
              </select>
              <label>کاربر:</label>
              <select
                className="revenue-manager-inputs"
                {...register("employee")}
              >
                <option value=""></option>
                {users?.map((user) => (
                  <option value={user?.id}>{user?.username}</option>
                ))}
              </select>
              <label>تاریخ:</label>
              <input
                type="date"
                className="revenue-manager-inputs"
                {...register("created")}
              ></input>
              <label>نسخه:</label>
              <input
                className="revenue-manager-inputs"
                {...register("revenue_through")}
              ></input>
              <div className="revenue-manager-buttons-box">
                <button
                  type="button"
                  className="revenue-manager-buttons"
                  onClick={revenueGet}
                >
                  <i class="fa-brands fa-searchengin"></i>
                </button>
                <NewRevenue users={users} />
                <button type="button" className="revenue-manager-buttons">
                  <i class="fa-solid fa-file-excel"></i>
                </button>
                <Revenue
                  button={2}
                  title="صندوق"
                  icon="fa-solid fa-money-bill-transfer"
                />
              </div>
            </div>
            <div className="revenue-manager-content-header">
              <h4></h4>
              <h4>No.</h4>
              <h4>شماره</h4>
              <h4>حالت</h4>
              <h4>کارمند</h4>
              <h4>مدیر</h4>
              <h4>زمان.فعال</h4>
              <h4></h4>
              <h4>زمان.مسدود</h4>
              <h4></h4>
              <h4>مجموع</h4>
              <h4>تخفیفات</h4>
              <h4>%تخفیفات</h4>
              <h4>خیرات</h4>
              <h4>زکات</h4>
              <h4>مقدار روند</h4>
              <h4>بیشتر</h4>
            </div>
            <div className="revenue-manager-content">
              {revenue?.map((revenue, key) => (
                <div className="revenue-manager-map">
                  <h4></h4>
                  <h4>{key + 1}</h4>
                  <h4>{revenue.id}</h4>
                  <select
                    value={revenue.active}
                    disabled={revenue.active == true ? false : true}
                    className={
                      revenue.active
                        ? "revenue-manager-select-active"
                        : "revenue-manager-select-deactive"
                    }
                    onChange={(res) => {
                      if (res.target.value === true) {
                        alert("باز شدن صندوق های بسته شده امکان پذیر نیست.");
                      } else {
                        setEditRevenue(revenue)
                        AlertingRef.current.Opener();
                      }
                    }}
                  >
                    <option value="true">باز</option>
                    <option value="false">بسته</option>
                  </select>
                  <h4>{revenue.employee_name}</h4>
                  <h4>{revenue.username}</h4>
                  <h5>{revenue.created.slice(0, 10)}</h5>
                  <h5>
                    {revenue.start_time && revenue.start_time.slice(0, 5)}
                  </h5>
                  <h5>{revenue.start_end && revenue.start_end_date}</h5>
                  <h5>{revenue.start_end && revenue.start_end.slice(0, 5)}</h5>
                  <h4>{revenue.total_value}</h4>
                  <h4>{revenue.discount_money_value}</h4>
                  <h4>{revenue.discount_percent_value}</h4>
                  <h4>{revenue.khairat_value}</h4>
                  <h4>{revenue.zakat_value}</h4>
                  <h4>{revenue.rounded_value}</h4>
                  <RevenueInfo revenue={revenue} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
