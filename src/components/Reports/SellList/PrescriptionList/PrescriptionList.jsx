import React from "react";
import Modal from "react-modal";
import DoctorList from "../DoctorList/DoctorList";
import PatientList from "../PatientList/PatientList";
import PrescriptionListMap from "./PrescriptionListMap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FixedSizeList as List } from "react-window";
import fileDownload from "js-file-download";

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

function PrescriptionList({ Closer }) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
    Closer();
  }
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const DEPARTMENT_URL = API + '/api/department/';
  const PRESCRIPTION_URL = API + '/api/prescription/';

  const [department, setDepartment] = React.useState([]);
  const [prescriptionList, setPrescriptionList] = React.useState([]);
  console.log(prescriptionList);

  React.useEffect(() => {
    axios
      .get(DEPARTMENT_URL)
      .then((res) => setDepartment(res.data))
      .catch((err) => console.log(err));
  }, []);

  const SearchHandle = (data) => {
    setPrescriptionList([]);
    axios
      .get(
        PRESCRIPTION_URL +
          `?prescription_number=${data.prescription_number}&department=${data.department}&created_after=${data.created_after}&created_before=${data.created_before}&name=${data.name}&doctor=${data.doctor}`
      )
      .then((res) => {
        setPrescriptionList(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  
  const resetHandle = () => {
    setPrescriptionList([]);
    setDepartment([])
  }

  const ExcelOutput = () => {
    fileDownload()
  }

  return (
    <>
      <div className="list-card" onClick={registerModalOpener}>
        <h3>فهرست نسخه ها</h3>
      </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>فهرست نسخه ها</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="list-items">
          <div></div>
          <DoctorList Closer={registerModalCloser} />
          <PatientList Closer={registerModalCloser} />
        </div>
        <div className="prescription-list-box">
          <div className="prescription-list-filter">
            <label>ش.نسخه:</label>
            <input type="text" {...register("prescription_number")} />
            <label>نوع نسخه:</label>
            <select {...register("department")}>
              {department.map((depart) => (
                <option value={depart.id}>{depart.name}</option>
              ))}
            </select>
            <div className="prescription-list-filter-dates">
              <label>از:</label>
              <input type="date" {...register("created_after")} />
              <label>تا:</label>
              <input type="date" {...register("created_before")} />
            </div>
            <label>مریض:</label>
            <input type="text" {...register("name")} />
            <label>داکتر:</label>
            <input type="text" {...register("doctor")} />
            <div className="prescription-list-filter-buttons">
              <input type="button" value="اکسل" onClick={ExcelOutput}/>
              <input type="button" value="ریسیت" onClick={resetHandle} />
              <input
                type="button"
                value="جستوجو"
                onClick={handleSubmit(SearchHandle)}
              />
            </div>
          </div>
          <div className="prescription-list-header">
            <h3>No</h3>
            <h3>شماره نسخه</h3>
            <h3>نوع نسخه</h3>
            <h3>مجموعه</h3>
            <h3>مریض</h3>
            <h3>داکتر</h3>
            <h3>ادویه</h3>
            <h3>بیشتر</h3>
          </div>
          <div className="prescription-list-map-box">
            {prescriptionList.map((prescription, key) => (
              <PrescriptionListMap
                data={prescription}
                num={key}
                department={department}
              />
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PrescriptionList;
