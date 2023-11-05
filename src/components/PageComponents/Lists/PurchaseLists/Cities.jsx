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

export default function CitiesLists() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [filter, setFilter] = useState({
    name: "",
  });

  const user = useAuthUser();

  const { register, handleSubmit, reset } = useForm();

  const { mutateAsync: newCity } = useMutation({
    mutationFn: (data) => postDataFn(data, "city/"),
    onSuccess: () =>
      successFn([cityQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditCity } = useMutation({
    mutationFn: (data) => putDataFn(data, `city/${editItem.id}/`),
    onSuccess: () =>
      successFn([cityQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deleteCity } = useMutation({
    mutationFn: (id) => deleteDataFn(`city/${id}/`),
    onSuccess: () =>
      successFn([cityQuery], () => {
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
    });
   setEditItem(item);
  };

  const ResetForm = () => {
    reset({
      name: "",
    });
    setEditItem("");
  };

  let cityQuery = `city/?name=${filter.name}`;
  const { data: cities } = useQuery([cityQuery]);

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
            <h4>بیشتر</h4>
          </ListHeader>
          <div className="patient-list-box" ref={listRef}>
            {cities?.map((city, key) => (
              <div className="patient-list-item">
                <h4>{key + 1}</h4>
                <h4>{city.name}</h4>
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setScrollPosition(listRef.current?.scrollTop)
                      setActive("edit");
                      FormResetToItem(city);
                    }}
                  />
                  <DeleteButton
                    Func={() => {
                      deleteCity(city.id);
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
          <Form>
            <label>نام:</label>
            <input type="text" {...register("name")} />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newCity}
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
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditCity}
            reset={reset}
          />
        </>
      );
  }
}
