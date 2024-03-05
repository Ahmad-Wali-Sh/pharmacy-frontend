import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import BigModal from "../../PageComponents/Modals/BigModal";
import AlertModal from "../../PageComponents/Modals/AlertModal";
import EntranceForm from "./EntranceForm";
import { useFactorTotal, useEntrance } from "../../States/States";
import axios from "axios";
import useServerIP from "../../services/ServerIP";

export default function Entrance({ button, icon, title, StoreCycle = false }) {
  const EntranceModalRef = useRef(null);
  const SubmitedAlertRef = useRef(null);
  const PreviousPriceAlertRef = useRef(null);
  const TotalPriceAlertRef = useRef(null);
  const PriceAppliedAlertRef = useRef(null);
  const { entrance, setEntrance } = useEntrance();
  const { factorTotal } = useFactorTotal();

  const { serverIP } = useServerIP();

  const ClosingCheckList = () => {
    axios
      .get(serverIP + "api/" + `entrance/${entrance?.id}/`)
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

  if (StoreCycle) {
    return (
      <>
      {!button && (
        <div
          className="purchase-card"
          onClick={() => {
            setEntrance("");
            EntranceModalRef.current.Opener();
          }}
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
        <div
          onClick={() => {
            EntranceModalRef.current.Opener();
          }}
        >
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
        <EntranceForm StoreCycle={true}/>
      </BigModal>
    </>
    );
  } else {
    return (
      <>
        {!button && (
          <div
            className="purchase-card"
            onClick={() => {
              setEntrance("");
              EntranceModalRef.current.Opener();
            }}
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
          <div
            onClick={() => {
              EntranceModalRef.current.Opener();
            }}
          >
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
}
