import { NavLink } from 'react-router-dom';

export const Footer = (props) => {

  const Auth = props.UserObject.Auth;

    return (
      <div>
        <footer className="page-footer teal darken-1">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Crystal Stocks</h5>
                <blockquote>
                “In the short-run, the market is a voting machine…but in the long-run, the market is a weighing machine.”
                  <p> -Benjamin Graham</p>
                 </blockquote>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                  
                  <li><NavLink exact={true} to="/">Markets</NavLink></li>
                  {!Auth &&
                  <>
                   <li><NavLink to="/login">Login</NavLink></li>
                   <li><NavLink to="/register">Register</NavLink></li>
                  </>
                  } 
                  {Auth &&
                  <>
                    <li><NavLink to="/favorites">Favorites</NavLink></li>
                    <li><NavLink to="/holdings">Holdings</NavLink></li>
                    <li><NavLink to="/history">History</NavLink></li>
                  </>
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright teal darken-2">
            <div className="container">
             Copyright © {new Date().getFullYear()}  All Rights Reserved by Crystal Stocks
            </div>
          </div>
        </footer>
        </div>
    )
};

