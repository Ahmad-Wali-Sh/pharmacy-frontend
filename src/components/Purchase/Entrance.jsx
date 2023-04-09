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
              item.kind == kind.id && kind.image
                ? kind.image.slice(38)
                : "./images/nophoto.jpg"
            )}
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
          />
        </div>
        <div className="medician-image">
          <img
            className="medician-image"
            src={pharmGroub.map((pharm) =>
              item.pharm_groub == pharm.id && pharm.image
                ? pharm.image.slice(38)
                : "./images/nophoto.jpg"
            )}
          />
        </div>
        <div className="medician-text-field">
          <h4>
            {item.brand_name +
              ", " +
              item.ml +
              ", " +
              kind.map((kind) =>
                item.kind == kind.id ? kind.name_english : ""
              )}
          </h4>
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
  const [exactEntrance, setExatEntrance] = React.useState([]);

  const [medician, setMedician] = React.useState([]);

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
      .then((result) => setMedician(result.data))
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
  }, [reRender]);

  const EntranceSubmit = (data) => {
    const EntranceForm = new FormData();
    EntranceForm.append("factor_number", data.factor_number);
    EntranceForm.append("factor_date", data.factor_date);
    EntranceForm.append("total_interest", data.total_interest);
    EntranceForm.append("deliver_by", data.deliver_by);
    EntranceForm.append("recived_by", data.recived_by);
    EntranceForm.append("description", data.description);
    EntranceForm.append("without_discount", data.without_discount);
    EntranceForm.append("company", autoCompleteData.company.id);
    EntranceForm.append("payment_method", data.payment_method);
    EntranceForm.append("currency", data.currency ? data.currency : 1);
    EntranceForm.append("final_register", data.final_register);
    EntranceForm.append("store", autoCompleteData.store.id);

    if (entrancePosted == false) {
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
    setReRender("Render");
  };

  const [entranceThrough, setEntranceThrough] = React.useState([]);
  console.log(entranceThrough);

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

    setReRender("Render");
  };

  const MedicianUpdate = (data) => {

    console.log(data.u_number_in_factor);
    const MedicianUpdateForm = new FormData();
    MedicianUpdateForm.append(
      "number_in_factor",
      data.u_number_in_factor[data.u_entrance_through_id]
    );
    MedicianUpdateForm.append(
      "each_price_factor",
      data.u_each_price_factor[data.u_entrance_through_id]
    );
    MedicianUpdateForm.append(
      "each_quantity",
      data.u_each_quantity[data.u_entrance_through_id]
    );
    MedicianUpdateForm.append(
      "discount_money",
      data.u_discount_money[data.u_entrance_through_id]
    );
    MedicianUpdateForm.append(
      "discount_percent",
      data.u_discount_percent[data.u_entrance_through_id]
    );
    MedicianUpdateForm.append(
      "expire_date",
      data.u_expire_date[data.u_entrance_through_id]
    );
    MedicianUpdateForm.append(
      "interest_money",
      data.u_interest_money[data.u_entrance_through_id]
    );
    MedicianUpdateForm.append(
      "interest_percent",
      data.u_interest_percent[data.u_entrance_through_id]
    );
    MedicianUpdateForm.append(
      "bonus",
      data.u_bonus[data.u_entrance_through_id]
    );
    MedicianUpdateForm.append(
      "quantity_bonus",
      data.u_quantity_bonus[data.u_entrance_through_id]
      )

    axios
      .patch(
        ENTRANCE_THROUGH_URL + data.u_entrance_through_id + "/",
        MedicianUpdateForm
      )
      .then((e) => console.log(e))
      .catch(() => toast.error("Check Your Input And Try Again!"));
  };

  const MedicianDelete = (data) => {
    axios
      .delete(ENTRANCE_THROUGH_URL + data.u_entrance_through_id + "/")
      .then(() => toast.success("Deleted Successfuly!"))
      .catch(() => toast.error("Can't Delete For Some Reason..."));

    setEntranceThrough((prev) =>
      prev.filter((object) => object.id != data.u_entrance_through_id)
    );
  };
  return (
    <>
      <div className="purchase-card" onClick={registerModalOpener}>
        <div>
          <h3>{props.title}</h3>
          <div>{entrance.length ? entrance.length : <LoadingDNA />}</div>
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
            <div className="entrance-report"></div>
            <form
              className="entrance-entrance"
              onSubmit={handleSubmit(EntranceSubmit)}
            >
              <label>وضعیت:</label>
              <select {...register("final_register")}>
                {finalRegister.map((final) => (
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
              />
              <label>تاریخ:</label>
              <input required type="date" {...register("factor_date")} />
              <label>شماره:</label>
              <input required type="text" {...register("factor_number")} />
              <label>ش.حواله:</label>
              <input
                value={exactEntrance.id}
                type="text"
                {...register("entrance_id")}
                disabled
              />
              <label>
                <h5>تحویل دهنده:</h5>
              </label>
              <input type="text" {...register("deliver_by")} />
              <label>
                <h5>تحویل گیرنده:</h5>
              </label>
              <input type="text" {...register("recived_by")} />
              <label>واحد پول:</label>
              <select {...register("currency")}>
                {currency.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name}
                  </option>
                ))}
              </select>
              <label>پرداخت:</label>
              <select {...register("payment_method")}>
                {paymentMethod.map((payment) => (
                  <option key={payment.id} value={payment.id}>
                    {payment.name}
                  </option>
                ))}
              </select>
              <label>فایده ٪:</label>
              <input type="text" {...register("total_interest")} />
              <label>
                <h5>بدون تخفیف:</h5>
              </label>
              <input
                type="checkbox"
                className="checkbox-input"
                {...register("without_discount")}
              />
              <label>توضیحات:</label>
              <textarea {...register("description")}></textarea>
              <input type="submit" value="Submit"></input>
              <input type="reset" value="Reset"></input>
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
                  onSelect={(item) =>
                    setAutoCompleteData({
                      ...autoCompleteData,
                      medician: item,
                    })
                  }
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
                  <div className="entrance-medician-map">
                    <label>{key + 1}</label>
                    <h4>
                      {medician.map((item) =>
                        item.id == through.medician
                          ? item.brand_name +
                            ", " +
                            item.ml +
                            ", " +
                            kind.map((kind) =>
                              item.kind == kind.id ? kind.name_english : ""
                            )
                          : " "
                      )}
                    </h4>
                    <input
                      type="text"
                      defaultValue={through.number_in_factor}
                      {...register(`u_number_in_factor[${key + 1}]`)}
                    />
                    <input
                      style={{ display: "none" }}
                      type="text"
                      {...register("u_entrance_through_id")}
                      value={through.id}
                    />
                    <input
                      type="text"
                      defaultValue={through.each_price_factor}
                      {...register(`u_each_price_factor[${through.id}]`)}
                    />
                    <input
                      type="text"
                      defaultValue={through.each_quantity}
                      {...register(`u_each_quantity[${through.id}]`)}
                    />
                    <input
                      type="text"
                      defaultValue={through.discount_money}
                      {...register(`u_discount_money[${through.id}]`)}
                    />
                    <input
                      type="text"
                      defaultValue={through.discount_percent}
                      {...register(`u_discount_percent[${through.id}]`)}
                    />
                    <input
                      type="date"
                      defaultValue={through.expire_date}
                      {...register(`u_expire_date[${through.id}]`)}
                    />
                    <input
                      type="text"
                      defaultValue={through.interest_money}
                      {...register(`u_interest_money[${through.id}]`)}
                    />
                    <input
                      type="text"
                      defaultValue={through.interest_percent}
                      {...register(`u_interest_percent[${through.id}]`)}
                    />
                    <input
                      type="text"
                      defaultValue={through.bonus}
                      {...register(`u_bonus[${through.id}]`)}
                    />
                    <input
                      type="text"
                      defaultValue={through.quantity_bonus}
                      {...register(`u_quantity_bonus[${through.id}]`)}
                    />
                    <div className="medician-map-buttons">
                      <div onClick={handleSubmit(MedicianDelete)}>
                        <i className="fa-solid fa-trash"></i>
                      </div>
                      <div onClick={handleSubmit(MedicianUpdate)}>
                        <i class="fa-solid fa-marker"></i>
                      </div>
                    </div>
                  </div>
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
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}
