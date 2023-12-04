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

  let TrazQuery = `traz/?medician=${filter.medician}`;
  const { data: TrazQueryList } = useQuery([TrazQuery]);

  const [sortedTraz, setSortedTraz] = useState([]);
  useEffect(() => {
    TrazQueryList &&
      setSortedTraz(
        TrazQueryList?.sort((a, b) => {
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
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDowns);
    return () => {
      document.removeEventListener("keydown", handleKeyDowns);
    };
  }, []);

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
            setFilter({ ...filter, medician: medicine.id });
          }}
        />
        <FilterDate
          label="از"
          value={filter.from}
          name="from"
          handleChange={(e) => setFilter({ ...filter, from: e.target.value })}
        />
        <FilterDate
          label="تا"
          value={filter.from}
          name="to"
          handleChange={(e) => setFilter({ ...filter, to: e.target.value })}
        />
      </FilterModal>
      <div className="traz-list-box">
        <div className="traz-list-header">
          <h5>No</h5>
          <h5>نوع</h5>
          <h5>ش.حواله</h5>
          <h5>تعداد</h5>
          <h5>قیمت</h5>
          <h5>انقضا</h5>
          <h5>شرکت</h5>
          <h5>کاربر</h5>
          <h5>تاریخ</h5>
          <h5>ساعت</h5>
          <h5>نوع</h5>
          <h5>ش.حواله</h5>
          <h5>تعداد</h5>
          <h5>قیمت</h5>
          <h5>منفی</h5>
          <h5>وضعیت</h5>
          <h5>ش.ثبت</h5>
        </div>
        {filter.medician &&
          sortedTraz?.map((trazItem, num) => (
            <TrazListItem trazItem={trazItem} num={num}></TrazListItem>
          ))}
      </div>
    </>
  );
}

function TrazListItem(props) {
  return (
    <div className="traz-list-items-box" key={props.trazItem.id}>
      <h4>{props.num + 1}</h4>
      <h4>{props.trazItem.type == "EntranceThrough" ? "ورودی" : ""}</h4>
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
          ? props.trazItem.total_purchaseـafghani
          : ""}
      </h4>
      <h4>
        {props.trazItem.type == "EntranceThrough"
          ? props.trazItem.expire_date
          : ""}
      </h4>
      <h4>
        {props.trazItem.type == "EntranceThrough" ? props.trazItem.company : ""}
      </h4>
      <h4>{props.trazItem.username}</h4>
      <h4>{props.trazItem?.timestamp?.substring(0, 10)}</h4>
      <h4>{props.trazItem?.timestamp?.substring(11, 16)}</h4>
      <h4>
        {props.trazItem.type == "OutranceThrough"
          ? "خروجی"
          : props.trazItem.type == "PrescriptionThrough"
          ? "خروجی"
          : ""}
      </h4>
      <h4>
        {props.trazItem.type == "OutranceThrough"
          ? props.trazItem.outrance
          : props.trazItem.type == "PrescriptionThrough"
          ? props.trazItem.prescription
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
      <h4></h4>
      <h4>
        {props.trazItem.type == "OutranceThrough"
          ? props.trazItem.outrance
          : props.trazItem.type == "PrescriptionThrough"
          ? props.trazItem.prescription
          : ""}
      </h4>
    </div>
  );
}
