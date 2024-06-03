import React, { useEffect, useRef, useState } from "react";
import { MainButton, PlusButton } from "../../PageComponents/Buttons/Buttons";
import BigModal from "../../PageComponents/Modals/BigModal";

const RevenueLists = ({
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
              onClick={() => setActive("revenue-total")}
              className={`list-item ${
                active == "revenue-total" && "list-item-active"
              }`}
            >
                مجموع صندوق ها
            </div>
            <div
              onClick={() => setActive("revenue-throughs")}
              className={`list-item ${
                active == "revenue-throughs" && "list-item-active"
              }`}
            >
                پرداختی ها
            </div>
          </div>
          <div className="list-box">
            <div className="list-box-header">اطلاعات</div>
            <div className="list-box-container">
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
};

export default RevenueLists;
