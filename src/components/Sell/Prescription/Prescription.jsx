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
      zIndex: "2",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
    },
  };

  const popUpStyle = {
    content: {
      backgroundColor: "rgb(120,120,120)",
      border: "none",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "0px",
      margin: "0px",
      zIndex: "100",
      width: "30%",
      height: "30%",
      top: "30%",
      left: "35%",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
    },
  };

  /* Form Hook */

  const {
    register,
    handleSubmit,
    reset,
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
  const [patientName, setPatientName] = React.useState("");
  const [doctorName, setDoctorName] = React.useState("");
  const [doctor, setDoctor] = React.useState([]);
  const [prescription, setPrescription] = React.useState([]);
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [prescriptionThrough, setPrescriptionThrough] = React.useState([]);
  const [report, setReport] = React.useState({
    total: 0,
    number: 0,
  });
  const [departmentSelected, setDepartmentSelected] = React.useState("");

  function registerModalOpener() {
    ResetForm();
    reset({});
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
    ResetForm();
    setRegisterModalOpen(false);
  }

  React.useEffect(() => {
    doctor.map((doctor) =>
      doctor.id == prescription.doctor ? setDoctorName(doctor.name) : ""
    );

    patient.map((patient) =>
      patient.id == prescription.name ? setPatientName(patient.name) : ""
    );
  }, [prescription]);

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

  const [popUpOpen, setpopUpOpen] = React.useState(false);

  const popUpCloser = () => {
    setpopUpOpen(false);
  };
  const popUpOpener = () => {
    setpopUpOpen(true);
  };

  const PrescriptionSubmit = (data) => {
    const PrescriptionForm = new FormData();
    PrescriptionForm.append("name", autoCompleteData.patient);
    PrescriptionForm.append("doctor", autoCompleteData.doctor);
    PrescriptionForm.append(
      "department",
      data.department ? data.department : departmentSelected.id
    );
    PrescriptionForm.append("round_number", data.round_number);
    PrescriptionForm.append(
      "discount_money",
      data.discount_money
        ? data.discount_money
        : departmentSelected.discount_money
    );
    PrescriptionForm.append(
      "discount_percent",
      data.discount_percent
        ? data.discount_percent
        : departmentSelected.discount_percent
    );
    PrescriptionForm.append("zakat", data.zakat);
    PrescriptionForm.append("khairat", data.khairat);
    PrescriptionForm.append(
      "prescription_number",
      prescription.prescription_number
        ? prescription.prescription_number
        : data.prescription_number
    );

    if (submited == false) {
      axios
        .post(PRESCRIPTION_URL, PrescriptionForm)
        .then((res) => {
          console.log(res.data);
          setPrescription(res.data);
          setSubmited(true);
          toast.success("Data Submited Successfuly.");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Check Your Input And Try Again!");
        });
    }

    if (submited == true) {
      console.log(data.discount_percent);
      axios
        .patch(PRESCRIPTION_URL + prescription.id + "/", PrescriptionForm)
        .then((res) => {
          setPrescription(res.data);
          toast.success("Data Updated Successfuly.");
          UpdateChunk();
          UpdateUI();
          console.log(res.data);
          console.log(PrescriptionForm);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Check Your Input And Try Again!");
        });
    }
  };

  const [excatTrough, setExactThrough] = React.useState("");

  const PrescriptionThrough = (data) => {
    const PrescritptionThroughForm = new FormData();
    PrescritptionThroughForm.append("quantity", data.quantity);
    PrescritptionThroughForm.append(
      "each_price",
      autoCompleteData.medician.price
    );
    PrescritptionThroughForm.append("medician", autoCompleteData.medician.id);
    PrescritptionThroughForm.append("prescription", prescription.id);

    let result = true;
    const Conditional = () => {
      prescriptionThrough.map((prescription) => {
        prescription.medician == autoCompleteData.medician.id &&
          ((result = false), setExactThrough(prescription));

        return result;
      });
      return result;
    };

    if (Conditional() == true) {
      axios
        .post(PRESCRIPTION_THOURGH_URL, PrescritptionThroughForm)
        .then((res) => {
          console.log(res.data);
          setPrescriptionThrough((prev) => [...prev, res.data]);
          toast.info("Item Added.");
          setTrigger((prev) => prev + 1);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Check Your Input And Try Again!");
        });
    }
    if (Conditional() == false) {
      popUpOpener();
    }
  };

  const MedicineIncluder = (data) => {
    const MedicianUpdateForm = new FormData();
    MedicianUpdateForm.append(
      "quantity",
      excatTrough && parseInt(excatTrough.quantity) + parseInt(data.quantity)
    );

    axios
      .patch(
        PRESCRIPTION_THOURGH_URL + excatTrough.id + "/",
        MedicianUpdateForm
      )
      .then(() => {
        toast.success("Data Updated Successfuly.");
        UpdateChunk();
        UpdateUI();
        popUpCloser();
      })
      .catch(() => toast.error("Check Your Input And Try Again!"));
  };

  const SearchSubmit = (data) => {
    ResetForm();
    axios
      .get(PRESCRIPTION_URL + "?prescription_number=" + data.number)
      .then((res) => {
        setPrescription(res.data[0] ? res.data[0] : []);
        console.log(res.data);
        setSubmited(true);
        {
          res.data[0] ? toast.success("Search Was Successful.") : "";
        }
        axios
          .get(DEPARTMENT_URL + res.data[0].department)
          .then((res) => setDepartmentSelected(res.data))
          .catch((err) => console.log(err));
        axios
          .get(PRESCRIPTION_THOURGH_URL + "?prescription=" + res.data[0].id)
          .then((res) => {
            setPrescriptionThrough(res.data);
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Check Your Input And Try Again!");
      });
  };

  const [selectTrigger, setTrigger] = React.useState(1);

  React.useEffect(() => {
    if (props.trigger) {
      registerModalOpener();
    }
    ResetForm();
    if (props.button == 1 && registerModalOpen) {
      axios
        .get(
          PRESCRIPTION_URL +
            "?prescription_number=" +
            props.prescription.prescription_number
        )
        .then((res) => {
          setPrescription(res.data[0] ? res.data[0] : []);
          setSubmited(true);
          {
            res.data[0] ? toast.success("Search Was Successful.") : "";
          }
          axios
            .get(PRESCRIPTION_THOURGH_URL + "?prescription=" + res.data[0].id)
            .then((res) => {
              setPrescriptionThrough(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
          toast.error("Check Your Input And Try Again!");
        });
    }
  }, [registerModalOpen, props.trigger]);

  const ResetForm = () => {
    setPrescription([]);
    setSubmited(false);
    setPrescriptionThrough([]);
    setPatientName("");
    setDoctorName("");
    setDepartmentSelected([]);
    reset({});
  };

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
    console.log(data);

    const PrescriptionForm = new FormData();
    PrescriptionForm.append("name", autoCompleteData.patient);
    PrescriptionForm.append("doctor", autoCompleteData.doctor);
    PrescriptionForm.append("department", prescription.department);
    PrescriptionForm.append("round_number", prescription.round_number);
    PrescriptionForm.append("discount_money", prescription.discount_money);
    PrescriptionForm.append("discount_percent", prescription.discount_percent);
    PrescriptionForm.append("zakat", prescription.zakat);
    PrescriptionForm.append("khairat", prescription.khairat);

    axios
      .post(PRESCRIPTION_URL, PrescriptionForm)
      .then((res) => {
        console.log(res.data);
        setPrescription(res.data);
        prescriptionThrough.map((item) => {
          const PrescriptionThroughForm = new FormData();
          PrescriptionThroughForm.append("quantity", item.quantity);
          PrescriptionThroughForm.append("each_price", item.each_price);
          PrescriptionThroughForm.append("medician", item.medician);
          PrescriptionThroughForm.append("prescription", res.data.id);
          setPrescriptionThrough([]);
          axios
            .post(PRESCRIPTION_THOURGH_URL, PrescriptionThroughForm)
            .then((res) => {
              console.log(res.data);
              setPrescriptionThrough((prev) => [...prev, res.data]);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    Reporting();
  }, [prescriptionThrough]);

  const Reporting = () => {
    const totalCalculate = () => {
      let result = 0;
      prescriptionThrough.map((item) => {
        result += item.each_price * item.quantity;
        return result;
      });
      return result;
    };

    const totalToSaleCalculate = () => {
      let result =
        totalCalculate() -
        (prescription.discount_money +
          (totalCalculate() * prescription.discount_percent) / 100) -
        prescription.zakat -
        prescription.khairat;
      return result;
    };
    const CellingHandler = () => {
      const cellingStart = departmentSelected.celling_start;
      const total = Math.round(totalToSaleCalculate());
      const lastDigit = Number(String(total).slice(-1));
      let result = 0;
      if (total > cellingStart && lastDigit >= 3 && cellingStart != 0) {
        if (lastDigit == 3) {
          result = Math.ceil(total) + 7 - total;
        }
        if (lastDigit == 4) {
          result = Math.ceil(total) + 6 - total;
        }
        if (lastDigit == 5) {
          result = Math.ceil(total) + 5 - total;
        }
        if (lastDigit == 6) {
          result = Math.ceil(total) + 4 - total;
        }
        if (lastDigit == 7) {
          result = Math.ceil(total) + 3 - total;
        }
        if (lastDigit == 8) {
          result = Math.ceil(total) + 2 - total;
        }
        if (lastDigit == 9) {
          result = Math.ceil(total) + 1 - total;
        }
      }
      const RoundForm = new FormData();
      RoundForm.append("rounded_number", result);
      axios
        .patch(PRESCRIPTION_URL + prescription.id + "/", RoundForm)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      return result;
    };

    setReport({
      total: Math.round(totalCalculate()),
      number: prescriptionThrough.length,
      total_to_sale: Math.round(totalToSaleCalculate()) + CellingHandler(),
      rounded_number: CellingHandler(),
    });
  };

  const tabFormulate = () => {
    document.getElementById("number-in-factor-input").focus();
  };

  const departmentSubmit = () => {
    registerModalOpener();
    axios.get(DEPARTMENT_URL + props.department.id).then((res) => {
      const DepartmentForm = new FormData();
      DepartmentForm.append("name", autoCompleteData.patient);
      DepartmentForm.append("doctor", autoCompleteData.doctor);
      DepartmentForm.append("department", props.department.id);
      DepartmentForm.append("discount_money", res.data.discount_money);
      DepartmentForm.append("discount_percent", res.data.discount_percent);
      DepartmentForm.append("zakat", "");
      DepartmentForm.append("khairat", "");
      axios
        .post(PRESCRIPTION_URL, DepartmentForm)
        .then((res) => {
          console.log(res.data);
          setPrescription(res.data);
          setSubmited(true);
          toast.success("Data Submited Successfuly.");
          axios
            .get(DEPARTMENT_URL + props.department.id)
            .then((res) => setDepartmentSelected(res.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
          toast.error("Check Your Input And Try Again!");
        });
    });
    reset({});
  };

  const DepartmentHandler = (department) => {
    axios
      .get(DEPARTMENT_URL + department)
      .then((res) => {
        ResetForm();
        setDepartmentSelected("");
        setDepartmentSelected(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {props.button == undefined && (
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
      )}
      {props.button == 1 && (
        <div onClick={registerModalOpener}>
          <i class="fa-solid fa-circle-info"></i>
        </div>
      )}
      {props.button == 2 && (
        <div className="department-card" onClick={departmentSubmit}>
          <h3>{props.department.name}</h3>
        </div>
      )}
      {registerModalOpen == true && (
        <Modal
          style={ModalStyles}
          isOpen={registerModalOpen}
          onRequestClose={registerModalCloser}
        >
          <Modal
            isOpen={popUpOpen}
            onRequestClose={popUpCloser}
            style={popUpStyle}
          >
            <>
              <div className="modal-header">
                <h3>!خطا</h3>
                <div className="modal-close-btn" onClick={popUpCloser}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>
              <div className="alert-box">
                <div className="alert-text-box">
                  <h4>این دوا قبلا ثبت شده است</h4>
                  <h4>آیا میخواهید به تعداد آن اضافه نمائید؟</h4>
                </div>
                <div className="alert-button-box">
                  <button onClick={handleSubmit(MedicineIncluder)}>بله</button>
                  <button onClick={popUpCloser}>نخیر</button>
                </div>
              </div>
            </>
          </Modal>
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
                    <label>{report.number}</label>
                    <label>:تعداد اقلام</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>{report.total}</label>
                    <label>:مجموع فروش</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>
                      {prescription.discount_money +
                        (report.total * prescription.discount_percent) / 100}
                    </label>
                    <label>:تخفیف</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>{prescription.khairat}</label>
                    <label>:خیرات</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>{prescription.zakat}</label>
                    <label>:ذکات</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>{report.total_to_sale}</label>
                    <label>:قابل پرداخت</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>{report.rounded_number}</label>
                    <label>:مقدار روند شده </label>
                  </div>
                </div>
              </div>
              <form className="prescription-prescription" id="Myform">
                <label>نوع نسخه:</label>
                <select
                  {...register("department")}
                  defaultValue={prescription.id}
                  onChange={(res) => {
                    DepartmentHandler(res.target.value);
                  }}
                >
                  <option value={prescription.department} selected hidden>
                    {department.map(
                      (depart) =>
                        depart.id == prescription.department && depart.name
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
                <label>شماره:</label>
                <input
                  required
                  type="text"
                  {...register("prescription_number")}
                  defaultValue={prescription.prescription_number}
                />
                <label>جستوجو:</label>
                <div className="flex">
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
                <div></div>
                <div></div>
                <label>تخفیف:</label>
                <input
                  type="text"
                  {...register("discount_money")}
                  defaultValue={
                    prescription.discount_money ||
                    departmentSelected.discount_money
                  }
                />
                <label>تخفیف %:</label>
                <input
                  type="text"
                  {...register("discount_percent")}
                  defaultValue={
                    prescription.discount_percent ||
                    departmentSelected.discount_percent
                  }
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
                    type="button"
                    value="Create New"
                    className="prescription-create-button"
                    onClick={handleSubmit(CreateNewHandle)}
                  ></input>
                </div>
              </form>

              <form className="prescription-through">
                <label>قلم:</label>
                <div className="entrance-through-medician-input">
                  {props.button != 1 && props.button != 2 && (
                    <SelectMedician
                      kind={kind}
                      country={country}
                      pharmGroub={pharmGroub}
                      selectAutoCompleteData={AutoCompleteHandle}
                      trigger={selectTrigger}
                      tabFormulate={tabFormulate}
                    />
                  )}
                  {props.button == 1 && (
                    <SelectMedician
                      kind={kind}
                      country={country}
                      pharmGroub={pharmGroub}
                      selectAutoCompleteData={AutoCompleteHandle}
                      trigger={selectTrigger}
                      tabFormulate={tabFormulate}
                    />
                  )}
                  {props.button == 2 && (
                    <SelectMedician
                      kind={kind}
                      country={country}
                      pharmGroub={pharmGroub}
                      selectAutoCompleteData={AutoCompleteHandle}
                      tabFormulate={tabFormulate}
                      trigger={selectTrigger}
                    />
                  )}
                </div>
                <label>تعداد:</label>
                <input
                  type="text"
                  {...register("quantity")}
                  id="number-in-factor-input"
                />
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
                  <label>No</label>
                  <label>قلم</label>
                  <label>قیمت فی</label>
                  <label>تعداد</label>
                  <label>قیمت کل</label>
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
      )}
    </>
  );
}
