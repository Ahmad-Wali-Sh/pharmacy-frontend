import React from "react";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation } from "react-query";
import { postDataFn, successFn, handleFormData } from "../../services/API";
import BigModal from "../../PageComponents/Modals/BigModal";
import { useRef } from "react";
import { MainButton, PlusButton } from "../../PageComponents/Buttons/Buttons";

function Doctor({ button, title }) {
  const user = useAuthUser();
  const DoctorModalRef = useRef(null);

  const { register, handleSubmit } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: (data) => postDataFn(data, "doctor/"),
    onSuccess: () =>
      successFn("doctor/", () => DoctorModalRef.current.Closer()),
  });
  return (
    <>
      {button == "main" && (
        <MainButton
          Func={() => DoctorModalRef.current.Opener()}
          title={title}
          icon="fa-solid fa-user-doctor"
        />
      )}
      {button == "plus" && (
        <PlusButton Func={() => DoctorModalRef.current.Opener()} />
      )}
      <BigModal title="ثبت داکتر" ref={DoctorModalRef}>
        <form className="company">
          <div className="company">
            <div className="company-form">
              <label>نام:</label>
              <input type="text" {...register("name")} />
              <label>تخلص:</label>
              <input type="text" {...register("last_name")} />
              <label>متخصص:</label>
              <input type="text" {...register("expertise")} />
              <label>کد:</label>
              <input type="text" {...register("code")} />
              <label>تماس:</label>
              <input type="text" {...register("contact_number")} />
              <label>ایمیل:</label>
              <input type="email" {...register("email")} />
              <label>کار:</label>
              <input type="text" {...register("workplace")} />
              <label>ساعت کاری:</label>
              <input type="text" {...register("work_time")} />
              <label>آدرس خانه:</label>
              <input type="text" {...register("home_address")} />
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
                value={title}
              />
              <input type="reset" value="ریسیت" />
            </div>
          </div>
        </form>
      </BigModal>
    </>
  );
}

export default Doctor;
