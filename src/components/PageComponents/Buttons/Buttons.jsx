import React from "react";

export function MainButton({ Func, title, length, icon }) {
  return (
    <div className="purchase-card shadow-drop-center" onClick={() => Func()}>
      <div>
        <h3>{title}</h3>
      </div>
      <div>
        <i className={icon}></i>
      </div>
    </div>
  );
}

export function PlusButton({ Func }) {
  return (
    <div className="plus-box" onClick={() => Func()}>
      <div className="plus">
        <i class="fa-solid fa-plus"></i>
      </div>
    </div>
  );
}

export function InfoButton({ Func }) {
  return (
    <div onClick={() => Func()}>
      <i class="fa-solid fa-circle-info"></i>
    </div>
  );
}
export function DeleteButton({ Func }) {
  return (
    <div onClick={() => Func()}>
      <i class="fa-solid fa-trash"></i>
    </div>
  );
}

export function DepartButton({ Func, name }) {
  return (
    <div className="department-card shadow-drop-center" onClick={() => Func()}>
      <h3>{name}</h3>
    </div>
  );
}

export function FormButton({ Func, name, className, disabled=false }) {
  return (
    <input
      type="button"
      onClick={() => Func()}
      className={`form-button ${className}`}
      disabled={disabled}
      tabIndex={-1}
      value={name}
    ></input>
  );
}
export function SubmitButton({ Func, name, className, disabled=false }) {
  return (
    <input
      type="submit"
      onClick={() => Func()}
      tabIndex={-1}
      className={`form-button ${className} `}
      value={name}
      disabled={disabled}
    ></input>
  );
}

export function AfterBeforeButtonGroup({ BackFunc, MiddleFunc, FrontFunc }) {
  return (
    <div className="entrance-report-footer">
      <button className="entrance-report-button" onClick={() => BackFunc()}>
        <i class="fa-solid fa-left-long"></i>
      </button>
      <button className="entrance-report-button" onClick={() => MiddleFunc()}>
        <i class="fa-solid fa-comments-dollar"></i>
      </button>
      <button className="entrance-report-button" onClick={() => FrontFunc()}>
        <i class="fa-solid fa-right-long"></i>
      </button>
    </div>
  );
}

export function ButtonGroup({ children }) {
  return <div className="button-group">{children}</div>;
}

export function SearchButton({ Func }) {
  return (
    <button
      className="search-button-box shadow-drop-center"
      onClick={(e) => {
        e.preventDefault()
        Func()
      }}
      type="submit"
    >
      <i class="fa-brands fa-searchengin"></i>
    </button>
  );
}
