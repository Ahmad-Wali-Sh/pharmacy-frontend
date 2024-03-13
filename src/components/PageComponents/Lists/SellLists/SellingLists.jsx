import React, { useEffect, useRef } from "react";
import BigModal from "../../Modals/BigModal";
import { MainButton, PlusButton } from "../../Buttons/Buttons";
import PatientList from "./PatientList";
import DoctorList from "./DoctorList";
import DepartmentsList from "./DepartmentsList";
import PurchaseListManual from "./PurcahseListManual";
import axios from "axios";
import useServerIP from "../../../services/ServerIP";

const SellingLists = ({
  title,
  activeKey,
  button,
  name,
  icon,
  selectedMedicine,
}) => {
  const ListDashboardRef = useRef(null);


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
      {button == "plus_purchase" && (
        <div onClick={() =>  {
          ListDashboardRef.current.Opener();
          setActive(activeKey);
        }}>
          <i className="fa-solid fa-plus"></i>
        </div>
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
              onClick={() => setActive("doctor")}
              className={`list-item ${
                active == "doctor" && "list-item-active"
              }`}
            >
              داکتران
            </div>
            <div
              onClick={() => setActive("patient")}
              className={`list-item ${
                active == "patient" && "list-item-active"
              }`}
            >
              مریضان
            </div>
            <div
              onClick={() => setActive("departments")}
              className={`list-item ${
                active == "departments" && "list-item-active"
              }`}
            >
              انواع نسخه
            </div>
            <div
              onClick={() => setActive("purhase-list")}
              className={`list-item ${
                active == "purhase-list" && "list-item-active"
              }`}
            >
              لست خرید
            </div>
          </div>
          <div className="list-box">
            <div className="list-box-header">اطلاعات</div>
            <div className="list-box-container">
              {active == "patient" && <PatientList />}
              {active == "doctor" && <DoctorList />}
              {active == "departments" && <DepartmentsList />}
              {active == "purhase-list" && (
                <PurchaseListManual selectedMedicine={selectedMedicine} />
              )}
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
};

export default SellingLists;
