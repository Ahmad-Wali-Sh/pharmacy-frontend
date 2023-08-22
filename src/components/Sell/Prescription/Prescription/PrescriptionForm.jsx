import React from "react";
import Patient from "../Patient";
import Doctor from "../Doctor";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { AutoCompleteStyle } from "../../../../styles";

function PrescriptionForm({
  prescription,
  departmentSelected,
  handlePrescriptionSearch,
  handlePrescriptionDelete,
  handleDuplicationPrescription,
  handleCreactNewPrescription,
  handlePrescriptionSubmit,
}) {
  const { data: patient } = useQuery(["patient/"]);
  const { data: doctor } = useQuery(["doctor/"]);
  const { data: department } = useQuery(["department/"]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <form className="prescription-prescription" id="Myform">
      <label>نوع نسخه:</label>
      <select
        {...register("department")}
        defaultValue={prescription.id}
        onChange={(res) => {
          DepartmentHandler(res.target.value);
        }}
      >
        <option value={prescription.department} selected hidden>
          {department?.map(
            (depart) => depart.id == prescription.department && depart.name
          )}
        </option>
        {department?.map((depart) => (
          <option value={depart.id}>{depart.name}</option>
        ))}
      </select>
      <label>نام مریض:</label>
      <div>
        <ReactSearchAutocomplete
          items={patient}
          fuseOptions={{ keys: ["code_name", "id", "name"] }}
          resultStringKeyName={"code_name"}
          onSelect={(item) =>
            setAutoCompleteData({
              ...autoCompleteData,
              patient: item.id,
            })
          }
          styling={AutoCompleteStyle}
          showClear={false}
          inputDebounce="10"
          showIcon={false}
          className="autoComplete"
        />
        <Patient button="plus" />
      </div>
      <label>نام داکتر:</label>
      <div>
        <ReactSearchAutocomplete
          items={doctor}
          fuseOptions={{ keys: ["code_name", "id", "name"] }}
          resultStringKeyName={"code_name"}
          styling={AutoCompleteStyle}
          showItemsOnFocus={true}
          onSelect={(item) =>
            setAutoCompleteData({
              ...autoCompleteData,
              doctor: item.id,
            })
          }
          showClear={false}
          inputDebounce="10"
          showIcon={false}
        />
        <Doctor button="plus" />
      </div>
      <label>شماره:</label>
      <input
        required
        type="text"
        {...register("prescription_number")}
        value={prescription.prescription_number}
      />
      <label>جستوجو:</label>
      <div className="flex">
        <form className="search-form">
          <input type="text" {...register("number")} />
          <button
            className="search-button-box"
            onClick={handleSubmit(handlePrescriptionSearch)}
            type="submit"
          >
            <i class="fa-brands fa-searchengin"></i>
          </button>
        </form>
      </div>
      <label>عکس:</label>
      <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
      <label>تخفیف:</label>
      <input
        type="text"
        {...register("discount_money")}
        defaultValue={prescription.discount_money}
        onChange={(e) => {}}
      />
      <label>تخفیف %:</label>
      <input
        type="text"
        {...register("discount_percent")}
        defaultValue={prescription.discount_percent}
      />
      <div></div>
      <a
        href={
          prescription.image && new URL(prescription.image).pathname.slice(16)
        }
        target="_blank"
        style={{ textDecoration: "none", color: "grey" }}
      >
        {prescription.image ? "Show_Photo" : ""}
      </a>
      <label>ذکات:</label>
      <input
        type="text"
        {...register("zakat")}
        defaultValue={prescription.zakat}
      />
      <label>خیرات:</label>
      <input
        type="text"
        {...register("khairat")}
        defaultValue={prescription.khairat}
      />
      <div></div>
      <div className="entrance-buttons">
        <input
          type="reset"
          value="ریسیت"
          onClick={handlePrescriptionDelete}
        ></input>
        <input
          type="button"
          value="کپی نسخه"
          className="prescription-create-button"
          onClick={handleSubmit(handleDuplicationPrescription)}
        ></input>
        <input
          type="button"
          value="جدید"
          className="prescription-create-button"
          onClick={handleSubmit(handleCreactNewPrescription)}
        ></input>
        <input
          type="submit"
          value={"ثبت"}
          onClick={handleSubmit(handlePrescriptionSubmit)}
        ></input>
      </div>
    </form>
  );
}

export default PrescriptionForm;
