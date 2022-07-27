/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { loaderHide, loaderShow } from 'src/actions/loaderAction'
import { Country } from 'src/reusable/enum'
import { getStateList } from 'src/service/commonService'
import { getHealthSystemList } from 'src/service/healthsystemService'
import {
  getHospitalByPartyRoleId,
  getHospitalEmailSender,
  getHospitalSmsSender,
  getOnboardinginfo
} from 'src/service/hospitalsService'
import AdminTitle from 'src/views/common/adminTitle'
import MetaTitles from 'src/views/common/metaTitles'
import OnError from 'src/_helpers/onerror'
import HospitalForm from './HospitalForm'
import Goback from 'src/views/common/Goback'

const defalutFormValue = {
  hospitalName: '',
  healthSystemPartyRoleId: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  businessAddress1: '',
  businessAddress2: '',
  businessCity: '',
  businessState: '',
  businessZip: '',
  patientContactName: '',
  patientContactPhone: '',
  patientContactEmail: '',
  alertSenderEmail: '',
  alertSenderSMS: '',
  clearTransactionalFee: '',
  patientResponsibilityDiscount: '',
  clearTransactionalFeeforPatientResponsibility: ''

  // consolidatedInvoice: false,
  // applySAASTax: false,
  // taxId: '',
  // invoiceReceiveMethod: '',
  // accountNumber: '',
  // routing: '',
  // bankName: '',
  // contactEmail: '',
  // contactPhone: '',
  // contactName: '',
}

const HospitalProfile = () => {
  const location = useLocation()
  const [partyRoleId, setPartyRoleId] = useState(null)
  const [editProfile, setEditProfile] = useState(false)

  const [stateList, setstateList] = useState([])
  const [onboardingInfo, setOnboarding] = useState([])
  const [hospitalData, setHospitalData] = useState(defalutFormValue)
  const [healthSystems, setHealthSystem] = useState([])
  const [emailSenders, setEmailSenders] = useState([])
  const [smsSenders, setSmsSenders] = useState([])

  const dispatch = useDispatch()

  //if this a edit form get the data
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    const onboarding = params.get('onboarding')
    setPartyRoleId(id)
    // if (onboarding == 'bottom') {

    //   window.scrollTo(0, document.body.scrollHeight)

    // }

    id ? setEditProfile(true) : setEditProfile(false)

    const fetchData = async () => {
      try {
        dispatch(loaderShow())
        //getHealthSystemList
        const res = await getHealthSystemList({})
        setHealthSystem(res.data.data)
        //getStateList
        const stateResult = await getStateList(Country.USA)
        setstateList(stateResult.data.data)

        // getSenderList
        const senderListResult = await getHospitalEmailSender()
        setEmailSenders(senderListResult.data.data)

        // get SMs sender List
        const sendSmsListResult = await getHospitalSmsSender()
        setSmsSenders(sendSmsListResult.data.data)

        //getOnboardinginfo
        // const onboarding = await getOnboardinginfo(id);
        if (id) {
          const onboarding = await getOnboardinginfo(id)
          setOnboarding(onboarding.data.data)
        }

        if (onboarding == 'bottom') {
          setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight)
          }, 1500)
        }
      } catch (error) {
        OnError(error, dispatch)
      }
      if (id) {
        try {
          // const res = await getHealthSystemList({});
          // setHealthSystem(res.data.data);

          const result = await getHospitalByPartyRoleId(id)
          const formatedData = await updateFormFields(result.data.data)
          setHospitalData(formatedData)
        } catch (error) {
          OnError(error, dispatch)
        }
      }
      dispatch(loaderHide())
    }
    fetchData()
  }, [location])

  // updated form fields
  const updateFormFields = (data) => {
    const hospitalData = {
      hospitalName: data.hospital.name,
      healthSystemPartyRoleId: data.hospital.healthSystemPartyRoleId,
      address1: data.hospital.primaryAddress1,
      address2: data.hospital.primaryAddress2,
      city: data.hospital.primaryCity,
      state: data.hospital.primaryState,
      zip: data.hospital.primaryZip,
      phone: data.hospital.phoneNumber,
      businessAddress1: data.hospital.secondaryAddress1,
      businessAddress2: data.hospital.secondaryAddress2,
      businessCity: data.hospital.secondaryCity,
      businessState: data.hospital.secondaryState,
      businessZip: data.hospital.secondaryZip,
      patientContactName: data.primaryContact.name,
      patientContactPhone: data.primaryContact.phone,
      patientContactEmail: data.primaryContact.email,
      alertSenderEmail: data.hospital.alertSenderEmail,
      alertSenderSMS: data.hospital.alertSenderSMS,
      clearTransactionalFee: data.hospital.clearTransactionalFee,
      patientResponsibilityDiscount: data.hospital.patientResponsibilityDiscount,
      clearTransactionalFeeforPatientResponsibility: data.hospital.clearTransactionalFeeforPatientResponsibility
      // consolidatedInvoice: data.paymentInfo.consolidatedInvoice == 1 ? true : false,
      // applySAASTax: data.paymentInfo.applySAASTax == 1 ? true : false,
      // taxId: data.paymentInfo.taxId,
      // invoiceReceiveMethod: data.paymentInfo.invoiceReceiveMethod,
      // accountNumber: data.paymentInfo.accountNumber,
      // routing: data.paymentInfo.routing,
      // bankName: data.paymentInfo.bankName,
      // contactEmail: data.paymentInfo.email,
      // contactPhone: data.paymentInfo.phone,
      // contactName: data.paymentInfo.name,
    }
    return hospitalData
  }

  return (
    <>
      <Goback />

      <div className="card  cover-content pt-2 ">
        {/* for addeing page metas  */}
        <MetaTitles title="Clear Health | Hospital Profile" description=" add update Profile  " />
        <AdminTitle title={editProfile ? 'Edit Hospital' : 'Add Hospital'} />

        <HospitalForm
          defaultValues={hospitalData}
          stateList={stateList}
          isEdit={editProfile}
          healthSystems={healthSystems}
          emailSendersList={emailSenders}
          smsSendersList={smsSenders}
          partyRoleId={partyRoleId}
          onboardingInfo={onboardingInfo}
        />
      </div>
    </>
  )
}

export default HospitalProfile
