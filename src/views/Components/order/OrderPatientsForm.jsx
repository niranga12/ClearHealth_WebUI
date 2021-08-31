import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {MaskFormat, ValidationPatterns} from 'src/reusable/enum';
import PhoneNumberMaskValidation from 'src/reusable/PhoneNumberMaskValidation';
import DateSelector from 'src/views/common/dateSelector';
import * as yup from 'yup';
import InputMask from 'react-input-mask';

const schema = yup.object().shape({
	firstName:  yup.string().required(' First Name is required').matches(ValidationPatterns.onlyCharacters, ' Name should contain only characters'),
	middleName: yup.string().matches(ValidationPatterns.onlyCharacters, ' Middle Name  should contain only characters'),
	lastName: yup.string().matches(ValidationPatterns.onlyCharacters, ' Last Name  should contain only characters'),
	dateOfBirth: yup.string(),
	email: yup.string().email().required(),
	phone: yup
		.string()
		.required('Phone is required')
		.test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),

});

const OrderPatientsForm = () => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		control,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema), mode: 'all'});
	const [fromDate, handlefromDateChange] = useState(null);

	return (
		<form>
			{/* hospital details */}
			<h5 className='font-weight-bold mt-1'>Patients Details </h5>
			<div className='row'>
				<div className='col-md-4'>
					<div className='form-group'>
						<label className='form-text'>
						First Name <span className='text-danger font-weight-bold '>*</span>
						</label>
						<input className='form-control-sm' type='text' {...register('firstName')} />
						<div className='small text-danger  pb-2   '>{errors.firstName?.message}</div>
					</div>
				</div>

				<div className='col-md-4'>
					<div className='form-group'>
						<label className='form-text'>
						Middle Name <span className='text-danger font-weight-bold '>*</span>
						</label>
						<input className='form-control-sm' type='text' {...register('middleName')} />
						<div className='small text-danger  pb-2   '>{errors.middleName?.message}</div>
					</div>
				</div>

				<div className='col-md-4'>
					<div className='form-group'>
						<label className='form-text'>
						Last Name <span className='text-danger font-weight-bold '>*</span>
						</label>
						<input className='form-control-sm' type='text' {...register('lastName')} />
						<div className='small text-danger  pb-2   '>{errors.lastName?.message}</div>
					</div>
				</div>


			
			</div>

			<div className="row">
			<div className='col-md-4'>
					<div className='form-group'>
						<label className='form-text'>
							Date Of Birth<span className='text-danger font-weight-bold '>*</span>
						</label>
						<DateSelector className='form-control-sm' selectedDate={fromDate} handleDateChange={handlefromDateChange} disableFuture={true} />
						<div className='small text-danger  pb-2   '>{errors.dateOfBirth?.message}</div>
					</div>
				</div>

				<div className='col-md-4'>
					<div className='form-group'>
						<label className='form-text'>
							{' '}
							Email <span className='text-danger font-weight-bold '>*</span>{' '}
						</label>
						<input className='form-control-sm' type='text' {...register('email')} />
						<div className='small text-danger  pb-2   '>{errors.email?.message}</div>
					</div>
				</div>

				<div className='col-md-4'>
					<div className='form-group'>
						<label className='form-text'>
							{' '}
							Phone <span className='text-danger font-weight-bold '>*</span>
						</label>
						<InputMask {...register('phone')} mask={MaskFormat.phoneNumber} alwaysShowMask={false} className='form-control-sm' />
						<div className='small text-danger  pb-2   '>{errors.phone?.message}</div>
					</div>
				</div>
			
			</div>

			

		

          
		</form>

        
	);
};

export default OrderPatientsForm;
