import React from "react";
import Modal from "react-modal";
import LoadingDNA from "../../PageComponents/LoadingDNA";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Kind from "../Kind";
import PharmGroup from "../PharmGroup";
import Country from "../Country";

function MedicianEntrance({title, icon, button}) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    UpdateFunction()
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const ModalStyles = {
    content: {
      backgroundColor: "rgb(30,30,30)",
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
    height: "1.7rem",
    borderRadius: "1rem",
    fontSize: "14px",
    backgroundColor: "rgb(34, 34, 34)",
    color: "white",
    border: "none",
    hoverBackgroundColor: "grey",
    overflow: "scroll",
    zIndex: "2",
  };

  const AutoCompleteStyle2 = {
    ...AutoCompleteStyle,
    zIndex: "1"
  }


  const COUNTRY_URL = import.meta.env.VITE_COUNTRY;
  const PHARM_GROUB_URL = import.meta.env.VITE_PHARM_GROUB;
  const KIND_URL = import.meta.env.VITE_KIND;
  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;

  const [country, setCountry] = React.useState([]);
  const [pharmGroup, setPharmGroup] = React.useState([]);
  const [kind, setKind] = React.useState([]);
  const [file, setFile] = React.useState("");
  const [autoCompleteData, setAutoCompleteData] = React.useState({
    country: "",
    pharm_group: "",
    kind: "",
  });

  React.useEffect(() => {
    axios
      .get(COUNTRY_URL)
      .then((res) => setCountry(res.data))
      .catch((err) => console.log(err));
    axios
      .get(PHARM_GROUB_URL)
      .then((res) => setPharmGroup(res.data))
      .catch((err) => console.log(err));
    axios
      .get(KIND_URL)
      .then((res) => setKind(res.data))
      .catch((err) => console.log(err));
  }, []);

  const SubmitMedician = (data) => {
    const MedicianForm = new FormData();
    MedicianForm.append("brand_name", data.brand_name);
    MedicianForm.append("geniric_name", data.geniric_name);
    MedicianForm.append("no_pocket", data.no_pocket);
    MedicianForm.append("ml", data.ml);
    MedicianForm.append("weight", data.no_pocket);
    MedicianForm.append("location", data.location);
    MedicianForm.append("company", data.company);
    MedicianForm.append("minmum_existence", data.minmum_existence);
    MedicianForm.append("maximum_existence", data.maximum_existence);
    MedicianForm.append("must_advised", data.must_advised);
    MedicianForm.append("dividing_rules", data.dividing_rules);
    MedicianForm.append("price", data.price);
    MedicianForm.append("generic_name", data.generic_name);
    MedicianForm.append("cautions", data.cautions);
    MedicianForm.append("usages", data.usages);
    MedicianForm.append("description", data.description);
    MedicianForm.append("barcode", data.barcode);
    MedicianForm.append("image", file);
    MedicianForm.append("pharm_group", autoCompleteData.pharm_group.id);
    MedicianForm.append("kind", autoCompleteData.kind.id);
    MedicianForm.append("country", autoCompleteData.country.id);

    axios
      .post(MEDICIAN_URL, MedicianForm)
      .then((res) => {
        console.log(res.data);
        toast.success("Data Updated Successfuly.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Check Your Input And Try Again!");
      });
  };

  const UpdateFunction = () => {
    axios
      .get(COUNTRY_URL)
      .then((res) => setCountry(res.data))
      .catch((err) => console.log(err));
    axios
      .get(PHARM_GROUB_URL)
      .then((res) => setPharmGroup(res.data))
      .catch((err) => console.log(err));
    axios
      .get(KIND_URL)
      .then((res) => setKind(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <>
      {button == 1 && 
      <div className="purchase-card" onClick={registerModalOpener}>
        <div>
          <h3>{title}</h3>
          <div>{<LoadingDNA />}</div>
        </div>
        <div>
          <i className={icon}></i>
        </div>
      </div>}

      {button == 2 && (
        <div className="plus-box medician-select-plus" onClick={registerModalOpener}>
          <div className="plus ">
          <i class="fa-solid fa-plus"></i>
          </div>
        </div>
      )}


      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>ثبت دوا</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <form className="medician-inter">
          <div className="medician-inter">
            <div className="medician-inter-form">
              <label>نام برند:</label>
              <input type="text" {...register("brand_name")} />
              <label>محلول:</label>
              <input type="text" {...register("ml")} />
              <label>گروپ دوایی:</label>
              <div style={{ marginLeft: "0.5rem" }}>
                <ReactSearchAutocomplete
                  fuseOptions={{ keys: ["name_english", "name_persian"] }}
                  items={pharmGroup}
                  styling={AutoCompleteStyle}
                  showClear={false}
                  inputDebounce="10"
                  showIcon={false}
                  resultStringKeyName="name_english"
                  onSelect={(data) => {
                    setAutoCompleteData({
                      ...autoCompleteData,
                      pharm_group: data,
                    });
                  }}
                />
                <PharmGroup button={2} Update={UpdateFunction} />
              </div>
              <label>ت.پاکت:</label>
              <input type="text" {...register("no_pocket")} />
              <label>نوع:</label>
              <div style={{ marginLeft: "0.5rem" }}>
                <ReactSearchAutocomplete
                  fuseOptions={{ keys: ["name_english", "name_persian"] }}
                  items={kind}
                  styling={AutoCompleteStyle}
                  showClear={false}
                  inputDebounce="10"
                  showIcon={false}
                  resultStringKeyName="name_english"
                  onSelect={(data) => {
                    setAutoCompleteData({
                      ...autoCompleteData,
                      kind: data,
                    });
                  }}
                />
                <Kind button={2} Update={UpdateFunction} />
              </div>
              <label>وزن:</label>
              <input type="text" {...register("weight")} />
              <label>مکان:</label>
              <input type="text" {...register("location")} />
              <label>شرکت:</label>
              <input type="text" {...register("company")} />
              <label>کشور:</label>
              <div style={{ marginLeft: "0.5rem" }}>
                <ReactSearchAutocomplete
                  items={country}
                  styling={AutoCompleteStyle2}
                  showClear={false}
                  inputDebounce="10"
                  showIcon={false}
                  onSelect={(data) => {
                    setAutoCompleteData({
                      ...autoCompleteData,
                      country: data,
                    });
                  }}
                />
                <Country button={2} Update={UpdateFunction} />
              </div>
              <label>قیمت:</label>
              <input type="text" {...register("price")} />
              <label>حداقل:</label>
              <input type="text" {...register("minmum_existence")} />
              <label>حداکثر:</label>
              <input type="text" {...register("maximum_existence")} />
              <label>ترکیب:</label>
              <input
                type="text"
                className="generic-input"
                {...register("generic_name")}
              />
              <label>توصیه حتمی:</label>
              <input
                type="checkbox"
                className="must-advised-input"
                {...register("must_advised")}
              />
              <label>اخطاریه:</label>
              <textarea {...register("cautions")} />
              <label>استفاده:</label>
              <textarea {...register("usages")} />
              <label>عکس:</label>
              <input
                type="file"
                className="medician-image-field"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label>توضیحات:</label>
              <textarea {...register("description")} />
              <label>سهمیه:</label>
              <textarea {...register("dividing_rules")} />
              <label>بارکد:</label>
              <input type="text" {...register("barcode")} />
            </div>
            <div className="medician-inter-submit">
              <input
                type="submit"
                value="ثبت دوا"
                onClick={handleSubmit(SubmitMedician)}
              />
              <input type="reset" value="ریسیت" />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default MedicianEntrance;
