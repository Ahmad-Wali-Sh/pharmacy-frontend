import React, { useEffect, useRef, useState } from "react";
import { MainButton, PlusButton } from "../../PageComponents/Buttons/Buttons";
import BigModal from "../../PageComponents/Modals/BigModal";
import Entrances from "./Entrances";
import Prescriptions from "./Prescriptions";

const EntranceLists = ({
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
              onClick={() => setActive("entrances")}
              className={`list-item ${
                active == "entrances" && "list-item-active"
              }`}
            >
                حواله های ورود
            </div>
            <div
              onClick={() => setActive("prescriptions")}
              className={`list-item ${
                active == "prescriptions" && "list-item-active"
              }`}
            >
                حواله های خروجی
            </div>

          </div>
          <div className="list-box">
            <div className="list-box-header">اطلاعات</div>
            <div className="list-box-container">
            {active == "entrances" && <Entrances />}
            {active == "prescriptions" && <Prescriptions />}
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
};

export default EntranceLists;
