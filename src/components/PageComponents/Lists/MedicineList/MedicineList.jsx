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
} from "../SellLists/ListingComponents";
import ControlledSelect from "../../ControlledSelect";
import PharmGroup from "../../../Medician/PharmGroup";
import Kind from "../../../Medician/Kind";
import Country from "../../../Medician/Country";
import WebCamModal from "../../WebCamModal";
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'


export default function MedicineList() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [filter, setFilter] = useState({
    id: "",
    name: "",
    contact_number: "",
    expertise: "",
  });

  const user = useAuthUser();

  const { register, handleSubmit, reset, control, setValue } = useForm();

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
    queryKey: ['pharm-groub/']
  })
  const { data: kind } = useQuery({
    queryKey: ['kind/']
  })
  const { data: country } = useQuery({
    queryKey: ['country/']
  })
  const { data: medicine } = useQuery({
    queryKey: ['medicine/']
  })
  const { data: bigCompany } = useQuery({
    queryKey: ['big-company/']
  })

  const FormResetToItem = (item) => {
    reset({
      name: item.name ? item.name : "",
      over_price_money: item.over_price_money ? item.over_price_money : "",
      over_price_percent: item.over_price_percent
        ? item.over_price_percent
        : "",
      discount_money: item.discount_money ? item.discount_money : "",
      discount_percent: item.discount_percent ? item.discount_percent : "",
      celling_start: item.celling_start ? item.celling_start : "",
    });
    setEditItem(item);
  };

  const ResetForm = () => {
    reset({
      name: "",
      over_price_money: "",
      over_price_percent: "",
      discount_money: "",
      discount_percent: "",
      celling_start: "",
    });
    setEditItem("");
  };

  let medicineQuery = `medicine/?name=${filter.name}`;
  const { data: medicines } = useQuery(['medician/']);

  useEffect(() => {
    const handleKeyDowns = (e) => {
      console.log(e.key);
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
              label="نام"
              value={filter.name}
              autoFocus={true}
              handleChange={(e) =>
                setFilter({ ...filter, name: e.target.value })
              }
            />
          </FilterModal>
          <ListHeader>
            <h4>No</h4>
            <h4>نام</h4>
            <h4>حداکثر قیمت</h4>
            <h4>حداکثر "فیصدی"</h4>
            <h4>تخفیف</h4>
            <h4>تخفیف "فیصدی"</h4>
            <h4>شروع روند</h4>
            <h4>بیشتر</h4>
          </ListHeader>
          <ListMap>
            {medicines?.results.map((medicine, key) => (
              <div className="patient-list-item">
                <h4>{key + 1}</h4>
                <h5>{medicine.brand_name}</h5>
                <h5>{medicine.generic_name}</h5>
                <h5>{medicine.over_price_percent}</h5>
                <h5>{medicine.discount_money}</h5>
                <h5>{medicine.discount_percent}</h5>
                <h5>{medicine.celling_start}</h5>
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setActive("edit");
                      FormResetToItem(medicine);
                    }}
                  />
                  <DeleteButton
                    Func={() => {
                      deleteMedicine(medicine.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </ListMap>
          <ListFooter setActive={setActive} reset={reset} user={user} />
        </>
      );
    case "new":
      () => setEditItem("");
      return (
        <>
        <form >
            <div className="listing-form">
              <label>نام برند:</label>
              <input
                type="text"
                {...register("brand_name")}
              />
              <label>ترکیب:</label>
              <input
                type="text"
                {...register("generic_name")}
              />
              <label>موثریت:</label>
              <input
                type="text"
                {...register("ml")}
              />
              <label>وزن:</label>
              <input
                type="text"
                {...register("weight")}
              />
              <label>گروپ_دوایی:</label>
                <ControlledSelect
                  control={control}
                  name="pharm_group"
                  options={pharmGroup}
                  placeholder=""
                  getOptionLabel={(option) => option.name_english}
                  getOptionValue={(option) => option.id}
                  uniqueKey={`medicine-unigue${pharmGroup}`}
                //   defaultValue={pharmGroup?.find((c) =>
                //     c.id === medician?.pharm_group ? c.name_english : null
                //   )}
                  NewComponent={<PharmGroup button={2}  />}
                />
              <label>نوع:</label>
              <div style={{ marginLeft: "0.5rem" }}>
              <ControlledSelect
                  control={control}
                  name="kind"
                  options={kind}
                  placeholder=""
                  getOptionLabel={(option) => option.name_english}
                  getOptionValue={(option) => option.id}
                  uniqueKey={`medicine-unigue${kind}`}
                //   defaultValue={kind?.find((c) =>
                //     c.id === medician?.kind ? c.name_english : null
                //   )}
                  NewComponent={<Kind button={2} />}
                />
              </div>
              <label>کشور:</label>
              <div style={{ marginLeft: "0.5rem" }}>
              <ControlledSelect
                  control={control}
                  name="country"
                  options={country}
                  placeholder=""
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  uniqueKey={`medicine-unigue${country}`}
                //   defaultValue={country?.find((c) =>
                //     c.id === medician?.country ? c.name : null
                //   )}
                  NewComponent={<Country button={2}  />}
                />
              </div>
              <label>کمپنی:</label>
              <div style={{ marginLeft: "0.5rem" }}>
                <ControlledSelect
                  control={control}
                  name="big_company"
                  options={bigCompany}
                  placeholder=""
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  uniqueKey={`medicine-unigue${bigCompany}`}
                //   defaultValue={bigCompany?.find((c) =>
                //     c.id === medician?.big_company ? c.name : null
                //   )}
                  NewComponent={<Country button={2}  />}
                />
                </div>
              <label>قیمت:</label>
              <input
                type="text"
                {...register("price")}
              />
              <label>مکان:</label>
              <input
                type="text"
                {...register("location")}
              />
              <label>حداقل:</label>
              <input
                type="text"
                {...register("minmum_existence")}
              />
              <label>حداکثر:</label>
              <input
                type="text"
                {...register("maximum_existence")}
              />
              <label>ت.پاکت:</label>
              <input
                type="text"
                {...register("no_pocket")}
              />
              <label>ت.قطی:</label>
              <input
                type="text"
                {...register("no_box")}
              />

              <div className="approving-box">
                <label>فعال:</label>
                <input
                  type="checkbox"
                  className="must-advised-input"
                  {...register("active")}
                />
                <label>توصیه_حتمی:</label>
                <input
                  type="checkbox"
                  className="must-advised-input"
                  {...register("must_advised")}
                />
                <label>توصیه_مریض:</label>
                <input
                  type="checkbox"
                  className="must-advised-input"
                  {...register("patient_approved")}
                />
                <label>توصیه_داکتر:</label>
                <input
                  type="checkbox"
                  className="must-advised-input"
                  {...register("doctor_approved")}
                />
              </div>
              <label>اخطاریه:</label>
              <input
                {...register("cautions")}
              />
              <label>استفاده:</label>
              <input
                {...register("usages")}
              />
                <label>دیپارتمنت:</label>
                <select className="text-input-standard"
                  {...register("medicine")}
                >
                  <option></option>
                  {/* {medicine?.map((depart) => (
                    <option
                      selected={
                        medician &&
                        medician.medicine &&
                        medician.medicine == depart.id
                          ? "selected"
                          : ""
                      }
                      value={depart.id}
                    >
                      {depart.name}
                    </option>
                  ))} */}
                </select>
                <label>حداقل_انقضا:</label>
                <input
                  type="text"
                  {...register("min_expire_date")}
                />
              <label>توضیحات:</label>
              <input
                {...register("description")}
              />
              <label>سهمیه:</label>
              <input
                {...register("dividing_rules")}
              />
                <label>بارکد:</label>
                <input
                  type="text"
                  {...register("barcode")}
                />
                <label>عکس:</label>
                <div className="flex">
                  {/* <input
                    type="file"
                    className="medician-image-field"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                    /> */}
                    <ImageUploader onFileAdded={(img) => {
                        setValue('image', img.dataUrl)
                        console.log(img.dataUrl)
                        }} style={{ borderRadius: '1rem', backgroundColor: 'var(--color-three)'}}/>
                  <form tabIndex={-1}>
                    <WebCamModal
                    //   medician={medician}
                    //   setFile={WebComFileSeter}
                    tabIndex={-1}
                    />
                  </form>
                </div>
            </div>
        </form>
          
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
          <Form>
            <label>نام:</label>
            <input type="text" defaultValue="" {...register("name")} />
            <label>حداکثرقیمت:</label>
            <input
              type="text"
              defaultValue=""
              {...register("over_price_money")}
            />
            <label>حداکثرقیمت%:</label>
            <input
              type="text"
              defaultValue=""
              {...register("over_price_percent")}
            />
            <label>تخفیف:</label>
            <input
              type="text"
              defaultValue=""
              {...register("discount_money")}
            />
            <label>تخفیف%:</label>
            <input
              type="text"
              defaultValue=""
              {...register("discount_percent")}
            />
            <label>شروع‌روند:</label>
            <input type="text" defaultValue="" {...register("celling_start")} />
          </Form>
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


