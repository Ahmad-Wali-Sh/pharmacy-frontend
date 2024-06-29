import React, { useRef } from "react";
import FilterModal from "../../PageComponents/Modals/FilterModal";

function Entrances() {
  const FilterModalRef = useRef(null);
  return (
    <>
      <FilterModal
        ref={FilterModalRef}
        title={"فلترنگ حواله های ورود"}
      >
        <div className="entrances-filter-modal-container">
            <div>
              <label>وضعیت:</label>
              <input type="text" />
            </div>
            <div>
              <label>وضعیت:</label>
              <input type="text" />
            </div>
            <div>
              <label>وضعیت:</label>
              <input type="text" />
            </div>
            <div>
              <label>وضعیت:</label>
              <input type="text" />
            </div>
            <div>
              <label>وضعیت:</label>
              <input type="text" />
            </div>
            <div>
              <label>وضعیت:</label>
              <input type="text" />
            </div>
            <div>
              <label>وضعیت:</label>
              <input type="text" />
            </div>
            <div>
              <label>وضعیت:</label>
              <input type="text" />
            </div>
            <div>
              <label>وضعیت:</label>
              <input type="text" />
            </div>
            <div>
              <label>وضعیت:</label>
              <input type="text" />
            </div>
            <div>
              <label>وضعیت:</label>
              <input type="text" />
            </div>
            <div>
              <label>وضعیت:</label>
              <input type="text" />
            </div>
        </div>

      </FilterModal>
      <div
        className="filter-button"
        onClick={() => FilterModalRef.current.Opener()}
      >
        <i className="fa-solid fa-filter"></i>
      </div>
      <div className="entrances-list-header">
        <h4>ردیف</h4>
        <h4>ش.حواله</h4>
        <h4>شماره</h4>
        <h4>وضعیت</h4>
        <h4>شرکت</h4>
        <h4>انبار</h4>
        <h4>پرداخت</h4>
        <h4>واحد_پولی</h4>
        <h4>نوع_ورودی</h4>
        <h4>بیشتر</h4>
      </div>
      <div className="entrances-list-container">
        <div className="entrances-list-item">
          <h4>1</h4>
          <h4>12</h4>
          <h4>1234</h4>
          <h4>مستقیم</h4>
          <h4>آریا افغان لمتد</h4>
          <h4>تغازه دواخونه</h4>
          <h4>متسقیم</h4>
          <h4>AFG</h4>
          <h4>عمده</h4>
          <h4>بیشتر</h4>
        </div>
      </div>
    </>
  );
}

export default Entrances;
