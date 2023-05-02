import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

function Store({title, icon, button, Update}) {
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
  
    const STORE_URL = import.meta.env.VITE_STORE;
  
    const SubmitForm = (data) => {
      const StoreForm = new FormData();
      StoreForm.append("name", data.name);
      StoreForm.append("phone", data.phone);
      StoreForm.append("address", data.address);
      StoreForm.append("responsible", data.responsible);
      StoreForm.append("description", data.description);
      StoreForm.append("image", file);
  
      axios
        .post(STORE_URL, StoreForm)
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
            .get(STORE_URL)
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
                <label>نام انبار:</label>
                <input type="text" defaultValue="" {...register("name")} />
                <label>تماس انبار:</label>
                <input type="text" defaultValue="" {...register("phone")} />
                <label>آدرس:</label>
                <input type="text" defaultValue="" {...register("address")} />
                <label>مسئول:</label>
                <input type="text" defaultValue="" {...register("responsible")} />
                <label>عکس:</label>
                <input type="file" accept="image/*" className="file-input"{...register("image")} onChange={(e) => setFile(e.target.files[0]) } />
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

export default Store