// import React from 'react'
import NormalizePhone from './NormalizePhone';

const PhoneNumberMaskValidation = (value) => {
    try {
        const num=	NormalizePhone(value);
        return  num.length===10?true:false;
    } catch (error) {
        console.error(error)
        
    }
        
        
        
}

export default PhoneNumberMaskValidation
