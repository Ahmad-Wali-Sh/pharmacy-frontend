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
        <label>ردیف</label>
        <label>قلم</label>
        <label>تعداد(قطی)</label>
        <label>فی_خرید(قطی)</label>
        <label>مفاد</label>
        <label>فی_فروش(قطی)</label>
        <label>تخفیف %</label>
        <label>مبلغ_تخفیف</label>
        <label>بونوس</label>
        <label>کمبود</label>
        <label>امانتی</label>
        <label>تاریخ_انقضا</label>
        <label>جمع_خرید</label>
        <label>جمع_فروش</label>
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
