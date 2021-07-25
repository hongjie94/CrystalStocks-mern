import { useState, useContext, useEffect } from 'react';
import MarketsHeaderImg from '../../../images/markets.svg';
import DataFetcher from '../../ReuseableComponents/DataFetcher';
import Pagination from '../../ReuseableComponents/Pagination';
import Loader from '../../ReuseableComponents/Loader';
import { LoginContext } from '../../../contexts/UserContext';
import UpdateWatchlist from '../../ReuseableComponents/UpdateWatchlist';
import M from 'materialize-css';
import { motion } from 'framer-motion';
import AnimationVariants from '../../AnimationVariants';
const Markets = () => {


  // Init Tooltip Materialize JS
  useEffect(() => {
    let Tooltipped = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(Tooltipped);
  });

  // Get current user objects
  const LoginObject = useContext(LoginContext);
  const Auth = LoginObject.Auth;
  
  // Fetch Data
  const [Category, setCategory] = useState('most_actives');
  const {FetchData, Loading} = DataFetcher(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/${Category}`);

  // Page Start/ End
  const [PageStart, setPageStart] = useState(0);
  const [PageEnd, setPageEnd] = useState(5);

  // Update symbol's icon and color base on symbol change
  const [QuoteIcon, setQuoteIcon] = useState("insert_chart");

  let QuoteChange = {icon:'', color:''};

  const updateQuoteChange = (icon, color) => {
    QuoteChange = {icon: icon, color: color};
  };

  let QuoteObject = {
    icon: QuoteIcon,
    quoteNum: 25,
    quotes: FetchData.quotes
  };

  // Add Watchlist and Remove Watchlist
  const {addWatchlist , removeWatchlist} = UpdateWatchlist(LoginObject);

  // Update category icon
  const ToogleCategory = (selectedCategory) => {

    switch (selectedCategory) {
      // Most Actives
      case 'most_actives':
      setQuoteIcon('insert_chart');
        break;

      //Gainers
      case 'day_gainers':
        setQuoteIcon('trending_up');
        break;

      //Losers
      case 'day_losers':
        setQuoteIcon('trending_down');
        break;

      // Default   
      default:
        setQuoteIcon('insert_chart');
    }
  };

  // Animation Variants 
  const {MarketsHeaderVariant, MarketRowVariant, StarIconVariant} = AnimationVariants();
 
  return (
    <div className="Markets">
      {/* Market Header */}
      <motion.div
        variants={MarketsHeaderVariant}
        initial='Enter'
        animate='End'
        className="Browse__header card center">
        <span className="flowing-text">Markets</span>
        <img src={MarketsHeaderImg} className="responsive-img" alt="img not found"/>
      </motion.div>
      <motion.div
        variants={MarketRowVariant}
        initial='Enter'
        animate='End'
        className="row">
        <div className="col s12">
          <ul className="TableHeader">
          <li>
            {/* Market Category options */}
            <div className="collapsible-header teal darken-2" id="MarketTable">
              <div className="leftContent">              
                <i className="material-icons white-text">{QuoteObject.icon}</i>
                <div className="input-field fixfield">
                  <select onChange={((e)=>{ ToogleCategory(e.target.value); setCategory(e.target.value)})}>
                    <option value="most_actives" defaultValue >Most Actives</option>
                    <option value="day_gainers">Gainers</option>
                    <option value="day_losers">Losers</option>
                  </select>
                </div>
              </div>
              <span className="new badge hide-on-small-only" data-badge-caption="Quotes">{QuoteObject.quoteNum}</span>
            </div>

            {/* Market Table */}
            <div className="Market__table white">
              <table>
                <thead>
                  <tr>
                    <th>MARKET</th>
                    <th>PRICE</th>
                    <th></th>
                    <th>CHANGE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  { QuoteObject.quotes && !Loading  &&
                    QuoteObject.quotes.slice(PageStart, PageEnd).map((quote)=> (
                    <tr key={quote.symbol}>

                      {/* Company name and Symbol */}
                      <td>
                        <p className="teal-text darken-2 symbol">{quote.symbol}</p> 
                        <p className="grey-text darken-2 company truncate"
                           data-position="top" 
                           data-tooltip={quote.longName && quote.longName}
                        >{quote.longName}</p>
                      </td>
      
                      {/* Price */}
                      <td>
                        <p>${parseFloat(quote.regularMarketPrice).toFixed(2)}</p>
                      </td>

                      {/* Update arrow icons and text color */}
                      {(quote.regularMarketChange.toString()).includes('-') ? 
                        updateQuoteChange('arrow_downward', 'pink-text accent-3') : 
                        updateQuoteChange('arrow_upward', 'teal-text') 
                      }
                      <td className="quoteChangeicons">
                        <i className={`${QuoteChange.color} tiny material-icons td_icon`}>{QuoteChange.icon}</i>
                      </td>
          
                      {/* QuoteChange */}
                      <td>
                        <p className={QuoteChange.color}>
                        { (quote.regularMarketChange > 0) && 
                          <>+</>
                        }
                          { parseFloat(quote.regularMarketChange).toFixed(2) }
                        </p>
                        <p className={QuoteChange.color}> 
                          { (quote.regularMarketChange > 0) && 
                            <>+</>
                          }
                          {parseFloat(quote.regularMarketChangePercent).toFixed(2)}%
                        </p>
                      </td>

                      {/* Star icon  */}
                      <td>
                      {Auth && (LoginObject.UserObject.watchlist).includes(quote.symbol) ?
                        <a 
                        href="#!">
                          <motion.i 
                            variants={StarIconVariant}
                            whileHover='OnHover'
                            whileTap={{ rotate: -180 }}
                            className="material-icons td_icon accent-4 amber-text" 
                            onClick={()=> {removeWatchlist(quote.symbol)}}>star
                          </motion.i>
                        </a>
                        :
                        <a href="#!">
                          <motion.i 
                            variants={StarIconVariant}
                            whileHover='OnHover'
                            whileTap={{ rotate: 180 }}
                            className="material-icons td_icon black-text" 
                            onClick={()=> {addWatchlist(quote.symbol)}}>star_border
                          </motion.i>
                        </a>
                      }
                      </td>
                    </tr>
                    ))
                  }
                </tbody>        
              </table>
              {/* Loader */}
              { (!QuoteObject.quotes || Loading) &&
                <Loader />  
              }
            </div>
              <div className="markets_Pagination white">
              {/* Pagination */}
              <Pagination
                  parent={'MarketTable'}
                  TotalNumData ={25}
                  setPageStart={setPageStart}
                  setPageEnd = {setPageEnd}
                  itemsPerPage = {5} 
                />
              </div>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default Markets
