import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  ListFooter,
  FilterModal,
  FilterInput,
} from "../../PageComponents/ListingComponents";
import Entrance from '../../Purchase/Entrance/Entrance'
import "react-image-upload/dist/index.css";
import axios from "axios";
import { useMedicine } from "../../States/States";
import InfoModal from "../../PageComponents/Modals/InfoModal";
import { InfoButton } from "../../PageComponents/Buttons/Buttons";

export default function ExpiringMedicineList() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");

  let dateer = new Date();
  let year = dateer.getFullYear();
  let first_day_of_year = new Date(year, 0, 2);
  const [filter, setFilter] = useState({
    month: 3,
    page: 1
  });

  const user = useAuthUser();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  let medicineQuery = `medicine-expiry/?expire_in=${filter.month}&page=${filter.page}`;
  const { data: medicines } = useQuery({
    queryKey: [medicineQuery],
  });


  const listRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    listRef.current.scrollTo({ behavior: "smooth", top: scrollPosition });
  };

  useEffect(() => {
    active == "list" && handleScroll();
  }, [active]);

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

  let date = new Date();
  let formatted_date = date.toISOString().substring(0, 10);
  const InfoRef = useRef();
  const [batchDetail, setBatchDetail] = useState([]);

  function monthsBetween(date) {
    // Convert input dates to Date objects
    const d1 = new Date();
    const d2 = new Date(date);

    // Calculate the difference in years and months
    let yearsDiff = d2.getFullYear() - d1.getFullYear();
    let monthsDiff = d2.getMonth() - d1.getMonth();

    // Calculate the total difference in months
    let totalMonths = (yearsDiff * 12) + monthsDiff;

    return totalMonths;
}
  const [trigger, setTrigger] = useState('')
  const [searchEntrance, setSearchEntrance] = useState(false)
  return (
    <>

      <InfoModal ref={InfoRef} title="حواله های ورودی">
        <div className="expiry-modal-container">
          {batchDetail?.map((batch) => (
            <div className="expiry-batch-entry" onClick={() => {
              batch?.entrance && setTrigger(new Date())
              setSearchEntrance(batch?.entrance)

              setTimeout(() => {
                setSearchEntrance('')
              }, 500)
            }}>
              <div className="expiry-batch-info">
                <h4>:حواله</h4>
                <h4>:کمپنی</h4>
                <h4>:تعداد</h4>
              </div>
              <div className="expiry-batch-detail">
                <h4>{batch.entrance}</h4>
                <h4>{batch.company_name ? batch.company_name : '---'}</h4>
                <h4>{batch.register_quantity}</h4>
              </div>
              <div className="expiry-batch-info">
                <h4>:تاریخ</h4>
                <h4>:تاریخ_انقضا</h4>
                <h4>:تا_انقضا</h4>
              </div>
              <div className="expiry-batch-detail">
                <h4>{batch.timestamp.slice(0,10)}</h4>
                <h4>{batch.expire_date}</h4>
                <h4>{monthsBetween(batch.expire_date)}</h4>
              </div>
            </div>
          ))}
        </div>
      </InfoModal>
        <Entrance SearchedNumber={searchEntrance} button={'none'} trigger={trigger}/>
      <FilterModal
        current={ListFilterRef.current}
        ListFilterRef={ListFilterRef}
      >
        <FilterInput
          label="ماه"
          value={filter.month}
          autoFocus={true}
          handleChange={(e) => setFilter({ ...filter, month: e.target.value, page: 1 })}
        />
      </FilterModal>
      <div className="stock-list-header">
        <h4>آی دی</h4>
        <h4>نام دارو</h4>
        <h4>موجودی</h4>
        <h4>قیمت</h4>
        <h4>تعداد ورودی</h4>
        <h4>اطلاعات تکمیلی</h4>
      </div>

      <div className="patient-list-box" ref={listRef}>
        {medicines?.results.map((item, key) => (
          <div className="stock-list-item" key={item.medician.id}>
            <h5>{item.medician.id}</h5>
            <h5>{item.medician.medicine_full}</h5>
            <h5>{item.medician.existence}</h5>
            <h5>{item.medician.price}</h5>
            <h5>{item.batches?.length}</h5>
            <InfoButton
              Func={() => {
                InfoRef.current.Opener();
                setBatchDetail(item?.batches);
              }}
            />
          </div>
        ))}
      </div>
      <ListFooter
        setActive={setActive}
        reset={reset}
        user={user}
        filter={filter}
        setFilter={setFilter}
        medicines={medicines}
      />
    </>
  );
}
