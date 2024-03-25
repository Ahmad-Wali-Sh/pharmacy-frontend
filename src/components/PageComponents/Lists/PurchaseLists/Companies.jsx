import { useRef, useState, useEffect } from "react";
import { InfoButton, DeleteButton } from "../../Buttons/Buttons";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import {
  postDataFn,
  successFn,
  putDataFn,
  deleteDataFn,
} from "../../../services/API";
import { toast } from "react-toastify";
import {
  Form,
  ListFooter,
  ListHeader,
  ListMap,
  FilterModal,
  FilterInput,
} from "../../ListingComponents";
import ControlledSelect from "../../ControlledSelect";
import PurchasingLists from "./PurchasingLists";

export default function Companies() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [filter, setFilter] = useState({
    search: "",
  });

  const { data: markets } = useQuery("market/");
  const { data: cities } = useQuery("city/");

  const user = useAuthUser();

  const { register, handleSubmit, reset, control } = useForm();

  const { mutateAsync: newCompanies } = useMutation({
    mutationFn: (data) => postDataFn(data, "pharm-companies/"),
    onSuccess: () =>
      successFn([CompaniesQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditCompanies } = useMutation({
    mutationFn: (data) => putDataFn(data, `pharm-companies/${editItem.id}/`),
    onSuccess: () =>
      successFn([CompaniesQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deleteCompany } = useMutation({
    mutationFn: (id) => deleteDataFn(`pharm-companies/${id}/`),
    onSuccess: () =>
      successFn([CompaniesQuery], () => {
        setActive("list");
      }),
    onError: (e) => {
      console.log(e.response);
      toast.error(`نسخه های قبلی را حذف نموده دوباره سعی کنید`);
    },
  });

  const FormResetToItem = (item) => {
    reset({
      name: item.name ? item.name : "",
      ceo: item.ceo ? item.ceo : "",
      ceo_phone: item.ceo_phone ? item.ceo_phone : "",
      manager: item.manager ? item.manager : "",
      manager_phone: item.manager_phone ? item.manager_phone : "",
      visitor: item.visitor ? item.visitor : "",
      visitor_phone: item.visitor_phone ? item.visitor_phone : "",
      companies: item.companies ? item.companies : "",
      company_phone_1: item.company_phone_1 ? item.company_phone_1 : "",
      company_phone_2: item.company_phone_2 ? item.company_phone_2 : "",
      company_online: item.company_online ? item.company_online : "",
      address: item.address ? item.address : "",
      description: item.description ? item.description : "",
      city: item.city ? item.city : "",
      market: item.market ? item.market : "",
    });

    setEditItem(item);
  };

  const ResetForm = () => {
    reset({
      name: "",
      ceo: "",
      ceo_phone: "",
      manager: "",
      manager_phone: "",
      visitor: "",
      visitor_phone: "",
      companies: "",
      company_phone_1: "",
      company_phone_2: "",
      company_online: "",
      address: "",
      description: "",
      city: "",
      market: "",
    });
    setEditItem("");
  };

  let CompaniesQuery = `pharm-companies/?search=${filter.search}`;
  const { data: pharmCompanies } = useQuery([CompaniesQuery]);

  const listRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    listRef.current.scrollTo({ behavior: 'smooth', top: scrollPosition })
  }

  useEffect(() => {
    active == 'list' && handleScroll()
  }, [active])

  useEffect(() => {
    const handleKeyDowns = (e) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case "e":
          case "E":
          case "ث":
            e.preventDefault();
            setActive("new");
            ResetForm();
            break;
          case "f":
          case "F":
          case "ب":
            e.preventDefault();
            ListFilterRef.current.Opener();
            break;
          case "l":
          case "L":
          case "م":
            e.preventDefault();
            setActive("list");
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDowns);
    return () => {
      document.removeEventListener("keydown", handleKeyDowns);
    };
  }, []);

  switch (active) {
    case "list":
      return (
        <>
          <FilterModal
            current={ListFilterRef.current}
            ListFilterRef={ListFilterRef}
          >
            <FilterInput
              label="جستجو"
              value={filter.name}
              autoFocus={true}
              handleChange={(e) =>
                setFilter({ ...filter, search: e.target.value })
              }
            />
          </FilterModal>
          <ListHeader>
            <h4>No</h4>
            <h4>نام</h4>
            <h4>رئیس</h4>
            <h4>مارکت</h4>
            <h4>شهر</h4>
            <h4>بیشتر</h4>
          </ListHeader>
          <div className="patient-list-box" ref={listRef}>
            {pharmCompanies?.map((finalRegister, key) => (
              <div className="patient-list-item">
                <h4>{key + 1}</h4>
                <h4>{finalRegister.name}</h4>
                <h4>{finalRegister.ceo}</h4>
                <h4>{finalRegister.market_name}</h4>
                <h4>{finalRegister.city_name}</h4>
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setScrollPosition(listRef.current?.scrollTop)
                      setActive("edit");
                      FormResetToItem(finalRegister);
                    }}
                  />
                  <DeleteButton
                    Func={() => {
                      deleteCompany(finalRegister.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <ListFooter setActive={setActive} reset={reset} user={user} />
        </>
      );
    case "new":
      () => setEditItem("");
      return (
        <>
          <CompanyForm
            editItem={editItem}
            markets={markets}
            cities={cities}
            register={register}
            control={control}
          ></CompanyForm>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newCompanies}
            reset={reset}
          />
        </>
      );
    case "edit":
      return (
        <>
          <CompanyForm
            editItem={editItem}
            markets={markets}
            cities={cities}
            register={register}
            control={control}
          ></CompanyForm>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditCompanies}
            reset={reset}
          />
        </>
      );
  }
}

function CompanyForm(props) {
  return (
    <Form>
      <label>نام شرکت:</label>
      <input type="text" {...props.register("name")} required />
      <label>مارکت:</label>
      <div className="contorlled-select-box">
        <ControlledSelect
          control={props.control}
          name="market"
          options={props.markets}
          placeholder=""
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          uniqueKey={`medicine-unigue${props.markets}`}
          defaultValue={props.markets?.find((c) =>
            c.id === props.editItem?.market ? c.name : null
          )}
          NewComponent={
            <PurchasingLists button='plus' activeKey='markets'/>
          }
        />
      </div>
      <label>رئیس:</label>
      <input type="text" {...props.register("ceo")} />
      <label>تماس رئیس:</label>
      <input type="text" {...props.register("ceo_phone")} />
      <label>مدیر:</label>
      <input type="text" {...props.register("manager")} />
      <label>تماس مدیر:</label>
      <input type="text" {...props.register("manager_phone")} />
      <label>وزیتور:</label>
      <input type="text" {...props.register("visitor")} />
      <label>تماس وزیتور:</label>
      <input type="text" {...props.register("visitor_phone")} />
      <label>کمپنی ها:</label>
      <input type="text" {...props.register("companies")} />
      <label>شهر:</label>
      <div className="contorlled-select-box">
        <ControlledSelect
          control={props.control}
          name="city"
          options={props.cities}
          placeholder=""
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          uniqueKey={`medicine-unigue${props.cities}`}
          defaultValue={props.cities?.find((c) =>
            c.id === props.editItem?.city ? c.name : null
          )} 
          NewComponent={
            <PurchasingLists button='plus' activeKey='cities'/>
          }
        />
      </div>
      <label>تماس 1:</label>
      <input type="text" {...props.register("company_phone_1")} />
      <label>تماس 2:</label>
      <input type="text" {...props.register("company_phone_2")} />
      <label>آنلاین:</label>
      <input type="text" {...props.register("company_online")} />
      <label>آدرس:</label>
      <input type="text" {...props.register("address")} />
      <label>توضیحات:</label>
      <textarea
        type="text"
        className="company-form-description"
        {...props.register("description")}
      ></textarea>
    </Form>
  );
}
