import React, { useEffect, useState } from "react";
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
import PrescriptionReportBox from "./PrescriptionReportBox";
import PrescriptionForm from "./PrescriptionForm";
import { PrescriptionThroughForm } from "./PrescriptionThroughForm";
import PrescriptionThroughMapForm from "./PrescriptionThroughMapForm";
import { useQuery } from "react-query";
import { usePrescription } from "../../../States/States";
import useServerIP from "../../../services/ServerIP";

export default function Prescription(props) {
  const PrescriptionModalRef = useRef(null);
  const SelectMedicineModalRef = useRef(null);
  const { serverIP } = useServerIP();

  let loading = true;
  const user = useAuthUser();

  const { prescription, setPrescription } = usePrescription();
  const [departmentSelected, setDepartmentSelected] = React.useState("");

  const [report, setReport] = React.useState({
    total: 0,
    number: 0,
    total_to_sale: 0,
    rounded_number: 0,
    disount_value: 0,
  });

  const { data: prescriptionThrough, refetch: updatePrescriptionThrough } = useQuery({
    queryKey: [`prescription-through/?prescription=${prescription?.id}`],
    enabled: prescription?.id != null,
  });

  React.useEffect(() => {
    Reporting();
  }, [prescriptionThrough, prescription]);

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
      disount_value: (
        prescription.discount_money +
        (report.total * prescription.discount_percent) / 100
      ).toFixed(2),
    });
  };

  const departmentSubmit = () => {
    PrescriptionModalRef.current.Opener();

    axios
      .get(`${serverIP}api/department/` + props.department.id + "/")
      .then((res) => {
        const DepartmentForm = new FormData();
        DepartmentForm.append("name", "");
        DepartmentForm.append("doctor", "");
        DepartmentForm.append("department", props.department.id);
        DepartmentForm.append("discount_money", res.data.discount_money);
        DepartmentForm.append("discount_percent", res.data.discount_percent);
        DepartmentForm.append("zakat", "");
        DepartmentForm.append("khairat", "");
        DepartmentForm.append("user", user().id);

        axios
          .post(`${serverIP}api/prescription/`, DepartmentForm)
          .then((res) => {
            setPrescription(res.data);
            SelectMedicineModalRef.current.Opener();
            toast.success("Data Submited Successfuly.");

            axios
              .get(`${serverIP}api/department/` + props.department.id + "/")
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
      ? axios.get(`${serverIP}api/last-prescription/`).then((res) => {
          setPrescription([]);
          setPrescription(res.data[0]);
          axios
            .get(
              `${serverIP}api/prescription-through/` +
                "?prescription=" +
                res.data[0].id
            )
            .then((res) => {});
        })
      : axios
          .get(
            `${serverIP}api/prescription/` +
              "?prescription_number=" +
              next_pres
          )
          .then((res) => {
            setPrescription([]);
            res.data[0] && setPrescription(res.data[0]);
            console.log(next_pres);
            res.data[0] &&
              axios
                .get(
                  `${serverIP}api/prescription-through/` +
                    "?prescription=" +
                    res.data[0].id
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
      ? axios.get(`${serverIP}api/last-prescription/`).then((res) => {
          setPrescription([]);
          setPrescription(res.data[0]);

          axios
            .get(
              `${serverIP}api/prescription-through/` +
                "?prescription=" +
                res.data[0].id
            )
            .then((res) => {
              console.log(res);
            });
        })
      : axios
          .get(
            `${serverIP}api/prescription/` +
              "?prescription_number=" +
              next_pres
          )
          .then((res) => {
            setPrescription([]);
            res.data[0] && setPrescription(res.data[0]);
            console.log(next_pres);
            res.data[0] &&
              axios
                .get(
                  `${serverIP}api/prescription-through/` +
                    "?prescription=" +
                    res.data[0].id
                )
                .then((res) => {
                  console.log(res);
                });
          });
  };

  const updatePrescription = () => {
    axios
      .get(`${serverIP}api/prescription/` + prescription.id + "/")
      .then((res) => setPrescription(res.data));
  };

  const { data: pres, refetch: updatePrescrip } = useQuery({
    queryKey: [`prescription/${prescription?.id}/`],
    onSuccess: (res) => {
      setPrescription(res);
    },
    enabled: prescription?.id != undefined,
  });



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
              <div className="prescription-report">
                <PrescriptionReportBox
                  report={report}
                  prescription={prescription}
                  BackFunc={() => BackPrescription()}
                  FrontFunc={() => FrontPrescription()}
                />
              </div>
              <div className="prescription-details">
                  <PrescriptionForm
                    prescription={prescription}
                    prescriptionThrough={prescriptionThrough}
                    updatePrescription={updatePrescription}
                    update={updatePrescrip}
                    setPrescription={(data) => setPrescription(data)}
                  />
                <PrescriptionThroughForm
                  prescription={prescription}
                  prescriptionThrough={prescriptionThrough}
                  ref={SelectMedicineModalRef}
                />
                <PrescriptionThroughMapForm
                  prescription={prescription}
                  updatePrescription={updatePrescription}
                  updatePrescriptionThrough={updatePrescriptionThrough}
                />
              </div>
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
