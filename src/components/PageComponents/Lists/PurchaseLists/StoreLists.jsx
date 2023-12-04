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

export default function StoreList() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [filter, setFilter] = useState({
    name: "",
  });

  const user = useAuthUser();

  const { register, handleSubmit, reset } = useForm();

  const { mutateAsync: newStore } = useMutation({
    mutationFn: (data) => postDataFn(data, "store/"),
    onSuccess: () =>
      successFn([storeQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditStore } = useMutation({
    mutationFn: (data) => putDataFn(data, `store/${editItem.id}/`),
    onSuccess: () =>
      successFn([storeQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deleteStore } = useMutation({
    mutationFn: (id) => deleteDataFn(`store/${id}/`),
    onSuccess: () =>
      successFn([storeQuery], () => {
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
      phone: item.phone ? item.phone : "",
      address: item.address ? item.address : "",
      responsible: item.responsible ? item.responsible : "",
      description: item.description ? item.description : "",
    });
    setEditItem(item);
  };

  const ResetForm = () => {
    reset({
      name: "",
      phone: "",
      address: "",
      responsible: "",
      description: "",
    });
    setEditItem("");
  };

  let storeQuery = `store/?name=${filter.name}`;
  const { data: stores } = useQuery([storeQuery]);

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
            <h4>مسئول</h4>
            <h4>بیشتر</h4>
          </ListHeader>
          <ListMap>
            {stores?.map((store, key) => (
              <div className="patient-list-item">
                <h4>{key + 1}</h4>
                <h4>{store.name}</h4>
                <h4>{store.responsible}</h4>
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setActive("edit");
                      FormResetToItem(store);
                    }}
                  />
                  <DeleteButton
                    Func={() => {
                      deleteStore(store.id);
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
            <label>شماره:</label>
            <input type="text" {...register("phone")} />
            <label>آدرس:</label>
            <input type="text" {...register("address")} />
            <label>مسئول:</label>
            <input type="text" {...register("responsible")} />
            <label>توضیحات:</label>
            <input type="text" {...register("description")} />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newStore}
            reset={reset}
          />
        </>
      );
    case "edit":
      return (
        <>
          <Form>
            <label>نام:</label>
            <input type="text" {...register("name")} />
            <label>شماره:</label>
            <input type="text" {...register("phone")} />
            <label>آدرس:</label>
            <input type="text" {...register("address")} />
            <label>مسئول:</label>
            <input type="text" {...register("responsible")} />
            <label>توضیحات:</label>
            <input type="text" {...register("description")} />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditStore}
            reset={reset}
          />
        </>
      );
  }
}
