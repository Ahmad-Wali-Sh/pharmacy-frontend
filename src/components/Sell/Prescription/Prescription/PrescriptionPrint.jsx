import React from "react";

const PrescriptionPrint = React.forwardRef((props, ref) => {
  return (
    <div className="prescription-print-box" ref={ref}>
      <h4 style={{ color: "red" }}>دواخانه شریف</h4>
      <div class="tg-wrap">
        <table>
          <tbody>
            <tr>
              <td>زمان</td>
              <td colspan="2">
                {props?.prescription?.timestamp?.slice(11, 16)}
              </td>
            </tr>
            <tr>
              <td>نوع</td>
              <td colspan="2">{props?.prescription?.department_name}</td>
            </tr>
            <tr>
              <td>شماره</td>
              <td colspan="2">{props?.prescription?.prescription_number}</td>
            </tr>
            <tr>
              <td colspan="3">
                <img
                  className="barcode-image-print"
                  src={
                    props?.prescription?.barcode
                      ? props?.prescription?.barcode
                      : "./images/nophoto.jpg"
                  }
                />
              </td>
            </tr>
            <tr style={{position:'relative', bottom: '1rem'}}>
              <td>{(props?.prescription?.refund) ? (parseFloat(props.prescription.refund) * -1) >= 0 ? 'اخذ:' : 'برگشتی:' : "پرداخت:"}</td>
              <td colspan="1" className="persian-number">
                {props?.prescription?.refund
                  ? props?.prescription?.refund * -1
                  : props?.prescription?.grand_total ==
                    props?.prescription?.purchased_value
                  ? 0
                  : props.prescription?.grand_total}{" "}
                افغانی
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default PrescriptionPrint;
