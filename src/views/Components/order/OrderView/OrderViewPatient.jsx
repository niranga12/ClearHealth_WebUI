/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import 'font-awesome/css/font-awesome.min.css'
import PropTypes from 'prop-types'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import moment from 'moment'
import { EnableMaskPhone } from 'src/reusable'
import { ContactMethod, MaskFormat, ServiceMsg } from 'src/reusable/enum'
import DateSelector from 'src/views/common/dateSelector'
import NormalizePhone from 'src/reusable/NormalizePhone'
import { updatePatientByPartyRoleId } from 'src/service/patientService'
import OnError from 'src/_helpers/onerror'
import { useDispatch } from 'react-redux'
import { notify } from 'reapop'
import PhoneNumberMaskValidation from 'src/reusable/PhoneNumberMaskValidation'
import PhoneNumberFormater from 'src/reusable/PhoneNumberFormater'

const schema = yup.object().shape({
  patientForm: yup
    .object()
    .shape({
      firstName: yup.string().required('First Name is required'),
      // middleName: yup.string(),
      lastName: yup.string().required('Last Name is required'),
      phoneNumber: yup
        .string()
        //.required(' Phone is required')
        .test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
      email: yup
        .string()
        //.required('Contact Email is required')
        .email('Contact Email must be a valid email'),
      DOB: yup.string(),
      contactMethod: yup.string()
      // enhancementOn:yup.string().required()
    })
    .when((values, schema) => {
      if (values.contactMethod == '1') {
        return schema.shape({
          email: yup.string().email(' Please enter a valid email').required('Email is required')
        })
      } else if (values.contactMethod == '2') {
        return schema.shape({
          phoneNumber: yup
            .string()
            .required('Phone is required')
            .test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value))
        })
      }else if (values.contactMethod == '3') {
        return schema.shape({
          phone: yup
            .string()
            .required('Phone is required')
            .test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
          email: yup.string().email(' Please enter a valid email').required('Email is required')
        })
      }
    })
})

const orderPhone = (phone) => {
  return (
    <div className="rectangle-intable">
      {' '}
      <span className="fa fa-phone text-health-icon pr-1"></span> {phone && PhoneNumberFormater(phone)}
    </div>
  )
}

const OrderViewPatient = ({ patientDetail }) => {
  const { register, getValues, reset, formState } = useForm({ resolver: yupResolver(schema), mode: 'all' })

  const { errors } = formState

  const [isEdit, setisEdit] = useState(false)
  const [patient, setPatient] = useState(patientDetail)
  const [fromDate, handlefromDateChange] = useState(null)
  const dispatch = useDispatch()
  const [stateChange, setstateChange] = useState(false)
  const [isMail, setIsmail] = useState(false)
  const [isPhone, setIsPhone] = useState(false)

  const [isAviable, setIsAviable] = useState(false)

  useEffect(() => {
    setPatient(patientDetail)
    handlefromDateChange(patientDetail?.DOB)
  }, [patientDetail])

  useEffect(() => {
    if (isEdit) {
      let detail = { patientForm: { ...patient } }
      reset(detail)
    }
  }, [isEdit])

  useEffect(() => {
    // let isAviable=false;
    const formValue = getValues('patientForm')
    let value = Number(formValue?.contactMethod)

    if (value > -1) {
      if (value === Number(ContactMethod.Email)) {
        setIsmail(true)
        setIsPhone(false)
      } else if (value === Number(ContactMethod.Phone)) {
        setIsPhone(true)
        setIsmail(false)
      } else if (value === Number(ContactMethod.Both)) {
        setIsPhone(true)
        setIsmail(true)
      }
    } else {
      setIsmail(false)
      setIsPhone(false)
    }

    if (
      formValue?.contactMethod == ContactMethod.Email &&
      fromDate &&
      formValue?.firstName &&
      Number(formValue?.contactMethod) >= 0 &&
      formValue?.lastName &&
      formValue?.email
    ) {
      setIsAviable(true)
      // isAviable=true;
    } else if (
      formValue?.contactMethod == ContactMethod.Phone &&
      fromDate &&
      formValue?.firstName &&
      formValue?.lastName &&
      Number(formValue?.contactMethod) >= 0 &&
      formValue?.phoneNumber
    ) {
      // isAviable=true;
      setIsAviable(true)
    } else if (
      formValue?.contactMethod == ContactMethod.Both &&
      fromDate &&
      formValue?.firstName &&
      formValue?.lastName &&
      Number(formValue?.contactMethod) >= 0 &&
      formValue?.phoneNumber
    ) {
      // isAviable=true;
      setIsAviable(true)
    } else {
      // isAviable=false;
      setIsAviable(false)
    }
  }, [stateChange, fromDate])

  const update = async () => {
    let updateDetail = getValues('patientForm')
    let data = {
      patient: {
        firstName: updateDetail.firstName,
        middleName: updateDetail?.middleName,
        lastName: updateDetail.lastName,
        email: updateDetail.email,
        contactMethod: updateDetail.contactMethod,
        dateOfBirth: moment(fromDate).format('MM-DD-YYYY'),
        phone: NormalizePhone(updateDetail.phoneNumber)
      }
    }

    try {
      let result = await updatePatientByPartyRoleId(patient.patientPartyRoleID, data)
      if (result.data.message == ServiceMsg.OK) {
        dispatch(notify(`Successfully updated`, 'success'))
        let newData = {
          ...patient,
          firstName: updateDetail.firstName,
          middleName: updateDetail?.middleName,
          lastName: updateDetail.lastName,
          email: updateDetail.email,
          DOB: moment(fromDate).format('MM-DD-YYYY'),
          phoneNumber: NormalizePhone(updateDetail.phoneNumber),
          contactMethod: updateDetail.contactMethod
        }
        setPatient(newData)
        setisEdit(false)
      }
    } catch (error) {
      OnError(error, dispatch)
    }
  }

  const editButton = () => {
    return (
      <button className="btn btn-primary float-right ml-3 text-white" onClick={() => setisEdit(true)}>
        {' '}
        <span className="fa fa-x fa-pencil pr-2"></span> <span>Edit Details</span>
      </button>
    )
  }

  const saveButton = () => {
    return (
      <>
        <button className="btn btn-primary float-right ml-3 text-white" disabled={!isAviable} onClick={() => update()}>
          {' '}
          <span className="fa fa-x fa-save pr-2"></span> <span>Update </span>
        </button>
        <button className="btn btn-secondary float-right ml-3 " onClick={() => setisEdit(false)}>
          {' '}
          <span className="fa fa-x fa-close pr-2"></span> <span>Cancel </span>
        </button>
      </>
    )
  }

  return (
    <div className="card  cover-content pt-2 ">
      <div className="card-header">
        <div className="row">
          <div className="col-md-6 component-header "> Patient Information </div>
          <div className="col-md-6">{isEdit ? saveButton() : editButton()}</div>
        </div>
      </div>
      <div className="card-body pb-0">
        <div className="row">
          {/*First Name */}
          <div className="col-md-3">
            <div className="form-group">
              <label className="form-text">
                {' '}
                First Name <span className="text-danger font-weight-bold ">*</span>{' '}
              </label>
              {isEdit ? (
                <input
                  className="form-control-sm"
                  type="text"
                  {...register('patientForm.firstName')}
                  onBlur={() => setstateChange(!stateChange)}
                />
              ) : (
                <div className="h5">{patient?.firstName}</div>
              )}
              {isEdit && <div className="small text-danger  pb-2">{errors.patientForm?.firstName?.message}</div>}
            </div>
          </div>

          {/*Middle Name */}
          <div className="col-md-3">
            <div className="form-group">
              <label className="form-text"> Middle Name </label>
              {isEdit ? (
                <input
                  className="form-control-sm"
                  type="text"
                  {...register('patientForm.middleName')}
                  onBlur={() => setstateChange(!stateChange)}
                />
              ) : (
                <div className="h5">{patient?.middleName} </div>
              )}
            </div>
          </div>

          {/*Last Name */}
          <div className="col-md-3">
            <div className="form-group">
              <label className="form-text">
                {' '}
                Last Name <span className="text-danger font-weight-bold ">*</span>{' '}
              </label>
              {isEdit ? (
                <input
                  className="form-control-sm"
                  type="text"
                  {...register('patientForm.lastName')}
                  onBlur={() => setstateChange(!stateChange)}
                />
              ) : (
                <div className="h5"> {patient?.lastName}</div>
              )}
              {isEdit && <div className="small text-danger  pb-2   ">{errors.patientForm?.lastName?.message}</div>}
            </div>
          </div>

          {/* preferred contact method */}
          <div className="col-md-3">
            <div className="form-group">
              <label className="form-text">
                {' '}
                Contact Method <span className="text-danger font-weight-bold ">*</span>{' '}
              </label>
              {isEdit ? (
                <select
                  name=""
                  id=""
                  className="form-control-sm"
                  {...register('patientForm.contactMethod')}
                  onBlur={() => setstateChange(!stateChange)}
                >
                  <option value="-1">Select</option>
                  <option value={ContactMethod.Email}>Email</option>
                  <option value={ContactMethod.Phone}>Phone</option>
                  <option value={ContactMethod.Both}>Both</option>
                </select>
              ) : (
                <div className="h5"> {patient?.contactMethod == ContactMethod.Email ? 'Email' : patient?.contactMethod == ContactMethod.Phone ? 'Phone' : 'Both'}</div>
                
              )}
              {isEdit && <div className="small text-danger  pb-2   ">{errors.patientForm?.contactMethod?.message}</div>}
            </div>
          </div>

          {/* Date Of Birth */}

          <div className="col-md-3">
            <div className="form-group">
              <label className="form-text">
                {' '}
                Date Of Birth <span className="text-danger font-weight-bold ">*</span>{' '}
              </label>
              {isEdit ? (
                <DateSelector
                  className="form-control-sm text-light-gray "
                  selectedDate={fromDate}
                  handleDateChange={handlefromDateChange}
                  disableFuture={true}
                />
              ) : (
                <div className="h5"> {patient?.DOB}</div>
              )}
            </div>
          </div>

          {/* Email*/}
          <div className="col-md-3">
            <div className="form-group">
              <label className="form-text">
                {' '}
                Email {isMail && <span className="text-danger font-weight-bold ">*</span>}{' '}
              </label>
              {isEdit ? (
                <input
                  className="form-control-sm"
                  type="text"
                  {...register('patientForm.email')}
                  onBlur={() => setstateChange(!stateChange)}
                />
              ) : (
                <div className="h5">{patient?.email}</div>
              )}
              {isEdit && <div className="small text-danger  pb-2   ">{errors.patientForm?.email?.message}</div>}
            </div>
          </div>
          {/* Phone*/}
          <div className="col-md-3">
            <div className="form-group">
              <label className="form-text">
                {' '}
                Phone {isPhone && <span className="text-danger font-weight-bold ">*</span>}{' '}
              </label>
              {isEdit ? (
                <InputMask
                  {...register('patientForm.phoneNumber')}
                  mask={MaskFormat.phoneNumber}
                  alwaysShowMask={EnableMaskPhone(isEdit, getValues('patientForm.phoneNumber'))}
                  className="form-control-sm"
                  onBlur={() => setstateChange(!stateChange)}
                />
              ) : (
                orderPhone(patient?.phoneNumber)
              )}
              {isEdit && <div className="small text-danger  pb-2   ">{errors.patientForm?.phoneNumber?.message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

OrderViewPatient.propTypes = {
  patientDetail: PropTypes.any
}

export default OrderViewPatient
