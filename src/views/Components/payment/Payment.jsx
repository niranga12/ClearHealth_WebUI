import React from 'react'
import { TheHeader } from 'src/containers';
import NotificationLayout from 'src/_helpers/notification';
import PaymentOrder from './PaymentOrder';
import PaymentOrderSummary from './PaymentOrderSummary';

const Payment = () => {
    return (
       <>
        <div className="c-app c-default-layout">
      <NotificationLayout />
      <div className="c-wrapper">
        <TheHeader />
        
        <div className="container">
        <div className="row">
        <div className="col-md-8">
        <PaymentOrder/>
                </div>
        <div className="col-md-4">
       <PaymentOrderSummary/>
        </div>
        </div>
        </div>
      </div>
    </div></>
    )
}

export default Payment;
