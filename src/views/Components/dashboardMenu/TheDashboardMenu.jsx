import React from 'react'
import MetaTitles from 'src/views/common/metaTitles'
import NotificationLayout from 'src/_helpers/notification'
import { TheHeader } from '../../../containers'
import DashboardMenuItems from './dashboardMenuItems'

const TheDashboardMenu = () => {
  return (
    <div className="c-app c-default-layout">
      {/* for addeing page metas  */}
      <MetaTitles title="Clear Health | Menu Dashboard" description=" Menu Items  " />
      <NotificationLayout />
      <div className="c-wrapper">
        <TheHeader />
        {/* <div className="c-body"> */}
        <div>
          <DashboardMenuItems />
        </div>
      </div>
    </div>
  )
}

export default TheDashboardMenu
