import React from "react";
import Header from "./Header";
import Layount from "./Layount";
import Navbar from "./Navbar";

function PageComponent() {
  return (
    <div>
      <div className="pagecomponent">
        <Header />
        <Navbar />
      </div>
      <div className="pagecomponent-box">
        <Layount />
      </div>
    </div>
  );
}

export default PageComponent;
