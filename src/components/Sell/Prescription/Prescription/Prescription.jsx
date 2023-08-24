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
import { useQuery } from "react-query";

export default function Prescription(props) {
  const PrescriptionModalRef = useRef(null);
  const SameMedicineAlertModalRef = useRef(null);

  let loading = true;
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
    disount_value: 0,
  });

  const Reporting = () => {
    const totalCalculate = () => {
      let result = 0;
      prescriptionThrough?.map((item) => {
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
      number: prescriptionThrough?.length,
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
  // const [prescriptionThrough, setPrescriptionThrough] = React.useState([]);
  const [departmentSelected, setDepartmentSelected] = React.useState("");
  const [excatTrough, setExactThrough] = React.useState("");

  const { data: prescriptionThrough } = useQuery({
    queryKey: [`prescription-through/?prescription=${prescription?.id}`],
    enabled: prescription?.id != null,
  });

  React.useEffect(() => {
    Reporting();
  }, [prescriptionThrough, prescription]);

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

  
  const ResetForm = () => {
    setPrescription([]);
    setSubmited(false);
    setDepartmentSelected([]);
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
            .then((res) => {});
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
                .then((res) => {});
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
            .then((res) => {});
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
                .then((res) => {});
          });
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
        SameMedicineAlertModalRef.current.Closer();
      })
      .catch(() => toast.error("Check Your Input And Try Again!"));
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
                prescriptionThrough={prescriptionThrough}
                setPrescription={(data) => setPrescription(data)}
              />
              <PrescriptionThroughForm prescription={prescription} prescriptionThrough={prescriptionThrough} />
              <PrescriptionThroughMapForm prescription={prescription} />
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