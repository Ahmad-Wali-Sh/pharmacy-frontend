import React, { useRef, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import Modal from "react-modal";
import { AdditioanlModalStyle } from "../../../../styles";
import useServerIP from "../../../services/ServerIP";
import axios from "axios";
import { toast } from "react-toastify";
import { SelectMedician } from "../../../Medician/SelectMedicine/SelectMedician";

const AdditionalMedicine = forwardRef(({ medicine }, ref) => {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  const [medicineWith, setMedicineWith] = useState([]);

  const [additionals, setAdditionals] = useState([]);

  const { serverIP } = useServerIP();
  useImperativeHandle(ref, () => ({
    Opener() {
      setRegisterModalOpen(true);
      setInputValues({});
    },
    Closer() {
      setRegisterModalOpen(false);
    },
  }));

  const MedicineWithFecth = (medicineId) => {
    axios
      .get(`${serverIP}api/medicine-with/?medician=${medicineId}`)
      .then((res) => {
        setMedicineWith(res.data?.[0]);
        setAdditionals(res.data?.[0]?.additional);
      });
  };

  const onClose = () => {
    setRegisterModalOpen(false);
  };

  const handleDelete = (id) => {
    const index = additionals.findIndex((obj) => obj.id === id);
    if (index !== -1) {
      const newArray = [
        ...additionals.slice(0, index),
        ...additionals.slice(index + 1),
      ];
      setAdditionals(newArray);
      const Form = new FormData();

      if (newArray.length === 0) {
        axios
          .delete(`${serverIP}api/medicine-with/${medicineWith?.id}/`)
          .then(() => {
            toast.success("موفقانه حذف شد");
            MedicineWithFecth(medicine?.id);
          });
      } else if (newArray.length === 1) {
        Form.append("additional", newArray[0].id);
        axios
          .patch(`${serverIP}api/medicine-with/${medicineWith?.id}/`, Form)
          .then((e) => {
            toast.success("موفقانه حذف شد");
            MedicineWithFecth(medicine?.id);
          })
          .catch((e) => console.log(e));
      } else {
        newArray.forEach((item, i) => {
          Form.append(`additional`, item.id);
        });
        axios
          .patch(`${serverIP}api/medicine-with/${medicineWith?.id}/`, Form)
          .then((e) => {
            toast.success("موفقانه حذف شد");
            MedicineWithFecth(medicine?.id);
          })
          .catch((e) => console.log(e));
      }
    }
  };
  const MedicineSelectRef = useRef()

  const selectMedicine = (selectedMedicine) => {
    const additon = additionals ? [...additionals, selectedMedicine] : ''
    const PatchForm = new FormData()
    additionals && additon?.forEach((item, i) => {
      medicine?.id != item.id ? PatchForm.append(`additional`, item.id) : toast.warning('اصل دوا شامل دوا های همراه نمیشود')
      });
      if (medicineWith) {
          axios.patch(`${serverIP}api/medicine-with/${medicineWith?.id}/`, PatchForm).then((e) => {
              toast.success("موفقانه اضافه شد");
              MedicineWithFecth(medicine?.id);
          }).catch((e) => console.log(e))
      } 
      else {
        const PostForm = new FormData()
        PostForm.append(`additional`, selectedMedicine?.id);
        PostForm.append(`medician`, medicine?.id);
        selectedMedicine.id != medicine?.id ? axios.post(`${serverIP}api/medicine-with/`, PostForm).then(() => {
            toast.success("موفقانه اضافه شد");
            MedicineWithFecth(medicine?.id);
        }) : toast.warning('اصل دوا شامل دوا های همراه نمیشود')
      }

  }

  return (
      <>
      <div
        className="multiple-image-button"
        onClick={() => {
          setRegisterModalOpen(true);
          MedicineWithFecth(medicine?.id);
        }}
      >
        دارو های همراه
      </div>
      <Modal
        style={AdditioanlModalStyle}
        isOpen={registerModalOpen}
        onRequestClose={onClose}
      >
        <div className="modal-header">
          <h3>دوا های همراه</h3>
          <div className="modal-close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="modal-box">
          <div className="additional-medicine-container">
            <div className="additional-meidicne-header-settings">
              <h4>تصویر</h4>
              <h4>نوعیت</h4>
              <h4>کشور</h4>
              <h4>اطلاعات</h4>
              <h4>حذف</h4>
            </div>
            {medicineWith?.additional?.map((addin) => (
              <form className="additional-meidicne-item-settings">
                <img
                  style={{ width: "90%", borderRadius: "1rem", height: "100%" }}
                  src={addin.image ? addin?.image : "./images/nophoto.jpg"}
                ></img>
                <img
                  style={{ width: "90%", borderRadius: "1rem", height: "100%" }}
                  src={
                    addin.kind_image
                      ? serverIP + addin.kind_image
                      : "./images/nophoto.jpg"
                  }
                ></img>
                <img
                  style={{ width: "90%", borderRadius: "1rem", height: "100%" }}
                  src={
                    addin.country_image
                      ? serverIP + addin.country_image
                      : "./images/nophoto.jpg"
                  }
                ></img>
                <div className="medician-text-field-add">
                  <h4>{addin?.medicine_full}</h4>
                  <h4 style={{ height: "40%" }}>
                    {addin?.generic_name?.[0] && (
                      <div>{addin?.generic_name?.toString()}</div>
                    )}
                  </h4>
                  <div className="medicine-info-fields">
                    <h4>ت.پ: {addin?.no_pocket}</h4>
                    <h4>ت.ق: {addin?.no_box}</h4>
                    <h4>مکان: {addin?.location}</h4>
                    <h4>قیمت: {addin?.price}</h4>
                    <h4>موجودی: {addin?.existence}</h4>
                  </div>
                </div>
                <h4
                  style={{ marginRight: "0.6rem" }}
                  onClick={() => {
                    handleDelete(addin?.id);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </h4>
              </form>
            ))}
            <div onClick={() => {
                MedicineSelectRef.current.Opener()
            }} className="plus-adder">+</div>
          </div>
        </div>
      </Modal>
      <div style={{display:'none'}}>
      <SelectMedician edit={true} ready={true} selectAutoCompleteData={selectMedicine} ref={MedicineSelectRef}/>
      </div>
    </>
  );
});
export default AdditionalMedicine;
