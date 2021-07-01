import React, {useEffect} from 'react';
import {useForm, useFormState} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {PartyTypeEnum, ServiceMsg, ValidationPatterns} from 'src/reusable/enum';
import {useHistory} from 'react-router-dom';

const schema = yup.object().shape({
	hospitalName: yup.string().required('Hospital Name is required'),
	healthSystemPartyRoleId: yup.string().required('Health system is required'),
	address1: yup.string().required('Address line1 is required'),
	address2: yup.string(),
	city: yup.string().required('City is required'),
	state: yup.string().required('State is required'),
	zip: yup.string().required('Zip is required'),
	businessAddress1: yup.string().required('Business Address line 1 is required'),
	businessAddress2: yup.string(),
	businessCity: yup.string().required('City is required'),
	businessState: yup.string().required('State is required'),
	businessZip: yup.string().required('Zip is required'),
	patientContactName: yup.string().required('Contact name is required'),
	patientContactPhone: yup.string().required('Contact phone is required').matches(ValidationPatterns.phoneRegExp, 'Phone number is not valid'),
	patientContactEmail: yup.string().required('Contact email is required').email('Contact Email must be a valid email'),
	consolidatedInvoice: yup.string(),
	applySAASTax: yup.string(),
  taxId:yup.string(),
  invoiceReceiveMethod:yup.string(),
  accountNumber:yup.string(),
  routing:yup.string(),
  bankName:yup.string(),
  contactEmail:yup.string(),
  contactPhone:yup.string(),
  contactName:yup.string()
});

const HospitalForm = () => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		control,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema)});

	// const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
	const {dirtyFields} = useFormState({control});
	const dispatch = useDispatch();
	let history = useHistory();

	const handleBusinessChecked = () => {};

  // form submit 
	const hospitalFormSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className='p-4'>
			<form onSubmit={handleSubmit(hospitalFormSubmit)}>
				{/* hospital details */}
				<h5 className='font-weight-bold mt-1'>Hospital Details </h5>
				<div className='row mb-3'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Hospital Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input className='form-control-sm' type='text' {...register('hospitalName')} />
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Heath System <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<select name='' id='' className='form-control-sm' {...register('healthSystemPartyRoleId')}>
								<option value=''>Select</option>
                <option value='test'>test</option>
							</select>
						</div>
					</div>
				</div>

				<div className='row mb-3'>
					{/* address */}
					<div className='col-md-4'>
						<h5 className='font-weight-bold mt-1'>Address </h5>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 1 <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('address1')} />
							<div className='small text-danger  pb-2   '>{errors.address1?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>Address Line 2 </label>
							<input type='text' className='form-control-sm' {...register('address2')} />
						</div>

						<div className='row'>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									City <span className='text-danger font-weight-bold '>*</span>
								</label>
								<input type='text' className='form-control-sm' {...register('city')} />
								<div className='small text-danger  pb-2   '>{errors.city?.message}</div>
							</div>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									State <span className='text-danger font-weight-bold '>*</span>
								</label>
								<input type='text' className='form-control-sm' {...register('state')} />
								<div className='small text-danger  pb-2   '>{errors.state?.message}</div>
							</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Zip <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('zip')} />
							<div className='small text-danger  pb-2   '>{errors.zip?.message}</div>
						</div>
					</div>

					{/* shipping address  */}

					<div className='col-md-4'>
						<h5 className='font-weight-bold mt-1'>
							<span className='pr-5'>Business Address </span> <input type='checkbox' className='form-check-input' onChange={handleBusinessChecked} /> <span className='small'>Same As Address</span>{' '}
						</h5>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 1 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('businessAddress1')} />
							<div className='small text-danger  pb-2   '>{errors.businessAddress1?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>Address Line 2 </label>
							<input type='text' className='form-control-sm' {...register('businessAddress2')} />
						</div>

						<div className='row'>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									City <span className='text-danger font-weight-bold '>*</span>
								</label>
								<input type='text' className='form-control-sm' {...register('businessCity')} />
								<div className='small text-danger  pb-2   '>{errors.businessCity?.message}</div>
							</div>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									State <span className='text-danger font-weight-bold '>*</span>
								</label>
								<input type='text' className='form-control-sm' {...register('businessState')} />
								<div className='small text-danger  pb-2   '>{errors.businessState?.message}</div>
							</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Zip <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('businessZip')} />
							<div className='small text-danger  pb-2   '>{errors.businessZip?.message}</div>
						</div>
					</div>

					{/* Patient Access Contact */}
					<div className='col-md-4'>
						<h5 className='font-weight-bold mt-1'>Patient Access Contact </h5>

						<div className='form-group'>
							<label className='form-text'>
								Name <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('patientContactName')} />
							<div className='small text-danger  pb-2   '>{errors.patientContactName?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Phone <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('patientContactPhone')} />
							<div className='small text-danger  pb-2   '>{errors.patientContactPhone?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Email <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('patientContactEmail')} />
							<div className='small text-danger  pb-2   '>{errors.patientContactEmail?.message}</div>
						</div>
					</div>
				</div>

				{/* payment info */}
				<h5 className='font-weight-bold mt-1'>Payment Info </h5>

				<div className='row'>
					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Contact Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('contactName')} />
							<div className='small text-danger  pb-2   '> {errors.contactName?.message} </div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Phone <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('contactPhone')} />
							<div className='small text-danger  pb-2   '> {errors.contactPhone?.message} </div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Email <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('contactEmail')} />
							<div className='small text-danger  pb-2   '> {errors.ContactEmail?.message} </div>
						</div>
					</div>

					{/* secound details */}
					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Bank Name <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('bankName')} />
							<div className='small text-danger  pb-2   '> {errors.bankName?.message} </div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Routing <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('routing')} />
							<div className='small text-danger  pb-2   '> {errors.routing?.message} </div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Account <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('accountNumber')} />
							<div className='small text-danger  pb-2   '> {errors.accountNumber?.message} </div>
						</div>
					</div>

					<div className='col-md-4'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Invoice Receive Method <span className='text-danger font-weight-bold '>*</span>
							</label>
							<select name='' id='' className='form-control-sm' {...register('invoiceReceiveMethod')}>
								<option value=''>Select</option>
                <option value='test'>test</option>
							</select>

							<div className='small text-danger  pb-2   '> {errors.invoiceReceiveMethod?.message} </div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Tax Id <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('taxId')} />
							<div className='small text-danger  pb-2   '> {errors.taxId?.message} </div>
						</div>

						<div className='form-group'>
							<input type='checkbox' name='' id='' {...register('applySAASTax')} /> Apply SASS Tax
						</div>
						<div className='form-group'>
							<input type='checkbox' name='' id='' {...register('consolidatedInvoice')} />
							Consolidated Invoice
						</div>
					</div>
				</div>
		
        <div className='row'>
					<div className='col-md-12'>
						<button type='submit' className='btn btn-primary btn-lg float-right'>	Save	</button>
					</div>
				</div>
    
    	</form>
		</div>
	);
};

export default HospitalForm;
