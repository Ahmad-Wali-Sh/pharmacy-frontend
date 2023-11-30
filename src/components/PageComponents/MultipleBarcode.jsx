import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { deleteDataFn, postDataFn, successFn } from "../services/API";
import SmallModal from "./Modals/SmallModal";

function MultipleBarcode({medicineID}) {
    const multipleBarcodeRef = useRef(null)
    const [barcoder, setBarcoder] = useState('')
    const { data: multipleBarcode, refetch: medicineBarcodeRefetch} = useQuery(`medicine-barcode/?medicine=${medicineID}`)
    
    const { mutate: newBarcode } = useMutation({
        mutationFn: () => {
          const BarcodeForm = new FormData();
          BarcodeForm.append("medicine", medicineID);
          BarcodeForm.append("barcode", barcoder);
          postDataFn(BarcodeForm, "medicine-barcode/");
        },
        onSuccess: () => {
          successFn("", () => {
              setTimeout(() => {
                medicineBarcodeRefetch();
            }, 10)
            setBarcoder("");
          });
        },
    });

    const { mutate: deleteBarcode } = useMutation({
        mutationFn: (barcodeId) => {
          deleteDataFn(`medicine-barcode/${barcodeId}`);
        },
        onSuccess: () => {
          successFn("", () => {
              setTimeout(() => {
                medicineBarcodeRefetch();
            }, 200)
            setBarcoder("");
          });
        },
    });


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
            <form className="multiple-barcode-new" onSubmit={(e) => {
                e.preventDefault()
                newBarcode()
                }}>
          <div className="multiple-barcode-new">
            <input className="multiple-barcode-input" value={barcoder} onChange={(e) => setBarcoder(e.target.value)}/>
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
