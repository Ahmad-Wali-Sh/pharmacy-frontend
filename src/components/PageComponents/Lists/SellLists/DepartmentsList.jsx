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
} from "./ListingComponents";

export default function DepartmentsList() {
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

  const { register, handleSubmit, reset } = useForm();

  const { mutateAsync: newDepartment } = useMutation({
    mutationFn: (data) => postDataFn(data, "department/"),
    onSuccess: () =>
      successFn([departmentQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditDepartment } = useMutation({
    mutationFn: (data) => putDataFn(data, `department/${editItem.id}/`),
    onSuccess: () =>
      successFn([departmentQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deleteDepartment } = useMutation({
    mutationFn: (id) => deleteDataFn(`department/${id}/`),
    onSuccess: () =>
      successFn([departmentQuery], () => {
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

  let departmentQuery = `department/?name=${filter.name}`;
  const { data: departments } = useQuery([departmentQuery]);

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
            <h4>حداکثر قیمت</h4>
            <h4>حداکثر "فیصدی"</h4>
            <h4>تخفیف</h4>
            <h4>تخفیف "فیصدی"</h4>
            <h4>شروع روند</h4>
            <h4>بیشتر</h4>
          </ListHeader>
          <div className="patient-list-box" ref={listRef}>

            {departments?.map((department, key) => (
              <div className="patient-list-item">
                <h4>{key + 1}</h4>
                <h4>{department.name}</h4>
                <h4>{department.over_price_money}</h4>
                <h4>{department.over_price_percent}</h4>
                <h4>{department.discount_money}</h4>
                <h4>{department.discount_percent}</h4>
                <h4>{department.celling_start}</h4>
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setScrollPosition(listRef.current?.scrollTop)
                      setActive("edit");
                      FormResetToItem(department);
                    }}
                  />
                  <DeleteButton
                    Func={() => {
                      deleteDepartment(department.id);
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
            <input type="text" defaultValue="" autoFocus {...register("name")} />
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
            mutateAsync={newDepartment}
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
            mutateAsync={handleEditDepartment}
            reset={reset}
          />
        </>
      );
  }
}
