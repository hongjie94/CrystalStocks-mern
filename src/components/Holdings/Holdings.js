import holdingsImg from '../../images/holdings.svg';

export const Holdings = () => {
    return (
      <div className="Holdings">
      <div className="container">
        <div class="Holdings__header card teal darken-3">
          <img src={holdingsImg} className="svg responsive-img" alt=""/>
          <span>Holdings </span>
        </div>
          <table className="highlight">
            <thead >
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Shares</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>tes Symbol</td>
                <td>tes Name</td>
                <td>tes Shares</td>
                <td>Shares Price</td>
                <td>Total $0.87</td>
              </tr>
              <tr>
              <td>tes Symbol</td>
                <td>tes Name</td>
                <td>tes Shares</td>
                <td>Shares Price</td>
                <td>Total $0.87</td>
              </tr>
              <tr>
                <td>tes Symbol</td>
                <td>tes Name</td>
                <td>tes Shares</td>
                <td>Shares Price</td>
                <td>Total $0.87</td>
              </tr>
              <tr>
                <td> <b>Cash</b> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td>Total $0.87</td>
              </tr>
              <tr>
                <td></td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td>Total $0.87</td>
              </tr>
            </tbody>
          </table>
          <div class="card teal darken-3 center" />
    
        </div>

    {/* <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
      </div> */}

      </div>
    )
};
