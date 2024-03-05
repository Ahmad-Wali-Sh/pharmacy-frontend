import { SelectMedician } from "../../Medician/SelectMedicine/SelectMedician";
import { DateInputSimple } from "react-hichestan-datetimepicker";
import { useEffect, useRef, useState } from "react";
import { useEntrance, useMedicine, useMedicineShow } from "../../States/States";
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
import axios from "axios";
import useServerIP from "../../services/ServerIP";
import moment from 'jalali-moment';

export default function EntranceThrough({ StoreCycle = false }) {
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
  const { medicine, setMedicine } = useMedicine();
  const { entrance } = useEntrance();
  const { data: entranceThrough, refetch: entranceRefetch } = useQuery(
    `entrance-throug/?entrance=${entrance?.id}`,
    { enabled: entrance?.id ? true : false }
  );
  const user = useAuthUser();
  const { serverIP } = useServerIP();
  const selectMedicine = (data) => {
    setMedicine(data);
  };

  const deSelectMedicine = () => {
    setMedicine('')
  }

  const handleCloseFocus = () => {
    setFocus("number_in_factor");
  };

  const handleInputBlur = () => {
    const inputValue = watch('expire_date');
    const parts = inputValue.split('-');
    if (parts.length === 2) {
      let year = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      if (!isNaN(year) && !isNaN(month)) {
        if (year >= 1000 && year <= 1500) {
          // If the year is between 1000 and 2000, consider it as Jalali and convert it
          // Subtract 1000 from the year to get the correct Jalali year
          const jalaliDate = moment(`${year}-${month}`, 'jYYYY-jMM');
          const gregorianDate = jalaliDate.format('YYYY-MM-DD');
          setValue('expire_date', gregorianDate);
          console.log('Converted Jalali date:', gregorianDate);
          return;
        } else if (year >= 2000 && year <= 9999) {
          // If the year is between 2000 and 9999, assume it's in the American format
          // Set the year to the first 4 digits
          const gregorianDate = `${year}-${month.toString().padStart(2, '0')}-01`;
          setValue('expire_date', gregorianDate);
          console.log('Converted American date:', gregorianDate);
          return;
        }
      }
    }
    // If the input value cannot be parsed correctly, clear it
    setValue('expire_date', '');
    console.log('Invalid date input:', inputValue);
  };


  useEffect(() => {
    setFocus("number_in_factor");
  }, [medicine]);

  const { mutate: submitEntranceThrough } = useMutation({
    mutationFn: (data) => {
      data.set('expire_date', watch('expire_date'))
      postDataFn(data, "entrance-throug/")
    },
    onSuccess: (res) => {
      successFn("", () => {
        setTimeout(() => {
          entrance?.id &&
          queryClient.invalidateQueries([
            `entrance-throug/?entrance=${entrance?.id}`,
          ]);
        }, 100)
        setFocus("number_in_factor");
        resetThrough();
        deSelectMedicine()
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
          entrance?.id &&
            queryClient.invalidateQueries(
              { queryKey: [`entrance-throug/?entrance=${entrance?.id}`] },
              20000
            );
        });
        setFocus("number_in_factor");
        deSelectMedicine()
        StoreCycle ? StoreCycleReset() : resetThrough();
        SelectMedicineRef.current.Opener();
      });
    },
  });
  const { medicineShow } = useMedicineShow();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (!initialRender) {
      entrance?.id && SelectMedicineRef.current.Opener();
    } else {
      setInitialRender(false);
    }
  }, [medicineShow]);

  const SubmitedAlert = (data) => {
    console.log(data);
    return entranceThrough?.filter((through) => {
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
      each_price_factor: medicine?.last_purchased || '',
      each_sell_price_afg: sell_price_get() || '',
      each_quantity: medicine?.no_pocket || 1,
      no_box: medicine?.no_box || 1,
      interest_percent: entrance ? entrance.total_interest : "",
      quantity_bonus: "",
      expire_date: "",
      batch_number: "",
      discount_money: "",
      discount_percent: "",
      entrance: entrance?.id,
      medician: medicine?.id,
    });

  };

  const StoreCycleReset = () => {
    reset({
      number_in_factor: "",
      each_price_factor: medicine?.last_purchased || '',
      no_box: medicine?.no_box || 1,
      interest_percent: entrance ? entrance.total_interest : "",
      quantity_bonus: "",
      expire_date: "",
      batch_number: "",
      discount_money: "",
      discount_percent: "",
      each_sell_price_afg: medicine?.price || '',
      entrance: entrance?.id,
      medician: medicine?.id,
    });
  }

  useEffect(() => {
    StoreCycle ? null : setValue("each_sell_price_afg", sell_price_get());
  }, [watch("interest_percent"), watch("each_price_factor")]);

  useEffect(() => {
    StoreCycle ? StoreCycleReset() : resetThrough();
  }, [medicine, entrance]);

  const sell_price_get = () => {
    let each_price_factor = parseFloat(watch("each_price_factor"));
    let interest_percent = parseFloat(watch("interest_percent"));
    let no_box = parseFloat(watch("no_box"));
    let result =
      ((each_price_factor / no_box +
        (interest_percent * (each_price_factor / no_box)) / 100) /
        1) *
      entrance?.currency_rate;
    return parseFloat(result).toFixed(2);
  };

  const interest_get = () => {
    let each_sell_price_afg = parseFloat(watch("each_sell_price_afg"));
    let each_price_factor = parseFloat(watch("each_price_factor"));
    let no_box = parseFloat(watch("no_box"));
    let result =
      (100 *
        ((each_sell_price_afg / entrance?.currency_rate) * 1 -
          each_price_factor / no_box)) /
      (each_price_factor / no_box);
    return parseFloat(result).toFixed(2);
  };

  const StoreCycleSubmit = (data) => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, "0");
    let day = String(currentDate.getDate()).padStart(2, "0");
    console.log(SubmitedAlert(data));
    if (SubmitedAlert(data) != false) {
      SubmitedAlertRef.current.Opener();
    } else {


      let percentageIncrease = ((data.each_sell_price_afg - data.each_price_factor) / data.each_price_factor) * 100;
      let formattedDate = `${year}-${month}-${day}`;
      const StoreCycleForm = new FormData();
      StoreCycleForm.append("entrance", entrance?.id);
      StoreCycleForm.append("medician", medicine?.id);
      StoreCycleForm.append("number_in_factor", data.number_in_factor);
      StoreCycleForm.append("each_price_factor", data.each_price_factor);
      StoreCycleForm.append("each_sell_price_afg", data.each_sell_price_afg);
      StoreCycleForm.append("interest_percent", percentageIncrease.toFixed(3));
      StoreCycleForm.append("expire_date", formattedDate);
      StoreCycleForm.append("user", user().id);
      axios
        .post(`${serverIP}api/entrance-throug/`, StoreCycleForm)
        .then(() => {
          entrance?.id &&
            queryClient.invalidateQueries([
              `entrance-throug/?entrance=${entrance?.id}`,
            ]);
          setFocus("number_in_factor");
          StoreCycleReset()
          deSelectMedicine()
          SelectMedicineRef.current.Opener();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  if (StoreCycle) {
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
          className="entrance-through-store"
          onSubmit={handleSubmit(StoreCycleSubmit)}
        >
          <label>قلم:</label>
          <div className="entrance-through-medician-input">
            <SelectMedician
              selectAutoCompleteData={selectMedicine}
              ready={entrance?.id ? true : false}
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
            disabled={entrance?.id ? false : true}
          />
          <label>قیمت فی:</label>
          <input
            type="text"
            {...register("each_price_factor", { required: true })}
            className={`entrance--inputs ${
              errors.each_price_factor && "error-input"
            }`}
            disabled={entrance?.id ? false : true}
          />
          <label>فی_فروش:</label>
          <input
            type="text"
            {...register("each_sell_price_afg", { required: true })}
            className={`entrance--inputs ${
              errors.each_sell_price_afg && "error-input"
            }`}
            disabled={entrance?.id ? false : true}
          />
            <button type="submit" style={{display: 'none'}}>⤵ذخیره</button>
        </form>
      </>
    );
  } else {
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
              ready={entrance?.id ? true : false}
              select
              ref={SelectMedicineRef}
              handleCloseFocus={handleCloseFocus}
            />
          </div>
          <label>تعداد:</label>
          <div className="flex">
          <input
            type="text"
            {...register("number_in_factor", { required: true })}
            className={`entrance--inputs ${
              errors.number_in_factor && "error-input"
            }`}
            disabled={entrance?.id ? false : true}
            />
            <label>موجودی:</label>
          <input
            type="text"
            value={medicine?.existence || ''}
            disabled
            />
            </div>
          <label>قیمت فی:</label>
          <div className="flex">
          <input
            type="text"
            {...register("each_price_factor", { required: true })}
            className={`entrance--inputs ${
              errors.each_price_factor && "error-input"
            }`}
            disabled={entrance?.id ? false : true}
            />
            <label>خرید:</label>
          <input
            type="text"
            value={medicine?.last_purchased || ''}
            disabled
            />
            </div>
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
            disabled={entrance?.id ? false : true}
          />
          <label>فی_فروش:</label>
          <div className="flex">
          <input
            type="text"
            {...register("each_sell_price_afg", { required: true })}
            className={`entrance--inputs ${
              errors.each_sell_price_afg && "error-input"
            }`}
            onBlur={() => setValue("interest_percent", interest_get())}
            disabled={entrance?.id ? false : true}
          />
          <label>قیمت:</label>
          <input
            value={medicine?.price || ''}
            type="text"
            disabled
          />

          </div>
          <label>
            <h5> بونوس:</h5>
          </label>
          <div className="numbers-box-pocket">
            <input
              type="text"
              {...register("quantity_bonus")}
              className="entrance--inputs"
              disabled={entrance?.id ? false : true}
            />
            <lable>امانتی:</lable>
            <input
              type="checkbox"
              {...register("lease")}
              style={{
                width: "1rem",
              }}
              disabled={entrance?.id ? false : true}
            />
          </div>
          <label>انقضا:</label>
          <input
             type="text"
             placeholder="YYYY-M"
            {...register("expire_date", { required: true })}
            className={`entrance--inputs date--inputs ${
              errors.expire_date && "error-input"
            }`}
            onBlur={handleInputBlur}
            disabled={entrance?.id ? false : true}
          />
          {/* <label>انقضا.ش:</label>
          <DateInputSimple
            disabled={entrance?.id ? false : true}
            className={`${!entrance?.id && "disabled-input"}`}
          /> */}
          <label>بچ نمبر:</label>
          <input
            type="text"
            {...register("batch_number")}
            disabled={entrance?.id ? false : true}
          />
          <label></label>
          <label></label>
          <label>تخفیف:</label>
          <input
            type="text"
            {...register("discount_money")}
            className="entrance--inputs"
            disabled={entrance?.id ? false : true}
          />
          <label>تخفیف ٪:</label>
          <input
            type="text"
            {...register("discount_percent")}
            className="entrance--inputs"
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                handleSubmit(SubmitChecklist)();
                setFocus("number_in_factor");
              }
            }}
            disabled={entrance?.id ? false : true}
          />
          <div className="adding-box">
            <label></label>
            <label></label>
            <input type="submit" value="⤵ ذخیره" className="add-button"></input>
          </div>
        </form>
      </>
    );
  }
}
