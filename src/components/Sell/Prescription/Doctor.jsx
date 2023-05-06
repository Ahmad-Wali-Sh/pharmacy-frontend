import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function Doctor({ button, title, icon, Update }) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const ModalStyles = {
    content: {
      backgroundColor: "rgb(30,30,30)",
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const DOCOTOR_URL = import.meta.env.VITE_DOCTOR;

  const [companyLength, setCompanyLength] = React.useState([])

  React.useEffect(()=> {
      axios
          .get(DOCOTOR_URL)
          .then((res) => setCompanyLength(res.data.length))
          .catch((err) => console.log(err))
  },[])

  const SubmitForm = (data) => {
    const DoctorForm = new FormData();
    DoctorForm.append("name", data.name);
    DoctorForm.append("code", data.code);
    DoctorForm.append("last_name", data.last_name);
    DoctorForm.append("expertise", data.expertise);
    DoctorForm.append("contact_number", data.contact_number);
    DoctorForm.append("email", data.email);
    DoctorForm.append("workplace", data.workplace);
    DoctorForm.append("work_time", data.work_time);
    DoctorForm.append("home_address", data.home_address);
    DoctorForm.append("discription", data.discription);

    axios
      .post(DOCOTOR_URL, DoctorForm)
      .then((e) => {
        if (button == 2) {
          registerModalCloser();
          Update();
        }
        toast.success("Data Updated Successfuly.");
        console.log(e.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Check Your Input And Try Again!");
      });
  };
  return (
    <>
      {button == 1 && (
        <div className="purchase-card" onClick={registerModalOpener}>
          <div>
            <h3>{title}</h3>
            <div>{companyLength}</div>
          </div>
          <div>
            <i className={icon}></i>
          </div>
        </div>
      )}
      {button == 2 && (
        <div className="plus-box" onClick={registerModalOpener}>
          <div className="plus">
          <i class="fa-solid fa-plus"></i>
          </div>
        </div>
      )}
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>ثبت داکتر</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <form className="company">
          <div className="company">
            <div className="company-form">
              <label>نام:</label>
              <input type="text" {...register("name")} />
              <label>تخلص:</label>
              <input type="text" {...register("last_name")} />
              <label>متخصص:</label>
              <input type="text" {...register("expertise")} />
              <label>کد:</label>
              <input type="text" {...register("code")} />
              <label>تماس:</label>
              <input type="text" {...register("contact_number")} />
              <label>ایمیل:</label>
              <input type="email" {...register("email")} />
              <label>کار:</label>
              <input type="text" {...register("workplace")} />
              <label>ساعت کاری:</label>
              <input
                type="text"
                {...register("work_time")}
              />
              <label>آدرس خانه:</label>
              <input type="text" {...register("home_address")} />
              <div></div>
              <div></div>

              <label>توضیحات:</label>
              <input type="text" {...register("discription")} className="doctor-discription" />
              
            </div>
            <div className="company-submit">
              <input
                onClick={handleSubmit(SubmitForm)}
                type="submit"
                value="ثبت داکتر"
              />
              <input type="reset" value="ریسیت" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Doctor;
