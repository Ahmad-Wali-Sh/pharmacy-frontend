import axios from "axios";
import React from "react";
import Modal from "react-modal";
import Department from "./Prescription/Department";
import Doctor from "./Prescription/Doctor";
import Patient from "./Prescription/Patient";
import Prescription from "./Prescription/Prescription";

Modal.setAppElement("#root");

function Sell() {
  const DEPARTMENTS_URL = import.meta.env.VITE_DEPARTMENT;
  const [departments, setDepartments] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(DEPARTMENTS_URL)
      .then((res) => setDepartments(res.data))
      .catch((err) => console.log(err));
  }, []);

  const departmentUpdate = () => {
    axios
      .get(DEPARTMENTS_URL)
      .then((res) => setDepartments(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="purchase">
      <div className="purchase-box">
        <Prescription title="ثبت نسخه" icon="fa-solid fa-cart-arrow-down" />
        <Doctor title="ثبت داکتر" button={1} icon="fa-solid fa-user-doctor" />
        <Patient title="ثبت مریض" button={1} icon="fa-solid fa-bed" />
        <Department
          button={1}
          title="ثبت نوع نسخه"
          icon="fa-solid fa-bed"
          Update={departmentUpdate}
        />
      </div>
      <div className="sell-form">
        <div className="sell-department-buttons">
          {departments.map((depart) => (
            <Prescription button={2} department={depart} trigger={0} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sell;
