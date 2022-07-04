/* eslint-disable eqeqeq */
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { TheHeader } from 'src/containers'
import { OrderVerificationType, ServiceMsg } from 'src/reusable/enum'
import { validateOrderDob } from 'src/service/orderService'
import MetaTitles from 'src/views/common/metaTitles'
import NotificationLayout from 'src/_helpers/notification'
import OnError from 'src/_helpers/onerror'
import PaymentForm from './PaymentForm'
import PaymentValidation from './PaymentValidation'

const Payment = () => {
  const [isValidDob, setIsValidDob] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [verifyMsg, setVerifyMsg] = useState(null)
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    setOrderId(id)
  }, [location])

  const verifyHandle = async (value) => {
    try {
      const params = new URLSearchParams(location.search)
      const providerId = params.get('providerid') ?? 0

      let verificationType
      if (location.pathname == '/paymentverificationprovider') {
        verificationType = OrderVerificationType.ProviderOrderVerification
      } else if (location.pathname == '/paymentverificationfacility') {
        verificationType = OrderVerificationType.FacilityOrderVerification
      } else {
        verificationType = OrderVerificationType.PatientOrderPaymentVerification
      }

      let detail = {
        dateOfBirth: moment(value).format('MM-DD-YYYY'),
        verificationType: verificationType,
        providerPartyRoleID: providerId
      }
      let result = await validateOrderDob(orderId, detail)
      if (result.data.message == ServiceMsg.OK) {
        setIsValidDob(result.data.data.isValidBirthday)
        if (!result.data.data.isValidBirthday) {
          setVerifyMsg('Verification Failed')
        }
      }
    } catch (error) {
      OnError(error, dispatch)
    }
  }

  return (
    <>
      {/* for addeing page metas  */}
      <MetaTitles title="Clear Health | Payments" description=" Payments  " />
      <div className="c-app c-default-layout">
        <NotificationLayout />
        <div className="c-wrapper ">
          <TheHeader />
          {isValidDob ? <PaymentForm /> : <PaymentValidation verifyHandle={verifyHandle} verificationMsg={verifyMsg} />}
        </div>
      </div>
    </>
  )
}

export default Payment
