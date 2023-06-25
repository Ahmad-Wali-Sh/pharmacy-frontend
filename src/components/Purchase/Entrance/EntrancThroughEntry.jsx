import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingDNA from "../../PageComponents/LoadingDNA";

function EntrancThroughEntry({
  through,
  keyValue,
  num,
  country,
  pharmGroub,
  kind,
  UpdateUI,
  UpdateChunk,
}) {
  const ENTRANCE_THROUGH_URL = import.meta.env.VITE_ENTRANCE_THROUGH;
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

  const [factorNumber, setInFactorNumber] = React.useState("")
  const [purchasePrice, setPurchasePrice] = React.useState("")

  const MedicianUpdate = (data) => {
    const MedicianUpdateForm = new FormData();
    factorNumber && MedicianUpdateForm.append("number_in_factor", factorNumber);
    purchasePrice && MedicianUpdateForm.append("each_price_factor", purchasePrice);
    MedicianUpdateForm.append("each_quantity", data.each_quantity);
    MedicianUpdateForm.append("discount_money", data.discount_money);
    MedicianUpdateForm.append("each_price", data.each_price);
    MedicianUpdateForm.append("discount_percent", data.discount_percent);
    MedicianUpdateForm.append("expire_date", data.expire_date);
    MedicianUpdateForm.append("interest_money", data.interest_money);
    MedicianUpdateForm.append("interest_percent", data.interest_percent);
    MedicianUpdateForm.append("bonus", 0);
    MedicianUpdateForm.append("quantity_bonus", data.quantity_bonus);
    MedicianUpdateForm.append("no_box", data.no_box);

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
      <div
        className="entrance-medician-map"
        onBlurCapture={handleSubmit(MedicianUpdate)}
      >
        <label>{num + 1}</label>
        <div className="entrance-medician-map-box">
          <h4 className="entrance-medician-map-name">
            <h4>
              {country.map(
                (country) =>
                  country.id == exactMedician.country && `${country.name} _`
              )}
            </h4>
            <h4>
              {pharmGroub.map(
                (pharm) =>
                  pharm.id == exactMedician.pharm_group &&
                  `_ ${pharm.name_english} __`
              )}
            </h4>
            {exactMedician ? (
              " " + exactMedician.brand_name + " " + exactMedician.ml
            ) : (
              <div className="loading-medician">
                <LoadingDNA />
              </div>
            )}
          </h4>
        </div>
        <input
          type="text"
          defaultValue={through.register_quantity}
          {...register("number_in_factor")}
          onChange={(res) => {
            setInFactorNumber(res.target.value)
          }}
        />
        <input
          style={{ display: "none" }}
          type="text"
          value={through.id}
          {...register("entrance_through_id")}
        />
        <input
          type="text"
          defaultValue={through.each_purchase_price}
          {...register("each_price_factor")}
          onChange={(res) => {
            setPurchasePrice(res.target.value)
          }}
        />
        <input
          type="text"
          defaultValue={through.each_price}
          {...register("each_price")}
        />
        <input
          type="text"
          value={through.each_sell_price}
        />
        <input
          type="text"
          defaultValue={through.each_quantity}
          {...register("each_quantity")}
        />
        <input
          type="text"
          defaultValue={through.no_box}
          {...register("no_box")}
        />
        <input
          type="text"
          defaultValue={through.discount_money}
          {...register("discount_money")}
        />
        <input
          type="text"
          defaultValue={through.discount_percent}
          {...register("discount_percent")}
        />
        <input
          type="date"
          defaultValue={through.expire_date}
          {...register("expire_date")}
        />
        <input
          type="text"
          defaultValue={through.interest_money}
          {...register("interest_money")}
        />
        <input
          type="text"
          defaultValue={through.interest_percent}
          {...register("interest_percent")}
        />
        <input
          type="text"
          defaultValue={through.quantity_bonus}
          {...register("quantity_bonus")}
        />
        <h4>{through.total_purchaseـafghani}</h4>
        <h4>{through.total_interest}</h4>
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
