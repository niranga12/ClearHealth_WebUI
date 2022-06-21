// import React from 'react'

//  input (011) 566 2232 out put 0115662232

const NormalizePhone = (phone) => {
 // for int  use  parseInt(phone.replace(/[^0-9]+/g, '')) 
 try {
     if(phone){
        return phone.replace(/[^0-9]+/g, '');
     }
    
    	
 } catch (error) {
     console.error(error)
 }
   
}

export default NormalizePhone;
