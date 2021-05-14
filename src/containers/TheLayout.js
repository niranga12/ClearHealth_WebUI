import React from 'react'

import { withRouter } from 'react-router-dom'
import {
  TheContent,
  TheSidebar,
  
  TheHeader
} from './index'
import NotificationLayout from "../_helpers/notification";

const TheLayout = () => {

  return (
    <>

    <div className="c-app c-default-layout">
    <NotificationLayout />
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        {/* <TheFooter/> */}
      </div>
    </div>
    </>

  )
}

export default withRouter(TheLayout)
