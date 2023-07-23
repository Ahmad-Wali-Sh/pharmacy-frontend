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
import { useAuthUser } from "react-auth-kit";

function MedicianEntrance({ title, icon, button, medician }) {
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
    zIndex: "1",
  };

  const COUNTRY_URL = import.meta.env.VITE_COUNTRY;
  const PHARM_GROUB_URL = import.meta.env.VITE_PHARM_GROUB;
  const KIND_URL = import.meta.env.VITE_KIND;
  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;
  const DEPARTMENT_URL = import.meta.env.VITE_DEPARTMENT;
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const user = useAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [country, setCountry] = React.useState([]);
  const [pharmGroup, setPharmGroup] = React.useState([]);
  const [kind, setKind] = React.useState([]);
  const [file, setFile] = React.useState("");
  const [kindName, setKindName] = React.useState("");
  const [department, setDepartment] = React.useState([]);
  const [pharmGroupName, setPharmGroupName] = React.useState("");
  const [countryName, setCountryName] = React.useState("");
  const [autoCompleteData, setAutoCompleteData] = React.useState({
    country: medician && medician.country ? medician.country : "",
    pharm_group: medician && medician.pharm_group ? medician.pharm_group : "",
    kind: medician && medician.kind ? medician.kind : "",
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
    axios
      .get(DEPARTMENT_URL)
      .then((res) => setDepartment(res.data))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    kind.map(
      (kind) =>
        kind.id == (medician && medician.kind) && setKindName(kind.name_english)
    );
  }, [kind]);
  React.useEffect(() => {
    pharmGroup.map(
      (pharm) =>
        pharm.id == (medician && medician.pharm_group) &&
        setPharmGroupName(pharm.name_english)
    );
  }, [pharmGroup]);
  React.useEffect(() => {
    country.map(
      (country) =>
        country.id == (medician && medician.country) &&
        setCountryName(country.name)
    );
  }, [country]);

  function registerModalOpener() {
    UpdateFunction();
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const SubmitMedician = (data) => {
    const MedicianForm = new FormData();
    MedicianForm.append("brand_name", data.brand_name);
    MedicianForm.append("geniric_name", data.geniric_name);
    MedicianForm.append("no_pocket", data.no_pocket);
    MedicianForm.append("no_box", data.no_box);
    MedicianForm.append("ml", data.ml);
    MedicianForm.append("weight", data.weight);
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
    {
      file && MedicianForm.append("image", file);
    }
    MedicianForm.append("pharm_group", autoCompleteData.pharm_group);
    MedicianForm.append("kind", autoCompleteData.kind);
    MedicianForm.append("country", autoCompleteData.country);
    MedicianForm.append("doctor_approved", data.doctor_approved);
    MedicianForm.append("patient_approved", data.patient_approved);
    MedicianForm.append("department", data.department);
    MedicianForm.append("batch_number", data.batch_number);
    MedicianForm.append("active", data.active);
    MedicianForm.append("user", user().id);

    {
      button == 1 &&
        axios
          .post(MEDICIAN_URL, MedicianForm)
          .then((res) => {
            toast.success("Data Updated Successfuly.");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Check Your Input And Try Again!");
          });
    }
    {
      button == 2 &&
        axios
          .post(MEDICIAN_URL, MedicianForm)
          .then((res) => {
            toast.success("Data Updated Successfuly.");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Check Your Input And Try Again!");
          });
    }

    {
      button == 3 &&
        axios
          .patch(MEDICIAN_URL + medician.id + "/", MedicianForm)
          .then((res) => {
            toast.success("Data Updated Successfuly.");
          })
          .catch((err) => toast.error("Check Your Input And Try Again!"));
    }
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
  };

  return (
    <>
      {button == 1 && (
        <div className="purchase-card" onClick={registerModalOpener}>
          <div>
            <h3>{title}</h3>
            <div>{<LoadingDNA />}</div>
          </div>
          <div>
            <i className={icon}></i>
          </div>
        </div>
      )}

      {button == 2 && (
        <div
          className="plus-box medician-select-plus"
          onClick={registerModalOpener}
        >
          <div className="plus ">
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>
      )}

      {button == 3 && (
        <div onClick={registerModalOpener}>
          <i class="fa-solid fa-circle-info"></i>
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
              <input
                type="text"
                {...register("brand_name")}
                defaultValue={medician && medician.brand_name}
              />
              <label>ترکیب:</label>
              <input
                type="text"
                {...register("generic_name")}
                defaultValue={medician && medician.generic_name}
              />
              <label>موثریت:</label>
              <input
                type="text"
                {...register("ml")}
                defaultValue={medician && medician.ml}
              />
              <label>وزن:</label>
              <input
                type="text"
                {...register("weight")}
                defaultValue={medician && medician.weight}
              />
              <label>گروپ_دوایی:</label>
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
                      pharm_group: data.id,
                    });
                  }}
                  placeholder={pharmGroupName}
                />
                <PharmGroup button={2} Update={UpdateFunction} />
              </div>
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
                      kind: data.id,
                    });
                  }}
                  placeholder={kindName}
                />
                <Kind button={2} Update={UpdateFunction} />
              </div>
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
                      country: data.id,
                    });
                  }}
                  placeholder={countryName}
                />
                <Country button={2} Update={UpdateFunction} />
              </div>
              <label>شرکت:</label>
              <input
                type="text"
                {...register("company")}
                defaultValue={medician && medician.company}
              />
              <label>قیمت:</label>
              <input
                type="text"
                {...register("price")}
                defaultValue={medician && medician.price}
              />
              <label>مکان:</label>
              <input
                type="text"
                {...register("location")}
                defaultValue={medician && medician.location}
              />
              <label>حداقل:</label>
              <input
                type="text"
                {...register("minmum_existence")}
                defaultValue={medician && medician.minmum_existence}
              />
              <label>حداکثر:</label>
              <input
                type="text"
                {...register("maximum_existence")}
                defaultValue={medician && medician.maximum_existence}
              />
              <label>ت.پاکت:</label>
              <input
                type="text"
                {...register("no_pocket")}
                defaultValue={medician && medician.no_pocket}
              />
              <label>ت.قطی:</label>
              <input
                type="text"
                {...register("no_box")}
                defaultValue={medician && medician.no_box}
              />

              <div className="approving-box">
                <label>فعال:</label>
                <input
                  type="checkbox"
                  className="must-advised-input"
                  {...register("active")}
                  defaultChecked={medician && medician.active}
                />
                <label>توصیه_حتمی:</label>
                <input
                  type="checkbox"
                  className="must-advised-input"
                  {...register("must_advised")}
                  defaultChecked={medician && medician.must_advised}
                />
                <label>توصیه_مریض:</label>
                <input
                  type="checkbox"
                  className="must-advised-input"
                  {...register("patient_approved")}
                  defaultChecked={medician && medician.patient_approved}
                />
                <label>توصیه_داکتر:</label>
                <input
                  type="checkbox"
                  className="must-advised-input"
                  {...register("doctor_approved")}
                  defaultChecked={medician && medician.doctor_approved}
                />
              </div>
              <label>اخطاریه:</label>
              <textarea
                {...register("cautions")}
                defaultValue={medician && medician.cautions}
              />
              <label>استفاده:</label>
              <textarea
                {...register("usages")}
                defaultValue={medician && medician.usages}
              />
              <div>
                <label>عکس:</label>
                <br />
                <br />
                <label>دیپارتمنت:</label>
              </div>
              <div>
                <input
                  type="file"
                  className="medician-image-field"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <br />
                <br />
                <select
                  className="medicine-department-select"
                  {...register("department")}
                >
                  <option></option>
                  {department.map((depart) => (
                    <option
                      selected={
                        medician &&
                        medician.department &&
                        medician.department == depart.id
                          ? "selected"
                          : ""
                      }
                      value={depart.id}
                    >
                      {depart.name}
                    </option>
                  ))}
                </select>
              </div>
              <label>توضیحات:</label>
              <textarea
                {...register("description")}
                defaultValue={medician && medician.description}
              />
              <label>سهمیه:</label>
              <textarea
                {...register("dividing_rules")}
                defaultValue={medician && medician.dividing_rules}
              />
              <div className="bar_batch_box">
                <label>بارکد:</label>
              </div>
              <div className="bar_batch_box">
                <input
                  type="text"
                  {...register("barcode")}
                  defaultValue={medician && medician.barcode}
                />
              </div>
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
