import { useContext, useEffect, useCallback } from 'react';
import { LoginContext } from '../../contexts/UserContext';
import UpdateWatchlist from '../ReuseableComponents/UpdateWatchlist';


export const Favorites = () => {

  
  // Get current user objects
  const LoginObject = useContext(LoginContext);

  // Remove Watchlist
  const {removeWatchlist} = UpdateWatchlist(LoginObject);


  // Retrieved LocalStorage Object
  const retrievedObject = useCallback((symbol) => {
    let curObject = localStorage.getItem(symbol);
    console.log(JSON.parse(curObject))
    return (JSON.parse(curObject));
  }, [])

  useEffect (() => {
    retrievedObject();
  },[retrievedObject]);

  let Theme = {icon:'', iconColor: '', textColor:''};
  const  changeTheme = (icon, iconColor, textColor) => {
    Theme = {
      icon: icon, 
      iconColor: iconColor, 
      textColor: textColor
    };
  };
 
  return (
    <div className="Favorites">
      <div className="container">
        <ul className="collection with-header">
          <li className="collection-header"><h4>Favorites</h4></li>
 
          { LoginObject.UserObject &&
            LoginObject.UserObject.watchlist.map((symbol, index)=>(
              
            <li 
              className="collection-item avatar" 
              key={index} 
              >
                {/* Arrow icons */}
                {(retrievedObject(symbol).change.toString()).includes('-') ? 
                        changeTheme('arrow_downward', 'pink accent-3',  'pink-text accent-3') : 
                        changeTheme('arrow_upward', 'teal', 'teal-text') 
                }
              <i className={`material-icons circle ${Theme.iconColor}`}>{ Theme.icon }</i>
              { retrievedObject(symbol) && 
             
                <div className="content"> 
             
                <div className="content__left">
                  <span className={Theme.textColor}><b>{symbol}</b> </span>
                  
                  <p>
                    {retrievedObject(symbol).companyName}
                  </p>
                
                </div>
                
                <div className="content__center">
                <p><b>${retrievedObject(symbol).latestPrice}</b></p>
                </div>
                <div className="content__right">
                  <p className={Theme.textColor}>
                    { parseFloat(retrievedObject(symbol).change).toFixed(3) } <br/>
                    {parseFloat(retrievedObject(symbol).changePercent).toFixed(3)} %
                  </p>
                </div>
                
                {/* <div className=""> */}
              {/* tradeBtns */}
                  {/* <button className="waves-effect waves-light btn"> Buy</button>
                  <button className="waves-effect waves-light btn white-text pink accent-3"> Sell</button>
                </div> */}
                
              </div>
            
              }
              {/* tradeBtns */}
              <div className="col s12">
                  <button className="waves-effect waves-light btn"> Buy</button>
                  <button className="waves-effect waves-light btn white-text pink accent-3"> Sell</button>
                </div>

              <a href="#!" className="secondary-content">
                <i className="material-icons accent-4 amber-text" onClick={()=> removeWatchlist(symbol)}>star</i>
              </a>
            </li>
            ))
          }
        </ul>


    </div>
    </div>
  )
}

