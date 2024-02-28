import { Link } from "react-router-dom";
import React from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";
import { useTemplateLogo, useUserPermissions } from "../States/States";

function Navbar() {
  const auth = useAuthUser();

  if (localStorage._auth) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${localStorage._auth}`;
  }
  const { userPermissions } = useUserPermissions()

  const { templateLogo, setTemplateLogo } = useTemplateLogo();
  return (
    <div className="navbar">
      <div className="navbar-elements">
        <div className="colorfull-image">
          <img className="colorfull-image" src={templateLogo} />
        </div>
        <div className="profile">
          <img
            className="profile-image"
            src={
              auth().image
                ? new URL(auth().image).pathname.slice(16)
                : "./images/pic.jpg"
            }
          />
          <div className="profile-text">
            <h5>{auth().first_name + " " + auth().last_name}</h5>
            <h6>{auth().email}</h6>
          </div>
        </div>
        <div className="navbar-buttons">
          {/* <Link to="/dashboard" className="button">
            <div className="button">داشبورد</div>
          </Link> */}
          {userPermissions?.includes('core.view_prescription') && <Link to="/sell" className="button">
            <div className="button">فروشات</div>
          </Link>}
          {userPermissions?.includes('core.view_entrance') && <Link to="/purchase" className="button">
            <div className="button">خریداری</div>
          </Link>}
          {userPermissions?.includes('core.view_medician') && <Link to="/medician" className="button">
            <div className="button">داروخانه</div>
          </Link>}
          {userPermissions?.includes('core.view_revenue') && <Link to="/revenue" className="button">
            <div className="button">صندوق</div>
          </Link>}
          {userPermissions?.includes('core.view_prescription') && userPermissions?.includes('core.view_entrance') && <Link to="/reports" className="button">
            <div className="button">گزارشات</div>
          </Link>}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
