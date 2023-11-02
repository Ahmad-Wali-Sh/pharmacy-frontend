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
import { useEntrance } from "../../States/States";
import {
  deleteDataFn,
  handleFormData,
  postDataFn,
  putDataFn,
  successFn,
} from "../../services/API";
import { useAuthUser } from "react-auth-kit";
import { useState, useEffect } from "react";

export default function EntranceHeader() {
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
      final_register: "",
      company: "",
      store: "",
      factor_number: "",
      factor_date: new Date().toISOString().slice(0, 10),
      recived_by: "",
      deliver_by: "",
      entrance_search: "",
      currency: "",
      description: "",
      entrance_id: "",
      total_interest: "",
      discount_percent_entrance: "",
      wholesale: "",
      entrance_id: "",
      payment_method: "",
    },
  });
  const user = useAuthUser();
  const [reKey, setReKey] = useState(0);

  const { data: finalRegister } = useQuery("final-register");
  const { data: company } = useQuery("pharm-companies");
  const { data: store } = useQuery("store");
  const { data: currency } = useQuery("currency");
  const { data: paymentMethod } = useQuery("payment-method");
  const { entrance, setEntrance } = useEntrance();

  const { mutate: submitEntrance } = useMutation({
    mutationFn: (data) => postDataFn(data, "entrance/"),
    onSuccess: (res) => {
      successFn("", () => {
        setEntrance(res.data);
      });
    },
  });
  const { mutate: updateEntrance } = useMutation({
    mutationFn: (data) => putDataFn(data, `entrance/${entrance.id}/`),
    onSuccess: (res) => {
      successFn("", () => {
        setEntrance(res.data);
        reset({ isDirty: false });
      });
    },
  });
  const { mutate: deleteEntrance } = useMutation({
    mutationFn: () => deleteDataFn(`entrance/${entrance.id}/`),
    onSuccess: () => {
      successFn("", () => {
        newEntrance();
      });
    },
  });

  const newEntrance = () => {
    setReKey((prev) => prev + 1);
    setEntrance([]);
    reset({
      final_register: "",
      company: "",
      store: "",
      factor_number: "",
      recived_by: "",
      deliver_by: "",
      factor_date: new Date().toISOString().slice(0, 10),
      entrance_search: "",
      currency: "",
      description: "",
      entrance_id: "",
      total_interest: "",
      discount_percent_entrance: "",
      wholesale: "",
      entrance_id: "",
      payment_method: "",
    });
  };

  const revertEntrance = () => {
    setReKey((prev) => prev + 1);
    reset({
      final_register: entrance?.final_register,
      company: entrance?.company,
      store: entrance?.store,
      factor_number: entrance?.factor_number ? entrance?.factor_number : '',
      factor_date: entrance?.factor_date?.slice(0, 10),
      recived_by: entrance?.recived_by,
      deliver_by: entrance?.deliver_by,
      entrance_search: "",
      currency: entrance?.currency,
      description: entrance?.description,
      entrance_id: "",
      total_interest: entrance?.total_interest,
      discount_percent_entrance: entrance?.discount_percent_entrance,
      wholesale: entrance?.wholesale,
      entrance_id: entrance?.id,
      payment_method: entrance?.payment_method,
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
    revertEntrance()
  }, [entrance]);

  return (
    <form
      className="entrance-entrance"
      onSubmit={handleSubmit((data) =>
        handleFormData(
          data,
          entrance.id ? updateEntrance : submitEntrance,
          user
        )
      )}
    >
      <label>وضعیت:</label>
      <ControlledSelect
        control={control}
        name="final_register"
        options={finalRegister}
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
          options={company}
          placeholder=""
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          uniqueKey={`entrance-unique${reKey}`}
          defaultValue={company?.find((c) =>
            c.id === entrance?.company ? c.name : ""
          )}
          NewComponent={<PurchasingLists button="plus" activeKey="companies" />}
        />
      </div>
      <label>انبار:</label>
      <div>
        <ControlledSelect
          control={control}
          name="store"
          options={store}
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
      <ControlledSelect
        control={control}
        name="currency"
        options={currency}
        placeholder=""
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        uniqueKey={`entrance-unique${reKey}`}
        defaultValue={currency?.find((c) =>
          c.id === entrance?.currency ? c.name : ""
        )}
        NewComponent={<PurchasingLists button="plus" activeKey="currencies" />}
      />
      <label>پرداخت:</label>
      <ControlledSelect
        control={control}
        name="payment_method"
        options={paymentMethod}
        placeholder=""
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
          {...register("total_interest")}
          className="entrance--inputs"
        />
        <lable>تخفیف%:</lable>
        <input
          type="text"
          defaultValue={entrance?.discount_percent}
          {...register("discount_percent_entrance")}
          className="entrance--inputs"
        />
      </div>
      <label>
        <h5>نوع ورودی:</h5>
      </label>
      <select defaultValue={entrance?.wholesale} {...register("wholesale")}>
        <option value={"WHOLESALE"}>عمده</option>
        <option value={"SINGULAR"}>پرچون</option>
      </select>
      <label>توضیحات:</label>
      <input
        {...register("description")}
        defaultValue={entrance?.description}
        className="entrance--inputs"
      ></input>
      <label>عکس:</label>
      <input
        type="file"
        //   onChange={(e) => {
        //     props.setFile(e.target.files[0]);
        //   }}
      ></input>
      <a
        href={entrance?.image && new URL(entrance?.image).pathname.slice(16)}
        target="_blank"
        style={{
          textDecoration: "none",
          color: "grey",
        }}
      >
        {entrance?.image ? "Show_Photo" : ""}
      </a>
      <ButtonGroup>
        <FormButton name="حذف" Func={() => deleteEntrance()} />
        <FormButton
          name="ریسیت"
          className="revert-button"
          Func={() => revertEntrance()}
          disabled={entrance?.id && isDirty == true ? false : true}
        />
        <FormButton name="جدید" Func={() => newEntrance()} />
        <SubmitButton
          Func={() => console.log("submited")}
          name={entrance?.id ? "آپدیت" : "ثبت"}
        />
      </ButtonGroup>
    </form>
  );
}
