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
import {
  Form,
  ListFooter,
  ListHeader,
  ListMap,
  FilterModal,
  FilterInput,
  FilterDate,
} from "../PageComponents/ListingComponents";
import ControlledSelect from "../PageComponents/ControlledSelect";
import useServerIP from "../services/ServerIP";
import axios from "axios";

export default function JournalEntry() {
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [filter, setFilter] = useState({
    related_user: "",
    amount: "",
    category__name: "",
    description: "",
    user: "",
    timestamp: formatDate(new Date()),
  });

  const { serverIP } = useServerIP();

  const { data: categories } = useQuery(["journal-category/"]);
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    serverIP &&
      axios.get(serverIP + "auth/users/").then((res) => {
        setUsers(res?.data);
      });
  }, [serverIP]);

  const user = useAuthUser();

  const { register, handleSubmit, reset, setValue, watch, control } = useForm();

  const { mutateAsync: newEntry } = useMutation({
    mutationFn: (data) => postDataFn(data, "journal-entry/"),
    onSuccess: () =>
      successFn([JournalQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditEntry } = useMutation({
    mutationFn: (data) => putDataFn(data, `journal-entry/${editItem.id}/`),
    onSuccess: () =>
      successFn([JournalQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deleteEntry } = useMutation({
    mutationFn: (id) => deleteDataFn(`journal-entry/${id}/`),
    onSuccess: () =>
      successFn([JournalQuery], () => {
        setActive("list");
      }),
    onError: (e) => {
      console.log(e.response);
    },
  });

  const FormResetToItem = (item) => {
    reset({
      related_user: item.related_user ? item.related_user : "",
      category: item.category ? item.category : "",
      amount: item.amount ? item.amount : "",
      description: item.description ? item.description : "",
    });
    setEditItem(item);
  };

  const ResetForm = () => {
    reset({
      related_user: "",
      category: "",
      amount: "",
      description: "",
    });
    setEditItem("");
  };

  let JournalQuery = `journal-entry/?timestamp=${
    filter.timestamp ? filter.timestamp : formatDate(new Date())
  }`;
  const { data: journalEntries } = useQuery([JournalQuery]);

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
            <FilterDate
              label="تاریخ"
              value={filter.timestamp}
              handleChange={(e) =>
                setFilter({ ...filter, timestamp: e.target.value })
              }
            />
          </FilterModal>
          <ListHeader>
            <h4>No</h4>
            <h4>مربوط به</h4>
            <h4>بخش</h4>
            <h4>مقدار</h4>
            <h4>توضیحات</h4>
            <h4>بیشتر</h4>
          </ListHeader>
          <div className="patient-list-box" ref={listRef}>
            {journalEntries?.map((entry, key) => (
              <div className="patient-list-item">
                <h4>{key + 1}</h4>
                <h4>{entry.related_user_name}</h4>
                <h4>{entry.category_name}</h4>
                <h4>{entry.amount}</h4>
                <h4>{entry.description}</h4>
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setScrollPosition(listRef.current?.scrollTop);
                      setActive("edit");
                      FormResetToItem(entry);
                    }}
                  />
                  <DeleteButton
                    Func={() => {
                      deleteEntry(entry.id);
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
            <label>مربوط به:</label>
            <div
              style={{
                width: "80%",
              }}
            >
              <ControlledSelect
                control={control}
                name="related_user"
                options={Users}
                placeholder=""
                getOptionLabel={(option) => option?.first_name}
                getOptionValue={(option) => option?.first_name}
                uniqueKey={`related_user${filter?.related_user}${Users}`}
                defaultValue={
                  Users?.find((c) =>
                    c.id == filter?.related_user ? c.first_name : ""
                  ) || new Date()
                }
              />
            </div>
            <label>بخش:</label>
            <div
              style={{
                width: "80%",
              }}
            >
              <ControlledSelect
                control={control}
                name="category"
                options={categories}
                placeholder=""
                getOptionLabel={(option) => `${option.name}`}
                getOptionValue={(option) => option.id}
                uniqueKey={`medicine-unigue${categories}`}
                defaultValue={categories?.find((c) =>
                  c.id === editItem?.category ? c.name : null
                )}
              />
            </div>
            <label>قیمت:</label>
            <input type="text" {...register("amount")} />
            <label>توضیحات:</label>
            <input type="text" {...register("description")} />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newEntry}
            reset={reset}
          />
        </>
      );
    case "edit":
      return (
        <>
          <Form>
            <label>مربوط به:</label>
            <div
              style={{
                width: "80%",
              }}
            >
              <ControlledSelect
                control={control}
                name="related_user"
                options={Users}
                placeholder=""
                getOptionLabel={(option) => option?.first_name}
                getOptionValue={(option) => option?.first_name}
                uniqueKey={`related_user${editItem?.related_user}${Users}`}
                defaultValue={
                  Users?.find((c) =>
                    c.id == editItem?.related_user ? c.first_name : ""
                  ) || new Date()
                }
              />
            </div>
            <label>بخش:</label>
            <div
              style={{
                width: "80%",
              }}
            >
              <ControlledSelect
                control={control}
                name="category"
                options={categories}
                placeholder=""
                getOptionLabel={(option) => `${option.name}`}
                getOptionValue={(option) => option.id}
                uniqueKey={`medicine-unigue${categories}`}
                defaultValue={categories?.find((c) =>
                  c.id === editItem?.category ? c.name : null
                )}
              />
            </div>
            <label>قیمت:</label>
            <input type="text" {...register("amount")} />
            <label>توضیحات:</label>
            <input type="text" {...register("description")} />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditEntry}
            reset={reset}
          />
        </>
      );
  }
}
