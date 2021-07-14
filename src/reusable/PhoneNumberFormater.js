// import React from 'react'

const PhoneNumberFormater = (input) => {
    let output = "(";
    input.replace( /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/, function( match, g1, g2, g3 )
        {
          if ( g1.length ) {
            output += g1;
            if ( g1.length === 3 ) {
                output += ")";
                if ( g2.length ) {
                    output += " " + g2; 
                    if ( g2.length === 3 ) {
                        output += " - ";
                        if ( g3.length ) {
                            output += g3;
                        }
                    }
                }
             }
          }
        }       
      );        
    return output;
}

export default PhoneNumberFormater;
