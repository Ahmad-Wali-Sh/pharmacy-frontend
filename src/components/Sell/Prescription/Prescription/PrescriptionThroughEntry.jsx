import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { Popover } from "react-tiny-popover";

function PrescriptionThroughEntry({
  through,
  keyValue,
  num,
  UpdateUI,
  UpdateChunk,
  prescriptionThroughs,
  conflicts,
}) {
  const PRESCRIPTION_THROUGH_URL = import.meta.env.VITE_PRESCRIPTION_THROUGH;
  const user = useAuthUser();

  const [alert, setAlert] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    let conflicts_with = conflicts.map((conflict) => {
      return conflict.medicine_1 === through.medician
        ? conflict.medicine_2
        : conflict.medicine_2 === through.medician
        ? conflict.medicine_1
        : "";
    });
    console.log(conflicts_with);
    let result = prescriptionThroughs.some(
      (other) => other.medician === conflicts_with[0]
    );
    console.log(result);
    result ? setAlert("alert_on") : setAlert("");
  }, [prescriptionThroughs]);

  const MedicianUpdate = (data) => {
    const MedicianUpdateForm = new FormData();
    MedicianUpdateForm.append("quantity", data.quantity);
    MedicianUpdateForm.append("user", user().id);

    axios
      .patch(PRESCRIPTION_THROUGH_URL + through.id + "/", MedicianUpdateForm)
      .then(() => {
        toast.success("Data Updated Successfuly.");
        UpdateChunk();
        UpdateUI();
      })
      .catch(() => toast.error("Check Your Input And Try Again!"));
  };

  const MedicianDelete = () => {
    axios
      .delete(PRESCRIPTION_THROUGH_URL + keyValue + "/")
      .then(() => {
        toast.success("Deleted Successfuly!");
        UpdateUI();
      })
      .catch((e) => {
        toast.error("Can't Delete For Some Reason...");
        console.log(e);
      });
  };

  const [isCautionsOpen, setIsCautionsOpen] = React.useState(false);
  const [isUsagesOpen, setIsUsagesOpen] = React.useState(false);

  return (
    <form>
      <div
        className={`prescription-through-map ${alert}`}
        onBlurCapture={handleSubmit(MedicianUpdate)}
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
        />
        <h4>{through.total_price}AFG</h4>
        <div className="medician-map-buttons">
          <div onClick={handleSubmit(MedicianDelete)}>
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PrescriptionThroughEntry;
