import { DateInputSimple } from "react-hichestan-datetimepicker";
import ControlledSelect from "../../PageComponents/ControlledSelect";
import PurchasingLists from "../../PageComponents/Lists/PurchaseLists/PurchasingLists";
import {
  ButtonGroup,
  FormButton,
  SubmitButton,
} from "../../PageComponents/Buttons/Buttons";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  useEntrance,
  useMedicineShow,
  useSubmitedEntrance,
} from "../../States/States";
import {
  deleteDataFn,
  handleFormData,
  postDataFn,
  putDataFn,
  successFn,
} from "../../services/API";
import { useAuthUser } from "react-auth-kit";
import { useState, useEffect, useRef } from "react";
import MultipleImage from "../../PageComponents/MultipleImage";
import AlertModal from "../../PageComponents/Modals/AlertModal";
import { toast } from "react-toastify";
import axios from "axios";
import useServerIP from "../../services/ServerIP";

export default function EntranceHeader({ StoreCycle = false, SearchedNumber= false, trigger }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      final_register:
        JSON.parse(localStorage.getItem("final_register"))?.id || "",
      company: JSON.parse(localStorage.getItem("company"))?.id || "",
      store: JSON.parse(localStorage.getItem("store"))?.id || "",
      factor_number: "",
      factor_date: new Date().toISOString().slice(0, 10),
      recived_by: "",
      deliver_by: "",
      entrance_search: "",
      currency: JSON.parse(localStorage.getItem("currency"))?.id || "",
      description: "",
      entrance_id: "",
      total_interest: localStorage.getItem("total_interest") || "",
      discount_percent:
        localStorage.getItem("discount_percent") || "",
      wholesale: JSON.parse(localStorage.getItem("wholesale"))?.id || "",
      payment_method:
        JSON.parse(localStorage.getItem("payment_method"))?.id || "",
      currency_rate: "",
    },
  });
  const user = useAuthUser();
  const [reKey, setReKey] = useState(0);


  const { data: finalRegister } = useQuery("final-register/");
  const { data: company } = useQuery("pharm-companies/");
  const { data: store } = useQuery("store/");
  const { data: currency } = useQuery("currency/");
  const { data: paymentMethod } = useQuery("payment-method/");
  const { entrance, setEntrance } = useEntrance();

  const { mutate: submitEntrance } = useMutation({
    mutationFn: (data) => postDataFn(data, "entrance/"),
    onSuccess: (res) => {
      successFn("", () => {
        setEntrance(res);
        setMedicineShow(new Date());
      });
    },
  });
  const { mutate: updateEntrance } = useMutation({
    mutationFn: (data) => putDataFn(data, `entrance/${entrance?.id}/`),
    onSuccess: (res) => {
      toast.success("موفقانه بود");
      setEntrance(res);
    },
  });
  const { mutate: deleteEntrance } = useMutation({
    mutationFn: () => deleteDataFn(`entrance/${entrance.id}/`),
    onSuccess: () => {
      successFn("", () => {
        newEntrance();
      });
    },
    onError: () => {
      toast.error("اقلام وارد شده را حذف کرده دوباره سعی کنید");
    },
  });

  const newEntrance = () => {
    setReKey(new Date());
    setEntrance([]);
    calculateRater()
  };
  const { serverIP } = useServerIP();



  useEffect(() => {
    SearchedNumber && setEntrance([])
    SearchedNumber && toast.info('لطفا منتظر بمانید...')
    setTimeout(() => {
      SearchedNumber && axios.get(serverIP + "api/" + `entrance/${SearchedNumber}/`).then((res)=> {
        setEntrance(res.data)
        toast.success('موفقانه جستجو شد')
      })
    }, 500)

  }, [SearchedNumber, serverIP, trigger])

  const { setSubmitedEntrance } = useSubmitedEntrance();

  const revertEntrance = () => {
    setReKey(new Date());
    reset({
      final_register: entrance?.final_register,
      company: entrance?.company,
      store: entrance?.store,
      factor_number: entrance?.factor_number ? entrance?.factor_number : "",
      factor_date: entrance?.factor_date?.slice(0, 10),
      recived_by: entrance?.recived_by,
      deliver_by: entrance?.deliver_by,
      entrance_search: "",
      currency: entrance?.currency,
      description: entrance?.description,
      total_interest: entrance?.total_interest,
      discount_percent: entrance?.discount_percent,
      wholesale: entrance?.wholesale,
      entrance_id: entrance?.id,
      payment_method: entrance?.payment_method,
      currency_rate: entrance?.currency_rate,
    });
  };

  const { refetch: searchEntrance } = useQuery({
    queryKey: [`entrance/${watch("entrance_search")}/`],
    enabled: false,
    onSuccess: (res) => {
      successFn("", () => {
        setEntrance(res);
      });
    },
  });

  useEffect(() => {
    setReKey(new Date());
    reset({
      final_register:
        entrance?.final_register ||
        JSON.parse(localStorage.getItem("final_register"))?.id ||
        "",
      company:
        entrance?.company ||
        JSON.parse(localStorage.getItem("company"))?.id ||
        "",
      store:
        entrance?.store || JSON.parse(localStorage.getItem("store"))?.id || "",
      factor_number: entrance?.factor_number || "",
      factor_date:
        entrance?.factor_date?.slice(0, 10) ||
        new Date().toISOString().slice(0, 10),
      recived_by: entrance?.recived_by || "",
      deliver_by: entrance?.deliver_by || "",
      entrance_search: "",
      currency:
        entrance?.currency ||
        JSON.parse(localStorage.getItem("currency"))?.id ||
        "",
      description: entrance?.description || "",
      total_interest:
        entrance?.total_interest ||
        localStorage.getItem("total_interest") ||
        "",
      discount_percent:
        entrance?.discount_percent ||
        localStorage.getItem("discount_percent") ||
        "",
      wholesale:
        entrance?.wholesale ||
        JSON.parse(localStorage.getItem("wholesale"))?.id ||
        "",
      entrance_id: entrance?.id || "",
      payment_method:
        entrance?.payment_method ||
        JSON.parse(localStorage.getItem("payment_method"))?.id ||
        "",
      currency_rate: entrance?.currency_rate || "",
    });
    entrance?.id && revertEntrance();
  }, [entrance]);

  const calculateRater = () => {
    const currency_rater = () => {
      return (
        currency?.filter((cur) => {
          return cur.id == parseInt(watch("currency"));
        }) || ""
      );
    };
    currency_rater && setTimeout(()=> {
      setValue("currency_rate", currency_rater()[0]?.rate);
    }, 200)
  }

  useEffect(() => {
    calculateRater()
  }, [watch("currency")]);

  const deleteAlertRef = useRef(null);

  const { medicineShow, setMedicineShow } = useMedicineShow();

  return (
    <>
      <AlertModal
        errorText={"آیا موافق با حذف این حواله ورودی هستید؟"}
        errorTitle={"این عمل غیر قابل بازگشت است!"}
        OkFunc={() => deleteEntrance()}
        NoFunc={() => deleteAlertRef.current.Closer()}
        ref={deleteAlertRef}
      ></AlertModal>
      <form
        className="entrance-entrance"
        onSubmit={handleSubmit((data) =>
          handleFormData(
            data,
            entrance?.id ? updateEntrance : submitEntrance,
            user
          )
        )}
      >
        <label>وضعیت:</label>
        <ControlledSelect
          control={control}
          autoFocus={entrance?.id ? false : true}
          name="final_register"
          error={errors.final_register ? true : false}
          required={true}
          options={finalRegister}
          reset={reset}
          placeholder=""
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          uniqueKey={`entrance-unique${reKey}`}
          defaultValue={finalRegister?.find((c) =>
            c.id === entrance?.final_register ? c.name : ""
          )}
          NewComponent={
            <PurchasingLists button="plus" activeKey="final-registers" />
          }
        />
        <label>شرکت:</label>
        <div className="react-select-box">
          <ControlledSelect
            control={control}
            name="company"
            error={errors.company ? true : false}
            required={true}
            options={company}
            placeholder=""
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            uniqueKey={`entrance-unique${reKey}`}
            defaultValue={company?.find((c) =>
              c.id === entrance?.company ? c.name : ""
            )}
            NewComponent={
              <PurchasingLists button="plus" activeKey="companies" />
            }
          />
        </div>
        <label>انبار:</label>
        <div>
          <ControlledSelect
            control={control}
            name="store"
            options={store}
            error={errors.store ? true : false}
            required={true}
            placeholder=""
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            uniqueKey={`entrance-unique${reKey}`}
            defaultValue={store?.find((c) =>
              c.id === entrance?.store ? c.name : ""
            )}
            NewComponent={<PurchasingLists button="plus" activeKey="stores" />}
          />
        </div>
        <label>تاریخ:</label>
        <DateInputSimple
          onChange={(res) => setValue("factor_date", res.target.value)}
          value={watch("factor_date")}
        />
        <label>شماره:</label>
        <input
          type="text"
          {...register("factor_number")}
          defaultValue={entrance?.factor_number}
          className="entrance--inputs"
        />

        <label>ش.حواله:</label>
        <div className="flex">
          <input
            value={entrance?.id}
            type="text"
            {...register("entrance_id")}
            disabled
            tabIndex={-1}
          />
          <form className="search-form" tabIndex={-1}>
            <input type="text" {...register("entrance_search")} tabIndex={-1} />
            <button
              className="search-button-box"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                searchEntrance(e.target.value);
              }}
              tabIndex={-1}
            >
              <i class="fa-brands fa-searchengin"></i>
            </button>
          </form>
        </div>

        <label>
          <h5>تحویل دهنده:</h5>
        </label>
        <input
          type="text"
          {...register("deliver_by")}
          defaultValue={entrance?.deliver_by}
          className="entrance--inputs"
        />
        <label>
          <h5>تحویل گیرنده:</h5>
        </label>
        <input
          type="text"
          {...register("recived_by")}
          defaultValue={entrance?.recived_by}
          className="entrance--inputs"
        />
        <label>واحد_پول:</label>
        <div style={{ display: "grid", gridTemplateColumns: "50% 10% 40%" }}>
          <ControlledSelect
            control={control}
            name="currency"
            options={currency}
            placeholder=""
            isClearable={false}
            error={errors.currency ? true : false}
            required={true}
            getOptionLabel={(option) => option.name + "(" + option.rate + ")"}
            getOptionValue={(option) => option.id}
            uniqueKey={`entrance-unique${reKey}`}
            defaultValue={currency?.find((c) =>
              c.id === entrance?.currency ? c.name : ""
            )}
            NewComponent={
              <PurchasingLists button="plus" activeKey="currencies" />
            }
          />
          <label></label>
          <input
            type="text"
            disabled={
              watch("currency") ==
              currency?.filter((item) => {
                return item.name == "AFN" && item.id;
              })?.[0]?.id
                ? true
                : false
            }
            {...register("currency_rate")}
            className="entrance--inputs"
          />
        </div>
        <label>پرداخت:</label>
        <ControlledSelect
          control={control}
          name="payment_method"
          options={paymentMethod}
          placeholder=""
          error={errors.payment_method ? true : false}
          required={true}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          uniqueKey={`entrance-unique${reKey}`}
          defaultValue={paymentMethod?.find((c) =>
            c.id === entrance?.payment_method ? c.name : ""
          )}
          NewComponent={<PurchasingLists button="plus" activeKey="payments" />}
        />
        <label>
          <h5>فایده%:</h5>
        </label>
        <div className="numbers-box-pocket-1">
          <input
            type="text"
            defaultValue={entrance?.total_interest}
            {...register("total_interest", { required: true })}
            className={`entrance--inputs ${
              errors.total_interest ? "error-input" : ""
            }`}
          />
          <lable>مبلغ_تخفیف:</lable>
          <input
            type="text"
            defaultValue={entrance?.discount_percent}
            {...register("discount_percent")}
            className="entrance--inputs"
          />
        </div>
        <label>
          <h5>نوع ورودی:</h5>
        </label>
        <select
          defaultValue={entrance?.wholesale}
          className={`entrance--inputs ${
            errors.wholesale ? "error-input" : ""
          }`}
          {...register("wholesale", { required: true })}
        >
          <option value={"WHOLESALE"}>عمده</option>
          <option value={"SINGULAR"}>پرچون</option>
        </select>
        <label>توضیحات:</label>
        <input
          {...register("description")}
          defaultValue={entrance?.description}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              handleSubmit((data) =>
                handleFormData(
                  data,
                  entrance.id ? updateEntrance : submitEntrance,
                  user
                )
              )();
            }
          }}
          className="entrance--inputs"
        ></input>
        <label></label>
        <MultipleImage />
        <label></label>
        <ButtonGroup>
          <FormButton
            name="حذف"
            Func={() => {
              deleteAlertRef.current.Opener();
            }}
            disabled={entrance?.id ? false : true}
          />
          <FormButton
            name="ریسیت"
            className="revert-button"
            Func={() => revertEntrance()}
            disabled={entrance?.id && isDirty == true ? false : true}
          />
          <FormButton name="جدید" Func={() => newEntrance()} />
          <SubmitButton
            Func={() => {
              entrance?.currency_rate != watch("currency_rate") &&
                setSubmitedEntrance({ id: new Date() });
            }}
            name={entrance?.id ? "آپدیت" : "ثبت"}
            disabled={errors.final_register ? true : false}
          />
        </ButtonGroup>
      </form>
    </>
  );
}
