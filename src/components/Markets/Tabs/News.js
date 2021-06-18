import axios from "axios";
import { useEffect, useState, useRef } from 'react';
import M from 'materialize-css';
import NewsHeaderImg from '../../../images/news.svg';

const News = () => {
 
  const paginationRef = useRef(null);
  const [YhaooNews, setYhaooNews] = useState('');
  const [TotaleNumNews, setTotaleNumNews] = useState('');
  const [CurrentPage, setCurrentPage] = useState(1);

  const newsPerPage = 12;

  let totalPageNum = Math.ceil(TotaleNumNews / newsPerPage);

  const start = (CurrentPage - 1 ) * newsPerPage;

  let end

  if(CurrentPage * newsPerPage < TotaleNumNews) {
    end = (CurrentPage * newsPerPage)
  } else{
    end = TotaleNumNews;
  }

  let pageNumArr = [];

  for( let i = 1; i <= totalPageNum; i++ ) {
    pageNumArr.push(i);
  }

  const updatePage = (e, pageNumArr, page) => {
    
    if (e) {
      // console.log(e.target.innerText)
      pageNumArr.forEach(page => {
        document.getElementsByClassName(`News_page${page}`)[0].className = `waves-effect News_page${page}`;
      });
   
      document.getElementsByClassName(`News_page${page}`)[0].className +=' active teal darken-3';

      setCurrentPage(page); 
    }
    console.log('nope')
    return setCurrentPage(1);
    
    // pageNumArr.forEach(page => {
    //     document.getElementsByClassName(`News_page${page}`)[0].className = `waves-effect News_page${page}`;
    // });
    // document.getElementsByClassName(`News_page${CurrentPage}`)[0].className +=' active teal darken-3';
  }
  

  
  useEffect (() => {
    

    M.AutoInit();
    
    const options = {
      method: 'GET',
      withCredentials: true, 
      url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news',
      headers: {
        'x-rapidapi-key': `${process.env.REACT_APP_RAPIDAPI_KEY}`,
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
      }
    }; 
    const getNews = () => {
      axios.request(options).then((res) => {
        setTotaleNumNews((res.data).length);
        setYhaooNews((res.data).slice(start, end));
        console.log(res.data);
      }).catch((error) => {
        console.error(error);
      });
    };

    getNews();
    updatePage();
  
  }, [start, end, CurrentPage]);

  return (
    <div className="News">
      <div className="Browse__header card center">
        <img src={NewsHeaderImg} className="responsive-img" alt="img not found"/>
        <span className="flowing-text">Latest News</span>
      </div>
      <div className="row">
      { YhaooNews && 
        YhaooNews.map((data, index) => (
          <div className="col s12 m6 l4" key={index}>
            <div className="card News__card">
              <a href={data.link} target="_blank" rel="noreferrer" className="black-text newsTitleLinks">
                <p>{data.title.substr(0, 85)}{data.title.length > 85 ? " .....":  ""}</p>
              </a>
              <div className="News__footer">
                <p className="">{data.source}</p>
                <span className="grey-text">{new Date(data.pubDate).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))
      }
      </div>
      
    <ul className="pagination" >
      <li className="disabled">
        <a href="#!"><i className="material-icons">chevron_left</i></a>
      </li>
      <div className="pageNum" ref={paginationRef}>
        {pageNumArr.map((page ,index) => (
          <li className={`waves-effect News_page${index + 1}`} key={index}>
            <a href="#!" onClick={(e) => updatePage(e, pageNumArr, page)}>{page}</a>
          </li>
        ))}
      </div>  
        {/* {currentPageClass} */}
        {/* active teal darken-3 */}
        
        {/* <li className="waves-effect">
          <a onClick={(e) => test(e.target.innerText)} href="#!">2</a></li>
        <li className="waves-effect"><a href="#!">3</a></li>
        <li className="waves-effect"><a href="#!">4</a></li>
        <li className="waves-effect"><a href="#!">5</a></li> */}

      <li className="waves-effect">
        <a href="#!"><i className="material-icons">chevron_right</i></a>
      </li>
    </ul>
      
    </div>
  )
}

export default News
