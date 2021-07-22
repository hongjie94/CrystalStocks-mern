import { createContext, useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const LoginContext = createContext({});
export const TransactionContext = createContext({});

export default function Context({children}) {
        
  const [UserObject, setUserObject] = useState('');
  const [StockHistories, setStockHistories] = useState('');
  const [UserHoldings, setUserHoldings] = useState('');
  const [Auth, setAuth] = useState(false);
  const baseURL = 'https://crystalstocks-backend.herokuapp.com';
  // const baseURL = 'http://localhost:4000';


  // Save symbol datas to Local Storage
  const saveDataToLocalStorage = useCallback((SymbolList) => {
    if(SymbolList.length === 1) {
      GetSymbolDatas(SymbolList);
    }else {
      SymbolList.filter(symbolName => {
        return GetSymbolDatas(symbolName); 
      });
    }
  },[]);


  // Get User Histories
  const getStockHistories = useCallback( async (UserID) =>{
    await axios({
      method: "POST",
      withCredentials: true,
      url: `${baseURL}/api/histories/sync`,
      data: {
        user_id: UserID
      }
    }).then((res) => {
      if(res.data) {
        setStockHistories((res.data).reverse());
      }
    }).catch((err)=> {
      console.error(err);
    });
  }, []);


  // Get User Holdings
  const getHoldings =  useCallback(async (UserID) =>{
    await axios({
      method: "POST",
      withCredentials: true,
      url: `${baseURL}/api/stocks/sync`,
      data: {
        user_id: UserID
      }
    }).then((res) => {
        if (res.data) {
          if(res.data[0]) {
            setUserHoldings((res.data[0].stocks).reverse());
          }
        }
      }).catch((err)=> {
        console.error(err);
      });
  }, []);

  
  // Get User Objects
  const getUserObjects =  useCallback(async () =>{
    await axios.get( `${baseURL}/auth/getuser`, { 
      withCredentials: true,
      credentials: 'include'
    }).then((res) => {
      if (res.data === 'get user data fail!') {
        alert('Safari is not sharing the cookies due to Prevent cross-site tracking setting being enabled. Disable prevent cross site tracking in safari to login or switch browser to Chrome/Firefox.');
      }
      if (res.data) {
        setUserObject(res.data);
        setAuth(true);
        saveDataToLocalStorage(res.data.watchlist);
        getStockHistories(res.data.id);
        getHoldings(res.data.id);
      }
      }).catch((err)=> {
        // can be slove by set cname record + subdomain on backend
        console.error(err);
      });
  }, [saveDataToLocalStorage, getStockHistories, getHoldings]);

  // Update Watchlist
  const UpdateWatchlist = async (symbol, method) => {
    let UserWatchlist = UserObject.watchlist;
  
    switch (method) {
      case 'Add':
        UserWatchlist.unshift(symbol);
      break;
      case 'Remove':
        UserWatchlist =  UserWatchlist.filter((list)=> {
          return list !== symbol;
        });
      break;
      default:
        console.error(`UpdateWatchlist erro method: ${method}.`);
    } 
    await axios({
      method: "POST",
      withCredentials: true,
      url: `${baseURL}/auth/update_watchlist`,
      data: {
        id : UserObject.id,
        watchlist: UserWatchlist
      }
    }).then((res) => {
    if(res.data === 'ok') {
        return getUserObjects();
      }
    }).catch((err)=> {
      console.error(err);
    });
  };


  // Update Cash
  const UpdateCash = async (NewCash) => {
    await axios({
      method: "POST",
      withCredentials: true,
      url: `${baseURL}/auth/update_cash`,
      data: {
        id : UserObject.id,
        updatedCash: parseFloat(NewCash).toFixed(2)
      }
    }).then((res) => {
    if(res.data === 'ok') {
        return getUserObjects();
      }
    }).catch((err)=> {
      console.error(err);
    });
  };


  // Save Transaction
  const SaveTransaction = (symbol, shares, price) => {
    axios({
      method: "POST",
      withCredentials: true,
      url: `${baseURL}/api/stocks/save`,
      data: {
        user_id: UserObject.id,
        symbol: symbol,
        shares: shares,
        price: price,
        time: new Date().toLocaleString()
      }
    }).then((res) => {
    if(res.data === 'ok') {
        return getStockHistories();
      }
    }).catch((err)=> {
      console.error(err);
    });
  };


  // Save Stock
  const SaveStock = (symbol, company, shares, method) => {

    let newStocksArr = []
    
    const SaveToDb = async (newStocksArr) => {
      await axios({
        method: "POST",
        withCredentials: true,
        url:`${baseURL}/api/stocks/trade`,
        data: {
          user_id: UserObject.id,
          stocks: newStocksArr
        }
      }).then((res) => {
      if(res.data) {
        toast.success("Trade Success!");
        }
      }).catch((err)=> {
        console.error(err);
      });
    } 
    // Check if user has holdings
    if(UserHoldings.length >= 1) {

      // Get exist share 
      let existShares = UserHoldings.filter((HoldingObject, index) => {
        return HoldingObject.symbol === symbol
      })

      // If Stock already exist update shares 
      if(existShares.length === 1 ) {

        // Filter stocks that does not include current symbol (void duplicate)
        newStocksArr = UserHoldings.filter((HoldingObject, index) => {
          return HoldingObject.symbol !== symbol
        })

        // Update shares
        switch (method) {
          case 'BUY':
            existShares[0].shares += shares
          break;
          case 'SELL':
            existShares[0].shares -= shares
          break;
          default:
          console.error(`Save Stock err at method: ${method}.`);
        }

        // Merge updated shares 
        if(existShares[0].shares !== 0) {
          newStocksArr = newStocksArr.concat(existShares)
          SaveToDb(newStocksArr);
        } else {
          SaveToDb(newStocksArr);
        }
      }else { // If new stock add it to newStocksArr
         newStocksArr = UserHoldings
         newStocksArr.push({
          "symbol": symbol,    
          "company": company,
          "shares": shares
        })
        SaveToDb(newStocksArr);
      }
    }else { // If new user create a newStocksArr 
       newStocksArr = [{
        "symbol": symbol,    
        "company": company,
        "shares": shares
      }]
      SaveToDb(newStocksArr);
    }   
    // save current symbol to LocalStorage
    saveDataToLocalStorage([symbol])
  }
  

  // Trade
  const Trade = (symbolInofo, shares, method) => {
    const cash = UserObject.cash;
    const symbol = symbolInofo.SymbolName;
    const company = symbolInofo.SymbolCompany;
    const price = symbolInofo.SymbolPrice;
    const totalPrice = price * shares;
    
    switch (method) {
      case 'BUY':
        // Check if user have enough cash
        if(totalPrice < cash) {
          const cashRemainingBuy = cash - totalPrice;
          SaveStock(symbol, company, shares, method);
          SaveTransaction(symbol, shares, price);
          UpdateCash(cashRemainingBuy);
        } else {
          return toast('Not enough cash !',
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
      break;
      case 'SELL':
        const existStock = UserHoldings.filter((hodling, index)=> {
          return hodling.symbol === symbol
        })
      
        if(existStock.length === 1) {
          if(existStock[0].shares >= shares) {
            const cashRemainingSell = cash + totalPrice;
              SaveStock(symbol, company, shares, method)
              UpdateCash(cashRemainingSell);
              SaveTransaction(symbol, (shares * -1), price);
          } else {
            return toast('Not enough shares for sell !',
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
        } else {
          return toast('Shares not exist!',
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
      break;
      default:
        console.error(`Trade err at method: ${method}.`);
    } 
  };

  // Get Symbol Datas
  const GetSymbolDatas = async (symbol) => {  
    if((symbol.toString()).length > 0) {
      axios({
        method: 'get',
        url: `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.REACT_APP_IEXAPI_TOKEN}`
      }).then(res => {
        if(res) {
          return window.localStorage.setItem(symbol, JSON.stringify(res.data));
        }
      }).catch(err => console.error(err)); 
    }
  };

  useEffect(() => {
    getUserObjects();
  },[getUserObjects]);

  return (
    <LoginContext.Provider value={{
      UserObject, 
      Auth, 
      setAuth,
      UpdateWatchlist,
      getUserObjects,
      getStockHistories,
      getHoldings,
      StockHistories,
      UserHoldings,
      setUserObject,
      setUserHoldings,
      setStockHistories,
      saveDataToLocalStorage,
      Trade
    }}>
      {children}
    </LoginContext.Provider>
  )
}
