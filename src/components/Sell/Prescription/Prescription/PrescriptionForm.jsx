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
import { useMutation } from "react-query";
import {
  putDataFn,
  postDataFn,
  deleteDataFn,
  handleFormData,
  successFn,
} from "../../../services/API";
import { useAuthUser } from "react-auth-kit";
import { toast } from "react-toastify";
import Select from "react-select";
import { SelectInputStyle } from '../../../../styles'

function PrescriptionForm({
  prescription,
  setPrescription,
  prescriptionThrough,
}) {

  const user = useAuthUser();
  const { data: patient } = useQuery(["patient/"]);
  const { data: doctor } = useQuery(["doctor/"]);
  const { data: department } = useQuery(["department/"]);
  const [searchNumber, setSearchNumber] = React.useState("");

  const { register, handleSubmit, reset, setValue } = useForm();


  React.useEffect(() => {
    reset({
      discount_money: prescription.discount_money || 0,
      discount_percent: prescription.discount_percent || 0,
      zakat: prescription.zakat || 0,
      khairat: prescription.khairat || 0,
      department: prescription.department || 0,
      prescription_number: prescription.prescription_number || "",
      image: prescription.image ? prescription.image : "",
      name: prescription.name ? prescription.name : "",
      doctor: prescription.doctor ? prescription.doctor : ""
    });
  }, [prescription]);

  const { mutateAsync: newPrescription } = useMutation({
    mutationFn: (data) => postDataFn(data, "prescription/"),
    onSuccess: (res) => {
      successFn("", () => {
        setPrescription(res.data);
      });
    },
  });

  const { mutate: updatePrescription } = useMutation({
    mutationFn: (data) => {
      putDataFn(data, `prescription/${prescription.id}/`);
    },
    onSuccess: (res) =>
      successFn("", () => {
        setPrescription(res.data);
      }),
  });

  const { mutateAsync: prescriptionThroughPost } = useMutation({
    mutationFn: (data) => postDataFn(data, "prescription-through/"),
    onSuccess: () => {
      successFn("", () => {});
    },
  });

  const { mutateAsync: duplicatePrescription } = useMutation({
    mutationFn: (data) => postDataFn(data, "prescription/"),
    onSuccess: (res) => {
      successFn("", () => {
        setPrescription(res.data);
        prescriptionThrough?.map((item) => {
          const PrescriptionThroughForm = new FormData();
          PrescriptionThroughForm.append("quantity", item.quantity);
          PrescriptionThroughForm.append("each_price", item.each_price);
          PrescriptionThroughForm.append("medician", item.medician);
          PrescriptionThroughForm.append("prescription", res.data.id);
          PrescriptionThroughForm.append("user", user().id);
          prescriptionThroughPost(PrescriptionThroughForm);
        });
      });
    },
  });

  const { mutate: deletePrescription } = useMutation({
    mutationFn: () => {
      deleteDataFn(`prescription/${prescription.id}/`);
    },
    onSuccess: () =>
      successFn("", () => {
        setPrescription([]);
      }),
  });

  const { refetch: prescriptionThroughSearch } = useQuery({
    queryKey: [`prescription-through/?prescription=${prescription.id}`],
    enabled: false,
  });

  const { refetch: prescriptionSearch } = useQuery({
    queryKey: ["prescription/?prescription_number=" + searchNumber],
    enabled: false,
    onSuccess: (data) => {
      console.log(data[0]);
      setPrescription(data[0] ? data[0] : []);
      prescriptionThroughSearch();
    },
  });

  return (
    <form
      className="prescription-prescription"
      onSubmit={handleSubmit((data) =>
        handleFormData(
          data,
          prescription.id ? updatePrescription : newPrescription,
          user
        )
      )}
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
        {/* <ReactSearchAutocomplete
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
        /> */}
        <Select
          options={patient}
          getOptionLabel={(option) => option.code_name}
          getOptionValue={(option) => option.code_name}
          isRtl
          className="react-select-container"
          onChange={(item) => {
            console.log(item)
            setValue('name', item.id)
          }}
          styles={SelectInputStyle}
        />
        <Patient button="plus" />
      </div>
      <label>نام داکتر:</label>
      <div>
        {/* <ReactSearchAutocomplete
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
        /> */}
        <Select
          options={doctor}
          getOptionLabel={(option) => option.code_name}
          getOptionValue={(option) => option.code_name}
          isRtl
          className="react-select-container"
          onChange={(item) => console.log(item)}
          styles={SelectInputStyle}
          
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
          <input
            type="text"
            {...register("number")}
            onChange={(e) => {
              setSearchNumber(e.target.value);
            }}
          />
          <SearchButton Func={() => prescriptionSearch()} />
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
          Func={() => {
            prescription.sold == false
              ? deletePrescription()
              : toast.error("این نسخه به صندوق ثبت شده است");
          }}
          name="حذف"
          className="alert-button"
        />
        <FormButton
          Func={() => {
            handleFormData(
              { ...prescription, image: "", doctor: "", name: "", sold: false },
              duplicatePrescription,
              user
            );
          }}
          name="کپی"
        />
        <FormButton
          Func={handleSubmit((data) =>
            handleFormData(data, newPrescription, user)
          )}
          name="جدید"
        />
        <SubmitButton name={prescription.id ? "آپدیت" : "ذخیره"} />
      </ButtonGroup>
    </form>
  );
}

export default PrescriptionForm;
