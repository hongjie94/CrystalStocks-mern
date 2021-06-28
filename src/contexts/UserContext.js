import { createContext, useEffect, useState, useCallback} from 'react';
import axios from 'axios';

export const LoginContext = createContext({});
export const TransactionContext = createContext({});

export default function Context({children}) {
    
  const [UserObject, setUserObject] = useState('');
  const [Auth, setAuth] = useState(false);

  // Save symbol datas to Local Storage
  const saveDataToLocalStorage = (UserWatchlist) => {
    UserWatchlist.forEach(async (symbolName) => {
      if(symbolName) {
        await axios({
          method: 'get',
          url: `https://sandbox.iexapis.com/stable/stock/${symbolName}/quote?token=${process.env.REACT_APP_IEXAPI_TOKEN}`
        }).then(res => {
          if(res) {
            window.localStorage.setItem(symbolName, JSON.stringify(res.data));
          }
        }).catch(err => console.log(err))  
      }
      else {return;}      
    })
  }

  // Get User Objects
  const getUserObjects = useCallback(() =>{
    axios.get("http://localhost:4000/auth/getuser", { 
      withCredentials: true }
      ).then((res) => {
        if (res.data) {
          setUserObject(res.data);
          setAuth(true);
          saveDataToLocalStorage(res.data.watchlist);
        }
      }).catch((err)=> {
        console.error(err);
      });
  }, []);

  // Update watchlist
  const UpdateWatchlist = async (symbol, method) => {

    let UserWatchlist = UserObject.watchlist;
    const userID = UserObject.id;

    switch (method) {
      case 'Add':
        UserWatchlist.push(symbol);;
      break;
      case 'Remove':
        UserWatchlist =  UserWatchlist.filter((list)=> {
          return list !== symbol;
        });
      break;
      default:
        console.log(`UpdateWatchlist erro method: ${method}.`);
    } 
    
    await axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4000/auth/update_watchlist",
      data: {
        id : userID,
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



  // Get User Datas
  useEffect(() => {
     getUserObjects();
    // Get User Tranactions
    // axios.get("http://localhost:4000/api/stock/get", { 
    //   withCredentials: true }
    //   ).then((res) => {
    //     console.log(res.data);
    //   if (res.data) {
    //     console.log(res.data);
    //   }
    // });
  },[getUserObjects]);



  // Update User Objects if login method is local
  const UpdateUserObject = (obj) => {
    setUserObject(obj);
    setAuth(true);
  };
 
 
;

   // Update cash
  // const UpdateCash = (amount) => {
  //   if(Auth) {
  //     console.log(UserObject.cash)
  //   }
  // }

  return (
      <LoginContext.Provider value={{
      UserObject, 
      Auth, 
      UpdateUserObject, 
      UpdateWatchlist
      }}>

        {children}
      </LoginContext.Provider>
  )
}