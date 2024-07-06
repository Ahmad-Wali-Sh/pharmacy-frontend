import { useRef, useState, useEffect } from "react";
import { InfoButton } from "../../../components/PageComponents/Buttons/Buttons";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import {
  postDataFn,
  successFn,
  putDataFn,
  deleteDataFn,
  queryClient,
} from "../../services/API";
import { toast } from "react-toastify";
import {
  ListFooter,
  ListHeader,
  ListMap,
  FilterModal,
  FilterInput,
  FilterDate,
} from "../../PageComponents/ListingComponents";
import ControlledSelect from "../../PageComponents/ControlledSelect";

import WebCamModal from "../../PageComponents/WebCamModal";
import "react-image-upload/dist/index.css";
import axios from "axios";
import Select from "react-select";
import { useMedicine } from "../../States/States";
import MultipleBarcode from "../../PageComponents/MultipleBarcode";
import useServerIP from "../../services/ServerIP";
import MedicinesLists from "../../PageComponents/Lists/MedicineList/MedicinesLists";
import { SelectInputStyle } from "../../../styles";
import SimplePurchaseList from "../../PageComponents/Lists/MedicineList/SimplePurchaseList";
import AdditionalMedicine from "../../PageComponents/Lists/MedicineList/AdditionalMedicine";

export default function AutoShopingList({
  edit,
  setSelectedMedician,
  selectAutoCompleteData,
  medicineActive,
}) {
  const ListFilterRef = useRef(null);
  const { medicine, setMedicine } = useMedicine();
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [imagePreview, setImage] = useState("");

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

  useEffect(() => {
    if (medicineActive) {
      setActive(medicineActive);
      ResetForm();
    }
  }, [medicineActive]);

  const user = useAuthUser();

  useEffect(() => {
    if (edit) {
      setActive("edit");
      setEditItem(edit);
      FormResetToItem(edit);
      setMedicine(edit);
    }
  }, [edit]);

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

  const { mutateAsync: newMedicine } = useMutation({
    mutationFn: async (data) => {
      let newdata = data;
      newdata.delete("department");
      if (watch("department")) {
        watch("department").forEach((item) =>
          newdata.append("department", item)
        );
      }

      const response = await postDataFn(newdata, "medician/");
      setMedicine(response);
    },
    onSuccess: () => {
      successFn([medicineQuery], () => {
        // setActive("list");
        // setMedicine(res.data)
      });
    },
  });

  const { mutateAsync: handleEditMedicine } = useMutation({
    mutationFn: (data) => {
      let newdata = data;
      newdata.delete("department");
      if (watch("department")) {
        watch("department").forEach((item) =>
          newdata.append("department", item)
        );
      }
      putDataFn(newdata, `medician/${editItem?.id}/`);
    },
    onSuccess: (data) => {
      setActive("list");
      if (data?.data) {
        setSelectedMedician && data.data && setSelectedMedician(data.data);
        selectAutoCompleteData(data.data);
      }
      setTimeout(() => {
        // queryClient.invalidateQueries({
        //   predicate: (query) => query.queryKey[0].startsWith("medician"),
        // });
        // queryClient.refetchQueries();
        successFn("");
      }, 500);
      getTwiceMedicine();
      geteditedMedicine();
    },
  });

  const { data: pharmGroup } = useQuery({
    queryKey: ["pharm-groub/"],
  });
  const { data: kind } = useQuery({
    queryKey: ["kind/"],
  });
  const { data: country } = useQuery({
    queryKey: ["country/"],
  });

  const { data: bigCompany } = useQuery({
    queryKey: ["big-company/"],
  });
  const { data: department } = useQuery({
    queryKey: ["department/"],
  });

  let medicineQuery = `medician/?existence_lower_than_minimum_quantity=true&page=${
    filter.page
  }`;
  const { data: medicines, refetch: getTwiceMedicine } = useQuery({
    queryKey: [medicineQuery],
  });

  const { serverIP } = useServerIP();
  const geteditedMedicine = () => {
    edit?.id &&
      axios.get(`${serverIP}api/medician/${edit?.id}`).then((res) => {
        setMedicine(res);
      });
  };

  const FormResetToItem = (item) => {
    const barcodeRetreive = () => {
      if (item.barcode) {
        if (item.barcode && item.barcode?.toString().slice(-1) == ",") {
          if (item.barcode[0].slice(-1) == ",") {
            return item.barcode[0].slice(0, -1);
          } else {
            return item.barcode[0];
          }
        } else return item.barcode;
      } else return "";
    };
    reset({
      id: item.id ? item.id : "",
      brand_name: item.brand_name ? item.brand_name : "",
      generic_name: item.generic_name ? item.generic_name : "",
      barcode: barcodeRetreive(),
      no_pocket: item.no_pocket ? item.no_pocket : "",
      no_box: item.no_box ? item.no_box : "",
      ml: item.ml ? item.ml : "",
      weight: item.weight ? item.weight : "",
      location: item.location ? item.location : "",
      company: item.company ? item.company : "",
      price: item.price ? item.price : "",
      last_purchased: item.last_purchased ? item.last_purchased : "",
      existence: item.existence ? item.existence : "",
      minmum_existence: item.minmum_existence ? item.minmum_existence : "",
      maximum_existence: item.maximum_existence ? item.maximum_existence : "",
      must_advised: item.must_advised ? item.must_advised : "",
      dividing_rules: item.dividing_rules ? item.dividing_rules : "",
      cautions: item.cautions ? item.cautions : "",
      usages: item.usages ? item.usages : "",
      description: item.description ? item.description : "",
      patient_approved: item.patient_approved ? item.patient_approved : "",
      doctor_approved: item.doctor_approved ? item.doctor_approved : "",
      active: item.active ? item.active : "",
      min_expire_date: item.min_expire_date ? item.min_expire_date : "",
      pharm_group_english: item.pharm_group_english
        ? item.pharm_group_english
        : "",
      pharm_group_persian: item.pharm_group_persian
        ? item.pharm_group_persian
        : "",
      kind: item.kind ? item.kind : "",
      country: item.country ? item.country : "",
      department: item.department ? item.department : [],
      big_company: item.big_company ? item.big_company : "",
    });
    item.image &&
      axios(item.image)
        .then((response) => response?.blob())
        .then((blob) => {
          const file = new File(
            [blob],
            item.medicine_full ? item.medicine_full + ".jpeg" : "no_name.jpeg",
            { type: blob.type }
          );
          reset({
            image: file ? file : "",
          });
        });

    setEditItem(item);
    setMedicine(item);
    setImage(item.image ? item.image : "");
  };

  const ResetForm = () => {
    reset({
      id: "",
      brand_name: "",
      generic_name: "",
      barcode: "",
      no_pocket: "",
      no_box: "",
      ml: "",
      weight: "",
      location: "",
      company: "",
      price: "",
      last_purchased: "",
      existence: "",
      minmum_existence: "",
      maximum_existence: "",
      must_advised: "",
      dividing_rules: "",
      cautions: "",
      usages: "",
      description: "",
      image: "",
      patient_approved: "",
      doctor_approved: "",
      active: "",
      min_expire_date: "",
      pharm_group_english: "",
      pharm_group_persian: "",
      kind: "",
      country: "",
      department: [],
      big_company: "",
    });
    setEditItem("");
    setImage("");
  };

  const simplePuchaseListRef = useRef(null);
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
          case "p":
          case "P":
          case "ح":
            e.preventDefault();
            simplePuchaseListRef.current.Opener();
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

  switch (active) {
    case "list":
      return (
        <>
          <FilterModal
            current={ListFilterRef.current}
            ListFilterRef={ListFilterRef}
            fileName={`minimum_list_${formatted_date}`}
            url={`medicine_minimum/?existence_lower_than_minimum_quantity=true`}
          ></FilterModal>
          <ListHeader>
            <h4>آی دی</h4>
            <h4>نام برند</h4>
            <h4></h4>
            <h4>ترکیب</h4>
            <h4></h4>
            <h4>نوع</h4>
            <h4>موثریت</h4>
            <h4>موجودی</h4>
            <h4>حداقل</h4>
            <h4>کمبودی</h4>
            <h4>بیشتر</h4>
          </ListHeader>
          <div className="patient-list-box" ref={listRef}>
            {medicines?.results.map((medicine, num) => (
              <div className="patient-list-item-medi" key={medicine.id}>
                <h4>{num}</h4>
                <h5>{medicine.brand_name}</h5>
                <h5></h5>
                <h5>{medicine.generic_name}</h5>
                <h5></h5>
                <h5>{medicine.kind_name}</h5>
                <h5>{medicine.ml}</h5>
                <h5>{medicine.existence}</h5>
                <h5>{medicine.minmum_existence}</h5>
                <h5>{parseFloat(medicine.maximum_existence) - parseFloat(medicine.existence)}</h5>
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setScrollPosition(listRef.current?.scrollTop);
                      setActive("edit");
                      FormResetToItem(medicine);
                      setEditItem(medicine);
                    }}
                  />
                </div>
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
    case "new":
      () => setEditItem("");
      return (
        <>
          <SimplePurchaseList ref={simplePuchaseListRef} medicine={medicine} />
          <MedicineForm
            imagePreview={imagePreview}
            setImage={setImage}
            register={register}
            reset={reset}
            control={control}
            setValue={setValue}
            watch={watch}
            pharmGroup={pharmGroup}
            kind={kind}
            country={country}
            bigCompany={bigCompany}
            medicine={editItem}
            department={department}
            errors={errors}
          />
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newMedicine}
            reset={reset}
            refetch={getTwiceMedicine}
          />
        </>
      );
    case "edit":
      return (
        <>
          <SimplePurchaseList ref={simplePuchaseListRef} medicine={medicine} />
          <MedicineForm
            imagePreview={imagePreview}
            setImage={setImage}
            register={register}
            reset={reset}
            control={control}
            setValue={setValue}
            watch={watch}
            pharmGroup={pharmGroup}
            kind={kind}
            country={country}
            bigCompany={bigCompany}
            medicine={editItem}
            department={department}
            errors={errors}
          />
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditMedicine}
            reset={reset}
            refetch={getTwiceMedicine}
          />
        </>
      );
  }
}

function MedicineForm(props) {
  let results = props?.department?.filter((depart, index) => {
    if (props?.medicine) {
      return props?.medicine?.department.find((medicineDepart) => {
        return medicineDepart === depart.id && depart;
      });
    }
  });

  return (
    <>
      <form>
        <div className="listing-form">
          <label>نام برند:</label>
          <input
            type="text"
            className={props.errors?.brand_name ? "error-input" : ""}
            {...props.register("brand_name", { required: true })}
            style={{ direction: "ltr", textAlign: "right" }}
          />
          <label>ترکیب:</label>
          <input
            type="text"
            {...props.register("generic_name")}
            style={{ direction: "ltr", textAlign: "right" }}
          />
          <label>موثریت:</label>
          <input
            type="text"
            {...props.register("ml")}
            style={{ direction: "ltr", textAlign: "right" }}
          />
          <label>وزن:</label>
          <input
            type="text"
            {...props.register("weight")}
            style={{ direction: "ltr", textAlign: "right" }}
          />
          <label>گروپ:</label>
          <ControlledSelect
            control={props.control}
            name="pharm_group"
            options={props.pharmGroup}
            placeholder=""
            getOptionLabel={(option) =>
              `${option.name_english} - ${option.name_persian}`
            }
            getOptionValue={(option) => option.id}
            uniqueKey={`medicine-unigue${props.pharmGroup}`}
            defaultValue={props.pharmGroup?.find((c) =>
              c.id === props.medicine.pharm_group ? c.name_english : null
            )}
            NewComponent={
              <MedicinesLists
                title="لست ها"
                activeKey="pharm-groups"
                button="plus"
                name="ثبت دوا"
              />
            }
          />
          <label>نوع:</label>
          <div
            style={{
              marginLeft: "0.5rem",
            }}
          >
            <ControlledSelect
              control={props.control}
              name="kind"
              options={props.kind}
              placeholder=""
              getOptionLabel={(option) =>
                `${option.name_english} - ${option.name_persian}`
              }
              getOptionValue={(option) => option.id}
              uniqueKey={`medicine-unigue${props.kind}`}
              defaultValue={props.kind?.find((c) =>
                c.id === props.medicine?.kind ? c.name_english : null
              )}
              NewComponent={
                <MedicinesLists
                  title="لست ها"
                  activeKey="kinds"
                  button="plus"
                  name="ثبت دوا"
                />
              }
            />
          </div>
          <label>کشور:</label>
          <div
            style={{
              marginLeft: "0.5rem",
            }}
          >
            <ControlledSelect
              control={props.control}
              name="country"
              options={props.country}
              placeholder=""
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              uniqueKey={`medicine-unigue${props.country}`}
              defaultValue={props.country?.find((c) =>
                c.id === props.medicine?.country ? c.name : null
              )}
              NewComponent={
                <MedicinesLists
                  title="لست ها"
                  activeKey="countries"
                  button="plus"
                  name="ثبت دوا"
                />
              }
            />
          </div>
          <label>کمپنی:</label>
          <div
            style={{
              marginLeft: "0.5rem",
            }}
          >
            <ControlledSelect
              control={props.control}
              name="big_company"
              options={props.bigCompany}
              placeholder=""
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              uniqueKey={`medicine-unigue${props.bigCompany}`}
              defaultValue={props.bigCompany?.find((c) =>
                c.id === props.medicine?.big_company ? c.name : null
              )}
              NewComponent={
                <MedicinesLists
                  title="لست ها"
                  activeKey="big-companies"
                  button="plus"
                  name="ثبت دوا"
                />
              }
            />
          </div>
          <label>قیمت:</label>
          <input
            type="text"
            className={props.errors?.price ? "error-input" : ""}
            {...props.register("price", { required: true })}
          />
          <label>مکان:</label>
          <input
            type="text"
            {...props.register("location")}
            style={{ direction: "ltr", textAlign: "right" }}
          />
          <label>حداقل:</label>
          <input type="text" {...props.register("minmum_existence")} />
          <label>حداکثر:</label>
          <input type="text" {...props.register("maximum_existence")} />
          <label>ت.پاکت:</label>
          <input type="text" {...props.register("no_pocket")} />
          <label>ت.قطی:</label>
          <input type="text" {...props.register("no_box")} />

          <div className="approving-box">
            <label>فعال:</label>
            <input
              type="checkbox"
              className="must-advised-input"
              {...props.register("active")}
            />
            <label>توصیه_حتمی:</label>
            <input
              type="checkbox"
              className="must-advised-input"
              {...props.register("must_advised")}
            />
            <label>توصیه_مریض:</label>
            <input
              type="checkbox"
              className="must-advised-input"
              {...props.register("patient_approved")}
            />
            <label>توصیه_داکتر:</label>
            <input
              type="checkbox"
              className="must-advised-input"
              {...props.register("doctor_approved")}
            />
          </div>
          <label>اخطاریه:</label>
          <input {...props.register("cautions")} />
          <label>استفاده:</label>
          <input {...props.register("usages")} />
          <label>سنجاق:</label>
          <Select
            styles={SelectInputStyle}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            options={props.department}
            isMulti
            defaultValue={results ? results : ""}
            onChange={(e) =>
              props.setValue(
                "department",
                e.map((e) => {
                  return [e.id ? e.id : ""];
                })
              )
            }
          />
          <label>انقضا:</label>
          <input type="text" {...props.register("min_expire_date")} />
          <label>توضیحات:</label>
          <input {...props.register("description")} />
          <label>دارو.همراه:</label>
          <AdditionalMedicine medicine={props?.medicine} />
          <label>بارکد:</label>
          {props.medicine.id ? (
            <MultipleBarcode medicineID={props.medicine.id} />
          ) : (
            <input
              type="text"
              style={{ direction: "ltr", textAlign: "right" }}
              disabled
            />
          )}
          <label>عکس:</label>
          <div className="flex">
            <input
              type="file"
              className="medician-image-field"
              onChange={(e) => {
                props.setValue("image", e.target.files[0]);
                props.setImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <form tabIndex={-1}>
              <WebCamModal
                medician={props.watch("brand_name")}
                setFile={(data) => {
                  props.setValue("image", data),
                    props.setImage(URL.createObjectURL(data));
                }}
                tabIndex={-1}
              />
            </form>
          </div>
          <label>نمایش:</label>
          {props.imagePreview && (
            <div className="flex">
              <div className="image-preview-text">
                <h5>filename</h5>
                <h5>
                  {props.watch("image")?.name
                    ? props.watch("image")?.name
                    : props.watch("brand_name")}
                </h5>
              </div>
              <div
                className="modal-close-btn"
                onClick={() => {
                  props.reset({
                    image: "",
                  });
                  props.setImage("");
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
              <img
                src={props.imagePreview ? props.imagePreview : ""}
                className="image-preview"
              />
            </div>
          )}
        </div>
      </form>
    </>
  );
}
