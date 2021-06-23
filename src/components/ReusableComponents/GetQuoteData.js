import axios from 'axios';
import { useEffect, useState } from 'react';

const GetQuoteData = (QuotesUrl) => {

  const [QuoteData, setQuoteData] = useState('');

  useEffect(() => {
    axios({
      method: 'get',
      url: QuotesUrl
    })
    .then(function (res) {
      if(res.data) {
        console.log(res.data);
        setQuoteData(res.data);
      }
    }).catch(err => {
      if(err.response) {
        setQuoteData(err.response.data);
      } 
    });
  }, [QuotesUrl]);
  return { QuoteData };
}
export default GetQuoteData;
