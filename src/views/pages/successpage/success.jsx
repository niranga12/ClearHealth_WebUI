import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { TheHeader } from 'src/containers'
import NotificationLayout from 'src/_helpers/notification'

const successCompletePage = () => {
  return (
    <>
      <div className="c-app c-default-layout">
        <NotificationLayout />
        <div className="c-wrapper">
          <TheHeader />

          <div className=" row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
            <div className="card  cover-content p-5 mt-3">
            <div className="row m-2 pt-1">
            <FontAwesomeIcon icon={faCheckCircle} className="fa-6x m-auto check-circle" />
          </div>

          <div className="text-center pb-2 font-weight-bold">
            <h3>Successfully Completed</h3>
          </div>
          <div className="text-center">
          Thank you for entering the patient account number, there is no further action required at this point.{' '}
          </div>

         
          
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default successCompletePage
