import React, { useEffect, useState } from "react";
import { DepartButton } from "../PageComponents/Buttons/Buttons";
import ControlledSelect from "../PageComponents/ControlledSelect";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import PurchasingLists from "../PageComponents/Lists/PurchaseLists/PurchasingLists";
import { toast } from "react-toastify";

function EntranceSettings() {
  const { data: finalRegister } = useQuery("final-register/");
  const { data: company } = useQuery("pharm-companies/");
  const { data: store } = useQuery("store/");
  const { data: currency } = useQuery("currency/");
  const { data: paymentMethod } = useQuery("payment-method/");
  const EntranceKind = [
    { id: "WHOLESALE", name: "عمده" },
    { id: "SINGULAR", name: "پرچون" },
  ];

  const { control } = useForm();

  return (
    <>
      <h4 style={{ padding: "1rem" }}>مقادیر پیش‌فرض حواله ورود: </h4>
      <div className="ent-settings-container">
        <label>وضعیت:</label>
        <ControlledSelect
          control={control}
          name="final_register"
          options={finalRegister}
          placeholder=""
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          storeToLocal={true}
        />
        <label>شرکت:</label>
        <ControlledSelect
          control={control}
          name="company"
          options={company}
          placeholder=""
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          storeToLocal={true}
        />
        <label>انبار:</label>
        <ControlledSelect
          control={control}
          name="store"
          options={store}
          placeholder=""
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          storeToLocal={true}
        />
        <label>واحد_پولی:</label>
        <ControlledSelect
          control={control}
          name="currency"
          options={currency}
          placeholder=""
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          storeToLocal={true}
        />
        <label>پرداخت:</label>
        <ControlledSelect
          control={control}
          name="payment_method"
          options={paymentMethod}
          placeholder=""
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          storeToLocal={true}
        />
        <label>نوع_ورودی:</label>
        <ControlledSelect
          control={control}
          name="wholesale"
          options={EntranceKind}
          placeholder=""
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          storeToLocal={true}
        />
        <label>فایده %:</label>
        <input
          type="text"
          onChange={(e) => {
            localStorage.setItem("total_interest", e.target.value);
          }}
          className="entrance--inputs"
          defaultValue={localStorage.getItem("total_interest")}
        />
        <label>تخفیف %:</label>
        <input
          type="text"
          onChange={(e) => {
            localStorage.setItem("discount_percent_entrance", e.target.value);
          }}
          className="entrance--inputs"
          defaultValue={localStorage.getItem("discount_percent_entrance")}
        />
      </div>
      <div className="list-footer">
        <div>
          <DepartButton
            name="تایید"
            Func={() => {
              toast.success("تنظیمات موفقانه ذخیره شد");
            }}
          />
        </div>
      </div>
    </>
  );
}

export default EntranceSettings;
