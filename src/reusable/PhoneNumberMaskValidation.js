// import React from 'react'
import NormalizePhone from './NormalizePhone';

const PhoneNumberMaskValidation = (value) => {
    try {
        const num=	NormalizePhone(value);
        if(num){
            return  num.length===10?true:false;
        }
        else{
            return true;
        }
        
    } catch (error) {
        console.error(error)
        
    }
        
        
        
}

export default PhoneNumberMaskValidation
