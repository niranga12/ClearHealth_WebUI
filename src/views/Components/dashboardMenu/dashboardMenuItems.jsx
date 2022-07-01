import { CCol, CRow } from '@coreui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { ScreenPermissions } from 'src/reusable/enum'
import PermissionMenu from 'src/reusable/PermissionMenu'
import CardWidget from 'src/views/common/cardWidget'

const DashboardMenuItems = () => {
  let permissionList = useSelector((state) => state.Permission.UiPermissions)

  return (
    <div className="container">
      <CRow className="p-3">
        <CCol
          xs="12"
          sm="6"
          lg="3"
          className={PermissionMenu(ScreenPermissions.Hospital, permissionList) ? '' : 'hide'}
        >
          <CardWidget title="Hospitals" logoName="logoHospital" url="/hospitals" />
        </CCol>

        <CCol sm="6" md="3" className={PermissionMenu(ScreenPermissions.HealthSystem, permissionList) ? '' : 'hide'}>
          <CardWidget title="Health Systems" url="/healthsystem" logoName="logoHealthSystem" />
        </CCol>

        {/* <CCol sm="6" md="3" className={PermissionMenu(ScreenPermissions.Providers,permissionList)?'':'hide'}>
            <CardWidget  title="Providers"  url="/providers" logoName="logoProviders"/>
          </CCol> */}

        {/*           
          <CCol sm="6" md="3" className={PermissionMenu(ScreenPermissions.PricingTool,permissionList)?'':'hide'}>
            <CardWidget  title="Pricing Tool" url="/pricing"   logoName="pricingTool"/>
          </CCol> */}

        <CCol sm="6" md="3" className={PermissionMenu(ScreenPermissions.Orders, permissionList) ? '' : 'hide'}>
          <CardWidget title="Orders" logoName="logoOrders" />
        </CCol>

        <CCol sm="6" md="3" className={PermissionMenu(ScreenPermissions.Patients, permissionList) ? '' : 'hide'}>
          <CardWidget title="Patients" logoName="logoPatients" url="/patients" />
        </CCol>

        <CCol sm="6" md="3" className={PermissionMenu(ScreenPermissions.Accounting, permissionList) ? '' : 'hide'}>
          <CardWidget title="Accounting" logoName="logoAccounting" />
        </CCol>

        {/* <CCol sm="6" md="3" className={PermissionMenu(ScreenPermissions.Profile,permissionList)?'':'hide'}>
            <CardWidget  title="profile" logoName="Profile"/>
          </CCol> */}
      </CRow>
    </div>
  )
}

export default DashboardMenuItems
