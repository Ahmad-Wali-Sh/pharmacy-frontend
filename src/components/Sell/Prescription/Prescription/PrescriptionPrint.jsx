import React from "react";

const PrescriptionPrint = React.forwardRef((props, ref) => {
  return (
    <div class="parent" ref={ref}>
      <div class="div1">دواخانه شریف</div>
      <div class="div2">{props?.prescription?.timestamp?.slice(11, 16)}</div>
      <div class="div3">{props?.prescription?.prescription_number}</div>
      <div class="div4">{props?.prescription?.department_name}</div>
      <div class="div5">
        <div className="barcode-generated">
          {props?.barcode}
        </div>
      </div>
      <div class="div6">
        {parseFloat(props.prescription.refund) >= 0 ? "پرداخت: " : "برگشتی: "}
        {props?.prescription?.refund} افغانی
      </div>
    </div>
  );
});

export default PrescriptionPrint;
