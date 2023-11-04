import { SelectMedician } from "../../Medician/SelectMedicine/SelectMedician";
import { DateInputSimple } from "react-hichestan-datetimepicker";
import { useEffect, useRef, useState } from "react";
import { useEntrance, useEntranceTrough, useFactorTotal } from "../../States/States";
import { useForm } from "react-hook-form";
import { handleFormData, postDataFn, queryClient, successFn } from "../../services/API";
import { useAuthUser } from "react-auth-kit";
import { useMutation } from "react-query";

export default function EntranceThrough() {
  const SelectMedicineRef = useRef(null);
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
  const [medicine, setMedicine] = useState("");
  const { entranceTrough } = useEntranceTrough();
  const { entrance } = useEntrance();
  const user = useAuthUser();

  const selectMedicine = (data) => {
    setMedicine(data);
  };

  const handleCloseFocus = () => {
    setFocus("number_in_factor")
  };

  const { mutate: submitEntranceThrough } = useMutation({
    mutationFn: (data) => postDataFn(data, "entrance-throug/"),
    onSuccess: (res) => {
      successFn("", () => {
        queryClient.invalidateQueries(['entrance-throug/'])
      });
    },
  });

  useEffect(() => {
    reset({
      number_in_factor: '',
      each_price_factor: '',
      each_quantity: '',
      no_box: medicine.no_box || '',
      each_quantity: medicine.each_quantity || '',
      interest_percent: '',
      each_sell_price_afg: '',
      quantity_bonus: '',
      expire_date: '',
      batch_number: '',
      discount_money: '',
      discount_percent: '',
      entrance: entrance.id,
      medician: medicine.id
    })
  }, [medicine, entrance, entranceTrough])
  return (
    <form
      className="entrance-through"
      onSubmit={handleSubmit((data) =>
        handleFormData(data, submitEntranceThrough, user)
      )}
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
