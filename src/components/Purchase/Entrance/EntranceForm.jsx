import EntranceReport from "./EntractReport";
import EntranceHeader from "./EntranceHeader";
import EntranceThrough from "./EntranceThrough";

export default function EntranceForm({ report, handleSubmit, control, reset }) {

  const PriceCheck = (newData, lastData) => {
    if (newData && lastData && newData.each_price != lastData.each_price) {
      PreviousPriceAlertRef.current.Opener();
      return true;
    } else {
      return false;
    }
  };

  

  // const PriceApply = () => {
  //   entranceThrough.map((through) => {
  //     const PriceForm = new FormData();
  //     PriceForm.append("price", through.each_sell_price_afg);
  //     axios
  //       .patch(MEDICIAN_URL + through.medician + "/", PriceForm)
  //       .then((res) => {
  //         toast.info(
  //           `Medicine Price Changed to: ${through.each_sell_price_afg}AFG`
  //         );
  //       })
  //       .catch((res) => toast.error("New Item Added."));
  //   });
  // };
  return (
    <div className="modal">
      <div className="entrance-box">
        {/* <EntranceReport
          report={report}
          setFactorTotal={props.setFactorTotal}
          FactorTotal={props.FactorTotal}
          front={props.FrontEntrance}
          middle={props.PriceApply}
          back={props.BackEntrance}
        /> */}
        <EntranceHeader
        />
        {/* <EntranceThrough
          handleSubmit={props.handleSubmit}
          EntranceThroughSubmit={props.EntranceThroughSubmit}
          selectMedicine={props.selectMedicine}
          kind={props.kind}
          country={props.country}
          pharmGroub={props.pharmGroub}
          selectTrigger={props.selectTrigger}
          SelectMedicineOpener={props.SelectMedicineOpener}
          handleCloseFocus={props.handleCloseFocus}
          tabFormulate={props.tabFormulate}
          register={props.register}
          setQuantity={props.setQuantity}
          purchasePrice={props.purchasePrice}
          setPurchasePrice={props.setPurchasePrice}
          medician={props.medician}
          setInterest={props.setInterest}
          interest={props.interest}
          sellPrice={props.sellPrice}
          setSellPrice={props.setSellPrice}
          _toFixed={props._toFixed}
          setExpireDate={props.setExpireDate}
          expireDate={props.expireDate}
          discountPercent={props.discountPercent}
          setDiscountPercent={props.setDiscountPercent}
        ></EntranceThrough>
        <EntrancBottom
          entranceThrough={props.entranceThrough}
          kind={props.kind}
          country={props.country}
          pharmGroub={props.pharmGroub}
          UpdateUI={props.UpdateUI}
          UpdateChunk={props.UpdateChunk}
        ></EntrancBottom> */}
      </div>
    </div>
  );
}
