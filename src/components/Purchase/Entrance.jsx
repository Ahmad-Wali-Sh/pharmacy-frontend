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
      borderRadius: "2rem",
      overflow: "hidden",
      width: "93%",
      height: "90%",
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
    textAlign: "right",
    fontSize: "14px",
    backgroundColor: "rgb(34, 34, 34)",
    color: "white",
    border: "none",
    textAlign: "right",
    direction: "RTL",
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
              <div className="entrance-form">
                <div className="entrance-report">Reports</div>
                <div className="entrance-inputs-container">
                  <div className="entrance-entrance">
                    <div className="entrance-section">
                      <div className="entrance-input-box">
                        <select>
                          <option>ثبت نهایی</option>
                          <option>...</option>
                        </select>
                        <label>:وضعیت</label>
                      </div>
                      <div className="entrance-input-box">
                        <div className="react-autocomplete">
                          <ReactSearchAutocomplete
                            styling={AutoCompleteStyle}
                            showIcon={false}
                            showClear={false}
                            items={companies}
                            inputDebounce={10}
                          />
                        </div>
                        <label>:شرکت</label>
                      </div>
                      <div className="entrance-input-box">
                        <input type="date" />
                        <label>:تاریخ</label>
                      </div>
                    </div>
                    <div className="entrance-section">
                      <div className="entrance-input-box">
                        <select>
                          <option>ثبت نهایی</option>
                          <option>...</option>
                        </select>
                        <label>:انبار</label>
                      </div>
                      <div className="entrance-input-box">
                        <div className="react-autocomplete">
                          <ReactSearchAutocomplete
                            styling={AutoCompleteStyle}
                            showIcon={false}
                            showClear={false}
                            items={companies}
                            inputDebounce={10}
                          />
                        </div>
                        <label>:شرکت</label>
                      </div>
                      <div className="entrance-input-box">
                        <input />
                        <label>:شماره</label>
                      </div>
                    </div>
                  </div>
                  <div className="entrance-through">Medicians</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
