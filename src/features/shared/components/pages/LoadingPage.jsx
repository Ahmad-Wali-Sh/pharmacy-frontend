import React from "react";
import { Dna } from "react-loader-spinner";
import '../../styles/loading-page.scss'

function LoadingPage() {
  return (
    <div className="loading-page">
      <Dna
        visible={true}
        height="120"
        width="120"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      <h2>لطفا منتظر باشید...</h2>
    </div>
  );
}

export default LoadingPage;
