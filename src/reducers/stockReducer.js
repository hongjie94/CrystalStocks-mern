
import axios from 'axios';
export const stockReducer = (state, action) => {

  switch (action.type) {
    
    // Buy Stock
    case 'BUY_STOCK':
    return axios({ 
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4000/auth/login",
      data: {
        username: 'dsa'
      }
  }).then((res) => {
    if(res.data === 'No User Exists') {
      alert(res.data);
    } else {
        // LoginObject.UpdateUserObject(res.data);
        // history.push('/holdings');
      }
    }
  );

  // Sell Stock
  case 'SELL_STOCK':
    return axios({ 
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4000/auth/login",
      data: {
        username: 'dsa'
      }
    }).then((res) => {
      if(res.data === 'No User Exists') {
        alert(res.data);
      } else {
          // LoginObject.UpdateUserObject(res.data);
          // history.push('/holdings');
        }
      }
    );  
    
    default: console.log('stockReducer erro');
  }
};
