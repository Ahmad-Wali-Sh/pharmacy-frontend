import Modal from "react-modal";
import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Dna } from "react-loader-spinner";

export default function Entrance(props) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }
  const customStyles = {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  const AutoCompleteStyle2 = {
    ...AutoCompleteStyle,
    zIndex: "1",
  };

  const formatResult = (item) => {
    return (
      <div className="medician-format">
        <div className="medician-image">
          <img
            className="medician-image"
            src={item.image ? item.image.slice(38) : "./images/nophoto.jpg"}
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={kind.map((kind) =>
              item.kind == kind.id && kind.image == "./images/"
                ? kind.image.slice(38)
                : "./images/nophoto.jpg"
            )}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "./images/nophoto.jpg";
            }}
            alt=""
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={country.map((country) =>
              item.country == country.id && country.image
                ? country.image.slice(38)
                : "./images/nophoto.jpg"
            )}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "./images/nophoto.jpg";
            }}
            alt=""
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={pharmGroub.map((pharm) =>
              item.pharm_groub == pharm.id && pharm.image
                ? pharm.image.slice(38)
                : ""
            )}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "./images/nophoto.jpg";
            }}
            alt=""
          />
        </div>
        <div className="medician-text-field">
          <h4>{item.brand_name}</h4>
          <h4></h4>
          <h4>Generic: {item.generic_name.toString()}</h4>
          <h4></h4>
          <h4>Location: {item.location}</h4>
          <h4></h4>
          <h4>Price: {item.price}</h4>
          <h4>NO.Pack: {item.no_pocket}</h4>
          <h4>Existence: {item.existence}</h4>
        </div>
      </div>
    );
  };

  const [autoCompleteData, setAutoCompleteData] = React.useState({
    company: "",
    store: "",
    medician: [],
  });

  /* Styling Finished */
  /* CRUD */

  const ENTRANCE_URL = import.meta.env.VITE_ENTRANCE;
  const FINAL_REGISTER_URL = import.meta.env.VITE_FINAL_REGISTER;
  const COMPANY_URL = import.meta.env.VITE_PHARM_COMPANIES;
  const STORE_URL = import.meta.env.VITE_STORE;
  const CURRENCY_URL = import.meta.env.VITE_CURRENCY;
  const PAYMENT_METHOD_URL = import.meta.env.VITE_PAYMENT_METHOD;
  const ENTRANCE_THROUGH_URL = import.meta.env.VITE_ENTRANCE_THROUGH;
  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;
  const COUNTRY_URL = import.meta.env.VITE_COUNTRY;
  const KIND_URL = import.meta.env.VITE_KIND;
  const PHARM_GROUB_URL = import.meta.env.VITE_PHARM_GROUB;

  const [entrance, setEntrance] = React.useState([]);
  const [finalRegister, setFinalRegister] = React.useState([]);
  const [company, setCompany] = React.useState([]);
  const [store, setStore] = React.useState([]);
  const [currency, setCurrency] = React.useState([]);
  const [paymentMethod, setPaymentMethod] = React.useState([]);
  const [country, setCountry] = React.useState([]);
  const [kind, setKind] = React.useState([]);
  const [pharmGroub, setPharmGroub] = React.useState([]);
  const [reRender, setReRender] = React.useState([]);
  const [entrancePosted, setEntrancePosted] = React.useState(false);
  const [medician, setMedician] = React.useState([]);
  const [allMedician, setAllMedician] = React.useState([]);
  const [entranceThrough, setEntranceThrough] = React.useState([]);
  const [searched, setSearched] = React.useState(false);
  const [show, setShow] = React.useState([]);
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

  React.useEffect(() => {
    axios
      .get(ENTRANCE_URL)
      .then((result) => setEntrance(result.data))
      .catch((e) => console.log(e));

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
      .get(MEDICIAN_URL)
      .then((result) => setAllMedician(result.data))
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
  }, []);

  const EntranceSubmit = (data) => {
    console.log(data);
    const EntranceForm = new FormData();
    EntranceForm.append(
      "factor_number",
      data.factor_number != ""
        ? data.factor_number
        : exactEntrance.factor_number
    );
    EntranceForm.append(
      "factor_date",
      data.factor_date != "" ? data.factor_date : exactEntrance.factor_date
    );
    EntranceForm.append(
      "total_interest",
      data.total_interest != ""
        ? data.total_interest
        : exactEntrance.total_interest
    );
    EntranceForm.append(
      "deliver_by",
      data.deliver_by != "" ? data.deliver_by : exactEntrance.deliver_by
    );
    EntranceForm.append(
      "recived_by",
      data.recived_by != "" ? data.recived_by : exactEntrance.recived_by
    );
    EntranceForm.append(
      "description",
      data.description != "" ? data.description : exactEntrance.description
    );
    EntranceForm.append(
      "without_discount",
      exactEntrance != []
        ? exactEntrance.without_discount
        : data.without_discount
    );
    EntranceForm.append(
      "company",
      autoCompleteData.company != ""
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
      autoCompleteData.store != ""
        ? autoCompleteData.store.id
        : exactEntrance.store
    );

    if (searched == true) {
      axios
        .patch(ENTRANCE_URL + exactEntrance.id + "/", EntranceForm)
        .then((e) => {
          toast.success("Data Updated Successfuly.");
          console.log(e);
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
          axios
            .get(ENTRANCE_URL)
            .then((result) => {
              setEntrance(result.data);
              toast.info("Data Updated.");
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => {
          console.log(e);
          toast.error("Check Your Input And Try Again!");
        });
    }
    setSearched(true);
  };

  const EntranceThroughSubmit = (data) => {
    const EntranceThrough = new FormData();
    EntranceThrough.append("number_in_factor", data.number_in_factor);
    EntranceThrough.append("medician", autoCompleteData.medician.id);
    EntranceThrough.append("each_price_factor", data.each_price_factor);
    EntranceThrough.append("each_quantity", data.each_quantity);
    EntranceThrough.append("discount_money", data.discount_money);
    EntranceThrough.append("discount_percent", data.discount_percent);
    EntranceThrough.append("expire_date", data.expire_date);
    EntranceThrough.append("interest_money", data.interest_money);
    EntranceThrough.append("interest_percent", data.interest_percent);
    EntranceThrough.append("bonus", data.bonus);
    EntranceThrough.append("quantity_bonus", data.quantity_bonus);
    EntranceThrough.append("entrance", exactEntrance.id);

    axios
      .post(ENTRANCE_THROUGH_URL, EntranceThrough)
      .then((data) => {
        console.log(data);
        setEntranceThrough((prev) => [...prev, data.data]);
        toast.info("New Item Added.");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Check Your Input And Try Again! ");
      });
    setShow((prev) => [...prev, true]);
  };

  const MedicianUpdate = (data, key) => {
    const MedicianUpdateForm = new FormData();
    MedicianUpdateForm.append("number_in_factor", data.u_number_in_factor[key]);
    MedicianUpdateForm.append(
      "each_price_factor",
      data.u_each_price_factor[key]
    );
    MedicianUpdateForm.append("each_quantity", data.u_each_quantity[key]);
    MedicianUpdateForm.append("discount_money", data.u_discount_money[key]);
    MedicianUpdateForm.append("discount_percent", data.u_discount_percent[key]);
    MedicianUpdateForm.append("expire_date", data.u_expire_date[key]);
    MedicianUpdateForm.append("interest_money", data.u_interest_money[key]);
    MedicianUpdateForm.append("interest_percent", data.u_interest_percent[key]);
    MedicianUpdateForm.append("bonus", data.u_bonus[key]);
    MedicianUpdateForm.append("quantity_bonus", data.u_quantity_bonus[key]);

    axios
      .patch(
        ENTRANCE_THROUGH_URL + data.u_entrance_through_id[key] + "/",
        MedicianUpdateForm
      )
      .then(() => toast.success("Data Updated Successfuly."))
      .catch(() => toast.error("Check Your Input And Try Again!"));
  };

  const MedicianDelete = (data, key) => {
    console.log(data, key);
    axios
      .delete(ENTRANCE_THROUGH_URL + data.u_entrance_through_id[key] + "/")
      .then(() => toast.success("Deleted Successfuly!"))
      .catch((e) => {
        toast.error("Can't Delete For Some Reason...");
        console.log(e);
      });
  };

  const SearchSubmit = (data) => {
    setExatEntrance({
      without_discount: false,
      description: "",
    });
    setEntranceThrough([]);
    setSearched(true);
    axios.get(ENTRANCE_URL + data.entrance_search + "/").then((e) => {
      console.log(e);
      setExatEntrance(e.data);
    });

    axios
      .get(ENTRANCE_THROUGH_URL + "?entrance=" + data.entrance_search)
      .then((e) => {
        console.log(e);
        setEntranceThrough(e.data);
      })
      .catch((e) => console.log(e));
  };
  const ResetForm = () => {
    setExatEntrance({
      without_discount: false,
      description: "",
    });
    setEntranceThrough([]);
    setEntrancePosted(false);
    setSearched(false);
  };
  React.useEffect(() => {
    Reporting();
  }, [entranceThrough]);

  const Reporting = () => {
    const totalInterest = () => {
      let result;
      const total = entranceThrough.map(
        (through) => (result = +(through.number_in_factor * through.each_price))
      );
      total.forEach((item) => (result += item));
      return result;
    };

    const totalSell = () => {
      let result;
      const total = entranceThrough.map(
        (through) => (result = +(through.number_in_factor * through.each_price))
      );
      total.forEach((item) => (result += item));
      return result;
    };

    setReport({
      total: 0,
      total_interest: totalInterest(),
      number: entranceThrough.length,
      sell_total: 0,
      purchase_total: 0,
    });
  };

  return (
    <>
      <div className="purchase-card" onClick={registerModalOpener}>
        <div>
          <h3>{props.title}</h3>
          <div>{medician.length ? entrance.length : <LoadingDNA />}</div>
        </div>
        <div>
          <i className={props.icon}></i>
        </div>
      </div>
      <Modal
        style={customStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal">
          <div className="modal-header">
            <h3>ثبت ورودی</h3>
            <div className="modal-close-btn" onClick={registerModalCloser}>
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
                  <label>مجموع فایده </label>
                  <label>{report.total_interest}</label>
                </div>
                <div className="entrance-report-map-box">
                  <label>مجموع خرید </label>
                  <label>{report.purchase_total}</label>
                </div>
                <div className="entrance-report-map-box">
                  <label>مجموع فروش </label>
                  <label>{report.sell_total}</label>
                </div>
                <div className="entrance-report-map-box">
                  <label>مجموع</label>
                  <label>{report.total}</label>
                </div>
              </div>
            </div>
            <form
              className="entrance-entrance"
              onSubmit={handleSubmit(EntranceSubmit)}
            >
              <label>وضعیت:</label>
              <select
                {...register("final_register")}
                placeholder={exactEntrance.final_register}
              >
                <option value={exactEntrance.final_register} selected hidden>
                  {finalRegister.map((final) =>
                    final.id == exactEntrance.final_register ? final.name : ""
                  )}
                </option>
                {finalRegister.map((final, key) => (
                  <option key={final.id} value={final.id}>
                    {final.name}
                  </option>
                ))}
              </select>
              <label>شرکت:</label>
              <ReactSearchAutocomplete
                items={company}
                onSelect={(item) =>
                  setAutoCompleteData({ ...autoCompleteData, company: item })
                }
                styling={AutoCompleteStyle}
                showClear={false}
                inputDebounce="10"
                placeholder={company.map((company) =>
                  company.id == exactEntrance.company ? company.name : ""
                )}
              />
              <label>انبار:</label>
              <ReactSearchAutocomplete
                items={store}
                styling={AutoCompleteStyle}
                onSelect={(item) =>
                  setAutoCompleteData({ ...autoCompleteData, store: item })
                }
                showClear={false}
                inputDebounce="10"
                placeholder={store.map((store) =>
                  store.id == exactEntrance.store ? store.name : ""
                )}
              />
              <label>تاریخ:</label>
              <input
                required
                type="date"
                defaultValue={exactEntrance.factor_date}
                {...register("factor_date")}
              />
              <label>شماره:</label>
              <input
                required
                type="text"
                {...register("factor_number")}
                defaultValue={exactEntrance.factor_number}
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
                  <input type="text" {...register("entrance_search")} />
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
              />
              <label>
                <h5>تحویل گیرنده:</h5>
              </label>
              <input
                type="text"
                {...register("recived_by")}
                defaultValue={exactEntrance.recived_by}
              />
              <label>واحد پول:</label>
              <select {...register("currency")}>
                <option value={exactEntrance.currency} selected hidden>
                  {currency.map((currency) =>
                    currency.id == exactEntrance.currency ? currency.name : ""
                  )}
                </option>
                {currency.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name}
                  </option>
                ))}
              </select>
              <label>پرداخت:</label>
              <select {...register("payment_method")}>
                <option value={exactEntrance.payment_method} selected hidden>
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
              <label>فایده ٪:</label>
              <input
                type="text"
                {...register("total_interest")}
                defaultValue={exactEntrance.total_interest}
              />
              <label>
                <h5>بدون تخفیف:</h5>
              </label>
              <input
                type="checkbox"
                className="checkbox-input"
                defaultChecked={exactEntrance.without_discount}
                {...register("without_discount")}
              />
              <label>توضیحات:</label>
              <textarea
                {...register("description")}
                defaultValue={exactEntrance.description}
              ></textarea>
              <div></div>
              <div className="entrance-buttons">
                <input type="reset" value="Reset" onClick={ResetForm}></input>
                <input
                  type="submit"
                  value={searched ? "Update" : "Submit"}
                ></input>
              </div>
            </form>
            <form
              className="entrance-through"
              onSubmit={handleSubmit(EntranceThroughSubmit)}
            >
              <label>قلم:</label>
              <div className="entrance-through-medician-input">
                <ReactSearchAutocomplete
                  items={medician}
                  fuseOptions={{ keys: ["brand_name"] }}
                  resultStringKeyName="brand_name"
                  styling={AutoCompleteStyle2}
                  showClear={false}
                  inputDebounce="10"
                  onSearch={(string, result) => {
                    axios
                      .get(
                        string != ""
                          ? MEDICIAN_URL + "?search=" + string
                          : MEDICIAN_URL + "?search=" + "''"
                      )
                      .then((res) => {
                        setMedician(res.data);
                        console.log(res.data);
                      });
                  }}
                  onSelect={(item) =>
                    setAutoCompleteData({
                      ...autoCompleteData,
                      medician: item,
                    })
                  }
                  maxResults={4}
                  formatResult={formatResult}
                />
              </div>
              <label>تعداد:</label>
              <input type="text" {...register("number_in_factor")} />
              <label>قیمت فی:</label>
              <input type="text" {...register("each_price_factor")} />
              <label>
                <h5> ت.د.پاکت:</h5>
              </label>
              <input
                type="text"
                value={autoCompleteData.medician.no_pocket}
                {...register("each_quantity")}
              />
              <label>تخفیف:</label>
              <input type="text" {...register("discount_money")} />
              <label>تخفیف ٪:</label>
              <input type="text" {...register("discount_percent")} />
              <label>انقضا:</label>
              <input type="date" {...register("expire_date")} />
              <label>فایده:</label>
              <input type="text" {...register("interest_money")} />
              <label>فایده ٪:</label>
              <input type="text" {...register("interest_percent")} />
              <div></div>
              <div></div>
              <label>بونوس:</label>
              <input type="text" {...register("bonus")} />
              <label>ت.بونوس:</label>
              <input type="text" {...register("quantity_bonus")} />
              <div></div>
              <input type="submit" value="⤵ Add"></input>
            </form>

            <form className="entrance-medician">
              <div className="entrance-medician-header">
                <label></label>
                <label>No</label>
                <label>قلم</label>
                <label>تعداد</label>
                <label>قیمت فی</label>
                <label>ت.د.پاکت</label>
                <label>تخفیف</label>
                <label>تخفیف %</label>
                <label>انقضا</label>
                <label>فایده</label>
                <label>فایده %</label>
                <label>بونوس </label>
                <label>بونوس %</label>
                <label>ذخیره</label>
              </div>
              <div className="entrance-map">
                {entranceThrough.map((through, key) => (
                  // <div
                  //   className={
                  //     show[key] == true
                  //       ? "entrance-medician-map"
                  //       : "entrance-medician-map"
                  //   }
                  // >
                  //   <label>{key + 1}</label>
                  //   <h4>
                  //     {allMedician.map((item) =>
                  //       item.id == through.medician ? item.brand_name : " "
                  //     )}
                  //   </h4>
                  //   <input
                  //     type="text"
                  //     defaultValue={through.number_in_factor}
                  //     {...register(`u_number_in_factor[${key}]`)}
                  //   />
                  //   <input
                  //     style={{ display: "none" }}
                  //     type="text"
                  //     {...register(`u_entrance_through_id[${key}]`)}
                  //     value={through.id}
                  //   />
                  //   <input
                  //     type="text"
                  //     defaultValue={through.each_price_factor}
                  //     {...register(`u_each_price_factor[${key}]`)}
                  //   />
                  //   <input
                  //     type="text"
                  //     defaultValue={through.each_quantity}
                  //     {...register(`u_each_quantity[${key}]`)}
                  //   />
                  //   <input
                  //     type="text"
                  //     defaultValue={through.discount_money}
                  //     {...register(`u_discount_money[${key}]`)}
                  //   />
                  //   <input
                  //     type="text"
                  //     defaultValue={through.discount_percent}
                  //     {...register(`u_discount_percent[${key}]`)}
                  //   />
                  //   <input
                  //     type="date"
                  //     defaultValue={through.expire_date}
                  //     {...register(`u_expire_date[${key}]`)}
                  //   />
                  //   <input
                  //     type="text"
                  //     defaultValue={through.interest_money}
                  //     {...register(`u_interest_money[${key}]`)}
                  //   />
                  //   <input
                  //     type="text"
                  //     defaultValue={through.interest_percent}
                  //     {...register(`u_interest_percent[${key}]`)}
                  //   />
                  //   <input
                  //     type="text"
                  //     defaultValue={through.bonus}
                  //     {...register(`u_bonus[${key}]`)}
                  //   />
                  //   <input
                  //     type="text"
                  //     defaultValue={through.quantity_bonus}
                  //     {...register(`u_quantity_bonus[${key}]`)}
                  //   />
                  //   <div className="medician-map-buttons">
                  //     <div
                  //       onClick={handleSubmit((data) =>
                  //         MedicianDelete(data, key)
                  //       )}
                  //     >
                  //       <i className="fa-solid fa-trash"></i>
                  //     </div>
                  //     <div
                  //       onClick={handleSubmit((data) =>
                  //         MedicianUpdate(data, key)
                  //       )}
                  //     >
                  //       <i class="fa-solid fa-marker"></i>
                  //     </div>
                  //   </div>
                  // </div>
                  <EntrancThroughEntry
                    through={through}
                    key={through.id}
                    onSubmit={MedicianUpdate}
                  />
                ))}
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

function LoadingDNA() {
  return (
    <div className="loading">
      <Dna
        visible={true}
        width="40%"
        height="100%"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}

function EntrancThroughEntry({ through, onSubmit }) {
  const [inputData, setInputDate] = React.useState({
    number_in_factor: "",
    each_price_factor: "",
    each_quantity: "",
    discount_money: "",
    discount_percent: "",
    expire_date: "",
    interest_money: "",
    interest_percent: "",
    bonus: "",
    quantity_bonus: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const MedicianUpdate = (data, key) => {
    const MedicianUpdateForm = new FormData();
    MedicianUpdateForm.append("number_in_factor", data.number_in_factor);
    MedicianUpdateForm.append("each_price_factor",data.each_price_factor);
    MedicianUpdateForm.append("each_quantity", data.each_quantity);
    MedicianUpdateForm.append("discount_money", data.discount_money);
    MedicianUpdateForm.append("discount_percent", data.discount_percent);
    MedicianUpdateForm.append("expire_date", data.expire_date);
    MedicianUpdateForm.append("interest_money", data.interest_money);
    MedicianUpdateForm.append("interest_percent", data.interest_percent);
    MedicianUpdateForm.append("bonus", data.bonus);
    MedicianUpdateForm.append("quantity_bonus", data.quantity_bonus);

    axios
      .patch(
        ENTRANCE_THROUGH_URL + data.entrance_through_id + "/",
        MedicianUpdateForm
      )
      .then(() => toast.success("Data Updated Successfuly."))
      .catch(() => toast.error("Check Your Input And Try Again!"));
  };

  const MedicianDelete = (data, key) => {
    console.log(data, key);
    axios
      .delete(ENTRANCE_THROUGH_URL + data.entrance_through_id + "/")
      .then(() => toast.success("Deleted Successfuly!"))
      .catch((e) => {
        toast.error("Can't Delete For Some Reason...");
        console.log(e);
      });
  };

  return (
    <form onSubmit={(e) => onSubmit(handleSubmit)}>
      <div className="entrance-medician-map">
        <label>1</label>
        <h4>
          {/* {allMedician.map((item) =>
            item.id == through.medician ? item.brand_name : " "
          )} */}
        </h4>
        <input type="text" defaultValue={through.number_in_factor} {...register('number_in_factor')}/>
        <input style={{ display: "none" }} type="text" value={through.id} {...register('entrance_through_id')}/>
        <input type="text" defaultValue={through.each_price_factor} {...register('each_price_factor')}/>
        <input type="text" defaultValue={through.each_quantity} {...register('each_qunatity')}/>
        <input type="text" defaultValue={through.discount_money} {...register('discount_money')}/>
        <input type="text" defaultValue={through.discount_percent} {...register('discount_percent')}/>
        <input type="date" defaultValue={through.expire_date} {...register('expire_date')}/>
        <input type="text" defaultValue={through.interest_money} {...register('interest_money')}/>
        <input type="text" defaultValue={through.interest_percent} {...register('interest_percent')}/>
        <input type="text" defaultValue={through.bonus} {...register('bonus')}/>
        <input type="text" defaultValue={through.quantity_bonus} {...register('quantity_bonus')}/>
        <div className="medician-map-buttons">
          <div onClick={() => handleSubmit((data) => {
            MedicianDelete(data)
          })}>
            <i className="fa-solid fa-trash"></i>
          </div>
          <input type='submit'/>
          <div onClick={() => handleSubmit((data)=> {
            MedicianUpdate(data)
          })}>
            <i class="fa-solid fa-marker"></i>
          </div>
        </div>
      </div>
    </form>
  );
}
