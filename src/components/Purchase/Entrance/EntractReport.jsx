import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useEntrance, useEntranceTrough, useFactorTotal } from "../../States/States";

export default function EntranceReport() {
  // const { entranceThrough, setEntranceThrough } = useEntranceTrough();

  const { entrance, setEntrance} = useEntrance()
  const { data: entranceThrough } = useQuery(`entrance-throug/?entrance=${entrance.id}`)

  const { FactorTotal, setFactorTotal } = useFactorTotal();
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

  const Reporting = () => {
    const totalInterest = () => {
      let result = 0;
      entranceThrough?.map((through) => {
        result += through.total_interest * through.no_box;
        return result;
      });
      return result ? result : 0;
    };
    const totalPurchase = () => {
      const result = entranceThrough?.reduce((total, currentValue) => {
        return total + currentValue.number_in_factor * currentValue.each_price;
      }, 0);
      return result ? result : 0;
    };
    const totalBeforeDiscount = () => {
      const result = entranceThrough?.reduce((total, current) => {
        return total + current.total_purchase_currency_before;
      }, 0);
      return result ? result : 0;
    };
    const totalDiscount = () => {
      const result = entranceThrough?.reduce((total, currentValue) => {
        return total + currentValue.discount_value;
      }, 0);
      return result ? result : 0;
    };
    const totalBonusValue = () => {
      const result = entranceThrough?.reduce((total, currentValue) => {
        return total + currentValue.bonus_value;
      }, 0);
      return result ? result : 0;
    };
    const totalSell = () => {
      const result = entranceThrough?.reduce((total, currentValue) => {
        return total + currentValue.total_sell;
      }, 0);
      return result ? result : 0;
    };
    const totalInterester = (
      totalSell() +
      totalBonusValue() +
      totalDiscount() -
      totalBeforeDiscount()
    ).toFixed(1);

    
    setReport({
      number: entranceThrough?.length,
      total_before_discount: totalBeforeDiscount().toFixed(1),
      total_discount: totalDiscount().toFixed(1),
      total: 0,
      total_bonous_value: totalBonusValue().toFixed(1),
      total_interest: totalInterester,
      total_interest_percent: (
        (totalInterester / totalBeforeDiscount()) *
        100
      ).toFixed(1),
      sell_total: totalSell().toFixed(1),
      purchase_total: totalPurchase(),
      purchase_after_discount: totalPurchase() - totalDiscount(),
      grandTotal: totalBeforeDiscount() - totalDiscount(),
    });
  };

  useEffect(() => {
    Reporting();
  }, [entranceThrough]);

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
            {entranceThrough?.rate_name}
          </label>
        </div>
      </div>
      <div className="entrance-report-footer">
        <button
          className="entrance-report-button"
          onClick={() => console.log("left")}
          tabIndex={-1}
        >
          <i class="fa-solid fa-left-long"></i>
        </button>
        <button
          className="entrance-report-button"
          onClick={() => console.log("middle")}
          tabIndex={-1}
        >
          <i class="fa-solid fa-comments-dollar"></i>
        </button>
        <button
          className="entrance-report-button"
          onClick={() => console.log("right")}
          tabIndex={-1}
        >
          <i class="fa-solid fa-right-long"></i>
        </button>
      </div>
    </div>
  );
}
