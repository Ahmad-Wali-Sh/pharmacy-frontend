import React from "react";
import SelectMedician from "../../../Purchase/Entrance/SelectMedician";
import { useForm } from "react-hook-form";

function PrescriptionThroughForm({ handleMedicineSelect, handlePrescriptionThroughSubmit }) {

    const { register, handleSubmit } = useForm()


  return (
    <form className="prescription-through">
      <label>قلم:</label>
      <div className="entrance-through-medician-input">
        <SelectMedician
          selectAutoCompleteData={handleMedicineSelect}
        />
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
  );
}

export default PrescriptionThroughForm;
