import M from 'materialize-css';
import {useEffect } from 'react';

const Model = ({ProfileUrl, getProfileUrl}) => {  

  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <div id="showModal" className="modal">
        <div className="modal-content">
          <h5>Custom Profile Photo</h5>
          <div className="input-field">
          <input 
            type="url"
            id="image_url"
            className="validate"
            ref={ProfileUrl}
          />
           <label htmlFor="image_url">Image URLW</label>
           </div>
        </div>
        <div className="modal-footer">
          <button 
            onClick={getProfileUrl} 
            className="modal-close iconSubmit waves-effect waves-light btn"
            >Summit
          </button>
          <a href="#!" className="modal-close waves-effect waves-light btn">Close</a>
        </div>
      </div>
    </>
  )
}

export default Model
