
import axios from "axios";
import { useEffect, useState } from 'react';

const DataFetcher = (URL) => {

  const [FetchData, setFetchData] = useState('');

  useEffect (() => {
   
    const options = {
      method: 'GET',
      withCredentials: true, 
      url: URL,
      headers: {
        'x-rapidapi-key': `${process.env.REACT_APP_RAPIDAPI_KEY2}`,
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
      }
    }

    const getData = async () => {
     await axios.request(options).then((res) => {  
        setFetchData(res.data);
      }).catch((error) => {
        console.error(error);
      });
    } 
    
    if(URL) {
      getData();
    }
  }, [URL]);

  return { FetchData };
}

export default DataFetcher;


