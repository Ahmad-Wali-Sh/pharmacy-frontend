import React, { useRef } from "react";
import ShortcutsSettings from "./ShortcutsSettings";
import BigModal from "../PageComponents/Modals/BigModal";
import EntranceSettings from "./EntranceSettings";
import PrintingSettings from "./PrintingSettings";

const Settings = ({ title, activeKey, button, name, icon }) => {
  const ListDashboardRef = useRef(null);

  const [active, setActive] = React.useState(activeKey);
  return (
    <>
      <div className="icons" onClick={() => ListDashboardRef.current.Opener()}>
        <i className="fa-solid fa-gear"></i>
      </div>
      <BigModal ref={ListDashboardRef} title={title}>
        <div className="list-container">
          <div className="list-nav">
            <div className="list-nav-header">فهرست</div>
            <div
              onClick={() => setActive("shortcuts")}
              className={`list-item ${
                active == "shortcuts" && "list-item-active"
              }`}
            >
              میانبر ها
            </div>
            <div
              onClick={() => setActive("entrance")}
              className={`list-item ${
                active == "entrance" && "list-item-active"
              }`}
            >
              حواله ورود
            </div>
            <div
              onClick={() => setActive("print")}
              className={`list-item ${active == "print" && "list-item-active"}`}
            >
              چاپ
            </div>
          </div>
          <div className="list-box">
            <div className="list-box-header">اطلاعات</div>
            <div className="list-box-container">
              {active == "shortcuts" && <ShortcutsSettings />}
              {active == "entrance" && <EntranceSettings />}
              {active == "print" && <PrintingSettings />}
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
};

export default Settings;
