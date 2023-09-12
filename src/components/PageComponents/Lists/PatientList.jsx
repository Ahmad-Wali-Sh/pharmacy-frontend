import React from "react";
import { DepartButton } from "../Buttons/Buttons";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import { postDataFn, successFn, handleFormData } from "../../services/API";

export default function PatientList() {
  const [active, setActive] = React.useState("list");

  const user = useAuthUser();

  const { register, handleSubmit } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: (data) => postDataFn(data, "patient/"),
    onSuccess: () => successFn("patient/", () => null),
  });

  const { data: patients } = useQuery(["patient/"]);


  if (active == "list") {
    return (
      <>
        <div className="patient-list-header">
          <h4>No</h4>
          <h4>نام</h4>
          <h4>تخلص</h4>
          <h4>کد</h4>
          <h4>جنسیت</h4>
          <h4>تماس</h4>
          <h4>بیشتر</h4>
        </div>
        <div className="patient-list-box">
          {patients?.map((patient, key) => (
              <div className="patient-list-item">
              <h4>{key + 1}</h4>
              <h4>{patient.name}</h4>
              <h4>{patient.last_name}</h4>
              <h4>{patient.id}</h4>
              <h4>{patient.gender}</h4>
              <h4>{patient.phone}</h4>
              <h4>بیشتر</h4>
            </div>
          ))}
        </div>
        <ListFooter setActive={setActive} />
      </>
    );
  }

  if (active == "new") {
    return (
      <>
        <NewPatientForm register={register}></NewPatientForm>
        <ListFooter
          setActive={setActive}
          user={user}
          handleSubmit={handleSubmit}
          mutateAsync={mutateAsync}
        />
      </>
    );
  }
}

function NewPatientForm(props) {
  return (
    <form>
      <div className="company-form">
        <label>نام:</label>
        <input type="text" {...props.register("name")} />
        <label>تخلص:</label>
        <input type="text" {...props.register("last_name")} />
        <label>مریضی:</label>
        <input type="text" {...props.register("sickness")} />
        <label>کد:</label>
        <input type="text" {...props.register("code")} />
        <label>تماس:</label>
        <input type="text" {...props.register("contact_number")} />
        <label>تاریخ تولد:</label>
        <input type="date" {...props.register("birth_date")} />
        <label>نمبر تذکره:</label>
        <input type="text" {...props.register("tazkira_number")} />
        <label>آدرس:</label>
        <input type="text" {...props.register("address")} />
        <label>جنسیت:</label>
        <select {...props.register("gender")}>
          <option value="Male">مرد</option>
          <option value="Female">زن</option>
        </select>
        <div></div>
        <div></div>
        <label>توضیحات:</label>
        <input
          type="text"
          {...props.register("discription")}
          className="doctor-discription"
        />
      </div>
    </form>
  );
}

function ListFooter(props) {
  return (
    <div className="list-footer">
      <div>
        <DepartButton
          name="تایید"
          Func={() => {
            props.handleSubmit((data) =>
              handleFormData(data, props.mutateAsync, props.user)
            )();
          }}
        />
      </div>
      <div className="flex">
        <DepartButton
          name="جدید"
          Func={() => {
            props.setActive("new");
          }}
        />
        <DepartButton
          name="لست"
          Func={() => {
            props.setActive("list");
          }}
        />
      </div>
    </div>
  );
}
