import React, { useEffect, useRef, useState } from "react";
import { MainButton, PlusButton } from "../../PageComponents/Buttons/Buttons";
import BigModal from "../../PageComponents/Modals/BigModal";

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
              onClick={() => setActive("revenue-total")}
              className={`list-item ${
                active == "entrances" && "list-item-active"
              }`}
            >
                حواله های ورود
            </div>

          </div>
          <div className="list-box">
            <div className="list-box-header">اطلاعات</div>
            <div className="list-box-container">
            {active == "entrances" && <PurchaseListManual />}
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
};

export default EntranceLists;
