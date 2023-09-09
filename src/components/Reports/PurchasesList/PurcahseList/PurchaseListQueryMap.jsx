import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

function PurchaseListQueryMap({ PurchaseItem, Key }) {
  const MEDICINE_URL = import.meta.env.VITE_MEDICIAN;

  const [aquired, setAquired] = React.useState(
    PurchaseItem.medicine_unsubmited
  );
  const [shorted, setShorted] = React.useState(
    PurchaseItem.shorted
  );
  const MedicineUpdate = () => {
    const MedicineForm = new FormData();
    MedicineForm.append("unsubmited_existence", aquired);
    MedicineForm.append('shorted', shorted)
    axios
      .patch(MEDICINE_URL + PurchaseItem.id + "/", MedicineForm)
      .then((res) => {
        console.log(res.data);
        toast.success("Acquired Succesfully!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="purchase-list-query-map">
      <h5>{Key + 1}</h5>
      <h5>{PurchaseItem.medicine_full}</h5>
      <h5 className={PurchaseItem.quantity <= aquired ? "on" : ""}>{PurchaseItem.quantity}</h5>
      <h5>
        {PurchaseItem.details[0] &&
          PurchaseItem.details[0].entrance__company__name}
      </h5>
      <h5>
        {PurchaseItem.details[0] &&
          PurchaseItem.details[0].entrance__company__market__name}
      </h5>
      <h5>{PurchaseItem.details[0] && PurchaseItem.details[0].each_price}</h5>
      <h5>
        {PurchaseItem.details[0] && PurchaseItem.details[0].quantity_bonus}
      </h5>
      <h5>
        {PurchaseItem.details[0] &&
          PurchaseItem.details[0].timestamp.slice(2, 10)}
      </h5>
      <h5>
        {PurchaseItem.details[0] &&
          (PurchaseItem.details[0].entrance__wholesale == "WHOLESALE"
            ? "عمده"
            : PurchaseItem.details[0].entrance__wholesale == "SINGULAR"
            ? "پرچون"
            : "")}
      </h5>
      <h5>
        {PurchaseItem.details[1] &&
          PurchaseItem.details[1].entrance__company__name}
      </h5>
      <h5>
        {PurchaseItem.details[1] &&
          PurchaseItem.details[1].entrance__company__market__name}
      </h5>
      <h5>{PurchaseItem.details[1] && PurchaseItem.details[1].each_price}</h5>
      <h5>
        {PurchaseItem.details[1] && PurchaseItem.details[1].quantity_bonus}
      </h5>
      <h5>
        {PurchaseItem.details[1] &&
          PurchaseItem.details[1].timestamp.slice(2, 10)}
      </h5>
      <h5>
        {PurchaseItem.details[1] &&
          (PurchaseItem.details[1].entrance__wholesale == "WHOLESALE"
            ? "عمده"
            : PurchaseItem.details[0].entrance__wholesale == "SINGULAR"
            ? "پرچون"
            : "")}
      </h5>
      <h5>
        {PurchaseItem.details[2] &&
          PurchaseItem.details[2].entrance__company__name}
      </h5>
      <h5>
        {PurchaseItem.details[2] &&
          PurchaseItem.details[2].entrance__company__market__name}
      </h5>
      <h5>{PurchaseItem.details[2] && PurchaseItem.details[2].each_price}</h5>
      <h5>
        {PurchaseItem.details[2] && PurchaseItem.details[2].quantity_bonus}
      </h5>
      <h5>
        {PurchaseItem.details[2] &&
          PurchaseItem.details[2].timestamp.slice(2, 10)}
      </h5>
      <h5>
        {PurchaseItem.details[2] &&
          (PurchaseItem.details[2].entrance__wholesale == "WHOLESALE"
            ? "عمده"
            : PurchaseItem.details[0].entrance__wholesale == "SINGULAR"
            ? "پرچون"
            : "")}
      </h5>
      <input
        type="text"
        placeholder="..."
        defaultValue={PurchaseItem.medicine_unsubmited}
        onChange={(e) => {
          setAquired(e.target.value);
        }}
        onBlur={MedicineUpdate}
      ></input>
      <input type="checkbox" onChange={(e) => {
          setShorted(e.target.checked)
          
      }}
      onBlurCapture={MedicineUpdate}
      ></input>
    </div>
  );
}

export default PurchaseListQueryMap;
