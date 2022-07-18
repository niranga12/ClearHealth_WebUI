/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { loaderHide, loaderShow } from 'src/actions/loaderAction'
import { TheHeader } from 'src/containers'
import { OrderType, ServiceMsg } from 'src/reusable/enum'
import { getSMSOrderDetails } from 'src/service/orderService'
import OnError from 'src/_helpers/onerror'
import PaymentContent from './PaymentContent'

const PaymentMobileLink = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  const [orderDetail, setOrderDetail] = useState(null)
  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    setOrderId(id)

    const fetchData = async () => {
      dispatch(loaderShow())
      try {
        const result = await getSMSOrderDetails(id)
        if (result.data.message == ServiceMsg.OK) {
          setOrderDetail(result.data.data)
        }
      } catch (error) {
        OnError(error, dispatch)
      }
      dispatch(loaderHide())
    }

    fetchData()
  }, [location])

  // const ProcedureDetails = () => {
  //   const listItems = orderDetail?.ProcedureDetails.map((x, index) => (
  //     <span className="font-weight-bold h5" key={index}>
  //       {x.description} ,
  //     </span>
  //   ))
  //   return (
  //     <>
  //     <div>
  //     {listItems}
  //     </div>
  //       {/* <ul className="pl-2 pt-2 list-unstyled">{listItems}</ul> */}
  //     </>
  //   )
  // }

  // const paymentLink = () => {
  //   history.push({
  //     pathname: `/payment`,
  //     search: `?id=${orderId}`
  //     // state: { detail: 'some_value' }
  //   })
  // }

  return (
    <>
      <div className="c-app c-default-layout">
        <div className="c-wrapper bg-white">
          <TheHeader />
          <div className="container">
            <div className="row mt-2 pt-3 ">
             
              <div className="col-md-6  offset-md-3 border-cover pt-2">
              <img
                  src="https://clearhealthresources.s3.amazonaws.com/clearhealthLogo.png"
                  alt="Logo"
                  title="Logo"
                  width="150"
                  className="m-auto display-block mb-3"
                />
                <h4>Dear {orderDetail?.orderDetails.firstName}</h4>
                <PaymentContent details={orderDetail} orderId={orderId} />

                <div>Thank you</div>
                <h6 className="font-weight-bold">Customer Support Team </h6>
              </div>

              {/* <div className="col-md-6 offset-md-3">
                <div className="card  box-shadow m-5 bg-gray-price" >
                 
                  <div className="row ">
                    <div className="col-md-4 col-sm-4 col-xs-4">
                      <img src="https://clearhealthresources.s3.amazonaws.com/hospital_logo.png" width="100" />
                    </div>
                    <div className="col-md-8 col-sm-8  col-xs-8 h6 sms-heading-align"> {orderDetail?.orderDetails.facilityName}
                    {ProcedureDetails()}
                    </div>
                  </div>
                  <div className="col-md-12 border-bottom"></div>
                 
                  <div className="card-content">
                    <div className="row">
                     

                      <div className="col-md-12 mt-3">
                        <div className="pay-mobile-amount m-auto p-2 box-border">
                          <h5 className="font-weight-bold text-center">Discounted  Pay Now Package Price</h5>
                          <h2 className="text-amount-blue text-center"> $ {orderDetail?.orderDetails.orderTotal}</h2>
                          <div className="pay-italic text-center">No Additional Bills</div>
                        </div>
                      
                        <div className="pay-mobile-right bg-white m-auto">
                          <h5 className="font-weight-bold text-center">Estimated  Full Cost at Time of Procedure</h5>
                          <h2 className="text-amount-blue text-center">$ {orderDetail?.orderDetails.total}</h2>
                          <div className="pay-italic text-center">
                            Facility price only, you may receive separate bills for provider(s){' '}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 p-3 text-center button-width">
                        <button className="btn btn-primary btn-lg col-md-11 " onClick={paymentLink}>
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="col-md-6  offset-md-3 border-cover bg-gray-price pt-2 mb-2 ">
                <div className="sms-text-footer">
                  {' '}
                  Clear Health, Inc. <a href="">(clearhealthinc.com)</a>{' '}
                </div>
                <div className="sms-text-footer"> 7601 Highway 70 S. Suite #277 Nashville, TN 37221</div>
                <div className="sms-text-footer"> 888-918-2522 | Email: info@clearhealthinc.com</div>
                <div className="sms-text-footer"> Copyright © Clear Health Inc.</div>
                <div className="sms-text-footer"> All rights reserved.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentMobileLink
