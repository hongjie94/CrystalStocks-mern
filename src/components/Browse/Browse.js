import React, {useEffect} from "react";
import News from './Tabs/News';
import Markets from './Tabs/Markets';
import Search from './Tabs/Search';
import M from 'materialize-css';


export const Browse = () => {
  
  useEffect(() => {

    // Init Tabs Materialize JS
    let tabs = document.querySelectorAll(".tabs");
    M.Tabs.init(tabs);

    // Init Select Materialize JS
    let select = document.querySelectorAll('select');
    M.FormSelect.init(select);

  }, []);

  return (
    <div className="Browse">
        <div className="container">  
          <div className="row">

            {/* Tabs */}
            <div className="col s12">
              <ul className="teal darken-3 tabs">
                <li className="tab col s4"><a className="white-text active" href="#markets">Markets</a></li>
                <li className="tab col s4"><a className="white-text" href="#news">News</a></li>
                <li className="tab col s4"><a className="white-text" href="#search">Search</a></li>
              </ul>
            </div>

            {/* Markets */}
            <section id="markets" className="col s12">
              <Markets />
            </section>

            {/* News */}
            <section id="news" className="col s12">
              <News/>
            </section>

            {/* Search */}
            <section id="search" className="col s12">
              <Search/>
            </section>
          </div>
        </div>
      </div>
    )
};

