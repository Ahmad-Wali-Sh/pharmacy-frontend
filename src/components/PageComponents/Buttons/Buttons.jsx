import React from "react";

export function MainButton({ Func, title, length, icon }) {
  return (
    <div className="purchase-card" onClick={() => Func()}>
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
    <div
      className="plus-box"
      onClick={() => Func()}
    >
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
  )
}

export function DepartButton({ Func, name }) {
  return (
    <div className="department-card" onClick={() => Func()}>
    <h3>{name}</h3>
  </div>
  )
}

