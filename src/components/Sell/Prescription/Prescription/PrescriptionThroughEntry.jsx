import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { Popover } from "react-tiny-popover";
import { useMutation } from "react-query";
import { successFn, patchDataFn, deleteDataFn } from "../../../services/API";
import { useQuery } from "react-query";
import { SelectMedician } from "../../../Medician/SelectMedicine/SelectMedician";
import axios from "axios";
import useServerIP from "../../../services/ServerIP";
import { toast } from "react-toastify";
import SellingLists from "../../../PageComponents/Lists/SellLists/SellingLists";

function PrescriptionThroughEntry({
  through,
  num,
  onClick,
  prescription,
  prescriptionThroughs,
  updatePrescription,
  highlighted,
  id,
  updatePrescriptionThrough,
}) {
  const user = useAuthUser();
  const { serverIP } = useServerIP();

  const { register, handleSubmit, reset } = useForm();
  const [alert, setAlert] = React.useState("");

  React.useEffect(() => {
    reset({
      quantity: through.quantity,
    });
  }, [prescriptionThroughs]);

  const { data: conflicts } = useQuery(["medicine-conflict/"]);

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
    result ? setAlert("alert_on") : setAlert("");
  }, [prescriptionThroughs]);

  const { mutateAsync: prescriptionThroughPatch } = useMutation({
    mutationFn: (data) =>
      patchDataFn(data, `prescription-through/${through.id}/`),
    onSuccess: () => {
      successFn(
        `prescription-through/?prescription=${prescription?.id}`,
        () => {
          updatePrescription();
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
          updatePrescription();
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

  const selectAutoCompleteData = (data) => {
    const Form = new FormData();
    Form.append("medician", data?.id);
    Form.append("each_price", data?.price);
    Form.append('quantity', through?.quantity)
    Form.append("user", user().id);
    axios
      .patch(`${serverIP}api/prescription-through/${through.id}/`, Form)
      .then(() => {
        updatePrescriptionThrough();
        handleSubmit(prescriptionThroughUpdate)()
        toast.success("دارو موفقانه تعویض شد");
      });
  };

  const SellRef = useRef(null);

  return (
    <form onSubmit={(e) => e.preventDefault()} id={id}>
      <div
        className={`prescription-through-map ${alert} ${
          highlighted ? "pres-item-highlight" : ""
        }`}
        onClick={onClick}
      >
        <label></label>
        <label style={{ width: "2%" }}>{num + 1}</label>
        <h4 className="entrance-medician-map-name-dr" style={{ maxWidth: "67%", width:'67%' }}>
          {through.medicine_full}
        </h4>
        <input
          style={{ width: "4%" }}
          type="text"
          defaultValue={through.quantity}
          {...register("quantity")}
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
          onBlurCapture={handleSubmit(prescriptionThroughUpdate)}
        />
        <h4 style={{ width: "3%" }}>{through.medicine_no_quantity || 1}</h4>
        <h4 style={{ width: "3%" }}>{through.medicine_no_box || 1}</h4>
        <h4 style={{ width: "5%", direction: "ltr", textAlign: "right" }}>
          {through.medicine_existence ? through.medicine_existence : 0}
        </h4>
        <h4 style={{ width: "4%" }}>{through.each_price}</h4>
        <h4 style={{ width: "4%" }}>{through.total_price}</h4>
        <h4 className="medician-map-buttons" style={{width: '6%'}}>
          <div>
            <SellingLists
              title="لست ها"
              activeKey="purhase-list"
              ref={SellRef}
              selectedMedicine={through}
              button="plus_purchase"
            />
          </div>
          <SelectMedician
            edit={true}
            selectAutoCompleteData={selectAutoCompleteData}
          />
          <div onClick={prescriptionThroughDelete}>
            <i className="fa-solid fa-trash"></i>
          </div>
        </h4>
      </div>
    </form>
  );
}

export default PrescriptionThroughEntry;
