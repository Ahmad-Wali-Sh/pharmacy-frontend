import React from "react";
import Modal from "react-modal";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {useAuthUser} from 'react-auth-kit'
import { MainButton, PlusButton } from "../PageComponents/Buttons/Buttons";


function Country({title, icon, button, Update}) {
    const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
    const [file, setFile] = React.useState("");

    const user = useAuthUser()

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
        left: "30%",
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
  
    const COUNTRY_URL = import.meta.env.VITE_COUNTRY;
  
    const SubmitForm = (data) => {
      const CountryForm = new FormData();
      CountryForm.append("name", data.name);
      CountryForm.append("image", file);
      CountryForm.append("user", user().id);
  
      axios
        .post(COUNTRY_URL, CountryForm)
        .then((e) => {
          if (button == 2) {
            registerModalCloser();
            Update();
          }
          toast.success("Data Updated Successfuly.");
        })
  
        .catch((err) => {
          toast.error("Check Your Input And Try Again!");
        });
    };


    return (
      <>
        {button == 1 && (
          <MainButton 
          Func={() => registerModalOpener()}
          title={title}
          icon={icon}
          />
        )}
        {button == 2 && (
          <PlusButton Func={() => registerModalOpener()}/>
        )}
        <Modal
          style={ModalStyles}
          isOpen={registerModalOpen}
          onRequestClose={registerModalCloser}
        >
          <div className="modal-header">
            <h3>ثبت کشور</h3>
            <div className="modal-close-btn" onClick={registerModalCloser}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <form className="store">
            <div className="store">
              <div className="store-form">
                <label>نام انگلیسی:</label>
                <input type="text" defaultValue="" {...register("name")} />
                <label>عکس:</label>
                <input type="file" accept="image/*" className="file-input" onChange={(e) => setFile(e.target.files[0]) } />
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

export default Country;
