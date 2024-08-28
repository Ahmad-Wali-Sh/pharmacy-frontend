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
  FilterDate,
  FilterSelect,
} from "../PageComponents/ListingComponents";
import useServerIP from "../services/ServerIP";
import ControlledSelect from "../PageComponents/ControlledSelect";
import axios from "axios";

export default function SalaryEntry() {
  const ListFilterRef = useRef(null);
  const [active, setActive] = useState("list");
  const [editItem, setEditItem] = useState("");
  const [filter, setFilter] = useState({
    employee: "",
    user: "",
    payment_date_after: "",
    payment_date_before: "",
    amount: "",
    checked: "",
    timestamp: "",
    page: 1,
    penalty: '',
    bonus: ''
  });

  const { serverIP } = useServerIP();

  const [Users, setUsers] = useState([]);

  useEffect(() => {
    serverIP &&
      axios.get(serverIP + "auth/users/").then((res) => {
        setUsers(res?.data);
      });
  }, [serverIP]);

  const user = useAuthUser();

  const { register, handleSubmit, reset, setValue, watch, control } = useForm();

  const { mutateAsync: newSalary } = useMutation({
    mutationFn: (data) => postDataFn(data, "salary-entry/"),
    onSuccess: () =>
      successFn([SalaryQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditSalary } = useMutation({
    mutationFn: (data) => putDataFn(data, `salary-entry/${editItem.id}/`),
    onSuccess: () =>
      successFn([SalaryQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deleteSalary } = useMutation({
    mutationFn: (id) => deleteDataFn(`salary-entry/${id}/`),
    onSuccess: () =>
      successFn([SalaryQuery], () => {
        setActive("list");
      }),
    onError: (e) => {
      console.log(e.response);
      toast.error(`این بخش در روزنامچه استفاده شده است`);
    },
  });

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  }

  const FormResetToItem = (item) => {
    reset({
      employee: item.employee ? item.employee : "",
      payment_date: item.payment_date ? item.payment_date : "",
      amount: item.amount ? item.amount : "",
      hourly_rate: item.hourly_rate ? item.hourly_rate : "",
      total_hours: item.total_hours ? item.total_hours : "",
      description: item.description ? item.description : "",
      checked: item.checked ? item.checked : "",
      bonus: item.bonus ? item.bonus : "",
      penalty: item.penalty ? item.penalty : "",
    });
    setEditItem(item);
  };

  useEffect(() => {
    if (parseFloat(watch("hourly_rate")) && parseFloat(watch("total_hours"))) {
        let bonus = parseFloat(watch('bonus')) ? parseFloat(watch('bonus')) : 0
        let penalty = parseFloat(watch('penalty')) ? parseFloat(watch('penalty')) : 0
      setValue(
        "amount",
        parseFloat(watch("hourly_rate")) * parseFloat(watch("total_hours")) + bonus - penalty
      );
    }
    else {
        setValue('amount', '')
    }
  }, [watch("hourly_rate"), watch("total_hours"), watch('employee'), watch('bonus'), watch('penalty')]);

  useEffect(() => {
    if (watch('employee')) {
        const employy = Users.find(user => user?.id == watch('employee'))
        setValue('hourly_rate', employy?.hourly_rate)
        console.log(employy);
        
    }
  }, [watch('employee')])

  const ResetForm = () => {
    reset({
      employee: "",
      payment_date: new Date().toISOString().split("T")[0],
      amount: "",
      hourly_rate: "",
      total_hours: "",
      description: "",
      penalty: "",
      bonus: "",
      checked: true,
    });
    setEditItem("");
  };

  let SalaryQuery = `salary-entry/?employee=${filter.employee ? filter.employee : ''}&penalty=${filter.penalty}&bonus=${filter.bonus}&page=${filter.page}&payment_date_after=${filter.payment_date_after}&payment_date_before=${filter.payment_date_before}&amount=${filter.amount}&checked=${filter.checked}&ordering=id`;
  const { data: salaryEntries } = useQuery([SalaryQuery]);

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
            <label>کارمند:</label>
            <ControlledSelect
              control={control}
              name="filter_employee"
              options={Users}
              placeholder=""
              onChange={(e) => {
                setFilter({ ...filter, employee: e?.id}) 
              }}
              getOptionLabel={(option) => option?.first_name}
              getOptionValue={(option) => option?.first_name}
              uniqueKey={`employee${filter?.employee}${Users}`}
              defaultValue={
                Users?.find((c) =>
                  c.id == filter?.employee ? c.first_name : ""
                ) || ""
              }
            />
            <FilterDate
              label="از_تاریخ"
              name="payment_date_after"
              value={filter.payment_date_after}
              handleChange={(e) => {
                setFilter({ ...filter, payment_date_after: e.target.value });
              }}
            />
            <FilterDate
              label="تا_تاریخ"
              name="payment_date_before"
              value={filter.payment_date_before}
              handleChange={(e) => {
                setFilter({ ...filter, payment_date_before: e.target.value });
              }}
            />
            <FilterInput
              label="مقدار"
              name="amount"
              value={filter.amount}
              handleChange={(e) => {
                setFilter({ ...filter, amount: e.target.value });
              }}
            />
            <FilterInput
              label="جریمه >"
              name="penalty"
              value={filter.penalty}
              handleChange={(e) => {
                setFilter({ ...filter, penalty: e.target.value });
              }}
            />
            <FilterInput
              label="امتیاز >"
              name="bonus"
              value={filter.bonus}
              handleChange={(e) => {
                setFilter({ ...filter, bonus: e.target.value });
              }}
            />
            <FilterSelect label='پرداخت' value={filter.checked} name='checked' handleChange={(e) => {
                setFilter({...filter, checked: e.target.value})
                console.log(e.target.value);
                
            }} >
                <option value={''}></option>
                <option value={true}>پرداخت شده</option>
                <option value={false}>قابل پرداخت</option>
            </FilterSelect>
          </FilterModal>
          <ListHeader>
            <h4>No</h4>
            <h4>کارمند</h4>
            <h4>نرخ_ساعتی</h4>
            <h4>ساعات</h4>
            <h4>جریمه</h4>
            <h4>امتیاز</h4>
            <h4>مقدار</h4>
            <h4>تاریخ</h4>
            <h4>پرداخت</h4>
            <h4>توضیحات</h4>
            <h4>بیشتر</h4>
          </ListHeader>
          <div className="patient-list-box" ref={listRef}>
            {salaryEntries?.results?.map((entry, key) => (
              <div className="patient-list-item">
                <h4>{key + 1}</h4>
                <h4>{entry.employee_name}</h4>
                <h4>{entry.hourly_rate}</h4>
                <h4>{entry.total_hours}</h4>
                <h4>{entry.penalty}</h4>
                <h4>{entry.bonus}</h4>
                <h4>{entry.amount}</h4>
                <h4>{entry.payment_date}</h4>
                <h4>{entry.checked ? "پرداخت شده" : "قابل پرداخت"}</h4>
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
                      deleteSalary(entry.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <ListFooter
            setActive={setActive}
            reset={reset}
            user={user}
            filter={filter}
            medicines={salaryEntries}
            setFilter={setFilter}
          />
        </>
      );
    case "new":
      () => setEditItem("");
      return (
        <>
          <Form>
            <label>کارمند:</label>
            <div
              style={{
                width: "80%",
              }}
            >
              <ControlledSelect
                control={control}
                name="employee"
                options={Users}
                placeholder=""
                getOptionLabel={(option) => option?.first_name}
                getOptionValue={(option) => option?.first_name}
                uniqueKey={`employee${editItem?.employee}${Users}`}
                defaultValue={
                  Users?.find((c) =>
                    c.id == editItem?.employee ? c.first_name : ""
                  ) || ""
                }
              />
            </div>
            <label>نرخ_ساعتی:</label>
            <input type="text" {...register("hourly_rate")} />
            <label>ساعات:</label>
            <input type="text" {...register("total_hours")} />
            <label>جریمه:</label>
            <input type="text" {...register("penalty")} />
            <label>امتیاز:</label>
            <input type="text" {...register("bonus")} />
            <label>مقدار:</label>
            <input type="text" {...register("amount")} />
            <label>تاریخ:</label>
            <input type="date" {...register("payment_date")} />
            <label>پرداخت:</label>
            <input type="checkbox" {...register("checked")} />
            <label>توضیحات:</label>
            <input type="text" {...register("description")} />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newSalary}
            reset={reset}
          />
        </>
      );
    case "edit":
      return (
        <>
          <Form>
            <label>کارمند:</label>
            <div
              style={{
                width: "80%",
              }}
            >
              <ControlledSelect
                control={control}
                name="employee"
                options={Users}
                placeholder=""
                getOptionLabel={(option) => option?.first_name}
                getOptionValue={(option) => option?.first_name}
                uniqueKey={`employee${editItem?.employee}${Users}`}
                defaultValue={
                  Users?.find((c) =>
                    c.id == editItem?.employee ? c.first_name : ""
                  ) || new Date()
                }
              />
            </div>
            <label>نرخ_ساعتی:</label>
            <input type="text" {...register("hourly_rate")} />
            <label>ساعات:</label>
            <input type="text" {...register("total_hours")} />
            <label>جریمه:</label>
            <input type="text" {...register("penalty")} />
            <label>امتیاز:</label>
            <input type="text" {...register("bonus")} />
            <label>مقدار:</label>
            <input type="text" {...register("amount")} />
            <label>تاریخ:</label>
            <input type="date" {...register("payment_date")} />
            <label>پرداخت:</label>
            <input type="checkbox" {...register("checked")} />
            <label>توضیحات:</label>
            <input type="text" {...register("description")} />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditSalary}
            reset={reset}
          />
        </>
      );
  }
}
