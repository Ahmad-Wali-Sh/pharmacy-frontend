import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import ShortcutListener from "../Settings/ShortcutListener";

function PageComponent({ children }) {
  return (
    <div className="view-port">
      <div className="pagecomponent">
        <ShortcutListener />
        <Header />
        <Navbar />
      </div>
      <div className="pagecomponent-box">{children}</div>
    </div>
  );
}

export default PageComponent;
