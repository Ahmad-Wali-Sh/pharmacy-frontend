import { useEffect } from "react";
import { useEntranceTrough } from "../../States/States";
import { Reporting } from "./Reporting";

export default function EntranceReport({ setFactorTotal, FactorTotal }) {

    const {entranceTrough, setEntranceThrough} = useEntranceTrough()
    
    const [report, setReport] = useState({
        number: 0,
        total_before_discount: 0,
        total_discount: 0,
        total_bonous_value: 0,
        sell_total: 0,
        total: 0,
        total_interest: 0,
        net_profit: 0,
        purchase_total: 0,
      });

      useEffect(() => {
          Reporting(entranceTrough)
      },[entranceTrough])
    
  return (
    <div className="entrance-report">
      <div className="entrance-report-header">راپور</div>
      <div className="entrance-report-body">
        <div className="entrance-report-map-box">
          <label>تعداد اقلام</label>
          <label>{report.number}</label>
        </div>
        <div className="entrance-report-map-box">
          <label>مجموع قبل از تخفیف</label>
          <label>{report.total_before_discount}</label>
        </div>
        <div className="entrance-report-map-box">
          <label>مجموع تخفیفات</label>
          <label>{report.total_discount}</label>
        </div>
        <div className="entrance-report-map-box">
          <label>مجموع عاید بونوس</label>
          <label>{report.total_bonous_value}</label>
        </div>
        <div className="entrance-report-map-box">
          <label>مجموع فروش</label>
          <label>{report.sell_total}</label>
        </div>
        <div className="entrance-report-map-box">
          <label>مجموع فایده </label>
          <label>{report.total_interest_percent}%</label>
          <label>{report.total_interest}</label>
        </div>
        <div className="entrance-report-map-box">
          <label>مجموعه</label>
          <label>{report.grandTotal}</label>
        </div>
        <div className="entrance-report-map-box">
          <label>مجموع فاکتور</label>
          <input
            type="text"
            onChange={(res) => setFactorTotal(res.target.value)}
            value={FactorTotal}
            tabIndex={-1}
          />
          <label
            style={{
              fontSize: "0.9rem",
            }}
          >
            {currency_name}
          </label>
        </div>
      </div>
      <div className="entrance-report-footer">
        <button
          className="entrance-report-button"
          onClick={front}
          tabIndex={-1}
        >
          <i class="fa-solid fa-left-long"></i>
        </button>
        <button
          className="entrance-report-button"
          onClick={middle}
          tabIndex={-1}
        >
          <i class="fa-solid fa-comments-dollar"></i>
        </button>
        <button
          className="entrance-report-button"
          onClick={back}
          tabIndex={-1}
        >
          <i class="fa-solid fa-right-long"></i>
        </button>
      </div>
    </div>
  );
}