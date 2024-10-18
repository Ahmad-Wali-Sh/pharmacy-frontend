import React from "react";
import { Dna } from "react-loader-spinner";
import '../../styles/loading-page.scss'
import { detailsToast } from "../../services/toastify";

function ErrorPage({error}) {
  return (
    <div className="loading-page">
      <Dna
        visible={false}
        height="120"
        width="120"
      />
      <h2>شما قادر به اجرای برنامه نیستید</h2>
      <button onClick={() => {
        detailsToast(error)
      }}>برای اطلاعات بیشتر کلیک کنید</button>
    </div>
  );
}

export default ErrorPage;
