
import { useEffect } from 'react';
import { useSearchSymbols } from 'ticker-symbol-search';
import M from 'materialize-css';

const Autocomplete = ({InputValue,setInputValue,setQuoteUrl, setLoading}) => {
  
  // Init Autocomplete Materialize JS
  useEffect(() => {
    let Autocomplete = document.querySelectorAll('.autocomplete');
    M.Autocomplete.init(Autocomplete, options);
  });

  // Get Symbols 
  let { symbols, isSuccess, isLoading } = useSearchSymbols(InputValue, 'stock');
  
  // Turn  array to objects
  const SymbolObjs = symbols.reduce((obj, cur, i) => {  
    if(isSuccess) {
      return { ...obj, [cur.symbol]: null };   
    }
    return null;
  }, {});

  // Autocomplete options
  let options = {
    //Data object for autocomplete
    data: SymbolObjs,

    //Limit of results autocomplete shows
    limit: 5,

    // Callback function for Autocomplete
    onAutocomplete() {
      const input = document.getElementById("autocomplete-input");
      setQuoteUrl(`https://sandbox.iexapis.com/stable/stock/${input.value}/quote?token=${process.env.REACT_APP_IEXAPI_TOKEN}`);
      setTimeout(() => {
        setLoading(true);
      }, 2000);
    }
  };  

  // Search handler
  const searchInput = async (e) => {
    const value = e.target.value.toUpperCase();
    if(value.length < 4 && !isLoading) {
      setInputValue(e.target.value);
    }
    if (e.key === 'Enter') {
      setLoading(true);
      setTimeout(() => {
        console.log('set_loading');
        setLoading(false);
      }, 1500);
      setQuoteUrl(`https://sandbox.iexapis.com/stable/stock/${value}/quote?token=${process.env.REACT_APP_IEXAPI_TOKEN}`);
    }
  };

  return (
    <>
       <div className="row Search__bar">
        <div className="col s12">
          <div className="row">
            <div className="input-field col s12 m4">
              <i className="material-icons prefix white-text">search</i>
              <input 
                type="text" 
                id="autocomplete-input" 
                className="autocomplete" 
                autoComplete='off' 
                onKeyDown={(e) => searchInput(e)}
              />
              <label htmlFor="autocomplete-input">Search Symbol</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Autocomplete
