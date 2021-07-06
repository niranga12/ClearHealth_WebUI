import React, { useState } from 'react'
import {
    CCol,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
    
    CTabs,
   
  } from '@coreui/react';
import CIcon from '@coreui/icons-react';

const HospitalSubCategories = () => {
    const [active, setActive] = useState(1);

    return (
        <div>
              <CRow>
             <CCol xs="12" md="12" className="mb-4 p-4">
       
            <CTabs>
              <CNav variant="tabs" className="h5 font-weight-bold">
                <CNavItem>
                  <CNavLink >
                  <CIcon name="logoOrders" size={'2xl'} />
                    Orders
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink >
                  <CIcon name="logoProviders" size={'2xl'} />
                    Providers
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink >
                  <CIcon name="logoFreeSchedule" size={'2xl'} />
                    Free Schedule
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink >
                  <CIcon name="logoDashboard" size={'2xl'} />
                    Dashboard
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink >
                  <CIcon name="logoPayment" size={'2xl'} />
                    Payment
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  {`1. orders`}
                </CTabPane>
                <CTabPane>
                  {`2. provider`}
                </CTabPane>
                <CTabPane>
                  {`3.free schedule`}
                </CTabPane>
                <CTabPane>
                  {`4.dashboard`}
                </CTabPane>
                <CTabPane>
                  {`5. payment`}
                </CTabPane>
              </CTabContent>
            </CTabs>
          {/* </CCardBody> */}
        {/* </CCard> */}
      </CCol>
      </CRow>
        </div>
    )
}

export default HospitalSubCategories;
