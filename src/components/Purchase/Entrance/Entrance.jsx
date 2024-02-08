import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import BigModal from "../../PageComponents/Modals/BigModal";
import AlertModal from "../../PageComponents/Modals/AlertModal";
import EntranceForm from "./EntranceForm";
import { useFactorTotal, useEntrance } from "../../States/States";
import axios from "axios";

async function loadEnvVariables(key) {
  try {
      const response = await fetch('/env.json');
      const data = await response.json();
      return data[key] || null; // Return the value corresponding to the provided key, or null if not found
  } catch (error) {
      console.error('Error loading environment variables:', error);
      return null; // Return null if there's an error
  }
}

export default function Entrance({ button, icon, title }) {
  const EntranceModalRef = useRef(null);
  const SubmitedAlertRef = useRef(null);
  const PreviousPriceAlertRef = useRef(null);
  const TotalPriceAlertRef = useRef(null);
  const PriceAppliedAlertRef = useRef(null);
  const { entrance } = useEntrance();
  const { factorTotal } = useFactorTotal();

  const [API_URL, setAUTH_URL] = useState('');
  useEffect(() => {
    loadEnvVariables('VITE_API')
      .then(apiValue => {
        setAUTH_URL(apiValue);
      })
      .catch(error => {
        console.error('Error loading VITE_API:', error);
      });
  }, []);


  

  const ClosingCheckList = () => {
    axios
      .get(API_URL + `entrance/${entrance?.id}`)
      .then((ent) => {
        if (factorTotal == ent.data.entrance_total) {
          EntranceModalRef.current.Closer();
        } else {
          TotalPriceAlertRef.current.Opener();
        }
      })
      .catch(() => {
        EntranceModalRef.current.Closer();
      });
  };

  return (
    <>
      {!button && (
        <div
          className="purchase-card"
          onClick={() => EntranceModalRef.current.Opener()}
        >
          <div>
            <h3>{title}</h3>
          </div>
          <div>
            <i className={icon}></i>
          </div>
        </div>
      )}
      {button && button == 1 && (
        <div onClick={() => EntranceModalRef.current.Opener()}>
          <i class="fa-solid fa-circle-info"></i>
        </div>
      )}
      <BigModal
        title="ثبت فاکتور"
        ref={EntranceModalRef}
        closeFunc={() => ClosingCheckList()}
        EscOff={() => ClosingCheckList()}
      >
        <AlertModal
          errorTitle="خطا در مجموع فاکتور!"
          errorText="آیا با بستن صفحه موافقید؟"
          OkFunc={() => {
            TotalPriceAlertRef.current.Closer();
            EntranceModalRef.current.Closer();
          }}
          NoFunc={() => TotalPriceAlertRef.current.Closer()}
          ref={TotalPriceAlertRef}
        />
        <AlertModal
          errorTitle="خطای اعمال قیمت!"
          errorText="آیا با بستن صفحه موافقید؟"
          OkFunc={() => {
            PriceAppliedAlertRef.current.Closer();
            EntranceModalRef.current.Closer();
          }}
          NoFunc={() => PriceAppliedAlertRef.current.Closer()}
          ref={PriceAppliedAlertRef}
        />
        <EntranceForm />
      </BigModal>
    </>
  );
}
