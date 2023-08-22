import React from "react";

function PrescriptionReportBox({
  report,
  prescription,
  BackFunc,
  FrontFunc,
  MiddleFunc,
}) {
  return (
    <div className="entrance-report">
      <div className="entrance-report-header">راپور</div>
      <div className="entrance-report-body">
        <div className="entrance-report-map-box">
          <label>{report.number}</label>
          <label>:تعداد اقلام</label>
        </div>
        <div className="entrance-report-map-box">
          <label>
            {report?.total ? report.total : ""}
            <span style={{ fontSize: "small" }}>AF</span>
          </label>
          <label>:مجموع فروش</label>
        </div>
        <div className="entrance-report-map-box">
          <label>
            {report?.disount_value ? report.disount_value : ""}{" "}
            <span style={{ fontSize: "small" }}>AF</span>
          </label>
          <label>:تخفیف</label>
        </div>
        <div className="entrance-report-map-box">
          <label>
            {prescription?.khairat ? prescription.khairat : ""}
            <span style={{ fontSize: "small" }}>AF</span>
          </label>
          <label>:خیرات</label>
        </div>
        <div className="entrance-report-map-box">
          <label>
            {prescription?.zakat ? prescription.zakat : ""}
            <span style={{ fontSize: "small" }}>AF</span>
          </label>
          <label>:ذکات</label>
        </div>
        <div className="entrance-report-map-box">
          <label>
            {report.total_to_sale ? report.total_to_sale : ""}
            <span style={{ fontSize: "small" }}>AF</span>
          </label>
          <label>:قابل پرداخت</label>
        </div>
        <div className="entrance-report-map-box">
          <label>
            {report.rounded_number ? report.rounded_number : ""}
            <span style={{ fontSize: "small" }}>AF</span>
          </label>
          <label>:مقدار روند شده </label>
        </div>
      </div>
      <div className="entrance-report-footer">
        <button className="entrance-report-button" onClick={() => BackFunc()}>
          <i class="fa-solid fa-left-long"></i>
        </button>
        <button className="entrance-report-button" onClick={() => MiddleFunc()}>
          <i class="fa-solid fa-comments-dollar"></i>
        </button>
        <button className="entrance-report-button" onClick={() => FrontFunc()}>
          <i class="fa-solid fa-right-long"></i>
        </button>
      </div>
    </div>
  );
}

export default PrescriptionReportBox;
