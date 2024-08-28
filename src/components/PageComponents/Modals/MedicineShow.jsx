import React, { memo } from "react";
import { forwardRef, useImperativeHandle } from "react";
import Modal from "react-modal";
import { MedicineShowModalStyles } from "../../../styles";
import { toast } from "react-toastify";

const MedicineShowModal = memo(forwardRef((props, ref) => {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [item, setItem] = React.useState("");

  const handleCopy = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          toast.info('موفقانه کپی شد');
        })
        .catch((err) => {
          console.error('Failed to copy text:', err);
          toast.error('کپی کردن متن با خطا مواجه شد');
        });
    } else {
      // Fallback approach if Clipboard API is not supported
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast.info('موفقانه کپی شد');
      } catch (err) {
        console.error('Fallback: Failed to copy text:', err);
        toast.error('کپی کردن متن با خطا مواجه شد');
      }
      document.body.removeChild(textArea);
    }
  };


  useImperativeHandle(ref, () => ({
    Opener(item) {
      setRegisterModalOpen(true);
      setItem(item);
    },
    Closer() {
      setRegisterModalOpen(false);
    },
  }));

  const onClose = () => {
    setRegisterModalOpen(false);
  };

  const ApproveHandle = (e) => {
    e.preventDefault();
    props.ApproveMedicine(item);
    onClose();
  };

  return (
    <Modal
      style={MedicineShowModalStyles}
      isOpen={registerModalOpen}
      onRequestClose={onClose}
    >
      <div className="modal-box">
        <form className="modal-box">
          <div className="meidince-show-box">
            <div className="medicine-show-pic">
              <img
                className="medicine-show-pic"
                src={
                  item.image ? item.image : "./images/nophoto.jpg"
                }
              />
            </div>
            <div className="medicine-show-info">
              <h4 style={{cursor:'pointer'}} onClick={() => {
                handleCopy(item.medicine_full) 
              }}>
                <span>نام:</span> {item.medicine_full}
              </h4>
              <h4 style={{cursor:'pointer'}}  onClick={() => {
                handleCopy(item?.generic_name?.toString())
              }}>
                <span>ترکیب:</span>
                <small>{item?.generic_name?.toString()}</small>
              </h4>
              <h4>
                <span>مکان:</span> {item.location}
              </h4>
              <h4>
                <span>قیمت:</span> {`${item.price}AF`}
              </h4>
              <h4>
                <span>تعداد در پاکت:</span> {item.no_pocket}
              </h4>
              <h4>
                <span>تعداد در قطی:</span> {item.no_box}
              </h4>
              <h4>
                <span>موجودیت:</span> {item.existence}
              </h4>
              <div>
                <span>توضیحات:</span>
                <small> {item.description}</small>
              </div>
              <div>
                <span>اخطاریه:</span>
                <small>{item.cautions}</small>
              </div>
              <div>
                <span>استفاده:</span>
                <small>{item.usages}</small>
              </div>
              <input
                type="button"
                onClick={ApproveHandle}
                autoFocus
                value="تایید"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}));
export default MedicineShowModal;
