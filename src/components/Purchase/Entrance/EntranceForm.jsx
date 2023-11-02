import EntranceReport from "./EntractReport";
import EntranceHeader from "./EntranceHeader";
import EntranceThrough from "./EntranceThrough";
import EntrancBottom from "./EntranceBottom";

export default function EntranceForm() {
  // const PriceCheck = (newData, lastData) => {
  //   if (newData && lastData && newData.each_price != lastData.each_price) {
  //     PreviousPriceAlertRef.current.Opener();
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

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
        <EntranceReport />
        <EntranceHeader />
        <EntranceThrough />
        <EntrancBottom />
      </div>
    </div>
  );
}
