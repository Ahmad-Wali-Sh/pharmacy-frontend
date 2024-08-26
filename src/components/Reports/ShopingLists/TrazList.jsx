import { useRef, useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  FilterDate,
  FilterModal,
} from "../../PageComponents/ListingComponents";
import { SelectMedician } from "../../Medician/SelectMedicine/SelectMedician";

export default function TrazList() {
  const ListFilterRef = useRef(null);
  const [filter, setFilter] = useState({
    medician: "",
    from: "",
    to: "",
  });

  let TrazQuery = `traz/?medician=${filter.medician?.id}`;
  const { data: TrazQueryList } = useQuery([TrazQuery], {
    enabled: filter.medician?.id ? true : false,
  });

  const [sortedTraz, setSortedTraz] = useState([]);
  useEffect(() => {
    TrazQueryList &&
      setSortedTraz(
        TrazQueryList?.results?.sort((a, b) => {
          return new Date(a.timestamp) - new Date(b.timestamp);
        })
      );
  }, [TrazQueryList]);

  useEffect(() => {
    const handleKeyDowns = (e) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case "f":
          case "F":
          case "ب":
            e.preventDefault();
            ListFilterRef.current.Opener();
            MedicineSelectRef?.current?.Opener();
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDowns);
    return () => {
      document.removeEventListener("keydown", handleKeyDowns);
    };
  }, []);

  const MedicineSelectRef = useRef(null);

  return (
    <>
      <FilterModal
        url={TrazQuery}
        current={ListFilterRef.current}
        ListFilterRef={ListFilterRef}
      >
        <label>دوا</label>
        <SelectMedician
          selectAutoCompleteData={(medicine) => {
            setFilter({ ...filter, medician: medicine });
          }}
          ref={MedicineSelectRef}
        />
      </FilterModal>
      <div className="traz-list-box">
        <div className="traz-list-header">
          <h5>No</h5>
          <h5>نوع</h5>
          <h5>وضعیت</h5>
          <h5>ش.حواله</h5>
          <h5>تعداد</h5>
          <h5>قیمت</h5>
          <h5>انقضا</h5>
          <h5>شرکت</h5>
          <h5>کاربر</h5>
          <h5>تاریخ</h5>
          <h5>ساعت</h5>
          <h5>توضیحات</h5>
        </div>
        <div className="traz-list-container">
        {filter.medician?.id &&
          sortedTraz?.map((trazItem, num) => (
            <TrazListItem
            trazItem={trazItem}
            num={num}
            medician={filter.medician}
            ></TrazListItem>
          ))}
        </div>
      </div>
      <div className="traz-total-box">
        <h4>مجموع خرید:</h4>
        <h4>{TrazQueryList?.entrance_through_total}</h4>
        <h4>مجموع فروش:</h4>
        <h4>{TrazQueryList?.prescription_through_total}</h4>
        <h4>مجموع برگشتی:</h4>
        <h4>{TrazQueryList?.prescription_return_through_total}</h4>
        <h4>موجودی:</h4>
        <h4>{filter.medician?.existence ? filter.medician?.existence : ""}</h4>
      </div>
    </>
  );
}

function TrazListItem(props) {
  if (props.trazItem.type == "EntranceThrough") {
    return (
      <div className="traz-list-items-box traz-entrance" key={props.trazItem.id}>
        <h4>{props.num + 1}</h4>
        <h4>ورودی</h4>
        <h4>{props.trazItem.entrance_department}</h4>
        <h4>{props.trazItem.entrance}</h4>
        <h4>{props.trazItem.register_quantity}</h4>
        <h4>{props.trazItem.each_purchase_price}</h4>
        <h4>{props.trazItem.expire_date}</h4>
        <h4>{props.trazItem.company_name}</h4>
        <h4>{props.trazItem.username}</h4>
        <h4>{props.trazItem?.timestamp?.substring(0, 10)}</h4>
        <h4>{props.trazItem?.timestamp?.substring(11, 16)}</h4>
        <h4>{props.trazItem.description}</h4>
      </div>
    );
  }

  if (props.trazItem.type == "PrescriptionReturnThrough") {
    return (
      <div className="traz-list-items-box traz-return" key={props.trazItem.id}>
        <h4>{props.num + 1}</h4>
        <h4>برگشتی</h4>
        <h4>{props.trazItem.department_name}</h4>
        <h4>{props.trazItem.prescription_number}</h4>
        <h4>{props.trazItem.quantity}</h4>
        <h4>{props.trazItem.each_price}</h4>
        <h4></h4>
        <h4>{props.trazItem.patient_name}</h4>
        <h4>{props.trazItem.username}</h4>
        <h4>{props.trazItem?.timestamp?.substring(0, 10)}</h4>
        <h4>{props.trazItem?.timestamp?.substring(11, 16)}</h4>
        <h4>{props.trazItem.description}</h4>
      </div>
    );
  }
  if (props.trazItem.type == "PrescriptionThrough") {
    return (
      <div className="traz-list-items-box traz-prescription" key={props.trazItem.id}>
      <h4>{props.num + 1}</h4>
      <h4>خروجی</h4>
      <h4>{props.trazItem.department_name}</h4>
      <h4>{props.trazItem.prescription_number}</h4>
      <h4>{props.trazItem.quantity}</h4>
      <h4>{props.trazItem.each_price}</h4>
      <h4></h4>
      <h4>{props.trazItem.patient_name}</h4>
      <h4>{props.trazItem.username}</h4>
      <h4>{props.trazItem?.timestamp?.substring(0, 10)}</h4>
      <h4>{props.trazItem?.timestamp?.substring(11, 16)}</h4>
      <h4>{props.trazItem.description}</h4>
    </div>
    );
  }
  return (
    <div className="traz-list-items-box" key={props.trazItem.id}>
      <h4>{props.num + 1}</h4>
      <h4>
        {props.trazItem.type == "EntranceThrough" ||
        props.trazItem.type == "PrescriptionReturnThrough"
          ? "ورودی"
          : "خروجی"}
      </h4>
      <h4>
        {props.trazItem.type == "EntranceThrough"
          ? props.trazItem.entrance
          : ""}
      </h4>
      <h4>
        {props.trazItem.type == "EntranceThrough"
          ? props.trazItem.register_quantity
          : ""}
      </h4>
      <h4>
        {props.trazItem.type == "EntranceThrough"
          ? props.trazItem.each_purchase_price
          : ""}
      </h4>
      <h4>
        {props.trazItem.type == "EntranceThrough"
          ? props.trazItem.expire_date
          : ""}
      </h4>
      <h4>
        {props.trazItem.type == "EntranceThrough"
          ? props.trazItem.company_name
          : ""}
      </h4>

      <h4>{props.trazItem.username}</h4>
      <h4>{props.trazItem?.timestamp?.substring(0, 10)}</h4>
      <h4>{props.trazItem?.timestamp?.substring(11, 16)}</h4>
      <h4>
        {props.trazItem.type == "PrescriptionReturnThrough"
          ? "ورودی"
          : props.trazItem.type == "PrescriptionThrough"
          ? "خروجی"
          : ""}
      </h4>
      <h4>
        {props.trazItem.type == "PrescriptionReturnThrough"
          ? props.trazItem.outrance
          : props.trazItem.type == "PrescriptionThrough"
          ? props.trazItem.prescription_number
          : ""}
      </h4>
      <h4>
        {props.trazItem.type == "OutranceThrough"
          ? props.trazItem.register_quantity
          : props.trazItem.type == "PrescriptionThrough"
          ? props.trazItem.quantity
          : ""}
      </h4>
      <h4>
        {props.trazItem.type == "OutranceThrough"
          ? props.trazItem.each_price
          : props.trazItem.type == "PrescriptionThrough"
          ? props.trazItem.each_price
          : ""}
      </h4>
      <h4></h4>
      <h4>
        {props.trazItem.type == "OutranceThrough"
          ? props.trazItem.department_name
          : props.trazItem.type == "PrescriptionThrough"
          ? props.trazItem.department_name
          : ""}
      </h4>
      <h5>
        <samll>
          {props.trazItem.type == "EntranceThrough"
            ? props.trazItem.description
            : ""}
        </samll>
      </h5>
    </div>
  );
}
