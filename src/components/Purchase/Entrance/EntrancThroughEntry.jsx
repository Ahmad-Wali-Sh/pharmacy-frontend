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
      (100 * ((data.each_sell_price_afg / through.rate) * data.no_box - data.each_price_factor)) /
      data.each_price_factor
    ).toFixed(2);

    
    const MedicianUpdateForm = new FormData();
    factorNumber && MedicianUpdateForm.append("number_in_factor", factorNumber);
    MedicianUpdateForm.append("each_price_factor", data.each_price_factor);
    MedicianUpdateForm.append("discount_money", data.discount_money);
    MedicianUpdateForm.append("discount_percent", data.discount_percent);
    MedicianUpdateForm.append("expire_date", data.expire_date);
    MedicianUpdateForm.append("interest_percent", interest_percent);
    MedicianUpdateForm.append("bonus", 0);
    MedicianUpdateForm.append("quantity_bonus", data.quantity_bonus);
    // MedicianUpdateForm.append("each_sell_price", data.each_sell_price);
    MedicianUpdateForm.append("each_sell_price_afg", data.each_sell_price_afg);
    MedicianUpdateForm.append("lease", data.lease);
    MedicianUpdateForm.append("user", user().id);
    MedicianUpdateForm.append("shortage", data.shortage);

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
      ((parseFloat(data.each_price_factor) +
        (parseFloat(data.interest_percent) * parseFloat(data.each_price_factor)) /
          100) /
      data.no_box) * through.rate
    ).toFixed(2);

    const MedicianUpdateForm = new FormData();
    factorNumber && MedicianUpdateForm.append("number_in_factor", factorNumber);
    purchasePrice &&
      MedicianUpdateForm.append("each_price_factor", data.each_price_factor);
    MedicianUpdateForm.append("discount_money", data.discount_money);
    MedicianUpdateForm.append("discount_percent", data.discount_percent);
    // MedicianUpdateForm.append("expire_date", data.expire_date);
    MedicianUpdateForm.append("interest_percent", data.interest_percent);
    MedicianUpdateForm.append("bonus", 0);
    MedicianUpdateForm.append("quantity_bonus", data.quantity_bonus);
    MedicianUpdateForm.append("shortage", data.shortage);
    MedicianUpdateForm.append("each_sell_price_afg", eachSellPrice);
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

  const DateComprision = (date) => {
    return new Date(date).getFullYear() + (new Date(date).getMonth()) / 12 > new Date().getFullYear() + ((new Date().getMonth() + 6) / 12)
  }

  const AlertHighlighter = () => {
    if (DateComprision(through.expire_date) && through.interest_percent > 0 && through.interest_percent <= 100) {
      return true
    }
    else 
      return false
     
  }

  return (
    <form>
      <div className={AlertHighlighter() ? "entrance-medician-map" : "entrance-medician-map-alert"}>
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
          defaultValue={through.number_in_factor}
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
        <div>
          <span className="currency-span">{through.rate_name}</span>
        <input
          type="text"
          defaultValue={through.each_price_factor}
          className="transparent-inputs"
          {...register("each_price_factor")}
          onBlurCapture={handleSubmit(MedicianUpdate)}
        />
        </div>
        <div>
          <span className="currency-span">{through.rate_name}</span>
        <input
          type="text"
          defaultValue={through.discount_money}
          {...register("discount_money")}
          onBlurCapture={handleSubmit(MedicianUpdate)}
          className="transparent-inputs"
        />
        </div>
        <div>
        <span className="currency-span-percent">%</span>
        <input
          type="text"
          defaultValue={through.discount_percent}
          {...register("discount_percent")}
          className="transparent-inputs-percent"
          onBlurCapture={handleSubmit(MedicianUpdate)}
        />
        </div>
        <input type="text" value={through.no_box} style={{cursor:"default"}} {...register("no_box")} />
        <div>
          <span className="currency-span"
          style={{cursor:"default"}}
          >{through.rate_name}</span>
        <input
          type="text"
          value={through.total_purchase_currency_before}
          className="transparent-inputs"
          style={{cursor:"default"}}
        />
        </div>
        <div>
          <span className="currency-span" style={{cursor:"default"}}>{through.rate_name}</span>
        <input
          type="text"
          value={through.total_purchaseـcurrency}
          className="transparent-inputs"
          style={{cursor:"default"}}
          />
          </div>
          <input
            type="text"
            defaultValue={through.quantity_bonus}
            {...register("quantity_bonus")}
            onBlurCapture={handleSubmit(MedicianUpdate)}
            />
          <input
            type="date"
            defaultValue={through.expire_date}
            {...register("expire_date")}
            className={DateComprision(through.expire_date) ? "" : "transparent-inputs-date-alert"}
            onBlurCapture={handleSubmit(MedicianUpdate)}
          />
          <input
            type="text"
            defaultValue={through.shortage}
            {...register("shortage")}
            onBlurCapture={handleSubmit(MedicianUpdate)}
          />
        <input
          type="checkbox"
          defaultChecked={through.lease}
          {...register("lease")}
          style={{ width: "1rem", marginRight: "0rem" }}
          onBlurCapture={handleSubmit(MedicianUpdate)}
          />
          <div>
          <span className="currency-span" style={{cursor:"default"}}>{through.rate_name}</span>
        <input
          type="text"
          value={through.each_purchase_price}
          className="transparent-inputs"
          style={{cursor:"default"}}
        />
        </div>
        <div>
        <span className={"currency-span-percent"}>%</span>
        <input
          type="text"
          defaultValue={through.interest_percent}
          {...register("interest_percent")}
          className={through.interest_percent > 0 && through.interest_percent <= 100 ? "transparent-inputs-percent" : "transparent-inputs-percent-alert"}
          onBlurCapture={handleSubmit(MedicianInterestUpdate)}
          />
        </div>
        <div>
        <span className="currency-span"
        style={{cursor:"default"}}
        >{through.rate_name}</span>
        <input
          type="text"
          className="transparent-inputs"
          value={through.each_sell_price}
          {...register("each_sell_price")}
          style={{cursor:"default"}}
        />
        </div>
        <div>
        <span className="currency-span"
        style={{cursor:"default"}}
        >AFG</span>
        <input
          type="text"
          defaultValue={through.each_sell_price_afg}
          className="transparent-inputs"
          {...register('each_sell_price_afg')}
          onBlurCapture={handleSubmit(MedicianUpdate)}
          style={{cursor:"default"}}
        />
        </div>
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
