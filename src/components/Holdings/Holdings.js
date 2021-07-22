import { useState, useContext, useCallback, useEffect } from 'react';
import holdingsImg from '../../images/holdings.svg';
import {ModalProvider, Modal, useModal, ModalTransition,} from 'react-simple-hook-modal';
import 'react-simple-hook-modal/dist/styles.css';
import HoldingModelContent from '../ReuseableComponents/HoldingModel';
import { LoginContext } from '../../contexts/UserContext';

export const Holdings = () => {

  const LoginObject = useContext(LoginContext);

  const UserHoldings = LoginObject.UserHoldings;
  
  let [Shares, setShares] = useState(1);

  const [CurrentSymbolDatas, setCurrentSymbolDatas] = useState({SymbolName:'', SymbolShares: ''});

  const { isModalOpen, openModal, closeModal } = useModal();

  const [disable, setDisable] = useState(true);

  let [TotalOwned, setTotalOwned] = useState(0);

  const trade = (name, shares) => {
    setCurrentSymbolDatas({SymbolName:name, SymbolShares:shares});
    openModal();
  }

  // Retrieved local storage objects
  const retrievedObject = useCallback((symbol) => {
    let curObject = localStorage.getItem(symbol);
    return (JSON.parse(curObject));
  }, []);

  // Get Total (Cash plus total stocks owned)
  const TotalCash = useCallback(() => {
    if(UserHoldings) {
      const Total = UserHoldings.reduce((acc, curr)=> {
        LoginObject.saveDataToLocalStorage([curr.symbol]); 
        if(retrievedObject(curr.symbol)) {
          const subTotal = curr.shares * retrievedObject(curr.symbol).latestPrice;
          return acc += parseFloat(subTotal);
        }
        return console.log('Data form local storage is undefined');
      }, 0);
      return setTotalOwned(Total + LoginObject.UserObject.cash);
    }
  },[UserHoldings, retrievedObject,  LoginObject]);

  useEffect (() => {
    retrievedObject();
    TotalCash();
  },[retrievedObject, TotalCash]);

    return (
      <ModalProvider>
        <div className="Holdings">
          <div className="container">
            <div className="Holdings__header">
              <img src={holdingsImg} className="svg responsive-img" alt="holdingsImg"/>
              <h4>Holdings</h4>
            </div>

            {/* Holdings table)*/}    
            <table className="highlight responsive-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Shares</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
                <tbody>
                  { UserHoldings ?
                    (UserHoldings).map((holding, index)=>(
                      <tr 
                        onClick={()=> trade(
                          holding.symbol, 
                          holding.shares
                        )} 
                        key={index}
                        >
                        <td>{holding.symbol} </td>
                        <td className="truncate companyName">{holding.company} </td>
                        <td>{holding.shares} </td>
                        {retrievedObject(holding.symbol) ? 
                        <>
                          <td> ${parseFloat(retrievedObject(holding.symbol).latestPrice).toFixed(2)}</td>
                          <td>${parseFloat(holding.shares * retrievedObject(holding.symbol).latestPrice).toFixed(2)}</td>
                        </>
                        :
                        LoginObject.saveDataToLocalStorage([holding.symbol]) 
                      }
                        
                      </tr>
                    ))
                    :
                    <tr>
                      <td>Loading ...</td>
                    </tr>
                  }
                  { UserHoldings && 
                    UserHoldings.length === 0 ?
                    <tr>
                      <td>Your have 0 Holdings...</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                     :
                    <tr>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                  }
                </tbody>
              </table>
              
              {/* User Cash)*/}      
              <table className="highlight">
                <thead>
                  <tr>
                    <th>Cash</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th className="show-on-small">&nbsp;</th>
                    <th className="hide-on-med-and-down">&nbsp;</th>
                    <th className="hide-on-med-and-down">&nbsp;</th>
                    <th className="hide-on-small-only">&nbsp;</th>
                    <th className="hide-on-small-only">&nbsp;</th>
                    <th className="hide-on-small-only">&nbsp;</th>
                    <th className="hide-on-small-only">&nbsp;</th>
                    <th className="hide-on-small-only">&nbsp;</th>
                    <th>${parseFloat(LoginObject.UserObject.cash).toFixed(2)}</th>
                  </tr>
                </thead>
              </table>

              {/* Total add up for all shares in cash)*/}  
              <table>
                <thead >
                  <tr>
                    {/* Total add ups */}
                    <th className="notShow">Cash</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th className="show-on-small">&nbsp;</th>
                    <th className="hide-on-med-and-down">&nbsp;</th>
                    <th className="hide-on-med-and-down">&nbsp;</th>
                    <th className="hide-on-small-only">&nbsp;</th>
                    <th className="hide-on-small-only">&nbsp;</th>
                    <th className="hide-on-small-only">&nbsp;</th>
                    <th className="hide-on-small-only">&nbsp;</th>
                    <th className="hide-on-small-only">&nbsp;</th>
                    <th>${parseFloat(TotalOwned).toFixed(2)}</th>
                  </tr>
                </thead>
              </table>

            {/* Trade Model */}
            <Modal
              isOpen={isModalOpen}
              transition={ModalTransition.SCALE}
            >
            <HoldingModelContent
              SymbolName={CurrentSymbolDatas.SymbolName}
              SymbolShares={CurrentSymbolDatas.SymbolShares}
              disable={disable}
              setDisable={setDisable}
              setShares={setShares}
              Shares={Shares}
              closeModal={closeModal}
            />
            </Modal>
          </div>
        </div>
      </ModalProvider>
    )
   
};
