import holdingsImg from '../../images/holdings.svg';

export const Holdings = () => {
    return (
      <div className="Holdings">
      <div className="container">
        <div className="Holdings__header card teal darken-3">
          <img src={holdingsImg} className="svg responsive-img" alt="holdingsImg"/>
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
                <td>tes </td>
                <td>tes </td>
                <td>tes </td>
                <td> Price</td>
                <td>$0.87</td>
              </tr>
              <tr>
              <td>tes </td>
                <td>tes </td>
                <td>tes </td>
                <td>Shares </td>
                <td>Total $0.87</td>
              </tr>
              <tr>
                <td>tes </td>
                <td>tes </td>
                <td>tes </td>
                <td>Shares </td>
                <td>Total $0.87</td>
              </tr>
            </tbody>
          </table>
          <div className="card teal darken-3 center" >
          <table className="highlight">
            <tbody>
              <tr>
                <td className="white-text"> <b>Cash</b> </td>
                <td className="notShow"> xxxxxxx</td>
                <td className="notShow"> xxxxxxx</td>
                <td className="notShow"> xxxxxxx</td>
                <td className="white-text">$ 10.87</td>
              </tr>
              <tr>
                <td></td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td className="white-text">Total $0.87</td>
              </tr>
            </tbody>
          </table>
            
              {/* <tr>
                <td> <b>Cash</b> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td>Total $0.87</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total $0.87</td>
                </tr> */}
          
          </div>
    
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
