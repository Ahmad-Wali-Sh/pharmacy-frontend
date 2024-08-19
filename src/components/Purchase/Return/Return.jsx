import React from "react";
import { useQuery } from "react-query";
import Prescription from "../../Sell/Prescription/Prescription/Prescription";
import SellingLists from "../../PageComponents/Lists/SellLists/SellingLists";
import PrescriptionReturn from "../../Sell/Prescription/PrescriptionReturn/PrescriptionReturn";


function Return() {
  const {
    data: departments,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["department-return/?ordering=id/"] });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Server Can't Respone Correctly</div>;
  }

  return (
    <div className="purchase">
      <div className="purchase-box">
        <PrescriptionReturn button="main" title="ثبت برگشتی" />
        <SellingLists title='لست ها' Return={true} activeKey='doctor' button='main' name='ثبت داکتر' icon='fa-solid fa-user-doctor'/>
        <SellingLists title='لست ها' Return={true} activeKey='patient' button='main' name='ثبت مریض' icon='fa-solid fa-bed'/>
        <SellingLists title='لست ها' Return={true} activeKey='departments' button='main' name='ثبت نوع' icon='fa-solid fa-list-alt'/>
      </div>
      <div className="sell-form">
        <div className="sell-department-buttons">
          {departments?.map((depart) => (
            <PrescriptionReturn button={2} department={depart} trigger={0} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Return;
