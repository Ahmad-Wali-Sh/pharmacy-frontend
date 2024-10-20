import React from "react";
import { detailsToast } from "../../services/toastify";
import "../../styles/error-page.scss";
import { useTranslation } from "react-i18next";

function ErrorPage({ error, guide }) {
  const { t } = useTranslation()
  const errorDetails = {
    message: t('server-down.message'),
    code: t('server-down.code'),
    name: t('server-down.name'),
    guide: t('server-down.guide'),
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
          {t('server-down.message')}
          <hr />
        </p>
        <button
          onClick={() => {
            detailsToast(error || errorDetails, guide || errorDetails.guide);
          }}
        >
          {t('server-down.button')}
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
