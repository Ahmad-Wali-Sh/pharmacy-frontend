import React from "react";
import { Dna } from "react-loader-spinner";
import '../../styles/loading-page.scss'
import { useTranslation } from "react-i18next";

function LoadingPage() {
  const { t } = useTranslation()
  return (
    <div id='loading-page'>
      <Dna
        visible={true}
        height="120"
        width="120"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      <h2>{t('loading')}</h2>
    </div>
  );
}

export default LoadingPage;
