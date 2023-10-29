import EntrancThroughEntry from "./EntrancThroughEntry";
import { SelectMedician } from "../../Medician/SelectMedicine/SelectMedician";
import { DateInputSimple } from "react-hichestan-datetimepicker";
import ControlledSelect from "../../PageComponents/ControlledSelect";
import PurchasingLists from "../../PageComponents/Lists/PurchaseLists/PurchasingLists";

export default function EntranceForm(props) {
  return (
    <div className="modal">
      <div className="entrance-box">
        <div className="entrance-report">
          <div className="entrance-report-header">راپور</div>
          <div className="entrance-report-body">
            <div className="entrance-report-map-box">
              <label>تعداد اقلام</label>
              <label>{props.report.number}</label>
            </div>
            <div className="entrance-report-map-box">
              <label>مجموع قبل از تخفیف</label>
              <label>{props.report.total_before_discount}</label>
            </div>
            <div className="entrance-report-map-box">
              <label>مجموع تخفیفات</label>
              <label>{props.report.total_discount}</label>
            </div>
            <div className="entrance-report-map-box">
              <label>مجموع عاید بونوس</label>
              <label>{props.report.total_bonous_value}</label>
            </div>
            <div className="entrance-report-map-box">
              <label>مجموع فروش</label>
              <label>{props.report.sell_total}</label>
            </div>
            <div className="entrance-report-map-box">
              <label>مجموع فایده </label>
              <label>{props.report.total_interest_percent}%</label>
              <label>{props.report.total_interest}</label>
            </div>
            <div className="entrance-report-map-box">
              <label>مجموعه</label>
              <label>{props.report.grandTotal}</label>
            </div>
            <div className="entrance-report-map-box">
              <label>مجموع فاکتور</label>
              <input
                type="text"
                onChange={(res) => props.setFactorTotal(res.target.value)}
                value={props.FactorTotal}
                tabIndex={-1}
              />
              <label
                style={{
                  fontSize: "0.9rem",
                }}
              >
                {props.exactEntrance.currency_name}
              </label>
            </div>
          </div>
          <div className="entrance-report-footer">
            <button
              className="entrance-report-button"
              onClick={props.FrontEntrance}
              tabIndex={-1}
            >
              <i class="fa-solid fa-left-long"></i>
            </button>
            <button
              className="entrance-report-button"
              onClick={props.PriceApply}
              tabIndex={-1}
            >
              <i class="fa-solid fa-comments-dollar"></i>
            </button>
            <button
              className="entrance-report-button"
              onClick={props.BackEntrance}
              tabIndex={-1}
            >
              <i class="fa-solid fa-right-long"></i>
            </button>
          </div>
        </div>
        <form className="entrance-entrance">
          <label>وضعیت:</label>
          <ControlledSelect
            control={props.control} // tabIndex={0}
            name="final_register"
            options={props.finalRegister}
            placeholder=""
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            uniqueKey={`entrance-unique${props.exactEntrance.id}`}
            defaultValue={props.finalRegister?.find((c) =>
              c.id === props.exactEntrance?.final_register ? c.name : ""
            )}
            NewComponent={
              <PurchasingLists button="plus" activeKey="final-registers" />
            }
          />
          <label>شرکت:</label>
          <div className="react-select-box">
            <ControlledSelect
              control={props.control}
              name="company"
              options={props.company}
              placeholder=""
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              uniqueKey={`entrance-unique${props.exactEntrance.id}`}
              defaultValue={props.company?.find((c) =>
                c.id === props.exactEntrance?.company ? c.name : ""
              )}
              NewComponent={
                <PurchasingLists button="plus" activeKey="companies" />
              }
            />
          </div>
          <label>انبار:</label>
          <div>
            <ControlledSelect
              control={props.control}
              name="store"
              options={props.store}
              placeholder=""
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              uniqueKey={`entrance-unique${props.exactEntrance.id}`}
              defaultValue={props.store?.find((c) =>
                c.id === props.exactEntrance?.store ? c.name : ""
              )}
              NewComponent={
                <PurchasingLists button="plus" activeKey="stores" />
              }
            />
          </div>
          <label>تاریخ:</label>

          <DateInputSimple
            onChange={(res) => props.setDatePickerValue(res.target.value)}
            value={props.datePickerValue}
          />
          <label>شماره:</label>
          <input
            type="text"
            {...props.register("factor_number")}
            defaultValue={props.exactEntrance.factor_number}
            className="entrance--inputs"
          />

          <label>ش.حواله:</label>
          <div className="flex">
            <input
              value={props.exactEntrance.id}
              type="text"
              {...props.register("entrance_id")}
              disabled
            />
            <form
              className="search-form"
              onSubmit={props.handleSubmit(props.SearchSubmit)}
            >
              <input
                type="text"
                {...props.register("entrance_search")}
                tabIndex={-1}
              />
              <button
                className="search-button-box"
                type="submit"
                onClick={props.handleSubmit(props.SearchSubmit)}
              >
                <i class="fa-brands fa-searchengin"></i>
              </button>
            </form>
          </div>

          <label>
            <h5>تحویل دهنده:</h5>
          </label>
          <input
            type="text"
            {...props.register("deliver_by")}
            defaultValue={props.exactEntrance.deliver_by}
            className="entrance--inputs"
          />
          <label>
            <h5>تحویل گیرنده:</h5>
          </label>
          <input
            type="text"
            {...props.register("recived_by")}
            defaultValue={props.exactEntrance.recived_by}
            className="entrance--inputs"
          />
          <label>واحد پول:</label>
          <ControlledSelect
            control={props.control}
            name="currency"
            options={props.currency}
            placeholder=""
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            uniqueKey={`entrance-unique${props.exactEntrance.id}`}
            defaultValue={props.currency?.find((c) =>
              c.id === props.exactEntrance?.currency ? c.name : ""
            )}
            NewComponent={
              <PurchasingLists button="plus" activeKey="currencies" />
            }
          />
          <label>پرداخت:</label>
          <ControlledSelect
            control={props.control}
            name="payment_method"
            options={props.paymentMethod}
            placeholder=""
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            uniqueKey={`entrance-unique${props.exactEntrance.id}`}
            defaultValue={props.paymentMethod?.find((c) =>
              c.id === props.exactEntrance?.payment_method ? c.name : ""
            )}
            NewComponent={
              <PurchasingLists button="plus" activeKey="payments" />
            }
          />
          <label>
            <h5>فایده%:</h5>
          </label>
          <div className="numbers-box-pocket-1">
            <input
              type="text"
              defaultValue={props.exactEntrance.total_interest}
              {...props.register("total_interest")}
              className="entrance--inputs"
            />
            <lable>تخفیف%:</lable>
            <input
              type="text"
              defaultValue={props.exactEntrance.discount_percent}
              {...props.register("discount_percent_entrance")}
              className="entrance--inputs"
            />
          </div>
          <label>
            <h5>نوع ورودی:</h5>
          </label>
          <select
            defaultValue={props.exactEntrance.wholesale}
            {...props.register("wholesale")}
          >
            <option value={"WHOLESALE"}>عمده</option>
            <option value={"SINGULAR"}>پرچون</option>
          </select>
          <label>توضیحات:</label>
          <input
            {...props.register("description")}
            defaultValue={props.exactEntrance.description}
            className="entrance--inputs"
          ></input>
          <label>عکس:</label>
          <input
            type="file"
            onChange={(e) => {
              props.setFile(e.target.files[0]);
            }}
          ></input>
          <a
            href={
              props.exactEntrance.image &&
              new URL(props.exactEntrance.image).pathname.slice(16)
            }
            target="_blank"
            style={{
              textDecoration: "none",
              color: "grey",
            }}
          >
            {props.exactEntrance.image ? "Show_Photo" : ""}
          </a>
          <div className="entrance-buttons">
            <input
              type="reset"
              value="Reset"
              onClick={props.ResetForm}
              tabIndex={-1}
            ></input>
            <input
              type="submit"
              value={props.searched ? "Update" : "Submit"}
              className="entrance--inputs"
              onClick={props.handleSubmit(props.EntranceSubmit)}
            ></input>
          </div>
        </form>
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
            />
            <lable>ت.د.قطی</lable>
            <input
              type="text"
              value={props.medician.no_box}
              {...props.register("no_box")}
              className="entrance--inputs"
              tabIndex={-1}
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
            onBlurCapture={(e) => {
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
            onChange={(res) =>
              props.setExpireDate(res.target.value.slice(0, 10))
            }
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
            {props.entranceThrough.map((through, key) => (
              <EntrancThroughEntry
                through={through}
                keyValue={through.id}
                num={key}
                kind={props.kind}
                country={props.country}
                pharmGroub={props.pharmGroub}
                UpdateUI={props.UpdateUI}
                UpdateChunk={props.UpdateChunk}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
