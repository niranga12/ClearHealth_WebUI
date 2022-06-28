/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
// import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { loaderHide, loaderShow } from 'src/actions/loaderAction'
import { DateFormat, ServiceMsg } from 'src/reusable/enum'
import { getPatientOrderDetailsByOrderId } from 'src/service/paymentService'

import OnError from 'src/_helpers/onerror'
import PayBrainTree from '../Payment-BrainTree/PayBrainTree'
// import PayStripe from '../Payment-Stripe/PayStripe';
import PaymentOrder from './PaymentOrder'
import PaymentOrderSummary from './PaymentOrderSummary'

const PaymentForm = () => {
  const [orderDetail, setOrderDetails] = useState([])
  const [orderId, setOrderId] = useState(null)
  const [patient, setPatient] = useState(null)
  const location = useLocation()
  const dispatch = useDispatch()
  const [patientData, setPatientData] = useState(null)
  const [billingData, setBillingData] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [stKey, setSTKey] = useState(null)
  const [isValid, setIsvalid] = useState(false)

  const [isPayable, setIsPayable] = useState(false)
  const [errorMessage, setErrorMessage] = useState('loading ...')

  // recreating the `Stripe` object on every render.
  // const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
  // eslint-disable-next-line no-unused-vars
  const stripePromise = loadStripe(
    'pk_test_51JKBypBOELX9tyniJrgYzR3SvXJDOusxZiuQ1wV60G8eJucn7p2hK1aKK0IPcktL6tTDh7fIeZL1lXQka7rZGpcz00oPjzhYRh'
  )
  // let pubKey=String(StripPublicKey) ;
  // const stripePromise = loadStripe(pubKey);

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    // const key= params.get('key');
    setOrderId(id)

    const fetchData = async () => {
      dispatch(loaderShow())
      try {
        const result = await getPatientOrderDetailsByOrderId(id)
        if (result.data.message == ServiceMsg.OK) {
          setOrderDetails(result.data.data)
          setIsPayable(true)

          setSTKey(result.data.data?.clientSecret)
          let orderPayment = formatPaymentDetail(result.data.data?.orderPatientDetails)
          setPatient(orderPayment)
        } else if (result.data.message == ServiceMsg.OrderAlreadyProcessed) {
          setIsPayable(false)
          setErrorMessage('Order Already Processed !')
        } else if (result.data.message == ServiceMsg.InvalidOrder) {
          setIsPayable(false)
          setErrorMessage('Invalid Order !')
        }
      } catch (error) {
        OnError(error, dispatch)
        setIsPayable(false)
        setErrorMessage('Server  Error !')
      }
      dispatch(loaderHide())
    }

    fetchData()
  }, [location])

  const formatPaymentDetail = (detail) => {
    let data = {
      order: {
        // referringProvider: '',
        // accountNumber: '',
        orderId: detail.orderId,
        orderDate: moment(detail.orderDate).format(DateFormat.USFormat),

        patientName: detail.firstName + ' ' + detail.lastName,
        contactPhone: detail.phoneNumber,
        email: detail.email,
        referringProviderName: '',
        dateOfBirth: moment(detail.DOB).format(DateFormat.USFormat),

        // address1: '',
        // address2: '',
        // city: '',
        // state: '',
        // zip: '',
        billingAddress1: '',
        billingAddress2: '',
        billingCity: '',
        billingState: '',
        billingZip: ''
      }
    }
    return data
  }

  const formValid = (val) => {
    setIsvalid(val)
  }

  const formChange = (value) => {
    setPatientData(value)

    let result = {
      billing: {
        firstName: value.patientName.split(' ')[0],
        lastName: value.patientName.split(' ')[1],
        streetAddress: value.billingAddress1 + value.billingAddress2,
        locality: value.billingState,
        postalCode: value.billingZip,
        region: '',
        countryCodeAlpha2: 'US'
      },
      orderId: orderId
    }
    setBillingData(result)
  }

  const avilablePayment = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-8">
            <PaymentOrder patientOrder={patient} formChange={formChange} handleValid={formValid} />
            <div className="component-header mt-4 mb-4 ">Payment Details </div>
            {/* <Elements stripe={stripePromise}>
							<PayStripe billingDetails={billingData} stKey={stKey} isValid={isValid} orderId={patientData?.orderId} />
						</Elements> */}
            <PayBrainTree
              billingDetails={billingData}
              isValid={isValid}
              orderId={patientData?.orderId}
              orderDetail={orderDetail}
            />
          </div>
          <div className="col-md-4">
            <PaymentOrderSummary orderDetail={orderDetail} />
          </div>
        </div>
      </>
    )
  }

  const notAvilable = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-12 h4 p-3 alert-warning"> {errorMessage}</div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="container">{isPayable ? avilablePayment() : notAvilable()}</div>
    </>
  )
}

export default PaymentForm
