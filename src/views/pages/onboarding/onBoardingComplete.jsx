import React from 'react'
import { TheHeader } from 'src/containers'
import NotificationLayout from 'src/_helpers/notification'

const onBoardingComplete = () => {
  return (
    <>
      <div className="c-app c-default-layout">
        <NotificationLayout />
        <div className="c-wrapper">
          <TheHeader />

          <div className="container">
            <div className="card  cover-content p-5 mt-3">
              <h3 className="alert-success p-3">On Boarding Success !</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default onBoardingComplete
