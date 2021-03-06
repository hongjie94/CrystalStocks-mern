import { Link, NavLink} from 'react-router-dom';
import React, { useEffect } from "react";
import M from 'materialize-css';

const MobileSideNav = ({
  Auth, 
  profileBg, 
  unkownUser, 
  UserObject, 
  logout
}) => {

  useEffect (() => {
    // Init Sidenav Materialize JS
    let sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  });
  
  
  return (
    <div>
      {/* Mobile side nav */}
      <ul className="sidenav fixed teal darken-2" id="mobile-nav">

        {/* Mobile nav header */}
        {!Auth &&
          <>
            <li>
              <div className="user-view">
                <div className="background">
                  <img className="responsive-img" src={profileBg} alt="profile-bg"/>
                </div>
                <img className="circle responsive-img" alt="profile-img" src={unkownUser}/>
                <span className="white-text name">User not Login</span>
                <span className="white-text email">Username@example.com</span>
              </div>
            </li>
          </>
        }

        {/* Mobile nav user Info */}
        {Auth &&
          <>
            <li>
              <div className="user-view">
                <div className="background">
                  <img className="responsive-img" src={profileBg} alt="profile-bg"/>
                </div>
                  <img 
                    className="circle" 
                    alt="profile-img" 
                    src={UserObject.profilePicture}
                  />
                <span className="white-text name">{UserObject.username}</span>
                <span className="white-text email login">{UserObject.email}</span>
                <span className="white-text cash">Cash: ${UserObject.cash}</span>
              </div>
            </li> 
          </>
        }
         {/* Mobile nav links */}
        <li><NavLink className="sidenav-close" exact={true} to="/">Browse</NavLink></li>
        {!Auth && 
          <>
            <li><NavLink to="/login" className="waves-effect waves-light btn sidenav-close">Login</NavLink></li>
            <li><NavLink to="/register" className="waves-effect waves-light btn sidenav-close">Register</NavLink></li>
          </>
        }
        {Auth &&
        <>
          <li><NavLink className="sidenav-close" to="/favorites">Favorites</NavLink></li>
          <li><NavLink className="sidenav-close" to="/holdings">Holdings</NavLink></li>
          <li><NavLink className="sidenav-close" to="/history">History</NavLink></li>
        </>
        }
        { Auth &&
          <li><Link to="/#" onClick={()=> logout()} className="waves-effect waves-light btn">Logout</Link></li>
        }
      </ul>
    </div>
  )
}

export default MobileSideNav
