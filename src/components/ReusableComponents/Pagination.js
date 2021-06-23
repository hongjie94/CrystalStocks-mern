import  { useEffect, useState } from 'react';

const Pagination = ({TotalNumData, setPageStart, setPageEnd, itemsPerPage, parent}) => {
  
  // userState
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PrePageBtn, setPrePageBtn] = useState('disabled');
  const [NextPageBtn, setNextPageBtn] = useState('waves-effect');

  // Total pages for pagination
  let totalPageNum = Math.ceil(TotalNumData / itemsPerPage);

  // Update Start / End 
  useEffect (() => {
    setPageStart((CurrentPage - 1 ) * itemsPerPage);

    if(CurrentPage * itemsPerPage < TotalNumData) {
      setPageEnd((CurrentPage * itemsPerPage));
    } else{
      setPageEnd(TotalNumData);
    }
  }, [CurrentPage, itemsPerPage, TotalNumData, setPageEnd, setPageStart]); 

  // Create an array for maping pagination
  let pageNumArr = [];
  for( let i = 1; i <= totalPageNum; i++ ) {
    pageNumArr.push(i);
  }

  // Update page
  const updatePage = (e, page) => {
    page === 1 ? setPrePageBtn('disabled'): setPrePageBtn('waves-effect');
    page === totalPageNum ? setNextPageBtn('disabled') : setNextPageBtn('waves-effect'); 

    if (e) {
      ClassNameActive(page);
      setCurrentPage(page); 
    } else {
      return setCurrentPage(page);
    }
  };

  //  Next Page Button
  const NextPageBtnClicked = ((e, page) => {
    if(page < totalPageNum) {
      setCurrentPage(page + 1); 
      ClassNameActive((page + 1));
    } if (page === 1) {
      setPrePageBtn('waves-effect');
    }if (page >= (totalPageNum - 1)) {
      e.preventDefault();
      setNextPageBtn('disabled');
    } 
  });

  //  Pre Page Button
  const PrePageBtnClicked = ((e, page) => {
    if( page > 1) {
      setCurrentPage(page - 1); 
      ClassNameActive((page - 1));
      setPrePageBtn('waves-effect');
    } if (page === totalPageNum) {
      setNextPageBtn('waves-effect');
    } if (page === 2) { 
      e.preventDefault();
      setPrePageBtn('disabled');
    }
  });

  //  Toggle active class
  const ClassNameActive = ((page) => {
    pageNumArr.forEach(page => {
      document.getElementsByClassName(`${parent}_page${page}`)[0].className = `waves-effect ${parent}_page${page}`;
    });
    document.getElementsByClassName(`${parent}_page${page}`)[0].className +=' active teal darken-3';
  });


  return (
    <>
      <ul className="pagination" >
        <li className={PrePageBtn} onClick={(e) => PrePageBtnClicked(e, CurrentPage)} >
          <a href={`#${parent}`} ><i className="material-icons">chevron_left</i></a>
        </li>
        <div className="pageNum">
          { pageNumArr.map((page ,index) => (
          <div className="pageNum__wrap" key={index}>
            { 
              page === 1 ? 
              <li className={`waves-effect ${parent}_page1 active teal darken-3`}>
                <a href={`#${parent}`} onClick={(e) => updatePage(e, page)}>{page}</a>
              </li>
                :
              <li className={`waves-effect ${parent}_page${index + 1}`}>
                <a href={`#${parent}`} onClick={(e) => updatePage(e, page)}>{page}</a>
              </li>
            }
          </div>
          ))
          }
        </div>  
      <li className={NextPageBtn} onClick={(e)=> NextPageBtnClicked(e, CurrentPage)}>
        <a href ={`#${parent}`} ><i className="material-icons">chevron_right</i></a>
      </li>
    </ul>
    </>
  )
}

export default Pagination
