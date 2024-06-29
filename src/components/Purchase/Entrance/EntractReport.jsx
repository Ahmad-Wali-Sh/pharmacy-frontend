import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  useEntrance,
  useEntranceTrough,
  useFactorTotal,
} from "../../States/States";
import useServerIP from "../../services/ServerIP";

export default function EntranceReport() {

  const { serverIP } = useServerIP()
  const { entrance, setEntrance } = useEntrance();


  // let entranceThrough;
  const { data: entranceThrough } = useQuery({
    queryKey: [`entrance-throug/?entrance=${entrance?.id}`],
    enabled: false
  }
  ) 


  const [entranceId, setEntranceId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchEntrance = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${serverIP}api/entrance/${entranceId}/`);
        setEntrance(response.data);
      } catch (error) {
        // If there's an error, such as entrance not found, adjust entranceId until an existing entrance is found
        let adjustedId = entranceId;
        while (adjustedId > 0) {
          adjustedId--;
          try {
            const response = await axios.get(`${serverIP}/api/entrance/${adjustedId}/`);
            setEntrance(response.data);
            setEntranceId(adjustedId);
            return;
          } catch (fetchError) {
          }
        }
        // If no existing entrance is found, set error state
        setError('No existing entrance found');
      } finally {
        setIsLoading(false);
      }
    };

    entranceId && fetchEntrance();
  }, [entranceId]);

  const handleNextEntrance = async () => {
    for (let i = entranceId + 1; i <= entranceId + 5; i++) {
      try {
        const response = await axios.get(`${serverIP}api/entrance/${i}/`);
        setEntrance(response.data);
        setEntranceId(i);
        return;
      } catch (error) {
        console.error('Error fetching entrance:', error);
      }
    }
    setError('No existing entrance found');
  };

  const handlePreviousEntrance = async () => {
    for (let i = entranceId - 1; i >= entranceId - 5 && i >= 1; i--) {
      try {
        const response = await axios.get(`${serverIP}api/entrance/${i}/`);
        setEntrance(response.data);
        setEntranceId(i);
        return;
      } catch (error) {
        console.error('Error fetching entrance:', error);
      }
    }
    setError('No existing entrance found');
  };

  useEffect(() => {
    entrance?.id && setEntranceId(entrance.id)
  }, [entrance?.id])

  const { data: lastEntrance, refetch: getLastEntrance } = useQuery({
    queryKey: `last-entrance/`,
    enabled: false,
    onSuccess: (data) => {
      setEntrance(data[0])
    }
  });

  const PriceApply = () => {
    entranceThrough?.map((through) => {
      const PriceForm = new FormData();
      PriceForm.append("price", through.each_sell_price_afg);
      axios
        .patch(`${serverIP}api/medician/` + through.medician + "/", PriceForm)
        .then(() => {
          setPriceApplied(true)
          toast.info(
            `${through.medicine_full} > ${through.each_sell_price_afg}Af`
          );
        })
        .catch(() => toast.error("New Item Added."));
    });
  };


  const { factorTotal, setFactorTotal } = useFactorTotal();
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

  const [priceApplied, setPriceApplied] = useState(false)

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
      return  parseFloat(result) + parseFloat(entrance?.discount_percent);
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
      totalDiscount() -
      totalBeforeDiscount()
    ).toFixed(2);

    setReport({
      number: entranceThrough?.length,
      total_before_discount: totalBeforeDiscount().toFixed(2),
      total_discount: totalDiscount().toFixed(2),
      total: 0,
      total_bonous_value: totalBonusValue().toFixed(2),
      total_interest: totalInterester,
      total_interest_percent: (
        (totalInterester / totalBeforeDiscount()) *
        100
      ).toFixed(2),
      sell_total: totalSell().toFixed(2),
      purchase_total: totalPurchase(),
      purchase_after_discount: totalPurchase() - totalDiscount(),
      grandTotal: totalBeforeDiscount() - totalDiscount(),
    });
  };

  useEffect(() => {
    Reporting();
    setPriceApplied(false)
  }, [entranceThrough && entranceThrough, entrance?.discount_percent]);


  useEffect(() => {
    setFactorTotal(0)
  }, [entrance])

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
          <label>{report.total_before_discount} </label>
        </div>
        <div className="entrance-report-map-box">
          <label>مجموع تخفیفات</label>
          <label>{report.total_discount} </label>
        </div>
        {/* <div className="entrance-report-map-box">
          <label>مجموع عاید بونوس</label>
          <label>{report.total_bonous_value} </label>
        </div> */}
        <div className="entrance-report-map-box">
          <label>مجموع فروش</label>
          <label>{report.sell_total} </label>
        </div>
        <div className="entrance-report-map-box">
          <label>مجموع فایده </label>
          <label>{report.total_interest_percent}%</label>
          <label>{report.total_interest} </label>
        </div>
        <div className="entrance-report-map-box">
          <label>مجموعه</label>
          <label>{report.grandTotal?.toFixed(2)} </label>
        </div>
        {entrance?.currency_rate != 1 && <div className="entrance-report-map-box">
          <label>مجموعه (AFN)</label>
          <label>{report.grandTotal  * entrance?.currency_rate} AFN</label>
        </div>}
        <div className="entrance-report-map-box">
          <label>ارز</label>
          <label>
            {entrance?.currency_name &&
              entrance?.currency_name + "(" + entrance?.currency_rate + ")"}
          </label>
        </div>
        <div className="entrance-report-map-box">
          <label>مجموع.فاکتور</label>
          <input
            type="text"
            className='total-price-input'
            onChange={(res) => setFactorTotal(res.target.value)}
            value={factorTotal}
            placeholder="لطفا مجموع را وارد کنید"
            tabIndex={-1}
          />
          <label
            style={{
              fontSize: "1rem",
              paddingRight: "1rem"
            }}
          >
          </label>
        </div>
      </div>
      <div className="entrance-report-footer">
        <button
          className="entrance-report-button"
          onClick={() => {
            entrance?.id ? handlePreviousEntrance() : getLastEntrance()
          }}
          tabIndex={-1}
        >
          <i class="fa-solid fa-left-long"></i>
        </button>
        <button
          className={`entrance-report-button ${(entrance?.id && priceApplied) ? '' : entranceThrough?.length > 0 && 'alerting-button'}`}
          onClick={() => PriceApply()}
          disabled={entranceThrough?.length > 0 ? false : true}
          tabIndex={-1}
        >
          <i class="fa-solid fa-comments-dollar"></i>
        </button>
        <button
          className="entrance-report-button"
          onClick={() => {
            entrance?.id ? handleNextEntrance() : getLastEntrance()
          }}
          tabIndex={-1}
        >
          <i class="fa-solid fa-right-long"></i>
        </button>
      </div>
    </div>
  );
}
