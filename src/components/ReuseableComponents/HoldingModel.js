import { useContext } from 'react';
import GetSymbolData from './GetSymbolData';
import { LoginContext } from '../../contexts/UserContext';
import ToggleFavorites from './ToggleFavorites';

const HoldingModel = ({SymbolName, SymbolShares, disable, setDisable, setShares, Shares, closeModal}) => {

  const LoginObject = useContext(LoginContext);

  // Get symbol Datas
  const {SymbolData} = GetSymbolData(SymbolName);

  // Update Search color and Icon
  let searchQuote = {searchQuoteIcon:'', searchQuoteColor:''};
  const updateSearchQuote =(icon, color) => {
    searchQuote = {icon: icon, color: color};
  };

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
    
  return (
  
    <div className="HoldingModelContent">
      {/* Close Modal button */}
      <div className="row closeModelBtn">
        <a  href="#!" className="black-text" onClick={()=> {
          setShares(1);
          setDisable(true);
          closeModal();
        }}> 
          <i className="material-icons">close</i>
        </a>
      </div>

      {/* Modal Contents */}
      <div className="contaniner SymbolDetails">
        <div className="row">
          <div className="row mainRow">
            <div className="col s12">
              {/* Symbol */}
              <h3>{SymbolData.symbol}</h3> 

              {/* Toogle Star icons */}
              <ToggleFavorites 
                symbol={SymbolData.symbol}
              />

              {/* Company Name */}
              <span className="company">{SymbolData.companyName}</span> 
            </div>
          </div>
          <div className="row infoRow">
            {/*  Toogle Arrow icons and text colors */}  
            {SymbolData.change &&(SymbolData.change.toString()).includes('-') ? 
              updateSearchQuote('arrow_downward', 'pink-text accent-3') : 
              updateSearchQuote('arrow_upward', 'teal-text') 
            }

            {/* Market Price and Chnage */}
            <div className="col s12 m6">
              <span className="teal lighten-1 white-text ownShares"> {SymbolShares} Shares</span>

              {/* Market Price */}
              <div className="arrow_price">
                <span className={`${searchQuote.color} price`}>
                  ${SymbolData.latestPrice} 
                </span> 
                <i className={`${searchQuote.color} material-icons td_icon`}>{searchQuote.icon}</i> 
              </div>

              {/* Change in dollars */}
              <span className={`${searchQuote.color} change`}> 
                { (SymbolData.change > 0) && 
                  <>+</>
                }
                {SymbolData.change} 
              </span>  
                
              {/* Change in percent */}  
              <span className={`${searchQuote.color} change`}> 
                { (SymbolData.change > 0) && 
                  <>+</>
                }
                {SymbolData.changePercent}%
              </span> 
            </div>

            {/* Trade section */}
            <div className="col s12 m6">

              {/* Adjust Shares Buttons */}
              <div className="BtnSection">

                {/* Subtract Shares Button */}
                <button 
                  disabled={disable}
                  className="btn" 
                  onClick={()=> { 
                    setShares(Shares -= 1); 
                    Shares === 1 ? setDisable(true): setDisable(false) 
                  }}><i className="material-icons">remove</i>
                </button> 

                  {/* Shares Number */}
                  <p className='btn white black-text shareNum'>{Shares}</p>

                {/* Add Shares Button */}
                <button 
                  className="btn" 
                  onClick={()=> { 
                    setShares(Shares += 1);
                    Shares > 1 ? setDisable(false): setDisable(true)  
                  }}><i className="material-icons">add</i>
                </button> 

                {/* Trade Buttons */}
                <div className="tradBtns">

                  {/* Buy */}
                  <button 
                    className="waves-effect waves-light btn buyBtn"
                    onClick={()=> {LoginObject.Trade(
                      {
                        SymbolName: SymbolData.symbol, 
                        SymbolCompany: SymbolData.companyName, 
                        SymbolPrice: SymbolData.latestPrice
                      }, 
                      Shares, 
                      'BUY');
                      setShares(1);
                      setDisable(true);
                      closeModal();
                    }}>Buy
                  </button>
 
                  {/* Sell */}      
                  <button 
                    className="waves-effect waves-light btn white-text pink accent-3"
                    onClick={()=> {LoginObject.Trade(
                      {
                        SymbolName: SymbolData.symbol, 
                        SymbolCompany: SymbolData.companyName, 
                        SymbolPrice: SymbolData.latestPrice
                      }, 
                      Shares, 
                      'SELL');
                      setShares(1);
                      setDisable(true);
                      closeModal();
                    }}>Sell
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Market Details */}
          <div className="row detailsRow">
            <div className="col s12 m6 MarketDetails ">
              <span>Open: {SymbolData.open}</span> 
              <span>Close: {SymbolData.close}</span>
              <span>Volume: {NumberConverter(SymbolData.avgTotalVolume)}</span>
              <span>High: {SymbolData.high}</span> 
              <span>Low: {SymbolData.low}</span> 
            </div>
            <div className="col s12 m6 MarketDetails">
              <span>Market Cap: {NumberConverter(SymbolData.marketCap)}</span> 
              <span>Previous Close: {SymbolData.previousClose}</span>
              <span>Previous Volume: {NumberConverter(SymbolData.previousVolume)}</span>
              <span>Week 52 High: {SymbolData.week52High}</span>
              <span>Week 52 Low: {SymbolData.week52Low}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default HoldingModel
