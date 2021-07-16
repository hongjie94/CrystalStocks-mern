import { useState, useContext } from 'react';
import { LoginContext } from '../../contexts/UserContext';
import toast from 'react-hot-toast';


const TradeModelFunctions = () => {

  const LoginObject = useContext(LoginContext);
  const Auth = LoginObject.Auth;

  // Toogle Model
  const [isOpen, setOpen] = useState(false);

  // Shares
  let [Shares, setShares] = useState(1);

  // Current symbol datas
  const [CurrentSymbolDatas, setCurrentSymbolDatas] = useState({SymbolName:'', SymbolCompany: '', SymbolPrice: ''});

  // Buy or Sell
  const [Trade, setTrade] = useState('');
  
  // Disable button
  const [disable, setDisable] = useState(true);

  // Trade button handler
  const trade = (name, company, price) => {
    if(Auth) {
      setCurrentSymbolDatas({SymbolName:name, SymbolCompany:company, SymbolPrice:price});
      setOpen(true);
    } else {
      return toast('An account is required. Please create an account or log in to continue.',
        {
          icon: '❗️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    } 
  };

  // Trade stocks
  const TradeStock = (data) => {
    if(data) {
      const shares = data.Shares;
      const symbolInofo = data.CurrentSymbolDatas;
      switch (data.Trade) {
        case 'BUY':
          LoginObject.Trade(symbolInofo, shares, 'BUY');
          break; 
        case 'SELL':
          LoginObject.Trade(symbolInofo, shares, 'SELL');
          break;
        default:
        console.erro(`${data.Trade}, Failed!`);
      }
    }
  };

  return { 
    isOpen, 
    setOpen, 
    Shares, 
    setShares, 
    CurrentSymbolDatas, 
    setCurrentSymbolDatas,
    Trade, 
    setTrade,
    disable, 
    setDisable,
    trade,
    TradeStock
  }
}

export default TradeModelFunctions
