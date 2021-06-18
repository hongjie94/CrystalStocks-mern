import M from 'materialize-css';
import {useEffect } from 'react';
import MarketsHeaderImg from '../../../images/markets.svg'

const Markets = () => {

  const CollapsibleElements = [ 
    // Index 0 = Most_Actives
    {
      category: "Most Actives",
      icon: "insert_chart",
      quoteNum: 4,
      quotes: []
    }, 
    // Index 1
    {
      category: "Top Gainers",
      icon: "timeline",
      quoteNum: 4,
      quotes: []
    }, 
      // Index 2
    {
      category: "Gainers",
      icon: "trending_up",
      quoteNum: 4,
      quotes: []
    }, 
    // Index 3
    {
      category: "Losers",
      icon: "trending_down",
      quoteNum: 4,
      quotes: []
    }
  ];

 useEffect(() => {
  M.AutoInit();
 });
 
  return (
    <div className="Markets">
      <div className="Browse__header card center">
      <span className="flowing-text">Markets</span>
        <img src={MarketsHeaderImg} className="responsive-img" alt="img not found"/>
      
      </div>
      <ul class="collapsible">
      {
      CollapsibleElements.map((Element, index) => (
        <li key={index}>
          <div class="collapsible-header">
            <i class="material-icons">{Element.icon}</i>
          {Element.category}
            <span class="new badge" data-badge-caption="Quotes">{Element.quoteNum}</span>
          </div>
          <div class="collapsible-body white"><p>Lorem ipsum dolor sit amet.</p></div>
        </li>
      ))
      }
      </ul>
    </div>
  )
}

export default Markets
