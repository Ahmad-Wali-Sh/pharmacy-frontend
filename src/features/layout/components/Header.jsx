import React from "react";
import { useSignOut } from "react-auth-kit";
import ColorTemplates from "@/components/Settings/ColorTemplates";
import Settings from "@/components/Settings/Settings";
import { logoutUser } from "@/features/auth/utils/authUtils";
import Clock from "../../shared/components/items/Clock";

function Header() {
  const signOut = useSignOut();
  return (
    <div className="header">
      <div className="header-elements">
        <div className="icons">
          <ColorTemplates />
          <i className="fa-solid fa-bell"></i>
          <div
            className="log-out-button"
            onClick={() => {
              logoutUser(signOut);
            }}
          >
            <i className="fa-solid fa-user"></i>
            <span className="log-in-text">Log-Out</span>
          </div>
          <Settings />
        </div>
        <div className="flex-item"></div>
        <Clock />
      </div>
    </div>
  );
}

export default Header;
