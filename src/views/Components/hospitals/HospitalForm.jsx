import React, {useEffect, useRef, useState} from 'react';
import {useForm, useFormState} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {MaskFormat, PartyTypeEnum, ServiceMsg, ValidationPatterns} from 'src/reusable/enum';
import {useHistory} from 'react-router-dom';
import {getHealthSystemList} from 'src/service/healthsystemService';
import OnError from 'src/_helpers/onerror';
import {InvoiceReceiveMethod} from 'src/_helpers/CommonDataList';
import {saveHospital, updateHospitalByPartyRoleId} from 'src/service/hospitalsService';
import {notify} from 'reapop';
import InputMask from 'react-input-mask';
import NormalizePhone from 'src/reusable/NormalizePhone';
import PhoneNumberMaskValidation from 'src/reusable/PhoneNumberMaskValidation';

const schema = yup.object().shape({
	hospitalName: yup.string().required('Hospital Name is required').matches(ValidationPatterns.onlyCharacters, 'Hospital Name should contain only characters'),
	healthSystemPartyRoleId: yup.string().required('Health System is required'),
	address1: yup.string().required('Address Line 1 is required'),
	address2: yup.string(),
	city: yup.string().required('City is required'),
	state: yup.string().required('State is required'),
	zip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),
	phone: yup.string().required('Phone is required').test("phoneNO",	"Please enter a valid Phone Number",(value) => PhoneNumberMaskValidation(value) ),
	businessAddress1: yup.string().required('Business Address Line 1 is required'),
	businessAddress2: yup.string(),
	businessCity: yup.string().required('City is required'),
	businessState: yup.string().required('State is required'),
	businessZip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),
	patientContactName: yup.string().required('Contact Name is required'),
	patientContactPhone: yup.string().required('Contact Phone is required').test("phoneNO",	"Please enter a valid Phone Number",(value) => PhoneNumberMaskValidation(value) ),
	patientContactEmail: yup.string().required('Contact Email is required').email('Contact Email must be a valid email'),
	consolidatedInvoice: yup.string(),
	applySAASTax: yup.string(),
	taxId: yup.string().required('Tax Id is required'),
	invoiceReceiveMethod: yup.string().required('Invoice Receive method is required'),
	accountNumber: yup.string().required('Account number is required'),
	routing: yup.string().required('Routing is required'),
	bankName: yup.string().required('Bank Name is required'),
	contactEmail: yup.string().required(' Email is required').email(' Email must be a valid email'),
	contactPhone: yup.string().required(' Phone is required').test("phoneNO",	"Please enter a valid Phone Number",(value) => PhoneNumberMaskValidation(value) ),
	contactName: yup.string().required('Contact Name is required').matches(ValidationPatterns.onlyCharacters, 'Contact Name should contain only characters'),
});

const HospitalForm = ({defaultValues, isEdit = false, partyRoleId = null}) => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		control,
		formState: {errors},
	} = useForm({resolver: yupResolver(schema),mode: "all",});

	// const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
	const {dirtyFields} = useFormState({control});
	const dispatch = useDispatch();
	let history = useHistory();
	let btnRef = useRef();


	const [healthSystems, setHealthSystem] = useState([]);

	const handleBusinessChecked = (event) => {
		if (event.target.checked) {
			setValue('businessAddress1', getValues('address1'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('businessAddress2', getValues('address2'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('businessCity', getValues('city'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('businessState', getValues('state'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('businessZip', getValues('zip'), {
				shouldValidate: true,
				shouldDirty: true,
			});
		} else {
			setValue('businessAddress1', '');
			setValue('businessAddress2', '');
			setValue('businessCity', '');
			setValue('businessState', '');
			setValue('businessZip', '');
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getHealthSystemList({});
				setHealthSystem(result.data.data);
			} catch (error) {
				OnError(error, dispatch);
			}
		};
		fetchData();
		
	}, []);

	useEffect(() => {
		try {
			reset(defaultValues);
		} catch (error) {
			OnError(error, dispatch);
		}
	}, [defaultValues]);

	// form submit
	const hospitalFormSubmit = (data) => {
		if(btnRef.current){
			btnRef.current.setAttribute("disabled", "disabled");
		  }
		if (isEdit) {
			updateHospitalInfo();
		} else {
			addHospital(data);
		}
	};

	// save hospital
	const addHospital = async (data) => {
		const newHospital = {
			hospital: {
				healthSystemPartyRoleId: data.healthSystemPartyRoleId,
				name: data.hospitalName,
			},
			postalAddress: [
				{
					partyContactTypeId: PartyTypeEnum.primary,
					address1: data.address1,
					address2: data.address2,
					city: data.city,
					state: data.state,
					zip: data.zip,
				},
				{
					partyContactTypeId: PartyTypeEnum.shipping,
					address1: data.businessAddress1,
					address2: data.businessAddress2,
					city: data.businessCity,
					state: data.businessState,
					zip: data.businessZip,
				},
			],
			telecommunicationsNumber: {
				partyContactTypeId: PartyTypeEnum.telecommunicationsNumber,
				number: NormalizePhone(data.phone),
			},
			patientAccessContact: {
				name: data.patientContactName,
				phone: NormalizePhone(data.patientContactPhone),
				email: data.patientContactEmail,
			},
			paymentInfo: {
				name: data.contactName,
				phone: NormalizePhone(data.contactPhone),
				email: data.contactEmail,
				taxId: data.taxId,
				bankName: data.bankName,
				routing: data.routing,
				accountNumber: data.accountNumber,
				invoiceReceiveMethod: data.invoiceReceiveMethod,
				applySAASTax: data.applySAASTax,
				consolidatedInvoice: data.consolidatedInvoice,
			},
		};

		try {
			if (newHospital) {
				let result = await saveHospital(newHospital);
				if (result.data.message === ServiceMsg.OK) {
					dispatch(notify(`Successfully added`, 'success'));
					history.push('/hospitals');
				}
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	// update hospital
	const updateHospitalInfo = async () => {
		try {
		const  updateHospital =  {
				...((dirtyFields.hospitalName || dirtyFields.healthSystemPartyRoleId) && {healthSystem: {name: getValues('hospitalName'), healthSystemPartyRoleId: getValues('healthSystemPartyRoleId')}}),
				...((dirtyFields.address1 || dirtyFields.address2 || dirtyFields.city || dirtyFields.state || dirtyFields.zip || dirtyFields.shippingAddress1 || dirtyFields.shippingAddress2 || dirtyFields.shippingCity || dirtyFields.shippingState || dirtyFields.shippingZip) && {
					postalAddress: [
						...(dirtyFields.address1 || dirtyFields.address2 || dirtyFields.city || dirtyFields.state || dirtyFields.zip
							? [
									{
										partyContactTypeId: PartyTypeEnum.primary,
										address1: getValues('address1'),
										address2: getValues('address2'),
										city: getValues('city'),
										state: getValues('state'),
										zip: getValues('zip'),
									},
							  ]
							: []),

						...(dirtyFields.businessAddress1 || dirtyFields.businessAddress2 || dirtyFields.businessCity || dirtyFields.businessState || dirtyFields.businessZip
							? [
									{
										partyContactTypeId: PartyTypeEnum.shipping,
										address1: getValues('businessAddress1'),
										address2: getValues('businessAddress2'),
										city: getValues('businessCity'),
										state: getValues('businessState'),
										zip: getValues('businessZip'),
									},
							  ]
							: []),
					],
				}),
				...((dirtyFields.patientContactName || dirtyFields.patientContactPhone || dirtyFields.patientContactEmail) && {
					patientAccessContact: {
						name: getValues('patientContactName'),
						phone: NormalizePhone(getValues('patientContactPhone')),
						email: getValues('patientContactEmail'),
					},
				}),
				...(dirtyFields.phone && {
					telecommunicationsNumber: {
						partyContactTypeId: PartyTypeEnum.telecommunicationsNumber,
						number: NormalizePhone(getValues('phone')),
					},
				}),
				...((dirtyFields.contactName || dirtyFields.contactPhone || dirtyFields.contactEmail || dirtyFields.taxId || dirtyFields.bankName || dirtyFields.routing || dirtyFields.accountNumber || dirtyFields.invoiceReceiveMethod || dirtyFields.applySAASTax || dirtyFields.consolidatedInvoice) && {
					paymentInfo: {
						name: getValues('contactName'),
						phone: NormalizePhone(getValues('contactPhone')),
						email: getValues('contactEmail'),
						taxId: getValues('taxId'),
						bankName: getValues('bankName'),
						routing: getValues('routing'),
						accountNumber: getValues('accountNumber'),
						invoiceReceiveMethod: getValues('invoiceReceiveMethod'),
						applySAASTax: getValues('applySAASTax'),
						consolidatedInvoice: getValues('consolidatedInvoice'),
					},
				}),
			};
			if (Object.keys(updateHospital).length == 0) {
				dispatch(notify(`No record to update`, 'error'));
			} else {
				try {
					const result = await updateHospitalByPartyRoleId(partyRoleId, updateHospital);
					if (result.data.message == ServiceMsg.OK) {
						dispatch(notify(`Successfully updated`, 'success'));
						history.push('/hospitals');
					}
				} catch (error) {
					OnError(error, dispatch);
				}
			}
		} catch (error) {
			OnError(error, dispatch);
		}
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
							<div className='small text-danger  pb-2   '>{errors.hospitalName?.message}</div>
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Health System <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<select name='' id='' className='form-control-sm' {...register('healthSystemPartyRoleId')}>
								<option value=''>Select</option>
								{healthSystems.map((item, index) => (
									<option key={index} value={item.partyRoleId}>
										{item.name}
									</option>
								))}
								{/* <option value='test'>test</option> */}
							</select>
							<div className='small text-danger  pb-2   '>{errors.healthSystemPartyRoleId?.message}</div>
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

						<div className='form-group'>
							<label className='form-text'>
								Phone <span className='text-danger font-weight-bold '>*</span>
							</label>
							<InputMask   {...register('phone')} mask={MaskFormat.phoneNumber}   alwaysShowMask={isEdit?true:false}  className='form-control-sm'  />
							{/* <input type='text' className='form-control-sm' {...register('phone')} /> */}
							<div className='small text-danger  pb-2   '>{errors.phone?.message}</div>
						</div>


					</div>

					{/* shipping address  */}

					<div className='col-md-4'>
						<h5 className='font-weight-bold mt-1'>
							<span className='pr-5'>Business Address </span> <input type='checkbox' className='form-check-input' onChange={handleBusinessChecked} /> <span className='small'>Same as address</span>{' '}
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
							<InputMask  {...register('patientContactPhone')}  mask={MaskFormat.phoneNumber}   alwaysShowMask={isEdit?true:false}  className='form-control-sm'   />
							
							{/* <input type='text' className='form-control-sm' {...register('patientContactPhone')} /> */}
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
							<InputMask {...register('contactPhone')} mask={MaskFormat.phoneNumber}   alwaysShowMask={isEdit?true:false}  className='form-control-sm'   />
							
							{/* <input type='text' className='form-control-sm' {...register('contactPhone')} /> */}
							<div className='small text-danger  pb-2   '> {errors.contactPhone?.message} </div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								{' '}
								Email <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('contactEmail')} />
							<div className='small text-danger  pb-2   '> {errors.contactEmail?.message} </div>
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
								{InvoiceReceiveMethod.map((item) => (
									<option key={item.id} value={item.name}>
										{item.name}
									</option>
								))}
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

						<div className='form-group pl-4'>
							<input type='checkbox' name='' id='' {...register('applySAASTax')} className="mr-2 form-check-input" /> 
							<label className="form-check-label">Apply SASS Tax</label> 	
						</div> 
						<div className='form-group pl-4'>
							<input type='checkbox' name='' id='' {...register('consolidatedInvoice')} className="form-check-input" />
							<label className="form-check-label">Consolidated Invoice</label> 
						</div>
					</div>
				</div>

				<div className='row'>
					<div className='col-md-12'>
						<button type='submit' ref={btnRef} className='btn btn-primary btn-lg float-right'>
						{isEdit ? 'Update' : 'Save'}

						</button>
					</div>
				</div>
			</form>
		</div>
	);
};




export default HospitalForm;
