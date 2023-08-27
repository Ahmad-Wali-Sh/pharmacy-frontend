import React from "react";
import SelectMedician from "../../../Medician/SelectMedicine/SelectMedician";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation } from "react-query";
import { postDataFn, successFn, patchDataFn } from "../../../services/API";
import AlertModal from "../../../PageComponents/Modals/AlertModal";
import { SubmitButton } from "../../../PageComponents/Buttons/Buttons";

function PrescriptionThroughForm({ prescription, prescriptionThrough }) {
  const SameMedicineAlertModalRef = React.useRef(null);
  const user = useAuthUser();
  const { register, handleSubmit } = useForm();
  const [medicine, setMedicine] = React.useState(null);

  const { mutateAsync: prescriptionThroughPost } = useMutation({
    mutationFn: (data) => postDataFn(data, "prescription-through/"),
    onSuccess: () => {
      successFn(
        `prescription-through/?prescription=${prescription?.id}`,
        () => {}
      );
    },
  });

  const { mutateAsync: prescriptionThroughPatch } = useMutation({
    mutationFn: (data) =>
      patchDataFn(data, `prescription-through/${medicineIncludesCheck().id}/`),
    onSuccess: () => {
      successFn(
        `prescription-through/?prescription=${prescription?.id}`,
        () => {}
      );
    },
  });

  const handleMedicineSelect = (data) => {
    setMedicine(data);
  };

  const handlePrescriptionThroughSubmit = (data) => {
    const PrescriptionThroughForm = new FormData();
    PrescriptionThroughForm.append("quantity", data.quantity);
    PrescriptionThroughForm.append("each_price", medicine.price);
    PrescriptionThroughForm.append("medician", medicine.id);
    PrescriptionThroughForm.append("prescription", prescription.id);
    PrescriptionThroughForm.append("user", user().id);
    console.log(medicineIncludesCheck());
    medicineIncludesCheck() === false
      ? prescriptionThroughPost(PrescriptionThroughForm)
      : SameMedicineAlertModalRef.current.Opener();
  };

  const handleMedicineIncluder = (data) => {
    const PrescriptionThroughIncluderForm = new FormData();
    PrescriptionThroughIncluderForm.append(
      "quantity",
      parseInt(data.quantity) + parseInt(medicineIncludesCheck().quantity)
    );

    prescriptionThroughPatch(PrescriptionThroughIncluderForm);
  };

  const medicineIncludesCheck = () => {
    let result = false;

    prescriptionThrough?.map((presThrough) => {
      presThrough.medician == medicine?.id && (result = presThrough);
      return result;
    });
    return result;
  };

  return (
    <>
      <AlertModal
        ref={SameMedicineAlertModalRef}
        errorTitle="این دوا ثبت شده است!"
        errorText="آیا میخواهید به تعداد آن اضافه نمایید؟"
        OkFunc={handleSubmit(handleMedicineIncluder)}
      />
      <form className="prescription-through" onSubmit={handleSubmit(handlePrescriptionThroughSubmit)}>
        <label>قلم:</label>
        <div className="entrance-through-medician-input">
          <SelectMedician selectAutoCompleteData={handleMedicineSelect} department={prescription.department} />
        </div>
        <label>تعداد:</label>
        <input
          type="text"
          {...register("quantity")}
          id="number-in-factor-input"
        />
        <div className="prescription-button">
          <SubmitButton name="⤵ Add"/>
        </div>
      </form>
    </>
  );
}

export default PrescriptionThroughForm;
