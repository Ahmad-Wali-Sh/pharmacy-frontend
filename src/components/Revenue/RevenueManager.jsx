import Modal from "react-modal";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import NewRevenue from "./NewRevenue";
import RevenueInfo from "./RevenueInfo";

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

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const REVENUE_URL = import.meta.env.VITE_REVENUE;
  const USERS_URL = import.meta.env.VITE_USERS
  const REVENUE_THROUGH_URL = import.meta.env.VITE_REVENUE_THROUGH;
  const PRESCRIPTION_URL = import.meta.env.VITE_PRESCRIPTION;

  const [revenue, setRevenue] = React.useState([]);
  const [users, setUsers] = React.useState([])
  const [prescription, setPrescription] = React.useState([]);
  const [revenueTrough, setRevenueThrough] = React.useState([]);


  React.useEffect(()=>{

    axios.get(USERS_URL).then((res) => setUsers(res.data))

  },[])



  const RevenueSearch = (data) => {
    setRevenue([])
    axios
      .get(REVENUE_URL + `?created_after=${data.created}&created_before=${data.created}&active=${data.active}&employee=${data.employee}&revenue_through__prescription_number=${data.revenue_through}`)
      .then((res) => {
        setRevenue(res.data)
      })
  }


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
              <select className="revenue-manager-inputs" {...register('active')}>
                <option value=""></option>
                <option value="true">باز</option>
                <option value="false">بسته</option>
              </select>
              <label>کاربر:</label>
              <select className="revenue-manager-inputs" {...register('employee')}>
                <option value=""></option>
                {
                  users.map((user) => (
                    <option value={user.id}>{user.username}</option>
                  ))
                }
              </select>
              <label>تاریخ:</label>
              <input type="date" className="revenue-manager-inputs" {...register('created')}></input>
              <label>نسخه:</label>
              <input className="revenue-manager-inputs" {...register('revenue_through')}></input>
              <div className="revenue-manager-buttons-box">
                  <button type="button" className="revenue-manager-buttons" onClick={handleSubmit(RevenueSearch)}>
                  <i class="fa-brands fa-searchengin"></i>
                  </button>
                  <NewRevenue users={users}/>
                  <button type="button" className="revenue-manager-buttons">
                  <i class="fa-solid fa-file-excel"></i>
                  </button>
              </div>
            </div>
            <div className="revenue-manager-content-header">
              <h4></h4>
              <h4>No.</h4>
              <h4>شماره</h4>
              <h4>حالت</h4>
              <h4>کارمند</h4>
              <h4>مدیر</h4>
              <h4>تاریخ</h4>
              <h4>زمان.فعال</h4>
              <h4>زمان.بسته</h4>
              <h4>مجموع</h4>
              <h4>تخفیفات</h4>
              <h4>خیرات</h4>
              <h4>ذکات</h4>
              <h4>مقدار روند</h4>
              <h4>بیشتر</h4>
            </div>
            <div className="revenue-manager-content">
              {
                revenue.map((revenue, key)=>
                  <div className="revenue-manager-map">
                    <h4></h4>
                    <h4>{key + 1}</h4>
                    <h4>{revenue.id}</h4>
                    <select defaultValue={revenue.active} className={revenue.active ? "revenue-manager-select-active" : "revenue-manager-select-deactive"}
                    onChange={(res) => {
                        const RevenueForm = new FormData()
                        RevenueForm.append("active", res.target.value)
                        axios.patch(REVENUE_URL + revenue.id + "/", RevenueForm)
                            .then((res) => {
                              handleSubmit(RevenueSearch)
                            })
                    }}
                    >
                      <option value="true">باز</option>
                      <option value='false'>بسته</option>
                    </select>
                    <h4>{revenue.employee_name}</h4>
                    <h4>{revenue.username}</h4>
                    <h5>{(revenue.created).slice(0,10)}</h5>
                    <h5>{revenue.start_time && (revenue.start_time).slice(0,5)}</h5>
                    <h5>{revenue.start_end && (revenue.start_end).slice(0,5)}</h5>
                    <h4>{revenue.total}</h4>
                    <h4>{revenue.discount}</h4>
                    <h4>{revenue.khairat}</h4>
                    <h4>{revenue.zakat}</h4>
                    <h4>{revenue.rounded}</h4>
                    <RevenueInfo revenue={revenue}/>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
