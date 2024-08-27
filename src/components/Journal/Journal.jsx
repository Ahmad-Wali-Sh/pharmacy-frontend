import React from "react";
import Modal from "react-modal";
import { MainButton } from "../PageComponents/Buttons/Buttons";
import JournalList from "./JournalList";

Modal.setAppElement("#root");

function Journal() {
  return (
    <div className="purchase">
      <div className="purchase-box">
        <JournalList button='main' title='روزنامچه' icon='fa-solid fa-journal-whills' activeKey={'journal'}/>
        <JournalList button='main' title='ثبت بخش' icon='fa-solid fa-journal-whills' activeKey={'categories'}/>
      </div>
      <div className="purchase-form"></div>
    </div>
  );
}

export default Journal;
