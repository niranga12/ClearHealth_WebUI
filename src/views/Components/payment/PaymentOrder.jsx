import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PhoneNumberMaskValidation from 'src/reusable/PhoneNumberMaskValidation';
import {ValidationPatterns} from 'src/reusable/enum';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateSelector from 'src/views/common/dateSelector';

const schema = yup.object().shape({
	order: yup.object().shape({
		// referringProvider: yup.string(),
		// accountNumber: yup.string(),
		// orderId: yup.string(),
		// orderDate: yup.string(),

		patientName: yup.string().required('Contact name is required'),
		contactPhone: yup
			.string()
			.required('Contact Phone is required')
			.test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
		email: yup.string().required('Contact Email is required').email('Contact Email must be a valid email'),
		referringProviderName: yup.string().required('Provider name is required'),
		// dateOfBirth: yup.string(),

		address1: yup.string().required('Address Line 1 is required'),
		address2: yup.string(),
		city: yup.string().required('City is required'),
		state: yup.string().required('State is required'),
		zip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),

		billingAddress1: yup.string().required('billing Address Line 1 is required'),
		billingAddress2: yup.string(),
		billingCity: yup.string().required('City is required'),
		billingState: yup.string().required('State is required'),
		billingZip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),
	}),
});

const PaymentOrder = ({patientOrder,formChange, handleValid}) => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		control,
		formState,
	} = useForm({resolver: yupResolver(schema), mode: 'all'});

	const { isValid, errors} = formState;

	const [fieldChange, setFieldChange] = useState(false);
	const [fromDate, handlefromDateChange] = useState(Date.now());


	useEffect(() => {
		reset(patientOrder);
	}, [patientOrder]);

	useEffect(() => {
		
	
		handleValid(isValid);
		if(isValid){
			let value=getValues("order")
			let newValue = {...value, dateOfBirth: moment(fromDate).format('MM-DD-YYYY')};
			formChange(newValue);
		}
		
	}, [fieldChange])

	return (
		<div>
			<div className='component-header mt-4 mb-2 '>Order Details </div>
			<div className='payment-information-about mb-4'>Information about the order</div>
			<div className='card  cover-content p-3'>
				<div className='row'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Referring Provider <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.referringProvider')}  readOnly/>
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Account Number <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.accountNumber')} readOnly />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Order <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.orderId')}  readOnly/>
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Order Date <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.orderDate')}  readOnly/>
						</div>
					</div>
				</div>
			</div>

			<div className='component-header mt-4 mb-2 '>Patients Details </div>
			<div className='payment-information-about mb-4'>Please fill below details about patient </div>

			<div className='card  cover-content p-3'>
				{/* patient details */}
				<div className='row'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Patient Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.patientName')}  onBlur={() => setFieldChange(!fieldChange)}  />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Contact Number <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.contactPhone')}  onBlur={() => setFieldChange(!fieldChange)} />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Email Address <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.email')} onBlur={() => setFieldChange(!fieldChange)}  />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Refering Provider Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.referringProviderName')}  onBlur={() => setFieldChange(!fieldChange)} />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Date of Birth <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<DateSelector   className={` form-control-sm `}   selectedDate={fromDate} handleDateChange={handlefromDateChange}  disableFuture={true} />
							{/* <input className='form-control-sm' type='text' {...register('order.dateOfBirth')} onBlur={() => setFieldChange(!fieldChange)}  /> */}
						</div>
					</div>
				</div>
				<div className='payment-address  mt-3 mb-2 '>Address </div>
				{/* address */}
				<div className='row'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 1 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.address1')}  onBlur={() => setFieldChange(!fieldChange)} />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 2 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.address2')}  onBlur={() => setFieldChange(!fieldChange)} />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								City <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.city')}  onBlur={() => setFieldChange(!fieldChange)} />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								State <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.state')} onBlur={() => setFieldChange(!fieldChange)}  />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Zip code <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.zip')} onBlur={() => setFieldChange(!fieldChange)} />
						</div>
					</div>
				</div>

				{/* Billing Address */}
				<div className='payment-address  mt-3 mb-2 '>Billing Address </div>
				<div className='row'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 1 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.billingAddress1')}  onBlur={() => setFieldChange(!fieldChange)} />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 2 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.billingAddress2')} onBlur={() => setFieldChange(!fieldChange)} />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								City <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.billingCity')} onBlur={() => setFieldChange(!fieldChange)} />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								State <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.billingState')} onBlur={() => setFieldChange(!fieldChange)} />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Zip code <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('order.billingZip')} onBlur={() => setFieldChange(!fieldChange)} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

PaymentOrder.propTypes = {
	patientOrder: PropTypes.any,
	formChange: PropTypes.func,
	handleValid: PropTypes.any
};

export default PaymentOrder;