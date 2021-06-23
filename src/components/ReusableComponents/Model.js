import {useEffect} from 'react';
import M from 'materialize-css';

const Model = ({ProfileUrl, getProfileUrl, modelHeader}) => {  

   // Init Modal Materialize JS
   useEffect (() => {
    let Modal = document.querySelectorAll('.modal');
    M.Modal.init(Modal);
  });
  
  return (
    <>
     {/* Modal Structure */}
      <div id="showModal" className="modal">
        <div className="modal-content">
          <h5 className="center black-text">{modelHeader}</h5>
          <div className="input-field">
            <input 
              type="url"
              id="image_url"
              className="validate urlInput"
              ref={ProfileUrl}
            />
            <label className="url_label" htmlFor="image_url">Image URL</label>
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
