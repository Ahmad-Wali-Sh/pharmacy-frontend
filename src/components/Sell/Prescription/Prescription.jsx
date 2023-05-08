import Modal from "react-modal";
import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingDNA from "../../PageComponents/LoadingDNA";
import SelectMedician from "../../Purchase/Entrance/SelectMedician";
import PrescriptionThroughEntry from "./PrescriptionThroughEntry";
import Doctor from "./Doctor";
import Patient from "./Patient";

export default function Prescription(props) {
  /* Modal */

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

  /* Form Hook */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* AutoComplete Search */

  const AutoCompleteStyle = {
    height: "1.5rem",
    borderRadius: "1rem",
    fontSize: "14px",
    backgroundColor: "rgb(34, 34, 34)",
    color: "white",
    border: "none",
    hoverBackgroundColor: "grey",
    zIndex: "2",
    overflow: "scroll",
  };

  const [autoCompleteData, setAutoCompleteData] = React.useState({
    patient: "",
    doctor: "",
    medician: [],
  });

  function AutoCompleteHandle(data) {
    setAutoCompleteData({
      ...autoCompleteData,
      medician: data,
    });
  }

  /* CRUD */

  /* Links */

  const PRESCRIPTION_URL = import.meta.env.VITE_PRESCRIPTION;
  const PRESCRIPTION_THOURGH_URL = import.meta.env.VITE_PRESCRIPTION_THROUGH;
  const DEPARTMENT_URL = import.meta.env.VITE_DEPARTMENT;
  const PATIENT_URL = import.meta.env.VITE_PATIENT;
  const DOCTOR_URL = import.meta.env.VITE_DOCTOR;
  const COUNTRY_URL = import.meta.env.VITE_COUNTRY;
  const KIND_URL = import.meta.env.VITE_KIND;
  const PHARM_GROUB_URL = import.meta.env.VITE_PHARM_GROUB;

  /* States */

  const [country, setCountry] = React.useState([]);
  const [kind, setKind] = React.useState([]);
  const [pharmGroub, setPharmGroub] = React.useState([]);
  const [department, setDepartment] = React.useState([]);
  const [patient, setPatient] = React.useState([]);
  const [submited, setSubmited] = React.useState(false);
  const [patientName, setPatientName] = React.useState('')
  const [doctorName, setDoctorName] = React.useState('')
  const [doctor, setDoctor] = React.useState([]);
  const [prescription, setPrescription] = React.useState([]);
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [prescriptionThrough, setPrescriptionThrough] = React.useState([])
  const [report, setReport] = React.useState({
    total: 0,
    total_interest: 0,
    number: 0,
    sell_total: 0,
    purchase_total: 0,
  });

  function registerModalOpener() {
    setRegisterModalOpen(true);
    axios
      .get(PATIENT_URL)
      .then((res) => setPatient(res.data))
      .catch((err) => console.log(err));
    axios
      .get(DOCTOR_URL)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.log(err));

  }

  function registerModalCloser() {
    setRegisterModalOpen(false);
  }


  React.useEffect(() => {
      doctor.map((doctor) => 
        doctor.id == prescription.doctor ? setDoctorName(doctor.name) : ""
      )

      patient.map((patient) =>
      patient.id == prescription.name ? setPatientName(patient.name) : ""
    );

  }, [prescription])

  /* Requests */

  React.useEffect(() => {
    axios
      .get(COUNTRY_URL)
      .then((result) => setCountry(result.data))
      .catch((e) => console.log(e));
    axios
      .get(KIND_URL)
      .then((result) => setKind(result.data))
      .catch((e) => console.log(e));
    axios
      .get(PHARM_GROUB_URL)
      .then((result) => setPharmGroub(result.data))
      .catch((e) => console.log(e));

    axios
      .get(DEPARTMENT_URL)
      .then((res) => setDepartment(res.data))
      .catch((err) => console.log(err));

    axios
      .get(PATIENT_URL)
      .then((res) => setPatient(res.data))
      .catch((err) => console.log(err));
    axios
      .get(DOCTOR_URL)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.log(err));
  }, []);

  /* Handlers and Submiting */

  const PrescriptionSubmit = (data) => {
    const PrescriptionForm = new FormData();
    PrescriptionForm.append("name", autoCompleteData.patient);
    PrescriptionForm.append("doctor", autoCompleteData.doctor);
    PrescriptionForm.append("department", data.department);
    PrescriptionForm.append("round_number", data.round_number);
    PrescriptionForm.append("discount_money", data.discount_money);
    PrescriptionForm.append("discount_percent", data.discount_percent);
    PrescriptionForm.append("zakat", data.zakat);
    PrescriptionForm.append("khairat", data.khairat);
    PrescriptionForm.append("prescription_number", prescription.prescription_number ? prescription.prescription_number : data.prescription_number);



    if (submited == false) {
      axios
        .post(PRESCRIPTION_URL, PrescriptionForm)
        .then((res) => {
          console.log(res.data);
          setPrescription(res.data);
          setSubmited(true);
          toast.success("Data Submited Successfuly.");
        })
        .catch((err) =>{
           console.log(err)
           toast.error("Check Your Input And Try Again!");});
    }

    if (submited == true) {
      axios
        .patch(PRESCRIPTION_URL + prescription.id + "/", PrescriptionForm)
        .then((res) => {
          console.log(res.data);
          setPrescription(res.data);
          toast.success("Data Updated Successfuly.");
        })
        .catch((err) => {
          console.log(err)
          toast.error("Check Your Input And Try Again!")
        });
    }
  };

  const PrescriptionThrough = (data) => {
    const PrescritptionThroughForm = new FormData();
    PrescritptionThroughForm.append("quantity", data.quantity);
    PrescritptionThroughForm.append("each_price", data.each_price);
    PrescritptionThroughForm.append("medician", autoCompleteData.medician.id);
    PrescritptionThroughForm.append("prescription", prescription.id);

    axios
      .post(PRESCRIPTION_THOURGH_URL, PrescritptionThroughForm)
      .then((res) => {
        console.log(res.data)
        setPrescriptionThrough((prev) => [...prev, res.data])
        toast.info("Item Added.");
      })
      .catch((err) => {
        console.log(err)
        toast.error("Check Your Input And Try Again!")
      });
  };

  const SearchSubmit = (data) => {
    ResetForm();
    axios
      .get(PRESCRIPTION_URL + '?prescription_number=' + data.number)
      .then((res) => {
        setPrescription(res.data[0] ? res.data[0] : []);
        console.log(res.data);
        setSubmited(true);
        {res.data[0] ? toast.success("Search Was Successful.") : ""}
          axios
            .get(PRESCRIPTION_THOURGH_URL + "?prescription=" + res.data[0].id )
            .then((res) => {setPrescriptionThrough(res.data)
            console.log(res)
            })
      .catch((err) => console.log(err))
      })
      .catch((err) => {
        console.log(err)
        toast.error("Check Your Input And Try Again!")
      });
  };

  const ResetForm = () => {
      document.getElementById('Myform').reset()
      setPrescription("")
      setSubmited(false)
      setPrescriptionThrough([])
      setPatientName('')
      setDoctorName('')
  }

  function UpdateUI() {
    setPrescriptionThrough([]);
    axios
      .get(PRESCRIPTION_THOURGH_URL + "?prescription=" + prescription.id)
      .then((res) => setPrescriptionThrough(res.data))
      .catch((err) => console.log(err));
  }
  function UpdateChunk() {
    axios
      .get(PRESCRIPTION_THOURGH_URL + "?prescription=" + prescription.id)
      .then((res) => setPrescriptionThrough(res.data))
      .catch((err) => console.log(err));
  }

  function UpdateDoctorsPatient() {
    axios
      .get(DOCTOR_URL)
      .then((result) => setDoctor(result.data))
      .catch((e) => console.log(e));

      axios
      .get(PATIENT_URL)
      .then((res) => setPatient(res.data))
      .catch((err) => console.log(err));
  }

  const CreateNewHandle = (data) => {
    console.log(data)

    setTimeout(() => {
      setRegisterModalOpen(true)
    }, 100)

    const PrescriptionForm = new FormData()
    PrescriptionForm.append("name", autoCompleteData.patient);
    PrescriptionForm.append("doctor", autoCompleteData.doctor);
    PrescriptionForm.append("department", prescription.department);
    PrescriptionForm.append("round_number", prescription.round_number);
    PrescriptionForm.append("discount_money", prescription.discount_money);
    PrescriptionForm.append("discount_percent", prescription.discount_percent);
    PrescriptionForm.append("zakat", prescription.zakat);
    PrescriptionForm.append("khairat", prescription.khairat);
    PrescriptionForm.append("prescription_number", prescription.prescription_number ? prescription.prescription_number : data.prescription_number);

    console.log(PrescriptionForm)
    // axios
    //     .post(PRESCRIPTION_URL, PrescriptionForm)
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err))
  }

  return (
    <>
      <div className="purchase-card" onClick={registerModalOpener}>
        <div>
          <h3>{props.title}</h3>
          <div>
            <LoadingDNA />
          </div>
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
            <h3>ثبت نسخه</h3>
            <div className="modal-close-btn" onClick={registerModalCloser}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div className="prescription-box">
            <div className="entrance-report">
              <div className="entrance-report-header">راپور</div>
              <div className="entrance-report-body">
                <div className="entrance-report-map-box">
                  <label>تعداد اقلام</label>
                  <label>{report.number}</label>
                </div>
                <div className="entrance-report-map-box">
                  <label>مجموع فایده </label>
                  <label>{report.total_interest}</label>
                </div>
                <div className="entrance-report-map-box">
                  <label>مجموع خرید </label>
                  <label>{report.purchase_total}</label>
                </div>
                <div className="entrance-report-map-box">
                  <label>مجموع فروش </label>
                  <label>{report.sell_total}</label>
                </div>
                <div className="entrance-report-map-box">
                  <label>مجموع</label>
                  <label>{report.total}</label>
                </div>
              </div>
            </div>
            <form className="prescription-prescription" id="Myform">
              <label>نوع نسخه:</label>
              <select {...register("department")} defaultValue={prescription.id}>
                <option value={prescription.department} selected hidden>
                  {department.map(
                    (depart) => depart.id == prescription.department && depart.name
                  )}
                </option>
                {department.map((depart) => (
                  <option value={depart.id}>{depart.name}</option>
                ))}
              </select>
              <label>نام مریض:</label>
              <div>
                <ReactSearchAutocomplete
                  items={patient}
                  onSelect={(item) =>
                    setAutoCompleteData({
                      ...autoCompleteData,
                      patient: item.id,
                    })
                  }
                  styling={AutoCompleteStyle}
                  showClear={false}
                  inputDebounce="10"
                  showIcon={false}
                  className="autoComplete"
                  placeholder={patientName}
                />
                <Patient button={2} Update={UpdateDoctorsPatient} />
              </div>
              <label>نام داکتر:</label>
              <div>
                <ReactSearchAutocomplete
                  items={doctor}
                  styling={AutoCompleteStyle}
                  onSelect={(item) =>
                    setAutoCompleteData({
                      ...autoCompleteData,
                      doctor: item.id,
                    })
                  }
                  showClear={false}
                  inputDebounce="10"
                  showIcon={false}
                  placeholder={doctorName}
                />
                <Doctor button={2} Update={UpdateDoctorsPatient} />
              </div>
              <label>نمبر روند:</label>
              <input
                type="text"
                {...register("round_number")}
                defaultValue={prescription.round_number}
              />
              <label>شماره:</label>
              <input
                required
                type="text"
                {...register("prescription_number")}
                defaultValue={prescription.prescription_number}
              />
              <label>ش.نسخه:</label>
              <div className="flex">
                <input
                  value={prescription.id}
                  type="text"
                  {...register("prescription_id")}
                  disabled
                />
                <form className="search-form">
                  <input type="text" {...register("number")} />
                  <div
                    className="search-button-box"
                    onClick={handleSubmit(SearchSubmit)}
                  >
                    <i class="fa-brands fa-searchengin"></i>
                  </div>
                </form>
              </div>

              <label>تخفیف:</label>
              <input
                type="text"
                {...register("discount_money")}
                defaultValue={prescription.discount_money}
              />
              <label>تخفیف %:</label>
              <input
                type="text"
                {...register("discount_percent")}
                defaultValue={prescription.discount_percent}
              />
              <div></div>
              <div></div>
              <label>ذکات:</label>
              <input
                type="text"
                {...register("zakat")}
                defaultValue={prescription.zakat}
              />
              <label>خیرات:</label>
              <input
                type="text"
                {...register("khairat")}
                defaultValue={prescription.khairat}
              />
              <div></div>
              <div className="entrance-buttons">
                <input type="reset" value="Reset" onClick={ResetForm}></input>
                <input
                  type="submit"
                  value={submited ? "Update" : "Submit"}
                  onClick={handleSubmit(PrescriptionSubmit)}
                ></input>
                <input
                  type='button'
                  value="Create New"
                  className="prescription-create-button"
                  onClick={handleSubmit(CreateNewHandle)}
                ></input>
              </div>
            </form>

            <form className="prescription-through">
              <label>قلم:</label>
              <div className="entrance-through-medician-input">
                <SelectMedician
                  kind={kind}
                  country={country}
                  pharmGroub={pharmGroub}
                  selectAutoCompleteData={AutoCompleteHandle}
                />
              </div>
              <label>تعداد:</label>
              <input type="text" {...register("quantity")} />
              <label>قیمت فی:</label>
              <input type="text" {...register("each_price")} />
              <label>
                <h5> ت.د.پاکت:</h5>
              </label>
              <input type="text" value={autoCompleteData.medician.no_pocket} />
              <div className="prescription-button">
                
                <input
                  type="submit"
                  value="⤵ Add"
                  className="prescription-add-button"
                  onClick={handleSubmit(PrescriptionThrough)}
                ></input>
              </div>
            </form>

            <form className="prescription-medician-map">
              <div className="prescription-medician-header">
                <label></label>
                <label>No</label>
                <label>قلم</label>
                <label>تعداد</label>
                <label>حذف</label>
              </div>
              <div className="prescription-medicine">
                {prescriptionThrough.map((through, key) => (
                  <PrescriptionThroughEntry
                    through={through}
                    keyValue={through.id}
                    num={key}
                    kind={kind}
                    country={country}
                    pharmGroub={pharmGroub}
                    UpdateUI={UpdateUI}
                    UpdateChunk={UpdateChunk}
                  />
                ))}
              </div>
            </form>
          </div>
        </div>
      </Modal>
      
    </>
  );
}
