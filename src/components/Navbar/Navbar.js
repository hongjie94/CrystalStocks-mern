import {useRef, useState} from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import profileBg from '../../images/profileBg.svg';
import unkownUser from '../../images/unkownUser.png';
import MobileSideNav from './MobileSideNav';
import Model from '../ReuseableComponents/ProfileUrlModel';
import toast, { Toaster } from 'react-hot-toast';

export const Navbar = (LoginObject) => {

  const UserObject = LoginObject.UserObject.UserObject;
  const Auth = LoginObject.UserObject.Auth;
  const [profileImg, setprofileImg] = useState('');
  const ProfileUrl = useRef(null);
  const history = useHistory();
  // Model Header Text
  const modelHeader ="Update Profile Photo";

  const UpdateProfileUrl = async (Url) => {
    const userID = UserObject.id;
    await axios({
      method: "POST",
      withCredentials: true,
      url: "https://crystalstocks-backend.herokuapp.com/auth/update_profileURL",
      data: {
        id : userID,
        profilePicture: Url
      }
    }).then((res) => {
    if(res.data === 'ok') {
        toast.success("Your profile photo was successfully updated");
      }
    }).catch((err)=> {
      console.error(err);
    });
  };

  // Get Profile Url
  const getProfileUrl = () => {
    setprofileImg(ProfileUrl.current.value);
    UpdateProfileUrl(ProfileUrl.current.value);
    ProfileUrl.current.value='';
    UserObject.profilePicture = ProfileUrl.current.value;
    LoginObject.UserObject.getUserObjects();
  };

  // Clear Input 
  const clearInput = () => {
    ProfileUrl.current.value='';
  };

  // Logout
  const  logout = async () => {
   await axios.get("http://localhost:4000/auth/logout", { 
      withCredentials: true 
    }).then((res) => {
      if(res.data === "done") {
        LoginObject.UserObject.setAuth(false);
        history.push("/");
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <nav className='nav-wrapper teal darken-2' id='Browse'>
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
        <li><NavLink exact={true} to="/">Browse</NavLink></li>
        { Auth &&
          <>
            <li><NavLink to="/favorites">Favorites</NavLink></li>
            <li><NavLink to="/holdings">Holdings</NavLink></li>
            <li><NavLink to="/history">History</NavLink></li>
          </>
        }
        
        {/* Notifications */}
        <Toaster />
        
        {/* Modal */}
        { Auth &&
          <Model 
            ProfileUrl={ProfileUrl} 
            getProfileUrl={getProfileUrl} 
            modelHeader={modelHeader}
            clearInput={clearInput}
          />
        }

        {/* Profile image */}
        { Auth ?  
          <a className="modal-trigger modalContoller" href="#showModal">
            <li className="Iconimg">
              { profileImg ?
              <img 
                className="circle responsive-img unkownUser"
                alt="profile-img" 
                src={profileImg}
              />   
              :
              <img 
                className="circle responsive-img unkownUser"
                alt="profile-img" 
                src={UserObject.profilePicture}
              />   
              }
              <div className="user_detail">
                <p className="detail_email truncate">{UserObject.email}</p>
                <p className="detail_username truncate">{UserObject.username}</p>
                <p className="detail_cash">${UserObject.cash}</p>
              </div>
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
