import EntranceReport from "./EntractReport";
import EntranceHeader from "./EntranceHeader";
import EntranceThrough from "./EntranceThrough";
import EntrancBottom from "./EntranceBottom";

export default function EntranceForm({StoreCycle=false}) {
  return (
    <div className="modal">
      <div className="entrance-box">
        <EntranceReport StoreCycle={StoreCycle}/>
        <EntranceHeader StoreCycle={StoreCycle}/>
        <EntranceThrough StoreCycle={StoreCycle}/>
        <EntrancBottom StoreCycle={StoreCycle}/>
      </div>
    </div>
  );
}
