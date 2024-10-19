import React from "react";
import moment from 'jalali-moment';

const PrescriptionDetailedPrint = React.forwardRef(({prescriptionThrough, prescription, barcode}, ref) => {
  return (
    <div className='detailed-print-container' ref={ref}>
        <div className="title">دواخانه شریف</div>
        <div className="details">
            <h3>زمان</h3>
            <h3 >{moment().format('hh:mm A')}</h3>
            <h3>تاریخ</h3>
            <h3>{moment().format('jYYYY-jMM-jDD')}</h3>
            <h3>مریض</h3>
            <h3>{prescription?.patient_name}</h3>
            <h3>شماره نسخه</h3>
            <h3>{prescription?.prescription_number}</h3>
            <h3>تخفیف</h3>
            <h3>{prescription?.discount_value}</h3>
            <h3>اضافه قیمت</h3>
            <h3>{prescription?.over_value}</h3>
        </div>
        <div className="title">اقلام</div>
        <div className="medicine-details">
            <div className="medicine-details-item">
                <h3>ردیف</h3>
                <h3>دارو</h3>
                <h3>تعداد</h3>
                <h3>قیمت فی</h3>
                <h3>قیمت کل</h3>
            </div>
            {prescriptionThrough?.map((item, num) => (
            <div className="medicine-details-item">
                <h3>{num + 1}</h3>
                <h3>{item.medicine_full}</h3>
                <h3>{item.quantity}</h3>
                <h3>{item.each_price}</h3>
                <h3>{item.total_price}</h3>
            </div>
            ))}
        </div>
        <div className="footer">
            <h3>تعداد اقلام</h3>
            <h3>{prescriptionThrough?.length}</h3>
            <h3>مجموع قیمت</h3>
            <h3>{prescription?.grand_total}</h3>
            <h3>قابل پرداخت</h3>
            <h3>{parseFloat(prescription?.grand_total) - parseFloat(prescription?.discount_value) + parseFloat(prescription?.over_value)}</h3>
            <h3 style={{border:'none'}}>هدایت</h3>
            <h3 style={{border:'none'}}>احمد رشید</h3>
 
        </div>
        <div>
            <h3 style={{border:'none'}}>بارکد</h3>
            <div>{barcode}</div>
            </div>
    </div>
  );
});

export default PrescriptionDetailedPrint;
