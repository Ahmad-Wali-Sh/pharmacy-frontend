import { useQuery } from "react-query";
import { useEntrance, useEntranceTrough } from "../../States/States";
import EntrancThroughEntry from "./EntrancThroughEntry";
import { useEffect, useState } from "react";

export default function EntrancBottom(props) {
  // const { entranceThrough, setEntranceTrough } = useEntranceTrough();
  const { entrance, setEntrance} = useEntrance()
  const { data: entranceThrough } = useQuery(`entrance-throug/?entrance=${entrance?.id}`, {cacheTime:10, enabled: false})
  
  const [selectedIdx, setSelectedIdx] = useState('');

  useEffect(() => {
    setSelectedIdx('')
  }, [entrance])

  useEffect(() => {
    const selectedElement = document.getElementById(`item-${selectedIdx}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedIdx]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        setSelectedIdx((prevIdx) => Math.max(prevIdx - 1, 0));
      } else if (event.key === 'ArrowDown') {
        setSelectedIdx((prevIdx) => Math.min(prevIdx + 1, entranceThrough?.length - 1));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [entranceThrough]);
  
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
            onBluring={() => setSelectedIdx('')}
            through={through}
            keyValue={through.id}
            id={`item-${key}`}
            styled={`${selectedIdx === key ? 'highlighted-item' : ''}`}
            onClick={() => setSelectedIdx(key)}
            num={key}
            UpdateUI={props.UpdateUI}
            UpdateChunk={props.UpdateChunk}
          />
        ))}
      </div>
    </form>
  );
}
