import React, { useEffect, useRef, useState } from "react";
import {
  ButtonGroup,
  DepartButton,
  FormButton,
  SubmitButton,
} from "./Buttons/Buttons";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import {
  postDataFn,
  successFn,
  handleFormData,
  putDataFn,
  deleteDataFn,
} from "../services/API";
import { toast } from "react-toastify";
import SmallModal from "./Modals/SmallModal";
import axios from "axios";
import fileDownload from "js-file-download";
import {CSVLink} from 'react-csv';
import useServerIP from "../services/ServerIP";

export default function PatientList() {
  const ListFilterRef = useRef(null);
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
      successFn([patientQuery, "patient/"], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: handleEditPatient } = useMutation({
    mutationFn: (data) => putDataFn(data, `patient/${editPatient.id}/`),
    onSuccess: () =>
      successFn([patientQuery, "patient/"], () => {
        setActive("list");
      }),
  });

  const { mutateAsync: deletePatient } = useMutation({
    mutationFn: (id) => deleteDataFn(`patient/${id}/`),
    onSuccess: () =>
      successFn([patientQuery, "patient/"], () => {
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
          <FilterModal
            current={ListFilterRef.current}
            ListFilterRef={ListFilterRef}
            filter={filter}
            setFilter={setFilter}
          />
          <ListHeader />
          <ListMap
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
          <NewForm register={register} />
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
          <EditItem register={register} />
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

export function NewForm({ children }) {
  return (
    <form>
      <div className="company-form">{children}</div>
    </form>
  );
}

export function ListFooter({
  handleSubmit,
  mutateAsync,
  user,
  setActive,
  reset,
  filter,
  setFilter,
  medicines,
}) {
  React.useEffect(() => {
    const handleKeyDowns = (e) => {
      if (e.ctrlKey) {
        if (e.key != "A" && e.key != "a" && e.key != "c" && e.key != "v") {
          e.preventDefault();
          switch (e.key) {
            case "s":
            case "S":
            case "س":
              handleSubmit((data) => handleFormData(data, mutateAsync, user))();
              break;
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDowns);
    return () => {
      document.removeEventListener("keydown", handleKeyDowns);
    };
  }, [mutateAsync, handleSubmit]);

  return (
    <div className="list-footer">
      <div>
        <DepartButton
          name="تایید"
          Func={() => {
            handleSubmit((data) => handleFormData(data, mutateAsync, user))();
          }}
        />
      </div>
      {filter && (
        <div className="pagination-group">
          {medicines?.previous && (
            <h4
              onClick={() =>
                setFilter((prev) => ({
                  ...prev,
                  page: parseInt(prev.page) - 1,
                }))
              }
            >
              {"<<"}
            </h4>
          )}
          {medicines?.next && (
            <h4
              onClick={() =>
                setFilter((prev) => ({
                  ...prev,
                  page: parseInt(prev.page) + 1,
                }))
              }
            >
              {">>"}
            </h4>
          )}
        </div>
      )}
      <div className="flex">
        <DepartButton
          name="جدید"
          Func={() => {
            setActive("new");
            reset({
              name: "",
              code: "",
            });
          }}
        />
        <DepartButton
          name="لست"
          Func={() => {
            setActive("list");
          }}
        />
      </div>
    </div>
  );
}

export function ListHeader({ children }) {
  return <div className="patient-list-header">{children}</div>;
}

export function Form({ children }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="company-form">{children}</div>
    </form>
  );
}

export function ListMap({ children }) {
  return <div className="patient-list-box">{children}</div>;
}

export function EditItem({ children }) {
  return (
    <form>
      <div className="company-form">{children}</div>
    </form>
  );
}

export function FilterInput({ label, autoFocus, value, handleChange, name }) {
  return (
    <>
      <label>{label}</label>
      <input
        className="text-input-standard"
        autoFocus={autoFocus}
        value={value}
        onChange={handleChange}
        name={name}
      />
    </>
  );
}

export function FilterDate({ label, autoFocus, value, handleChange, name }) {
  return (
    <>
      <label>{label}</label>
      <input
        className="text-input-standard"
        type="date"
        autoFocus={autoFocus}
        value={value}
        onChange={handleChange}
        name={name}
      />
    </>
  );
}

export function FilterSelect({
  label,
  autoFocus,
  value,
  handleChange,
  name,
  children,
}) {
  return (
    <>
      <label>{label}</label>
      <select
        className="text-input-standard"
        autoFocus={autoFocus}
        value={value}
        onChange={handleChange}
        name={name}
      >
        {children}
      </select>
    </>
  );
}


export function FilterModal(props) {

  const ExcelExport = () => {
    axios({
      url: `${serverIP}/api/` + props.url + "&format=xml",
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      fileDownload(response.data, `${props.fileName}.xml`);
    });
  };

  return (
    <div>
      <div className="filter-button" onClick={() => props.current.Opener()}>
        <i className="fa-solid fa-filter"></i>
      </div>
      <SmallModal
        title="فلتر لست"
        ref={props.ListFilterRef}
        className="patient-filter-modal"
      >
        <form>
          <div className="list-filter-form">
            {props.children}
            <label></label>
            <ButtonGroup>
              <SubmitButton name="تایید" Func={() => props.current.Closer()} />
              {(props.headers && props.excel_data) ? (
                <CSVLink data={props.excel_data} headers={props.headers}>
                  <FormButton name="Excel" Func={() => null} />
                </CSVLink>
              ) : (
                <FormButton name="Excel" Func={() => ExcelExport()} />
              )}
            </ButtonGroup>
          </div>
        </form>
      </SmallModal>
    </div>
  );
}
