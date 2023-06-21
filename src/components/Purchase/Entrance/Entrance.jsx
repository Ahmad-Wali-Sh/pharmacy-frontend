import Modal from "react-modal";
import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import EntrancThroughEntry from "./EntrancThroughEntry";
import SelectMedician from "./SelectMedician";
import Company from "../Company/Company";
import Store from "../Store/Store";
import FinalRegister from "../FinalRegister/FinalRegister";
import Currency from "../Currency/Currency";
import Payment from "../Payment/Payment";
import {
  DateTimeInput,
  DateTimeInputSimple,
  DateInput,
  DateInputSimple,
} from "react-hichestan-datetimepicker";

export default function Entrance(props) {
  /* Modal */

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

  const popUpStyle = {
    content: {
      backgroundColor: "rgb(120,120,120)",
      border: "none",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "0px",
      margin: "0px",
      zIndex: "100",
      width: "30%",
      height: "30%",
      top:"30%",
      left:"35%"
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
    },
  }

  /* Form Hook */

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  /* AutoComplete Search */

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

  const [autoCompleteData, setAutoCompleteData] = React.useState({
    company: "",
    store: "",
    medician: [],
  });

  function AutoCompleteHandle(data) {
    setAutoCompleteData({
      ...autoCompleteData,
      medician: data,
    });
  }

  /* CRUD */

  /* Links */

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

  /* States */

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
  const [exactEntrance, setExatEntrance] = React.useState({
    without_discount: false,
    description: "",
  });
  const [report, setReport] = React.useState({
    total: 0,
    total_interest: 0,
    number: 0,
    sell_total: 0,
    purchase_total: 0,
  });
  const [FactorTotal,setFactorTotal] = React.useState(0)

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
    ResetForm()
    reset({})
  }

  const TotalAlertCloser = () => {
    if (report.grandTotal == FactorTotal) {
      registerModalCloser()
    }
    if (report.grandTotal != FactorTotal) {
      AlertModalOpener()
    }
  }

  const [AlertModalOpen, setAlertModalOpen] = React.useState(false)

  const AlertModalOpener = () => {
    setAlertModalOpen(true)
  } 
  const AlertModalCloser = () => {
    setAlertModalOpen(false)
    registerModalCloser()

  } 

  const AlertJustModalCloser = () => {
    setAlertModalOpen(false)
  }


  const [PriceAlertOpen, setPriceAlertOpen] = React.useState(false)

  const PriceAlertOpener = () => {
    setPriceAlertOpen(true)
  }

  const PriceAlertCloser = () => {
    setPriceAlertOpen(false)
    setTrigger((prev) => prev + 1);
  }

  /* Requests */

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

  /* Handlers and Submiting */

  const [datePickerValue, setDatePickerValue] = React.useState(
    new Date().toISOString()
  );
  const [expireDate, setExpireDate] = React.useState("");
  console.log(expireDate);

  const EntranceSubmit = (data) => {
    const EntranceForm = new FormData();
    EntranceForm.append(
      "factor_number",
      data.factor_number != ""
        ? data.factor_number
        : exactEntrance.factor_number
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

    if (searched == true) {
      axios
        .patch(ENTRANCE_URL + exactEntrance.id + "/", EntranceForm)
        .then((e) => {
          toast.success("Data Updated Successfuly.");
          setExatEntrance(e.data);
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
          setSearched(true);
          setTrigger((prev) => prev + 1);
        })
        .catch((e) => {
          console.log(e);
          toast.error("Check Your Input And Try Again!");
        });
    }
  };
  const [selectTrigger, setTrigger] = React.useState(0);

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
        setSearched(true);
        setDatePickerValue(e.data.factor_date);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Check Your Input And Try Again!");
      });

    axios
      .get(ENTRANCE_THROUGH_URL + "?entrance=" + data.entrance_search)
      .then((e) => {
        setEntranceThrough(e.data);
      })
      .catch((e) => console.log(e));
  };

  
  const [popUpOpen, setpopUpOpen] = React.useState(false)
  const [excatTrough, setExactThrough] = React.useState("")

  const popUpCloser = () => {
    setpopUpOpen(false)
  }
  const popUpOpener = () => {
    setpopUpOpen(true)
  }

  const MedicineIncluder = (data) => {

    const MedicianUpdateForm = new FormData();
    MedicianUpdateForm.append("number_in_factor", excatTrough && parseInt(excatTrough.number_in_factor) + parseInt(data.number_in_factor));

    axios
      .patch(ENTRANCE_THROUGH_URL + excatTrough.id + "/", MedicianUpdateForm)
      .then(() => {
        toast.success("Data Updated Successfuly.");
        UpdateChunk();
        UpdateUI()
        popUpCloser()
      })
      .catch(() => toast.error("Check Your Input And Try Again!"));

  }



  const EntranceThroughSubmit = (data) => {
    const EntranceThrough = new FormData();
    EntranceThrough.append("number_in_factor", data.number_in_factor);
    EntranceThrough.append("medician", autoCompleteData.medician.id);
    EntranceThrough.append("each_price_factor", data.each_price_factor);
    EntranceThrough.append(
      "each_quantity",
      data.each_quantity != ""
        ? data.each_quantity
        : autoCompleteData.medician.no_pocket
    );
    EntranceThrough.append("discount_money", data.discount_money);
    EntranceThrough.append("discount_percent", data.discount_percent);
    EntranceThrough.append("expire_date", expireDate);
    EntranceThrough.append("interest_money", data.interest_money);
    EntranceThrough.append(
      "interest_percent",
      data.interest_percent != ""
        ? data.interest_percent
        : exactEntrance.total_interest
    );
    EntranceThrough.append("bonus", data.bonus);
    EntranceThrough.append("quantity_bonus", data.quantity_bonus);
    EntranceThrough.append("entrance", exactEntrance.id);

    let result = true;
    const Conditional = () => {entranceThrough.map((prescription) => {
      prescription.medician == autoCompleteData.medician.id && (result = false, setExactThrough(prescription))
      return result
    })
    return result
  } 

  const ConditionalInclude = () => {
    entranceThrough.includes(autoCompleteData.medician.id)
  }

  console.log(ConditionalInclude())

    if (Conditional() == true){
    axios
      .post(ENTRANCE_THROUGH_URL, EntranceThrough)
      .then((data) => {
        setEntranceThrough((prev) => [...prev, data.data]);
        toast.info("New Item Added.");
        reset({
          number_in_factor: "",
          each_price_factor: "",
          discount_money: "",
          discount_percent: "",
          expire_date: "",
          interest_money: "",
          bonus: "",
          quantity_bonus:"",
        })
        PriceCheck(data.data)
      })
      .catch((e) => {
        console.log(e);
        toast.error("Check Your Input And Try Again! ");
      });}

    if (Conditional() == false) {
      popUpOpener()
    }
  };

  const PriceCheck = (data) => {
    console.log(data.each_price)
      if (data.each_sell_price != autoCompleteData.medician.price) {
        PriceAlertOpener()
      }
      else {
        setTrigger((prev) => prev + 1);
      }
  }


  const ResetForm = () => {
    reset({})
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
    setFactorTotal(0)

    document.getElementsByClassName("entrance--inputs").reset();
  };
  React.useEffect(() => {
    Reporting();
  }, [entranceThrough]);

  const Reporting = () => {
    const totalInterest = () => {
      let result = 0;
      entranceThrough.map((through) => {
        result += through.total_interest;
        console.log(result);
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

    const grandTotal = () => {};

    setReport({
      total: 0,
      total_interest: totalInterest(),
      number: entranceThrough.length,
      sell_total: 0,
      purchase_total: totalPurchase(),
      grandTotal: totalInterest() + totalPurchase(),
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

  React.useEffect(() => {
    store.map((store) =>
      store.id == exactEntrance.store ? setStoreName(store.name) : ""
    );
    company.map((company) =>
      company.id == exactEntrance.company ? setCompanyName(company.name) : ""
    );
  }, [exactEntrance]);

  const tabFormulate = () => {
    document.getElementById("number-in-factor-input").focus();
  };

  React.useEffect(() => {
    if (props.button == 1 && registerModalOpen) {
      axios
        .get(ENTRANCE_URL + props.entrance.id)
        .then((res) => {
          setExatEntrance(res.data);
          setSearched(true);
          axios
            .get(ENTRANCE_THROUGH_URL + "?entrance=" + res.data.id)
            .then((res) => setEntranceThrough(res.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [registerModalOpen]);

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
          // onRequestClose={registerModalCloser}
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
                    <label>مجموع خرید </label>
                    <label>{report.purchase_total}</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>مجموع فایده </label>
                    <label>{report.total_interest}</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>مجموع</label>
                    <label>{report.grandTotal}</label>
                  </div>
                  <div className="entrance-report-map-box">
                    <label>مجموع فاکتور</label>
                    <input type='text' onChange={(res) => setFactorTotal(res.target.value)} defaultValue={FactorTotal}/>
                  </div>
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
                    styling={AutoCompleteStyle}
                    showClear={false}
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
                    inputDebounce="10"
                    placeholder={storeName}
                    showIcon={false}
                    className="entrance--inputs"
                  />
                  <Store button={2} Update={UpdateStores} />
                </div>
                <label>تاریخ:</label>

                {/* <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    className="datapicker-class"
                    style={{
                      backgroundColor: "rgb(34, 34, 34)",
                      color: "white",
                      width: "100%",
                      border: "none",
                      borderRadius: "1rem",
                    }}
                    onChange={DatePickerHandle}
                    value={datePickerValue}
                    format={"YYYY/MM/DD"}
                    onOpen={() => setDatePickerStatus(false)}
                    onBlurCapture={() => setDatePickerStatus(false)}
                    onKeyDown={DateKeyDownsHandle}
                    /> */}
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
                    <div
                      className="search-button-box"
                      onClick={handleSubmit(SearchSubmit)}
                    >
                      <i class="fa-brands fa-searchengin"></i>
                    </div>
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
                          ? currency.name
                          : ""
                      )}
                    </option>
                    {currency.map((currency) => (
                      <option key={currency.id} value={currency.id}>
                        {currency.name}
                      </option>
                    ))}
                  </select>
                  <Currency Update={CurrencyUpdate} />
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
                <label>فایده ٪:</label>
                <input
                  type="text"
                  {...register("total_interest")}
                  defaultValue={exactEntrance.total_interest}
                  className="entrance--inputs"
                />
                <label>
                  <h5>بدون تخفیف:</h5>
                </label>
                <input
                  type="checkbox"
                  className="checkbox-input entrance--inputs"
                  defaultChecked={exactEntrance.without_discount}
                  {...register("without_discount")}
                />
                <label>توضیحات:</label>
                <textarea
                  {...register("description")}
                  defaultValue={exactEntrance.description}
                  className="entrance--inputs"
                ></textarea>
                <div></div>
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
                />
                <label>قیمت فی:</label>
                <input
                  type="text"
                  {...register("each_price_factor")}
                  className="entrance--inputs"
                />
                <label>
                  <h5> ت.د.پاکت:</h5>
                </label>
                <input
                  type="text"
                  placeholder={autoCompleteData.medician.no_pocket}
                  {...register("each_quantity")}
                  className="entrance--inputs"
                />
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
                <label>انقضا:</label>
                <input
                  type="date"
                  {...register("expire_date")}
                  className="entrance--inputs date--inputs"
                  onChange={(res) => setExpireDate(res.target.value)}
                  value={expireDate}
                />
                <label>فایده:</label>
                <input
                  type="text"
                  {...register("interest_money")}
                  className="entrance--inputs"
                />
                <label>فایده ٪:</label>
                <input
                  type="text"
                  {...register("interest_percent")}
                  className="entrance--inputs"
                />
                <label></label>
                <DateInputSimple
                  onChange={(res) =>
                    setExpireDate(res.target.value.slice(0, 10))
                  }
                  // value={expireDate && expireDate}
                />
                <label>بونوس:</label>
                <input
                  type="text"
                  {...register("bonus")}
                  className="entrance--inputs"
                />
                <label>ت.بونوس:</label>
                <input
                  type="text"
                  {...register("quantity_bonus")}
                  className="entrance--inputs"
                />
                <div className="adding-box">
                  <label>قیمت:</label>
                <label className="old-price">{autoCompleteData.medician.price} AF</label>
                <input type="submit" value="⤵ Add" className="add-button"></input>
                </div>
              </form>

              <form className="entrance-medician">
                <div className="entrance-medician-header">
                  <label>No</label>
                  <label>قلم</label>
                  <label>تعداد</label>
                  <label>فی بونوس</label>
                  <label>فی خرید</label>
                  <label>فی فروش</label>
                  <label>ت.د.پاکت</label>
                  <label>تخفیف</label>
                  <label>تخفیف %</label>
                  <label>انقضا</label>
                  <label>فایده</label>
                  <label>فایده %</label>
                  <label>بونوس</label>
                  <label>جمع خرید</label>
                  <label>جمع فایده</label>
                  <label>مجموع</label>
                  <label>ذخیره</label>
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
