import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

function PageComponent({ children }) {
  return (
    <div>
      <div className="pagecomponent">
        <Header />
        <Navbar />
      </div>
      <div className="pagecomponent-box">{children}</div>
    </div>
  );
}

export default PageComponent;
