import axios from "axios";
import React, { useEffect } from "react";
import { useSignOut, useIsAuthenticated } from "react-auth-kit";
import { useQuery } from "react-query";
import ColorTemplates from "../Settings/ColorTemplates";
import Settings from "../Settings/Settings";
import ShortcutListener from "../Settings/ShortcutListener";
import useServerIP from "../services/ServerIP";

function Header() {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();

  const {
    data: departments,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["department/?ordering=id"], retry: false });


  const { serverIP } = useServerIP()


  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    signOut()
    delete axios.defaults.headers.common["Authorization"];
    window.location.reload()
  }

  return (
    <div className="header">
      <div className="header-elements">
        <div className="icons">
          <ColorTemplates />
          <ShortcutListener />
          <i className="fa-solid fa-bell"></i>
          <div className="log-in" onClick={() => {
            axios.post(`${serverIP}auth/` + 'token/logout/').finally(() => {
              signOut()
              delete axios.defaults.headers.common["Authorization"];
              window.location.reload()
            })
          }}>
            <i className="fa-solid fa-user"></i>
            <span className="log-in-text">
              {isAuthenticated ? "Log-Out" : "Log-in"}
            </span>
          </div>
              <Settings />
        </div>
        <div className="flex-item"></div>
        <div>
          <div className="search-input-box">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
