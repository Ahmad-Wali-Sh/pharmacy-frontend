import axios from "axios";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import SmallModal from "./Modals/SmallModal";
import useServerIP from "../services/ServerIP";

function MultipleBarcode({ medicineID }) {
  const multipleBarcodeRef = useRef(null);
  const { serverIP} = useServerIP()
  const [barcoder, setBarcoder] = useState("");
  const { data: multipleBarcode, refetch: medicineBarcodeRefetch } = useQuery(
    `medicine-barcode/?medicine=${medicineID}`
  );

  const newBarcode = () => {
    const BarcodeForm = new FormData();
    BarcodeForm.append("medicine", medicineID);
    BarcodeForm.append("barcode", barcoder);
    barcoder && axios
      .post(`${serverIP}api/` + "medicine-barcode/", BarcodeForm)
      .then(() => {
        toast.success("بارکد موفقانه ثبت شد");
        setTimeout(() => {
          medicineBarcodeRefetch();
        }, 10);
        setBarcoder("");
      })
      .catch((e) => {
        axios
          .get(`${serverIP}api/` + `medicine-barcode/?barcode=${barcoder}`)
          .then((res) => {
            console.log(res);
            toast.error(
              <>
                <h5>ID: {`${res.data.results[0].medician.id}`}</h5>
                <h5>Name: {`${res.data.results[0].medician.medicine_full}`}</h5>
                <hr />
                <h5>barcode: {barcoder}</h5>
                <button
                  onClick={() => {
                    axios
                      .delete(
                        `${serverIP}api/`  + "medicine-barcode/" + res.data.results[0].id + '/'
                      )
                      .then(() => {
                        medicineBarcodeRefetch();
                        newBarcode()
                        toast.success("موفقانه بود");
                      });
                  }}
                >
                  حذف بارکد!
                </button>
              </>,
              { autoClose: 5000, pauseOnHover: true }
            );
          });
      });
  };

  const deleteBarcode = (barcodeId) => {
    axios
      .delete(`${serverIP}api/`  + "medicine-barcode/" + barcodeId + '/')
      .then(() => {
        toast.success("بارکد موفقانه حذف شد");
        setTimeout(() => {
          medicineBarcodeRefetch();
        }, 10);
        setBarcoder("");
      })
      .catch((e) => {
        toast.error(`مشکلی در حذف بارکد وجود دارد`);
      });
  };

  return (
    <>
      <div
        className="multiple-image-button"
        onClick={() => multipleBarcodeRef.current.Opener()}
      >
        بارکد
      </div>
      <SmallModal title="مشخصات بارکد" ref={multipleBarcodeRef}>
        <div className="multiple-barcode-box">
          <form
            className="multiple-barcode-new"
            onSubmit={(e) => {
              e.preventDefault();
              newBarcode();
            }}
          >
            <div className="multiple-barcode-new">
              <input
                className="multiple-barcode-input"
                value={barcoder}
                onChange={(e) => setBarcoder(e.target.value)}
              />
            </div>
          </form>
          <div className="multiple-barcodes">
            {multipleBarcode?.results.map((medicineBarcode) => (
              <div className="multiple-barcode-item">
                <h4>{medicineBarcode.barcode}</h4>
                <div
                  className="medician-map-buttons"
                  onClick={() => deleteBarcode(medicineBarcode.id)}
                >
                  <div>
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SmallModal>
    </>
  );
}

export default MultipleBarcode;
