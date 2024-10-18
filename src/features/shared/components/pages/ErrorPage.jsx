import React from "react";
import { detailsToast } from "../../services/toastify";
import "../../styles/error-page.scss";

function ErrorPage({ error, guide }) {
  const errorDetails = {
    message: "سرور در دسترس نیست",
    code: "404",
    name: "خطای سرور",
    guide: "سرور را فعال نموده دوباره سعی کنید",
  };
  return (
    <div id='error-page'>
      <div className="bubble-container">
        {Array.from({ length: 5 }, (_, x) => (
          <div key={x} className="bubble"></div>
        ))}
      </div>

      <div className="main">
        <h1>404</h1>
        <p>
          سرور در دسترس نیست
          <hr />
        </p>
        <button
          onClick={() => {
            detailsToast(error || errorDetails, guide || errorDetails.guide);
          }}
        >
          برای اطلاعات بیشتر کلیک کنید
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
