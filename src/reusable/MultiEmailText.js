
import React, { useEffect, useState } from 'react'
import { isEmail, ReactMultiEmail } from 'react-multi-email';
import "react-multi-email/style.css";

export const MultiEmailText = ({handleEmailAdd,defalutEmail}) => {

const [emails, setEmails] = useState(defalutEmail)

useEffect(() => {
  
    setEmails(defalutEmail)
  

}, [defalutEmail])


useEffect(() => {
   

    handleEmailAdd(emails)
  
}, [emails])


  return (
    <>
<ReactMultiEmail
          placeholder=""
          emails={emails}
          
          onChange={(_emails) => { setEmails(_emails);
          }}
          validateEmail={email => {
            return isEmail(email); // return boolean
          }}
          getLabel={(
            email,
            index,
            removeEmail: (index) => void,
          ) => {
            return (
              <div data-tag key={index}>
                {email}
                <span data-tag-handle onClick={() => removeEmail(index)}>
                  ×
                </span>
              </div>
            );
          }}
        />

{/* <h4>react-multi-email value</h4>
        <p>{emails.join(', ') || 'empty'}</p> */}
    </>
  )
}
