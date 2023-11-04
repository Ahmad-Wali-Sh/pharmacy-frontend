import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import DatePicker from "react-date-picker";
import "../../../datePicker.css";

function EntrancThroughEntry({ through, keyValue, num }) {
  const AlertHighlighter = () => {};
  const DateComprison = () => {};
  const MedicineDelete = () => {};

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    setFocus,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <form>
      <div
        className={
          AlertHighlighter()
            ? "entrance-medician-map"
            : "entrance-medician-map-alert"
        }
      >
        <label>{num + 1}</label>
        <div className="entrance-medician-map-box">
          <h4 className="entrance-medician-map-name">
            <h4>{through?.medicine_full}</h4>
          </h4>
        </div>
        <input
          type="text"
          defaultValue={through.number_in_factor}
          {...register("number_in_factor")}
        />
        <div className="input-with-currency">
          <span className="currency-span">{through.rate_name}</span>
          <input
            type="text"
            defaultValue={through.each_price_factor}
            className="transparent-inputs"
            {...register("each_price_factor")}
          />
        </div>
        <div className="input-with-currency">
          <span className="currency-span">{through.rate_name}</span>
          <input
            type="text"
            defaultValue={through.discount_money}
            {...register("discount_money")}
            className="transparent-inputs"
          />
        </div>
        <div className="input-with-currency">
          <span className="currency-span-percent">%</span>
          <input
            type="text"
            defaultValue={through.discount_percent}
            {...register("discount_percent")}
            className="transparent-inputs-percent"
          />
        </div>
        <input
          type="text"
          value={through.no_box}
          style={{ cursor: "default" }}
          {...register("no_box")}
        />
        <div className="input-with-currency">
          <span className="currency-span" style={{ cursor: "default" }}>
            {through.rate_name}
          </span>
          <input
            type="text"
            value={through.total_purchase_currency_before}
            className="transparent-inputs"
            style={{ cursor: "default" }}
          />
        </div>
        <div className="input-with-currency">
          <span className="currency-span" style={{ cursor: "default" }}>
            {through.rate_name}
          </span>
          <input
            type="text"
            value={through.total_purchaseـcurrency}
            className="transparent-inputs"
            style={{ cursor: "default" }}
          />
        </div>
        <input
          type="text"
          defaultValue={through.quantity_bonus}
          {...register("quantity_bonus")}
        />

        <div
          className={
            DateComprison(through.expire_date)
              ? ""
              : "transparent-inputs-date-alert"
          }
        >
          <DatePicker
            calendarIcon={null}
            clearIcon={null}
            disableCalendar={true}
            // value={expireDate}
            // onChange={(e) => {
            //   setExpireDate(e.toISOString().slice(0, 10));
            //   minDetail = "month";
            //   format = "y-MM-dd";
            // }}
            // onBlur={handleSubmit(MedicianUpdate)}
            className="date-picker-expire"
            calendarClassName="date-picker-expire"
            style={{ border: "none" }}
          />
        </div>
        <input
          type="text"
          defaultValue={through.shortage}
          {...register("shortage")}
        />
        <input
          type="checkbox"
          defaultChecked={through.lease}
          {...register("lease")}
          style={{ width: "1rem", marginRight: "0rem" }}
        />
        <div className="input-with-currency">
          <span className="currency-span" style={{ cursor: "default" }}>
            {through.rate_name}
          </span>
          <input
            type="text"
            value={through.each_purchase_price}
            className="transparent-inputs"
            style={{ cursor: "default" }}
          />
        </div>
        <div className="input-with-currency">
          <span className={"currency-span-percent"}>%</span>
          <input
            type="text"
            defaultValue={through.interest_percent}
            {...register("interest_percent")}
            className={
              through.interest_percent > 0 && through.interest_percent <= 100
                ? "transparent-inputs-percent"
                : "transparent-inputs-percent-alert"
            }
          />
        </div>

        <div className="input-with-currency">
          <span className="currency-span" style={{ cursor: "default" }}>
            AFG
          </span>
          <input
            type="text"
            defaultValue={through.each_sell_price_afg}
            className="transparent-inputs"
            {...register("each_sell_price_afg")}
            style={{ cursor: "default" }}
          />
        </div>
        <div className="medician-map-buttons">
          <div onClick={handleSubmit(MedicineDelete)}>
            <i className="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EntrancThroughEntry;
