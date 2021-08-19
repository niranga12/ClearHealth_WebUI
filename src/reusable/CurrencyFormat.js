
import PropTypes from 'prop-types';
import { CurrencyDetail } from './enum';

const CurrencyFormat = (number ,isCurrencyType=false,doublePoint=2) => {
  
    try {
        if(number){
            const currency=isCurrencyType?CurrencyDetail.USA:'';
            return currency + number.toFixed(doublePoint).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
       
    } catch (error) {
        console.error(error);
        
    }
      

    
}
CurrencyFormat.propTypes = {
	number:PropTypes.number,
    isCurrencyType:PropTypes.bool,
    doublePoint:PropTypes.number

};

export default CurrencyFormat;
