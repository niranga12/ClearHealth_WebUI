/* eslint-disable eqeqeq */
import React, {useEffect, useRef} from 'react';
import {useForm, useFormState} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {MaskFormat, PartyTypeEnum, ServiceMsg, ValidationPatterns} from 'src/reusable/enum';
import {addHealthSystemNew, updateHealthSystemByPartyRoleId} from 'src/service/healthsystemService';
import OnError from 'src/_helpers/onerror';
import {notify} from 'reapop';
import {useHistory} from 'react-router-dom';
import InputMask from 'react-input-mask';
import NormalizePhone from 'src/reusable/NormalizePhone';
import PhoneNumberMaskValidation from 'src/reusable/PhoneNumberMaskValidation';

// import history from "src/_helpers/history";


const schema = yup.object().shape({
	name: yup.string().required('Name is required').matches(ValidationPatterns.onlyCharacters, 'Name should contain only characters'),
	address1: yup.string().required('Address line1 is required'),
	address2: yup.string(),
	city: yup.string().required('City is required'),
	state: yup.string().required('State is required'),
	zip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),
	phone: yup.string().required('Phone is required').test("phoneNO",	"Please enter a valid Phone Number",(value) => PhoneNumberMaskValidation(value) ),
	// phone: yup.string().required('Phone is required').matches(ValidationPatterns.phoneRegExp, 'Phone number is not valid'),
	shippingAddress1: yup.string().required('Shipping Address line 1 is required'),
	shippingAddress2: yup.string(),
	shippingCity: yup.string().required('City is required'),
	shippingState: yup.string().required('State is required'),
	shippingZip: yup.string().required('Zip is required').matches(ValidationPatterns.zip, 'Zip is not valid'),
	contactName: yup.string().required('Contact name is required').matches(ValidationPatterns.onlyCharacters, 'Contact Name should contain only characters'),
	contactPhone: yup.string().required('Contact phone is required').test("phoneNO",	"Please enter a valid Phone Number",(value) => PhoneNumberMaskValidation(value) ),
	contactEmail: yup.string().required('Contact email is required').email('Contact Email must be a valid email'),
});

const HealthSystemForm = ({defaultValues, isEdit = false, partyRoleId = null}) => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		control,
		formState: {errors},
	} = useForm({    mode: "all",
	resolver: yupResolver(schema)});

	// const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
	const {dirtyFields} = useFormState({control});
	let btnRef = useRef();
	


	const dispatch = useDispatch();
	let history = useHistory();

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues]);

	const updateHealthInfo = async () => {
		try {
			let updatHealthSystem = {
				...(dirtyFields.name && {healthSystem: {name: getValues('name')}}),
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

						...(dirtyFields.shippingAddress1 || dirtyFields.shippingAddress2 || dirtyFields.shippingCity || dirtyFields.shippingState || dirtyFields.shippingZip
							? [
									{
										partyContactTypeId: PartyTypeEnum.shipping,
										address1: getValues('shippingAddress1'),
										address2: getValues('shippingAddress2'),
										city: getValues('shippingCity'),
										state: getValues('shippingState'),
										zip: getValues('shippingZip'),
									},
							  ]
							: []),
					],
				}),
				...(dirtyFields.phone && {
					telecommunicationsNumber: {
						partyContactTypeId: PartyTypeEnum.telecommunicationsNumber,
						number: NormalizePhone(getValues('phone')),
					},
				}),
				...((dirtyFields.contactName || dirtyFields.contactPhone || dirtyFields.contactEmail) && {
					patientAccessContact: {
						name: getValues('contactName'),
						phone: NormalizePhone(getValues('contactPhone')),
						email: getValues('contactEmail'),
					},
				}),
			};

			if (Object.keys(updatHealthSystem).length === 0) {
				dispatch(notify(`No record to update`, 'error'));
			} else {
				try {
					const result = await updateHealthSystemByPartyRoleId(partyRoleId, updatHealthSystem);
					// eslint-disable-next-line eqeqeq
					if (result.data.message == ServiceMsg.OK) {
						dispatch(notify(`Successfully updated`, 'success'));
						history.push('/healthsystem');
					}
				} catch (error) {
					OnError(error, dispatch);
				}
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	const handleShippingChecked = (event) => {
		if (event.target.checked) {
			setValue('shippingAddress1', getValues('address1'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('shippingAddress2', getValues('address2'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('shippingCity', getValues('city'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('shippingState', getValues('state'), {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('shippingZip', getValues('zip'), {
				shouldValidate: true,
				shouldDirty: true,
			});
		} else {
			setValue('shippingAddress1', '');
			setValue('shippingAddress2', '');
			setValue('shippingCity', '');
			setValue('shippingState', '');
			setValue('shippingZip', '');
		}
	};

	const healthSystemFormSubmit = (data) => {
		if(btnRef.current){
			btnRef.current.setAttribute("disabled", "disabled");
		  }

		if (isEdit) {
			updateHealthInfo();
		} else {
			addHealthSystem(data);
		}
	};

	

	const addHealthSystem = async (data) => {
		console.log(data);
		const newHealthSystem = {
			healthSystem: {
				name: data.name,
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
					address1: data.shippingAddress1,
					address2: data.shippingAddress2,
					city: data.shippingCity,
					state: data.shippingState,
					zip: data.shippingZip,
				},
			],
			telecommunicationsNumber: {
				partyContactTypeId: PartyTypeEnum.telecommunicationsNumber,
				number: NormalizePhone(data.phone),
			},
			patientAccessContact: {
				name: data.contactName,
				phone: NormalizePhone(data.contactPhone),
				email: data.contactEmail,
			},
		};
		

		try {
			if (newHealthSystem) {
				const result = await addHealthSystemNew(newHealthSystem);
				if (result.data.message == ServiceMsg.OK) {
					dispatch(notify(`Successfully added`, 'success'));
					history.push('/healthsystem');
				}
			}
		} catch (error) {
			OnError(error, dispatch);
		}
	};

	return (
		<div className='p-4'>
			<form onSubmit={handleSubmit(healthSystemFormSubmit)}>
				<div className='row mb-3'>
					<div className='col-md-6'>
						<div className='form-group'>
							<label className='form-text'>
								Name <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input className='form-control-sm' type='text'  {...register('name')}  />
							<div className='small text-danger  pb-2   '>{errors.name?.message}</div>
						</div>
					</div>
				</div>
				<div className='row'>
					{/* address */}
					<div className='col-md-4'>
						<h5 className='font-weight-bold mt-1'>Address </h5>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 1<span className='text-danger font-weight-bold '>*</span>
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
							<InputMask  {...register('phone')} mask={MaskFormat.phoneNumber}  alwaysShowMask={isEdit?true:false}  className='form-control-sm'   />
							{/* <input type='text' className='form-control-sm' {...register('phone')} /> */}
							<div className='small text-danger  pb-2   '>{errors.phone?.message}</div>
						</div>
					</div>

					{/* shipping address  */}
					<div className='col-md-4'>
						<h5 className='font-weight-bold mt-1'>
							{' '}
							<span className='pr-5'>Shipping Address </span> <input type='checkbox' className='form-check-input' onChange={handleShippingChecked} /> <span className='small'>Same As Address</span>{' '}
						</h5>
						<div className='form-group'>
							<label className='form-text'>
								Address Line 1 <span className='text-danger font-weight-bold '>*</span>{' '}
							</label>
							<input type='text' className='form-control-sm' {...register('shippingAddress1')} />
							<div className='small text-danger  pb-2   '>{errors.shippingAddress1?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>Address Line 2 </label>
							<input type='text' className='form-control-sm' {...register('shippingAddress2')} />
						</div>

						<div className='row'>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									City <span className='text-danger font-weight-bold '>*</span>
								</label>
								<input type='text' className='form-control-sm' {...register('shippingCity')} />
								<div className='small text-danger  pb-2   '>{errors.shippingCity?.message}</div>
							</div>
							<div className='form-group col-md-6'>
								<label className='form-text'>
									State <span className='text-danger font-weight-bold '>*</span>
								</label>
								<input type='text' className='form-control-sm' {...register('shippingState')} />
								<div className='small text-danger  pb-2   '>{errors.shippingState?.message}</div>
							</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Zip <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('shippingZip')} />
							<div className='small text-danger  pb-2   '>{errors.shippingZip?.message}</div>
						</div>
					</div>

					<div className='col-md-4'>
						<h5 className='font-weight-bold mt-1'>Patient Access Contact </h5>

						<div className='form-group'>
							<label className='form-text'>
								Name <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('contactName')} />
							<div className='small text-danger  pb-2   '>{errors.contactName?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Phone <span className='text-danger font-weight-bold '>*</span>
							</label>
							<InputMask {...register('contactPhone')} mask={MaskFormat.phoneNumber} alwaysShowMask={isEdit?true:false}  className='form-control-sm'  />
							{/* <input type='text' className='form-control-sm' {...register('contactPhone')} /> */}
							<div className='small text-danger  pb-2   '>{errors.contactPhone?.message}</div>
						</div>

						<div className='form-group'>
							<label className='form-text'>
								Email <span className='text-danger font-weight-bold '>*</span>
							</label>
							<input type='text' className='form-control-sm' {...register('contactEmail')} />
							<div className='small text-danger  pb-2   '>{errors.contactEmail?.message}</div>
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

export default HealthSystemForm;
