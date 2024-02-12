import React, { useRef } from "react";
import {
  DepartButton,
  InfoButton,
  DeleteButton,
  SubmitButton,
} from "../../Buttons/Buttons";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import {
  postDataFn,
  successFn,
  handleFormData,
  putDataFn,
  deleteDataFn,
} from "../../../services/API";
import { toast } from "react-toastify";
import SmallModal from "../../Modals/SmallModal";

export default function PatientList() {
  const PatientListFilterRef = useRef(null);
  const [active, setActive] = React.useState("list");
  const [editPatient, setEditPatient] = React.useState("");
  const [filter, setFilter] = React.useState({
    id: "",
    name: "",
    contact_number: "",
    gender: "",
    tazkira_number: "",
  });

  const user = useAuthUser();

  const { register, handleSubmit, reset } = useForm();

  const { mutateAsync: newPatient } = useMutation({
    mutationFn: (data) => postDataFn(data, "patient/"),
    onSuccess: () =>
      successFn([patientQuery], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditPatient } = useMutation({
    mutationFn: (data) => putDataFn(data, `patient/${editPatient.id}/`),
    onSuccess: () =>
      successFn([patientQuery], () => {
        setActive("list");
      }),
  });

  React.useEffect(() => {
    const handleKeyDowns = (e) => {
      console.log(e.key)
      if (e.ctrlKey) {
        switch (e.key) {
          case 'e':
          case 'E':
          case 'ث':
            e.preventDefault();
            setActive('new')
            reset({
              name: '',
              code: ''
            })
            break;
          case 'f':
          case 'F':
          case 'ب':
            e.preventDefault();
            PatientListFilterRef.current.Opener()
            break;
          case 'l':
          case 'L':
          case 'م':
            e.preventDefault();
            setActive('list')
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDowns);
    return () => {
      document.removeEventListener("keydown", handleKeyDowns);
    };
  }, []);

  const { mutateAsync: deletePatient } = useMutation({
    mutationFn: (id) => deleteDataFn(`patient/${id}/`),
    onSuccess: () =>
      successFn([patientQuery], () => {
        setActive("list");
      }),
    onError: (e) => {
      console.log(e.response);
      toast.error(`نسخه های قبلی را حذف نموده دوباره سعی کنید`);
    },
  });

  let patientQuery = `patient/?name=${filter.name}&id=${filter.id}&contact_number=${filter.contact_number}&gender=${filter.gender}&tazkira_number=${filter.tazkira_number}`;

  const { data: patients } = useQuery([patientQuery]);
 
  switch (active) {
    case "list":
      return (
        <>
          <PatientFilterModal
            current={PatientListFilterRef.current}
            PatientListFilterRef={PatientListFilterRef}
            filter={filter}
            setFilter={setFilter}
          />
          <PatientListMap
            patients={patients}
            setActive={setActive}
            handleSubmit={handleSubmit}
            reset={reset}
            setPatiendEdit={setEditPatient}
            deletePatient={deletePatient}
          />
          <ListFooter setActive={setActive} reset={reset} user={user} />
        </>
      );
    case "new":
      () => setEditPatient("");
      return (
        <>
          <NewPatientForm register={register} />
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={newPatient}
            reset={reset}
          />
        </>
      );
    case "edit":
      return (
        <>
          <PatientEdit register={register} />
          <ListFooter
            setActive={setActive}
            user={user}
            handleSubmit={handleSubmit}
            mutateAsync={handleEditPatient}
            reset={reset}
          />
        </>
      );
  }
}

function NewPatientForm(props) {
  return (
    <form>
      <div className="company-form">
        <label>نام:</label>
        <input type="text" {...props.register("name")} />
        <label>تخلص:</label>
        <input type="text" {...props.register("last_name")} />
        <label>مریضی:</label>
        <input type="text" {...props.register("sickness")} />
        <label>کد:</label>
        <input type="text" {...props.register("code")} disabled />
        <label>تماس:</label>
        <input type="text" {...props.register("contact_number")} />
        <label>تاریخ تولد:</label>
        <input type="date" {...props.register("birth_date")} />
        <label>نمبر تذکره:</label>
        <input type="text" {...props.register("tazkira_number")} />
        <label>آدرس:</label>
        <input type="text" {...props.register("address")} />
        <label>جنسیت:</label>
        <select {...props.register("gender")}>
          <option value="Male">مرد</option>
          <option value="Female">زن</option>
        </select>
        <div></div>
        <div></div>
        <label>توضیحات:</label>
        <input
          type="text"
          {...props.register("discription")}
          className="doctor-discription"
        />
      </div>
    </form>
  );
}

function ListFooter(props) {
  React.useEffect(() => {
    const handleKeyDowns = (e) => {
      if (e.ctrlKey) {
        if (e.key != "A" && e.key != "a" && e.key != "c" && e.key != "v") {
          e.preventDefault();
          switch (e.key) {
            case "s":
            case "S":
            case "س":
              props?.handleSubmit((data) =>
                handleFormData(data, props?.mutateAsync, props.user)
              )();
              break;
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDowns);
    return () => {
      document.removeEventListener("keydown", handleKeyDowns);
    };
  }, [props]);

  return (
    <div className="list-footer">
      <div>
        <DepartButton
          name="تایید"
          Func={() => {
            props.handleSubmit((data) =>
              handleFormData(data, props.mutateAsync, props.user)
            )();
          }}
        />
      </div>
      <div className="flex">
        <DepartButton
          name="جدید"
          Func={() => {
            props.setActive("new");
            props.reset({
              name: "",
              code: "",
            });
          }}
        />
        <DepartButton
          name="لست"
          Func={() => {
            props.setActive("list");
          }}
        />
      </div>
    </div>
  );
}

function PatientListMap(props) {
  const editForm = (patient) => {
    props.reset({
      name: patient.name,
      last_name: patient.last_name,
      gender: patient.gender,
      birth_date: patient.birth_date ? patient.birth_date : "",
      tazkira_number: patient.tazkira_number ? patient.tazkira_number : "",
      contact_number: patient.contact_number ? patient.contact_number : "",
      sickness: patient.sickness,
      discription: patient.discription,
      code: patient.id ? patient.id : "",
      address: patient.address,
    });
    props.setPatiendEdit(patient);
  };
  return (
    <>
      <div className="patient-list-header">
        <h4>No</h4>
        <h4>نام</h4>
        <h4>تخلص</h4>
        <h4>کد</h4>
        <h4>جنسیت</h4>
        <h4>تماس</h4>
        <h4>بیشتر</h4>
      </div>
      <div className="patient-list-box">
        {props.patients?.map((patient, key) => (
          <div className="patient-list-item">
            <h4>{key + 1}</h4>
            <h4>{patient.name}</h4>
            <h4>{patient.last_name}</h4>
            <h4>{patient.id}</h4>
            <h4>{patient.gender}</h4>
            <h4>{patient.contact_number}</h4>
            <div className="flex">
              <InfoButton
                Func={() => {
                  props.setActive("edit");
                  editForm(patient);
                }}
              />
              <DeleteButton
                Func={() => {
                  props.deletePatient(patient.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function PatientEdit(props) {
  return (
    <form>
      <div className="company-form">
        <label>نام:</label>
        <input type="text" {...props.register("name")} />
        <label>تخلص:</label>
        <input type="text" {...props.register("last_name")} />
        <label>مریضی:</label>
        <input type="text" {...props.register("sickness")} />
        <label>کد:</label>
        <input type="text" {...props.register("code")} disabled />
        <label>تماس:</label>
        <input type="text" {...props.register("contact_number")} />
        <label>تاریخ تولد:</label>
        <input type="date" {...props.register("birth_date")} />
        <label>نمبر تذکره:</label>
        <input type="text" {...props.register("tazkira_number")} />
        <label>آدرس:</label>
        <input type="text" {...props.register("address")} />
        <label>جنسیت:</label>
        <select {...props.register("gender")}>
          <option value="Male">مرد</option>
          <option value="Female">زن</option>
        </select>
        <div></div>
        <div></div>
        <label>توضیحات:</label>
        <input
          type="text"
          {...props.register("discription")}
          className="doctor-discription"
        />
      </div>
    </form>
  );
}

function PatientFilterModal(props) {
  return (
    <div>
      <div className="filter-button" onClick={() => props.current.Opener()}>
        <i className="fa-solid fa-filter"></i>
      </div>
      <SmallModal
        title="فلتر لست"
        ref={props.PatientListFilterRef}
        className="patient-filter-modal"
      >
        <form>
          <div className="list-filter-form">

            <label>نام</label>
            <input
              className="text-input-standard"
              autoFocus
              value={props.filter.name}
              onChange={(e) =>
                props.setFilter({ ...props.filter, name: e.target.value })
              }
            />
            <label>کد</label>
            <input
              className="text-input-standard"
              value={props.filter.id}
              onChange={(e) =>
                props.setFilter({ ...props.filter, id: e.target.value })
              }
            />
            <label>شماره</label>
            <input
              className="text-input-standard"
              value={props.filter.contact_number}
              onChange={(e) =>
                props.setFilter({
                  ...props.filter,
                  contact_number: e.target.value,
                })
              }
            />
            <label>جنسیت</label>
            <select
              className="text-input-standard"
              value={props.filter.gender}
              onChange={(e) =>
                props.setFilter({ ...props.filter, gender: e.target.value })
              }
            >
              <option value=""></option>
              <option value="Male">مرد</option>
              <option value="Female">زن</option>
            </select>
            <label>نمبر تذکره</label>
            <input
              className="text-input-standard"
              type="text"
              value={props.filter.tazkira_number}
              onChange={(e) =>
                props.setFilter({
                  ...props.filter,
                  tazkira_number: e.target.value,
                })
              }
            />
            <SubmitButton name="تایید" Func={() => props.current.Closer()} />
          </div>
        </form>
      </SmallModal>
    </div>
  );
}
