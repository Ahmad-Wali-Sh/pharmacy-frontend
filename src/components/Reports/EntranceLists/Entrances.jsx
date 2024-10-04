import React, { useEffect, useRef, useState } from "react";
import FilterModal from "../../PageComponents/Modals/FilterModal";
import useServerIP from "../../services/ServerIP";
import { useQuery } from "react-query";
import axios from "axios";
import ControlledSelect from "../../PageComponents/ControlledSelect";
import { useForm } from "react-hook-form";
import { FormButton } from "../../PageComponents/Buttons/Buttons";
import { ListFooter } from "../../PageComponents/ListingComponents";
import { toast } from "react-toastify";
import fileDownload from "js-file-download";

function Entrances() {
  const FilterModalRef = useRef(null);

  const { serverIP } = useServerIP();
  const { data: finalRegisters } = useQuery(["final-register/"]);
  const { data: companies } = useQuery(["pharm-companies/"]);
  const { data: paymentMethods } = useQuery(["payment-method/"]);
  const { data: currencis } = useQuery(["currency/"]);
  const { data: stores } = useQuery(["store/"]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    serverIP &&
      axios.get(serverIP + "auth/users/").then((res) => {
        setUsers(res?.data);
      });
  }, [serverIP]);

  const defaultForm = {
    page: 1,
    factor_number: "",
    company: "",
    factor_date_before: "",
    factor_date_after: "",
    payment_method: "",
    currency: "",
    final_register: "",
    store: "",
    deliver_by: "",
    received_by: "",
    entrance_id: "",
    wholesale: "",
    username: "",
    medicine: "",
  };

  const { register, watch, control, setValue } = useForm({
    defaultValues: defaultForm,
  });

  const ModalFilterStyles = {
    content: {
      backgroundColor: "var(--bg-200)",
      border: "none",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "0px",
      width: "65%",
      left: "20%",
      height: "25rem",
      top: "15%",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
      textAlign: "center",
    },
  };

  let query = `final_register=${
    watch("final_register")?.id || ""
  }&factor_number=${watch("factor_number")}&factor_date_after=${watch(
    "factor_date_after"
  )}&factor_date_before=${watch("factor_date_before")}&id=${watch(
    "entrance_id"
  )}&payment_method=${watch("payment_method")?.id || ""}&currency=${
    watch("currency")?.id || ""
  }&store=${watch("store")?.id || ""}&deliver_by=${watch(
    "deliver_by"
  )}&recived_by=${watch("received_by")}&wholesale=${
    watch("wholesale")?.value || ""
  }&user=${watch("username")?.id || ""}`;
  const { data: entrances } = useQuery({
    queryKey: [`entrance-pg/?page=${watch("page")}&${query}`],
  });

  let wholesaleObject = [
    { label: "عمده", value: "WHOLESALE" },
    { label: "پرچون", value: "SINGULAR" },
  ];

  const EntranceExport = () => {
    toast.warning('فایل در حال ذخیره سازی است')
    axios({
      url: `${serverIP}api/entrance-excel/?` + query + "&format=csv",
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      toast.success('تکمیل شد')
      fileDownload(response.data, `entrances.csv`);
    });
  }

  const EntranceTroughsExport = () => {
    toast.warning('فایل در حال ذخیره سازی است')
    axios({
      url: `${serverIP}api/entrance-through-excel/?` + query + "&format=csv",
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      toast.success('تکمیل شد')
      fileDownload(response.data, `entranceThroughs.csv`);
    });
  }

  return (
    <>
      <FilterModal
        ref={FilterModalRef}
        ModalStyle={ModalFilterStyles}
        title={"فلترنگ حواله های ورود"}
      >
        <div className="entrances-filter-modal-container">
          <div>
            <label>وضعیت:</label>
            <ControlledSelect
              control={control}
              name="final-register"
              options={finalRegisters}
              placeholder=""
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              onChange={(res) => {
                console.log(res);
                res
                  ? setValue("final_register", res)
                  : setValue("final_register", "");
              }}
              uniqueKey={`final-register${watch("final_register")}`}
              defaultValue={watch("final_register")}
            />
          </div>
          <div>
            <label>ش.حواله:</label>
            <input type="text" {...register("entrance_id")} />
          </div>
          <div>
            <label>ش.فاکتور:</label>
            <input type="text" {...register("factor_number")} />
          </div>
          <div>
            <label>از_تاریخ:</label>
            <input type="date" {...register("factor_date_after")} />
          </div>
          <div>
            <label>تا_تاریخ:</label>
            <input type="date" {...register("factor_date_before")} />
          </div>
          <div>
            <label>پرداخت:</label>
            <ControlledSelect
              control={control}
              name="final-register"
              options={paymentMethods}
              placeholder=""
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              onChange={(res) => {
                res
                  ? setValue("payment_method", res)
                  : setValue("payment_method", "");
              }}
              uniqueKey={`final-payment_method${watch("payment_method")}`}
              defaultValue={watch("payment_method")}
            />
          </div>
          <div>
            <label>ارز:</label>
            <ControlledSelect
              control={control}
              name="currency"
              options={currencis}
              placeholder=""
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              onChange={(res) => {
                res ? setValue("currency", res) : setValue("currency", "");
              }}
              uniqueKey={`currency${watch("currency")}`}
              defaultValue={watch("currency")}
            />
          </div>
          <div>
            <label>انبار:</label>
            <ControlledSelect
              control={control}
              name="store"
              options={stores}
              placeholder=""
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              onChange={(res) => {
                res ? setValue("store", res) : setValue("store", "");
              }}
              uniqueKey={`store${watch("store")}`}
              defaultValue={watch("store")}
            />
          </div>
          <div>
            <label>ورودی:</label>
            <ControlledSelect
              control={control}
              name="wholesale"
              options={wholesaleObject}
              placeholder=""
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              onChange={(res) => {
                res ? setValue("wholesale", res) : setValue("wholesale", "");
              }}
              uniqueKey={`wholesale${watch("wholesale")}`}
              defaultValue={watch("wholesale")}
            />
          </div>
          <div>
            <label>کاربر:</label>
            <ControlledSelect
              control={control}
              name="username"
              options={users}
              placeholder=""
              getOptionLabel={(option) =>
                option.first_name + " " + option.username
              }
              getOptionValue={(option) =>
                option.first_name + " " + option.username
              }
              onChange={(res) => {
                res ? setValue("username", res) : setValue("username", "");
              }}
              uniqueKey={`username${watch("username")}`}
              defaultValue={watch("username")}
            />
          </div>
          <div>
            <label>تحویل دهنده:</label>
            <input type="text" {...register("deliver_by")} />
          </div>
          <div>
            <label>تحویل گیرنده:</label>
            <input type="text" {...register("received_by")} />
          </div>
        </div>
        <hr></hr>
        <br></br>
        <FormButton name=" Entrances.csv " Func={() => {
          EntranceExport()
        }} />{" "}
        <FormButton name=" EntranceThroughs.csv " Func={() => {
          EntranceTroughsExport()
        }} />
      </FilterModal>
      <div
        className="filter-button"
        onClick={() => FilterModalRef.current.Opener()}
      >
        <i className="fa-solid fa-filter"></i>
      </div>
      <div className="entrances-list-header">
        <h4>ردیف</h4>
        <h4>ش.حواله</h4>
        <h4>ش.فاکتور</h4>
        <h4>وضعیت</h4>
        <h4>شرکت</h4>
        <h4>انبار</h4>
        <h4>پرداخت</h4>
        <h4>واحد_پولی</h4>
        <h4>نوع_ورودی</h4>
        <h4>بیشتر</h4>
      </div>
      <div className="entrances-list-container">
        {entrances?.results?.map((entrance, num) => (
          <div className="entrances-list-item">
            <h4>{num + 1}</h4>
            <h4>{entrance.id}</h4>
            <h4>{entrance.factor_number}</h4>
            <h4>{entrance.final_register_name}</h4>
            <h4>{entrance.company_name}</h4>
            <h4>{entrance.store_name}</h4>
            <h4>{entrance.payment_method_name}</h4>
            <h4>{entrance.currency_name}</h4>
            <h4>{entrance.wholesale == "WHOLESALE" ? "عمده" : "پرچون"}</h4>
            <h4>بیشتر</h4>
          </div>
        ))}
      </div>
      <div className="pagination-group-center">
        {entrances?.previous && (
          <h4
            onClick={() => {
              const currentPage = parseInt(watch("page")) || 1;
              if (currentPage > 1) {
                setValue("page", currentPage - 1);
              }
            }}
          >
            {"<<"}
          </h4>
        )}
        {entrances?.next && (
          <h4
          onClick={() => {
            const currentPage = parseInt(watch("page")) || 1;
              setValue("page", currentPage + 1);
          }}
          >
            {">>"}
          </h4>
        )}
      </div>

    </>
  );
}

export default Entrances;
