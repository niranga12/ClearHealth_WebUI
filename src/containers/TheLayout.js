import React from 'react'

import { withRouter } from 'react-router-dom'
import { TheContent, TheHeader, TheSideNavigation } from './index'
import NotificationLayout from '../_helpers/notification'
import TheLoader from './TheLoader'
import { useSelector } from 'react-redux'

const TheLayout = () => {
  let isLoaderActive = useSelector((state) => state.Loader.isLoader)
  return (
    <>
      <div className={`c-app c-default-layout overflow-home' ${isLoaderActive ? 'overflow-home' : ''} `}>
        <NotificationLayout />
        {/* <TheSidebar/> */}
        <div className="c-wrapper">
          <TheLoader />

          <TheHeader />
          <TheSideNavigation />

          <div className="c-body CNavi-left">
            <TheContent />
          </div>
          {/* <TheFooter/> */}
        </div>
      </div>
    </>
  )
}

export default withRouter(TheLayout)
