import {useContext, useState} from 'react';
import HistoryImg from '../../images/history.svg';
import { LoginContext } from '../../contexts/UserContext';
import Pagination from '../../components/ReuseableComponents/Pagination';
export const History = () => {
  // Get current user objects
  const LoginObject = useContext(LoginContext);
  const Histories = LoginObject.StockHistories;

  // Page Start/ End
  const [PageStart, setPageStart] = useState(0);
  const [PageEnd, setPageEnd] = useState(5);

    return (
      <div className="History" id="History">
        <div className="container">
          <div className="Holdings__header">
            <img src={HistoryImg} className="svg responsive-img" alt=""/>
            <h4>History</h4>
         
          </div>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Shares</th>
                <th>Price</th>
                <th>Total</th>
                <th>Transacted</th>
              </tr>
            </thead>
            <tbody>
              {
                Histories ? 
                ((Histories).slice(PageStart, PageEnd)).map((history, index)=>(
                  <tr key={index}>
                    <td>{history.symbol}</td>
                    <td>{history.shares}</td>
                    <td>${history.price}</td>
                    <td>{parseFloat((history.price * history.shares)).toFixed(2)}</td>
                    <td>
                      {history.time}
                    </td>
                  </tr>
                ))
                :
                <tr>
                  <td>Loading...</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              }
              { Histories &&
                Histories.length === 0 ?
                <tr>
                  <td>Your Transactions History Is Empty...</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                :
                <tr>
                </tr>
              }

              
               
            </tbody>
          </table>
          <div className="History__pagination white">   
            {/* Pagination */}
            <Pagination
              parent={'History'}
              TotalNumData ={Histories.length}
              setPageStart={setPageStart}
              setPageEnd = {setPageEnd}
              itemsPerPage = {10} 
            />     
          </div>
        </div>
      </div>
      
    )
};
