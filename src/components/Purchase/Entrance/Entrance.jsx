import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import { handleFormData, putDataFn, successFn } from "../../services/API";
import BigModal from "../../PageComponents/Modals/BigModal";
import AlertModal from "../../PageComponents/Modals/AlertModal";
import EntranceForm from "./EntranceForm";

export default function Entrance(props) {
  const EntranceModalRef = useRef(null);
  const SubmitedAlertRef = useRef(null);
  const PreviousPriceAlertRef = useRef(null);
  const TotalPriceAlertRef = useRef(null);
  const PriceAppliedAlertRef = useRef(null);

  const ENTRANCE_URL = import.meta.env.VITE_ENTRANCE;
  const ENTRANCE_THROUGH_URL = import.meta.env.VITE_ENTRANCE_THROUGH;
  const COUNTRY_URL = import.meta.env.VITE_COUNTRY;
  const KIND_URL = import.meta.env.VITE_KIND;
  const PHARM_GROUB_URL = import.meta.env.VITE_PHARM_GROUB;
  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;
  const LAST_ENTRANCE_URL = import.meta.env.VITE_LAST_ENTRANCE;
  const user = useAuthUser();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  
  const [autoCompleteData, setAutoCompleteData] = useState({
    company: "",
    store: "",
    medician: [],
  });
  const [exactEntrance, setExatEntrance] = useState({
    without_discount: false,
    description: "",
  });
  const [report, setReport] = useState({
    number: 0,
    total_before_discount: 0,
    total_discount: 0,
    total_bonous_value: 0,
    sell_total: 0,
    total: 0,
    total_interest: 0,
    net_profit: 0,
    purchase_total: 0,
  });
  const [datePickerValue, setDatePickerValue] = useState(
    new Date().toISOString()
  );
  const [discountPercent, setDiscountPercent] = useState(
    exactEntrance.discount_percent
  );
  const [country, setCountry] = useState([]);
  const [kind, setKind] = useState([]);
  const [pharmGroub, setPharmGroub] = useState([]);
  const [entrancePosted, setEntrancePosted] = useState(false);
  const [entranceThrough, setEntranceThrough] = useState([]);
  const [searched, setSearched] = useState(false);
  const [FactorTotal, setFactorTotal] = useState(report.grandTotal);
  const [expireDate, setExpireDate] = useState("");
  const [file, setFile] = useState("");
  const [selectTrigger, setTrigger] = useState(0);
  const [excatTrough, setExactThrough] = useState("");
  const [priceCheckEntrance, setPriceCheckEntrance] = useState({});
  const [interest, setInterest] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);

  useEffect(() => {
    axios
      .get(COUNTRY_URL)
      .then((result) => setCountry(result.data))
      .catch((e) => console.log(e));
    axios
      .get(KIND_URL)
      .then((result) => setKind(result.data))
      .catch((e) => console.log(e));
    axios
      .get(PHARM_GROUB_URL)
      .then((result) => setPharmGroub(result.data))
      .catch((e) => console.log(e));
  }, [props.trigger]);

  const { data: finalRegister } = useQuery(["final-register"]);
  const { data: company } = useQuery(["pharm-companies"]);
  const { data: store } = useQuery(["store"]);
  const { data: currency } = useQuery(["currency"]);
  const { data: paymentMethod } = useQuery(["payment-method"]);

  useEffect(() => {
    Reporting();
  }, [entranceThrough]);

  const tabFormulate = () => {
    document.getElementById("number-in-factor-input").focus();
  };

  useEffect(() => {
    setPurchasePrice(autoCompleteData.medician.last_purchased);
  }, [autoCompleteData.medician]);

  useEffect(() => {
    setSellPrice(
      (
        ((parseFloat(purchasePrice) +
          (parseFloat(interest) * parseFloat(purchasePrice)) / 100) /
          autoCompleteData.medician.no_box) *
        exactEntrance.currency_rate
      ).toFixed(1)
    );
  }, [interest, purchasePrice, quantity, autoCompleteData.medician]);

  useEffect(() => {
    if (props.button == 1) {
      axios
        .get(ENTRANCE_URL + props.entrance.id)
        .then((res) => {
          setExatEntrance(res.data);
          setDiscountPercent(res.data.discount_percent);
          setSearched(true);
          axios
            .get(ENTRANCE_THROUGH_URL + "?entrance=" + res.data.id)
            .then((res) => setEntranceThrough(res.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    reset({
      company: exactEntrance.company ? exactEntrance.company : "",
      payment_method: exactEntrance.payment_method
        ? exactEntrance.payment_method
        : "",
      currency: exactEntrance.currency ? exactEntrance.currency : "",
      final_register: exactEntrance.final_register
        ? exactEntrance.final_register
        : "",
      store: exactEntrance.store ? exactEntrance.store : "",
      wholesale: exactEntrance.wholesale ? exactEntrance.wholesale : "",
    });
  }, [exactEntrance]);

  const EntranceSubmit = (data) => {
    const EntranceForm = new FormData();
    EntranceForm.append(
      "factor_number",
      exactEntrance.factor_number
        ? exactEntrance.factor_number
        : data.factor_number
    );
    EntranceForm.append(
      "factor_date",
      datePickerValue != "" ? datePickerValue : exactEntrance.factor_date
    );
    EntranceForm.append(
      "total_interest",
      data.total_interest != ""
        ? data.total_interest
        : exactEntrance.total_interest
    );
    EntranceForm.append(
      "discount_percent",
      data.discount_percent_entrance != undefined
        ? data.discount_percent_entrance
        : exactEntrance.discount_percent
    );
    EntranceForm.append("deliver_by", data.deliver_by);
    EntranceForm.append("recived_by", data.recived_by);
    EntranceForm.append("description", data.description);
    EntranceForm.append(
      "without_discount",
      exactEntrance != []
        ? exactEntrance.without_discount
        : data.without_discount
    );
    EntranceForm.append(
      "company",
      data.company ? data.company : exactEntrance.company
    );
    EntranceForm.append(
      "payment_method",
      data.payment_method != ""
        ? data.payment_method
        : exactEntrance.payment_method
    );
    EntranceForm.append(
      "currency",
      data.currency != "" ? data.currency : exactEntrance.currency
    );
    EntranceForm.append(
      "final_register",
      data.final_register != ""
        ? data.final_register
        : exactEntrance.final_register
    );
    EntranceForm.append("store", data.store ? data.store : exactEntrance.store);
    EntranceForm.append("wholesale", data.wholesale);
    EntranceForm.append("image", file ? file : "");
    EntranceForm.append("user", user().id);

    if (searched == true) {
      axios
        .patch(ENTRANCE_URL + exactEntrance.id + "/", EntranceForm)
        .then((e) => {
          toast.success("Data Updated Successfuly.");
          setExatEntrance(e.data);
          setDiscountPercent(e.data.discount_percent);
          setInterest(e.data.total_interest);
        })
        .catch((e) => {
          toast.error("Check Your Input And Try Again!");
          console.log(e);
        });
    }

    if (entrancePosted == false && searched == false) {
      axios
        .post(ENTRANCE_URL, EntranceForm)
        .then((data) => {
          setEntrancePosted(true);
          toast.success("Entrance Saved Successfuly.");
          setExatEntrance(data.data);
          setDiscountPercent(data.data.discount_percent);
          setSearched(true);
          setInterest(data.data.total_interest);
          setTrigger((prev) => prev + 1);
          SelectMedicineOpener.current.Opener();
        })
        .catch((e) => {
          console.log(e);
          toast.error("Check Your Input And Try Again!");
        });
    }
  };

  const SearchSubmit = (data) => {
    setExatEntrance({
      without_discount: false,
      description: "",
    });
    setAutoCompleteData({
      company: "",
      store: "",
      medician: [],
    });
    setEntranceThrough([]);
    setEntrancePosted(false);
    setSearched(false);
    setDatePickerValue("");

    axios
      .get(ENTRANCE_URL + data.entrance_search + "/")
      .then((e) => {
        setExatEntrance(e.data);
        setDiscountPercent(e.data.discount_percent);
        setSearched(true);
        setDatePickerValue(e.data.factor_date);
        setInterest(e.data.total_interest);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Check Your Input And Try Again!");
      });

    axios
      .get(ENTRANCE_THROUGH_URL + "?entrance=" + data.entrance_search)
      .then((e) => {
        setEntranceThrough(e.data);
        setFactorTotal(report.grandTotal);
      })
      .catch((e) => console.log(e));
  };

  const MedicineIncluder = (data) => {
    const MedicianUpdateForm = new FormData();
    MedicianUpdateForm.append(
      "number_in_factor",
      excatTrough &&
        parseInt(excatTrough.number_in_factor) + parseInt(data.number_in_factor)
    );

    axios
      .patch(ENTRANCE_THROUGH_URL + excatTrough.id + "/", MedicianUpdateForm)
      .then(() => {
        toast.success("Data Updated Successfuly.");
        UpdateChunk();
        UpdateUI();
      })
      .catch(() => toast.error("Check Your Input And Try Again!"));
  };

  const EntranceThroughSubmit = (data) => {
    const EntranceThrough = new FormData();
    EntranceThrough.append("number_in_factor", data.number_in_factor);
    EntranceThrough.append("medician", autoCompleteData.medician.id);
    EntranceThrough.append("each_price_factor", data.each_price_factor);
    EntranceThrough.append(
      "each_quantity",
      autoCompleteData.medician.no_pocket
    );
    EntranceThrough.append("discount_money", data.discount_money);
    EntranceThrough.append("discount_percent", data.discount_percent);
    EntranceThrough.append("expire_date", expireDate);
    EntranceThrough.append("interest_percent", interest);
    EntranceThrough.append("bonus", 0);
    EntranceThrough.append("quantity_bonus", data.quantity_bonus);
    EntranceThrough.append("no_box", autoCompleteData.medician.no_box);
    EntranceThrough.append("entrance", exactEntrance.id);
    EntranceThrough.append("batch_number", data.batch_number);
    EntranceThrough.append("user", user().id);
    EntranceThrough.append("each_sell_price_afg", sellPrice);
    EntranceThrough.append("lease", data.lease);

    let result = true;
    const IfMedicineSubmitedBeforeCheck = () => {
      entranceThrough.map((prescription) => {
        prescription.medician == autoCompleteData.medician.id &&
          ((result = false), setExactThrough(prescription));
        return result;
      });
      return result;
    };

    if (IfMedicineSubmitedBeforeCheck() == true) {
      axios
        .post(ENTRANCE_THROUGH_URL, EntranceThrough)
        .then((res) => {
          setEntranceThrough((prev) => [...prev, res.data]);
          if (
            res.data.total_purchaseـafghani * autoCompleteData.medician.no_box >
            res.data.total_sell
          ) {
            alert("قیمت خرید از قیمت فروش بیشتر است!");
          }
          toast.info("New Item Added.");
          ResetEntranceThroughEntries();
          axios
            .get(ENTRANCE_THROUGH_URL + "?medician=" + res.data.medician)
            .then((lastRes) => {
              PriceCheck(res.data, lastRes.data[lastRes.data.length - 2]) ==
                false && SelectMedicineOpener.current.Opener();
              axios
                .get(
                  ENTRANCE_URL + lastRes.data[lastRes.data.length - 2].entrance
                )
                .then((res) => setPriceCheckEntrance(res.data));
            });
        })
        .catch((e) => {
          console.log(e);
          toast.error("Check Your Input And Try Again! ");
        });
    }

    if (IfMedicineSubmitedBeforeCheck() == false) {
      SubmitedAlertRef.current.Opener();
    }
  };

  const PriceCheck = (newData, lastData) => {
    if (newData && lastData && newData.each_price != lastData.each_price) {
      PreviousPriceAlertRef.current.Opener();
      return true;
    } else {
      return false;
    }
  };

  const ResetForm = () => {
    reset({});
    setExatEntrance({
      without_discount: false,
      description: "",
    });
    setEntranceThrough([]);
    setEntrancePosted(false);
    setSearched(false);
    setFactorTotal(report.grandTotal);
    setExpireDate("");
    setSellPrice("");
    setPurchasePrice("");
    setInterest("");
    setQuantity("");
  };

  const ResetEntranceThroughEntries = () => {
    reset({
      number_in_factor: "",
      each_price_factor: "",
      discount_money: "",
      discount_percent: "",
      expire_date: "",
      interest_money: "",
      bonus: "",
      quantity_bonus: "",
      no_box: "",
      batch_number: "",
      each_sell_price: "",
      interest_percent: "",
    });
    setExpireDate("");
    setSellPrice("");
    setPurchasePrice("");
  };

  const Reporting = () => {
    const totalInterest = () => {
      let result = 0;
      entranceThrough.map((through) => {
        result += through.total_interest * through.no_box;
        return result;
      });
      return result;
    };

    const totalPurchase = () => {
      const result = entranceThrough.reduce((total, currentValue) => {
        return total + currentValue.number_in_factor * currentValue.each_price;
      }, 0);
      return result;
    };

    const totalBeforeDiscount = () => {
      const result = entranceThrough.reduce((total, current) => {
        return total + current.total_purchase_currency_before;
      }, 0);
      return result;
    };

    const totalDiscount = () => {
      const result = entranceThrough.reduce((total, currentValue) => {
        return total + currentValue.discount_value;
      }, 0);
      return result;
    };
    const totalBonusValue = () => {
      const result = entranceThrough.reduce((total, currentValue) => {
        return total + currentValue.bonus_value;
      }, 0);
      return result;
    };
    const totalSell = () => {
      const result = entranceThrough.reduce((total, currentValue) => {
        return total + currentValue.total_sell;
      }, 0);
      return result;
    };

    const totalInterester = (
      totalSell() +
      totalBonusValue() +
      totalDiscount() -
      totalBeforeDiscount()
    ).toFixed(1);
    setReport({
      number: entranceThrough.length,
      total_before_discount: totalBeforeDiscount().toFixed(1),
      total_discount: totalDiscount().toFixed(1),
      total: 0,
      total_bonous_value: totalBonusValue().toFixed(1),
      total_interest: totalInterester,
      total_interest_percent: (
        (totalInterester / totalBeforeDiscount()) *
        100
      ).toFixed(1),
      sell_total: totalSell().toFixed(1),
      purchase_total: totalPurchase(),
      purchase_after_discount: totalPurchase() - totalDiscount(),
      grandTotal: totalBeforeDiscount() - totalDiscount(),
    });
  };

  const { mutate: updateEntrance } = useMutation({
    mutationFn: (data) => {
      putDataFn(data, `entrance/${exactEntrance.id}/`);
    },
    onSuccess: (res) => successFn("", () => {}),
  });

  function UpdateUI() {
    setEntranceThrough([]);
    axios
      .get(ENTRANCE_THROUGH_URL + "?entrance=" + exactEntrance.id)
      .then((res) => setEntranceThrough(res.data))
      .catch((err) => console.log(err));
  }
  function UpdateChunk() {
    axios
      .get(ENTRANCE_THROUGH_URL + "?entrance=" + exactEntrance.id)
      .then((res) => setEntranceThrough(res.data))
      .catch((err) => console.log(err));
  }

  const PriceApply = () => {
    entranceThrough.map((through) => {
      const PriceForm = new FormData();
      PriceForm.append("price", through.each_sell_price_afg);
      axios
        .patch(MEDICIAN_URL + through.medician + "/", PriceForm)
        .then((res) => {
          toast.info(
            `Medicine Price Changed to: ${through.each_sell_price_afg}AFG`
          );
        })
        .catch((res) => toast.error("New Item Added."));
    });
  };

  const BackEntrance = () => {
    ResetForm();

    exactEntrance.id
      ? axios
          .get(ENTRANCE_URL + (exactEntrance.id + 1) + "/")
          .then((e) => {
            setExatEntrance(e.data);
            setDiscountPercent(e.data.discount_percent);
            setSearched(true);
            setDatePickerValue(e.data.factor_date);
            setInterest(e.data.total_interest);
          })
          .catch((err) => {
            console.log(err);
            setExatEntrance({ id: exactEntrance.id });
            toast.error("Check Your Input And Try Again!");
          })
      : axios
          .get(LAST_ENTRANCE_URL)
          .then((e) => {
            setExatEntrance(e.data[0]);
            setSearched(true);
            setDatePickerValue(e.data[0].factor_date);
            setInterest(e.data[0].total_interest);
            setDiscountPercent(e.data[0].discount_percent);
            axios
              .get(ENTRANCE_THROUGH_URL + "?entrance=" + e.data[0].id)
              .then((e) => {
                setEntranceThrough(e.data);
                setFactorTotal(report.grandTotal);
              })
              .catch((e) => console.log(e));
          })
          .catch((err) => {
            console.log(err);
            setExatEntrance({ id: exactEntrance.id });
            toast.error("Check Your Input And Try Again!");
          });

    exactEntrance.id &&
      axios
        .get(ENTRANCE_THROUGH_URL + "?entrance=" + (exactEntrance.id + 1))
        .then((e) => {
          setEntranceThrough(e.data);
          setFactorTotal(report.grandTotal);
        })
        .catch((e) => console.log(e));
  };

  const FrontEntrance = () => {
    ResetForm();

    exactEntrance.id
      ? axios
          .get(ENTRANCE_URL + (exactEntrance.id - 1) + "/")
          .then((e) => {
            setExatEntrance(e.data);
            setSearched(true);
            setDatePickerValue(e.data.factor_date);
            setInterest(e.data.total_interest);
            setDiscountPercent(e.data.discount_percent);
          })
          .catch((err) => {
            console.log(err);
            setExatEntrance({ id: exactEntrance.id });
            toast.error("Check Your Input And Try Again!");
          })
      : axios
          .get(LAST_ENTRANCE_URL)
          .then((e) => {
            setExatEntrance(e.data[0]);
            setSearched(true);
            setDatePickerValue(e.data[0].factor_date);
            setInterest(e.data[0].total_interest);
            setDiscountPercent(e.data[0].discount_percent);
            axios
              .get(ENTRANCE_THROUGH_URL + "?entrance=" + e.data[0].id)
              .then((e) => {
                setEntranceThrough(e.data);
                setFactorTotal(report.grandTotal);
              })
              .catch((e) => console.log(e));
          })
          .catch((err) => {
            console.log(err);
            setExatEntrance({ id: exactEntrance.id });
            toast.error("Check Your Input And Try Again!");
          });

    axios
      .get(ENTRANCE_THROUGH_URL + "?entrance=" + (exactEntrance.id - 1))
      .then((e) => {
        setEntranceThrough(e.data);
        setFactorTotal(report.grandTotal);
      })
      .catch((e) => console.log(e));
  };

  const SelectMedicineOpener = useRef("");

  const handleCloseFocus = () => {
    document.getElementById("number-in-factor-input").focus();
  };

  useEffect(() => {
    const handleKeyDowns = (e) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case "s":
          case "S":
          case "س":
            e.preventDefault();
            handleSubmit((data) =>
              handleFormData(data, updateEntrance, user)
            )();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDowns);
    return () => {
      document.removeEventListener("keydown", handleKeyDowns);
    };
  }, []);

  return (
    <>
      {!props.button && (
        <div
          className="purchase-card"
          onClick={() => EntranceModalRef.current.Opener()}
        >
          <div>
            <h3>{props.title}</h3>
          </div>
          <div>
            <i className={props.icon}></i>
          </div>
        </div>
      )}
      {props.button && props.button == 1 && (
        <div onClick={() => EntranceModalRef.current.Opener()}>
          <i class="fa-solid fa-circle-info"></i>
        </div>
      )}
      <BigModal title="ثبت فاکتور" ref={EntranceModalRef}>
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
          CheckerComponent={() => (
            <Entrance button={1} entrance={priceCheckEntrance} />
          )}
        />
        <AlertModal
          errorTitle="خطا در مجموع فاکتور!"
          errorText="آیا با بستن صفحه موافقید؟"
          OkFunc={() => {
            TotalPriceAlertRef.current.Closer();
            EntranceModalRef.current.Closer();
          }}
          NoFunc={() => TotalPriceAlertRef.current.Closer()}
          ref={TotalPriceAlertRef}
        />
        <AlertModal
          errorTitle="خطای اعمال قیمت!"
          errorText="آیا با بستن صفحه موافقید؟"
          OkFunc={() => {
            PriceAppliedAlertRef.current.Closer();
            EntranceModalRef.current.Closer();
          }}
          NoFunc={() => PriceAppliedAlertRef.current.Closer()}
          ref={PriceAppliedAlertRef}
        />
        <EntranceForm
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          medician={autoCompleteData.medician}
          exactEntrance={exactEntrance}
          report={report}
          datePickerValue={datePickerValue}
          setDatePickerValue={setDatePickerValue}
          discountPercent={discountPercent}
          setDiscountPercent={setDiscountPercent}
          country={country}
          kind={kind}
          selectMedicine={setAutoCompleteData}
          UpdateUI={UpdateUI}
          pharmGroub={pharmGroub}
          entranceThrough={entranceThrough}
          searched={searched}
          FactorTotal={FactorTotal}
          setFactorTotal={setFactorTotal}
          expireDate={expireDate}
          setExpireDate={setExpireDate}
          setFile={setFile}
          selectTrigger={selectTrigger}
          interest={interest}
          setInterest={setInterest}
          purchasePrice={purchasePrice}
          _toFixed={props.toFixed}
          setPurchasePrice={setPurchasePrice}
          setQuantity={setQuantity}
          sellPrice={sellPrice}
          setSellPrice={setSellPrice}
          finalRegister={finalRegister}
          company={company}
          store={store}
          currency={currency}
          paymentMethod={paymentMethod}
          tabFormulate={tabFormulate}
          EntranceSubmit={EntranceSubmit}
          SearchSubmit={SearchSubmit}
          EntranceThroughSubmit={EntranceThroughSubmit}
          ResetForm={ResetForm}
          PriceApply={PriceApply}
          BackEntrance={BackEntrance}
          FrontEntrance={FrontEntrance}
          UpdateChunk={UpdateChunk}
          SelectMedicineOpener={SelectMedicineOpener}
          handleCloseFocus={handleCloseFocus}
        ></EntranceForm>
      </BigModal>
    </>
  );
}
