import { useState } from 'react';
import NewsHeaderImg from '../../../images/news.svg';
import DataFetcher from '../../ReuseableComponents/DataFetcher';
import Pagination from '../../ReuseableComponents/Pagination';
import Loader from '../../ReuseableComponents/Loader';

const News = () => {

  // Fetcher objects
  const NewsfetcherUrl = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news';

  // Get Data
  const {FetchData} = DataFetcher(NewsfetcherUrl);

  // Number of News show per page
  const [NewsPageStart, setNewsPageStart] = useState('');
  const [NewsPageEnd, setNewsPageEnd] = useState('');
  const YhaooNews= (FetchData.slice(NewsPageStart, NewsPageEnd));

  return (
    <div className="News">
      <div className="Browse__header card center">

        {/*  News header  */}
        <img src={NewsHeaderImg} className="responsive-img" alt="img not found"/>
        <span className="flowing-text">Latest News</span>
      </div>
      <div className="row">

        {/* News contents  */}
        { YhaooNews ?
          YhaooNews.map((data, index) => (
            <div className="col s12 m6 l4" key={index}>
              <div className="card News__card">
                <a href={data.link} target="_blank" rel="noreferrer" className="black-text newsTitleLinks">
                  <p>
                    {data.title.substr(0, 85)}
                    {data.title.length > 85 ? " .....":  ""}
                  </p>
                </a>
                <div className="News__footer">
                  <p className="">{data.source}</p>
                  <span className="grey-text">{new Date(data.pubDate).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )) 
          :
          <Loader />
        }
      </div>

      {/* Pagination */}
      <Pagination
        parent={'news'}
        TotalNumData ={FetchData.length}
        setPageStart={setNewsPageStart}
        setPageEnd = {setNewsPageEnd}
        itemsPerPage = {12} 
      />
    </div>
  )
}

export default News
