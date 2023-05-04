import React from "react";
import Modal from "react-modal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function PharmGroup({title, icon, button, Update}) {
    const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
    const [file, setFile] = React.useState("");

    function registerModalOpener() {
      setRegisterModalOpen(true);
    }
    function registerModalCloser() {
      setRegisterModalOpen(false);
    }
  
    const ModalStyles = {
      content: {
        backgroundColor: "rgb(30,30,30)",
        border: "none",
        borderRadius: "1rem",
        overflow: "hidden",
        padding: "0px",
        width: "35%",
        left: "30%"
      },
      overlay: {
        backgroundColor: "rgba(60,60,60,0.5)",
        textAlign: "center"
      },
    };
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const PHARM_GROUB_URL = import.meta.env.VITE_PHARM_GROUB;
  
    const SubmitForm = (data) => {
      const PharmGroupForm = new FormData();
      PharmGroupForm.append("name_english", data.name_english);
      PharmGroupForm.append("name_persian", data.name_persian);
      PharmGroupForm.append("description", data.description);
      PharmGroupForm.append("image", file);
  
      axios
        .post(PHARM_GROUB_URL, PharmGroupForm)
        .then((e) => {
          if (button == 2) {
            registerModalCloser();
            Update();
          }
          toast.success("Data Updated Successfuly.");
          console.log(e.data);
        })
  
        .catch((err) => {
          console.log(err);
          toast.error("Check Your Input And Try Again!");
        });
    };
    const [storeLength, setStoreLength] = React.useState(0)

    React.useEffect(() => {
        axios
            .get(PHARM_GROUB_URL)
            .then((res) => setStoreLength(res.data.length))
            .catch((err) => console.log(err))
    }, [])
    return (
      <>
        {button == 1 && (
          <div className="purchase-card" onClick={registerModalOpener}>
            <div>
              <h3>{title}</h3>
              <div>{storeLength}</div>
            </div>
            <div>
              <i className={icon}></i>
            </div>
          </div>
        )}
        {button == 2 && (
          <div className="plus-box" onClick={registerModalOpener}>
            <div className="plus">
            <i class="fa-solid fa-plus"></i>
            </div>
          </div>
        )}
        <Modal
          style={ModalStyles}
          isOpen={registerModalOpen}
          onRequestClose={registerModalCloser}
        >
          <div className="modal-header">
            <h3>ثبت شرکت</h3>
            <div className="modal-close-btn" onClick={registerModalCloser}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <form className="store">
            <div className="store">
              <div className="store-form">
                <label>نام انگلیسی:</label>
                <input type="text" defaultValue="" {...register("name_english")} />
                <label>نام فارسی:</label>
                <input type="text" defaultValue="" {...register("name_persian")} />
                <label>عکس:</label>
                <input type="file" accept="image/*" className="file-input" onChange={(e) => setFile(e.target.files[0]) } />
                <label>توضیحات:</label>
                <textarea type="text" defaultValue="" {...register("description")} />
              </div>
              <div className="store-submit">
                <input
                  onClick={handleSubmit(SubmitForm)}
                  type="submit"
                  value="ثبت شرکت"
                />
                <input type="reset" value="ریسیت" />
              </div>
            </div>
          </form>
        </Modal>
      </>
    );
}

export default PharmGroup;
