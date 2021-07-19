import { useState } from 'react';
import Autocomplete from '../../ReuseableComponents/Autocomplete';
import NoData from '../../../images/noData.svg';
import searching from '../../../images/searching.svg';
import searchBg from '../../../images/searchbg.svg';
import SearchHeaderImg from '../../../images/search_header.svg';
import Loader from '../../ReuseableComponents/Loader';
import GetSymbolData from '../../ReuseableComponents/GetSymbolData';
import { StaticDialog } from 'react-st-modal';
import TradeModel from '../../ReuseableComponents/TradeModel';
import TradeModelFunctions from '../../ReuseableComponents/TradeModelFunctions';
import ToggleFavorites from '../../ReuseableComponents/ToggleFavorites';

const Search = () => {

  // Use State
  const [InputValue, setInputValue] = useState(null);
  const [CurSymbol, setCurSymbol] = useState('');
  const [Loading, setLoading ]= useState(false);
  
  // Get symbol Datas
  const {SymbolData} = GetSymbolData(CurSymbol);

  // Update Search color and Icon
  let searchQuote = {searchQuoteIcon:'', searchQuoteColor:''};
  const updateSearchQuote =(icon, color) => {
    searchQuote = {icon: icon, color: color};
  };

  // Number Converter
  const NumberConverter = (Value) => {
    const sign = Math.sign(Number(Value));
     // Nine Zeroes for Billions
    return Math.abs(Number(Value)) >= 1.0e9
      ? ( sign * (Math.abs(Number(Value)) / 1.0e9).toFixed(2)) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(Value)) >= 1.0e6
      ? (sign * (Math.abs(Number(Value)) / 1.0e6)).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(Value)) >= 1.0e3
      ? (sign * (Math.abs(Number(Value)) / 1.0e3)).toFixed(2) + "K"
      : Math.abs(Number(Value));
  }
    

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
                        <ToggleFavorites 
                          symbol ={SymbolData.symbol}
                        />
                        
                        {/*  Toogle Arrow icons and text colors */}  
                        {SymbolData.change &&(SymbolData.change.toString()).includes('-') ? 
                          updateSearchQuote('arrow_downward', 'pink-text accent-3') : 
                          updateSearchQuote('arrow_upward', 'teal-text') 
                        }

                      {/* Latest Price */}  
                      <p className={`QuotesPrice ${searchQuote.color}`}> ${SymbolData.latestPrice ? SymbolData.latestPrice : 0} </p>
                    </div>
                    <div className="col s12 dataChange">
                      <div className="col s12 m6">

                        {/* Change Price and Change Percent */}  
                        <span className={`change ${searchQuote.color}`}> 
                        { (SymbolData.change   > 0) && 
                            <>+</>
                          }
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
                        <button className="waves-effect waves-light btn"
                         onClick={() => { trade(
                          SymbolData.symbol, 
                          SymbolData.companyName, 
                          SymbolData.latestPrice);
                          setTrade('BUY')
                          }}>Buy</button>
                        <button className="waves-effect waves-light btn white-text pink accent-3"
                         onClick={() => { trade(
                          SymbolData.symbol, 
                          SymbolData.companyName, 
                          SymbolData.latestPrice);
                          setTrade('SELL')
                          }}>Sell</button>
                      </div>

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

                    {/* Symbol Details */}
                    <div className="col s12 m6 SymbolDetails">
                      <p>Open: {SymbolData.open}</p>
                      <p>Close: {SymbolData.close}</p>
                      <p>Volume: {NumberConverter(SymbolData.avgTotalVolume)}</p>
                      <p>High: {SymbolData.high}</p>
                      <p>Low: {SymbolData.low}</p>
                    </div>
                    <div className="col s12 m6 SymbolDetails">
                      <p>Market Cap: {NumberConverter(SymbolData.marketCap)}</p>
                      <p>Previous Close: {SymbolData.previousClose}</p>
                      <p>Previous Volume: {NumberConverter(SymbolData.previousVolume)}</p>
                      <p>52 Wk High: {SymbolData.week52High}</p>
                      <p>52 Wk Low: {SymbolData.week52Low}</p>
                    </div>
                  </div>
                </>
              }
              {/*  Loader */}  
              { !SymbolData.companyName &&
                <div className="center nonfound">
                  { !Loading && !SymbolData  &&
                    // Default
                    <>
                      <img src={searchBg} className="responsive-img" alt="NoData"/>
                      <p className="searchDefault">Search for markets...</p> 
                    </>
                    
                  }
  
                  { Loading ?
                    // Searching
                    <>
                      <img src={searching} className="responsive-img" alt="NoData"/>
                      <div className="searchLoader">
                        <Loader />
                        <p className="searching">Searching...</p> 
                      </div>
                    </>
                  :
                    !Loading &&
                    // No symbols found
                    <>
                      {(SymbolData === 'Unknown symbol' || SymbolData === 'Not found' ) &&
                        <> 
                          <img src={NoData} className="responsive-img" alt="NoData"/>
                          <p className="Nosymbols pink-text accent-3">No symbols found...</p> 
                        </>
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
