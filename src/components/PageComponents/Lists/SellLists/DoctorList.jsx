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

export default function DoctorList() {
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

  const { mutateAsync: newDoctor } = useMutation({
    mutationFn: (data) => postDataFn(data, "doctor/"),
    onSuccess: () =>
      successFn([doctorQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditDoctor } = useMutation({
    mutationFn: (data) => putDataFn(data, `doctor/${editItem.id}/`),
    onSuccess: () =>
      successFn([doctorQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deleteDoctor } = useMutation({
    mutationFn: (id) => deleteDataFn(`doctor/${id}/`),
    onSuccess: () =>
      successFn([doctorQuery], () => {
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
      last_name: item.last_name ? last_name : "",
      code: item.id ? item.id : "",
      expertise: item.expertise ? item.expertise : "",
      contact_number: item.contact_number ? item.contact_number : "",
      email: item.email ? item.email : "",
      workplace: item.workplace ? item.workplace : "",
      home_address: item.home_address ? item.home_address : "",
      discription: item.discription ? item.discription : "",
    });
    setEditItem(item);
  };

  const ResetForm = () => {
    reset({
      name: "",
      last_name: "",
      code: "",
      expertise: "",
      contact_number: "",
      email: "",
      workplace: "",
      home_address: "",
      discription: "",
    });
    setEditItem("");
  };

  let doctorQuery = `doctor/?name=${filter.name}&id=${filter.id}&contact_number=${filter.contact_number}&expertise=${filter.expertise}`;
  const { data: doctors } = useQuery([doctorQuery]);

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
            <FilterInput
              label="کد"
              value={filter.id}
              handleChange={(e) => setFilter({ ...filter, id: e.target.value })}
            />
            <FilterInput
              label="تماس"
              value={filter.contact_number}
              handleChange={(e) =>
                setFilter({ ...filter, contact_number: e.target.value })
              }
            />
            <FilterInput
              label="تخصص"
              value={filter.expertise}
              handleChange={(e) =>
                setFilter({ ...filter, expertise: e.target.value })
              }
            />
          </FilterModal>
          <ListHeader>
            <h4>No</h4>
            <h4>نام</h4>
            <h4>تخلص</h4>
            <h4>کد</h4>
            <h4>تماس</h4>
            <h4>تخصص</h4>
            <h4>بیشتر</h4>
          </ListHeader>
          <ListMap>
            {doctors?.map((doctor, key) => (
              <div className="patient-list-item">
                <h4>{key + 1}</h4>
                <h4>{doctor.name}</h4>
                <h4>{doctor.last_name}</h4>
                <h4>{doctor.id}</h4>
                <h4>{doctor.contact_number}</h4>
                <h4>{doctor.expertise}</h4>
                <div className="flex">
                  <InfoButton
                    Func={() => {
                      setActive("edit");
                      FormResetToItem(doctor);
                    }}
                  />
                  <DeleteButton
                    Func={() => {
                      deleteDoctor(doctor.id);
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
            <label>تخلص:</label>
            <input type="text" {...register("last_name")} />
            <label>متخصص:</label>
            <input type="text" {...register("expertise")} />
            <label>کد:</label>
            <input type="text" {...register("code")} disabled />
            <label>تماس:</label>
            <input type="text" {...register("contact_number")} />
            <label>ایمیل:</label>
            <input type="email" {...register("email")} />
            <label>کار:</label>
            <input type="text" {...register("workplace")} />
            <label>ساعت کاری:</label>
            <input type="text" {...register("work_time")} />
            <label>آدرس خانه:</label>
            <input type="text" {...register("home_address")} />
            <div></div>
            <div></div>
            <label>توضیحات:</label>
            <input
              type="text"
              {...register("discription")}
              className="doctor-discription"
            />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newDoctor}
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
            <label>تخلص:</label>
            <input type="text" {...register("last_name")} />
            <label>متخصص:</label>
            <input type="text" {...register("expertise")} />
            <label>کد:</label>
            <input type="text" {...register("code")} disabled />
            <label>تماس:</label>
            <input type="text" {...register("contact_number")} />
            <label>ایمیل:</label>
            <input type="email" {...register("email")} />
            <label>کار:</label>
            <input type="text" {...register("workplace")} />
            <label>ساعت کاری:</label>
            <input type="text" {...register("work_time")} />
            <label>آدرس خانه:</label>
            <input type="text" {...register("home_address")} />
            <div></div>
            <div></div>
            <label>توضیحات:</label>
            <input
              type="text"
              {...register("discription")}
              className="doctor-discription"
            />
          </Form>
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditDoctor}
            reset={reset}
          />
        </>
      );
  }
}
