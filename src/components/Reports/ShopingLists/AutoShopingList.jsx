import { useRef, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  FilterModal,
  FilterSelect,
} from "../../PageComponents/ListingComponents";
import axios from "axios";


export default function AutoShopingList() {
  const ListFilterRef = useRef(null);
  const [filter, setFilter] = useState({
    shorted: "",
  });

  let AutoShopingQuery = `purchase-list/?shorted=${filter.shorted}`;
  const { data: autoShopingList } = useQuery([AutoShopingQuery]);

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

  const headers = [
    {label: 'id', key: 'id'},
    {label: 'دارو', key: 'medicine_full'},
    {label: 'نیازمندی', key: 'quantity'},
    {label: 'موجودیت', key: 'existence'},
    {label: 'شارت؟', key: 'shorted'},
    {label: '1_کمپنی', key: 'details[0].entrance__company__name'},
    {label: '1_مارکت', key: 'details[0].entrance__company__market__name'},
    {label: '1_قیمت', key: 'details[0].each_price'},
    {label: '1_واحد', key: 'details[0].entrance__currency__name'},
    {label: '1_بونوس', key: 'details[0].quantity_bonus'},
    {label: '1_تاریخ', key: 'details[0].timestamp'},
    {label: '1_نوعیت', key: 'details[0].entrance__wholesale'},
    {label: '2_کمپنی', key: 'details[1].entrance__company__name'},
    {label: '2_مارکت', key: 'details[1].entrance__company__market__name'},
    {label: '2_قیمت', key: 'details[1].each_price'},
    {label: '2_واحد', key: 'details[1].entrance__currency__name'},
    {label: '2_بونوس', key: 'details[1].quantity_bonus'},
    {label: '2_تاریخ', key: 'details[1].timestamp'},
    {label: '2_نوعیت', key: 'details[1].entrance__wholesale'},
    {label: '3_کمپنی', key: 'details[2].entrance__company__name'},
    {label: '3_مارکت', key: 'details[2].entrance__company__market__name'},
    {label: '3_قیمت', key: 'details[2].each_price'},
    {label: '3_واحد', key: 'details[2].entrance__currency__name'},
    {label: '3_بونوس', key: 'details[2].quantity_bonus'},
    {label: '3_تاریخ', key: 'details[2].timestamp'},
    {label: '3_نوعیت', key: 'details[2].entrance__wholesale'},
    
  ]

  return (
    <>
      <FilterModal
        excel_data={autoShopingList?.results}
        headers={headers}
        current={ListFilterRef.current}
        ListFilterRef={ListFilterRef}
      >
        <FilterSelect
          label="شارت"
          value={filter.persian_name}
          autoFocus={true}
          handleChange={(e) =>
            setFilter({ ...filter, shorted: e.target.value })
          }
        >
          <option value=""></option>
          <option value={true}>بله</option>
          <option value={false}>خیر</option>
        </FilterSelect>
      </FilterModal>
      <div className="auto-shop-box">
        <div className="auto-shop-header">
          <h5>No</h5>
          <h5>Medicine</h5>
          <h5>Need</h5>
          <h5>existence</h5>
          <h5>Company-1</h5>
          <h5>Market-1</h5>
          <h5>Price-1</h5>
          <h5>Bonus-1</h5>
          <h5>date-1</h5>
          <h5>Whole?</h5>
          <h5>Company-2</h5>
          <h5>Market-2</h5>
          <h5>Price-2</h5>
          <h5>Bonus-2</h5>
          <h5>date-2</h5>
          <h5>Whole?</h5>
          <h5>Company-3</h5>
          <h5>Market-3</h5>
          <h5>Price-3</h5>
          <h5>Bonus-3</h5>
          <h5>date-3</h5>
          <h5>Whole?</h5>
          <h5>Shorted?</h5>
        </div>
        {autoShopingList?.results.map((shopItem, num) => (
          <AutoShopItem shopItem={shopItem} num={num}></AutoShopItem>
        ))}
      </div>
    </>
  );
}

async function loadEnvVariables(key) {
  try {
      const response = await fetch('/env.json');
      const data = await response.json();
      return data[key] || null; // Return the value corresponding to the provided key, or null if not found
  } catch (error) {
      console.error('Error loading environment variables:', error);
      return null; // Return null if there's an error
  }
}

function AutoShopItem(props) {
  const [shorted, setShorted] = useState(props.shopItem?.shorted);

  useEffect(() => {
    setShorted(props.shopItem?.shorted);
  }, [props.shopItem?.shorted]);

  const [API_URL, setAUTH_URL] = useState('');
  useEffect(() => {
    loadEnvVariables('VITE_API')
      .then(apiValue => {
        setAUTH_URL(apiValue);
      })
      .catch(error => {
        console.error('Error loading VITE_API:', error);
      });
  }, []);


  const MedicineUpdate = () => {
    const MedicineForm = new FormData();
    MedicineForm.append("shorted", shorted);
    axios
      .patch(API_URL + "medician/" + props.shopItem.id + "/", MedicineForm)
      .then((res) => {
        toast.success("ذخیره شد");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="auto-shop-items-box"
      ref={props.listRef}
      key={props.shopItem.id}
    >
      <h5>{props.num + 1}</h5>
      <h5>{props.shopItem.medicine_full}</h5>
      <h5>{props.shopItem.quantity}</h5>
      <h5>{props.shopItem.existence}</h5>
      <h5>
        {props.shopItem.details[0] &&
          props.shopItem.details[0].entrance__company__name}
      </h5>
      <h5>
        {props.shopItem.details[0] &&
          props.shopItem.details[0].entrance__company__market__name}
      </h5>
      <h5>
        {props.shopItem.details[0] && props.shopItem.details[0].each_price}
      </h5>
      <h5>
        {props.shopItem.details[0] && props.shopItem.details[0].quantity_bonus}
      </h5>
      <h5>
        {props.shopItem.details[0] &&
          props.shopItem.details[0].timestamp.slice(2, 10)}
      </h5>
      <h5>
        {props.shopItem.details[0] &&
          (props.shopItem.details[0].entrance__wholesale == "WHOLESALE"
            ? "عمده"
            : props.shopItem.details[0].entrance__wholesale == "SINGULAR"
            ? "پرچون"
            : "")}
      </h5>
      <h5>
        {props.shopItem.details[1] &&
          props.shopItem.details[1].entrance__company__name}
      </h5>
      <h5>
        {props.shopItem.details[1] &&
          props.shopItem.details[1].entrance__company__market__name}
      </h5>
      <h5>
        {props.shopItem.details[1] && props.shopItem.details[1].each_price}
      </h5>
      <h5>
        {props.shopItem.details[1] && props.shopItem.details[1].quantity_bonus}
      </h5>
      <h5>
        {props.shopItem.details[1] &&
          props.shopItem.details[1].timestamp.slice(2, 10)}
      </h5>
      <h5>
        {props.shopItem.details[1] &&
          (props.shopItem.details[1].entrance__wholesale == "WHOLESALE"
            ? "عمده"
            : props.shopItem.details[0].entrance__wholesale == "SINGULAR"
            ? "پرچون"
            : "")}
      </h5>
      <h5>
        {props.shopItem.details[2] &&
          props.shopItem.details[2].entrance__company__name}
      </h5>
      <h5>
        {props.shopItem.details[2] &&
          props.shopItem.details[2].entrance__company__market__name}
      </h5>
      <h5>
        {props.shopItem.details[2] && props.shopItem.details[2].each_price}
      </h5>
      <h5>
        {props.shopItem.details[2] && props.shopItem.details[2].quantity_bonus}
      </h5>
      <h5>
        {props.shopItem.details[2] &&
          props.shopItem.details[2].timestamp.slice(2, 10)}
      </h5>
      <h5>
        {props.shopItem.details[2] &&
          (props.shopItem.details[2].entrance__wholesale == "WHOLESALE"
            ? "عمده"
            : props.shopItem.details[0].entrance__wholesale == "SINGULAR"
            ? "پرچون"
            : "")}
      </h5>
      <input
        type="checkbox"
        onChange={(e) => {
          setShorted(e.target.checked);
        }}
        checked={shorted}
        onBlurCapture={() => {
          MedicineUpdate();
        }}
      ></input>
    </div>
  );
}
