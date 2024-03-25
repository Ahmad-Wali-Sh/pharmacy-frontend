import React from "react";

const PrescriptionPrint = React.forwardRef((props, ref) => {
  return (
    <div className="prescription-print-box" ref={ref}>
      <h4>دواخانه شریف</h4>
      <div class="tg-wrap">
        <table style={{ textAlign: "center" }}>
          <tbody style={{ textAlign: "center" }}>
            <tr>
              <td>{props?.prescription?.prescription_number}</td>
              <td>{props?.prescription?.department_name}</td>
              <td>{props?.prescription?.timestamp?.slice(11, 16)}</td>
            </tr>
            <tr>
              <td colspan="2">
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
            <tr style={{ position: "relative", bottom: "1rem" }}>
              <td>
                {props?.prescription?.refund
                  ? parseFloat(props.prescription.refund) * -1 >= 0
                    ? "اخذ:"
                    : "برگشتی:"
                  : "پرداخت:"}
              </td>
              <td className="persian-number">
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
