import { useRef, useState, useEffect } from "react";
import { InfoButton, DeleteButton } from "../PageComponents/Buttons/Buttons";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import {
  postDataFn,
  successFn,
  putDataFn,
  deleteDataFn,
} from "../services/API";
import { toast } from "react-toastify";
import {
  Form,
  ListFooter,
  ListHeader,
  ListMap,
  FilterModal,
  FilterInput,
} from "../PageComponents/ListingComponents";

export default function JournalCategory() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [filter, setFilter] = useState({
    name: "",
    info: "",
  });

  const user = useAuthUser();

  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const { mutateAsync: newCategory } = useMutation({
    mutationFn: (data) => postDataFn(data, "journal-category/"),
    onSuccess: () =>
      successFn([CategoryQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditKind } = useMutation({
    mutationFn: (data) => putDataFn(data, `journal-category/${editItem.id}/`),
    onSuccess: () =>
      successFn([CategoryQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deleteKind } = useMutation({
    mutationFn: (id) => deleteDataFn(`journal-category/${id}/`),
    onSuccess: () =>
      successFn([CategoryQuery], () => {
        setActive("list");
      }),
    onError: (e) => {
      console.log(e.response);
      toast.error(`این بخش در روزنامچه استفاده شده است`);
    },
  });

  const FormResetToItem = (item) => {
    reset({
      name: item.name ? item.name : "",
      info: item.info ? item.info : "",
    });
    setEditItem(item);
  };

  const ResetForm = () => {
    reset({
      name: "",
      info: "",
    });
    setEditItem("");
  };

  let CategoryQuery = `journal-category/?name=${filter.name}&info=${filter.info}&ordering=id`;
  const { data: categories } = useQuery([CategoryQuery]);

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
            <FilterInput
              label="توضحیات"
              value={filter.info}
              handleChange={(e) =>
                setFilter({ ...filter, info: e.target.value })
              }
            />
          </FilterModal>
          <ListHeader>
            <h4>No</h4>
            <h4>نام</h4>
            <h4>توضیحات</h4>
            <h4>بیشتر</h4>
          </ListHeader>
          <div className="patient-list-box" ref={listRef}>
            {categories?.map((category, key) => (
              <div className="patient-list-item">
                <h4>{key + 1}</h4>
                <h4>{category.name}</h4>
                <h4>{category.info}</h4>
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setScrollPosition(listRef.current?.scrollTop);
                      setActive("edit");
                      FormResetToItem(category);
                    }}
                  />
                  <DeleteButton
                    Func={() => {
                      deleteKind(category.id);
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
            <label>توضیحات:</label>
            <input type="text" {...register("info")} />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newCategory}
            reset={reset}
          />
        </>
      );
    case "edit":
      return (
        <>
          <Form>
            <label>نام.انگلیسی:</label>
            <input type="text" {...register("name")} />
            <label>توضیحات:</label>
            <input type="text" {...register("info")} />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditKind}
            reset={reset}
          />
        </>
      );
  }
}
