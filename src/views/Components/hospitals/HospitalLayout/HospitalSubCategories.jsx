import React, { useEffect, useState } from 'react'
import { CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import HospitalProvider from '../HospitalChildComponents/HospitalProvider/HospitalProvider'
import HospitalOrderTable from '../HospitalChildComponents/HospitalOrder/HospitalOrderTable'
import HospitalDashboard from '../HospitalChildComponents/HospitalDashboard/HospitalDashboard'
import PricingToolGrid from '../../pricingTool/PricingToolGrid'
import { ButtonPermissions, HospitalTabList, ScreenPermissions } from 'src/reusable/enum'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PermissionButton from 'src/reusable/PermissionButton'

const HospitalSubCategories = () => {
  const [active, setActive] = useState(HospitalTabList.Orders)

  // for tab Permission
  const [ordersPE, setOrdersPE] = useState(false)
  const [providerPE, setProviderPE] = useState(false)
  const [feeSchedulePE, setFeeSchedulePE] = useState(false)
  const [dashboardPE, setDashboardPE] = useState(false)
  let permissionList = useSelector((state) => state.Permission.UiPermissions)

  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tap = Number(params.get('tap'))
    if (tap) {
      setActive(tap)
    }

    // tab permission
    let orderPermission = PermissionButton(ScreenPermissions.Hospital, ButtonPermissions.OrdersTab, permissionList)
    setOrdersPE(orderPermission)

    let providerPermission = PermissionButton(
      ScreenPermissions.Hospital,
      ButtonPermissions.ViewProvidersTab,
      permissionList
    )
    setProviderPE(providerPermission)

    let feeSchedulPermission = PermissionButton(
      ScreenPermissions.Hospital,
      ButtonPermissions.FeeScheduleTab,
      permissionList
    )
    setFeeSchedulePE(feeSchedulPermission)

    let dashboardPermission = PermissionButton(
      ScreenPermissions.Hospital,
      ButtonPermissions.DashboardTab,
      permissionList
    )
    setDashboardPE(dashboardPermission)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <div>
      <CRow>
        <CCol xs="12" md="12" className="mb-4 p-4">
          <CTabs activeTab={active} onActiveTabChange={(idx) => setActive(idx)}>
            <CNav variant="tabs" className="h5 font-weight-bold">
              <CNavItem>
                {ordersPE && (
                  <CNavLink>
                    <CIcon name="logoOrders" size={'2xl'} className="pr-1" />
                    Orders
                  </CNavLink>
                )}
              </CNavItem>
              <CNavItem>
                {providerPE && (
                  <CNavLink>
                    <CIcon name="logoProviders" size={'2xl'} className="pr-1" />
                    Fee Schedules
                  </CNavLink>
                )}
              </CNavItem>
              <CNavItem>
                {feeSchedulePE && (
                  <CNavLink>
                    <CIcon name="logoFreeSchedule" size={'2xl'} className="pr-1" />
                    Fee Schedule
                  </CNavLink>
                )}
              </CNavItem>
              <CNavItem>
                {dashboardPE && (
                  <CNavLink>
                    <CIcon name="logoDashboard" size={'2xl'} className="pr-1" />
                    Dashboard
                  </CNavLink>
                )}
              </CNavItem>
              {/* <CNavItem>
                  <CNavLink >
                  <CIcon name="logoPayment" size={'2xl'}  className="pr-1"/>
                    Payment
                  </CNavLink>
                </CNavItem> */}
            </CNav>
            <CTabContent>
              <CTabPane>{active === HospitalTabList.Orders && ordersPE ? <HospitalOrderTable /> : ''}</CTabPane>
              <CTabPane>{active === HospitalTabList.Providers && providerPE ? <HospitalProvider /> : ''}</CTabPane>
              <CTabPane>{active === HospitalTabList.FeeSchedule && feeSchedulePE ? <PricingToolGrid /> : ''}</CTabPane>
              <CTabPane>{active === HospitalTabList.Dashboard && dashboardPE ? <HospitalDashboard /> : ''}</CTabPane>
              {/* <CTabPane>
                  {`5. payment ${active}`}
                </CTabPane> */}
            </CTabContent>
          </CTabs>
          {/* </CCardBody> */}
          {/* </CCard> */}
        </CCol>
      </CRow>
    </div>
  )
}

export default HospitalSubCategories
