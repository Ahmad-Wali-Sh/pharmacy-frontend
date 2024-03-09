import React, { forwardRef } from "react";
import { SelectMedician } from "../../../Medician/SelectMedicine/SelectMedician";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation } from "react-query";
import { postDataFn, successFn, patchDataFn } from "../../../services/API";
import AlertModal from "../../../PageComponents/Modals/AlertModal";
import { SubmitButton } from "../../../PageComponents/Buttons/Buttons";

export const PrescriptionThroughForm = forwardRef(
  ({ prescription, prescriptionThrough, updatePrescription }, ref) => {
    const SameMedicineAlertModalRef = React.useRef(null);
    const user = useAuthUser();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
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
        patchDataFn(
          data,
          `prescription-through/${medicineIncludesCheck().id}/`
        ),
      onSuccess: () => {
        successFn(
          `prescription-through/?prescription=${prescription?.id}`,
          () => {
            updatePrescription()
          }
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
      PrescriptionThroughForm.append("prescription", prescription?.id);
      PrescriptionThroughForm.append("user", user().id);
      console.log(medicineIncludesCheck());

      if (medicineIncludesCheck() === false) {
        prescriptionThroughPost(PrescriptionThroughForm);
        ref.current.Opener();
      }

      if (medicineIncludesCheck()) {
        SameMedicineAlertModalRef.current.Opener();
      }
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

    const handleQuantityFocus = () => {
      document.getElementById("number-in-factor-input").focus();
      reset({
        quantity: ""
      })
    };

    return (
      <>
        <AlertModal
          ref={SameMedicineAlertModalRef}
          errorTitle="این دوا ثبت شده است!"
          errorText="آیا میخواهید به تعداد آن اضافه نمایید؟"
          OkFunc={handleSubmit(handleMedicineIncluder)}
        />
        <form
          className="prescription-through"
          onSubmit={handleSubmit(handlePrescriptionThroughSubmit)}
        >
          <label>قلم:</label>
          <div className="entrance-through-medician-input">
            <SelectMedician
              ref={ref}
              selectAutoCompleteData={handleMedicineSelect}
              department={prescription?.department}
              handleCloseFocus={handleQuantityFocus}
            />
          </div>
          <label>تعداد:</label>
          <input
            type="text"
            {...register("quantity", { required: true })}
            className={errors.quantity && 'error-input'}
            id="number-in-factor-input"
          />
          <div className="prescription-button">
            <SubmitButton name="⤵ Add" />
            {prescription && prescription.sold ? <h4 className="submit-badge">{prescription.refund != 0 ? 'برگشتی' : 'پرداخت شده'}</h4> : <h4 className="pending-badge">در حالت انتظار</h4>}
          </div>
        </form>
      </>
    );
  }
);

