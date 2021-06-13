import React from 'react'
import HistoryImg from '../../images/history.svg';
export const History = () => {
    return (
        <div>
            <div className="container">
        <div class="Holdings__header card teal darken-3 center">
          <img src={HistoryImg} className="svg responsive-img" alt=""/>
          <span className="center">History </span>
        </div>
          <table className="highlight">
            <thead >
              <tr>
                <th>Symbol</th>
                <th>Shares</th>
                <th>Price</th>
                <th>Transacted</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>tes Symbol</td>
                <td>tes Name</td>
                <td>tes Shares</td>
                <td>Shares Price</td>
              </tr>
              <tr>
              <td>tes Symbol</td>
                <td>tes Name</td>
                <td>tes Shares</td>
                <td>Shares Price</td>
              </tr>
              <tr>
                <td>tes Symbol</td>
                <td>tes Name</td>
                <td>tes Shares</td>
                <td>Shares Price</td>
              </tr>
            </tbody>
          </table>
          <div class="card teal darken-3 center" />
        </div>
        </div>
    )
};
