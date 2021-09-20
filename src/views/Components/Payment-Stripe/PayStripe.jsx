import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'

import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { notify } from 'reapop';



const CARD_OPTIONS = {
  hidePostalCode: true,
  iconStyle: "solid",
  border:"red",
  style: {
    base: {
      width:"100px",
      iconColor: "#7A7E83",
      color: "#7A7E83",
      fontWeight: 500,
      fontFamily: "Lato ,Open Sans, Segoe UI, sans-serif",
      fontSize: "20px",
      border: " gray",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#black"
      },
      "::placeholder": {
        color: "#7A7E83"
      }
    },
    invalid: {
      iconColor: "red",
      color: "red"
    }
  }
};

const PayStripe = ({billingDetails,stKey,isValid}) => {
  
  const [billDet, setBillDet] = useState(null);
  const [stripeKeySes, setStripeKeySes] = useState(null)
  const [validDetail, setIsvalidDetail] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

useEffect(() => {
  setBillDet(billingDetails?.order);
  setStripeKeySes(stKey);
  setIsvalidDetail(isValid);

}, [billingDetails,stKey,isValid])





    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement);
  
      // Use your card Element with other Stripe.js APIs
      // const {error, paymentMethod} = await stripe.createPaymentMethod({
      //   type: 'card',
      //   card: cardElement,
      //   billing_details: billingDetails

      // });
      // const result = await stripe.confirmCardPayment('pi_3JbTJsBOELX9tyni04ZI8oOZ_secret_WT1Iou4419shrypuGR6OqIO2C',{
        const result = await stripe.confirmCardPayment(stripeKeySes,{
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: billingDetails
        }

      });


      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
        dispatch(notify(result.error.message, 'error'));
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          dispatch(notify('Paid successfully', 'success'));
          history.push('/main')
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
      
  
      // if (error) {
      //   console.log('[error]', error);
      // } else {
      //   console.log('[PaymentMethod]', paymentMethod);
      // }
    };
  
    return (
      // <Elements stripe={stripePromise}>
      <div className='card  cover-content p-3 pt-5 '>
    
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-7 mb-4">

          <div className="FormRow form-group">
      <CardElement  options={CARD_OPTIONS}  />
      </div>
          </div>
        </div>
     
        
      
        <button type="submit" className="btn btn-primary" disabled={!stripe || !validDetail}>
          Pay Now
        </button>
      </form>
    
      </div>
      // </Elements>
    );
}



PayStripe.propTypes = {

	billingDetails: PropTypes.any,
	stKey: PropTypes.any,
  isValid:PropTypes.any
};

export default PayStripe



