import React, { useEffect, useState } from "react";
import { useSignOut, useIsAuthenticated } from "react-auth-kit";
import { useQuery } from "react-query";
import ColorTemplates from "../Settings/ColorTemplates";
import Settings from "../Settings/Settings";
import moment from 'jalali-moment';
import { logoutUser } from "../../features/auth/utils/loginUtils";

function Header() {

  const [time, setTime] = useState(moment().format('jYYYY-jMM-jDD | hh:mm A'));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment().format('jYYYY-jMM-jDD | hh:mm A'));
    }, 60000);

    return () => clearInterval(timer); 
  }, []); 

  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();


  const {
    isLoading,
    isError,
  } = useQuery({ queryKey: ["department/?ordering=id"], retry: 3 });


  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    logoutUser(signOut)
  }

  return (
    <div className="header">
      <div className="header-elements">
        <div className="icons">
          <ColorTemplates />
          <i className="fa-solid fa-bell"></i>
          <div className="log-in" onClick={() => {
            logoutUser(signOut)
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
          <div className='today-date' style={{display:'flex',gap:'1rem'}}>
            <div>
                {time}            
            </div>
            <div style={{direction:'rtl'}}>
                امروز:              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
