import React, { useRef } from "react";
import BigModal from "../../Modals/BigModal";
import { MainButton, PlusButton } from "../../Buttons/Buttons";
import MedicineList from "./MedicineList";

const MedicinesLists = ({ title, activeKey, button, name, icon }) => {
  const ListDashboardRef = useRef(null);

  const [active, setActive] = React.useState(activeKey);
  return (
    <>
      {button == 'plus' && <PlusButton
        Func={() => {
          ListDashboardRef.current.Opener();
          setActive(activeKey);
        }}
      />}
      {button == 'main' && <MainButton 
        Func={() => {
          ListDashboardRef.current.Opener();
          setActive(activeKey);
        }}
        icon={icon}
        title={name}
        />
      }
      <BigModal ref={ListDashboardRef} title={title}>
        <div className="list-container">
          <div className="list-nav">
            <div className="list-nav-header">فهرست</div>
            <div
              onClick={() => setActive("medicines")}
              className={`list-item ${
                active == "medicines" && "list-item-active"
              }`}
            >
              دواها
            </div>
            <div
              onClick={() => setActive("kinds")}
              className={`list-item ${
                active == "kinds" && "list-item-active"
              }`}
            >
              انواع دوا
            </div>
            <div
              onClick={() => setActive("pharm-groups")}
              className={`list-item ${
                active == "pharm-groups" && "list-item-active"
              }`}
            >
                گروپ های دوایی
            </div>
            <div
              onClick={() => setActive("countries")}
              className={`list-item ${
                active == "countries" && "list-item-active"
              }`}
            >
                کشور ها
            </div>
          </div>
          <div className="list-box">
            <div className="list-box-header">اطلاعات</div>
            <div className="list-box-container">
              {active == "medicines" && <MedicineList />}
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
};

export default MedicinesLists;
