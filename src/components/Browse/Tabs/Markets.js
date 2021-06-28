import { useState, useContext } from 'react';
import MarketsHeaderImg from '../../../images/markets.svg';
import DataFetcher from '../../ReuseableComponents/DataFetcher';
import Pagination from '../../ReuseableComponents/Pagination';
import Loader from '../../ReuseableComponents/Loader';
import { LoginContext } from '../../../contexts/UserContext';
import UpdateWatchlist from '../../ReuseableComponents/UpdateWatchlist';

const Markets = () => {

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

  return (
    <div className="Markets">
      {/* Market Header */}
      <div className="Browse__header card center">
        <span className="flowing-text">Markets</span>
        <img src={MarketsHeaderImg} className="responsive-img" alt="img not found"/>
      </div>
      <div className="row">
        <div className="col s12">
          <ul className="TableHeader">
          <li>
            {/* Market Category options */}
            <div className="collapsible-header teal darken-3" id="MarketTable">
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
                  </tr>
                </thead>
                <tbody>
                  { QuoteObject.quotes && !Loading  &&
                    QuoteObject.quotes.slice(PageStart, PageEnd).map((quote)=> (
                    <tr key={quote.symbol}>

                      {/* Company name and Symbol */}
                      <td>
                        <p className="teal-text darken-4 symbol">{quote.symbol}</p> 
                        <p className="grey-text darken-4 company">{quote.longName}</p>
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
                          { parseFloat(quote.regularMarketChange).toFixed(2) }
                        </p>
                        <p className={QuoteChange.color}> 
                          {parseFloat(quote.regularMarketChangePercent).toFixed(2)}%
                        </p>
                      </td>

                      {/* Star icon  */}
                      <td>
                      {Auth && (LoginObject.UserObject.watchlist).includes(quote.symbol) ?
                        <a href="#!">
                          <i className="material-icons td_icon accent-4 amber-text" onClick={()=> {removeWatchlist(quote.symbol)}}>star</i>
                        </a>
                        :
                        <a href="#!">
                          <i className="material-icons td_icon black-text" onClick={()=> {addWatchlist(quote.symbol)}}>star_border</i>
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
      </div>
    </div>
  )
}

export default Markets
