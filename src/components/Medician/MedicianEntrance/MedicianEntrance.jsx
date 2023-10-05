import React, { useRef } from "react";
import LoadingDNA from "../../PageComponents/LoadingDNA";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Kind from "../Kind";
import PharmGroup from "../PharmGroup";
import Country from "../Country";
import { useAuthUser } from "react-auth-kit";
import WebCamModal from "../../PageComponents/WebCamModal";
import BigModal from "../../PageComponents/Modals/BigModal";
import ControlledSelect from "../../PageComponents/ControlledSelect";
import { useQuery } from "react-query";

function MedicianEntrance({
  title,
  icon,
  button,
  medician,
  UpdateMedicine,
  UpdateChangedMedicine,
}) {
  const MedicineEntranceRef = useRef(null);

  const MEDICIAN_URL = import.meta.env.VITE_MEDICIAN;
  const user = useAuthUser();

  const { register, handleSubmit, reset, control,  } = useForm();
  const [file, setFile] = React.useState("");


  const { data: pharmGroup } = useQuery({
    queryKey: ['pharm-groub/']
  })
  const { data: kind } = useQuery({
    queryKey: ['kind/']
  })
  const { data: country } = useQuery({
    queryKey: ['country/']
  })
  const { data: department } = useQuery({
    queryKey: ['department/']
  })
  const { data: bigCompany } = useQuery({
    queryKey: ['big-company/']
  })



  function registerModalOpener() {
    UpdateFunction();
    reset({
      kind: medician?.kind ? medician.kind : "",
      country: medician?.country ? medician.country : "",
      pharm_group: medician?.pharm_group ? medician.pharm_group : "",
      big_company: medician?.big_company ? medician.big_company : ""
    })
    MedicineEntranceRef.current.Opener();
  }
  function registerModalCloser() {
    MedicineEntranceRef.current.Closer();
  }

  const SubmitMedician = (data) => {
    const MedicianForm = new FormData();
    MedicianForm.append("brand_name", data.brand_name);
    MedicianForm.append("no_pocket", data.no_pocket);
    MedicianForm.append("no_box", data.no_box);
    MedicianForm.append("ml", data.ml);
    MedicianForm.append("weight", data.weight);
    MedicianForm.append("location", data.location);
    MedicianForm.append("big_company", data.big_company);
    MedicianForm.append("minmum_existence", data.minmum_existence);
    MedicianForm.append("maximum_existence", data.maximum_existence);
    MedicianForm.append("must_advised", data.must_advised);
    MedicianForm.append("dividing_rules", data.dividing_rules);
    MedicianForm.append("price", data.price);
    MedicianForm.append(
      "generic_name",
      data.generic_name ? data.generic_name : ""
    );
    MedicianForm.append("cautions", data.cautions);
    MedicianForm.append("usages", data.usages);
    MedicianForm.append("description", data.description);
    MedicianForm.append("min_expire_date", data.min_expire_date);
    MedicianForm.append("barcode", data.barcode);
    {
      file && MedicianForm.append("image", file);
    }
    MedicianForm.append("pharm_group", data.pharm_group);
    MedicianForm.append("kind", data.kind);
    MedicianForm.append("country", data.country);
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
            UpdateMedicine && UpdateMedicine(res.data);
            UpdateChangedMedicine && UpdateChangedMedicine(res.data);
            registerModalCloser();
          })
          .catch((err) => {
            console.log(err);
            toast.error("Check Your Input And Try Again!");
          });
    }
  };

  React.useEffect(() => {
    const listener = (e) => {
      if (e.code === "F9") {
        registerModalOpener();
      }
    };

    medician && document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const UpdateFunction = () => {
    // axios
    //   .get(COUNTRY_URL)
    //   .then((res) => setCountry(res.data))
    //   .catch((err) => console.log(err));
    // axios
    //   .get(PHARM_GROUB_URL)
    //   .then((res) => setPharmGroup(res.data))
    //   .catch((err) => console.log(err));
    // axios
    //   .get(KIND_URL)
    //   .then((res) => setKind(res.data))
    //   .catch((err) => console.log(err));
  };

  const WebComFileSeter = (file) => {
    setFile(file);
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
        <div
          onClick={() => {
            reset({
              brand_name: medician.brand_name,
            });
            registerModalOpener();
          }}
        >
          <i class="fa-solid fa-circle-info"></i>
        </div>
      )}
      <BigModal ref={MedicineEntranceRef} title="ثبت دوا">
        <form
          className="medician-inter"
          onSubmit={handleSubmit(SubmitMedician)}
        >
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
                <ControlledSelect
                  control={control}
                  name="pharm_group"
                  options={pharmGroup}
                  placeholder=""
                  getOptionLabel={(option) => option.name_english}
                  getOptionValue={(option) => option.id}
                  uniqueKey={`medicine-unigue${medician}`}
                  defaultValue={pharmGroup?.find((c) =>
                    c.id === medician?.pharm_group ? c.name_english : null
                  )}
                  NewComponent={<PharmGroup button={2} Update={UpdateFunction} />}
                />
              </div>
              <label>نوع:</label>
              <div style={{ marginLeft: "0.5rem" }}>
              <ControlledSelect
                  control={control}
                  name="kind"
                  options={kind}
                  placeholder=""
                  getOptionLabel={(option) => option.name_english}
                  getOptionValue={(option) => option.id}
                  uniqueKey={`medicine-unigue${kind}`}
                  defaultValue={kind?.find((c) =>
                    c.id === medician?.kind ? c.name_english : null
                  )}
                  NewComponent={<Kind button={2} Update={UpdateFunction} />}
                />
              </div>
              <label>کشور:</label>
              <div style={{ marginLeft: "0.5rem" }}>
              <ControlledSelect
                  control={control}
                  name="country"
                  options={country}
                  placeholder=""
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  uniqueKey={`medicine-unigue${country}`}
                  defaultValue={country?.find((c) =>
                    c.id === medician?.country ? c.name : null
                  )}
                  NewComponent={<Country button={2} Update={UpdateFunction} />}
                />
              </div>
              <label>کمپنی:</label>
              <div style={{ marginLeft: "0.5rem" }}>
                <ControlledSelect
                  control={control}
                  name="big_company"
                  options={bigCompany}
                  placeholder=""
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  uniqueKey={`medicine-unigue${bigCompany}`}
                  defaultValue={bigCompany?.find((c) =>
                    c.id === medician?.big_company ? c.name : null
                  )}
                  NewComponent={<Country button={2} Update={UpdateFunction} />}
                />
                </div>
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
                <br />
                <br />
                <label>حداقل_انقضا:</label>
              </div>
              <div>
                <div className="webcam-box">
                  <input
                    type="file"
                    className="medician-image-field"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                  <form tabIndex={-1}>
                    <WebCamModal
                      medician={medician}
                      setFile={WebComFileSeter}
                      tabIndex={-1}
                    />
                  </form>
                </div>
                <br />
                <select
                  className="medicine-department-select"
                  {...register("department")}
                >
                  <option></option>
                  {department?.map((depart) => (
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
                <br />
                <br />
                <input
                  type="text"
                  className="min-expire-date-input"
                  {...register("min_expire_date")}
                  defaultValue={medician && medician.min_expire_date}
                />
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
                <br />
                <label>بارکد:</label>
              </div>
              <div className="bar_batch_box">
                <br />
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
      </BigModal>
    </>
  );
}

export default MedicianEntrance;
