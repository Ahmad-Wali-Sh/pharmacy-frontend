import Modal from "react-modal";
import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default function Entrance(props) {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
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
  const companies = [
    {
      id: 0,
      name: "بشیر احمدی",
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
    backgroundColor: "rgb(34, 34, 34)",
    color: "white",
    border: "none",
    textAlign: "right",
    hoverBackgroundColor: "grey",
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
          <form className="form">
            <div className="modal-header">
              <h3>ثبت ورودی</h3>
              <div className="modal-close-btn" onClick={registerModalCloser}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
            <div className="entrance-box">
              <div className="entrance-report"></div>

              <div className="entrance-entrance">
                <label>وضعیت</label>
                <select>
                  <option value="ثبت نهایی">ثبت نهایی</option>
                </select>
                <input
                  type="search"
                  placeholder="Company"
                />
                <input
                  type="search"
                  placeholder="Company"
                />
              </div>

              <div className="entrance-through"></div>

              <div className="entrance-medician"></div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
