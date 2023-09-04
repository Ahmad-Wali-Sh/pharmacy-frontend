import React from "react";

class PrescriptionPrint extends React.Component {
  render() {
    return (
      <div className="prescription-print-box">
        <h4 style={{ color: "red" }}>دواخانه شریف</h4>
        <div class="tg-wrap">
          <table>
            <tbody>
              <tr>
                <td>بیمار</td>
                <td colspan="2">{this.props.prescription.patient_name}</td>
              </tr>
              <tr>
                <td>نوع</td>
                <td colspan="2">{this.props.prescription.department_name}</td>
              </tr>
              <tr>
                <td>شماره</td>
                <td colspan="2">
                  {this.props.prescription.prescription_number}
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <img
                    className="barcode-image-print"
                    src={
                      this.props.prescription.barcode
                        ? new URL(
                            this.props.prescription.barcode
                          ).pathname.slice(16)
                        : "./images/nophoto.jpg"
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>پرداخت</td>
                <td colspan="2">{this.props.report.total_to_sale}Af</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PrescriptionPrint;
