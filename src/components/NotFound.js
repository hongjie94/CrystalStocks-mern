import React from 'react';
import { Link } from 'react-router-dom';
import notfoundImg from '../images/PageNotFound.svg';

export  const NotFound = () => {
  return (
    <div className="not-found container">
      <div className="row">
        <div className="col s12">
          <img  className="responsive-img" src={notfoundImg} alt="404 not found"/>
        </div>
        <div className="col s12 text">
          <div className="not-found__text">
            <h2>Sorry</h2>
            <p>That page cannot be found...</p>
            <Link to="/">Back to Home page...</Link> 
          </div>
        </div>
      </div>
    </div>
   
  )
}

