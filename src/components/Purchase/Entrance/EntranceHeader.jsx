import { DateInputSimple } from "react-hichestan-datetimepicker";
import ControlledSelect from "../../PageComponents/ControlledSelect";
import PurchasingLists from "../../PageComponents/Lists/PurchaseLists/PurchasingLists";
import { ButtonGroup, FormButton } from "../../PageComponents/Buttons/Buttons";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useEntrance } from "../../States/States";
import { postDataFn, putDataFn } from "../../services/API";

export default function EntranceHeader() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
      defaultValues: {
          factor_date: new Date().toISOString().slice(0,10)
      }
  });

  const { data: finalRegister } = useQuery("final-register");
  const { data: company } = useQuery("pharm-companies");
  const { data: store } = useQuery("store");
  const { data: currency } = useQuery("currency");
  const { data: paymentMethod } = useQuery("payment-method");
  const { entrance, setEntrance } = useEntrance();

  const { mutate: SubmitHandle } = useMutation({
    mutationFn: (data) => postDataFn(data, "entrance"),
    onSuccess: (res) => {
      successFn("", () => {
        setEntrance(res.data);
      });
    },
  });
  const { mutate: UpdateHandle } = useMutation({
    mutationFn: (data) => putDataFn(data, `entrance/${entrance.id}`),
    onSuccess: (res) => {
      successFn("", () => {
        setEntrance(res.data);
      });
    },
  });


  const SearchHandle = () => {
      
  }


  const DeleteHandle = () => {

  }

  const ResetHandle = () => {

  }

  const NewHandle = () => {
      
  }

  return (
    <form className="entrance-entrance" onSubmit={() => handleSubmit(SubmitHandle)}>
      <label>وضعیت:</label>
      <ControlledSelect
        control={control} // tabIndex={0}
        name="final_register"
        options={finalRegister}
        placeholder=""
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        uniqueKey={`entrance-unique${entrance.id}`}
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
          uniqueKey={`entrance-unique${entrance.id}`}
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
          uniqueKey={`entrance-unique${entrance.id}`}
          defaultValue={store?.find((c) =>
            c.id === entrance?.store ? c.name : ""
          )}
          NewComponent={<PurchasingLists button="plus" activeKey="stores" />}
        />
      </div>
      <label>تاریخ:</label>

      <DateInputSimple
        onChange={(res) => setValue('factor_date', res.target.value)}
        value={watch('factor_date')}
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
        <form
          className="search-form"
          // onSubmit={props.handleSubmit(props.SearchSubmit)}
          tabIndex={-1}
        >
          <input type="text" {...register("entrance_search")} tabIndex={-1} />
          <button
            className="search-button-box"
            type="submit"
            //   onClick={props.handleSubmit(props.SearchSubmit)}
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
        uniqueKey={`entrance-unique${entrance.id}`}
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
        uniqueKey={`entrance-unique${entrance.id}`}
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
        <FormButton name="حذف" Func={() => console.log("حذف")} />
        <FormButton
          name="ریسیت"
          Func={() => console.log("reset")}
          disabled={true}
        />
        <FormButton name="جدید" Func={() => console.log("new")} />
        <FormButton
          Func={() => console.log("submit")}
          name={entrance ? "آپدیت" : "ثبت"}
        />
      </ButtonGroup>
    </form>
  );
}
