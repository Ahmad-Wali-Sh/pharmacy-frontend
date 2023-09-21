import React, { useRef } from "react";
import BigModal from "../../Modals/BigModal";
import { MainButton, PlusButton } from "../../Buttons/Buttons";
import RegisterLists from "./RegisterLists";
import Companies from "./Companies";
import MarketsLists from "./MarketsLists";
import CitiesLists from "./Cities";
import StoreList from "./StoreLists";
import Currencies from "./Currencies";
import PaymentsLists from "./PaymentsLists";

const PurchasingLists = ({ title, activeKey, button, name, icon }) => {
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
              onClick={() => setActive("final-registers")}
              className={`list-item ${
                active == "final-registers" && "list-item-active"
              }`}
            >
              انواع ثبت
            </div>
            <div
              onClick={() => setActive("companies")}
              className={`list-item ${
                active == "companies" && "list-item-active"
              }`}
            >
              شرکت ها
            </div>
            <div
              onClick={() => setActive("stores")}
              className={`list-item ${
                active == "stores" && "list-item-active"
              }`}
            >
                انبار ها
            </div>
            <div
              onClick={() => setActive("currencies")}
              className={`list-item ${
                active == "currencies" && "list-item-active"
              }`}
            >
                واحدات پولی
            </div>
            <div
              onClick={() => setActive("payments")}
              className={`list-item ${
                active == "payments" && "list-item-active"
              }`}
            >
                انواع پرداخت
            </div>
            <div
              onClick={() => setActive("markets")}
              className={`list-item ${
                active == "markets" && "list-item-active"
              }`}
            >
              مارکت ها
            </div>
            <div
              onClick={() => setActive("cities")}
              className={`list-item ${
                active == "cities" && "list-item-active"
              }`}
            >
              شهر ها
            </div>
          </div>
          <div className="list-box">
            <div className="list-box-header">اطلاعات</div>
            <div className="list-box-container">
              {active == "final-registers" && <RegisterLists />}
              {active == "companies" && <Companies />}
              {active == "markets" && <MarketsLists />}
              {active == "cities" && <CitiesLists />}
              {active == "stores" && <StoreList />}
              {active == "currencies" && <Currencies />}
              {active == "payments" && <PaymentsLists />}
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
};

export default PurchasingLists;
