import React, { useRef } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
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
  handleFormData,
  successFn,
} from "../../../services/API";
import { useAuthUser } from "react-auth-kit";
import { toast } from "react-toastify";
import ControlledSelect from "../../../PageComponents/ControlledSelect";
import { usePrescription } from "../../../States/States";
import SellingLists from "../../../PageComponents/Lists/SellLists/SellingLists";

function PrescriptionForm({ prescriptionThrough, update }) {
  const user = useAuthUser();
  const { data: patient } = useQuery(["patient/"]);
  const { data: doctor } = useQuery(["doctor/"]);
  const { data: department } = useQuery(["department/"]);
  const [searchNumber, setSearchNumber] = React.useState("");
  const { prescription, setPrescription } = usePrescription();

  const { register, handleSubmit, reset, setValue, control } = useForm();

  React.useEffect(() => {
    reset({
      discount_money: prescription.discount_money || 0,
      discount_percent: prescription.discount_percent || 0,
      zakat: prescription.zakat || 0,
      khairat: prescription.khairat || 0,
      department: prescription.department || 0,
      prescription_number: prescription.prescription_number || "",
      image: prescription.image ? prescription.image : "",
      name: "",
      doctor: prescription.doctor ? prescription.doctor : "",
    });
  }, [prescription]);

  React.useEffect(() => {
    let date = new Date();
    let year = date.getFullYear().toString().slice(2, 4);
    let month =
      date.getMonth() + 1 <= 9
        ? "0" + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString();
    let day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();

    const handleKeyDowns = (e) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case "B":
          case "b":
          case "ذ":
            e.preventDefault();
            document.getElementById("search-number").focus();
            setSearchNumber(`${year}-${month}-${day}-`);
            break;
          case "d":
          case "D":
          case "ی":
            e.preventDefault();
            handleSubmit((data) =>
              handleFormData(data, newPrescription, user)
            )();
            break;
          case "s":
          case "S":
          case "س":
            e.preventDefault();
            handleSubmit((data) =>
              handleFormData(data, updatePrescription, user)
            )();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDowns);
    return () => {
      document.removeEventListener("keydown", handleKeyDowns);
    };
  }, []);

  const { mutateAsync: newPrescription } = useMutation({
    mutationFn: (data) => postDataFn(data, "prescription/"),
    onSuccess: (res) => {
      successFn("", () => {
        setPrescription(res.data);
      });
    },
  });

  const { mutateAsync: updatePrescription } = useMutation({
    mutationFn: (data) => {
      putDataFn(data, `prescription/${prescription.id}/`);
    },
    onSuccess: (data) =>
      successFn("", () => {
        update();
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

  const { refetch: deletePrescription } = useQuery({
    queryKey: [`prescription-through/delete/?prescription=${prescription.id}`],
    enabled: false,
    onSuccess: () => successFn("", () => {}),
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

  const ListRef = useRef(null);

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
      <select {...register("department")} autoFocus>
        <option value={prescription.department} selected>
          {prescription.department_name}
        </option>
        {department?.map((depart) => (
          <option value={depart.id}>{depart.name}</option>
        ))}
      </select>
      <label>نام مریض:</label>
      <ControlledSelect
        control={control}
        name="name"
        options={patient}
        placeholder=""
        getOptionLabel={(option) => option.code_name}
        getOptionValue={(option) => option.code_name}
        uniqueKey={`patient-unique${prescription.id}`}
        defaultValue={patient?.find((c) =>
          c.id === prescription?.name ? c.code_name : ""
        )}
        NewComponent={
          <SellingLists
            title="لست ها"
            activeKey="patient"
            ref={ListRef}
            button="plus"
          />
        }
      />
      <label>نام داکتر:</label>
      <ControlledSelect
        control={control}
        name="doctor"
        options={doctor}
        placeholder=""
        getOptionLabel={(option) => option.code_name}
        getOptionValue={(option) => option.code_name}
        uniqueKey={`doctor-unique${prescription.id}`}
        defaultValue={doctor?.find((c) =>
          c.id === prescription?.doctor ? c.code_name : ""
        )}
        NewComponent={
          <SellingLists
            title="لست ها"
            activeKey="doctor"
            ref={ListRef}
            button="plus"
          />
        }
      />
      <label>شماره:</label>
      <input
        required
        type="text"
        {...register("prescription_number")}
        value={prescription.prescription_number}
        disabled
      />
      <label>جستجو:</label>
      <div className="flex">
        <form className="search-form">
          <input
            type="text"
            {...register("number")}
            onChange={(e) => {
              setSearchNumber(e.target.value);
            }}
            value={searchNumber}
            id="search-number"
            className="search-input"
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
          prescription.image && prescription.image
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
