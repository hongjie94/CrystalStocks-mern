
import axios from "axios";
import { useEffect, useState, useCallback} from 'react';

const DataFetcher = (URL) => {

  const [FetchData, setFetchData] = useState('');
  const [Loading, setLoading] = useState(false);

  const getData = useCallback( async () => {
    const options = {
      method: 'GET',
      withCredentials: true, 
      url: URL,
      headers: {
        'x-rapidapi-key': `${process.env.REACT_APP_RAPIDAPI_KEY2}`,
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
      }
    }
   await axios.request(options).then((res) => {  
    if(res) {
      setFetchData(res.data);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    }).catch((error) => {
      console.error(error);
    });
  },[URL]); 
  
  useEffect (() => {
    const ac = new AbortController();
    getData();
    return () => ac.abort();
  }, [URL, getData]);

  return { FetchData, Loading };
}

export default DataFetcher;


