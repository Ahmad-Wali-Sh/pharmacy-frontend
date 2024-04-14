import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { SimplePurchaseListStyle } from "../../../../styles";
import axios from "axios";
import useServerIP from "../../../services/ServerIP";
import { useAuthUser } from "react-auth-kit";
import { toast } from "react-toastify";

const SimplePurchaseList = React.forwardRef(({medicine}, ref) => {
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
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

  const [input, setInput] = useState('')
  const { serverIP} = useServerIP()
  const user = useAuthUser()
  

  return (
    <Modal
      style={SimplePurchaseListStyle}
      isOpen={registerModalOpen}
      onRequestClose={() => onClose()}
    >
      <div className="modal-header">
        <h3>اضافه کردن به لست خرید</h3>
        <div className="modal-close-btn" onClick={() => onClose()}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
        <form className="modal-box" onSubmit={(e) => {
            e.preventDefault()
            const Form = new FormData()
            Form.append('medicine', medicine.id)
            Form.append('quantity', input)
            Form.append('user', user().id )
            axios.post(`${serverIP}api/purchase-list-manual/`, Form).then(() => {
                toast.success('موفقانه بود')
                onClose()
            })
        }}>
            <div style={{width:'80%', marginLeft: '10%',padding: '1rem', scale: '1.3'}}>
            <div style={{margin: '1rem'}}>{medicine?.medicine_full}</div>
            <div style={{fontSize: '0.7rem'}}>{medicine?.existence} :موجودی</div>
            <input autoFocus className="default-inputs" onChange={(e) => setInput(e.target.value)} style={{width: '10rem', textAlign:'center', fontSize:'1rem', marginTop: '0.4rem'}}/>
            </div>
        </form>
    </Modal>
  );
});

export default SimplePurchaseList;
