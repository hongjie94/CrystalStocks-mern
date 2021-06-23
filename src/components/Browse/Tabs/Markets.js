import { useState } from 'react';
import MarketsHeaderImg from '../../../images/markets.svg';
import DataFetcher from '../../ReusableComponents/DataFetcher';
import Pagination from '../../ReusableComponents/Pagination';
import Loader from '../../ReusableComponents/Loader';

const Markets = () => {
 
  // API Urls
  const MostActivesFetcherURL= 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/most_actives';
  const GainersFetcherURL = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/day_gainers';
  const LosersFetcherURL = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/day_losers';

  // Fetch Data
  const [Url, setUrl] = useState(MostActivesFetcherURL);
  const Data = DataFetcher(Url);

  // Page Start/ End
  const [PageStart, setPageStart] = useState(0);
  const [PageEnd, setPageEnd] = useState(5);

  // Update QuoteObjects
  const [QuoteCategory, setQuoteCategory] = useState("Most Actives");
  const [QuoteIcon, setQuoteIcon] = useState("insert_chart");
  let QuoteChange = {icon:'', color:''};

  // QuoteObject
  let QuoteObject = {
    category: QuoteCategory,
    icon: QuoteIcon,
    quoteNum: 25,
    quotes: Data.FetchData.quotes
  };

  const updateQuoteChange =(icon, color) => {
    QuoteChange = {icon: icon, color: color};
  };

  const toggleCategory = (e) => {

    const selectValue = e.target.value;
   

    switch (selectValue) {
      // Most Actives
      case 'MostActivesFetcherURL':
      setUrl(MostActivesFetcherURL);
      setQuoteIcon('insert_chart')
      setQuoteCategory('Most Actives');
        break;

      //Gainers
      case 'GainersFetcherURL':
        setUrl(GainersFetcherURL);
        setQuoteIcon('trending_up');
        setQuoteCategory('Gainers');
        break;

      //Losers
      case 'LosersFetcherURL':
        setUrl(LosersFetcherURL);
        setQuoteIcon('trending_down');
        setQuoteCategory('Losers');
        break;
        
      default:
        setUrl(MostActivesFetcherURL);
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
            <div className="collapsible-header teal darken-3">
              <div className="leftContent">              
                <i className="material-icons white-text">{QuoteObject.icon}</i>
                <div className="input-field fixfield">
                  <select onChange={((e)=>toggleCategory(e))}>
                    <option value="MostActivesFetcherURL" defaultValue >Most Actives</option>
                    <option value="GainersFetcherURL">Gainers</option>
                    <option value="LosersFetcherURL">Losers</option>
                  </select>
                </div>
              </div>
              <span className="new badge  hide-on-small-only" data-badge-caption="Quotes">{QuoteObject.quoteNum}</span>
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
                  { QuoteObject.quotes &&
                    QuoteObject.quotes.slice(PageStart, PageEnd).map((quote, index)=> (
                    <tr key={index}>
                      {/* Company name and Symbol */}
                      <td>
                        <p className="teal-text darken-4 symbol">{quote.symbol}</p> 
                        <p className="grey-text darken-4 company">{quote.longName}</p>
                      </td>
      
                      {/* Price */}
                      <td>
                        <p>${quote.regularMarketPrice}</p>
                      </td>

                      {/* Arrow icons */}
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
                          {parseFloat(quote.regularMarketChange).toFixed(2)}
                        </p>
                        <p className={QuoteChange.color}> 
                          {parseFloat(quote.regularMarketChangePercent).toFixed(2)}%
                        </p>
                      </td>

                      {/* Star icon  */}
                      <td>
                        <i className="material-icons td_icon">star_border</i>
                      </td>
                    </tr>
                    ))
                  }
                </tbody>        
              </table>
              {/* Loader */}
              { !QuoteObject.quotes &&
                <Loader />  
              }
            </div>
              <div className="markets_Pagination white">
              {/* Pagination */}
              <Pagination
                  parent={'markets'}
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
