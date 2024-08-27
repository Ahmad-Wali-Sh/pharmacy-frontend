import React, { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import Modal from "react-modal";
import { AdditioanlModalStyle } from "../../../../styles";
import useServerIP from "../../../services/ServerIP";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { useMutation } from "react-query";
import { postDataFn, successFn } from "../../../services/API";
import { toast } from "react-toastify";

const AdditionalMedicineModal = forwardRef(
  ({ medicine, prescription, prescriptionThrough, medicineSelectRef }, ref) => {
    const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

    useImperativeHandle(ref, () => ({
      Opener() {
        setRegisterModalOpen(true);
        setInputValues({});
      },
      Closer() {
        setRegisterModalOpen(false);
      },
    }));

    const onClose = () => {
      setRegisterModalOpen(false);
    };

    const { mutateAsync: prescriptionThroughPost } = useMutation({
      mutationFn: (data) => postDataFn(data, "prescription-through/"),
      onSuccess: () => {
        successFn(
          `prescription-through/?prescription=${prescription?.id}`,
          () => {}
        );
      },
    });

    const MedicineIncludeCheck = (medicineId) => {
      let result = false;

      prescriptionThrough?.map((presThrough) => {
        presThrough.medician == medicineId && (result = presThrough);
        return result;
      });
      return result;
    };

    const { serverIP } = useServerIP();
    const user = useAuthUser();

    const onAdditionalSubmit = (e) => {
      e.preventDefault();
      const inputData = Object.entries(inputValues).map(
        ([addinId, inputValue]) => {
          const addin = medicine.add_medicine[0].additional.find(
            (a) => a.id === parseInt(addinId)
          );
          return {
            addinId,
            value: inputValue.value,
            price: addin.price,
          };
        }
      );
      console.log(prescriptionThrough);

      
      inputData.map((item) => {
        const prescriptionPatch = prescriptionThrough.find(entry => entry.medician == item.addinId)
        const PrescriptionThroughForm = new FormData();
        PrescriptionThroughForm.append("quantity", item.value);
        PrescriptionThroughForm.append("each_price", item.price);
        PrescriptionThroughForm.append("medician", item.addinId);
        PrescriptionThroughForm.append("prescription", prescription?.id);
        PrescriptionThroughForm.append("user", user().id);
        const quantity = Number(item.value);
        if (MedicineIncludeCheck(item.addinId) === false && Number.isFinite(quantity) && quantity > 0) {
          prescriptionThroughPost(PrescriptionThroughForm);
        }
        else {
          const PrescriptionPatchForm = new FormData()
          PrescriptionPatchForm.append('quantity', parseFloat(prescriptionPatch.quantity) + parseFloat(item.value))
          axios.patch(`${serverIP}api/prescription-through/${prescriptionPatch?.id}/`, PrescriptionPatchForm).then((res) => {
            toast.success('موفقانه به تعداد اضافه شد')
            successFn(
              `prescription-through/?prescription=${prescription?.id}`,
              () => {}
            );
          })
        }
      });
      onClose();
      setTimeout(() => {
        medicineSelectRef.current.Opener();
      }, 300);
    };

    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (event, addinId) => {
      const { name, value } = event.target;
      setInputValues((prevValues) => ({
        ...prevValues,
        [addinId]: { ...prevValues[addinId], [name]: value },
      }));
    };

    return (
      <Modal
        style={AdditioanlModalStyle}
        isOpen={registerModalOpen}
        onRequestClose={() => onClose()}
      >
        <div className="modal-header">
          <h3>دوا های همراه</h3>
          <div className="modal-close-btn" onClick={() => onClose()}>
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
              <h4>تعداد</h4>
            </div>
            {medicine?.add_medicine?.[0]?.additional?.map((addin, index) => (
              <form
                className="additional-meidicne-item-settings"
                onSubmit={onAdditionalSubmit}
              >
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
                <input
                  type="text"
                  className="default-inputs"
                  name="value"
                  id={addin.id}
                  value={inputValues[addin.id]?.value || ""}
                  onChange={(event) => handleInputChange(event, addin.id)}
                />
              </form>
            ))}
          </div>
        </div>
      </Modal>
    );
  }
);
export default AdditionalMedicineModal;
