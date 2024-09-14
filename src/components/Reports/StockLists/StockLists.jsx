import React, { useEffect, useRef, useState } from "react";
import { MainButton, PlusButton } from "../../PageComponents/Buttons/Buttons";
import BigModal from "../../PageComponents/Modals/BigModal";
import StockReport from "./StockReport";
import ExpiringMedicineList from "./ExpiringMedicineList";

const StockLists = ({
  title,
  activeKey,
  button,
  name,
  icon,
  trigger
}) => {
  const ListDashboardRef = useRef(null);

  useEffect(() => {
    trigger && ListDashboardRef.current.Opener()
  }, [trigger])

  const [active, setActive] = React.useState(activeKey);
  return (
    <>
      {button == "plus" && (
        <PlusButton
          Func={() => {
            ListDashboardRef.current.Opener();
            setActive(activeKey);
          }}
        />
      )}
      {button == "main" && (
        <MainButton
          Func={() => {
            ListDashboardRef.current.Opener();
            setActive(activeKey);
          }}
          icon={icon}
          title={name}
        />
      )}
      <BigModal ref={ListDashboardRef} title={title}>
        <div className="list-container">
          <div className="list-nav">
            <div className="list-nav-header">فهرست</div>
            <div
              onClick={() => setActive("stock")}
              className={`list-item ${
                active == "stock" && "list-item-active"
              }`}
            >
                گزارش انبار
            </div>
            <div
              onClick={() => setActive("expiring-medicine")}
              className={`list-item ${
                active == "expiring-medicine" && "list-item-active"
              }`}
            >
                دارو های تاریخ کم
            </div>
          </div>
          <div className="list-box">
            <div className="list-box-header">اطلاعات</div>
            <div className="list-box-container">
            {active == "stock" && <StockReport />}
            {active == "expiring-medicine" && <ExpiringMedicineList />}
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
};

export default StockLists;
