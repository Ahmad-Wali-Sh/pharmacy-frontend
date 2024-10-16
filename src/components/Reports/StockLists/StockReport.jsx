import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  ListFooter,
  FilterModal,
  FilterInput,
  FilterDate,
} from "../../PageComponents/ListingComponents";

import "react-image-upload/dist/index.css";
import axios from "axios";
import { useMedicine } from "../../States/States";
import ControlledSelect from "../../PageComponents/ControlledSelect";

export default function StockReport() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");

  const { data: kinds } = useQuery(["kind/"]);
  const { data: pharmGroups } = useQuery(["pharm-groub/"]);
  const { data: country } = useQuery(["country/"]);

  let dateer = new Date();
  let year = dateer.getFullYear();
  let first_day_of_year = new Date(year, 0, 2);
  const [filter, setFilter] = useState({
    brand_name: "",
    generic_name: "",
    ml: "",
    kind_english: "",
    pharm_group_english: "",
    pharm_group_persian: "",
    kind_persian: "",
    country: "",
    company: "",
    page: 1,
    barcode: "",
    num_days: 30,
    start_date: first_day_of_year.toISOString().substring(0, 10),
  });

  const user = useAuthUser();

  const { reset, control, watch, setValue, register } = useForm();

  let medicineQuery = `brand_name=${encodeURIComponent(
    filter.brand_name
  )}&kind=${watch("kind")?.id || ""}&pharm_group=${
    watch("pharm_group")?.id || ""
  }&country=${watch("country")?.id || ""}&big_company=${
    watch("company")?.id || ""
  }&start_date=${watch("start_date") || ""}&end_date=${
    watch("end_date") || ""
  }&shortcut=${watch('shortcut') || ''}&ordering=-total_sell`;

  const { data: medicines, refetch: getTwiceMedicine } = useQuery({
    queryKey: ["stock/?" + medicineQuery],
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

  useEffect(() => {
    console.log(watch("shortcut"));
  }, [watch("shortcut")]);

  return (
    <>
      <FilterModal
        current={ListFilterRef.current}
        ListFilterRef={ListFilterRef}
        fileName={`stock_list_${formatted_date}`}
        url={`stock-excel/?${medicineQuery}`}
        csv={true}
      >
        <FilterInput
          label="نام برند"
          value={filter.brand_name}
          autoFocus={true}
          handleChange={(e) =>
            setFilter({ ...filter, brand_name: e.target.value })
          }
        />
        <FilterInput
          label="ترکیب"
          value={filter.generic_name}
          handleChange={(e) =>
            setFilter({ ...filter, generic_name: e.target.value })
          }
        />
        <label>نوع:</label>
        <ControlledSelect
          control={control}
          name="kind"
          options={kinds}
          placeholder=""
          getOptionLabel={(option) =>
            option.name_persian + " " + option.name_english
          }
          getOptionValue={(option) =>
            option.name_persian + " " + option.name_english
          }
          onChange={(res) => {
            res ? setValue("kind", res) : setValue("kind", "");
          }}
          uniqueKey={`kind${watch("kind")}`}
          defaultValue={watch("kind")}
        />
        <label>گروپ_دوایی:</label>
        <ControlledSelect
          control={control}
          name="pharm_group"
          options={pharmGroups}
          placeholder=""
          getOptionLabel={(option) =>
            option.name_persian + " " + option.name_english
          }
          getOptionValue={(option) =>
            option.name_persian + " " + option.name_english
          }
          onChange={(res) => {
            res ? setValue("pharm_group", res) : setValue("pharm_group", "");
          }}
          uniqueKey={`pharm_group${watch("pharm_group")}`}
          defaultValue={watch("pharm_group")}
        />
        <label>کشور:</label>
        <ControlledSelect
          control={control}
          name="country"
          options={country}
          placeholder=""
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          onChange={(res) => {
            res ? setValue("country", res) : setValue("country", "");
          }}
          uniqueKey={`country${watch("country")}`}
          defaultValue={watch("country")}
        />
        <label>کمپنی:</label>
        <ControlledSelect
          control={control}
          name="company"
          options={country}
          placeholder=""
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          onChange={(res) => {
            res ? setValue("company", res) : setValue("company", "");
          }}
          uniqueKey={`company${watch("company")}`}
          defaultValue={watch("company")}
        />
        <label>تاریخ:</label>
        <div className="flex">
          <input
            type="date"
            onChange={(res) => {
              setValue("start_date", res.target.value);
            }}
            className="text-input-standard"
            {...register('start_date')}
          />
          {">"}
          <input
            type="date"
            className="text-input-standard"
            {...register('end_date')}
          />
        </div>
        <label>بازه_زمانی:</label>
        <select
          className="text-input-standard"
          onChange={(res) => {
            if (res.target.value != '') {
              setValue("shortcut", res.target.value);
              setValue("start_date", "");
              setValue("end_date", "");
            } else {
              setValue("shortcut", "");
            }
          }}
        >
          <option value=""></option>
          <option value="today">امروز</option>
          <option value='this_week'>این هفته</option>
          <option value='last_week'>هفته قبل</option>
          <option value='this_month'>این ماه</option>
          <option value='last_six_months'>6 ماه گذشته</option>
          <option value='this_year'>امسال</option>
          <option value='last_year'>سال گذشته</option>
        </select>
      </FilterModal>
      <div className="stock-list-header">
        <h4>آی دی</h4>
        <h4>نام دارو</h4>
        <h4>قیمت خرید</h4>
        <h4>قیمت فروش</h4>
        <h4>مجموع خرید</h4>
        <h4>مجموع فروش</h4>
      </div>

      <div className="patient-list-box" ref={listRef}>
        {medicines?.results.map((medicine, key) => (
          <div className="stock-list-item" key={medicine.id}>
            <h5>{medicine.id}</h5>
            <h5>{medicine.medicine_full}</h5>
            <h5>{medicine.purchased_price || 0}</h5>
            <h5>{medicine.price}</h5>
            <h5>{medicine.total_purchase || 0}</h5>
            <h5>{medicine.total_sell}</h5>
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
