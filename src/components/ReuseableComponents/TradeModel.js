import {useState, useEffect } from 'react';
import {useDialog } from 'react-st-modal';

const TradeModel = ({CurrentSymbolDatas, Shares, setShares, disable, setDisable, Trade}) => {

  // Model dialog
  const dialog = useDialog();

  // Button color
  const [BtnStyle, setBtnStyle] = useState('');

  useEffect (() => {
    Trade === 'SELL' ?
      setBtnStyle('btn waves-effect waves-light white-text pink accent-3')
      :
      setBtnStyle('btn waves-effect waves-light');
  },[Trade]);

  return (
    <div className="TradeModelContetnt">
      {/* Symbol Name and Price */}
      <div className="center">
        <h5>{CurrentSymbolDatas.SymbolName}</h5> 
        <p className="price">${parseFloat(CurrentSymbolDatas.SymbolPrice).toFixed(2)}</p>

        {/* Subtract Shares */}
        <div className="sharesBtn">  
          <button 
            disabled={disable}
            className="btn" 
            onClick={()=> { 
              setShares(Shares -= 1); 
              Shares === 1 ? setDisable(true): setDisable(false) 
            }}><i className="material-icons">remove</i>
          </button> 

          <p className='btn white black-text'>{Shares} </p>
            
          {/* Add Shares */}  
          <button 
            className="btn" 
            onClick={()=> { 
              setShares(Shares += 1);
              Shares > 1 ? setDisable(false): setDisable(true)  
            }}><i className="material-icons">add</i>  
          </button>
        </div>
      </div>

      {/* Submit button */}        
      <div className="TradeSubmitBtn">
        <button
          className={BtnStyle}
          onClick={() => {
            // Сlose the dialog and return the value
            dialog.close({Shares, CurrentSymbolDatas, Trade});
            setDisable(true);
            setShares(1);
          }}
        >Summit
        </button>
      </div>
    </div>
  )
}

export default TradeModel
