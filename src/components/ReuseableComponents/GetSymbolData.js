import axios from 'axios';
import { useEffect, useState } from 'react';

const GetSymbolData = (propSymbol) => {

  const [SymbolData, setSymbolData] = useState('');

  useEffect(() => {
    const ac = new AbortController();
    const FetchForSymbolData = async () => {
      if((propSymbol.toString()).length > 0) {
        await axios({
          method: 'get',
          url: `https://sandbox.iexapis.com/stable/stock/${propSymbol}/quote?token=${process.env.REACT_APP_IEXAPI_TOKEN}`
        })
        .then(function (res) {
          if(res.data) {
            setSymbolData(res.data);
          }
        }).catch(err => {
          if(err.response) {
            setSymbolData(err.response.data);
          } 
        });
      }
    }
    FetchForSymbolData();
    return () => ac.abort();
  }, [propSymbol]);

  return { SymbolData };
}
export default GetSymbolData;
