import React, { useRef } from "react";
import BigModal from "../../Modals/BigModal";
import { PlusButton } from "../../Buttons/Buttons";
import PatientList from "./PatientList";

const ListDashboard = ({ title, activeKey }) => {
  const ListDashboardRef = useRef(null);

  const [active, setActive] = React.useState(activeKey);
  return (
    <>
      <PlusButton
        Func={() => {
          ListDashboardRef.current.Opener();
          setActive(activeKey);
        }}
      />
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
              onClick={() => setActive("prescriptions")}
              className={`list-item ${
                active == "prescriptions" && "list-item-active"
              }`}
            >
              نسخه ها
            </div>
          </div>
          <div className="list-box">
            <div className="list-box-header">اطلاعات</div>
            <div className="list-box-container">
              {active == "patient" && <PatientList />}
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
};

export default ListDashboard;
