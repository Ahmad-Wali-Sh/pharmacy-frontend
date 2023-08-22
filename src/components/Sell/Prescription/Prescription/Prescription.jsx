import Modal from "react-modal";
import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingDNA from "../../../PageComponents/LoadingDNA";
import SelectMedician from "../../../Purchase/Entrance/SelectMedician";
import PrescriptionThroughEntry from "./PrescriptionThroughEntry";
import Doctor from "../Doctor";
import Patient from "../Patient";
import { useAuthUser } from "react-auth-kit";
import BigModal from "../../../PageComponents/Modals/BigModal";
import { useRef } from "react";
import {
  DepartButton,
  InfoButton,
  MainButton,
} from "../../../PageComponents/Buttons/Buttons";
import AlertModal from "../../../PageComponents/Modals/AlertModal";
import ExpiresMedicineModal from "./ExpiresMedicineModal";
import PrescriptionReportBox from "./PrescriptionReportBox";

export default function Prescription(props) {
  const PrescriptionModalRef = useRef(null);
  const SameMedicineAlertModalRef = useRef(null);
  const ExpiresMedicineModalRef = useRef(null);

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

  const PRESCRIPTION_URL = import.meta.env.VITE_PRESCRIPTION;
  const PRESCRIPTION_THOURGH_URL = import.meta.env.VITE_PRESCRIPTION_THROUGH;
  const DEPARTMENT_URL = import.meta.env.VITE_DEPARTMENT;
  const PATIENT_URL = import.meta.env.VITE_PATIENT;
  const DOCTOR_URL = import.meta.env.VITE_DOCTOR;
  const COUNTRY_URL = import.meta.env.VITE_COUNTRY;
  const KIND_URL = import.meta.env.VITE_KIND;
  const PHARM_GROUB_URL = import.meta.env.VITE_PHARM_GROUB;
  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;
  const MEDICIAN_WITH_URL = import.meta.env.VITE_MEDICIAN_WITH;
  const LAST_PRESCRIPTION_URL = import.meta.env.VITE_LAST_PRESCRIPTION;
  const MEDICINE_CONFLICT_URL = import.meta.env.VITE_MEDICIAN_CONFLICT;
  const user = useAuthUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [report, setReport] = React.useState({
    total: 0,
    number: 0,
  });
  const [autoCompleteData, setAutoCompleteData] = React.useState({
    patient: "",
    doctor: "",
    medician: [],
  });
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
  const [departmentSelected, setDepartmentSelected] = React.useState("");
  const [popUpOpen, setpopUpOpen] = React.useState(false);
  const [medicianWith, setMedicineWith] = React.useState([]);
  const [excatTrough, setExactThrough] = React.useState("");
  const [selectTrigger, setTrigger] = React.useState(1);
  const [file, setFile] = React.useState("");
  const [medicineConflict, setMedicineConflict] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    doctor.map((doctor) =>
      doctor.id == prescription.doctor ? setDoctorName(doctor.code_name) : ""
    );

    patient.map((patient) =>
      patient.id == prescription.name ? setPatientName(patient.code_name) : ""
    );
  }, [prescription]);

  React.useEffect(() => {
    axios
      .get(COUNTRY_URL)
      .then((result) => setCountry(result.data))
      .catch((e) => console.log(e));
    axios
      .get(KIND_URL)
      .then((result) => {
        setKind(result.data);
      })
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
      .get(MEDICINE_CONFLICT_URL)
      .then((res) => setMedicineConflict(res.data))
      .catch((err) => console.log(err));
  }, []);

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

  React.useEffect(() => {
    Reporting();
  }, [prescriptionThrough]);

  React.useEffect(() => {
    const RoundForm = new FormData();
    RoundForm.append("rounded_number", report.rounded_number);
    prescriptionThrough &&
      prescription.id &&
      axios
        .patch(PRESCRIPTION_URL + prescription.id + "/", RoundForm)
        .catch((err) => console.log(err));
  }, [prescriptionThrough]);

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

  const popUpCloser = () => {
    setpopUpOpen(false);
  };
  const popUpOpener = () => {
    setpopUpOpen(true);
  };

  function AutoCompleteHandle(data) {
    setAutoCompleteData({
      ...autoCompleteData,
      medician: data,
    });
  }

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
    PrescriptionForm.append("image", file ? file : "");
    PrescriptionForm.append("user", user().id);

    if (submited == false) {
      axios
        .post(PRESCRIPTION_URL, PrescriptionForm)
        .then((res) => {
          setPrescription(res.data);
          setSubmited(true);
          toast.success("Data Submited Successfuly.");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Check Your Input And Try Again!");
        });
    }

    const PrescriptionUpdate = new FormData();
    PrescriptionUpdate.append(
      "name",
      data.patient ? data.patient : autoCompleteData.patient
    );
    PrescriptionUpdate.append(
      "doctor",
      data.doctor ? data.doctor : autoCompleteData.doctor
    );
    PrescriptionUpdate.append(
      "department",
      data.department ? data.department : prescription.department
    );
    PrescriptionUpdate.append("round_number", data.round_number);
    PrescriptionUpdate.append(
      "discount_money",
      data.discount_money ? data.discount_money : prescription.discount_money
    );
    PrescriptionUpdate.append(
      "discount_percent",
      data.discount_percent
        ? data.discount_percent
        : prescription.discount_percent
    );
    PrescriptionUpdate.append(
      "zakat",
      data.zakat ? data.zakat : prescription.zakat
    );
    PrescriptionUpdate.append(
      "khairat",
      data.khairat ? data.khairat : prescription.khairat
    );
    PrescriptionUpdate.append(
      "prescription_number",
      prescription.prescription_number
        ? prescription.prescription_number
        : data.prescription_number
    );
    PrescriptionUpdate.append("image", file ? file : "");
    PrescriptionUpdate.append("user", user().id);

    if (submited == true) {
      axios
        .patch(PRESCRIPTION_URL + prescription.id + "/", PrescriptionUpdate)
        .then((res) => {
          setPrescription(res.data);
          toast.success("Data Updated Successfuly.");
          UpdateChunk();
          UpdateUI();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Check Your Input And Try Again!");
        });
    }
  };

  const PrescriptionThrough = (data) => {
    const PrescritptionThroughForm = new FormData();
    PrescritptionThroughForm.append("quantity", data.quantity);
    PrescritptionThroughForm.append(
      "each_price",
      autoCompleteData.medician.price
    );
    PrescritptionThroughForm.append("medician", autoCompleteData.medician.id);
    PrescritptionThroughForm.append("prescription", prescription.id);
    PrescritptionThroughForm.append("user", user().id);

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
          setPrescriptionThrough((prev) => [...prev, res.data]);
          toast.info("Item Added.");
          setTrigger((prev) => prev + 1);
          reset({
            quantity: "",
          });
          axios
            .get(MEDICIAN_WITH_URL + "?medicine=" + res.data.medician)
            .then((res2) => {
              axios
                .get(MEDICIAN_URL + "?ids=" + res2.data[0].includes)
                .then((res3) => {
                  setMedicineWith(res3.data.results);
                });
            });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Check Your Input And Try Again!");
        });
    }
    if (Conditional() == false) {
      SameMedicineAlertModalRef.current.Opener();
    }
  };

  const MedicineIncluder = (data) => {
    console.log("jo");
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
        SameMedicineAlertModalRef.current.Closer();
      })
      .catch(() => toast.error("Check Your Input And Try Again!"));
  };

  const SearchSubmit = (data) => {
    ResetForm();
    axios
      .get(PRESCRIPTION_URL + "?prescription_number=" + data.number)
      .then((res) => {
        setPrescription(res.data[0] ? res.data[0] : []);
        setSubmited(true);
        reset({
          discount_money: res.data[0].discount_money,
          discount_percent: res.data[0].discount_percent,
          zakat: res.data[0].zakat,
          khairat: res.data[0].khairat,
        });
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
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Check Your Input And Try Again!");
      });
  };

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

  const DuplicatePrescription = () => {
    const PrescriptionForm = new FormData();
    PrescriptionForm.append("name", autoCompleteData.patient);
    PrescriptionForm.append("doctor", autoCompleteData.doctor);
    PrescriptionForm.append("department", prescription.department);
    PrescriptionForm.append("round_number", prescription.round_number);
    PrescriptionForm.append("discount_money", prescription.discount_money);
    PrescriptionForm.append("discount_percent", prescription.discount_percent);
    PrescriptionForm.append("zakat", prescription.zakat);
    PrescriptionForm.append("khairat", prescription.khairat);
    PrescriptionForm.append(
      "image",
      prescription.image ? prescription.image : ""
    );
    PrescriptionForm.append("user", user().id);

    axios
      .post(PRESCRIPTION_URL, PrescriptionForm)
      .then((res) => {
        setPrescription(res.data);
        prescriptionThrough.map((item) => {
          const PrescriptionThroughForm = new FormData();
          PrescriptionThroughForm.append("quantity", item.quantity);
          PrescriptionThroughForm.append("each_price", item.each_price);
          PrescriptionThroughForm.append("medician", item.medician);
          PrescriptionThroughForm.append("prescription", res.data.id);
          PrescriptionThroughForm.append("user", user().id);
          setPrescriptionThrough([]);
          axios
            .post(PRESCRIPTION_THOURGH_URL, PrescriptionThroughForm)
            .then((res) => {
              setPrescriptionThrough((prev) => [...prev, res.data]);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

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
      return result;
    };
    setReport({
      total: Math.round(totalCalculate()),
      number: prescriptionThrough.length,
      total_to_sale: Math.round(totalToSaleCalculate()) + CellingHandler(),
      rounded_number: CellingHandler(),
      disount_value:
        prescription.discount_money +
        (report.total * prescription.discount_percent) / 100,
    });
  };

  const tabFormulate = () => {
    document.getElementById("number-in-factor-input").focus();
  };

  const departmentSubmit = () => {
    registerModalOpener();
    PrescriptionModalRef.current.Opener();
    axios.get(DEPARTMENT_URL + props.department.id).then((res) => {
      const DepartmentForm = new FormData();
      DepartmentForm.append("name", autoCompleteData.patient);
      DepartmentForm.append("doctor", autoCompleteData.doctor);
      DepartmentForm.append("department", props.department.id);
      DepartmentForm.append("discount_money", res.data.discount_money);
      DepartmentForm.append("discount_percent", res.data.discount_percent);
      DepartmentForm.append("zakat", "");
      DepartmentForm.append("khairat", "");
      DepartmentForm.append("user", user().id);

      axios
        .post(PRESCRIPTION_URL, DepartmentForm)
        .then((res) => {
          setPrescription(res.data);

          setSubmited(true);
          setLoading(true);
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

  const BackPrescription = () => {
    let next, next_pres;
    if (prescription.prescription_number) {
      next =
        parseInt(
          prescription.prescription_number.slice(
            prescription.prescription_number.lastIndexOf("-")
          )
        ) + 1;
      next_pres =
        prescription.prescription_number.slice(
          0,
          prescription.prescription_number.lastIndexOf("-")
        ) + next;
    }
    prescription == ""
      ? axios.get(LAST_PRESCRIPTION_URL).then((res) => {
          setPrescription([]);
          setPrescription(res.data[0]);
          setDoctorName("");
          setPatientName("");
          reset({
            discount_money: res.data.discount_money,
            discount_percent: res.data.discount_percent,
            zakat: res.data.zakat,
            khairat: res.data.khairat,
            number: "",
          });
          axios
            .get(PRESCRIPTION_THOURGH_URL + "?prescription=" + res.data[0].id)
            .then((res) => {
              setPrescriptionThrough([]);
              setPrescriptionThrough(res.data);
            });
        })
      : axios
          .get(PRESCRIPTION_URL + "?prescription_number=" + next_pres)
          .then((res) => {
            setPrescription([]);
            res.data[0] && setPrescription(res.data[0]);
            console.log(next_pres);
            reset({
              discount_money: res.data.discount_money,
              discount_percent: res.data.discount_percent,
              zakat: res.data.zakat,
              khairat: res.data.khairat,
              number: "",
            });
            setDoctorName("");
            setPatientName("");
            res.data[0] &&
              axios
                .get(
                  PRESCRIPTION_THOURGH_URL + "?prescription=" + res.data[0].id
                )
                .then((res) => {
                  setPrescriptionThrough([]);
                  setPrescriptionThrough(res.data);
                });
          });
  };

  const FrontPrescription = () => {
    let next, next_pres;
    if (prescription.prescription_number) {
      next =
        parseInt(
          prescription.prescription_number.slice(
            prescription.prescription_number.lastIndexOf("-")
          )
        ) - 1;
      next_pres =
        prescription.prescription_number.slice(
          0,
          prescription.prescription_number.lastIndexOf("-")
        ) + next;
    }
    prescription == ""
      ? axios.get(LAST_PRESCRIPTION_URL).then((res) => {
          setPrescription([]);
          setPrescription(res.data[0]);
          setDoctorName("");
          setPatientName("");
          reset({
            discount_money: res.data.discount_money,
            discount_percent: res.data.discount_percent,
            zakat: res.data.zakat,
            khairat: res.data.khairat,
            number: "",
          });

          axios
            .get(PRESCRIPTION_THOURGH_URL + "?prescription=" + res.data[0].id)
            .then((res) => {
              setPrescriptionThrough([]);
              setPrescriptionThrough(res.data);
            });
        })
      : axios
          .get(PRESCRIPTION_URL + "?prescription_number=" + next_pres)
          .then((res) => {
            setPrescription([]);
            res.data[0] && setPrescription(res.data[0]);
            console.log(next_pres);
            reset({
              discount_money: res.data.discount_money,
              discount_percent: res.data.discount_percent,
              zakat: res.data.zakat,
              khairat: res.data.khairat,
              number: "",
            });
            setDoctorName("");
            setPatientName("");
            res.data[0] &&
              axios
                .get(
                  PRESCRIPTION_THOURGH_URL + "?prescription=" + res.data[0].id
                )
                .then((res) => {
                  setPrescriptionThrough([]);
                  setPrescriptionThrough(res.data);
                });
          });
  };

  const CreateNewPrescription = () => {
    ResetForm();
    reset({
      discount_percent: "",
      discount_money: "",
      quantity: "",
      prescription_number: "",
      zakat: "",
      khairat: "",
      number: "",
    });
    departmentSubmit();
    setTrigger((prev) => prev + 1);
  };

  const DeletePrescription = () => {
    if (prescription.sold == false) {
      axios
        .delete(PRESCRIPTION_URL + prescription.id)
        .then((res) => {
          console.log(res.data);
          ResetForm();
          reset({
            prescription_number: "",
          });
          toast.success("Deleted Succesfully.");
        })
        .catch((err) => {
          ResetForm();
          reset({
            prescription_number: "",
          });
        });
    } else {
      prescription
        ? toast.error("No Prescription to Remove!")
        : toast.error("This Prescription Can't be deleted!");
    }
  };

  const [expiresMedicine, setExpiresMedician] = React.useState([]);

  const ExpiresMedicine = (data) => {
    setExpiresMedician(data);
  };

  return (
    <>
      {props.button == "main" && (
        <MainButton
          Func={() => PrescriptionModalRef.current.Opener()}
          title="ثبت نسخه"
          icon="fa-solid fa-circle-info"
        />
      )}
      {props.button == 1 && (
        <InfoButton Func={() => PrescriptionModalRef.current.Opener()} />
      )}
      {props.button == 2 && (
        <DepartButton
          Func={() => departmentSubmit()}
          name={props.department.name}
        />
      )}
      <BigModal title="ثبت نسخه" ref={PrescriptionModalRef}>
        <AlertModal
          ref={SameMedicineAlertModalRef}
          errorText="آیا میخواهید به تعداد آن اضافه نمایید؟"
          errorTitle="این دوا ثبت شده است!"
          OkFunc={handleSubmit(MedicineIncluder)}
          NoFunc={() => {}}
        />
        <ExpiresMedicineModal
          ref={ExpiresMedicineModalRef}
          expiresMedicine={expiresMedicine}
          AutoCompleteHandle={AutoCompleteHandle}
        />
        {loading ? (
          <div className="modal">
            <div className="prescription-box">
              <PrescriptionReportBox
                report={report}
                prescription={prescription}
                BackFunc={() => BackPrescription()}
                FrontFunc={() => FrontPrescription()}
              />
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
                    fuseOptions={{ keys: ["code_name", "id", "name"] }}
                    resultStringKeyName={"code_name"}
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
                    inputSearchString={patientName}
                  />
                  <Patient button={2} Update={UpdateDoctorsPatient} />
                </div>
                <label>نام داکتر:</label>
                <div>
                  <ReactSearchAutocomplete
                    items={doctor}
                    fuseOptions={{ keys: ["code_name", "id", "name"] }}
                    resultStringKeyName={"code_name"}
                    styling={AutoCompleteStyle}
                    showItemsOnFocus={true}
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
                    inputSearchString={doctorName}
                  />
                  <Doctor button={2} Update={UpdateDoctorsPatient} />
                </div>
                <label>شماره:</label>
                <input
                  required
                  type="text"
                  {...register("prescription_number")}
                  value={prescription.prescription_number}
                />
                <label>جستوجو:</label>
                <div className="flex">
                  <form className="search-form">
                    <input type="text" {...register("number")} />
                    <button
                      className="search-button-box"
                      onClick={handleSubmit(SearchSubmit)}
                      type="submit"
                    >
                      <i class="fa-brands fa-searchengin"></i>
                    </button>
                  </form>
                </div>
                <label>عکس:</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                ></input>
                <label>تخفیف:</label>
                <input
                  type="text"
                  {...register("discount_money")}
                  defaultValue={prescription.discount_money}
                  onChange={(e) => {}}
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
                <a
                  href={
                    prescription.image &&
                    new URL(prescription.image).pathname.slice(16)
                  }
                  target="_blank"
                  style={{ textDecoration: "none", color: "grey" }}
                >
                  {prescription.image ? "Show_Photo" : ""}
                </a>
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
                  <input
                    type="reset"
                    value="ریسیت"
                    onClick={DeletePrescription}
                  ></input>
                  <input
                    type="button"
                    value="کپی نسخه"
                    className="prescription-create-button"
                    onClick={handleSubmit(DuplicatePrescription)}
                  ></input>
                  <input
                    type="button"
                    value="جدید"
                    className="prescription-create-button"
                    onClick={handleSubmit(CreateNewPrescription)}
                  ></input>
                  <input
                    type="submit"
                    value={submited ? "آپدیت" : "ثبت"}
                    onClick={handleSubmit(PrescriptionSubmit)}
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
                      department={props.department}
                      results={medicianWith}
                      ExpiresMedicine={ExpiresMedicine}
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
                      department={props.department}
                      results={medicianWith}
                      ExpiresMedicine={ExpiresMedicine}
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
                      department={props.department}
                      results={medicianWith}
                      ExpiresMedicine={ExpiresMedicine}
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
                  {expiresMedicine != "" && (
                    <div className="expires-box">
                      <input
                        className="prescription-alert-button"
                        onClick={() => ExpiresMedicineModalRef.current.Opener()}
                        type="button"
                        onSubmit={handleSubmit(PrescriptionThrough)}
                        tabIndex={-1}
                        value="!"
                      ></input>
                      <p className="selected-color-medicine">
                        Now: {autoCompleteData.medician.brand_name}
                      </p>
                    </div>
                  )}
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
                  <label>طرز.استفاده</label>
                  <label>هشدار</label>
                  <label></label>
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
                      prescriptionThroughs={prescriptionThrough}
                      conflicts={medicineConflict}
                    />
                  ))}
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="loading-page-modal">
            <div className="loading-dna-box">
              <LoadingDNA />
              <h3>لطفا منتظر باشید...</h3>
            </div>
          </div>
        )}
      </BigModal>
    </>
  );
}
