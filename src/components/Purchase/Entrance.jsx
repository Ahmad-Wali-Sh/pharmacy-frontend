import Modal from "react-modal";
import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useForm, Controller } from "react-hook-form";

export default function Entrance(props) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [company, setCompany] = React.useState();
  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }
  const customStyles = {
    content: {
      backgroundColor: "rgb(60,60,60)",
      border: "none",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "0px",
      margin: "0px",
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
    },
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const companies = [
    {
      id: 0,
      name: "بشیر احمدی",
    },
    {
      id: 1,
      name: "ABC",
    },
    {
      id: 1,
      name: "ABC",
    },
    {
      id: 1,
      name: "ABC",
    },
    {
      id: 1,
      name: "ABC",
    },
    {
      id: 1,
      name: "ABC",
    },
    {
      id: 1,
      name: "ABC",
    },
    {
      id: 1,
      name: "ABC",
    },
  ];

  const AutoCompleteStyle = {
    height: "1.5rem",
    borderRadius: "1rem",
    fontSize: "14px",
    padding: '1rem',
    backgroundColor: "rgb(34, 34, 34)",
    color: "white",
    border: "none",
    textAlign: "right",
    hoverBackgroundColor: "grey",
    zIndex: '1'
  };
  const AutoCompleteStyle2 = {...AutoCompleteStyle, zIndex: '0'}



  const Submit = (data) => {
    const newForm = new FormData();
    newForm.append("id", parseInt(data.kind));
    newForm.append("company", data.company);
    newForm.append("company", company.id);

    console.log(newForm);
  };

  const CompanyHandle = (data) => {
    setCompany(data);
    console.log(data);
  };

  return (
    <>
      <div className="purchase-card" onClick={registerModalOpener}>
        <div>
          <h3>{props.title}</h3>
          <h4>{props.number}</h4>
        </div>
        <div>
          <i className={props.icon}></i>
        </div>
      </div>
      <Modal
        style={customStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal">
          <form className="form" onSubmit={handleSubmit(Submit)}>
            <div className="modal-header">
              <h3>ثبت ورودی</h3>
              <div className="modal-close-btn" onClick={registerModalCloser}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
            <div className="entrance-box">
              <div className="entrance-report"></div>

              <div className="entrance-entrance">
                  <label>وضعیت:</label>
                  <select {...register("final-register")}>
                    <option value="1">ثبت نهایی</option>
                    <option value="2">...</option>
                  </select>
                  <label>شرکت:</label>
                  <ReactSearchAutocomplete
                    items={companies}
                    onSelect={(item)=> setCompany(item) }
                    styling={AutoCompleteStyle}
                    showClear={false}
                    inputDebounce="10"
                    />
                  <label>انبار:</label>
                  <ReactSearchAutocomplete
                    items={companies}
                    styling={AutoCompleteStyle}
                    showClear={false}
                    inputDebounce="10"
                    />
                  <label>شماره:</label>
                  <input />
                  
                  <label>شماره:</label>
                  <div>
                    <div>

                  <ReactSearchAutocomplete
                    items={companies}
                    styling={AutoCompleteStyle2}
                    showClear={false}
                    inputDebounce="10"
                    />
                    </div>
                  </div>
              </div>

              <div className="entrance-through"></div>

              <div className="entrance-medician">
                <input type="submit"></input>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
