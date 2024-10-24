import { NavLink } from 'react-router-dom';
import React from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";
import { useTemplateLogo } from "../States/States";
import { useUserPermissions } from '../../features/shared/states/useUserPermissions';

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
          <img className="colorfull-image" src='./images/frontend/no-color-sharif.png' />
        
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
          {/* <NavLink to="/dashboard" className="button">
            <div className="button">داشبورد</div>
          </NavLink> */}
          {userPermissions?.includes('core.view_prescription') && <NavLink to="/sell"  className={({isActive}) => isActive ? 'active-navbar' : 'button'}> 
            <div className="button">فروشات</div>
          </NavLink>}
          {userPermissions?.includes('core.view_prescription') && <NavLink to="/return"  className={({isActive}) => isActive ? 'active-navbar' : 'button'}> 
            <div className="button">برگشتی</div>
          </NavLink>}
          {userPermissions?.includes('core.view_entrance') && <NavLink to="/purchase" className={({isActive}) => isActive ? 'active-navbar' : 'button'}activeClassName="active-navbar">
            <div className="button">خریداری</div>
          </NavLink>}
          {userPermissions?.includes('core.view_medician') && <NavLink to="/medician" className={({isActive}) => isActive ? 'active-navbar' : 'button'}>
            <div className="button">داروخانه</div>
          </NavLink>}
          {userPermissions?.includes('core.view_revenue') && <NavLink to="/revenue" className={({isActive}) => isActive ? 'active-navbar' : 'button'}>
            <div className="button">صندوق</div>
          </NavLink>}
          {<NavLink to="/journal" className={({isActive}) => isActive ? 'active-navbar' : 'button'}>
            <div className="button">روزنامچه</div>
          </NavLink>}
          {userPermissions?.includes('core.view_prescription') && userPermissions?.includes('core.view_entrance') && <NavLink to="/reports" className={({isActive}) => isActive ? 'active-navbar' : 'button'}>
            <div className="button">گزارشات</div>
          </NavLink>}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
