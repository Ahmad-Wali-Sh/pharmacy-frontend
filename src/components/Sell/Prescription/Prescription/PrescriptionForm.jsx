import React from "react";
import Patient from "../Patient";
import Doctor from "../Doctor";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { AutoCompleteStyle } from "../../../../styles";
import {
  ButtonGroup,
  FormButton,
  SearchButton,
  SubmitButton,
} from "../../../PageComponents/Buttons/Buttons";

function PrescriptionForm({
  prescription,
  handlePrescriptionSearch,
  handlePrescriptionDelete,
  handleDuplicationPrescription,
  handleCreactNewPrescription,
  handlePrescriptionSubmit,
}) {
  const { data: patient } = useQuery(["patient/"]);
  const { data: doctor } = useQuery(["doctor/"]);
  const { data: department } = useQuery(["department/"]);

  const { register, handleSubmit, reset, setValue } = useForm();

  React.useEffect(() => {
    reset({
      discount_money: prescription.discount_money
        ? prescription.discount_money
        : 0,
      discount_percent: prescription.discount_percent
        ? prescription.discount_percent
        : 0,
      zakat: prescription.zakat ? prescription.zakat : 0,
      khairat: prescription.khairat ? prescription.khairat : 0,
      department: prescription.department ? prescription.department : 0,
      prescription_number: prescription.prescription_number
        ? prescription.prescription_number
        : "",
      image: prescription.image ? prescription.image : "",
    });
  }, [prescription]);

  return (
    <form
      className="prescription-prescription"
      id="Myform"
      onSubmit={handleSubmit(handlePrescriptionSubmit)}
    >
      <label>نوع نسخه:</label>
      <select {...register("department")}>
        <option value={prescription.department} selected disabled>
          {prescription.department_name}
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
        disabled
      />
      <label>جستوجو:</label>
      <div className="flex">
        <form className="search-form">
          <input type="text" {...register("number")} />
          <SearchButton Func={handleSubmit(handlePrescriptionSearch)} />
        </form>
      </div>
      <label>عکس:</label>
      <input
        type="file"
        onChange={(e) => {
          setValue("image", e.target.files[0]);
        }}
      ></input>
      <label>تخفیف:</label>
      <input type="text" {...register("discount_money")} />
      <label>تخفیف %:</label>
      <input type="text" {...register("discount_percent")} />
      <div></div>
      <a
        href={
          prescription.image && new URL(prescription.image).pathname.slice(16)
        }
        target="_blank"
        style={{ textDecoration: "none", color: "grey" }}
      >
        {prescription.image ? "Image <<" : ""}
      </a>
      <label>ذکات:</label>
      <input type="text" {...register("zakat")} />
      <label>خیرات:</label>
      <input type="text" {...register("khairat")} />
      <div></div>
      <ButtonGroup>
        <FormButton
          Func={handleSubmit(handlePrescriptionDelete)}
          name="حذف"
          className="alert-button"
        />
        <FormButton Func={() => handleDuplicationPrescription()} name="کپی" />
        <FormButton
          Func={handleSubmit(handleCreactNewPrescription)}
          name="جدید"
        />
        <SubmitButton
          Func={handleSubmit(handlePrescriptionSubmit)}
          name="ذخیره"
        />
      </ButtonGroup>
    </form>
  );
}

export default PrescriptionForm;
