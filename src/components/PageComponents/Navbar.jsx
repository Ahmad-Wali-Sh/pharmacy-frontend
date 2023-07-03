import { Link } from "react-router-dom";
import React from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

function Navbar() {
  const auth = useAuthUser();
  console.log(auth());
  
  if (localStorage._auth) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Token ${localStorage._auth}`
    }
  return (
    <div className="navbar">
      <div className="navbar-elements">
        <div className="colorfull-image">
          <img
            className="colorfull-image"
            src="./images/frontend/colorful.png"
          />
        </div>
        <div className="profile">
          <img className="profile-image" src="./images/pic.jpg" />
          <div className="profile-text">
            <h5>{(auth().username)}</h5>
            <h6>{auth().email}</h6>
          </div>
        </div>
        <div className="navbar-buttons">
          <Link to="/dashboard" className="button">
            <div className="button">داشبورد</div>
          </Link>
          <Link to="/sell" className="button">
            <div className="button">فروشات</div>
          </Link>
          <Link to="/purchase" className="button">
            <div className="button">خریداری</div>
          </Link>
          <Link to="/medician" className="button">
            <div className="button">داروخانه</div>
          </Link>
          <Link to="/revenue" className="button">
            <div className="button">صندوق</div>
          </Link>
          <Link to="/reports" className="button">
            <div className="button">گزارشات</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
