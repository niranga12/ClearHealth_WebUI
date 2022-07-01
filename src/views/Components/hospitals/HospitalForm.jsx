/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { MaskFormat, Organizations, PartyTypeEnum, ServiceMsg, ValidationPatterns } from 'src/reusable/enum'
import { useHistory } from 'react-router-dom'
import OnError from 'src/_helpers/onerror'
import { saveHospital, updateHospitalByPartyRoleId } from 'src/service/hospitalsService'
import { notify } from 'reapop'
import InputMask from 'react-input-mask'
import NormalizePhone from 'src/reusable/NormalizePhone'
import PhoneNumberMaskValidation from 'src/reusable/PhoneNumberMaskValidation'
import useDebounce from 'src/reusable/debounce'
import { getValidateOrganization } from 'src/service/commonService'
import FormatText from 'src/reusable/FormatText'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { EnableMaskPhone } from 'src/reusable'
import HospitalNotifyUser from './HospitalNotifyUser'
import AddFeeSchedules from './FeeSchedules/AddFeeSchedules'
import EditFeeSchedules from './FeeSchedules/EditFeeSchedules'
import { MultiEmailText } from 'src/reusable/MultiEmailText'

const schema = yup.object().shape({
  hospitalName: yup
    .string()
    .required('Hospital name is required')
    .matches(ValidationPatterns.onlyCharacters, 'Hospital name should contain only characters'),
  healthSystemPartyRoleId: yup.string().required('Health System is required'),
  address1: yup.string().required('Address Line 1 is required'),
  address2: yup.string(),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),
  phone: yup.string().test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
  businessAddress1: yup.string(),
  businessAddress2: yup.string(),
  businessCity: yup.string(),
  businessState: yup.string(),
  businessZip: yup.string().matches(ValidationPatterns.zip, 'Zip is not valid'),
  patientContactName: yup.string(),
  patientContactPhone: yup
    .string()
    .test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
  // patientContactEmail: yup.string().email('Contact Email must be a valid email'),
  clearTransactionalFee: yup
    .number()
    .required('Clear Transactional Fee percentage is required.')
    .min(0, 'Min value 0.')
    .max(100, 'Max value 100.')
    .typeError('Clear Transactional Fee percentage is required.'),
  patientResponsibilityDiscount: yup
    .number()
    .required('Patient Responsibility Discount percentage is required.')
    .min(0, 'Min value 0.')
    .max(100, 'Max value 100.')
    .typeError('Patient Responsibility Discount percentage is required.'),
  clearTransactionalFeeforPatientResponsibility: yup
    .number()
    .required('Clear Transactional Fee for patient responsibility percentage is required.')
    .min(0, 'Min value 0.')
    .max(100, 'Max value 100.')
    .typeError('Clear Transactional Fee for patient responsibility percentage is required.')
})

const HospitalForm = ({
  defaultValues,
  isEdit = false,
  partyRoleId = null,
  healthSystems = [],
  stateList = [],
  onboardingInfo,
  emailSendersList = [],
  smsSendersList = []
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema), mode: 'all' })

  const [stateOption, setStateOption] = useState(defaultValues.state)
  const [businessStateOption, setBusinessStateOption] = useState(defaultValues.businessState)

  // const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
  const { dirtyFields } = useFormState({ control })
  const dispatch = useDispatch()
  let history = useHistory()
  let btnRef = useRef()

  const [emailList, setEmailist] = useState([])
  const [isEmailList, setIsEmailList] = useState(false)

  // for org name validation
  const [hospitalName, setHospitalName] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isAlreadyExit, setIsAlreadyExit] = useState(false)
  // ... so that we aren't hitting our API rapidly.
  const debouncedName = useDebounce(hospitalName, 1000)
  const [isNotify, setIsNotify] = useState(false)
  const [isFeeSchedule, setFeeSchedule] = useState(false)
  const [feeScheduleChanges, setFeeScheduleChanges] = useState(false)
  const [hospitalId, setHospitalId] = useState(null)

  // validate organition name
  useEffect(() => {
    const fetchValidate = async () => {
      try {
        setIsSearching(true)
        if (debouncedName) {
          let data = {
            roleTypeId: Organizations.Hospital,
            organizationName: debouncedName,
            ...(isEdit && { partyRoleId })
          }

          const result = await getValidateOrganization(data)

          if (result.data.data) {
            btnRef.current.removeAttribute('disabled')
          } else {
            btnRef.current.setAttribute('disabled', 'disabled')
          }
          setIsSearching(false)
          setIsAlreadyExit(!result.data.data)
          setValue('hospitalName', debouncedName, { shouldValidate: true, shouldDirty: true })
        } else {
          setIsSearching(false)
          setIsAlreadyExit(false)
        }
      } catch (error) {}
    }
    fetchValidate()
  }, [debouncedName])

  const handleBusinessChecked = (event) => {
    if (event.target.checked) {
      setValue('businessAddress1', getValues('address1'), {
        shouldValidate: true,
        shouldDirty: true
      })
      setValue('businessAddress2', getValues('address2'), {
        shouldValidate: true,
        shouldDirty: true
      })
      setValue('businessCity', getValues('city'), {
        shouldValidate: true,
        shouldDirty: true
      })
      setValue('businessState', getValues('state'), {
        shouldValidate: true,
        shouldDirty: true
      })
      setValue('businessZip', getValues('zip'), {
        shouldValidate: true,
        shouldDirty: true
      })
      setBusinessStateOption(getValues('state'))
    } else {
      setValue('businessAddress1', '')
      setValue('businessAddress2', '')
      setValue('businessCity', '')
      setValue('businessState', '')
      setValue('businessZip', '')
      setBusinessStateOption('')
    }
  }

  const stateSelect = (event) => {
    setValue('state', event.target.innerText, { shouldValidate: true, shouldDirty: true })
  }
  const businessStateSelect = (event) => {
    setValue('businessState', event.target.innerText, { shouldValidate: true, shouldDirty: true })
  }

  const changeEmail = (val) => {
    setEmailist(val)
    setIsEmailList(true)
  }

  // set default form values
  useEffect(() => {
    try {
      reset(defaultValues)
      setStateOption(defaultValues.state) //set state dropdown value
      setBusinessStateOption(defaultValues.businessState)

      if (defaultValues.patientContactEmail) {
        let patientEmailList = defaultValues.patientContactEmail.split(', ')
        setEmailist(patientEmailList)
      }
    } catch (error) {
      OnError(error, dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues])

  // form submit
  const hospitalFormSubmit = (data) => {
    if (btnRef.current) {
      btnRef.current.setAttribute('disabled', 'disabled')
    }
    if (isEdit) {
      updateHospitalInfo()
    } else {
      addHospital(data)
    }
  }

  const notifyUser = () => {
    setIsNotify(!isNotify)
  }

  const modelCancel = () => {
    setIsNotify(!isNotify)
  }

  const onCancelFeeSchedule = () => {
    setFeeSchedule(false)
  }

  const onOpenFeeSchedule = (result) => {
    setHospitalId(result)
    setFeeSchedule(true)
  }

  // save hospital
  const addHospital = async (data) => {
    const newHospital = {
      hospital: {
        healthSystemPartyRoleId: data.healthSystemPartyRoleId,
        name: data.hospitalName,
        alertSenderEmail: data.alertSenderEmail,
        alertSenderSMS: data.alertSenderSMS,

        clearTransactionalFee: data.clearTransactionalFee,
        patientResponsibilityDiscount: data.patientResponsibilityDiscount,
        clearTransactionalFeeforPatientResponsibility: data.clearTransactionalFeeforPatientResponsibility
      },
      postalAddress: [
        {
          partyContactTypeId: PartyTypeEnum.primary,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip
        },
        {
          partyContactTypeId: PartyTypeEnum.shipping,
          address1: data.businessAddress1,
          address2: data.businessAddress2,
          city: data.businessCity,
          state: data.businessState,
          zip: data.businessZip
        }
      ],
      telecommunicationsNumber: {
        partyContactTypeId: PartyTypeEnum.telecommunicationsNumber,
        number: NormalizePhone(data.phone)
      },
      patientAccessContact: {
        name: data.patientContactName,
        phone: NormalizePhone(data.patientContactPhone),
        // email: data.patientContactEmail,
        email: emailList.join(', ')
      }
    }

    try {
      if (newHospital) {
        let result = await saveHospital(newHospital)
        if (result.data.message === ServiceMsg.OK) {
          dispatch(notify(`Successfully added`, 'success'))
          // history.push('/hospitals');
          onOpenFeeSchedule(result.data.data)
          //history.goBack();
        }
      }
    } catch (error) {
      OnError(error, dispatch)
    }
  }

  const getChanges = (result) => {
    setFeeScheduleChanges(result)
  }

  // update hospital
  const updateHospitalInfo = async () => {
    try {
      const updateHospital = {
        ...((feeScheduleChanges ||
          dirtyFields.hospitalName ||
          dirtyFields.healthSystemPartyRoleId ||
          dirtyFields.alertSenderEmail ||
          dirtyFields.alertSenderSMS ||
          dirtyFields.clearTransactionalFee ||
          dirtyFields.patientResponsibilityDiscount ||
          dirtyFields.clearTransactionalFeeforPatientResponsibility) && {
          hospital: {
            name: getValues('hospitalName'),
            healthSystemPartyRoleId: getValues('healthSystemPartyRoleId'),
            alertSenderEmail: getValues('alertSenderEmail'),
            alertSenderSMS: getValues('alertSenderSMS'),
            clearTransactionalFee: getValues('clearTransactionalFee'),
            patientResponsibilityDiscount: getValues('patientResponsibilityDiscount'),
            clearTransactionalFeeforPatientResponsibility: getValues('clearTransactionalFeeforPatientResponsibility')
          }
        }),
        ...((dirtyFields.address1 ||
          dirtyFields.address2 ||
          dirtyFields.city ||
          dirtyFields.state ||
          dirtyFields.zip ||
          dirtyFields.businessAddress1 ||
          dirtyFields.businessAddress2 ||
          dirtyFields.businessCity ||
          dirtyFields.businessState ||
          dirtyFields.businessZip) && {
          postalAddress: [
            ...(dirtyFields.address1 || dirtyFields.address2 || dirtyFields.city || dirtyFields.state || dirtyFields.zip
              ? [
                  {
                    partyContactTypeId: PartyTypeEnum.primary,
                    address1: getValues('address1'),
                    address2: getValues('address2'),
                    city: getValues('city'),
                    state: getValues('state'),
                    zip: getValues('zip')
                  }
                ]
              : []),

            ...(dirtyFields.businessAddress1 ||
            dirtyFields.businessAddress2 ||
            dirtyFields.businessCity ||
            dirtyFields.businessState ||
            dirtyFields.businessZip
              ? [
                  {
                    partyContactTypeId: PartyTypeEnum.shipping,
                    address1: getValues('businessAddress1'),
                    address2: getValues('businessAddress2'),
                    city: getValues('businessCity'),
                    state: getValues('businessState'),
                    zip: getValues('businessZip')
                  }
                ]
              : [])
          ]
        }),
        ...((dirtyFields.patientContactName ||
          dirtyFields.patientContactPhone ||
          dirtyFields.patientContactEmail ||
          isEmailList) && {
          patientAccessContact: {
            name: getValues('patientContactName'),
            phone: NormalizePhone(getValues('patientContactPhone')),
            // email: getValues('patientContactEmail'),
            email: emailList.join(', ')
          }
        }),
        ...(dirtyFields.phone && {
          telecommunicationsNumber: {
            partyContactTypeId: PartyTypeEnum.telecommunicationsNumber,
            number: NormalizePhone(getValues('phone'))
          }
        })
      }
      if (Object.keys(updateHospital).length === 0) {
        dispatch(notify(`No record to update`, 'error'))
        btnRef.current.removeAttribute('disabled')

        // btnRef.current.remove("disabled", "disabled");
      } else {
        try {
          const result = await updateHospitalByPartyRoleId(partyRoleId, updateHospital)
          if (result.data.message === ServiceMsg.OK) {
            dispatch(notify(`Successfully updated`, 'success'))
            // history.push('/hospitals');
            history.goBack()
          }
        } catch (error) {
          OnError(error, dispatch)
        }
      }
    } catch (error) {
      OnError(error, dispatch)
    }
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(hospitalFormSubmit)}>
        {/* hospital details */}
        <h5 className="font-weight-bold mt-1">Hospital Details </h5>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-text">
                {' '}
                Hospital Name <span className="text-danger font-weight-bold ">*</span>{' '}
              </label>
              <input
                className="form-control-sm"
                type="text"
                {...register('hospitalName')}
                onChange={(e) => setHospitalName(e.target.value)}
                onInput={(e) => (e.target.value = FormatText(e.target.value))}
              />
              <div className="small text-danger  pb-2   ">{errors.hospitalName?.message}</div>
              {isSearching && <div>Searching ...</div>}
              {isAlreadyExit && <div className="small text-danger pb-2">Hospital name already taken</div>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label className="form-text">
                {' '}
                Health System <span className="text-danger font-weight-bold ">*</span>{' '}
              </label>
              <select name="" id="" className="form-control-sm" {...register('healthSystemPartyRoleId')}>
                <option value="">Select</option>
                {healthSystems.map((item, index) => (
                  <option key={index} value={item.partyRoleId}>
                    {item.name}
                  </option>
                ))}
                {/* <option value='test'>test</option> */}
              </select>
              <div className="small text-danger  pb-2   ">{errors.healthSystemPartyRoleId?.message}</div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label className="form-text"> Email Sender </label>
              <select name="" id="" className="form-control-sm" {...register('alertSenderEmail')}>
                <option value="">Select</option>
                {emailSendersList.map((item, index) => (
                  <option key={index} value={item.from_email}>
                    {item.from_email}
                  </option>
                ))}
                {/* <option value='test'>test</option> */}
              </select>
              {/* <div className='small text-danger  pb-2   '>{errors.healthSystemPartyRoleId?.message}</div> */}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label className="form-text"> Sms Sender </label>
              <select name="" id="" className="form-control-sm" {...register('alertSenderSMS')}>
                <option value="">Select</option>
                {smsSendersList.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
                {/* <option value='test'>test</option> */}
              </select>
              {/* <div className='small text-danger  pb-2   '>{errors.healthSystemPartyRoleId?.message}</div> */}
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label className="form-text">
                {' '}
                Clear Transactional Fee <span className="text-danger font-weight-bold ">*</span>{' '}
              </label>

              <div className="rt-input-input w-100">
                <input
                  className="form-control-sm remove-percentage"
                  type="number"
                  min="0"
                  max="100"
                  {...register('clearTransactionalFee')}
                />
              </div>
              <div className="small text-danger  pb-2   ">{errors.clearTransactionalFee?.message}</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label className="form-text">
                {' '}
                Patient Responsibility Discount <span className="text-danger font-weight-bold ">*</span>{' '}
              </label>
              <div className="rt-input-input w-100">
                <input
                  className="form-control-sm remove-percentage"
                  type="number"
                  min="0"
                  max="100"
                  {...register('patientResponsibilityDiscount')}
                />
              </div>
              <div className="small text-danger  pb-2   ">{errors.patientResponsibilityDiscount?.message}</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label className="form-text">
                {' '}
                Clear Transactional Fee for Patient Responsibility{' '}
                <span className="text-danger font-weight-bold ">*</span>{' '}
              </label>
              <div className="rt-input-input w-100">
                <input
                  className="form-control-sm remove-percentage"
                  type="number"
                  min="0"
                  max="100"
                  {...register('clearTransactionalFeeforPatientResponsibility')}
                />
              </div>
              <div className="small text-danger  pb-2   ">
                {errors.clearTransactionalFeeforPatientResponsibility?.message}
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          {/* address */}
          <div className="col-md-4">
            <h5 className="font-weight-bold mt-1">Address </h5>
            <div className="form-group">
              <label className="form-text">
                Address Line 1 <span className="text-danger font-weight-bold ">*</span>
              </label>
              <input
                type="text"
                className="form-control-sm"
                {...register('address1')}
                onInput={(e) => (e.target.value = FormatText(e.target.value))}
              />
              <div className="small text-danger  pb-2   ">{errors.address1?.message}</div>
            </div>

            <div className="form-group">
              <label className="form-text">Address Line 2 </label>
              <input
                type="text"
                className="form-control-sm"
                {...register('address2')}
                onInput={(e) => (e.target.value = FormatText(e.target.value))}
              />
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-text">
                  City <span className="text-danger font-weight-bold ">*</span>
                </label>
                <input
                  type="text"
                  className="form-control-sm"
                  {...register('city')}
                  onInput={(e) => (e.target.value = FormatText(e.target.value))}
                />
                <div className="small text-danger  pb-2   ">{errors.city?.message}</div>
              </div>
              <div className="form-group col-md-6">
                <label className="form-text">
                  State <span className="text-danger font-weight-bold ">*</span>
                </label>

                <Autocomplete
                  id="combo-box-demo"
                  options={stateList}
                  //   value={stateOption}
                  inputValue={stateOption}
                  onInputChange={(event, newInputValue) => {
                    setStateOption(newInputValue)
                  }}
                  getOptionLabel={(option) => option.stateName}
                  onChange={stateSelect}
                  renderInput={(params) => (
                    <TextField {...params} {...register('state')} className="control-autocomplete" variant="outlined" />
                  )}
                />

                {/* <input type='text' className='form-control-sm' {...register('state')} /> */}
                <div className="small text-danger  pb-2   ">{errors.state?.message}</div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-text">
                Zip <span className="text-danger font-weight-bold ">*</span>
              </label>
              <input type="text" className="form-control-sm" {...register('zip')} />
              <div className="small text-danger  pb-2   ">{errors.zip?.message}</div>
            </div>

            <div className="form-group">
              <label className="form-text">Phone</label>
              <InputMask
                {...register('phone')}
                mask={MaskFormat.phoneNumber}
                alwaysShowMask={EnableMaskPhone(isEdit, getValues('phone'))}
                className="form-control-sm"
              />
              {/* <input type='text' className='form-control-sm' {...register('phone')} /> */}
              <div className="small text-danger  pb-2   ">{errors.phone?.message}</div>
            </div>
          </div>

          {/* shipping address  */}

          <div className="col-md-4">
            <h5 className="font-weight-bold mt-1">
              <span className="pr-5">Business Address </span>{' '}
              <input type="checkbox" className="form-check-input" onChange={handleBusinessChecked} />{' '}
              <span className="small">Same as address</span>{' '}
            </h5>
            <div className="form-group">
              <label className="form-text">Address Line 1</label>
              <input
                type="text"
                className="form-control-sm"
                {...register('businessAddress1')}
                onInput={(e) => (e.target.value = FormatText(e.target.value))}
              />
              <div className="small text-danger  pb-2   ">{errors.businessAddress1?.message}</div>
            </div>

            <div className="form-group">
              <label className="form-text">Address Line 2 </label>
              <input
                type="text"
                className="form-control-sm"
                {...register('businessAddress2')}
                onInput={(e) => (e.target.value = FormatText(e.target.value))}
              />
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-text">City</label>
                <input
                  type="text"
                  className="form-control-sm"
                  {...register('businessCity')}
                  onInput={(e) => (e.target.value = FormatText(e.target.value))}
                />
                <div className="small text-danger  pb-2   ">{errors.businessCity?.message}</div>
              </div>
              <div className="form-group col-md-6">
                <label className="form-text">State</label>
                <Autocomplete
                  id="business state"
                  options={stateList}
                  //   value={stateOption}
                  inputValue={businessStateOption}
                  onInputChange={(event, newInputValue) => {
                    setBusinessStateOption(newInputValue)
                  }}
                  getOptionLabel={(option) => option.stateName}
                  onChange={businessStateSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register('businessState')}
                      className="control-autocomplete"
                      variant="outlined"
                    />
                  )}
                />
                {/* <input type='text' className='form-control-sm' {...register('businessState')} /> */}
                <div className="small text-danger  pb-2   ">{errors.businessState?.message}</div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-text">Zip</label>
              <input type="text" className="form-control-sm" {...register('businessZip')} />
              <div className="small text-danger  pb-2   ">{errors.businessZip?.message}</div>
            </div>
          </div>

          {/* Patient Access Contact */}
          <div className="col-md-4">
            <h5 className="font-weight-bold mt-1">Patient Access Contact </h5>

            <div className="form-group">
              <label className="form-text">Name</label>
              <input
                type="text"
                className="form-control-sm"
                {...register('patientContactName')}
                onInput={(e) => (e.target.value = FormatText(e.target.value))}
              />
              <div className="small text-danger  pb-2   ">{errors.patientContactName?.message}</div>
            </div>

            <div className="form-group">
              <label className="form-text">Phone</label>
              <InputMask
                {...register('patientContactPhone')}
                mask={MaskFormat.phoneNumber}
                alwaysShowMask={EnableMaskPhone(isEdit, getValues('patientContactPhone'))}
                className="form-control-sm"
              />

              {/* <input type='text' className='form-control-sm' {...register('patientContactPhone')} /> */}
              <div className="small text-danger  pb-2   ">{errors.patientContactPhone?.message}</div>
            </div>

            <div className="form-group margin-minus-top-8">
              <label className="form-text">Email</label>
              {/* <MultipleValueTextInput onItemAdded={(item, allItems) => patientAccessContactEmail(allItems)} onItemDeleted={(item, allItems) => setEmailist(allItems)} label='Email' name='item-input' className='form-control-sm' placeholder='Enter whatever items you want; separate them with COMMA or ENTER.' values={emailList} /> */}
              <MultiEmailText handleEmailAdd={changeEmail} defalutEmail={emailList} />
              {/* <input type='text' className='form-control-sm' {...register('patientContactEmail')} />
							<div className='small text-danger  pb-2   '>{errors.patientContactEmail?.message}</div> */}
            </div>
          </div>
        </div>

        {partyRoleId != null && <EditFeeSchedules edit={isEdit} partyRoleId={partyRoleId} updateChanges={getChanges} />}

        {/* Stripe */}
        {/* {isEdit ? <h5 className='font-weight-bold mt-1'>Stripe Onboarding </h5> : null}

				{isEdit ? (
					<div className='row'>
						<div className='col-md-4'>
							<div className='form-group'>
								<label className='form-text'>Update Link</label>
								<a href={onboardingInfo.url} target='_blank' rel='noreferrer'>
									{onboardingInfo.isOnboardingCompleted == '1' ? 'Update Account' : 'Complete Account'}
								</a>
							</div>
						</div>

						<div className='col-md-4 row'>
							<div className='form-group'>
								<label className='form-text'>Status</label>
								{onboardingInfo.isOnboardingCompleted == '1' ? <div className='font-weight-bold font-green'>Complete</div> : <div className='font-weight-bold font-red'>Pending</div>}
							</div>

							<div className='form-group'>
								<div className='ml-5 mt-4'>
									<div onClick={notifyUser} className='btn btn-secondary m-0'>
										Notify User
									</div>
								</div>
							</div>
						</div>
					</div>
				) : null} */}

        <div className="row">
          {/* <div className='col-md-12'>
						<button type='submit' ref={btnRef} className='btn btn-primary btn-lg float-right'>
							{isEdit ? 'Update' : 'Save'}
						</button>
					</div> */}
          <div className="col-md-12">
            <button type="submit" ref={btnRef} className="btn btn-primary btn-lg float-right">
              {isEdit ? 'Update' : 'Next'}
            </button>
          </div>
        </div>
      </form>

      <HospitalNotifyUser partyRoleId={partyRoleId} isNotify={isNotify} handleCancel={modelCancel} />

      {isFeeSchedule == true && (
        <AddFeeSchedules edit={isEdit} partyRoleId={hospitalId} isFeeSchedule={isFeeSchedule} />
      )}
    </div>
  )
}

export default HospitalForm
