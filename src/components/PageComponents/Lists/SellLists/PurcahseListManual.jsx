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
  patchDataFn,
} from "../../../services/API";
import { toast } from "react-toastify";
import {
  Form,
  ListFooter,
  ListHeader,
  ListMap,
  FilterModal,
  FilterInput,
  FilterDate,
  FilterSelect,
} from "../../ListingComponents";
import { SelectMedician } from "../../../Medician/SelectMedicine/SelectMedician";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

function PurchaseListItem(props) {
  const { register, handleSubmit } = useForm();
  const { mutateAsync: handleArrival } = useMutation({
    mutationFn: (data) =>
      patchDataFn(data, `purchase-list-manual/${props.purchase.id}/`),
    onSuccess: () =>
      successFn([""], () => {
        // setActive("list");
      }),
  });

  return (
    <div className="patient-list-item-purchase">
      <h4>{props.keyer + 1}</h4>
      <h4>{props.purchase.medicine_full}</h4>
      <h4>{props.purchase.existence}</h4>
      <h4>{props.purchase.quantity}</h4>
      <input
        type="text"
        className="transparent-inputs"
        defaultValue={props.purchase.arrival}
        {...register("arrival")}
        onBlur={handleSubmit(handleArrival)}
      />
      <div className="flex">
        <InfoButton
          Func={() => {
            props.setActive("edit");
            props.FormResetToItem(props.purchase);
          }}
        />
        <DeleteButton
          Func={() => {
            props.deletePurchase(props.purchase.id);
          }}
        />
      </div>
    </div>
  );
}

function isValidDate(dateString) {
  // Attempt to create a new Date object from the provided string
  const date = new Date(dateString);

  // Check if the new Date object is valid
  // and if the provided string does not contain non-numeric characters
  return !isNaN(date) && !isNaN(Date.parse(dateString));
}

export default function PurchaseListManual({ selectedMedicine }) {

  const currendDate = new Date()
  currendDate.setDate(currendDate.getDate() + 1)
  const tomorrow = currendDate.toISOString().substring(0,10)
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [filter, setFilter] = useState({
    created: new Date().toISOString().substring(0, 10),
    approved: false,
    createdAfter: new Date().toISOString().substring(0, 10),
    createdAfterTime: new Date().setHours(0, 0, 0, 0),
    createdBeforeTime: new Date().setHours(0, 0, 0, 0),
    createdBefore: tomorrow
  });

  const combinedDateTimeAfter = () => {
    if (isValidDate(filter.createdAfterTime)) {
      const time = new Date(filter.createdAfterTime);
      return `${new Date(filter.createdAfter).toISOString().slice(0, 10)}T${time
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        .toUpperCase()}`;
    } else if (isValidDate(filter.createdAfter)){
      return `${new Date(filter.createdAfter).toISOString().slice(0, 10)}T00:00:00`;
    } else {
      return ''
    }
  };
  const combinedDateTimeBefore = () => {
    if (isValidDate(filter.createdBeforeTime)) {
      const time = new Date(filter.createdBeforeTime);
      return `${new Date(filter.createdBefore).toISOString().slice(0, 10)}T${time
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        .toUpperCase()}`;
      } else if (isValidDate(filter.createdBefore)){
        return `${new Date(filter.createdBefore).toISOString().slice(0, 10)}T00:00:00`;
      } else {
        return ''
      }
  };

  const user = useAuthUser();

  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const { mutateAsync: newPurchaselist } = useMutation({
    mutationFn: (data) => postDataFn(data, "purchase-list-manual/"),
    onSuccess: () =>
      successFn([PurchaseQuery], () => {
        setActive("list");
      }),
    onError: () => toast.error("این دوا قبلا به لست خرید اضافه شده است"),
  });

  const { mutateAsync: handleEditPurchase } = useMutation({
    mutationFn: (data) =>
      putDataFn(data, `purchase-list-manual/${editItem.id}/`),
    onSuccess: () =>
      successFn([PurchaseQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deletePurchase } = useMutation({
    mutationFn: (id) => deleteDataFn(`purchase-list-manual/${id}/`),
    onSuccess: () =>
      successFn([PurchaseQuery], () => {
        setActive("list");
      }),
    onError: (e) => {
      console.log(e.response);
      toast.error(`نسخه های قبلی را حذف نموده دوباره سعی کنید`);
    },
  });

  useEffect(() => {
    selectedMedicine && setActive("new");
    selectedMedicine &&
      reset({
        medicine: selectedMedicine?.id,
      });
  }, [selectedMedicine]);

  const FormResetToItem = (item) => {
    reset({
      medicine: item.medicine ? item.medicine : "",
      medicine_full: item.medicine_full ? item.medicine_full : "",
      existence: item.existence ? item.existence : "",
      quantity: item.quantity ? item.quantity : "",
      arrival: item.arrival ? item.arrival : "",
    });
    setEditItem(item);
  };

  const ResetForm = () => {
    reset({
      medicine: "",
      existence: "",
      quantity: "",
      arrival: "",
    });
    setEditItem("");
  };

  let PurchaseQuery = `purchase-list-manual/?approved=${filter.approved}&created_after=${combinedDateTimeAfter()}&created_before=${combinedDateTimeBefore()}`;
  const { data: Purchases } = useQuery([PurchaseQuery]);

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

  const selectMedicineRef = useRef(null);

  const handleMedicineSelect = (data) => {
    setValue("medicine", data.id);
    selectMedicineRef.current.Closer();
  };

  switch (active) {
    case "list":
      return (
        <>
          <FilterModal
            current={ListFilterRef.current}
            ListFilterRef={ListFilterRef}
            url={PurchaseQuery}
            fileName={new Date().toISOString().slice(0, 10) + "purchase-list"}
          >
            <FilterSelect
              label="خریداری.شده"
              value={filter.approved}
              autoFocus={true}
              handleChange={(e) =>
                setFilter({ ...filter, approved: e.target.value })
              }
            >
              <option value=""></option>
              <option value={false}>نخیر</option>
              <option value={true}>بله</option>
            </FilterSelect>

            <FilterDate
              label="از تاریخ:"
              value={filter.createdAfter}
              autoFocus={true}
              handleChange={(e) =>
                setFilter({ ...filter, createdAfter: e.target.value })
              }
              />
              <label>ساعت:</label>
            <Datetime
              value={filter.createdAfterTime}
              onChange={(e) => setFilter({ ...filter, createdAfterTime: e})}
              dateFormat={false}
              timeFormat="hh:mm A"
              />
            <FilterDate
              label="تا تاریخ:"
              value={filter.createdBefore}
              autoFocus={true}
              handleChange={(e) =>
                setFilter({ ...filter, createdBefore: e.target.value })
              }
              />
              <div>ساعت:</div>
            <Datetime
              value={filter.createdBeforeTime}
              onChange={(e) => setFilter({ ...filter, createdBeforeTime: e})}
              dateFormat={false}
              timeFormat="hh:mm A"
              />
              <b></b>
              <b></b>
              <b></b>
              <b></b>
          </FilterModal>
          <div className="patient-list-header-purchase">
            <h4>No</h4>
            <h4>دوا</h4>
            <h4>تعداد موجود</h4>
            <h4>تعداد نیاز</h4>
            <h4>خرید شده</h4>
            <h4>بیشتر</h4>
          </div>
          <ListMap>
            {Purchases?.map((purchase, keyer) => (
              <PurchaseListItem
                setActive={setActive}
                deletePurchase={deletePurchase}
                FormResetToItem={FormResetToItem}
                purchase={purchase}
                keyer={keyer}
                key={purchase.id}
              ></PurchaseListItem>
            ))}
          </ListMap>
          <ListFooter setActive={setActive} reset={reset} user={user} />
        </>
      );
    case "new":
      () => setEditItem("");
      return (
        <>
          <Form>
            <label>نام:</label>
            <SelectMedician
              selectAutoCompleteData={handleMedicineSelect}
              ref={selectMedicineRef}
              purchaseMedicine={selectedMedicine}
            />
            <label>تعداد_مورد_نیاز:</label>
            <input type="text" {...register("quantity")} />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newPurchaselist}
            reset={reset}
          />
        </>
      );
    case "edit":
      return (
        <>
          <Form>
            <label>تعداد_مورد_نیاز:</label>
            <input type="text" {...register("quantity")} />
            <h3></h3>
            <h3>{watch("medicine_full")}</h3>
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditPurchase}
            reset={reset}
          />
        </>
      );
  }
}
