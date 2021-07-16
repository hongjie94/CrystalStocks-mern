import { useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateWatchlist = (LoginObject) => {
 
  const RemoveFromLocalStorge = useCallback((symbol) => {
    return window.localStorage.removeItem(symbol);
  },[]);

  const AddToLocalStorge = useCallback((symbol) => {
    if(symbol.toString().length > 0) {
      axios({
        method: 'get',
        url: `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.REACT_APP_IEXAPI_TOKEN}`
      }).then(res => {
        if(res) {
          window.localStorage.setItem(symbol, JSON.stringify(res.data));
        }
      }).catch(err => console.log(err)); 
    }
  }, []);

  const addWatchlist = ((symbol)=> {
    if(LoginObject.Auth) {
      LoginObject.UpdateWatchlist(symbol, "Add");
      AddToLocalStorge(symbol);
    }
    else {
      return toast('An account is required. Please create an account or log in to continue.',
        {
          icon: '❗️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    }
  })

  const removeWatchlist = ((symbol)=> {
    if(LoginObject.Auth) {
      LoginObject.UpdateWatchlist(symbol, "Remove");
      RemoveFromLocalStorge(symbol);
    }
    else{
      return toast('An account is required. Please create an account or log in to continue.',
        {
          icon: '❗️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    }
  });
  return {addWatchlist, removeWatchlist };
}

export default UpdateWatchlist;
