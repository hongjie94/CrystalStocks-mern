import { useCallback } from 'react';

const UpdateWatchlist = (LoginObject) => {

  const RemoveFromLocalStorge = useCallback((symbol) => {
    window.localStorage.removeItem(symbol);
  },[])

  const addWatchlist = ((symbol)=> {
    if(LoginObject.Auth) {
      alert("addWathlist");
      LoginObject.UpdateWatchlist(symbol, "Add");
    }
    else{alert('must log in')}
  })

  const removeWatchlist = ((symbol)=> {
    if(LoginObject.Auth) {
      alert("removeWathlist");
      LoginObject.UpdateWatchlist(symbol, "Remove");
      RemoveFromLocalStorge();
    }
    else{alert('must log in')}
  })

  return {addWatchlist, removeWatchlist };
}

export default UpdateWatchlist;
