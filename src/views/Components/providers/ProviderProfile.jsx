/* eslint-disable react-hooks/exhaustive-deps */
import CIcon from '@coreui/icons-react'
import { CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { loaderHide, loaderShow } from 'src/actions/loaderAction'
import { Country } from 'src/reusable/enum'
import { getStateList } from 'src/service/commonService'
import { getHealthSystemList } from 'src/service/healthsystemService'
import { getHospitalByPartyRoleId, getOnboardinginfo } from 'src/service/hospitalsService'
import { getProviderByPartyRoleId, getSpecialityList } from 'src/service/providerService'
import AdminTitle from 'src/views/common/adminTitle'
// import Goback from 'src/views/common/Goback'
import MetaTitles from 'src/views/common/metaTitles'
import OnError from 'src/_helpers/onerror'
import ProviderForm from './ProviderForm'

const defalutFormValue = {
  hospitalName: '',
  healthSystemPartyRoleId: '',
  providerGroup: '',
  providerTypeId: '',
  firstName: '',
  middleName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  billingAddress1: '',
  billingAddress2: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
  phone: '',
  email: '',
  speciality: '',
  taxId: '',
  nip: ''
  // bankName: '',
  // accountNumber: '',
  // routing: '',
}

const ProviderProfile = () => {
  const location = useLocation()
  const [partyRoleId, setPartyRoleId] = useState(null)
  const [editProfile, setEditProfile] = useState(false)
  const [healthSystems, setHealthSystem] = useState([])
  const [stateList, setstateList] = useState([])
  const [providerData, setProviderData] = useState(defalutFormValue)
  const [specialityData, setSpecialityData] = useState([])
  const [onboardingInfo, setOnboarding] = useState([])
  // const [tabId, setTabId] = useState(null)

  const dispatch = useDispatch()
  const history = useHistory()

  //if this a edit form get the data
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    const hospitalId = params.get('hospitalId')

    setPartyRoleId(id)
    id ? setEditProfile(true) : setEditProfile(false)

    const fetchData = async () => {
      try {
        dispatch(loaderShow())
        const hsResult = await getHealthSystemList({})
        setHealthSystem(hsResult.data.data)
        const specialityList = await getSpecialityList()
        setSpecialityData(specialityList.data.data)
        const stateResult = await getStateList(Country.USA)
        setstateList(stateResult.data.data)
      } catch (error) {
        OnError(error, dispatch)
      }

      try {
        if (id) {
          const result = await getProviderByPartyRoleId(id)
          const formatedData = await updateFormFields(result.data.data)
          setProviderData(formatedData)
          const onboarding = await getOnboardinginfo(id)
          setOnboarding(onboarding.data.data)
        } else if (hospitalId) {
          const hsDetatil = await getHospitalByPartyRoleId(hospitalId)

          let defautlSet = {
            ...providerData,
            hospitalName: hospitalId,
            healthSystemPartyRoleId: hsDetatil.data.data.hospital.healthSystemPartyRoleId
          }
          setProviderData(defautlSet)
        }
      } catch (error) {
        OnError(error, dispatch)
      }
      dispatch(loaderHide())
    }
    fetchData()
  }, [location])

  const goBack = () => {
    const params = new URLSearchParams(location.search)
    // const id = params.get('id')
    const hospitalId = params.get('hospitalId')
    const hospitalName = params.get('hospitalName')
    const tap = params.get('tap')

    
    if (tap && hospitalId) {
      history.push({
        pathname: `/hospitals/hospital`,
        search: `?id=${hospitalId}&name=${hospitalName}&tap=${tap}`
      })
    } else {
      history.goBack()
    }
  }

  //updated form fields
  const updateFormFields = (data) => {
    const providerDetails = {
      hospitalName: data.hopsitalPartyRoleId,
      healthSystemPartyRoleId: data.healthsystemPartyRoleId,
      providerGroup: data.providerGroup,
      providerTypeId: data.providerTypeId,
      firstName: data.firstName ? data.firstName : '_Dummy',
      middleName: data.middleName,
      lastName: data.lastName ? data.lastName : '_Dummy',
      address1: data.primaryAddress1,
      address2: data.primaryAddress2,
      city: data.primaryCity,
      state: data.primaryState,
      zip: data.primaryZip,
      billingAddress1: data.secondaryAddress1,
      billingAddress2: data.secondaryAddress2,
      billingCity: data.secondaryCity,
      billingState: data.secondaryState,
      billingZip: data.secondaryZip,
      phone: data.phone,
      email: data.email,
      speciality: data.speciality,
      taxId: data.taxId,
      nip: data.NPI
      // bankName: data.bankName,
      // accountNumber: data.accountNumber,
      // routing: data.routing
    }

    return providerDetails
  }

  return (
    <>
      {/* <Goback /> */}
      <CRow>
        <CCol xs="12" md="12" className="h4 font-lato-bold m-0 cursor-pointer mb-3">
          <CIcon name="cilArrowLeft" size={'xl'} onClick={goBack} />
          <span className="pl-3" onClick={goBack}>
            Back
          </span>
        </CCol>
      </CRow>

      <div className="card  cover-content pt-2 ">
        {/* for addeing page metas  */}
        <MetaTitles title="Clear Health | Provider Profile" description=" Create update Providers  " />
        <AdminTitle title={editProfile ? 'Edit Provider' : 'Add Provider'} />

        <ProviderForm
          defaultValues={providerData}
          stateList={stateList}
          isEdit={editProfile}
          partyRoleId={partyRoleId}
          healthSystemList={healthSystems}
          specialityData={specialityData}
          onboardingInfo={onboardingInfo}
        />
      </div>
    </>
  )
}

export default ProviderProfile
