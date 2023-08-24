import React from "react";
import SelectMedician from "../../../Purchase/Entrance/SelectMedician";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation } from "react-query";
import { postDataFn, successFn } from "../../../services/API";
import AlertModal from "../../../PageComponents/Modals/AlertModal";

function PrescriptionThroughForm({ prescription, prescriptionThrough }) {
  const SameMedicineAlertModalRef = React.useRef(null)
  const user = useAuthUser();
  const { register, handleSubmit } = useForm();
  const [medicine, setMedicine] = React.useState(null)

  const handleMedicineSelect = (data) => {
    setMedicine(data)
  };

  const handlePrescriptionThroughSubmit = (data) => {
    const PrescriptionThroughForm = new FormData();
    PrescriptionThroughForm.append("quantity", data.quantity);
    PrescriptionThroughForm.append("each_price", medicine.price);
    PrescriptionThroughForm.append("medician", medicine.id);
    PrescriptionThroughForm.append("prescription", prescription.id);
    PrescriptionThroughForm.append("user", user().id);

    

    medicineincludess[0] === false && prescriptionThroughPost(PrescriptionThroughForm)
    medicineincludess[0] === true && SameMedicineAlertModalRef.current.Opener()
  };

  const medicineincludess = prescriptionThrough.map((presThrough) => {
    return presThrough.medician === medicine.id ? true : false
  })

  const { mutateAsync: prescriptionThroughPost } = useMutation({
    mutationFn: (data) => postDataFn(data, "prescription-through/"),
    onSuccess: () => {
      successFn(`prescription-through/?prescription=${prescription?.id}`, () => {});
    },
  });

  // const PrescriptionThrough = (data) => {
  //   const PrescritptionThroughForm = new FormData();
  //   PrescritptionThroughForm.append("quantity", data.quantity);
  //   PrescritptionThroughForm.append(
  //     "each_price",
  //     autoCompleteData.medician.price
  //   );
  //   PrescritptionThroughForm.append("medician", autoCompleteData.medician.id);
  //   PrescritptionThroughForm.append("prescription", prescription.id);
  //   PrescritptionThroughForm.append("user", user().id);

  //   let result = true;
  //   const Conditional = () => {
  //     prescriptionThrough.map((prescription) => {
  //       prescription.medician == autoCompleteData.medician.id &&
  //         ((result = false), setExactThrough(prescription));

  //       return result;
  //     });
  //     return result;
  //   };

  //   if (Conditional() == true) {
  //     axios
  //       .post(PRESCRIPTION_THOURGH_URL, PrescritptionThroughForm)
  //       .then((res) => {
  //         setPrescriptionThrough((prev) => [...prev, res.data]);
  //         toast.info("Item Added.");
  //         setTrigger((prev) => prev + 1);
  //         axios
  //           .get(MEDICIAN_WITH_URL + "?medicine=" + res.data.medician)
  //           .then((res2) => {
  //             axios
  //               .get(MEDICIAN_URL + "?ids=" + res2.data[0].includes)
  //               .then((res3) => {
  //                 setMedicineWith(res3.data.results);
  //               });
  //           });
  //         ``;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("Check Your Input And Try Again!");
  //       });
  //   }
  //   if (Conditional() == false) {
  //     SameMedicineAlertModalRef.current.Opener();
  //   }
  // };

  // const MedicineIncluder = (data) => {
  //   const MedicianUpdateForm = new FormData();
  //   MedicianUpdateForm.append(
  //     "quantity",
  //     excatTrough && parseInt(excatTrough.quantity) + parseInt(data.quantity)
  //   );

  //   axios
  //     .patch(
  //       PRESCRIPTION_THOURGH_URL + excatTrough.id + "/",
  //       MedicianUpdateForm
  //     )
  //     .then(() => {
  //       toast.success("Data Updated Successfuly.");
  //       SameMedicineAlertModalRef.current.Closer();
  //     })
  //     .catch(() => toast.error("Check Your Input And Try Again!"));
  // };

  return (
    <>
    <AlertModal
          ref={SameMedicineAlertModalRef}
          errorTitle="این دوا ثبت شده است!"
          errorText="آیا میخواهید به تعداد آن اضافه نمایید؟"
          OkFunc={handleSubmit()}
        />
    <form className="prescription-through">
      <label>قلم:</label>
      <div className="entrance-through-medician-input">
        <SelectMedician selectAutoCompleteData={handleMedicineSelect} />
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
          onClick={handleSubmit(handlePrescriptionThroughSubmit)}
          ></input>
      </div>
    </form>
          </>
  );
}

export default PrescriptionThroughForm;
