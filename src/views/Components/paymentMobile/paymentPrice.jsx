import React from 'react'
import { useHistory } from 'react-router-dom'

const PaymentPrice = ({ orderDetail, orderId }) => {
  const history = useHistory()

  const ProcedureDetails = () => {
    const listItems = orderDetail?.ProcedureDetails.map((x, index) => (
      <span className="font-weight-bold h5" key={index}>
        {x.description} ,
      </span>
    ))
    return (
      <>
        <div>{listItems}</div>
        {/* <ul className="pl-2 pt-2 list-unstyled">{listItems}</ul> */}
      </>
    )
  }

  const paymentLink = () => {
    history.push({
      pathname: `/payment`,
      search: `?id=${orderId}`
      // state: { detail: 'some_value' }
    })
  }

  return (
    <>
      <div className="card  box-shadow m-5 bg-gray-price">
        {/* <div className='card-header'> */}
        <div className="row ">
          <div className="col-md-4 col-sm-4 col-xs-4">
            <img src="https://clearhealthresources.s3.amazonaws.com/hospital_logo.png" width="100" />
          </div>
          <div className="col-md-8 col-sm-8  col-xs-8 h6 sms-heading-align">
            {' '}
            {orderDetail?.orderDetails?.facilityName}
            {ProcedureDetails()}
          </div>
        </div>
        <div className="col-md-12 border-bottom"></div>
        {/* </div> */}
        <div className="card-content">
          <div className="row">
            {/* <div className="col-md-12">
                        {orderDetail?.orderDetails.orderType == OrderType.ClearPackage && (
                          <div className="pt-2 pl-2 procedure-text">Procedure</div>
                        )}
                        {ProcedureDetails()}
                       
                      </div> */}

            <div className="col-md-12 mt-3">
              <div className="pay-mobile-amount m-auto p-3 box-border">
                <h5 className="font-weight-bold text-center h5-smstext">Discounted Pay Now Package Price</h5>
                <h2 className="text-amount-blue text-center"> $ {orderDetail?.orderDetails.orderTotal}</h2>
                <div className="pay-italic text-center">No Additional Bills</div>
              </div>
              {/* </div>
                      <div className="col-md-6"> */}
              <div className="pay-mobile-right bg-white p-2 m-auto">
                <h5 className="font-weight-bold text-center h5-smstext">Estimated Full Cost at Time of Procedure</h5>
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
    </>
  )
}

export default PaymentPrice
