import React from "react";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { Popover } from "react-tiny-popover";
import { useMutation } from "react-query";
import { successFn, patchDataFn, deleteDataFn } from "../../../services/API";
import { useQuery } from "react-query";

function PrescriptionThroughEntry({
  through,
  num,
  prescription,
  prescriptionThroughs,
  updatePrescription
}) {
  const user = useAuthUser();

  const { register, handleSubmit, reset } = useForm();
  const [alert, setAlert] = React.useState("");

  React.useEffect(() => {
    reset({
      quantity: through.quantity,
    });
  }, [prescriptionThroughs]);

  const { data: conflicts } = useQuery(['medicine-conflict/'])

  React.useEffect(() => {
    let conflicts_with = conflicts?.map((conflict) => {
      return conflict.medicine_1 === through.medician
        ? conflict.medicine_2
        : conflict.medicine_2 === through.medician
        ? conflict.medicine_1
        : "";
    });
    let result = prescriptionThroughs.some(
      (other) => other.medician === conflicts_with && conflicts_with[0] 
    );
    console.log(result);
    result ? setAlert("alert_on") : setAlert("");
  }, [prescriptionThroughs]);

  const { mutateAsync: prescriptionThroughPatch } = useMutation({
    mutationFn: (data) =>
      patchDataFn(data, `prescription-through/${through.id}/`),
    onSuccess: () => {
      successFn(
        `prescription-through/?prescription=${prescription?.id}`,
        () => {
          updatePrescription()
        }
        );
    },
  });

  const { mutateAsync: prescriptionThroughDelete } = useMutation({
    mutationFn: () => deleteDataFn(`prescription-through/${through.id}/`),
    onSuccess: () => {
      successFn(
        `prescription-through/?prescription=${prescription?.id}`,
        () => {
          updatePrescription()
        }
      );
    },
  });

  const prescriptionThroughUpdate = (data) => {
    const MedicianUpdateForm = new FormData();
    MedicianUpdateForm.append("quantity", data.quantity);
    MedicianUpdateForm.append("user", user().id);

    prescriptionThroughPatch(MedicianUpdateForm);
  };


  const [isCautionsOpen, setIsCautionsOpen] = React.useState(false);
  const [isUsagesOpen, setIsUsagesOpen] = React.useState(false);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div
        className={`prescription-through-map ${alert}`}
        onBlurCapture={handleSubmit(prescriptionThroughUpdate)}
      >
        <label></label>
        <label>{num + 1}</label>
        <h4 className="entrance-medician-map-name">
          <h4>{through.medicine_full}</h4>
        </h4>
        <Popover
          isOpen={isUsagesOpen}
          position={["top"]}
          content={<div className="popover-box">{through.medicine_usage}</div>}
        >
          <h5
            className="popovers-h5"
            onMouseLeave={() => setIsUsagesOpen(false)}
            onMouseOver={() => setIsUsagesOpen(true)}
          >
            {through.medicine_usage}
          </h5>
        </Popover>
        <h5></h5>
        <Popover
          isOpen={isCautionsOpen}
          position={["top"]}
          content={
            <div className="popover-box">{through.medicine_cautions}</div>
          }
        >
          <h5
            className="popovers-h5"
            onMouseLeave={() => setIsCautionsOpen(false)}
            onMouseOver={() => setIsCautionsOpen(true)}
          >
            {through.medicine_cautions}
          </h5>
        </Popover>
        <h4>{through.each_price}AFG</h4>
        <input
          type="text"
          defaultValue={through.quantity}
          {...register("quantity")}
          onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault()}}
        />
        <h4>{through.total_price}AFG</h4>
        <div className="medician-map-buttons">
          <div onClick={prescriptionThroughDelete}>
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PrescriptionThroughEntry;
