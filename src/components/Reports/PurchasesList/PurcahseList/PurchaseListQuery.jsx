import React from "react";
import Modal from "react-modal";
import axios from "axios";
import OutranceList from "../OutranceList/OutranceList";
import StoreList from "../StoreList/StoreList";
import CompanyList from "../CompanyList/CompanyList";
import EntranceList from "../EntranceList/EntranceList";
import PurchaseListQueryMap from "./PurchaseListQueryMap";
function PurchaseListQuery({ Closer }) {
  const ModalStyles = {
    content: {
      backgroundColor: "rgb(30,30,30)",
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

  const PURCHASE_LIST_URL = import.meta.env.VITE_PURCHASE_LIST;

  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [purchaseList, setPurchaseList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // React.useEffect(() => {
  //   axios
  //       .get(PURCHASE_LIST_URL)
  //       .then((res) => setPurchaseList(res.data.results))
  //       .catch((err) => console.log(err))
  // }, [])

  function registerModalOpener() {
    setRegisterModalOpen(true);
    axios
      .get(PURCHASE_LIST_URL)
      .then((res) => {
        setPurchaseList(res.data.results);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
    Closer();
  }

  return (
    <>
      <div className="list-card" onClick={registerModalOpener}>
        <h3>لست خرید</h3>
      </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>لست خرید</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="list-items">
          <EntranceList Closer={registerModalCloser} />
          <OutranceList Closer={registerModalCloser} />
          <StoreList Closer={registerModalCloser} />
          <CompanyList Closer={registerModalCloser} />
          <div></div>
        </div>
        <div className="entrance-filter-list-box">
          <div className="purchase-list-query-box">
            <div className="purchase-list-query-header">
              <h5>No.</h5>
              <h5>Medicine</h5>
              <h5>Need</h5>
              <h5>Company-1</h5>
              <h5>Market-1</h5>
              <h5>Price-1</h5>
              <h5>Bonus-1</h5>
              <h5>date-1</h5>
              <h5>Whole?</h5>
              <h5>Company-2</h5>
              <h5>Market-2</h5>
              <h5>Price-2</h5>
              <h5>Bonus-2</h5>
              <h5>date-2</h5>
              <h5>Whole?</h5>
              <h5>Company-3</h5>
              <h5>Market-3</h5>
              <h5>Price-3</h5>
              <h5>Bonus-3</h5>
              <h5>date-3</h5>
              <h5>Whole?</h5>
              <h5>Acquired</h5>
              <h5>Shorted?</h5>
            </div>
            <div className="purchase-list-query-map-box">
              {purchaseList.map((purchaseItem, index) => (
                <PurchaseListQueryMap PurchaseItem={purchaseItem} Key={index} />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PurchaseListQuery;
