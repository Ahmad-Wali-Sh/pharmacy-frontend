import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import "../../../datePicker.css";
import { useMutation } from "react-query";
import {
  deleteDataFn,
  handleFormData,
  patchDataFn,
  queryClient,
  successFn,
} from "../../services/API";
import { useEntrance, useSubmitedEntrance } from "../../States/States";
import { toast } from "react-toastify";

function EntrancThroughEntry({ through, keyValue, num }) {
  const user = useAuthUser();
  const { entrance, setEntrance } = useEntrance();
  const AlertHighlighter = () => {
    return true;
  };
  const DateComprison = (date) => {
    return true;
  };

  const { submitedEntrance } = useSubmitedEntrance()
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {

    if (!isInitialRender) {
      submitedEntrance.id && entrance.id && setTimeout(() => {
        handleSubmit((data) =>
          handleFormData(data, medicineUpdate, user)
        )()
      }, 1000)
      submitedEntrance.id && entrance.id && toast.warning('...قیمت ارز در حال آپدیت')
    } else {
      setIsInitialRender(false)
    }
  }, [submitedEntrance?.id])
  const { mutate: medicineUpdate } = useMutation({

    mutationFn: (data) => patchDataFn(data, `entrance-throug/${through.id}/`),
    onSuccess: (res) => {
      handleSubmit((data) =>
        handleFormData(data, interestPercentUpdate, user)
      )()
      queryClient.invalidateQueries([
        `entrance-throug/?entrance=${entrance.id}`,
      ]);
    },
  });

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

  const { mutate: interestPercentUpdate } = useMutation({
    mutationFn: (data) => {
      data.set("each_sell_price_afg", sell_price_get());
      patchDataFn(data, `entrance-throug/${through.id}/`);
    },
    onSuccess: (res) => {
      setTimeout(() => {
        queryClient.invalidateQueries([
          `entrance-throug/?entrance=${entrance.id}`,
        ]);
      }, 200);
    },
  });
  const { mutate: afghanPriceUpdate } = useMutation({
    mutationFn: (data) => {
      data.set("interest_percent", interest_get());
      patchDataFn(data, `entrance-throug/${through.id}/`);
    },
    onSuccess: (res) => {
      successFn("", () => {
        setTimeout(() => {
          queryClient.invalidateQueries([
            `entrance-throug/?entrance=${entrance.id}`,
          ]);
        }, 200);
      });
    },
  });

  const { mutate: MedicineDelete } = useMutation({
    mutationFn: () => {
      deleteDataFn(`entrance-throug/${through.id}/`);
    },
    onSuccess: () => {
      successFn("", () => {
        setTimeout(() => {
          queryClient.invalidateQueries([
            `entrance-throug/?entrance=${entrance.id}`,
          ]);
        }, 200);
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      number_in_factor: through.number_in_factor,
      each_price_factor: through.each_price_factor,
      discount_money: through.discount_money,
      discount_percent: through.discount_percent,
      quantity_bonus: through.quantity_bonus,
      shortage: through.shortage,
      interest_percent: through.interest_percent,
      each_sell_price_afg: through.each_sell_price_afg,
    });
  }, [through]);

  return (
    <form key={keyValue}>
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
          {...register("number_in_factor")}
          onBlurCapture={handleSubmit((data) =>
            handleFormData(data, medicineUpdate, user)
          )}
        />
        <div className="input-with-currency">
          <span className="currency-span">{through.rate_name}</span>
          <input
            type="text"
            className="transparent-inputs"
            {...register("each_price_factor")}
            onBlurCapture={handleSubmit((data) =>
              handleFormData(data, medicineUpdate, user)
            )}
          />
        </div>
        <div className="input-with-currency">
          <span className="currency-span">{through.rate_name}</span>
          <input
            type="text"
            {...register("discount_money")}
            className="transparent-inputs"
            onBlurCapture={handleSubmit((data) =>
              handleFormData(data, medicineUpdate, user)
            )}
          />
        </div>
        <div className="input-with-currency">
          <span className="currency-span-percent">%</span>
          <input
            type="text"
            {...register("discount_percent")}
            className="transparent-inputs-percent"
            onBlurCapture={handleSubmit((data) =>
              handleFormData(data, medicineUpdate, user)
            )}
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
          {...register("quantity_bonus")}
          style={{ zIndex: "10" }}
          onBlurCapture={handleSubmit((data) =>
            handleFormData(data, medicineUpdate, user)
          )}
        />

        <div
          className={
            DateComprison(through.expire_date)
              ? "container-data-expire"
              : "container-data-expire transparent-inputs-date-alert"
          }
        >
          <input
            type="date"
            defaultValue={through.timestamp?.slice(0, 10)}
            {...register("timestamp")}
            className="expire_date_transparent"
            onBlurCapture={handleSubmit((data) =>
              handleFormData(data, medicineUpdate, user)
            )}
          />
        </div>
        <input
          type="text"
          defaultValue={through.shortage}
          {...register("shortage")}
          style={{ zIndex: "10" }}
          onBlurCapture={handleSubmit((data) =>
            handleFormData(data, medicineUpdate, user)
          )}
        />
        <input
          type="checkbox"
          defaultChecked={through.lease}
          {...register("lease")}
          style={{ width: "1rem", marginRight: "0rem" }}
          onBlurCapture={handleSubmit((data) =>
            handleFormData(data, medicineUpdate, user)
          )}
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
            {...register("interest_percent")}
            className={
              through.interest_percent > 0 && through.interest_percent <= 100
                ? "transparent-inputs-percent"
                : "transparent-inputs-percent-alert"
            }
            onBlurCapture={handleSubmit((data) =>
              handleFormData(data, interestPercentUpdate, user)
            )}
          />
        </div>

        <div className="input-with-currency">
          <span className="currency-span" style={{ cursor: "default" }}>
            AFG
          </span>
          <input
            type="text"
            className="transparent-inputs"
            {...register("each_sell_price_afg")}
            style={{ cursor: "default" }}
            onBlurCapture={handleSubmit((data) =>
              handleFormData(data, afghanPriceUpdate, user)
            )}
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
