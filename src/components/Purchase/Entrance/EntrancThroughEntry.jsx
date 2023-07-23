import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";

function EntrancThroughEntry({
  through,
  keyValue,
  num,
  kind,
  UpdateUI,
  UpdateChunk,
}) {
  const ENTRANCE_THROUGH_URL = import.meta.env.VITE_ENTRANCE_THROUGH;
  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;
  const user = useAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [exactMedician, setExactMedician] = React.useState("");
  const [factorNumber, setInFactorNumber] = React.useState("");
  const [purchasePrice, setPurchasePrice] = React.useState("");

  React.useEffect(() => {
    axios
      .get(MEDICIAN_URL + through.medician)
      .then((res) => {
        setExactMedician(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const MedicianUpdate = (data) => {
    const interest_percent = (
      (100 * (data.each_sell_price * data.no_box - data.each_price_factor)) /
      data.each_price_factor
    ).toFixed(0);

    const MedicianUpdateForm = new FormData();
    factorNumber && MedicianUpdateForm.append("number_in_factor", factorNumber);
    purchasePrice &&
      MedicianUpdateForm.append("each_price_factor", purchasePrice);
    MedicianUpdateForm.append("discount_money", data.discount_money);
    MedicianUpdateForm.append("discount_percent", data.discount_percent);
    MedicianUpdateForm.append("expire_date", data.expire_date);
    MedicianUpdateForm.append("interest_percent", interest_percent);
    MedicianUpdateForm.append("bonus", 0);
    MedicianUpdateForm.append("quantity_bonus", data.quantity_bonus);
    MedicianUpdateForm.append("each_sell_price", data.each_sell_price);
    MedicianUpdateForm.append("lease", data.lease);
    MedicianUpdateForm.append("user", user().id);

    axios
      .patch(ENTRANCE_THROUGH_URL + through.id + "/", MedicianUpdateForm)
      .then(() => {
        toast.success("Data Updated Successfuly.");
        UpdateChunk();
        UpdateUI();
      })
      .catch(() => toast.error("Check Your Input And Try Again!"));
  };

  const MedicianInterestUpdate = (data) => {
    const eachSellPrice = (
      (parseInt(data.each_price_factor) +
        (parseInt(data.interest_percent) * parseInt(data.each_price_factor)) /
          100) /
      data.no_box
    ).toFixed(1);

    const MedicianUpdateForm = new FormData();
    factorNumber && MedicianUpdateForm.append("number_in_factor", factorNumber);
    purchasePrice &&
      MedicianUpdateForm.append("each_price_factor", purchasePrice);
    MedicianUpdateForm.append("discount_money", data.discount_money);
    MedicianUpdateForm.append("discount_percent", data.discount_percent);
    MedicianUpdateForm.append("expire_date", data.expire_date);
    MedicianUpdateForm.append("interest_percent", data.interest_percent);
    MedicianUpdateForm.append("bonus", 0);
    MedicianUpdateForm.append("quantity_bonus", data.quantity_bonus);
    MedicianUpdateForm.append("each_sell_price", eachSellPrice);
    MedicianUpdateForm.append("lease", data.lease);
    MedicianUpdateForm.append("user", user().id);

    axios
      .patch(ENTRANCE_THROUGH_URL + through.id + "/", MedicianUpdateForm)
      .then(() => {
        toast.success("Data Updated Successfuly.");
        UpdateChunk();
        UpdateUI();
      })
      .catch(() => toast.error("Check Your Input And Try Again!"));
  };

  const MedicianDelete = () => {
    axios
      .delete(ENTRANCE_THROUGH_URL + keyValue + "/")
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
      <div className="entrance-medician-map">
        <label>{num + 1}</label>
        <div className="entrance-medician-map-box">
          <h4 className="entrance-medician-map-name">
            <h4>
              {kind.map(
                (kind) => kind.id == exactMedician.kind && kind.name_english
              )}
              {exactMedician &&
                ". " +
                  exactMedician.brand_name +
                  " " +
                  exactMedician.ml +
                  " " +
                  exactMedician.weight}
            </h4>
          </h4>
        </div>
        <input
          type="text"
          defaultValue={through.register_quantity}
          {...register("number_in_factor")}
          onChange={(res) => {
            setInFactorNumber(res.target.value);
          }}
          onBlurCapture={handleSubmit(MedicianUpdate)}
        />
        <input
          style={{ display: "none" }}
          type="text"
          value={through.id}
          {...register("entrance_through_id")}
          onBlurCapture={handleSubmit(MedicianUpdate)}
        />
        <input
          type="text"
          defaultValue={through.each_purchase_price}
          {...register("each_price_factor")}
          onChange={(res) => {
            setPurchasePrice(res.target.value);
          }}
          onBlurCapture={handleSubmit(MedicianUpdate)}
        />
        <input
          type="text"
          defaultValue={through.each_sell_price}
          {...register("each_sell_price")}
          onBlurCapture={handleSubmit(MedicianUpdate)}
        />
        <input
          type="text"
          value={through.each_quantity}
          {...register("each_quantity")}
        />
        <input type="text" value={through.no_box} {...register("no_box")} />
        <input
          type="text"
          defaultValue={through.discount_money}
          {...register("discount_money")}
          onBlurCapture={handleSubmit(MedicianUpdate)}
        />
        <input
          type="text"
          defaultValue={through.discount_percent}
          {...register("discount_percent")}
          onBlurCapture={handleSubmit(MedicianUpdate)}
        />
        <input
          type="date"
          defaultValue={through.expire_date}
          {...register("expire_date")}
          onBlurCapture={handleSubmit(MedicianUpdate)}
        />
        <input
          type="checkbox"
          defaultChecked={through.lease}
          {...register("lease")}
          style={{ width: "1rem", marginRight: "1rem" }}
          onBlurCapture={handleSubmit(MedicianUpdate)}
        />
        <input
          type="text"
          defaultValue={through.interest_percent}
          {...register("interest_percent")}
          onBlurCapture={handleSubmit(MedicianInterestUpdate)}
        />
        <input
          type="text"
          defaultValue={through.quantity_bonus}
          {...register("quantity_bonus")}
          onBlurCapture={handleSubmit(MedicianUpdate)}
        />
        <h4>{through.total_purchaseـafghani}</h4>
        <h4>
          {through.total_purchaseـafghani -
            (through.total_purchaseـafghani / 100) * through.discount_percent -
            through.discount_money}
        </h4>
        <h4>{through.total_sell}</h4>
        <div className="medician-map-buttons">
          <div onClick={handleSubmit(MedicianDelete)}>
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EntrancThroughEntry;
