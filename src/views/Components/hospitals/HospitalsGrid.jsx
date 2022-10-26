import CIcon from '@coreui/icons-react'
import { CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import MetaTitles from 'src/views/common/metaTitles'
import HospitalTable from './HospitalTable'

const HospitalsGrid = () => {
  const location = useLocation()
  let history = useHistory()
  // const location = useLocation();

  const [healthSystemPartyId, setHealthSystemPartyId] = useState(null)
  const [healthSystemName, setHealthSystemName] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    const healthName = params.get('healthSystemName')
    setHealthSystemPartyId(id)
    setHealthSystemName(healthName)
  }, [location])

  const redirectHealthSystem = () => {
    history.push('/healthsystem')
  }

  const backUrl = () => {
    return (
      <CRow>
        <CCol xs="12" md="12" className="h4 font-lato-bold m-0 cursor-pointer mb-3 ">
          <CIcon name="cilArrowLeft" size={'xl'} onClick={redirectHealthSystem} />
          &nbsp; &nbsp;{healthSystemName}
          {/* <span className="pl-3" onClick={redirectHospital}>Hospitals</span>	 */}
        </CCol>
        {/* <CCol xs='12' md='12' className='h2 font-lato-bold hospital-heading'>
					{healthSystemName}
				</CCol> */}
      </CRow>
    )
  }

  return (
    <>
      {healthSystemPartyId && backUrl()}

      <div className="card  cover-content pt-2 ">
        {/* for addeing page metas  */}
        <MetaTitles title="Clear Health | Hospital" description=" Hospital  " />
        <HospitalTable />
      </div>
    </>
  )
}

export default HospitalsGrid
