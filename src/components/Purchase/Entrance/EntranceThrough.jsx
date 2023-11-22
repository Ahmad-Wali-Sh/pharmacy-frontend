import { SelectMedician } from "../../Medician/SelectMedicine/SelectMedician";
import { DateInputSimple } from "react-hichestan-datetimepicker";
import { useEffect, useRef, useState } from "react";
import {
  useEntrance,
  useEntranceTrough,
  useFactorTotal,
  useMedicine,
} from "../../States/States";
import { useForm } from "react-hook-form";
import {
  handleFormData,
  patchDataFn,
  postDataFn,
  queryClient,
  successFn,
} from "../../services/API";
import { useAuthUser } from "react-auth-kit";
import { QueryCache, useMutation, useQuery } from "react-query";
import Entrance from "./Entrance";
import AlertModal from "../../PageComponents/Modals/AlertModal";

export default function EntranceThrough() {
  const SubmitedAlertRef = useRef(null);
  const PreviousPriceAlertRef = useRef(null);
  const SelectMedicineRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    control,
    setValue,
    setFocus,
    watch,
    formState: { errors },
  } = useForm();
  const {medicine, setMedicine} = useMedicine()
  const { entrance } = useEntrance();
  const { data: entranceThrough, refetch: entranceRefetch } = useQuery(
    `entrance-throug/?entrance=${entrance?.id}`
  );
  const user = useAuthUser();

  const selectMedicine = (data) => {
    setMedicine(data);
  };

  const handleCloseFocus = () => {
    setFocus("number_in_factor");
  };

  useEffect(() => {
    setFocus("number_in_factor");
  }, [medicine]);

  const { mutate: submitEntranceThrough } = useMutation({
    mutationFn: (data) => postDataFn(data, "entrance-throug/"),
    onSuccess: (res) => {
      successFn("", () => {
        queryClient.invalidateQueries([
          `entrance-throug/?entrance=${entrance.id}`,
        ]);
        setFocus("number_in_factor");
        resetThrough();
        SelectMedicineRef.current.Opener();
      });
    },
  });

  const { mutate: MedicineIncluder } = useMutation({
    mutationFn: (data) => {
      const Value = new FormData();
      Value.append(
        "number_in_factor",
        parseFloat(data.number_in_factor) +
          SubmitedAlert(data)[0].number_in_factor
      );
      patchDataFn(Value, `entrance-throug/${SubmitedAlert(data)[0].id}/`);
    },
    onSuccess: (res) => {
      successFn("", () => {
        setTimeout(() => {
          queryClient.invalidateQueries(
            { queryKey: [`entrance-throug/?entrance=${entrance.id}`] },
            20000
          );
        });
        setFocus("number_in_factor");
        resetThrough();
        SelectMedicineRef.current.Opener();
      });
    },
  });

  const SubmitedAlert = (data) => {
    return entranceThrough.filter((through) => {
      if (through.medician == data.medician) {
        return through;
      }
    });
  };

  const SubmitChecklist = (data) => {
    if (SubmitedAlert(data) != false) {
      SubmitedAlertRef.current.Opener();
    }
    if (SubmitedAlert(data) == false) {
      handleSubmit(() => handleFormData(data, submitEntranceThrough, user))();
    }
  };


  const resetThrough = () => {
    reset({
      number_in_factor: "",
      each_price_factor: medicine?.last_purchased,
      each_sell_price_afg: sell_price_get(),
      each_quantity: medicine?.no_pocket || 1,
      no_box: medicine?.no_box || 1,
      interest_percent: entrance ? entrance.total_interest : "",
      each_sell_price_afg: "",
      quantity_bonus: "",
      expire_date: "",
      batch_number: "",
      discount_money: "",
      discount_percent: "",
      entrance: entrance?.id,
      medician: medicine?.id,
    });
  };

  useEffect(() => {
    setValue("each_sell_price_afg", sell_price_get());
  }, [watch("interest_percent"), watch("each_price_factor")]);

  useEffect(() => {
    resetThrough();
  }, [medicine, entrance]);

  const sell_price_get = () => {
    let each_price_factor = parseFloat(watch("each_price_factor"));
    let interest_percent = parseFloat(watch("interest_percent"));
    let result =
      ((each_price_factor + (interest_percent * each_price_factor) / 100) / 1) *
      entrance?.currency_rate;
    return parseFloat(result).toFixed(2);
  };

  const interest_get = () => {
    let each_sell_price_afg = parseFloat(watch("each_sell_price_afg"));
    let each_price_factor = parseFloat(watch("each_price_factor"));
    let result =
      (100 *
        ((each_sell_price_afg / entrance?.currency_rate) * 1 -
          each_price_factor)) /
      each_price_factor;
    return parseFloat(result).toFixed(2);
  };

  return (
    <>
      <AlertModal
        errorTitle="این دوا قبلا ثبت شده است"
        errorText="آیا میخواهید به تعداد آن اضافه نمایید؟"
        OkFunc={handleSubmit(MedicineIncluder)}
        NoFunc={() => SubmitedAlertRef.current.Closer()}
        ref={SubmitedAlertRef}
      />
      <AlertModal
        errorTitle="خطای قیمت!"
        errorText="قیمت دوای ثبت شده با قیمت قبلی مطابقت ندارد"
        OkFunc={() => PreviousPriceAlertRef.current.Closer()}
        ref={PreviousPriceAlertRef}
        CheckerComponent={() => <Entrance button={1} />}
      />
      <form
        className="entrance-through"
        // onSubmit={handleSubmit((data) =>
        //   handleFormData(data, submitEntranceThrough, user)
        // )}
        onSubmit={handleSubmit(SubmitChecklist)}
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
          {...register("number_in_factor", { required: true })}
          className={`entrance--inputs ${
            errors.number_in_factor && "error-input"
          }`}
        />
        <label>قیمت فی:</label>
        <input
          type="text"
          {...register("each_price_factor", { required: true })}
          className={`entrance--inputs ${
            errors.each_price_factor && "error-input"
          }`}
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
          {...register("interest_percent", { required: true })}
          className={`entrance--inputs ${
            errors.interest_percent && "error-input"
          }`}
        />
        <label>فی_فروش:</label>
        <input
          type="text"
          {...register("each_sell_price_afg", { required: true })}
          className={`entrance--inputs ${
            errors.each_sell_price_afg && "error-input"
          }`}
          onBlur={() => setValue("interest_percent", interest_get())}
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
          {...register("expire_date", { required: true })}
          className={`entrance--inputs date--inputs ${
            errors.expire_date && "error-input"
          }`}
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
          <label className="old-price">{medicine?.last_purchased} AF</label>
          <input type="submit" value="⤵ Add" className="add-button"></input>
        </div>
      </form>
    </>
  );
}
