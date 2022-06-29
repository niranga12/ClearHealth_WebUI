import React, { useEffect, useState } from 'react'
import { CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { HospitalInpatientTabList } from 'src/reusable/enum'
import CoPaymentPage from './CoPayment'
import CoInsurancePage from './CoInsurance'
import DeductiblePage from './Deductible'
const HospitalInPatient = ({ hospitalInPatient }) => {
  const [active, setActive] = useState(HospitalInpatientTabList.Copayment)

  // for tab Permission
  const [CoPayment, setCoPayment] = useState(true)
  const [CoInsurance, setCoInsurance] = useState(true)
  const [Deductible, setDeductible] = useState(true)

  return (
    <div>
      <h5>
        <div className="font-weight-bold">Hospital - Inpatient (Active)</div>
      </h5>
      <CRow>
        <CCol xs="12" md="12" className="mb-0 p-3">
          <CTabs activeTab={active} onActiveTabChange={(idx) => setActive(idx)}>
            <CNav variant="tabs" className="h5 font-weight-bold">
              <CNavItem>
                {CoPayment && (
                  <CNavLink>
                    {/* <CIcon name='logoOrders' size={'2xl'} className='pr-1' /> */}
                    CoPayment
                  </CNavLink>
                )}
              </CNavItem>
              <CNavItem>
                {CoInsurance && (
                  <CNavLink>
                    {/* <CIcon name='logoProviders' size={'2xl'} className='pr-1' /> */}
                    CoInsurance
                  </CNavLink>
                )}
              </CNavItem>
              <CNavItem>
                {Deductible && (
                  <CNavLink>
                    {/* <CIcon name='logoProviders' size={'2xl'} className='pr-1' /> */}
                    Deductible
                  </CNavLink>
                )}
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane>
                {active === HospitalInpatientTabList.Copayment && CoPayment ? (
                  <CoPaymentPage value={hospitalInPatient.amounts.coPayment} />
                ) : (
                  ''
                )}
              </CTabPane>
              <CTabPane>
                {active === HospitalInpatientTabList.Coinsurance && CoInsurance ? (
                  <CoInsurancePage value={hospitalInPatient.amounts.coInsurance} />
                ) : (
                  ''
                )}
              </CTabPane>
              <CTabPane>
                {active === HospitalInpatientTabList.Deductible && Deductible ? (
                  <DeductiblePage value={hospitalInPatient.amounts.Deductible} />
                ) : (
                  ''
                )}
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCol>
      </CRow>
    </div>
  )
}

export default HospitalInPatient
