import { useContext, useEffect, useCallback } from 'react';
import { LoginContext } from '../../contexts/UserContext';
import UpdateWatchlist from '../ReuseableComponents/UpdateWatchlist';
import FavoritesImg from '../../images/favorites.svg';
import M from 'materialize-css';
import { StaticDialog } from 'react-st-modal';
import TradeModel from '../ReuseableComponents/TradeModel';
import TradeModelFunctions from '../ReuseableComponents/TradeModelFunctions';


export const Favorites = () => {

  // Init Tooltip Materialize JS
  useEffect(() => {
    let Tooltipped = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(Tooltipped);
  });

  // Get current user objects
  const LoginObject = useContext(LoginContext);


  // Remove Watchlist
  const {removeWatchlist} = UpdateWatchlist(LoginObject);

  // Retrieved local storage objects
  const retrievedObject = useCallback((symbol) => {
    let curObject = localStorage.getItem(symbol);
    return (JSON.parse(curObject));
  }, []);
  useEffect (() => {
    retrievedObject();
  },[retrievedObject]);

  // Toogle Theme (Base on market change)
  let Theme = {icon:'', iconColor: '', textColor:''};
  const  changeTheme = (icon, iconColor, textColor) => {
    Theme = {
      icon: icon, 
      iconColor: iconColor, 
      textColor: textColor
    };
  };

  // Trade Model Functions
  const { 
    isOpen, 
    setOpen, 
    Shares, 
    setShares, 
    CurrentSymbolDatas, 
    Trade, 
    setTrade,
    disable, 
    setDisable,
    trade,
    TradeStock
  } = TradeModelFunctions();

  return (
    <div className="Favorites">
      <div className="container">
        <ul className="collection with-header">

          {/* Favorites Header */}
          <li className="collection-header center">
            <img src={FavoritesImg} className="svg responsive-img" alt=""/>
            <h4 >Favorites</h4>
          </li>

          {/* Favorites contents */}
          { LoginObject.UserObject && 
            LoginObject.UserObject.watchlist.map((symbol, index)=>(
              
            <li 
              className="collection-item avatar" 
              key={index} 
              >
                {/* Arrow icons */}
                {retrievedObject(symbol) && (retrievedObject(symbol).change.toString()).includes('-') ? 
                  changeTheme('arrow_downward', 'pink accent-3',  'pink-text accent-3') : 
                  changeTheme('arrow_upward', 'teal', 'teal-text') 
                }
              <i 
                className={`material-icons circle tooltipped ${Theme.iconColor}`}
                data-position="bottom" 
                data-tooltip={retrievedObject(symbol)&& retrievedObject(symbol).companyName}>
                { Theme.icon }
              </i>
              { retrievedObject(symbol) && 

                // Symbol Details
                <div className="content"> 

                  {/*  Name Company and Price */}
                  <div className="content__left">
                    <div>
                      <span className={Theme.textColor}>
                        <b>{symbol}</b>  - <span><b>${ parseFloat(retrievedObject(symbol).latestPrice).toFixed(2)}</b></span>
                      </span>
                      <p className="truncate companyName">
                        {retrievedObject(symbol).companyName}
                      </p>
                    </div>
                  </div>

                  {/* Change in dollar and percent */}
                  <div className="content__center">
                    <div className={Theme.textColor}>
                      <p>
                        { (retrievedObject(symbol).change > 0) && 
                          <>+</>
                        }
                        { parseFloat(retrievedObject(symbol).change).toFixed(2)} <br/>

                        { (retrievedObject(symbol).change > 0) && 
                          <>+</>
                        }
                        { parseFloat(retrievedObject(symbol).changePercent).toFixed(2)} %
                      </p>
                    </div>
                  </div>

                  {/* Trade buttons */}
                  <div className="content__right hide-on-small-only">

                    {/* Buy button*/}
                    <button 
                      className="waves-effect waves-light btn" 
                      onClick={() => {trade(
                        symbol, 
                        retrievedObject(symbol).companyName, 
                        retrievedObject(symbol).latestPrice);
                        setTrade('BUY')
                        }}>
                      Buy
                    </button>
                  
                    {/* Sell button*/}
                    <button 
                      className="waves-effect waves-light btn white-text pink accent-3" 
                      onClick={() => {trade(
                        symbol, 
                        retrievedObject(symbol).companyName, 
                        retrievedObject(symbol).latestPrice);
                        setTrade('SELL')
                        }}>
                      Sell
                    </button>
                        
                    {/* Trade Model */}    
                    <StaticDialog
                      isOpen={isOpen}
                      title={CurrentSymbolDatas.SymbolCompany}
                      onAfterClose={(result) => {
                        setOpen(false);
                        setShares(1);
                        setDisable(true);
                        TradeStock(result);
                      }}
                    >
                      {/* Model content */}
                      <TradeModel
                        CurrentSymbolDatas={CurrentSymbolDatas}
                        Shares={Shares}
                        setShares={setShares}
                        Trade={Trade}
                        disable={disable}
                        setDisable={setDisable}
                      />
                    </StaticDialog>
                  </div>   
                </div>
              }
      
              {/* Mobil trade buttons */}
              <div className="mobilTradeBtn">
                {/* BUY */}
                <button 
                  className="waves-effect waves-light btn" 
                  onClick={() => {trade(
                    symbol, 
                    retrievedObject(symbol).companyName, 
                    retrievedObject(symbol).latestPrice);
                    setTrade('BUY')
                    }}
                  >Buy
                </button>

                {/* SELL */}
                <button 
                  className="waves-effect waves-light btn white-text pink accent-3" 
                  onClick={() => {trade(
                    symbol, 
                    retrievedObject(symbol).companyName, 
                    retrievedObject(symbol).latestPrice);
                    setTrade('SELL')
                    }}
                  >Sell
                </button>
              </div>  

              {/* Wtachlist button */}
              <a href="#!" className="secondary-content">
                <i 
                  className="material-icons accent-4 amber-text" 
                  onClick={()=> removeWatchlist(symbol)}
                  >star
                </i>
              </a>
            </li>
            ))
          }
          { 
            LoginObject.UserObject.watchlist &&
            LoginObject.UserObject.watchlist.length === 0 &&
            <li className="NoFavorite collection-item avatar">
              <h5 className="center"> No Favorite Symbol ...</h5>
            </li>
          }
        </ul>
      </div>
    </div>
  )
}

