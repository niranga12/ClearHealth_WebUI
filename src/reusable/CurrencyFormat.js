
import PropTypes from 'prop-types';
import { CurrencyDetail } from './enum';

const CurrencyFormat = (number ,isCurrencyType=false) => {
  
    try {
        if(number){
            const currency=isCurrencyType?CurrencyDetail.USA:'';
            return currency + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
       
    } catch (error) {
        console.error(error);
        
    }
      

    
}
CurrencyFormat.propTypes = {
	number:PropTypes.number,
    isCurrencyType:PropTypes.bool

};

export default CurrencyFormat;
