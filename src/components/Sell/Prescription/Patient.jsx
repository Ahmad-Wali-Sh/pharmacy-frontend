import React from "react";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation } from "react-query";
import { postDataFn, successFn, handleFormData } from "../../services/API";
import BigModal from "../../PageComponents/Modals/BigModal";
import { useRef } from "react";
import { MainButton, PlusButton } from "../../PageComponents/Buttons/Buttons";

function Patient({ button, title }) {
  const user = useAuthUser();

  const PatientRef = useRef(null);

  const { register, handleSubmit } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: (data) => postDataFn(data, "patient/"),
    onSuccess: () => successFn("patient/", () => PatientRef.current.Closer()),
  });

  return (
    <>
      {button == "main" && (
        <MainButton
          Func={() => PatientRef.current.Opener()}
          title={title}
          icon="fa-solid fa-bed"
        />
      )}
      {button == "plus" && (
        <PlusButton Func={() => PatientRef.current.Opener()} />
      )}
      <BigModal title="ثبت مریض" ref={PatientRef}>
        <form className="company">
          <div className="company">
            <div className="company-form">
              <label>نام:</label>
              <input type="text" {...register("name")} />
              <label>تخلص:</label>
              <input type="text" {...register("last_name")} />
              <label>مریضی:</label>
              <input type="text" {...register("sickness")} />
              <label>کد:</label>
              <input type="text" {...register("code")} />
              <label>تماس:</label>
              <input type="text" {...register("contact_number")} />
              <label>تاریخ تولد:</label>
              <input type="date" {...register("birth_date")} />
              <label>نمبر تذکره:</label>
              <input type="text" {...register("tazkira_number")} />
              <label>آدرس:</label>
              <input type="text" {...register("address")} />
              <label>جنسیت:</label>
              <select {...register("gender")}>
                <option value="Male">مرد</option>
                <option value="Female">زن</option>
              </select>
              <div></div>
              <div></div>
              <label>توضیحات:</label>
              <input
                type="text"
                {...register("discription")}
                className="doctor-discription"
              />
            </div>
            <div className="company-submit">
              <input
                onClick={handleSubmit((data) =>
                  handleFormData(data, mutateAsync, user)
                )}
                type="submit"
                value="ثبت داکتر"
              />
              <input type="reset" value="ریسیت" />
            </div>
          </div>
        </form>
      </BigModal>
    </>
  );
}

export default Patient;
