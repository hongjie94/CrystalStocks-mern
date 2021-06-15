import {useEffect, useRef, useState} from 'react';
import { Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import profileBg from '../../images/profileBg.svg';
import unkownUser from '../../images/unkownUser.png';
import MobileSideNav from './MobileSideNav';


export const Navbar = (LoginObject) => {

  const [profileImg, setprofileImg] = useState(unkownUser);
  const Auth = LoginObject.UserObject.Auth;
  const UserObject = LoginObject.UserObject.UserObject;
  const ProfileUrl = useRef(null);

   // Get Profile Url
  const getProfileUrl = () => {
    setprofileImg(ProfileUrl.current.value);
    ProfileUrl.current.value='';
  }

  // Logout
  useEffect(() => {
    M.AutoInit();
  }, []);

  // Logout
  const  logout = async () => {
   await axios.get("http://localhost:4000/auth/logout", { 
      withCredentials: true 
    }).then((res) => {
      if(res.data === "done") {
        window.location.href ="/";
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <nav className='nav-wrapper teal darken-3'>

      {/* Nav Logo */}
      <Link className="brand-logo" to="/">
        <span className="black-text flow-text">
        Crystal 
        </span>  
        Stocks
      </Link>

      {/* Mobile menu */}
      <Link  to='#' className="sidenav-trigger" data-target="mobile-nav"> 
        <i className="material-icons">menu</i>
      </Link>

      {/* Nav links */}
      <ul className="right hide-on-med-and-down flex"> 
        <li><NavLink exact={true} to="/">Markets</NavLink></li>
        { Auth &&
          <>
            <li><NavLink to="/favorites">Favorites</NavLink></li>
            <li><NavLink to="/holdings">Holdings</NavLink></li>
            <li><NavLink to="/history">History</NavLink></li>
          </>
        }
        
        {/* Profile image */}
        { Auth ?  
          <a className="modal-trigger modalContoller" href="#showModal">
            <li className="Iconimg">
              <img 
                className="circle responsive-img unkownUser"
                alt="profile-img" 
                src={UserObject.profilePicture}
              />
            </li> 
          </a> :
            <li className="Iconimg not_auth">
              <img 
                className="circle responsive-img profilePicture" 
                alt="profile-img"
                src={unkownUser}
              />
            </li>
        }

        {/* Login/Register Links */}
        {!Auth &&
          <div className="not_login">
            <li><NavLink to="/login" className="waves-effect waves-light btn">Login</NavLink></li>
            <li><NavLink to="/register" className="waves-effect waves-light btn">Register</NavLink></li>
          </div>
        }
        { Auth &&
        <> 
          <li className="nav_logout">
            <Link to="/#" onClick={()=> logout()} className="waves-effect waves-light btn">
              Logout
            </Link>
          </li>
        </>
        }

        {/* Modal Structure */}
        { Auth &&
         <div id="showModal" className="modal">
          <div className="modal-content">
            <h5>Custom Profile Photo</h5>
            <input 
              type="url"
              placeholder="Enter Your URL Here..."
              className="validate"
              ref={ProfileUrl}
            />
          </div>
          <div className="modal-footer">
            <button 
              onClick={getProfileUrl} 
              className="modal-close iconSubmit waves-effect waves-light btn"
              >Summit
            </button>
            <a href="#!" className="modal-close waves-effect waves-light btn">Close</a>
          </div>
        </div>
        }
      </ul>

      <MobileSideNav
        Auth={Auth} 
        profileBg={profileBg}
        unkownUser={unkownUser}
        UserObject={UserObject}
        logout={logout}
      />
    </nav>
  )
};
