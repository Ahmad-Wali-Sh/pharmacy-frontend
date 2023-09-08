import React from "react";
import { forwardRef, useImperativeHandle } from "react";
import Modal from "react-modal";
import { ModalBigStyles } from "../../../../styles";
const ExpiresMedicineModal = forwardRef((props, ref) => {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  useImperativeHandle(ref, () => ({
    Opener() {
      setRegisterModalOpen(true);
    },
    Closer() {
      setRegisterModalOpen(false);
    },
  }));

  const onClose = () => {
    setRegisterModalOpen(false);
  };

  return (
    <Modal
      style={ModalBigStyles}
      isOpen={registerModalOpen}
      onRequestClose={onClose}
    >
      <div className="modal">
        <div className="modal-header">
          <h3>دوا های تاریخ کم</h3>
          <div className="modal-close-btn" onClick={() => onClose()}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="expires-log-box">
          {props.expiresMedicine.map((medicine) => {
            return (
              <div
                className="expires-medicine-select"
                onClick={() => {
                  props.AutoCompleteHandle(medicine.medician);
                  onClose();
                }}
              >
                <div className="medician-format">
                  <div className="medician-image">
                    <img
                      className="medician-image"
                      src={
                        medicine.medician.image
                          ? new URL(medicine.medician.image).pathname.slice(16)
                          : "./images/nophoto.jpg"
                      }
                    />
                  </div>
                  <div className="medician-image">
                    <img
                      className="medician-image"
                      src={
                        medicine?.medician?.pharm_group_image
                          ? new URL(
                              medicine.medician.pharm_group_image
                            ).pathname.slice(16)
                          : "./images/nophoto.jpg"
                      }
                    />
                  </div>
                  <div className="medician-image">
                    <img
                      className="medician-image"
                      src={
                        medicine?.medician?.kind_image
                          ? new URL(
                              medicine.medician.kind_image
                            ).pathname.slice(16)
                          : "./images/nophoto.jpg"
                      }
                    />
                  </div>
                  <div className="medician-image">
                    <img
                      className="medician-image"
                      src={
                        medicine?.medician?.country_image
                          ? new URL(
                              medicine.medician.country_image
                            ).pathname.slice(16)
                          : "./images/nophoto.jpg"
                      }
                    />
                  </div>
                  <div className="medician-text-field">
                    <div>
                      <div className="medician-select-information">
                        <h4>{medicine.medician.medicine_full}</h4>
                      </div>
                      <h4>
                        ترکیب: {medicine.medician.generic_name.toString()}
                      </h4>
                      <div className="medician-text-field-numbers">
                        <h4>مکان: {medicine.medician.location}</h4>
                        <h4>قیمت: {`${medicine.medician.price}AF`}</h4>
                        <h4>تعداد در پاکت: {medicine.medician.no_pocket}</h4>
                        <h4>تعداد در قطی: {medicine.medician.no_box}</h4>
                        <h4>موجودیت: {medicine.medician.existence}</h4>
                      </div>
                    </div>
                    <div className="medician-big-text-fields">
                      <div className="medician-bix-text-field">
                        {medicine.medician.description && (
                          <div className="paragraph-big-text">
                            توضیحات:
                            {medicine.medician.description}
                          </div>
                        )}
                        {medicine.medician.cautions && (
                          <div className="paragraph-big-text">
                            اخطار:
                            {medicine.medician.cautions}
                          </div>
                        )}
                        {medicine.medician.usages && (
                          <div className="paragraph-big-text">
                            استفاده:
                            {medicine.medician.usages}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
});
export default ExpiresMedicineModal;
