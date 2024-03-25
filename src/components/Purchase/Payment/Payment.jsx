import React from 'react'
import Modal from 'react-modal'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from "react-toastify";
import {useAuthUser} from 'react-auth-kit'


function Payment({Update}) {
    const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  function registerModalOpener() {
    setRegisterModalOpen(true);
  }
  function registerModalCloser() {
    setRegisterModalOpen(false);
  }

  const user = useAuthUser()

  const ModalStyles = {
    content: {
      backgroundColor: "rgb(50,50,50)",
      border: "none",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: "0px",
      margin: "0px",
      width: "30%",
      left: "35%",
      height: "30%",
      top: "30%"
    },
    overlay: {
      backgroundColor: "rgba(60,60,60,0.5)",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const PAYMENT_URL = import.meta.env.VITE_PAYMENT_METHOD

  const FinalSubmit = (data) => {
      const FinalForm = new FormData()
      FinalForm.append('name', data.name)
      FinalForm.append('user', user().id)

      axios
          .post(PAYMENT_URL, FinalForm)
          .then((res) => {
            registerModalCloser()
            toast.success('Item Added Succesfully')
            Update()
          })
          .catch((err)=> {
            console.log(err)
            toast.error('Check input and Your Permissions and Try Again.')
          })

  }

  return (
      <>
        <div className="plus-box-final" onClick={registerModalOpener}>
          <div className="plus">
          <i class="fa-solid fa-plus"></i>
          </div>
        </div>
      <Modal
        style={ModalStyles}
        isOpen={registerModalOpen}
        onRequestClose={registerModalCloser}
      >
        <div className="modal-header">
          <h3>ثبت نوع پرداخت</h3>
          <div className="modal-close-btn" onClick={registerModalCloser}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className='final-register-input-box'>
            <label>نام</label>
            <input type="text" className='default-inputs' {...register('name')}/>
        </div>
        <div className="final-register-input-buttons">
            <input type="button" value="ثبت" onClick={handleSubmit(FinalSubmit)}/>
        </div>
        </Modal>
      </>
  )
}

export default Payment