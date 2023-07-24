import Modal from "react-modal";
import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import EntrancThroughEntry from "./EntrancThroughEntry";
import SelectMedician from "./SelectMedician";
import Company from "../Company/Company";
import Store from "../Store/Store";
import FinalRegister from "../FinalRegister/FinalRegister";
import Payment from "../Payment/Payment";
import { DateInputSimple } from "react-hichestan-datetimepicker";
import { useAuthUser } from "react-auth-kit";
import CurrencyList from "../Currency/CurrencyList";

export default function Entrance(props) {


  const ModalStyles = {
    content: {
      backgroundColor: "rgb(60,60,60)",
      border: "none",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "0px",
      margin: "0px",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
    },
  };

  const AutoCompleteStyle = {
    height: "1.5rem",
    borderRadius: "1rem",
    fontSize: "14px",
    backgroundColor: "rgb(34, 34, 34)",
    color: "white",
    border: "none",
    hoverBackgroundColor: "grey",
    zIndex: "2",
    overflow: "scroll",
  };

  const popUpStyle = {
    content: {
      backgroundColor: "rgb(140,140,140)",
      border: "none",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "0px",
      margin: "0px",
      zIndex: "100",
      width: "30%",
      height: "30%",
      top: "30%",
      left: "35%",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
    },
  };

  const ENTRANCE_URL = import.meta.env.VITE_ENTRANCE;
  const FINAL_REGISTER_URL = import.meta.env.VITE_FINAL_REGISTER;
  const COMPANY_URL = import.meta.env.VITE_PHARM_COMPANIES;
  const STORE_URL = import.meta.env.VITE_STORE;
  const CURRENCY_URL = import.meta.env.VITE_CURRENCY;
  const PAYMENT_METHOD_URL = import.meta.env.VITE_PAYMENT_METHOD;
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
    formState: { errors },
  } = useForm();
  const [autoCompleteData, setAutoCompleteData] = React.useState({
    company: "",
    store: "",
    medician: [],
  });
  const [exactEntrance, setExatEntrance] = React.useState({
    without_discount: false,
    description: "",
  });
  const [report, setReport] = React.useState({
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
  const [datePickerValue, setDatePickerValue] = React.useState(
    new Date().toISOString()
  );
  const [discountPercent, setDiscountPercent] = React.useState(
    exactEntrance.discount_percent
  );
  const [finalRegister, setFinalRegister] = React.useState([]);
  const [company, setCompany] = React.useState([]);
  const [store, setStore] = React.useState([]);
  const [currency, setCurrency] = React.useState([]);
  const [paymentMethod, setPaymentMethod] = React.useState([]);
  const [country, setCountry] = React.useState([]);
  const [kind, setKind] = React.useState([]);
  const [pharmGroub, setPharmGroub] = React.useState([]);
  const [entrancePosted, setEntrancePosted] = React.useState(false);
  const [entranceThrough, setEntranceThrough] = React.useState([]);
  const [searched, setSearched] = React.useState(false);
  const [storeName, setStoreName] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [FactorTotal, setFactorTotal] = React.useState(report.grandTotal);
  const [PriceAppliedVerify, setPriceAppliedVerify] = React.useState(false);
  const [AlertModalOpen, setAlertModalOpen] = React.useState(false);
  const [priceApplied, setPriceApplied] = React.useState(false);
  const [PriceAlertOpen, setPriceAlertOpen] = React.useState(false);
  const [expireDate, setExpireDate] = React.useState("");
  const [file, setFile] = React.useState("");
  const [selectTrigger, setTrigger] = React.useState(0);
  const [popUpOpen, setpopUpOpen] = React.useState(false);
  const [excatTrough, setExactThrough] = React.useState("");
  const [priceCheckEntrance, setPriceCheckEntrance] = React.useState({});
  const [interest, setInterest] = React.useState(0);
  const [purchasePrice, setPurchasePrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [sellPrice, setSellPrice] = React.useState(0);

  React.useEffect(() => {
    if (props.trigger) {
      registerModalOpener();
    }

    axios
      .get(FINAL_REGISTER_URL)
      .then((result) => setFinalRegister(result.data))
      .catch((e) => console.log(e));

    axios
      .get(COMPANY_URL)
      .then((result) => setCompany(result.data))
      .catch((e) => console.log(e));

    axios
      .get(STORE_URL)
      .then((result) => setStore(result.data))
      .catch((e) => console.log(e));

    axios
      .get(CURRENCY_URL)
      .then((result) => setCurrency(result.data))
      .catch((e) => console.log(e));

    axios
      .get(PAYMENT_METHOD_URL)
      .then((result) => setPaymentMethod(result.data))
      .catch((e) => console.log(e));
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

  React.useEffect(() => {
    store.map((store) =>
      store.id == exactEntrance.store ? setStoreName(store.name) : ""
    );
    company.map((company) =>
      company.id == exactEntrance.company ? setCompanyName(company.name) : ""
    );
  }, [exactEntrance]);

  React.useEffect(() => {
    Reporting();
  }, [entranceThrough]);

  const tabFormulate = () => {
    document.getElementById("number-in-factor-input").focus();
  };

  React.useEffect(() => {
    setPurchasePrice(
      autoCompleteData.medician.last_purchased / exactEntrance.currency_rate
    );
  }, [autoCompleteData]);

  React.useEffect(() => {
    setSellPrice(
      (
        ((parseFloat(purchasePrice) +
          (parseFloat(interest) * parseFloat(purchasePrice)) / 100) /
          autoCompleteData.medician.no_box) 
      ).toFixed(1)
    );
  }, [interest, purchasePrice, quantity]);

  React.useEffect(() => {
    if (props.button == 1 && registerModalOpen) {
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
  }, [registerModalOpen]);

  function registerModalOpener() {
    setRegisterModalOpen(true);
    setTrigger(0);

    axios
      .get(COMPANY_URL)
      .then((result) => setCompany(result.data))
      .catch((e) => console.log(e));

    axios
      .get(STORE_URL)
      .then((result) => setStore(result.data))
      .catch((e) => console.log(e));

    axios
      .get(FINAL_REGISTER_URL)
      .then((result) => setFinalRegister(result.data))
      .catch((e) => console.log(e));
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
    ResetForm();
    reset({});
  }

  const PriceAppliedVerifyCloser = () => {
    setPriceAppliedVerify(false);
    registerModalCloser();
  };

  const PriceAppliedVerifyOpener = () => {
    setPriceAppliedVerify(true);
  };

  const JustPriceAppliedVerifyCloser = () => {
    setPriceAppliedVerify(false);
  };

  function AutoCompleteHandle(data) {
    setAutoCompleteData({
      ...autoCompleteData,
      medician: data,
    });
  }

  const TotalAlertCloser = () => {
    let currency_rate = 1;
    let result = 1;
    result = currency.map((cur) => {
      cur.id == exactEntrance.currency ? (currency_rate = cur.rate) : 1;
    });

    if (report.grandTotal == FactorTotal ) {
      if (priceApplied == false) {
        entranceThrough.length >= 1
          ? PriceAppliedVerifyOpener()
          : registerModalCloser();
      } else {
        registerModalCloser();
      }
    }
    if (report.grandTotal != FactorTotal) {
      AlertModalOpener();
    }
  };
  const AlertModalOpener = () => {
    setAlertModalOpen(true);
  };
  const AlertModalCloser = () => {
    setAlertModalOpen(false);

    if (priceApplied == false) {
      entranceThrough.length >= 1
        ? PriceAppliedVerifyOpener()
        : registerModalCloser();
    } else {
      registerModalCloser();
    }
  };

  const AlertJustModalCloser = () => {
    setAlertModalOpen(false);
  };

  const PriceAlertOpener = () => {
    setPriceAlertOpen(true);
  };

  const PriceAlertCloser = () => {
    setPriceAlertOpen(false);
    setTrigger((prev) => prev + 1);
  };

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
      autoCompleteData.company.id != undefined
        ? autoCompleteData.company.id
        : parseInt(exactEntrance.company)
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
    EntranceForm.append(
      "store",
      autoCompleteData.store.id != undefined
        ? autoCompleteData.store.id
        : exactEntrance.store
    );
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
    setCompanyName("");
    setStoreName("");
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

  const popUpCloser = () => {
    setpopUpOpen(false);
  };
  const popUpOpener = () => {
    setpopUpOpen(true);
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
        popUpCloser();
      })
      .catch(() => toast.error("Check Your Input And Try Again!"));
  };

  const EntranceThroughSubmit = (data) => {
    const EntranceThrough = new FormData();
    EntranceThrough.append("number_in_factor", data.number_in_factor);
    EntranceThrough.append("medician", autoCompleteData.medician.id);
    EntranceThrough.append("each_price_factor", data.each_price_factor);
    EntranceThrough.append("each_quantity", autoCompleteData.medician.no_pocket);
    EntranceThrough.append("discount_money", data.discount_money);
    EntranceThrough.append("discount_percent", data.discount_percent);
    EntranceThrough.append("expire_date", expireDate);
    EntranceThrough.append("interest_percent", interest);
    EntranceThrough.append("bonus", 0);
    EntranceThrough.append("quantity_bonus", data.quantity_bonus);
    EntranceThrough.append("no_box",autoCompleteData.medician.no_box);
    EntranceThrough.append("entrance", exactEntrance.id);
    EntranceThrough.append("batch_number", data.batch_number);
    EntranceThrough.append("user", user().id);
    EntranceThrough.append("each_sell_price", data.each_sell_price);
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
          if (res.data.total_purchaseـafghani * autoCompleteData.medician.no_box > res.data.total_sell) {
            alert("قیمت خرید از قیمت فروش بیشتر است!");
          }
          toast.info("New Item Added.");
          ResetEntranceThroughEntries()
          axios
            .get(ENTRANCE_THROUGH_URL + "?medician=" + res.data.medician)
            .then((lastRes) => {
              PriceCheck(res.data, lastRes.data[lastRes.data.length - 2]);
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
      popUpOpener();
    }
  };

  const PriceCheck = (newData, lastData) => {
    if (newData && lastData && newData.each_price != lastData.each_price) {
      PriceAlertOpener();
    } else {
      setTrigger((prev) => prev + 1);
    }
  };

  const ResetForm = () => {
    reset({});
    setExatEntrance({
      without_discount: false,
      description: "",
    });
    setAutoCompleteData({
      company: "",
      store: "",
      medician: [],
    });
    setCompanyName("");
    setStoreName("");
    setEntranceThrough([]);
    setEntrancePosted(false);
    setSearched(false);
    setFactorTotal(report.grandTotal);
    setExpireDate("");
    setSellPrice("");
    setPurchasePrice("");
    setInterest("");
    setQuantity("");
    setPriceApplied(false);
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
    setPriceApplied(false)
  }

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
        return total + current.total_purchase_currency_before
      }, 0)
      return result
    }

    const totalDiscount = () => {
      const result = entranceThrough.reduce((total, currentValue) => {
        return (
          total + currentValue.discount_value
        );
      }, 0);
      return result;
    };
    const totalBonusValue = () => {
      const result = entranceThrough.reduce((total, currentValue) => {
        return (
          total + currentValue.bonus_value
        );
      }, 0);
      return result;
    };
    const totalSell = () => {
      const result = entranceThrough.reduce((total, currentValue) => {
        return (
          total + currentValue.total_sell
        );
      }, 0);
      return result;
    };

    const totalInterester = (totalSell() + totalBonusValue() + totalDiscount() - totalBeforeDiscount()).toFixed(1)
    setReport({
      number: entranceThrough.length,
      total_before_discount: totalBeforeDiscount().toFixed(1),
      total_discount: totalDiscount().toFixed(1),
      total: 0,
      total_bonous_value: totalBonusValue().toFixed(1),
      total_interest: totalInterester,
      total_interest_percent: (totalInterester / totalBeforeDiscount() * 100).toFixed(1),
      sell_total: totalSell(),
      purchase_total: totalPurchase(),
      purchase_after_discount: totalPurchase() - totalDiscount(),
      grandTotal: totalBeforeDiscount() - totalDiscount(),
    });
  };

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

  function UpdateCompanies() {
    axios
      .get(COMPANY_URL)
      .then((result) => setCompany(result.data))
      .catch((e) => console.log(e));
  }

  function UpdateStores() {
    axios
      .get(STORE_URL)
      .then((result) => setStore(result.data))
      .catch((e) => console.log(e));
  }
  function UpdateFinals() {
    axios
      .get(FINAL_REGISTER_URL)
      .then((result) => setFinalRegister(result.data))
      .catch((e) => console.log(e));
  }

  function CurrencyUpdate() {
    axios
      .get(CURRENCY_URL)
      .then((result) => setCurrency(result.data))
      .catch((e) => console.log(e));
  }

  function PaymentUpdate() {
    axios
      .get(PAYMENT_METHOD_URL)
      .then((result) => setPaymentMethod(result.data))
      .catch((err) => console.log(e));
  }

  const PriceApply = () => {
    entranceThrough.map((through) => {
      const PriceForm = new FormData();
      PriceForm.append("price", through.each_sell_price);
      axios
        .patch(MEDICIAN_URL + through.medician + "/", PriceForm)
        .then((res) => {
          toast.info(
            `Medicine Price Changed to: ${through.each_sell_price}AFG`
          );
          setPriceApplied(true);
        })
        .catch((res) => toast.error("New Item Added."));
    });
  };

  const BackEntrance = () => {
    ResetForm()

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
    ResetForm()

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

  return (
    <>
      {!props.button && (
        <div className="purchase-card" onClick={registerModalOpener}>
          <div>
            <h3>{props.title}</h3>
          </div>
          <div>
            <i className={props.icon}></i>
          </div>
        </div>
      )}
      {props.button && props.button == 1 && (
        <div onClick={registerModalOpener}>
          <i class="fa-solid fa-circle-info"></i>
        </div>
      )}
      {registerModalOpen == true && (
        <Modal
          style={ModalStyles}
          isOpen={registerModalOpen}
          onRequestClose={AlertJustModalCloser}
        >
          <Modal
            isOpen={popUpOpen}
            onRequestClose={popUpCloser}
            style={popUpStyle}
          >
            <>
              <div className="modal-header">
                <h3>!خطا</h3>
                <div className="modal-close-btn" onClick={popUpCloser}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>
              <div className="alert-box">
                <div className="alert-text-box">
                  <h4>این دوا قبلا ثبت شده است</h4>
                  <h4>آیا میخواهید به تعداد آن اضافه نمائید؟</h4>
                </div>
                <div className="alert-button-box">
                  <button onClick={handleSubmit(MedicineIncluder)}>بله</button>
                  <button onClick={popUpCloser}>نخیر</button>
                </div>
              </div>
            </>
          </Modal>
          <Modal
            isOpen={PriceAlertOpen}
            onRequestClose={PriceAlertCloser}
            style={popUpStyle}
          >
            <>
              <div className="modal-header">
                <h3>!خطا</h3>
                <div className="modal-close-btn" onClick={PriceAlertCloser}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>
              <div className="alert-box">
                <div className="alert-text-box">
                  <h4>قیمت دوای ثبت شده با قیمت قبلی مطابقت ندارد!</h4>
                  <Entrance button={1} entrance={priceCheckEntrance} />
                </div>
                <div className="alert-button-box">
                  <button onClick={PriceAlertCloser}>تایید</button>
                </div>
              </div>
            </>
          </Modal>

          <Modal
            isOpen={AlertModalOpen}
            onRequestClose={AlertJustModalCloser}
            style={popUpStyle}
          >
            <>
              <div className="modal-header">
                <h3>!خطا</h3>
                <div className="modal-close-btn" onClick={AlertJustModalCloser}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>
              <div className="alert-box">
                <div className="alert-text-box">
                  <h4>مجموع ثبت شده با مجموع فاکتور مطابقت ندارد.</h4>
                  <h4>آیا با بستن صفحه موافقید؟</h4>
                </div>
                <div className="alert-button-box">
                  <button onClick={AlertModalCloser}>بله</button>
                  <button onClick={AlertJustModalCloser}>نخیر</button>
                </div>
              </div>
            </>
          </Modal>

          <Modal
            isOpen={PriceAppliedVerify}
            onRequestClose={PriceAppliedVerifyCloser}
            style={popUpStyle}
          >
            <>
              <div className="modal-header">
                <h3>!خطا</h3>
                <div className="modal-close-btn" onClick={AlertJustModalCloser}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>
              <div className="alert-box">
                <div className="alert-text-box">
                  <h4>قیمت ها برای این ورودی اعمال نشده است.</h4>
                  <h4>آیا با بستن موافقید؟</h4>
                </div>
                <div className="alert-button-box">
                  <button onClick={PriceAppliedVerifyCloser}>بله</button>
                  <button onClick={JustPriceAppliedVerifyCloser}>نخیر</button>
                </div>
              </div>
            </>
          </Modal>

          <div className="modal">
            <div className="modal-header">
              <h3>ثبت ورودی</h3>
              <div className="modal-close-btn" onClick={TotalAlertCloser}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
            <div className="entrance-box">
              <div className="entrance-report">
                <div className="entrance-report-header">راپور</div>
                <div className="entrance-report-body">
                  <div className="entrance-report-map-box">
                    <label>تعداد اقلام</label>
                    <label>{report.number}</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>مجموع قبل از تخفیف</label>
                    <label>{report.total_before_discount}</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>مجموع تخفیفات</label>
                    <label>{report.total_discount}</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>مجموع عاید بونوس</label>
                    <label>{report.total_bonous_value}</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>مجموع فروش</label>
                    <label>{report.sell_total}</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>مجموع فایده </label>
                    <label>{report.total_interest_percent}%</label>
                    <label>{(report.total_interest)}</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>مجموعه</label>
                    <label>{(report.grandTotal)}</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>مجموع فاکتور</label>
                    <input
                      type="text"
                      onChange={(res) => setFactorTotal(res.target.value)}
                      defaultValue={FactorTotal}
                    />
                    <label style={{ fontSize: "0.6rem" }}>
                      {exactEntrance.currency_name}
                    </label>
                  </div>
                </div>
                <div className="entrance-report-footer">
                  <button
                    className="entrance-report-button"
                    onClick={FrontEntrance}
                  >
                    <i class="fa-solid fa-left-long"></i>
                  </button>
                  <button
                    className="entrance-report-button"
                    onClick={PriceApply}
                  >
                    <i class="fa-solid fa-comments-dollar"></i>
                  </button>
                  <button
                    className="entrance-report-button"
                    onClick={BackEntrance}
                  >
                    <i class="fa-solid fa-right-long"></i>
                  </button>
                </div>
              </div>
              <form className="entrance-entrance">
                <label>وضعیت:</label>

                <div className="final-register-box">
                  <select
                    {...register("final_register")}
                    placeholder={exactEntrance.final_register}
                    className="final-select entrance--inputs"
                    tabIndex={0}
                  >
                    <option
                      value={exactEntrance.final_register}
                      selected
                      hidden
                    >
                      {finalRegister.map((final) =>
                        final.id == exactEntrance.final_register
                          ? final.name
                          : ""
                      )}
                    </option>
                    {finalRegister.map((final, key) => (
                      <option key={final.id} value={final.id}>
                        {final.name}
                      </option>
                    ))}
                  </select>
                  <FinalRegister Update={UpdateFinals} />
                </div>
                <label>شرکت:</label>
                <div>
                  <ReactSearchAutocomplete
                    items={company}
                    onSelect={(item) =>
                      setAutoCompleteData({
                        ...autoCompleteData,
                        company: item,
                      })
                    }
                    onSearch={(search, results) => {
                      axios
                        .get(COMPANY_URL + "?search=" + search)
                        .then((res) => {
                          setCompany(res.data);
                        });
                    }}
                    styling={AutoCompleteStyle}
                    showClear={false}
                    showItemsOnFocus={true}
                    inputDebounce="10"
                    placeholder={companyName}
                    showIcon={false}
                    className="autoComplete entrance--inputs"
                  />
                  <Company button={2} Update={UpdateCompanies} />
                </div>
                <label>انبار:</label>
                <div>
                  <ReactSearchAutocomplete
                    items={store}
                    styling={AutoCompleteStyle}
                    onSelect={(item) =>
                      setAutoCompleteData({ ...autoCompleteData, store: item })
                    }
                    showClear={false}
                    onSearch={(search, results) => {
                      axios.get(STORE_URL, +"?search=" + search).then((res) => {
                        setStore(res.data);
                      });
                    }}
                    inputDebounce="10"
                    placeholder={storeName}
                    showIcon={false}
                    className="entrance--inputs"
                  />
                  <Store button={2} Update={UpdateStores} />
                </div>
                <label>تاریخ:</label>

                <DateInputSimple
                  onChange={(res) => setDatePickerValue(res.target.value)}
                  value={datePickerValue}
                />
                <label>شماره:</label>
                <input
                  type="text"
                  {...register("factor_number")}
                  defaultValue={exactEntrance.factor_number}
                  className="entrance--inputs"
                />

                <label>ش.حواله:</label>
                <div className="flex">
                  <input
                    value={exactEntrance.id}
                    type="text"
                    {...register("entrance_id")}
                    disabled
                  />
                  <form
                    className="search-form"
                    onSubmit={handleSubmit(SearchSubmit)}
                  >
                    <input
                      type="text"
                      {...register("entrance_search")}
                      tabIndex={-1}
                    />
                    <button
                      className="search-button-box"
                      type="submit"
                      onClick={handleSubmit(SearchSubmit)}
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
                  defaultValue={exactEntrance.deliver_by}
                  className="entrance--inputs"
                />
                <label>
                  <h5>تحویل گیرنده:</h5>
                </label>
                <input
                  type="text"
                  {...register("recived_by")}
                  defaultValue={exactEntrance.recived_by}
                  className="entrance--inputs"
                />
                <label>واحد پول:</label>
                <div>
                  <select
                    {...register("currency")}
                    className="currency-select entrance--inputs"
                  >
                    <option value={exactEntrance.currency} selected hidden>
                      {currency.map((currency) =>
                        currency.id == exactEntrance.currency
                          ? currency.name + `(${currency.rate})`
                          : ""
                      )}
                    </option>
                    {currency.map((currency) => (
                      <option key={currency.id} value={currency.id}>
                        {currency.name}
                        {`(${currency.rate})`}
                      </option>
                    ))}
                  </select>
                  <CurrencyList Update={CurrencyUpdate} />
                </div>
                <label>پرداخت:</label>
                <div className="final-register-box">
                  <select
                    {...register("payment_method")}
                    className="entrance--inputs"
                  >
                    <option
                      value={exactEntrance.payment_method}
                      selected
                      hidden
                    >
                      {paymentMethod.map((pay) =>
                        pay.id == exactEntrance.payment_method ? pay.name : ""
                      )}
                    </option>
                    {paymentMethod.map((payment) => (
                      <option key={payment.id} value={payment.id}>
                        {payment.name}
                      </option>
                    ))}
                  </select>
                  <Payment Update={PaymentUpdate} />
                </div>
                <label>
                  <h5>فایده%:</h5>
                </label>
                <div className="numbers-box-pocket-1">
                  <input
                    type="text"
                    defaultValue={exactEntrance.total_interest}
                    {...register("total_interest")}
                    className="entrance--inputs"
                  />
                  <lable>تخفیف%:</lable>
                  <input
                    type="text"
                    defaultValue={exactEntrance.discount_percent}
                    {...register("discount_percent_entrance")}
                    className="entrance--inputs"
                  />
                </div>
                <label>
                  <h5>نوع ورودی:</h5>
                </label>
                <select
                  value={exactEntrance.wholesale}
                  {...register("wholesale")}
                >
                  <option value={"WHOLESALE"}>عمده</option>
                  <option value={"SINGULAR"}>پرچون</option>
                </select>
                <label>توضیحات:</label>
                <input
                  {...register("description")}
                  defaultValue={exactEntrance.description}
                  className="entrance--inputs"
                ></input>
                <label>عکس:</label>
                <input
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                ></input>
                <a
                  href={
                    exactEntrance.image &&
                    new URL(exactEntrance.image).pathname.slice(16)
                  }
                  target="_blank"
                  style={{ textDecoration: "none", color: "grey" }}
                >
                  {exactEntrance.image ? "Show_Photo" : ""}
                </a>
                <div className="entrance-buttons">
                  <input
                    type="reset"
                    value="Reset"
                    onClick={ResetForm}
                    tabIndex={-1}
                  ></input>
                  <input
                    type="submit"
                    value={searched ? "Update" : "Submit"}
                    className="entrance--inputs"
                    onClick={handleSubmit(EntranceSubmit)}
                  ></input>
                </div>
              </form>
              <form
                className="entrance-through"
                onSubmit={handleSubmit(EntranceThroughSubmit)}
              >
                <label>قلم:</label>
                <div className="entrance-through-medician-input">
                  <SelectMedician
                    kind={kind}
                    country={country}
                    pharmGroub={pharmGroub}
                    selectAutoCompleteData={AutoCompleteHandle}
                    trigger={selectTrigger}
                    tabFormulate={tabFormulate}
                  />
                </div>
                <label>تعداد:</label>
                <input
                  type="text"
                  {...register("number_in_factor")}
                  id="number-in-factor-input"
                  className="entrance--inputs"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
                <label>قیمت فی:</label>
                <input
                  type="text"
                  {...register("each_price_factor")}
                  className="entrance--inputs"
                  onChange={(e) => {
                    setPurchasePrice(e.target.value);
                  }}
                  value={purchasePrice}
                />
                <label>
                  <h5> ت.د.پاکت:</h5>
                </label>
                <div className="numbers-box-pocket">
                  <input
                    type="text"
                    value={autoCompleteData.medician.no_pocket}
                    {...register("each_quantity")}
                    className="entrance--inputs"
                    tabIndex={-1}
                  />
                  <lable>ت.د.قطی</lable>
                  <input
                    type="text"
                    value={autoCompleteData.medician.no_box}
                    {...register("no_box")}
                    className="entrance--inputs"
                    tabIndex={-1}
                  />
                </div>
                <label>فایده٪:</label>
                <input
                  type="text"
                  {...register("interest_percent")}
                  className="entrance--inputs"
                  onChange={(e) => {
                    setInterest(e.target.value);
                  }}
                  value={interest}
                />
                <label>فی_فروش:</label>
                <input
                  type="text"
                  {...register("each_sell_price")}
                  className="entrance--inputs"
                  value={sellPrice}
                  onChange={(e) => {
                    setSellPrice(e.target.value);
                  }}
                  onBlurCapture={(e) => {
                    setInterest(
                      (
                        (100 *
                          ((e.target.value ) *
                            autoCompleteData.medician.no_box -
                            purchasePrice)) /
                        purchasePrice
                      ).toFixed(2)
                    );
                  }}
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
                  <lable>قرضه:</lable>
                  <input
                    type="checkbox"
                    {...register("lease")}
                    style={{ width: "1rem" }}
                  />
                </div>

                <label>انقضا.م:</label>
                <input
                  type="date"
                  {...register("expire_date")}
                  className="entrance--inputs date--inputs"
                  onChange={(res) => setExpireDate(res.target.value)}
                  value={expireDate}
                />
                <label>انقضا.ش:</label>
                <DateInputSimple
                  onChange={(res) =>
                    setExpireDate(res.target.value.slice(0, 10))
                  }
                />
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
                  value={discountPercent}
                  onChange={(e) => {
                    setDiscountPercent(e.target.value);
                  }}
                />
                <div className="adding-box">
                  <label>خرید.ق:</label>
                  <label className="old-price">
                    {autoCompleteData.medician.last_purchased} AF
                  </label>
                  <input
                    type="submit"
                    value="⤵ Add"
                    className="add-button"
                  ></input>
                </div>
              </form>

              <form className="entrance-medician">
                <div className="entrance-medician-header">
                  <label>No</label>
                  <label>قلم</label>
                  <label>تعداد</label>
                  <label>قیمت</label>
                  <label>تخفیف</label>
                  <label>تخفیف %</label>
                  <label>ت.قطی</label>
                  <label>جمع.خرید</label>
                  <label>بعد.تخفیف</label>
                  <label>م.تخفیف</label>
                  <label>بونوس</label>
                  <label>م.بونوس</label>
                  <label>کمبود</label>
                  <label>امانتی</label>
                  <label>فی.خرید</label>
                  <label>فایده٪</label>
                  <label>فی.فروش</label>
                  <label>جمع.فروش</label>
                  <label>حذف</label>
                </div>
                <div className="entrance-map">
                  {entranceThrough.map((through, key) => (
                    <EntrancThroughEntry
                      through={through}
                      keyValue={through.id}
                      num={key}
                      kind={kind}
                      country={country}
                      pharmGroub={pharmGroub}
                      UpdateUI={UpdateUI}
                      UpdateChunk={UpdateChunk}
                    />
                  ))}
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
