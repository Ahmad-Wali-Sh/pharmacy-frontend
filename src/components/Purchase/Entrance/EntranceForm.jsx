import EntranceReport from "./EntractReport";
import EntranceHeader from "./EntranceHeader";
import EntranceThrough from "./EntranceThrough";
import EntrancBottom from "./EntranceBottom";

export default function EntranceForm() {
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
