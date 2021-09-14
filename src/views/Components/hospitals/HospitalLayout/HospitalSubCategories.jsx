import React, { useEffect, useState } from 'react'
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
import HospitalProvider from '../HospitalChildComponents/HospitalProvider/HospitalProvider';
import HospitalOrderTable from '../HospitalChildComponents/HospitalOrder/HospitalOrderTable';
import HospitalDashboard from '../HospitalChildComponents/HospitalDashboard/HospitalDashboard';
import PricingToolGrid from '../../pricingTool/PricingToolGrid';
import { HospitalTabList } from 'src/reusable/enum';
import { useLocation } from 'react-router-dom';

const HospitalSubCategories = () => {
  const [active, setActive] = useState(HospitalTabList.Orders);
  
	const location = useLocation();

  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const tap = Number(params.get('tap'));
    if(tap){
      setActive(tap);
    }

 
  }, [location])
 

    return (
        <div>
              <CRow>
             <CCol xs="12" md="12" className="mb-4 p-4">
       
            <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
              <CNav variant="tabs" className="h5 font-weight-bold">
                <CNavItem>
                  <CNavLink >
                  <CIcon name="logoOrders" size={'2xl'}  className="pr-1"/>
                    Orders
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink >
                  <CIcon name="logoProviders" size={'2xl'}  className="pr-1"/>
                    Providers
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink >
                  <CIcon name="logoFreeSchedule" size={'2xl'}  className="pr-1"/>
                    Fee Schedule
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink >
                  <CIcon name="logoDashboard" size={'2xl'}  className="pr-1"/>
                    Dashboard
                  </CNavLink>
                </CNavItem>
                {/* <CNavItem>
                  <CNavLink >
                  <CIcon name="logoPayment" size={'2xl'}  className="pr-1"/>
                    Payment
                  </CNavLink>
                </CNavItem> */}
              </CNav>
              <CTabContent>
                <CTabPane>
                  {active ===HospitalTabList.Orders ? <HospitalOrderTable />: ''}
                  
                </CTabPane>
                <CTabPane>
                  {active ===HospitalTabList.Providers ? <HospitalProvider />: ''}
                 
                </CTabPane>
                <CTabPane>
                
                {active ===HospitalTabList.FeeSchedule? <PricingToolGrid />: ''}
                 
                </CTabPane>
                <CTabPane>
                {active ===HospitalTabList.Dashboard ?  < HospitalDashboard/>: ''}
                     
                </CTabPane>
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

export default HospitalSubCategories;
