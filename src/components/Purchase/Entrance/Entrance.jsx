import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import BigModal from "../../PageComponents/Modals/BigModal";
import AlertModal from "../../PageComponents/Modals/AlertModal";
import EntranceForm from "./EntranceForm";

export default function Entrance({ button, icon, title }) {
  const EntranceModalRef = useRef(null);
  const SubmitedAlertRef = useRef(null);
  const PreviousPriceAlertRef = useRef(null);
  const TotalPriceAlertRef = useRef(null);
  const PriceAppliedAlertRef = useRef(null);

  return (
    <>
      {!button && (
        <div
          className="purchase-card"
          onClick={() => EntranceModalRef.current.Opener()}
        >
          <div>
            <h3>{title}</h3>
          </div>
          <div>
            <i className={icon}></i>
          </div>
        </div>
      )}
      {button && button == 1 && (
        <div onClick={() => EntranceModalRef.current.Opener()}>
          <i class="fa-solid fa-circle-info"></i>
        </div>
      )}
      <BigModal title="ثبت فاکتور" ref={EntranceModalRef}>
        <AlertModal
          errorTitle="این دوا قبلا ثبت شده است"
          errorText="آیا میخواهید به تعداد آن اضافه نمایید؟"
          // OkFunc={handleSubmit(MedicineIncluder)}
          NoFunc={() => SubmitedAlertRef.current.Closer()}
          ref={SubmitedAlertRef}
        />
        <AlertModal
          errorTitle="خطای قیمت!"
          errorText="قیمت دوای ثبت شده با قیمت قبلی مطابقت ندارد"
          OkFunc={() => PreviousPriceAlertRef.current.Closer()}
          ref={PreviousPriceAlertRef}
          CheckerComponent={() => <Entrance button={1} />}
        />
        <AlertModal
          errorTitle="خطا در مجموع فاکتور!"
          errorText="آیا با بستن صفحه موافقید؟"
          OkFunc={() => {
            TotalPriceAlertRef.current.Closer();
            EntranceModalRef.current.Closer();
          }}
          NoFunc={() => TotalPriceAlertRef.current.Closer()}
          ref={TotalPriceAlertRef}
        />
        <AlertModal
          errorTitle="خطای اعمال قیمت!"
          errorText="آیا با بستن صفحه موافقید؟"
          OkFunc={() => {
            PriceAppliedAlertRef.current.Closer();
            EntranceModalRef.current.Closer();
          }}
          NoFunc={() => PriceAppliedAlertRef.current.Closer()}
          ref={PriceAppliedAlertRef}
        />
        <EntranceForm />
      </BigModal>
    </>
  );
}
