import { useRef, useState, useEffect } from "react";
import { InfoButton } from "../../Buttons/Buttons";
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
  ListFooter,
  ListHeader,
  ListMap,
  FilterModal,
  FilterInput,
} from "../SellLists/ListingComponents";
import ControlledSelect from "../../ControlledSelect";
import PharmGroup from "../../../Medician/PharmGroup";
import Kind from "../../../Medician/Kind";
import Country from "../../../Medician/Country";
import WebCamModal from "../../WebCamModal";
import "react-image-upload/dist/index.css";
import axios from "axios";



export default function MedicineList() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [imagePreview, setImage] = useState("");
  const [filter, setFilter] = useState({
    brand_name: "",
    generic_name: "",
    ml: "",
    kind_english: "",
    kind_persian: "",
    country: "",
    company: "",
    page: 1
  });

  const user = useAuthUser();

  const { register, handleSubmit, reset, control, setValue, watch, getValues } =
    useForm();

  const { mutateAsync: newMedicine } = useMutation({
    mutationFn: (data) => postDataFn(data, "medician/"),
    onSuccess: () =>
      successFn([medicineQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditMedicine } = useMutation({
    mutationFn: (data) => putDataFn(data, `medician/${editItem.id}/`),
    onSuccess: () =>
      successFn([medicineQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deleteMedicine } = useMutation({
    mutationFn: (id) => deleteDataFn(`medician/${id}/`),
    onSuccess: () =>
      successFn([medicineQuery], () => {
        setActive("list");
      }),
    onError: (e) => {
      console.log(e.response);
      toast.error(`نسخه های قبلی را حذف نموده دوباره سعی کنید`);
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

  const FormResetToItem = (item) => {
    reset({
      id: item.id ? item.id : "",
      brand_name: item.brand_name ? item.brand_name : "",
      generic_name: item.generic_name ? item.generic_name : "",
      barcode: item.barcode ? item.barcode : "",
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
      pharm_group: item.pharm_group ? item.pharm_group : "",
      kind: item.kind ? item.kind : "",
      country: item.country ? item.country : "",
      department: item.department ? item.department : "",
      big_company: item.big_company ? item.big_company : "",
    });
    axios(item.image)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File(
          [blob],
          item.medicine_full ? item.medicine_full + ".jpeg" : "no_name.jpeg",
          { type: blob.type }
        );
        reset({
          image: file ? file : ''
        });
        console.log(file)
      });

    setEditItem(item);
    setImage(item.image ? new URL(item.image).pathname.slice(16) : "");
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
      pharm_group: "",
      kind: "",
      country: "",
      department: "",
      big_company: "",
    });
    setEditItem("");
    setImage("");
  };

  console.log(filter)

  let medicineQuery = `medician/?brand_name=${filter.brand_name}&search=${filter.generic_name}&ml=${filter.ml}&kind__name_persian=${filter.kind_persian}&kind__name_english=${filter.kind_english}&country__name=${filter.country}&big_company__name=${filter.company}&page=${filter.page}`;
  const { data: medicines } = useQuery([medicineQuery]);

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
              label="موثریت"
              value={filter.ml}
              handleChange={(e) =>
                setFilter({ ...filter, ml: e.target.value })
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
              label="کشور"
              value={filter.country}
              handleChange={(e) =>
                setFilter({ ...filter, country: e.target.value })
              }
            />
            <FilterInput
              label="کمپنی"
              value={filter.company}
              handleChange={(e) =>
                setFilter({ ...filter, company: e.target.value })
              }
            />
          </FilterModal>
          <ListHeader>
            <h4>آی دی</h4>
            <h4>نام برند</h4>
            <h4></h4>
            <h4>ترکیب</h4>
            <h4></h4>
            <h4>نوع</h4>
            <h4>موثریت</h4>
            <h4>کشور</h4>
            <h4>مکان</h4>
            <h4>قیمت</h4>
            <h4>بیشتر</h4>
          </ListHeader>
          <ListMap>
            {medicines?.results.map((medicine, key) => (
              <div className="patient-list-item-medi">
                <h4>{medicine.id}</h4>
                <h5>{medicine.brand_name}</h5>
                <h5></h5>
                <h5>{medicine.generic_name}</h5>
                <h5></h5>
                <h5>{medicine.kind_name}</h5>
                <h5>{medicine.ml}</h5>
                <h5>{medicine.country_name}</h5>
                <h5>{medicine.location}</h5>
                <h5>{medicine.price}</h5>
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setActive("edit");
                      FormResetToItem(medicine);
                      setEditItem(medicine);
                    }}
                  />
                </div>
              </div>
            ))}
          </ListMap>
          <ListFooter setActive={setActive} reset={reset} user={user} filter={filter} setFilter={setFilter} medicines={medicines}/>
        </>
      );
    case "new":
      () => setEditItem("");
      return (
        <>
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
          />
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newMedicine}
            reset={reset}
          />
        </>
      );
    case "edit":
      return (
        <>
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
          />
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditMedicine}
            reset={reset}
          />
        </>
      );
  }
}


function MedicineForm(props) {
  return (
    <form>
      <div className="listing-form">
        <label>نام برند:</label>
        <input type="text" {...props.register("brand_name")} />
        <label>ترکیب:</label>
        <input type="text" {...props.register("generic_name")} />
        <label>موثریت:</label>
        <input type="text" {...props.register("ml")} />
        <label>وزن:</label>
        <input type="text" {...props.register("weight")} />
        <label>گروپ:</label>
        <ControlledSelect
          control={props.control}
          name="pharm_group"
          options={props.pharmGroup}
          placeholder=""
          getOptionLabel={(option) => option.name_english}
          getOptionValue={(option) => option.id}
          uniqueKey={`medicine-unigue${props.pharmGroup}`}
          defaultValue={props.pharmGroup?.find((c) =>
            c.id === props.medicine.pharm_group ? c.name_english : null
          )}
          NewComponent={<PharmGroup button={2} />}
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
            getOptionLabel={(option) => option.name_english}
            getOptionValue={(option) => option.id}
            uniqueKey={`medicine-unigue${props.kind}`}
            defaultValue={props.kind?.find((c) =>
              c.id === props.medicine?.kind ? c.name_english : null
            )}
            NewComponent={<Kind button={2} />}
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
            NewComponent={<Country button={2} />}
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
            NewComponent={<Country button={2} />}
          />
        </div>
        <label>قیمت:</label>
        <input type="text" {...props.register("price")} />
        <label>مکان:</label>
        <input type="text" {...props.register("location")} />
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
        <label>دیپارتمنت:</label>
        <select className="text-input-standard" {...props.register("medicine")}>
          <option></option>
        </select>
        <label>انقضا:</label>
        <input type="text" {...props.register("min_expire_date")} />
        <label>توضیحات:</label>
        <input {...props.register("description")} />
        <label>سهمیه:</label>
        <input {...props.register("dividing_rules")} />
        <label>بارکد:</label>
        <input type="text" {...props.register("barcode")} />
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
  );
}