
      <ul className="collection with-header">
          <li className="collection-header"><h4>Favorites</h4></li>

          <li className="collection-item avatar">
            <i className="material-icons circle teal">arrow_upward</i>
            <span className="title">Title</span>
            <p>First Line <br/>
                Second Line
            </p>
            <a href="/#" className="secondary-content"><i className="material-icons accent-4 amber-text">star</i></a>
          </li> 
          { LoginObject.UserObject &&
            LoginObject.UserObject.watchlist.map((symbol, index)=>(
              
            <li 
              className="collection-item avatar" 
              key={index} 
              >
              <i className="material-icons circle pink accent-3">arrow_downward</i>
                <div className="content"> 
                <div className="content__left">
                  <span className="title pink-text accent-3"><b>{SymbolData.symbol}</b> </span>
                  <p>{symbol} </p>
                </div>

                <div className="content__center">
                  <p>${symbol}</p>
                </div>

                <div className="content__right">
                  <p className="title pink-text accent-3">{symbol} {symbol}</p>
                </div>
              </div>
              

              <a href="#!" className="secondary-content">
                <i className="material-icons accent-4 amber-text" onClick={()=> removeWatchlist(symbol)}>star</i>
              </a>
            </li>
            ))
          }
          <li className="collection-item avatar">
          <i className="material-icons circle pink accent-3">arrow_downward</i>
          <div className="content">
            <div className="content__left">
              <span className="title pink-text accent-3"><b>AAPL</b> </span>
              <p>First Line </p>
            </div>
            <div className="content__center">
              dsadsa
            </div>
            <div className="content__right">
              dsadsafzxc
            </div>
            
          </div>
            <a href="/#" className="secondary-content"><i className="material-icons accent-4 amber-text">star</i></a>
          </li>
        </ul>

