import React from "react";
import Prescription from "./Prescription/Prescription/Prescription";
import { useQuery } from "react-query";
import SellingLists from "../PageComponents/Lists/SellLists/SellingLists";
import { useUserPermissions } from "../States/States";


function Sell() {
  const {
    data: departments,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["department/?ordering=id"] });

  const {userPermissions} = useUserPermissions()

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Server Can't Respone Correctly</div>;
  }

  return (
    <div className="purchase">
      <div className="purchase-box">
        <Prescription button="main" title="ثبت نسخه" />
        <SellingLists title='لست ها' activeKey='doctor' button='main' name='ثبت داکتر' icon='fa-solid fa-user-doctor'/>
        <SellingLists title='لست ها' activeKey='patient' button='main' name='ثبت مریض' icon='fa-solid fa-bed'/>
        <SellingLists title='لست ها' activeKey='departments' button='main' name='ثبت نوع' icon='fa-solid fa-list-alt'/>
        <SellingLists title='لست ها' activeKey='purhase-list' button='main' name='لست خرید' icon='fa-solid fa-list-alt'/>
      </div>
      <div className="sell-form">
        {userPermissions?.includes('core.add_prescription') && <div className="sell-department-buttons">
          {departments?.map((depart) => (
            <Prescription button={2} department={depart} trigger={0} />
          ))}
        </div>}
      </div>
    </div>
  );
}

export default Sell;
