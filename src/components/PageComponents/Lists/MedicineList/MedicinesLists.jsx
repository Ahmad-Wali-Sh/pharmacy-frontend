import React, { useEffect, useRef, useState } from "react";
import BigModal from "../../Modals/BigModal";
import { MainButton, PlusButton } from "../../Buttons/Buttons";
import MedicineList from "./MedicineList";
import KindList from "./KindsList";
import PharmGroupLists from "./PharmgroupsLists";
import CountryList from "./CountryList";
import CompanyLists from "./CompanyLists";

const MedicinesLists = ({ title, activeKey, trigger, button, name, icon, medicine, setSelectedMedician,selectAutoCompleteData, medicineActive=false }) => {
  const ListDashboardRef = useRef(null);

  useEffect(() => {
    trigger && ListDashboardRef.current.Opener()
  }, [trigger])
  
  useEffect(() => {
    const listener = (e) => {
      if (e.code === 'F9' && medicine) {
        ListDashboardRef.current.Opener()
      }
    };

    medicine && document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
  

  const [active, setActive] = useState(activeKey);
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
            <div
              onClick={() => setActive("big-companies")}
              className={`list-item ${
                active == "big-companies" && "list-item-active"
              }`}
            >
                کمپنی ها
            </div>
          </div>
          <div className="list-box">
            <div className="list-box-header">اطلاعات</div>
            <div className="list-box-container">
              {active == "medicines" && <MedicineList edit={medicine} setSelectedMedician={setSelectedMedician ? setSelectedMedician : ''} selectAutoCompleteData={selectAutoCompleteData && selectAutoCompleteData} medicineActive={medicineActive}/>}
              {active == 'kinds' && <KindList />}
              {active == 'pharm-groups' && <PharmGroupLists />}
              {active == 'countries' && <CountryList />}
              {active == 'big-companies' && <CompanyLists />}
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
};

export default MedicinesLists;
