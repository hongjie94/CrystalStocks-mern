import {useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import profileBg from '../../images/profileBg.svg';
import unkownUser from '../../images/unkownUser.png';
export const Navbar = (props) => {

  useEffect(() => {
    M.AutoInit();
  }, []);
 
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
          <Link className="brand-logo" to="/">
            <span className="black-text flow-text">
              Crystal 
            </span>  
            Stocks
          </Link>
          
          <Link  to='#' className="sidenav-trigger" data-target="mobile-nav"> 
            <i className="material-icons">menu</i>
          </Link>
            <ul className="right hide-on-med-and-down 
            flex"> 
            { props.UserObject ?  <li className="Iconimg"><img className="circle responsive-img unkownUser"alt="profile-img" src={props.UserObject.profilePicture}/></li> :
             <li className="Iconimg"><img className="circle responsive-img profilePicture" alt="profile-img" src={unkownUser}/></li>
            }
           
              <li className="markets_link"><NavLink exact={true} to="/">Markets</NavLink></li>
              {props.UserObject &&
              <>
                <li><NavLink to="/trading">Buy/Sell</NavLink></li>
                <li><NavLink to="/favorites">Favorites</NavLink></li>
                <li><NavLink to="/holdings">Holdings</NavLink></li>
                <li><NavLink to="/history">History</NavLink></li>
              </>
              }
              {!props.UserObject &&
                <div className="not_login">
                  <li><NavLink to="/login" className="waves-effect waves-light btn">Login</NavLink></li>
                  <li><NavLink to="/register" className="waves-effect waves-light btn">Register</NavLink></li>
                </div>
              }
              { props.UserObject &&
              <> 
                <li className="nav_logout"><Link to="/#" onClick={()=> logout()} className="waves-effect waves-light btn">Logout</Link></li>
              </>
              }
            </ul>
         

          <ul className="sidenav teal darken-3" id="mobile-nav">
            {!props.UserObject &&
              <>
                <li>
                <div class="user-view">
                  <div class="background">
                    <img className="responsive-img" src={profileBg} alt="profile-bg"/>
                  </div>
                  <img class="circle responsive-img" alt="profile-img" src={unkownUser}/>
                  <span class="white-text name">User not Login</span>
                  <span class="white-text email">Username@example.com</span>
                  </div>
                  </li>
              </>
            }
            {props.UserObject &&
              <li>
                <div class="user-view">
                  <div class="background">
                    <img className="responsive-img" src={profileBg} alt="profile-bg"/>
                  </div>
                  <img class="circle" alt="profile-img" src={props.UserObject.profilePicture}/>
                  <span class="white-text name">{props.UserObject.username}</span>
                  <span class="white-text email login">{props.UserObject.email}</span>
                  <span class="white-text cash">Cash: ${props.UserObject.cash}</span>
                </div>
              </li>
            }
          
            <li><NavLink exact={true} to="/">Markets</NavLink></li>

            {!props.UserObject && 
              <>
                <li><NavLink to="/login" className="waves-effect waves-light btn">Login</NavLink></li>
                <li><NavLink to="/register" className="waves-effect waves-light btn">Register</NavLink></li>
              </>
            }

            {props.UserObject &&
            <>
              <li><NavLink to="/trading">Buy/Sell</NavLink></li>
              <li><NavLink to="/favorites">Favorites</NavLink></li>
              <li><NavLink to="/holdings">Holdings</NavLink></li>
              <li><NavLink to="/history">History</NavLink></li>
            </>
            }
            
            { props.UserObject &&
              <li><Link to="/#" onClick={()=> logout()} className="waves-effect waves-light btn">Logout</Link></li>
            }
          </ul>
    </nav>
  )
};
