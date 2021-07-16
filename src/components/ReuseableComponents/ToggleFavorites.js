import {useContext} from 'react';
import { LoginContext } from '../../contexts/UserContext';
import UpdateWatchlist from './UpdateWatchlist';

const ToggleFavorites = ({symbol}) => {

    const LoginObject = useContext(LoginContext);
    const Auth = LoginObject.Auth;

    // Add and Remove symbols from Watchlist
    const {addWatchlist, removeWatchlist} = UpdateWatchlist(LoginObject);

  return (
    <span>
      {Auth && (LoginObject.UserObject.watchlist).includes(symbol) ?
      <a href="#!">
        <i className="small material-icons accent-4 amber-text" 
          onClick={()=> {removeWatchlist(symbol)}}>
          star
        </i>
      </a>
      :
      <a href="#!">
        <i className="small material-icons black-text" 
          onClick={()=> addWatchlist(symbol)}>
          star_border
        </i>
      </a>
      }
    </span>
  )
}

export default ToggleFavorites
