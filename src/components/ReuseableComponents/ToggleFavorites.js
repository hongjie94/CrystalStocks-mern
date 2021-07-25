import {useContext} from 'react';
import { LoginContext } from '../../contexts/UserContext';
import UpdateWatchlist from './UpdateWatchlist';
import AnimationVariants from '../AnimationVariants';
import { motion } from 'framer-motion';

const ToggleFavorites = ({symbol}) => {

  const LoginObject = useContext(LoginContext);
  const Auth = LoginObject.Auth;

  // Add and Remove symbols from Watchlist
  const {addWatchlist, removeWatchlist} = UpdateWatchlist(LoginObject);

  // Animation Variants 
  const { StarIconVariant } = AnimationVariants();

  return (
    <span>
      {Auth && (LoginObject.UserObject.watchlist).includes(symbol) ?
      <a href="#!">
        <motion.i
          variants={StarIconVariant}
          whileHover='OnHover'
          whileTap={{ rotate: -180 }} 
          className="small material-icons accent-4 amber-text" 
          onClick={()=> {removeWatchlist(symbol)}}>
          star
        </motion.i>
      </a>
      :
      <a href="#!">
        <motion.i 
          variants={StarIconVariant}
          whileHover='OnHover'
          whileTap={{ rotate: 180 }}
          className="small material-icons black-text" 
          onClick={()=> addWatchlist(symbol)}>
          star_border
        </motion.i>
      </a>
      }
    </span>
  )
}

export default ToggleFavorites
