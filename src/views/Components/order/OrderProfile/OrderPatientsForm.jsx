/* eslint-disable react-hooks/exhaustive-deps */
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {MaskFormat, ValidationPatterns} from 'src/reusable/enum';
import PhoneNumberMaskValidation from 'src/reusable/PhoneNumberMaskValidation';
import DateSelector from 'src/views/common/dateSelector';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import OnError from 'src/_helpers/onerror';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {EnableMaskPhone} from 'src/reusable';
import moment from 'moment';

const schema = yup.object().shape({
	patient: yup.object().shape({
		firstName: yup.string().required(' First Name is required').matches(ValidationPatterns.onlyCharacters, ' Name should contain only characters'),
		middleName: yup.string().matches(ValidationPatterns.onlyCharacters, ' Middle Name  should contain only characters'),
		lastName: yup.string().matches(ValidationPatterns.onlyCharacters, ' Last Name  should contain only characters'),
		dateOfBirth: yup.string(),
		email: yup.string().email(' Please enter a valid email').required('Email is required'),
		phone: yup
			.string()
			.required('Phone is required')
			.test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
	}),
});

const OrderPatientsForm = ({defaultValues, isEdit = false, handleForm}) => {
	const {register, getValues, reset, formState} = useForm({resolver: yupResolver(schema), mode: 'all'});

	const { isValid, errors} = formState;

	const [fromDate, handlefromDateChange] = useState(Date.now());

	const [stateChange, setstateChange] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		try {
			reset(defaultValues);
			handlefromDateChange(defaultValues?.patient?.dateOfBirth);
		} catch (error) {
			OnError(error, dispatch);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValues]);

	useEffect(() => {
		if (isValid) {
			const formValue = getValues('patient');
			let newValue = {...formValue, dateOfBirth: moment(fromDate).format('MM-DD-YYYY')};

			handleForm(newValue);
		}
	}, [stateChange]);

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
							<input className='form-control-sm' type='text' {...register('patient.firstName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} />
							<div className='small text-danger  pb-2   '>{errors.patient?.firstName?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>Middle Name</label>
							<input className='form-control-sm' type='text' {...register('patient.middleName')} readOnly={isEdit}  onBlur={() => setstateChange(!stateChange)} />
							<div className='small text-danger  pb-2   '>{errors.patient?.middleName?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								Last Name <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input className='form-control-sm' type='text' {...register('patient.lastName')} readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} />
							<div className='small text-danger  pb-2   '>{errors.patient?.lastName?.message}</div>
						</div>
					</div>
				</div>

				<div className='row'>
					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								Date Of Birth<span className='text-danger font-weight-bold '>*</span>
							</label>
							<DateSelector   className={` form-control-sm ${isEdit ? "disable" : ""}`}   selectedDate={fromDate} handleDateChange={handlefromDateChange}  disableFuture={true} />
							<div className='small text-danger  pb-2   '>{errors.patient?.dateOfBirth?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Email <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('patient.email')} onBlur={() => setstateChange(!stateChange)} readOnly={isEdit} />
							<div className='small text-danger  pb-2   '>{errors.patient?.email?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Phone <span className='text-danger font-weight-bold '>*</span>
							</label>
							<InputMask {...register('patient.phone')} mask={MaskFormat.phoneNumber} alwaysShowMask={EnableMaskPhone(isEdit, getValues('patient.phone'))} className='form-control-sm' readOnly={isEdit} onBlur={() => setstateChange(!stateChange)} />
							{/* <InputMask {...register('phone')} mask={MaskFormat.phoneNumber} alwaysShowMask={false} className='form-control-sm' /> */}
							<div className='small text-danger  pb-2   '>{errors.patient?.phone?.message}</div>
						</div>
					</div>
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
