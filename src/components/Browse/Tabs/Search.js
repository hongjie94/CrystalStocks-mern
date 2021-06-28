import { useState, useContext } from 'react';
import Autocomplete from '../../ReuseableComponents/Autocomplete';
import NoData from '../../../images/noData.svg';
import SearchHeaderImg from '../../../images/searchBody.svg';
import Loader from '../../ReuseableComponents/Loader';
import GetSymbolData from '../../ReuseableComponents/GetSymbolData';
import { LoginContext } from '../../../contexts/UserContext';
import UpdateWatchlist from '../../ReuseableComponents/UpdateWatchlist';

const Search = () => {

  // Use State
  const [InputValue, setInputValue] = useState(null);
  const [CurSymbol, setCurSymbol] = useState('');
  const [Loading, setLoading ]= useState(false);
  
  // Get current user objects
  const LoginObject = useContext(LoginContext);
  const Auth = LoginObject.Auth;

  // Get symbol Datas
  const {SymbolData} = GetSymbolData(CurSymbol);

  // Update Search color and Icon
  let searchQuote = {searchQuoteIcon:'', searchQuoteColor:''};
  const updateSearchQuote =(icon, color) => {
    searchQuote = {icon: icon, color: color};
  };

  // Add and Remove symbols from Watchlist
  const {addWatchlist, removeWatchlist} = UpdateWatchlist(LoginObject);
  
  return (

    <div className="Search">

      {/* Search header */}
      <div className="Browse__header card center">
        <span className="flowing-text">Search</span>
        <img src={SearchHeaderImg} className="responsive-img" alt="img not found"/>
      </div>
     
      {/* Search bar */}
      <Autocomplete 
        InputValue={InputValue}
        setInputValue={setInputValue}
        setCurSymbol={setCurSymbol}
        setLoading={setLoading}
      />

      {/* Search contents */}
      <div className="Searchcontent">
        <div className="card">
          <div className="container">

            {/* Symbol Info */}
            <div className="row">
              {
                (SymbolData !== 'Unknown symbol' && SymbolData.companyName) &&
                <>
                  {/* Symbol Main Info */}
                  <div className="row QuotesData">
                    <div className="col s12 dataMain">
                      <span className="companyName"> 
                        {SymbolData.companyName} ({SymbolData.symbol})
                      </span>

                        {/* Toogle Star icons */}
                        <span>
                          {Auth && (LoginObject.UserObject.watchlist).includes(SymbolData.symbol) ?
                          <a href="#!">
                            <i className="small material-icons accent-4 amber-text" 
                              onClick={()=> removeWatchlist(SymbolData.symbol)}>
                              star
                            </i>
                          </a>
                          :
                          <a href="#!">
                            <i className="small material-icons black-text" 
                              onClick={()=> addWatchlist(SymbolData.symbol)}>
                              star_border
                            </i>
                          </a>
                          }
                        </span>
                        
                        {/*  Toogle Arrow icons and text colors */}  
                        {SymbolData.change &&(SymbolData.change.toString()).includes('-') ? 
                          updateSearchQuote('arrow_downward', 'pink-text accent-3') : 
                          updateSearchQuote('arrow_upward', 'teal-text') 
                        }

                      {/* Latest Price */}  
                      <p className="QuotesPrice"> ${SymbolData.latestPrice ? SymbolData.latestPrice : 0} </p>
                    </div>
                    <div className="col s12 dataChange">
                      <div className="col s12 m6">
                        {/* Change Price and Change Percent */}  
                        <span className={`change ${searchQuote.color}`}> 
                          {SymbolData.change ? (SymbolData.change).toFixed(2): 0} ({SymbolData.changePercent ? (SymbolData.changePercent).toFixed(2) : 0} %)&nbsp; 
                        </span>

                        {/*  Arrow icons  */}  
                        <span className="changeIcon">
                          <i className={`${searchQuote.color} material-icons td_icon`}>{searchQuote.icon} </i>
                        </span>
                        <p className="date">{SymbolData.latestTime}</p>
                      </div>

                      {/* Buy and Sell Button */}  
                      <div className="col s12 m6 watchBtn">
                        <button className="waves-effect waves-light btn">Buy</button>
                        <button className="waves-effect waves-light btn white-text pink accent-3">Sell</button>
                      </div>
                    </div>

                    {/* Symbol Details */}
                    <div className="col s12 m6 SymbolDetails">
                      <p>Open: {SymbolData.open}</p>
                      <p>Close: {SymbolData.close}</p>
                      <p>volume: {SymbolData.volume}</p>
                      <p>High: {SymbolData.high}</p>
                      <p>Low: {SymbolData.low}</p>
                    </div>
                    <div className="col s12 m6 SymbolDetails">
                      <p>Market Cap: {SymbolData.marketCap}</p>
                      <p>Previous Close: {SymbolData.previousClose}</p>
                      <p>Previous Volume: {SymbolData.previousVolume}</p>
                      <p>52 Wk High: {SymbolData.week52High}</p>
                      <p>52 Wk Low: {SymbolData.week52Low}</p>
                    </div>
                  </div>
                </>
              }
              {/*  Loader */}  
              { !SymbolData.companyName &&
                <div className="center nonfound">
                  <img src={NoData} className="responsive-img" alt="NoData"/>
                  { Loading ?
                    <div className="searchLoader">
                      <Loader />
                      <p>Searching...</p> 
                    </div>
                  :
                    !Loading &&
                    <>
                      {(SymbolData === 'Unknown symbol' || SymbolData === 'Not found') ?
                        <p className="pink-text accent-3">No symbols found...</p> 
                        :
                        <p>Search for markets...</p> 
                      }
                    </>
                  }
                </div>
              }
            </div>
          </div>
        </div>     
      </div>
    </div>
  )
}

export default Search
