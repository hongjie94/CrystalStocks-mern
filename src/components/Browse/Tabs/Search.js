import { useState} from 'react';
import Autocomplete from '../../ReusableComponents/Autocomplete';
import NoData from '../../../images/noData.svg';
import SearchHeaderImg from '../../../images/searchBody.svg';
import Loader from '../../ReusableComponents/Loader';
import GetQuoteData from '../../ReusableComponents/GetQuoteData';

const Search = () => {

  // Use State
  const [InputValue, setInputValue] = useState(null);
  const [QuotesUrl, setQuoteUrl] = useState(null);
  const [Loading, setLoading ]= useState(false);

  // Get  Quote Datas
  const {QuoteData} = GetQuoteData(QuotesUrl);
    
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
        setQuoteUrl={setQuoteUrl}
        setLoading={setLoading}
      />

      {/* Search contents */}
      <div className="Searchcontent">
        <div className="card">
          <div className="container">

            {/* Symbol Info */}
            <div className="row">
              {
                (QuoteData !== 'Unknown symbol' && QuoteData) ?
                <>
                  <div className="row QuotesData">
                    <div className="col s12">
                      <span className="companyName"> {QuoteData.companyName} ({QuoteData.symbol})</span>
                      <p className="Quotessymbol"> {QuoteData.symbol}</p>
                      <p> ${QuoteData.latestPrice}</p>
                    </div>
                   
                  
                    <div className="col s12 m6">
                    <p> Change: ${QuoteData.change}</p>
                    <p> Change % {QuoteData.changePercent}</p>
                    <p> Time: {QuoteData.latestTime}</p>
                    <p> Open: {QuoteData.open}</p>
                    <p>volume: {QuoteData.volume}</p>
                    <p>previousVolume: {QuoteData.previousVolume}</p>
                    </div>
                    <div className="col s12 m6">
                      <p> Close: {QuoteData.close}</p>
                      <p> pre Close: {QuoteData.previousClose}</p>
                      <p>High: {QuoteData.high}</p>
                      <p>Low: {QuoteData.low}</p>
                      <p>52 Wk High: {QuoteData.week52High}</p>
                      <p>52 Wk Low: {QuoteData.week52Low}</p>
                    </div>
                  </div>
                    
                 
                   
                   
                    
                </>
                :
                <div className="center nonfound">
                  <img src={NoData} className="responsive-img" alt="NoData"/>
                  { Loading ?
                    <div className="searchLoader">
                      <Loader />
                    </div>
                  :
                    !Loading &&
                    <>
                      {(QuoteData === 'Unknown symbol') ?
                        <p>No symbols found...</p> 
                        :
                        <p>Search your symbols...</p> 
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
