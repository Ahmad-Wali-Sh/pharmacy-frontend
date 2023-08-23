import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingDNA from "../../../PageComponents/LoadingDNA";
import { useAuthUser } from "react-auth-kit";
import BigModal from "../../../PageComponents/Modals/BigModal";
import { useRef } from "react";
import {
  DepartButton,
  InfoButton,
  MainButton,
} from "../../../PageComponents/Buttons/Buttons";
import AlertModal from "../../../PageComponents/Modals/AlertModal";
import PrescriptionReportBox from "./PrescriptionReportBox";
import PrescriptionForm from "./PrescriptionForm";
import PrescriptionThroughForm from "./PrescriptionThroughForm";
import PrescriptionThroughMapForm from "./PrescriptionThroughMapForm";
import { useMutation } from "react-query";
import { putDataFn, postDataFn, handleFormData, successFn } from "../../../services/API";

export default function Prescription(props) {
  const PrescriptionModalRef = useRef(null);
  const SameMedicineAlertModalRef = useRef(null);

  let loading = true
  const PRESCRIPTION_URL = import.meta.env.VITE_PRESCRIPTION;
  const PRESCRIPTION_THOURGH_URL = import.meta.env.VITE_PRESCRIPTION_THROUGH;
  const DEPARTMENT_URL = import.meta.env.VITE_DEPARTMENT;
  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;
  const MEDICIAN_WITH_URL = import.meta.env.VITE_MEDICIAN_WITH;
  const LAST_PRESCRIPTION_URL = import.meta.env.VITE_LAST_PRESCRIPTION;
  const user = useAuthUser();

  const [report, setReport] = React.useState({
    total: 0,
    number: 0,
    total_to_sale: 0,
    rounded_number: 0,
    disount_value:0
  });

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

  const [autoCompleteData, setAutoCompleteData] = React.useState({
    patient: "",
    doctor: "",
    medician: [],
  });

  const [submited, setSubmited] = React.useState(false);
  const [prescription, setPrescription] = React.useState([]);
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [prescriptionThrough, setPrescriptionThrough] = React.useState([]);
  const [departmentSelected, setDepartmentSelected] = React.useState("");
  const [excatTrough, setExactThrough] = React.useState("");

  // React.useEffect(() => {
  //   if (props.trigger) {
  //     registerModalOpener();
  //   }
  //   ResetForm();
  //   if (props.button == 1 && registerModalOpen) {
  //     axios
  //       .get(
  //         PRESCRIPTION_URL +
  //           "?prescription_number=" +
  //           props.prescription.prescription_number
  //       )
  //       .then((res) => {
  //         setPrescription(res.data[0] ? res.data[0] : []);
  //         setSubmited(true);
  //         {
  //           res.data[0] ? toast.success("Search Was Successful.") : "";
  //         }
  //         axios
  //           .get(PRESCRIPTION_THOURGH_URL + "?prescription=" + res.data[0].id)
  //           .then((res) => {
  //             setPrescriptionThrough(res.data);
  //           })
  //           .catch((err) => console.log(err));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("Check Your Input And Try Again!");
  //       });
  //   }
  // }, [registerModalOpen, props.trigger]);

  React.useEffect(() => {
    Reporting();
  }, [prescriptionThrough]);

  // React.useEffect(() => {
  //   const RoundForm = new FormData();
  //   RoundForm.append("rounded_number", report.rounded_number);
  //   prescriptionThrough &&
  //     prescription.id &&
  //     axios
  //       .patch(PRESCRIPTION_URL + prescription.id + "/", RoundForm)
  //       .catch((err) => console.log(err));
  // }, [prescriptionThrough]);

  function registerModalOpener() {
    ResetForm();
    setRegisterModalOpen(true);
  }


  function AutoCompleteHandle(data) {
    setAutoCompleteData({
      ...autoCompleteData,
      medician: data,
    });
  }

  const { mutateAsync } = useMutation({
    mutationFn: (data) => postDataFn(data, "prescription/"),
    onSuccess: (res) => {
      successFn('', () => {
        setPrescription(res.data)
      })
    },
  });


  // const PrescriptionSubmit = (data) => {
  //   console.log(data.image);
  //   const PrescriptionForm = new FormData();
  //   PrescriptionForm.append("name", autoCompleteData.patient);
  //   PrescriptionForm.append("doctor", autoCompleteData.doctor);
  //   PrescriptionForm.append(
  //     "department",
  //     data.department ? data.department : departmentSelected.id
  //   );
  //   PrescriptionForm.append("round_number", data.round_number);
  //   PrescriptionForm.append(
  //     "discount_money",
  //     data.discount_money
  //       ? data.discount_money
  //       : departmentSelected.discount_money
  //   );
  //   PrescriptionForm.append(
  //     "discount_percent",
  //     data.discount_percent
  //       ? data.discount_percent
  //       : departmentSelected.discount_percent
  //   );
  //   PrescriptionForm.append("zakat", data.zakat);
  //   PrescriptionForm.append("khairat", data.khairat);
  //   PrescriptionForm.append(
  //     "prescription_number",
  //     prescription.prescription_number
  //       ? prescription.prescription_number
  //       : data.prescription_number
  //   );
  //   PrescriptionForm.append("image", data.image ? data.image : "");
  //   PrescriptionForm.append("user", user().id);

  //   if (submited == false) {
  //     axios
  //       .post(PRESCRIPTION_URL, PrescriptionForm)
  //       .then((res) => {
  //         setPrescription(res.data);
  //         setSubmited(true);
  //         toast.success("Data Submited Successfuly.");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("Check Your Input And Try Again!");
  //       });
  //   }

  //   const PrescriptionUpdate = new FormData();
  //   PrescriptionUpdate.append(
  //     "name",
  //     data.patient ? data.patient : autoCompleteData.patient
  //   );
  //   PrescriptionUpdate.append(
  //     "doctor",
  //     data.doctor ? data.doctor : autoCompleteData.doctor
  //   );
  //   PrescriptionUpdate.append(
  //     "department",
  //     data.department ? data.department : prescription.department
  //   );
  //   PrescriptionUpdate.append("round_number", data.round_number);
  //   PrescriptionUpdate.append(
  //     "discount_money",
  //     data.discount_money ? data.discount_money : prescription.discount_money
  //   );
  //   PrescriptionUpdate.append(
  //     "discount_percent",
  //     data.discount_percent
  //       ? data.discount_percent
  //       : prescription.discount_percent
  //   );
  //   PrescriptionUpdate.append(
  //     "zakat",
  //     data.zakat ? data.zakat : prescription.zakat
  //   );
  //   PrescriptionUpdate.append(
  //     "khairat",
  //     data.khairat ? data.khairat : prescription.khairat
  //   );
  //   PrescriptionUpdate.append(
  //     "prescription_number",
  //     prescription.prescription_number
  //       ? prescription.prescription_number
  //       : data.prescription_number
  //   );
  //   PrescriptionUpdate.append("image", data.image ? data.image : "");
  //   PrescriptionUpdate.append("user", user().id);

  //   if (submited == true) {
  //     axios
  //       .patch(PRESCRIPTION_URL + prescription.id + "/", PrescriptionUpdate)
  //       .then((res) => {
  //         setPrescription(res.data);
  //         toast.success("Data Updated Successfuly.");
  //         UpdateChunk();
  //         UpdateUI();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("Check Your Input And Try Again!");
  //       });
  //   }
  // };

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
    setDepartmentSelected([]);
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
          toast.success("Deleted Succesfully.");
        })
        .catch((err) => {
          ResetForm();
        });
    } else {
      prescription
        ? toast.error("No Prescription to Remove!")
        : toast.error("This Prescription Can't be deleted!");
    }
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
          OkFunc={MedicineIncluder}
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
              <PrescriptionForm
                prescription={prescription}
                handlePrescriptionSearch={SearchSubmit}
                handlePrescriptionDelete={DeletePrescription}
                handleCreactNewPrescription={CreateNewPrescription}
                handleDuplicationPrescription={DuplicatePrescription}
                handlePrescriptionSubmit={(data) => handleFormData(data, mutateAsync, user)}
              />
              <PrescriptionThroughForm
                handlePrescriptionThroughSubmit={PrescriptionThrough}
                handleMedicineSelect={AutoCompleteHandle}
              />
              <PrescriptionThroughMapForm prescriptionThrough={prescriptionThrough}/>
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
