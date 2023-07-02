import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingDNA from "../../PageComponents/LoadingDNA";

function PrescriptionThroughEntry({
  through,
  keyValue,
  num,
  country,
  pharmGroub,
  kind,
  UpdateUI,
  UpdateChunk,
}) {
  const PRESCRIPTION_THROUGH_URL = import.meta.env.VITE_PRESCRIPTION_THROUGH;
  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;

  const [exactMedician, setExactMedician] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    axios
      .get(MEDICIAN_URL + through.medician)
      .then((res) => {
        setExactMedician(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const MedicianUpdate = (data) => {
    const MedicianUpdateForm = new FormData();
    MedicianUpdateForm.append("quantity", data.quantity);

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

  return (
    <form>
      <div
        className="prescription-through-map"
        onBlurCapture={handleSubmit(MedicianUpdate)}
      >
        <label>{num + 1}</label>
        <div className="entrance-medician-map-box">
          <h4 className="entrance-medician-map-name">
          <h4>
            {kind.map((kind) =>
              kind.id == exactMedician.kind && kind.name_english
            )}
            {exactMedician &&
              (". " + exactMedician.brand_name + " " + exactMedician.ml + " " + exactMedician.weight)}
          </h4>
          </h4>
        </div>
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
