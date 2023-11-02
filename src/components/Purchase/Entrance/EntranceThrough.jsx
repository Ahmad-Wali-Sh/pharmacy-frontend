import { SelectMedician } from "../../Medician/SelectMedicine/SelectMedician";
import { DateInputSimple } from "react-hichestan-datetimepicker";
import { useEffect, useRef } from "react";
import { useEntranceTrough, useFactorTotal } from "../../States/States";
import { useForm } from "react-hook-form";

export default function EntranceThrough() {
  const SelectMedicineRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const selectMedicine = () => {};
  const handleCloseFocus = () => {};
  const EntranceThroughSubmit = () => {};
  return (
    <form
      className="entrance-through"
      onSubmit={handleSubmit(EntranceThroughSubmit)}
    >
      <label>قلم:</label>
      <div className="entrance-through-medician-input">
        <SelectMedician
          selectAutoCompleteData={selectMedicine}
          select
          ref={SelectMedicineRef}
          handleCloseFocus={handleCloseFocus}
        />
      </div>
      <label>تعداد:</label>
      <input
        type="text"
        {...register("number_in_factor")}
        id="number-in-factor-input"
        className="entrance--inputs"
      />
      <label>قیمت فی:</label>
      <input
        type="text"
        {...register("each_price_factor")}
        className="entrance--inputs"
      />
      <label>
        <h5> ت.د.پاکت:</h5>
      </label>
      <div className="numbers-box-pocket">
        <input
          type="text"
          {...register("each_quantity")}
          className="entrance--inputs"
          tabIndex={-1}
          disabled
        />
        <lable>ت.د.قطی</lable>
        <input
          type="text"
          {...register("no_box")}
          className="entrance--inputs"
          tabIndex={-1}
          disabled
        />
      </div>
      <label>فایده٪:</label>
      <input
        type="text"
        {...register("interest_percent")}
        className="entrance--inputs"
      />
      <label>فی_فروش:</label>
      <input
        type="text"
        {...register("each_sell_price_afg")}
        className="entrance--inputs"
      />
      <label>
        <h5> بونوس:</h5>
      </label>
      <div className="numbers-box-pocket">
        <input
          type="text"
          {...register("quantity_bonus")}
          className="entrance--inputs"
        />
        <lable>امانتی:</lable>
        <input
          type="checkbox"
          {...register("lease")}
          style={{
            width: "1rem",
          }}
        />
      </div>
      <label>انقضا.م:</label>
      <input
        type="date"
        {...register("expire_date")}
        className="entrance--inputs date--inputs"
      />
      <label>انقضا.ش:</label>
      <DateInputSimple />
      <label>بچ نمبر:</label>
      <input type="text" {...register("batch_number")} />
      <label>تخفیف:</label>
      <input
        type="text"
        {...register("discount_money")}
        className="entrance--inputs"
      />
      <label>تخفیف ٪:</label>
      <input
        type="text"
        {...register("discount_percent")}
        className="entrance--inputs"
      />
      <div className="adding-box">
        <label>خرید.ق:</label>
        <label className="old-price">
          {/* {medician.last_purchased} AF */}
        </label>
        <input type="submit" value="⤵ Add" className="add-button"></input>
      </div>
    </form>
  );
}
