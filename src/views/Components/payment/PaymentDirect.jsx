import React from 'react'
import { TheHeader } from 'src/containers'
import MetaTitles from 'src/views/common/metaTitles'
import NotificationLayout from 'src/_helpers/notification'
import PaymentForm from './PaymentForm'

const PaymentDirect = () => {
  return (
    <>
      {/* for addeing page metas  */}
      <MetaTitles title="Clear Health | Payments" description=" Payments  " />
      <div className="c-app c-default-layout">
        <NotificationLayout />
        <div className="c-wrapper ">
          <TheHeader />
          <PaymentForm />
        </div>
      </div>
    </>
  )
}

export default PaymentDirect
