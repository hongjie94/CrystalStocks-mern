import {useEffect} from 'react';
import M from 'materialize-css';
import News from './Tabs/News';
import Markets from './Tabs/Markets';
import Search from './Tabs/Search';


export const Browse = () => {
  
    // Initialize all of the Materialize Components
    useEffect(() => {
        M.AutoInit();
      }, []);

    return (
    <div className="Browse">
       <div className="container">
          <div className="row">
            <div className="col s12">
              <ul className="tabs teal darken-3" >
                <li className="tab col s4"><a className="active white-text" href="#markets">Markets</a></li>
                <li className="tab col s4"><a className="white-text teal darken-3" href="#new">News</a></li>
                <li className="tab col s4"><a className="white-text" href="#search">Search</a></li>
              </ul>
            </div>
            <div id="markets" className="col s12">
              <Markets/>
            </div>
            <div id="new" className="col s12">
              <News />
            </div>
            <div id="search" className="col s12">
              <Search/>
            </div>
          </div>
        </div>
     </div>
    )
};

