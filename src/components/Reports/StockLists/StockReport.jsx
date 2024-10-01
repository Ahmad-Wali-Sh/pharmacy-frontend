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

import "react-image-upload/dist/index.css";
import axios from "axios";
import { useMedicine } from "../../States/States";

export default function StockReport() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");

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




  let medicineQuery = `stock/?brand_name=${encodeURIComponent(
    filter.brand_name
  )}&barcode__contains=${filter.barcode}&search=${encodeURIComponent(
    filter.generic_name
  )}&ml=${encodeURIComponent(
    filter.ml
  )}&kind__name_persian=${encodeURIComponent(
    filter.kind_persian
  )}&kind__name_english=${encodeURIComponent(
    filter.kind_english
  )}&pharm_group__name_english=${encodeURIComponent(
    filter.pharm_group_english
  )}&country__name=${encodeURIComponent()}&pharm_group__name_persian=${encodeURIComponent(
    filter.pharm_group_persian
  )}&country__name=${encodeURIComponent(
    filter.country
  )}&big_company__name=${encodeURIComponent(filter.company)}&page=${
    filter.page
  }&ordering=-total_sell`;
  const { data: medicines, refetch: getTwiceMedicine } = useQuery({
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

      return (
        <>
          <FilterModal
            current={ListFilterRef.current}
            ListFilterRef={ListFilterRef}
            fileName={`stock_list_${formatted_date}`}
            url={`stock-excel/?brand_name=${encodeURIComponent(
              filter.brand_name
            )}&barcode__contains=${filter.barcode}&search=${encodeURIComponent(
              filter.generic_name
            )}&ml=${encodeURIComponent(filter.ml)}&pharm_group__name_english=${
              filter.pharm_group_english
            }&pharm_group__name_persian=${
              filter.pharm_group_persian
            }&kind__name_persian=${encodeURIComponent(
              filter.kind_persian
            )}&kind__name_english=${encodeURIComponent(
              filter.kind_english
            )}&country__name=${encodeURIComponent(
              filter.country
            )}&big_company__name=${encodeURIComponent(
              filter.company
            )}&ordering=-total_sell`}
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
            <FilterInput
              label="نوع.فارسی"
              value={filter.kind_persian}
              handleChange={(e) =>
                setFilter({ ...filter, kind_persian: e.target.value })
              }
            />
            <FilterInput
              label="نوع.انگلیسی"
              value={filter.kind_english}
              handleChange={(e) =>
                setFilter({ ...filter, kind_english: e.target.value })
              }
            />
            <FilterInput
              label="گروپ_انگلیسی"
              value={filter.pharm_group_english}
              handleChange={(e) =>
                setFilter({ ...filter, pharm_group_english: e.target.value })
              }
            />
            <FilterInput
              label="گروپ_فارسی"
              value={filter.pharm_group_persian}
              handleChange={(e) =>
                setFilter({ ...filter, pharm_group_persian: e.target.value })
              }
            />
            <FilterInput
              label="کشور"
              value={filter.country}
              handleChange={(e) =>
                setFilter({ ...filter, country: e.target.value })
              }
            />
            <FilterInput
              label="کمپنی"
              value={filter.company}
              handleChange={(e) => {
                setFilter({ ...filter, company: e.target.value });
                getTwiceMedicine();
              }}
            />
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
