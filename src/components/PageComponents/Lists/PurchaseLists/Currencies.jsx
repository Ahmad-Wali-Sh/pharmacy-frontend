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

export default function Currencies() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [filter, setFilter] = useState({
    name: "",
  });

  const user = useAuthUser();

  const { register, handleSubmit, reset } = useForm();

  const { mutateAsync: newCurrency } = useMutation({
    mutationFn: (data) => postDataFn(data, "currency/"),
    onSuccess: () =>
      successFn([currencyQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditCurrency } = useMutation({
    mutationFn: (data) => putDataFn(data, `currency/${editItem.id}/`),
    onSuccess: () =>
      successFn([currencyQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deleteCurrency } = useMutation({
    mutationFn: (id) => deleteDataFn(`currency/${id}/`),
    onSuccess: () =>
      successFn([currencyQuery], () => {
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
      rate: item.rate ? item.rate : "",
      description: item.description ? item.description : "",
    });
    setEditItem(item);
  };

  const ResetForm = () => {
    reset({
      name: "",
      rate: "",
      description: "",
    });
    setEditItem("");
  };

  let currencyQuery = `currency/`;
  const { data: currencies } = useQuery([currencyQuery]);

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
            <h4>نرخ</h4>
            <h4>بیشتر</h4>
          </ListHeader>
          <ListMap>
            {currencies?.map((currency, key) => (
              <div className="patient-list-item">
                <h4>{key + 1}</h4>
                <h4>{currency.name}</h4>
                <h4>{currency.rate}</h4>
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setActive("edit");
                      FormResetToItem(currency);
                    }}
                  />
                  <DeleteButton
                    Func={() => {
                      deleteCurrency(currency.id);
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
          <Form>
            <label>نام:</label>
            <input type="text" {...register("name")} />
            <label>نرخ:</label>
            <input type="text" {...register("rate")} />
            <label>توضیحات:</label>
            <input type="text" {...register("description")} />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newCurrency}
            reset={reset}
          />
        </>
      );
    case "edit":
      return (
        <>
          <Form>
          <label>نام:</label>
            <input type="text" disabled={editItem?.name == 'AFN' ? true : false} {...register("name")} />
            <label>نرخ:</label>
            <input type="text" disabled={editItem?.name == 'AFN' ? true : false} {...register("rate")} />
            <label>توضیحات:</label>
            <input type="text" {...register("description")} />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditCurrency}
            reset={reset}
          />
        </>
      );
  }
}
