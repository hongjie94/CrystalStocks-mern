import { NavLink } from 'react-router-dom';

export const Footer = (props) => {
    return (
        <div>
        <footer className="page-footer teal darken-3">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Crystal Stocks</h5>
                <blockquote>
                “In the short-run, the market is a voting machine…but in the long-run, the market is a weighing machine.”
                  <p> -Benjamin Graham, 
                 
                  </p>
                 </blockquote>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                  
                  <li><NavLink exact={true} to="/">Markets</NavLink></li>
                  {!props.UserObject &&
                  <>
                   <li><NavLink to="/login">Login</NavLink></li>
                   <li><NavLink to="/register">Register</NavLink></li>
                  </>
                  } 
                  {props.UserObject &&
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
          <div className="footer-copyright">
            <div className="container">
            © 2014 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div>
        </footer>
        </div>
    )
};

