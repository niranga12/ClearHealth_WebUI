import { CCol, CRow } from '@coreui/react'
import React from 'react'
import CardWidget from 'src/views/common/cardWidget'

const DashboardMenuItems = () => {
   
    return (
        <div className="container">
        <CRow className="p-3">
          <CCol xs="12" sm="6" lg="3">
          <CardWidget title="Hospitals" logoName="logoHospital" url="/hospitals" />
          </CCol>
  
          <CCol sm="6" md="3">
            <CardWidget   title="Health Systems" url="/healthsystem" logoName="logoHealthSystem"/>
          </CCol>
          
          <CCol sm="6" md="3">
            <CardWidget  title="Providers"  url="/providers" logoName="logoProviders"/>
          </CCol>
  
          
          <CCol sm="6" md="3">
            <CardWidget  title="Pricing Tool" logoName="pricingTool"/>
          </CCol>
          
  
  
          <CCol sm="6" md="3">
            <CardWidget  title="Orders" logoName="logoOrders"/>
          </CCol>
          
          <CCol sm="6" md="3">
            <CardWidget  title="Patients" logoName="logoPatients"/>
          </CCol>
          
          <CCol sm="6" md="3">
            <CardWidget  title="Accounting" logoName="logoAccounting"/>
          </CCol>
  
          
          <CCol sm="6" md="3">
            <CardWidget  title="profile" logoName="Profile"/>
          </CCol>
  
          
          
        </CRow>
      </div>
      
    )
}

export default DashboardMenuItems
