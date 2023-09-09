import React from "react";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation } from "react-query";
import { postDataFn, successFn, handleFormData } from "../../services/API";
import SmallModal from "../../PageComponents/Modals/SmallModal";
import { useRef } from "react";
import {MainButton,PlusButton } from "../../PageComponents/Buttons/Buttons";


function Department({ title, button }) {
  const user = useAuthUser();

  const DepartmentModalRef = useRef(null);

  const { register, handleSubmit } = useForm();
  
  const { mutateAsync } = useMutation({
    mutationFn: (data) => postDataFn(data, "department/"),
    onSuccess: () =>
      successFn("department/?ordering=id", () =>
        DepartmentModalRef.current.Closer()
      ),
  });

  return (
    <>
      {button == "main" && (
        <MainButton
          Func={() => DepartmentModalRef.current.Opener()}
          title={title}
          icon="fa-solid fa-bed"
        />
      )}
      {button == "plus" && (
        <PlusButton Func={() => DepartmentModalRef.current.Opener()} />
      )}
      <SmallModal title="ثبت نوع نسخه" ref={DepartmentModalRef}>
        <form className="store">
          <div className="store">
            <div className="store-form">
              <label>نام:</label>
              <input type="text" defaultValue="" {...register("name")} />
              <label>حداکثرقیمت:</label>
              <input
                type="text"
                defaultValue=""
                {...register("over_price_money")}
              />
              <label>حداکثرقیمت%:</label>
              <input
                type="text"
                defaultValue=""
                {...register("over_price_percent")}
              />
              <label>تخفیف:</label>
              <input
                type="text"
                defaultValue=""
                {...register("discount_money")}
              />
              <label>تخفیف%:</label>
              <input
                type="text"
                defaultValue=""
                {...register("discount_percent")}
              />
              <label>شروع‌روند:</label>
              <input
                type="text"
                defaultValue=""
                {...register("celling_start")}
              />
            </div>
            <div className="store-submit">
              <input
                onClick={handleSubmit((data) =>
                  handleFormData(data, mutateAsync, user)
                )}
                type="submit"
                value="ثبت نوع"
              />
              <input type="reset" value="ریسیت" />
            </div>
          </div>
        </form>
      </SmallModal>
    </>
  );
}

export default Department;
