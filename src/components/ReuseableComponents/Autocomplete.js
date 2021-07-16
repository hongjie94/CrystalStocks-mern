
import { useEffect } from 'react';
import { useSearchSymbols } from 'ticker-symbol-search';
import M from 'materialize-css';

const Autocomplete = ({InputValue,setInputValue,setCurSymbol, setLoading}) => {
  
  // Init Autocomplete Materialize JS
  useEffect(() => {
    const ac = new AbortController();
    let Autocomplete = document.querySelectorAll('.autocomplete');
    M.Autocomplete.init(Autocomplete, options);
    return () => ac.abort();
  });

  // Get Symbols 
  let { symbols, isSuccess, isLoading } = useSearchSymbols(InputValue, 'stock');
  
  // Turn  array to objects
  const SymbolObjs = symbols.reduce((obj, cur, i) => {  
    if(isSuccess) {
      return { ...obj, [cur.symbol]: null };   
    }
    return isLoading;
  }, {});

  // Autocomplete options
  let options = {
    //Data object for autocomplete
    data: SymbolObjs,

    //Limit of results autocomplete shows
    limit: 5,

    // Callback function for Autocomplete
    onAutocomplete() {
      const input = document.getElementById("autocomplete-input", { passive: false });
      setTimeout(() => {
        setLoading(true);
      }, 1000);
      return setCurSymbol(input.value);
    }
  };  

  // Search handler
  const searchInput = (e) => {
    const value = e.target.value;
    if( value <= 4) {
      setInputValue(value); 
    }
    if (e.key === 'Enter') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      setCurSymbol(value);
    }
  };

  return (
    <>
       <div className="row Search__bar">
        <div className="col s12">
          <div className="row">
            <div className="input-field col s12 m6 l4">
              <i className="material-icons prefix white-text">search</i>
              <input 
                type="text" 
                id="autocomplete-input" 
                className="autocomplete" 
                autoComplete='off' 
                onKeyDown={(e) => {searchInput(e)}}
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
