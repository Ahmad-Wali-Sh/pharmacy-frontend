import EntranceReport from "./EntractReport";
import EntranceHeader from "./EntranceHeader";
import EntranceThrough from "./EntranceThrough";
import EntrancBottom from "./EntranceBottom";

export default function EntranceForm({StoreCycle=false, SearchedNumber=false, trigger}) {
  return (
    <div className="modal">
      <div className={StoreCycle ? 'entrance-box-store' : "entrance-box"}>
        <EntranceReport StoreCycle={StoreCycle}/>
        <EntranceHeader StoreCycle={StoreCycle} SearchedNumber={SearchedNumber} trigger={trigger}/>
        <EntranceThrough StoreCycle={StoreCycle}/>
        <EntrancBottom StoreCycle={StoreCycle}/>
      </div>
    </div>
  );
}
