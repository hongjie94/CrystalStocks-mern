import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components//Navbar/Navbar';
import { Markets } from './components/Markets/Markets';
import { Trading } from './components/Trading/Trading';
import { Holdings } from './components/Holdings/Holdings';
import { Favorites } from './components/Favorites/Favorites';
import { History } from './components/History/History';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Footer } from './components/Footer/Footer';
import { LoginContext } from './UserContext';

function App() {

  const UserObject = useContext(LoginContext);

  return (
    <Router>
      <div className="App">
        <Navbar UserObject={UserObject}/>
        <Switch>
          <div className="switchs">
            <Route exact path="/" component={Markets} />
            <Route path="/trading" component={Trading} />
            <Route path="/holdings" component={Holdings} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/history" component={History} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>
        </Switch>  
        <Footer UserObject={UserObject}/>
      </div>
    </Router>
  );
}

export default App;
