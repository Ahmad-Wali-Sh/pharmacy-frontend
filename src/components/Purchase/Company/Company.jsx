import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function Company({ button, title, icon, Update }) {
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

  const COMPANIES_URL = import.meta.env.VITE_PHARM_COMPANIES;

  const [companyLength, setCompanyLength] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(COMPANIES_URL)
      .then((res) => setCompanyLength(res.data.length))
      .catch((err) => console.log(err));
  }, []);

  const SubmitForm = (data) => {
    const CompanyForm = new FormData();
    CompanyForm.append("name", data.name);
    CompanyForm.append("ceo", data.ceo);
    CompanyForm.append("ceo_phone", data.ceo_phone);
    CompanyForm.append("manager", data.manager);
    CompanyForm.append("manager_phone", data.manager_phone);
    CompanyForm.append("visitor", data.visitor);
    CompanyForm.append("visitor_phone", data.visitor_phone);
    CompanyForm.append("companies", data.companies);
    CompanyForm.append("company_phone_1", data.company_phone_1);
    CompanyForm.append("company_phone_2", data.company_phone_2);
    CompanyForm.append("company_online", data.company_online);
    CompanyForm.append("address", data.address);
    CompanyForm.append("description", data.description);

    axios
      .post(COMPANIES_URL, CompanyForm)
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
      {button == 3 && (
        <div onClick={registerModalOpener}>
          <i class="fa-solid fa-circle-info"></i>
        </div>
      )}
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>ثبت شرکت</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <form className="company">
          <div className="company">
            <div className="company-form">
              <label>نام شرکت:</label>
              <input type="text" {...register("name")} required />
              <div></div>
              <div></div>
              <label>رئیس:</label>
              <input type="text" {...register("ceo")} />
              <label>تماس رئیس:</label>
              <input type="text" {...register("ceo_phone")} />
              <label>مدیر:</label>
              <input type="text" {...register("manager")} />
              <label>تماس مدیر:</label>
              <input type="text" {...register("manager_phone")} />
              <label>وزیتور:</label>
              <input type="text" {...register("visitor")} />
              <label>تماس وزیتور:</label>
              <input type="text" {...register("visitor_phone")} />
              <label>شرکت ها:</label>
              <input
                type="text"
                className="compaines-input"
                {...register("companies")}
              />
              <label>تماس 1:</label>
              <input type="text" {...register("company_phone_1")} />
              <label>تماس 2:</label>
              <input type="text" {...register("company_phone_2")} />
              <label>آنلاین:</label>
              <input type="text" {...register("company_online")} />
              <label>آدرس:</label>
              <input type="text" {...register("address")} />
              <label>توضیحات:</label>
              <textarea
                type="text"
                className="company-form-description"
                {...register("description")}
              ></textarea>
            </div>
            <div className="company-submit">
              <input
                onClick={handleSubmit(SubmitForm)}
                type="submit"
                value="ثبت شرکت"
              />
              <input type="reset" value="ریسیت" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Company;
