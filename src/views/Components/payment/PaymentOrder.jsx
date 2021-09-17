import React from 'react';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PhoneNumberMaskValidation from 'src/reusable/PhoneNumberMaskValidation';
import { ValidationPatterns } from 'src/reusable/enum';


const schema = yup.object().shape({
order:	yup.object().shape({
	
	address1: yup.string().required('Address Line 1 is required'),
	address2: yup.string(),
	city: yup.string().required('City is required'),
	state: yup.string().required('State is required'),
	zip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),
	phone: yup
		.string()
		.required('Phone is required')
		.test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
	businessAddress1: yup.string().required('Business Address Line 1 is required'),
	businessAddress2: yup.string(),
	businessCity: yup.string().required('City is required'),
	businessState: yup.string().required('State is required'),
	businessZip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),
	patientContactName: yup.string().required('Contact name is required'),
	patientContactPhone: yup
		.string()
		.required('Contact Phone is required')
		.test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
	patientContactEmail: yup.string().required('Contact Email is required').email('Contact Email must be a valid email'),
	consolidatedInvoice: yup.bool(),
	applySAASTax: yup.bool(),
	taxId: yup.string(),
	invoiceReceiveMethod: yup.string(),
	accountNumber: yup.string(),
	routing: yup.string(),
	bankName: yup.string(),
	contactEmail: yup.string().email(' Email must be a valid email'),
	contactPhone: yup.string().test('phoneNO', 'Please enter a valid Phone Number', (value) => PhoneNumberMaskValidation(value)),
	contactName: yup.string().matches(ValidationPatterns.onlyCharacters, 'Contact name should contain only characters'),
})
});


const PaymentOrder = () => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		control,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema), mode: 'all'});
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
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Account Number <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Order <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Order Date <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
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
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Contact Number <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Email Address <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Refering Provider Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Date of Birth <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
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
							<input className='form-control-sm' type='text' />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 2 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								City <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								State <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Zip code <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
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
							<input className='form-control-sm' type='text' />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 2 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								City <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								State <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Zip code <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' />
						</div>
					</div>
				</div>
            
            </div>
		</div>
	);
};

export default PaymentOrder;
