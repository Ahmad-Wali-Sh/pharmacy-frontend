import React, { useEffect, useRef, useState } from "react";
import { MainButton, PlusButton } from "../../PageComponents/Buttons/Buttons";
import BigModal from "../../PageComponents/Modals/BigModal";
import AutoShopingList from "./AutoShopingList";
import ManualShopingList from "./ManualShopingList";
import TrazList from "./TrazList";
import PurchaseListManual from "../../PageComponents/Lists/SellLists/PurcahseListManual";
import OrderList from "./OrderList";

const ShopingLists = ({
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
              onClick={() => setActive("manual-shoping")}
              className={`list-item ${
                active == "manual-shoping" && "list-item-active"
              }`}
            >
              نیازمندی اقلام
            </div>
            <div
              onClick={() => setActive("shoping-list")}
              className={`list-item ${
                active == "shoping-list" && "list-item-active"
              }`}
            >
              لست خرید
            </div>
            <div
              onClick={() => setActive("traz")}
              className={`list-item ${
                active == "traz" && "list-item-active"
              }`}
            >
              تراز
            </div>
            <div
              onClick={() => setActive("order")}
              className={`list-item ${
                active == "order" && "list-item-active"
              }`}
            >
              آردر لست
            </div>
            {/* <div
              onClick={() => setActive("shoping-cycle")}
              className={`list-item ${
                active == "shoping-cycle" && "list-item-active"
              }`}
            >
              گردش اقلام
            </div> */}
          </div>
          <div className="list-box">
            <div className="list-box-header">اطلاعات</div>
            <div className="list-box-container">
              {active == "manual-shoping" && <PurchaseListManual />}
              {active == "shoping-list" && <AutoShopingList />}
              {active == "traz" && <TrazList />}
              {active == "order" && <OrderList />}
            </div>
          </div>
        </div>
      </BigModal>
    </>
  );
};

export default ShopingLists;
