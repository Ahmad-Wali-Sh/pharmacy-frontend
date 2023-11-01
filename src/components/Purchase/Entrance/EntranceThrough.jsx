import { SelectMedician } from "../../Medician/SelectMedicine/SelectMedician";
import { DateInputSimple } from "react-hichestan-datetimepicker";


export default function EntranceThrough(props) {
    return (
      <div>
        <form
          className="entrance-through"
          onSubmit={props.handleSubmit(props.EntranceThroughSubmit)}
        >
          <label>قلم:</label>
          <div className="entrance-through-medician-input">
            <SelectMedician
              selectAutoCompleteData={props.selectMedicine}
              kind={props.kind}
              select
              country={props.country}
              pharmGroub={props.pharmGroub}
              trigger={props.selectTrigger}
              ref={props.SelectMedicineOpener}
              handleCloseFocus={props.handleCloseFocus}
              tabFormulate={props.tabFormulate}
            />
          </div>
          <label>تعداد:</label>
          <input
            type="text"
            {...props.register("number_in_factor")}
            id="number-in-factor-input"
            className="entrance--inputs"
            onChange={(e) => {
              props.setQuantity(e.target.value);
            }}
          />
          <label>قیمت فی:</label>
          <input
            type="text"
            {...props.register("each_price_factor")}
            className="entrance--inputs"
            value={props.purchasePrice}
            onChange={(e) => {
              props.setPurchasePrice(e.target.value);
            }}
          />
          <label>
            <h5> ت.د.پاکت:</h5>
          </label>
          <div className="numbers-box-pocket">
            <input
              type="text"
              value={props.medician.no_pocket}
              {...props.register("each_quantity")}
              className="entrance--inputs"
              tabIndex={-1}
              disabled
            />
            <lable>ت.د.قطی</lable>
            <input
              type="text"
              value={props.medician.no_box}
              {...props.register("no_box")}
              className="entrance--inputs"
              tabIndex={-1}
              disabled
            />
          </div>
          <label>فایده٪:</label>
          <input
            type="text"
            {...props.register("interest_percent")}
            className="entrance--inputs"
            onChange={(e) => {
              props.setInterest(e.target.value);
            }}
            value={props.interest}
          />
          <label>فی_فروش:</label>
          <input
            type="text"
            {...props.register("each_sell_price_afg")}
            className="entrance--inputs"
            value={props.sellPrice}
            onChange={(e) => {
              props.setSellPrice(e.target.value);
            }}
            onBlurCapture={() => {
              props.setInterest(props._toFixed(2));
            }}
          />
          <label>
            <h5> بونوس:</h5>
          </label>
          <div className="numbers-box-pocket">
            <input
              type="text"
              {...props.register("quantity_bonus")}
              className="entrance--inputs"
            />
            <lable>امانتی:</lable>
            <input
              type="checkbox"
              {...props.register("lease")}
              style={{
                width: "1rem",
              }}
            />
          </div>
          <label>انقضا.م:</label>
          <input
            type="date"
            {...props.register("expire_date")}
            className="entrance--inputs date--inputs"
            onChange={(res) => props.setExpireDate(res.target.value)}
            value={props.expireDate}
          />
          <label>انقضا.ش:</label>
          <DateInputSimple
            onChange={(res) => props.setExpireDate(res.target.value.slice(0, 10))}
          />
          <label>بچ نمبر:</label>
          <input type="text" {...props.register("batch_number")} />
          <label>تخفیف:</label>
          <input
            type="text"
            {...props.register("discount_money")}
            className="entrance--inputs"
          />
          <label>تخفیف ٪:</label>
          <input
            type="text"
            {...props.register("discount_percent")}
            className="entrance--inputs"
            value={props.discountPercent}
            onChange={(e) => {
              props.setDiscountPercent(e.target.value);
            }}
          />
          <div className="adding-box">
            <label>خرید.ق:</label>
            <label className="old-price">
              {props.medician.last_purchased} AF
            </label>
            <input type="submit" value="⤵ Add" className="add-button"></input>
          </div>
        </form>
      </div>
    );
  }