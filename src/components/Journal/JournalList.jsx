import React, { useEffect, useRef, useState } from "react";
import BigModal from "../PageComponents/Modals/BigModal";
import { MainButton, PlusButton } from "../PageComponents/Buttons/Buttons";
import JournalCategory from "./JournalCategory";
import JournalEntry from "./JournalEntry";
import SalaryEntry from "./SalaryEntry";

const JournalList = ({ title, activeKey, trigger, button, icon }) => {
  const ListDashboardRef = useRef(null);
  useEffect(() => {
    trigger && ListDashboardRef.current.Opener()
  }, [trigger])
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
        title={title}
        />
      }
      <BigModal ref={ListDashboardRef} title={title}>
        <div className="list-container">
          <div className="list-nav">
            <div className="list-nav-header">فهرست</div>

            <div
              onClick={() => setActive("journal")}
              className={`list-item ${
                active == "journal" && "list-item-active"
              }`}
            >
                روزنامچه
            </div>
            <div
              onClick={() => setActive("categories")}
              className={`list-item ${
                active == "categories" && "list-item-active"
              }`}
            >
                بخش ها
            </div>
            <div
              onClick={() => setActive("salary")}
              className={`list-item ${
                active == "salary" && "list-item-active"
              }`}
            >
                معاشات کارمندان
            </div>
          </div>
          <div className="list-box">
            <div className="list-box-header">اطلاعات</div>
            <div className="list-box-container">
              {active == 'journal' && <JournalEntry />}
              {active == 'categories' && <JournalCategory />}
              {active == 'salary' && <SalaryEntry />}
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
};

export default JournalList;
