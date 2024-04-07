import React from "react";
import Barcode from "react-barcode";

const PrescriptionPrint = React.forwardRef((props, ref) => {
  return (
    // <div className="prescription-print-box" ref={ref}>
    //   <h4>دواخانه شریف</h4>
    //   <div class="tg-wrap">
    //     <table style={{ textAlign: "center" }}>
    //       <tbody style={{ textAlign: "center" }}>
    //         <tr>
    //           <td>{props?.prescription?.prescription_number}</td>
    //           <td>{props?.prescription?.department_name}</td>
    //           <td>{props?.prescription?.timestamp?.slice(11, 16)}</td>
    //         </tr>
    //         <tr>
    //           <div >
    //             {props?.prescription?.barcode_str && (
    //               <Barcode
    //                 value={props?.prescription?.barcode_str}
    //                 format="CODE128"
    //                 fontOptions={{ fontSize: '20px',fontFamily: 'sans-serif', fontWeight: 'bold', fill: '#000' }}
    //               />
    //             )}
    //             {/* <img
    //               className="barcode-image-print"
    //               src={
    //                 props?.prescription?.barcode
    //                   ? props?.prescription?.barcode
    //                   : "./images/nophoto.jpg"
    //               }
    //             /> */}
    //           </div>
    //         </tr>
    //         <tr style={{ position: "relative", bottom: "1rem" }}>
    //           <td>
    //             {parseFloat(props.prescription.refund) >= 0
    //               ? "پرداخت:"
    //               : "برگشتی:"}
    //           </td>
    //           <td className="persian-number">
    //             {props?.prescription?.refund} افغانی
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <div class="parent" ref={ref}>
      <div class="div1">دواخانه شریف</div>
      <div class="div2">{props?.prescription?.timestamp?.slice(11, 16)}</div>
      <div class="div3">{props?.prescription?.prescription_number}</div>
      <div class="div4">{props?.prescription?.department_name}</div>
      <div class="div5">
        <div className="barcode-generated">
          {props?.prescription?.barcode_str && (
            <Barcode
              value={props?.prescription?.barcode_str}
              format="CODE128"
              margin={0}
              displayValue={false}
              height={80}
              width={2}
            />
          )}
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
