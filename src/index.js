import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context from './contexts/UserContext';
import './styles/sass/index.scss';
import 'materialize-css/dist/css/materialize.min.css'

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
);
