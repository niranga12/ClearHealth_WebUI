/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { loaderHide, loaderShow } from 'src/actions/loaderAction'
import { ServiceMsg } from 'src/reusable/enum'
import { getOpenOrderById } from 'src/service/orderService'
import DateSelector from 'src/views/common/dateSelector'
import OnError from 'src/_helpers/onerror'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { notify } from 'reapop'
import { facilityPaymentVerification, providerPaymentVerification } from 'src/service/paymentService'

const PaymentVerificationValidation = ({ verifyHandle, verificationMsg = null }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  let history = useHistory()

  const [idNumber, handleIdChange] = useState(null)
  const [detail, setDetail] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const [providerId, setProviderId] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    const providerId = params.get('providerid')
    setProviderId(providerId)

    setOrderId(id)

  

    const fetchData = async () => {
      dispatch(loaderShow())
      try {
        let result = await getOpenOrderById(id)
        if (result.data.message == ServiceMsg.OK) {
          setDetail(result.data.data.orderPatientDetails)
        }
      } catch (error) {
        OnError(error, dispatch)
      }
      dispatch(loaderHide())
    }

    fetchData()
  }, [location])

  const submitAccount = () => {
    if (idNumber) {
      if (location.pathname == '/paymentverificationprovider') {
        let data = { orderId: orderId, providerPartyRoleID: providerId, providerUniqueNumber: idNumber }
        providerVerification(data)
      } else if (location.pathname == '/paymentverificationfacility') {
        let data = { orderId: orderId, providerUniqueNumber: idNumber }
        facilityVerification(data)
      } else {
      }
    }
  }

  const providerVerification = async (data) => {
    try {
      const result = await providerPaymentVerification(data)
      if (result.data.message === ServiceMsg.OK) {
        dispatch(notify(`Successfully updated`, 'success'))
        history.push('/main')
      }
    } catch (error) {
      OnError(error, dispatch)
    }
  }

  const facilityVerification = async (data) => {
    try {
      const result = await facilityPaymentVerification(data)
      if (result.data.message === ServiceMsg.OK) {
        dispatch(notify(`Successfully updated`, 'success'))
        history.push('/main')
      }
    } catch (error) {
      OnError(error, dispatch)
    }
  }

  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-3"></div>
          <div className="col-md-6 ">
            <div className="card boxshadow p-3 radius-1">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="text-center font-weight-bold">Payment Verification</h3>
                  <p className="col-md-6 m-auto text-center p-2 font-lato-bold">
                    Enter your unique patient billing ID to verify the procedure and the payment
                  </p>
                </div>
                <div className="col-md-12">
                  <div className="text-center pt-4 pb-2  ">Patient Name</div>

                  <div className="text-center font-weight-bold h5 mb-2">
                    {detail && detail?.firstName} {detail && detail?.lastName}{' '}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="text-center pt-4 pb-2  ">Date Of Birth</div>
                  <div className="text-center font-weight-bold h5 mb-2">{detail && detail?.DOB} </div>
                </div>

                <div className="col-md-12">
                  <div className="text-center pt-4 pb-2  ">Hospital</div>
                  <div className="text-center font-weight-bold h5 mb-2">{detail && detail?.facilityName} </div>
                </div>

                <div className="col-md-12">
                  <div className="text-center pt-4 pb-2  ">Procedure</div>
                  <div className="text-center font-weight-bold h5 mb-2">{detail && detail?.description} </div>
                </div>

                <div className="col-md-6  offset-md-3  text-center">
                  <input
                    type="text"
                    className="form-control-sm "
                    onChange={handleIdChange}
                    placeholder="Enter Id Here"
                  />
                  {/* <DateSelector className={'form-control-sm calendar-font '} selectedDate={idNumber} handleDateChange={handleIdChange} disableFuture={true} /> */}
                  {/* <p className="text-danger text-left mt-4">{verificationMsg && verificationMsg}</p> */}

                  <button className="btn btn-primary  btn-lg  mt-3 mb-2" onClick={submitAccount}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

PaymentVerificationValidation.propTypes = {
  verifyHandle: PropTypes.func,
  verificationMsg: PropTypes.string
}

export default PaymentVerificationValidation
