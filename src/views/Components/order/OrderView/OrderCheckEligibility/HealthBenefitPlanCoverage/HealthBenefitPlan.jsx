import React, { useEffect, useState } from 'react'
import { CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { HealthBenefitTabList } from 'src/reusable/enum'
import Dedectible from './Dedectible'
import OutofPocket from './OutofPocket'

const HealthBenefitPlan = ({ healthBenefitPlan }) => {
  const [active, setActive] = useState(HealthBenefitTabList.OutofPocket)

  // for tab Permission
  const [outofPocket, setOutofPocket] = useState(true)
  const [deductible, setDeductible] = useState(true)

  useEffect(() => {}, [HealthBenefitPlan])

  return (
    <div>
      <CRow>
        <CCol xs="12" md="12" className="mb-0 p34">
          <CTabs activeTab={active} onActiveTabChange={(idx) => setActive(idx)}>
            <CNav variant="tabs" className="h5 font-weight-bold">
              <CNavItem>
                {outofPocket && (
                  <CNavLink>
                    {/* <CIcon name='logoOrders' size={'2xl'} className='pr-1' /> */}
                    Out of Pocket
                  </CNavLink>
                )}
              </CNavItem>
              <CNavItem>
                {deductible && (
                  <CNavLink>
                    {/* <CIcon name='logoProviders' size={'2xl'} className='pr-1' /> */}
                    Deductible
                  </CNavLink>
                )}
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane>
                {active === HealthBenefitTabList.OutofPocket && outofPocket ? (
                  <OutofPocket value={healthBenefitPlan.amounts.outOfPocket} />
                ) : (
                  ''
                )}
              </CTabPane>
              <CTabPane>
                {active === HealthBenefitTabList.Deductible && deductible ? (
                  <Dedectible value={healthBenefitPlan.amounts.deductibles} />
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

export default HealthBenefitPlan
