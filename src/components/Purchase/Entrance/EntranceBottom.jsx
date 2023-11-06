import { useQuery } from "react-query";
import { useEntrance, useEntranceTrough } from "../../States/States";
import EntrancThroughEntry from "./EntrancThroughEntry";

export default function EntrancBottom(props) {
  // const { entranceThrough, setEntranceTrough } = useEntranceTrough();
  const { entrance, setEntrance} = useEntrance()
  const { data: entranceThrough } = useQuery(`entrance-throug/?entrance=${entrance.id}`)
  return (
    <form className="entrance-medician">
      <div className="entrance-medician-header">
        <label>No</label>
        <label>قلم</label>
        <label>تعداد</label>
        <label>قیمت</label>
        <label>تخفیف</label>
        <label>تخفیف %</label>
        <label>ت.قطی</label>
        <label>جمع.خرید</label>
        <label>بعد.تخفیف</label>
        <label>بونوس</label>
        <label>تاریخ</label>
        <label>کمبود</label>
        <label>امانتی</label>
        <label>فی.خرید</label>
        <label>فایده٪</label>
        <label>به.افغانی</label>
        <label>حذف</label>
      </div>
      <div className="entrance-map">
        {entranceThrough?.map((through, key) => (
          <EntrancThroughEntry
            through={through}
            keyValue={through.id}
            num={key}
            UpdateUI={props.UpdateUI}
            UpdateChunk={props.UpdateChunk}
          />
        ))}
      </div>
    </form>
  );
}
