/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContactMethod, MaskFormat, OrderType, ValidationPatterns } from 'src/reusable/enum';
import PhoneNumberMaskValidation from 'src/reusable/PhoneNumberMaskValidation';
import DateSelector from 'src/views/common/dateSelector';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import OnError from 'src/_helpers/onerror';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { EnableMaskPhone } from 'src/reusable';
import moment from 'moment';
import FormatText from 'src/reusable/FormatText';
import { getOrderType } from 'src/service/orderService';

let schema = yup
	.object()
	.shape({
		patient: yup.object().shape({
			firstName: yup.string().required(' First Name is required').matches(ValidationPatterns.onlyCharacters, ' Name should contain only characters'),
			// middleName: yup.string().matches(ValidationPatterns.onlyCharacters, ' Middle Name  should contain only characters'),
			lastName: yup.string().required(' Last Name is required').matches(ValidationPatterns.onlyCharacters, ' Last Name  should contain only characters'),
			dateOfBirth: yup.string(),
			contactMethod: yup.string().required('Contact Method is required'),
			// email: yup.string().email(' Please enter a valid email').required('Email is required'),
			// phone: yup
			// 	.string()
			// 	.required('Phone is required')
			// 	.test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
			orderType: yup.string(),
			// email: yup.string().email(' Please enter a valid email'),
			// phone: yup
			// 	.string()
			// 	.test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
		}).when((values, schema) => {
			if (values.orderType == OrderType.PatientResponsibility) {
				return schema.shape({
					patientResponsibilityAmount: yup
						.string()
						.required('Patient Responsibility Amount is required')
				});
			}


			if (values.contactMethod == '1') {
				return schema.shape({
					email: yup.string().email(' Please enter a valid email').required('Email is required'),
				});
			}
			else if (values.contactMethod == '2') {
				return schema.shape({
					phone: yup
						.string()
						.required('Phone is required')
						.test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
				});
			} else {

			}


		}),
	})


const OrderPatientsForm = ({ defaultValues, isEdit = false, handleForm }) => {
	const { register, unregister, getValues, reset, formState } = useForm({ resolver: yupResolver(schema), mode: 'all' });

	// eslint-disable-next-line no-unused-vars
	const { isValid, errors } = formState;

	const [isMail, setIsmail] = useState(false);
	const [isPhone, setIsPhone] = useState(false);

	const [fromDate, handlefromDateChange] = useState(Date.now());

	const [stateChange, setstateChange] = useState(false);
	const [isClearPackage, setisClearPackage] = useState(false);
	const [isPatientResponsibility, setisPatientResponsibility] = useState(false)
	const [orderTypeList, setorderTypeList] = useState([]);
	const dispatch = useDispatch();
	const [value, setValue] = useState('')
	const [numValue, setNumValue] = useState();


	const changeHandler = ({ target }) => {
		setValue(target.value.toLowerCase())
	}

	const onChange = ({ target }) => {
		if (Number(target.value)>=0) {
			setNumValue(target.value);
		  }else{
			setNumValue(null);
		  }
	}
	



	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getOrderType();
				setorderTypeList(result.data.data);
			} catch (error) {
				OnError(error, dispatch);
			}
		};

		try {
			fetchData();
			reset(defaultValues);
			handlefromDateChange(defaultValues?.patient?.dateOfBirth);
		} catch (error) {
			OnError(error, dispatch);
		}


		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValues]);

	useEffect(() => {
		let isAviable = false;
		const formValue = getValues('patient');
		let value = Number(formValue?.contactMethod);
		formValue?.orderType == OrderType.ClearPackage ? setisClearPackage(true) : setisClearPackage(false);
		formValue?.orderType == OrderType.PatientResponsibility ? setisPatientResponsibility(true) : setisPatientResponsibility(false);
		formValue?.orderType == OrderType.ClearPackage ? unregister('patient.patientResponsibilityAmount') : register('patient.patientResponsibilityAmount');

		if (value > -1) {
			if (value === Number(ContactMethod.Email)) {
				setIsmail(true);
				setIsPhone(false);
				// schema.patient?. yup.object().shape({})
			} else if (value === Number(ContactMethod.Phone)) {
				setIsPhone(true);
				setIsmail(false);
			}
		} else {
			setIsmail(false);
			setIsPhone(false);
		}

		if (formValue?.contactMethod == ContactMethod.Email && fromDate && formValue?.firstName && Number(formValue?.contactMethod) >= 0 && formValue?.lastName && formValue?.email && Number(formValue?.orderType) > -1) {
			isAviable = ((formValue?.orderType == OrderType.PatientResponsibility && formValue.patientResponsibilityAmount) || (formValue?.orderType == OrderType.ClearPackage)) ? true : false;
		} else if (formValue?.contactMethod == ContactMethod.Phone && fromDate && formValue?.firstName && formValue?.lastName && Number(formValue?.contactMethod) >= 0 && formValue?.phone && Number(formValue?.orderType) > -1) {
			isAviable = ((formValue?.orderType == OrderType.PatientResponsibility && formValue.patientResponsibilityAmount) || (formValue?.orderType == OrderType.ClearPackage)) ? true : false;
		} else {
			isAviable = false;
		}

		if (isAviable) {
			// if ( isValid && !errors.hasOwnProperty('patient')  ) {
			const formValue = getValues('patient');
			let newValue = { ...formValue, dateOfBirth: moment(fromDate).format('MM-DD-YYYY') };
			handleForm(newValue);
		} else {
			handleForm(null);
		}


	}, [stateChange, fromDate]);



	// 	const orderTypeOnchange=(e)=>{
	// 	e.target.value==OrderType.ClearPackage?	setisClearPackage(true):setisClearPackage(false);

	// 	}

	// useEffect(() => {
	// 	const formValue = getValues('patient.');

	// }, [orderTypeChange])

	// const contactMethodChange =(value)=>{

	// setstateChange(!stateChange)

	// }

	// useEffect(() => {
	// 	setValue("patient?.dateOfBirth",  moment(fromDate).format('MM-DD-YYYY'));

	// }, [fromDate])

	return (
		<>
			<form>
				{/* hospital details */}
				<h5 className='font-weight-bold mt-1'>Patients Details </h5>
				<div className='row'>
					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								First Name <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input className='form-control-sm' type='text' {...register('patient.firstName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							<div className='small text-danger  pb-2   '>{errors.patient?.firstName?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>Middle Name</label>
							<input className='form-control-sm' type='text' {...register('patient.middleName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							<div className='small text-danger  pb-2   '>{errors.patient?.middleName?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								Last Name <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input className='form-control-sm' type='text' {...register('patient.lastName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} onInput={(e) => (e.target.value = FormatText(e.target.value))} />
							<div className='small text-danger  pb-2   '>{errors.patient?.lastName?.message}</div>
						</div>
					</div>
				</div>

				<div className='row'>
					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								Date Of Birth <span className='text-danger font-weight-bold '>*</span>
							</label>
							<DateSelector className={` form-control-sm ${isEdit ? 'disable' : ''}`} selectedDate={fromDate} handleDateChange={handlefromDateChange} disableFuture={true} />
							<div className='small text-danger  pb-2   '>{errors.patient?.dateOfBirth?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Preferred Contact Method <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<select name='' id='' className='form-control-sm' {...register('patient.contactMethod')} onBlur={() => setstateChange(!stateChange)}>
								<option value='-1'>Select</option>
								<option value={ContactMethod.Email}>Email</option>
								<option value={ContactMethod.Phone}>Phone</option>
							</select>

							{/* <input className='form-control-sm' type='text' {...register('patient.email')} onBlur={() => setstateChange(!stateChange)} readOnly={isEdit} /> */}
							<div className='small text-danger  pb-2   '>{errors.patient?.contactMethod?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'> Email {isMail && <span className='text-danger font-weight-bold '>*</span>}</label>
							<input className='form-control-sm' type='text' {...register('patient.email')} onBlur={() => setstateChange(!stateChange)} value={value} readOnly={isEdit} onChange={changeHandler} />
							<div className='small text-danger  pb-2   '>{errors.patient?.email?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'> Phone {isPhone && <span className='text-danger font-weight-bold '>*</span>}</label>
							<InputMask {...register('patient.phone')} mask={MaskFormat.phoneNumber} alwaysShowMask={EnableMaskPhone(isEdit, getValues('patient.phone'))} className='form-control-sm' readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} />
							{/* <InputMask {...register('phone')} mask={MaskFormat.phoneNumber} alwaysShowMask={false} className='form-control-sm' /> */}
							<div className='small text-danger  pb-2   '>{errors.patient?.phone?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								OrderType <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<select name='' id='' className='form-control-sm' {...register('patient.orderType')} onBlur={() => setstateChange(!stateChange)}>
								<option value='-1'>Select</option>

								{orderTypeList.map((item, index) => (
									<option key={index} value={item.orderTypeId}>
										{item.description}
									</option>
								))}
							</select>

							{/* <input className='form-control-sm' type='text' {...register('patient.email')} onBlur={() => setstateChange(!stateChange)} readOnly={isEdit} /> */}
							<div className='small text-danger  pb-2   '>{errors.patient?.orderType?.message}</div>
						</div>
					</div>

					{isPatientResponsibility && (
						<div className='col-md-4'>
							<div className='form-group'>
								<label className='form-text'>
									Patient Responsibility Amount <span className='text-danger font-weight-bold '>*</span>
								</label>
								<input className='form-control-sm' type='number' pattern="^[0-9]*$" {...register('patient.patientResponsibilityAmount')} onBlur={() => setstateChange(!stateChange)} onChange={onChange} value={numValue || ''} />
								<div className='small text-danger  pb-2   '>{errors.patient?.patientResponsibilityAmount?.message}</div>
							</div>
						</div>
					)}
				</div>

			</form>
		</>
	);
};

OrderPatientsForm.propTypes = {
	defaultValues: PropTypes.any,
	isEdit: PropTypes.bool,
	handleForm: PropTypes.func,
};

export default OrderPatientsForm;
