import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="view-port">
      <div className="pagecomponent">
        <Header />
        <Navbar />
      </div>
      <div className="pagecomponent-box">{children}</div>
    </div>
  );
}

export default Layout;
